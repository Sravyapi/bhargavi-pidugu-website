import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { BookingStep3Schema } from '@/lib/validations'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { bookingConfirmationPatient, bookingNotificationAdmin } from '@/lib/email/templates/booking-confirmation'
import { createCalendarEvent } from '@/lib/google/calendar'
import { getAndUpdateAccessToken } from '@/lib/google/token-helper'
import type { ReportFile } from '@/lib/types'
import { FILE_UPLOAD } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract fields
    const fields: Record<string, unknown> = {}
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) continue
      if (key === 'whatsapp_preferred' || key === 'previous_surgeries') {
        fields[key] = value === 'true'
      } else {
        fields[key] = value
      }
    }

    const result = BookingStep3Schema.safeParse(fields)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const slotDatetime = formData.get('slot_datetime') as string
    if (!slotDatetime) {
      return NextResponse.json({ success: false, error: 'slot_datetime required' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Check bookings enabled
    const { data: enabledRow } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', 'bookings_enabled')
      .single()

    if (enabledRow?.value !== 'true') {
      return NextResponse.json({ success: false, error: 'Bookings are currently closed.' }, { status: 400 })
    }

    // Rate limit: max 5 booking attempts from same email per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count: recentCount } = await supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('contact_email', result.data.contact_email)
      .gte('created_at', oneHourAgo)
    if ((recentCount ?? 0) >= 5) {
      return NextResponse.json(
        { success: false, error: 'Too many booking attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // Race condition check — slot still available?
    const { data: conflictingApt } = await supabase
      .from('appointments')
      .select('id')
      .eq('slot_datetime', slotDatetime)
      .neq('status', 'cancelled')
      .maybeSingle()

    if (conflictingApt) {
      return NextResponse.json({ success: false, error: 'This slot is no longer available. Please choose another.' }, { status: 409 })
    }

    // Handle file uploads
    const files = formData.getAll('reports') as File[]
    const skippedFiles: string[] = []
    const validFiles: File[] = []

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue
      if (file.size > FILE_UPLOAD.REPORTS_MAX_SIZE_BYTES) {
        skippedFiles.push(file.name)
        continue
      }
      validFiles.push(file)
    }

    const reportFiles: ReportFile[] = (
      await Promise.all(
        validFiles.map(async (file) => {
          const ext = file.name.split('.').pop()
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
          const buffer = await file.arrayBuffer()

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('reports')
            .upload(path, buffer, { contentType: file.type })

          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage.from('reports').getPublicUrl(path)
            return { name: file.name, url: urlData.publicUrl, storage_path: path } satisfies ReportFile
          }
          return null
        })
      )
    ).filter((f): f is ReportFile => f !== null)

    // Get duration from site_content
    const { data: durationRow } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', 'appointment_duration_minutes')
      .single()
    const durationMinutes = parseInt(durationRow?.value || '30')

    // Insert appointment
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert({
        ...result.data,
        slot_datetime: slotDatetime,
        duration_minutes: durationMinutes,
        appointment_type: 'online_video',
        report_urls: reportFiles,
        status: 'pending',
      })
      .select()
      .single()

    if (insertError) throw insertError

    let meetLink = ''
    let calendarEventId = ''

    // Create Google Calendar event if tokens exist
    const { data: googleTokens } = await supabase
      .from('google_tokens')
      .select('*')
      .maybeSingle()

    if (googleTokens) {
      try {
        const accessToken = await getAndUpdateAccessToken(googleTokens, supabase)

        const slotEnd = new Date(new Date(slotDatetime).getTime() + durationMinutes * 60000).toISOString()
        const { eventId, meetLink: link } = await createCalendarEvent(
          accessToken,
          googleTokens.calendar_id,
          {
            summary: `Consultation: ${result.data.patient_name}`,
            description: `Concern: ${result.data.concern_type}\n${result.data.concern_description}`,
            startDateTime: slotDatetime,
            endDateTime: slotEnd,
            attendeeEmail: result.data.contact_email,
            attendeeName: result.data.patient_name,
            requestId: appointment.id,
          }
        )

        meetLink = link
        calendarEventId = eventId

        await supabase
          .from('appointments')
          .update({
            google_calendar_event_id: calendarEventId,
            google_meet_link: meetLink,
            status: 'confirmed',
            confirmation_email_sent: true,
          })
          .eq('id', appointment.id)
      } catch (e) {
        console.error('[book] Google Calendar error:', e)
        await supabase
          .from('appointments')
          .update({ confirmation_email_sent: true })
          .eq('id', appointment.id)
      }
    } else {
      await supabase
        .from('appointments')
        .update({ confirmation_email_sent: true })
        .eq('id', appointment.id)
    }

    // Send emails
    const resend = getResend()
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: result.data.contact_email,
        subject: 'Your appointment is confirmed — Dr. Bhargavi Pidugu',
        html: bookingConfirmationPatient({
          patientName: result.data.patient_name,
          contactName: result.data.patient_name,
          slotDatetime,
          durationMinutes,
          meetLink,
          concernType: result.data.concern_type,
        }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New booking — ${result.data.patient_name}`,
        html: bookingNotificationAdmin({
          patientName: result.data.patient_name,
          patientDob: result.data.patient_dob,
          contactEmail: result.data.contact_email,
          contactPhone: result.data.contact_phone,
          concernType: result.data.concern_type,
          concernDescription: result.data.concern_description,
          slotDatetime,
        }),
      }),
    ])
    const emailFailures = emailResults.filter(r => r.status === 'rejected')
    if (emailFailures.length > 0) {
      console.error('[book] Email send failures:', emailFailures.map(f => (f as PromiseRejectedResult).reason))
    }

    return NextResponse.json({
      success: true,
      data: { appointment_id: appointment.id, meet_link: meetLink, skipped_files: skippedFiles },
    })
  } catch (error) {
    console.error('[book POST]', error)
    return NextResponse.json({ success: false, error: 'Booking failed. Please try again.' }, { status: 500 })
  }
}
