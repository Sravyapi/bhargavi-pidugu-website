import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { BookingStep3Schema } from '@/lib/validations'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { bookingConfirmationPatient, bookingNotificationAdmin } from '@/lib/email/templates/booking-confirmation'
import { createCalendarEvent } from '@/lib/google/calendar'
import { getAndUpdateAccessToken } from '@/lib/google/token-helper'
import { BOOKING_LIMITS, APPOINTMENT_DEFAULTS } from '@/lib/constants'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = BookingStep3Schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { slot_datetime: slotDatetime } = body
    if (!slotDatetime || typeof slotDatetime !== 'string') {
      return NextResponse.json({ success: false, error: 'slot_datetime required' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Batch both site_content reads + slot conflict check in parallel
    const [contentRows, conflictingApt, rateLimitExceeded] = await Promise.all([
      supabase
        .from('site_content')
        .select('key, value')
        .in('key', ['bookings_enabled', 'appointment_duration_minutes']),
      supabase
        .from('appointments')
        .select('id')
        .eq('slot_datetime', slotDatetime)
        .neq('status', 'cancelled')
        .maybeSingle(),
      checkRateLimit(supabase, {
        table: 'appointments',
        emailColumn: 'contact_email',
        email: result.data.contact_email,
        maxPerHour: BOOKING_LIMITS.MAX_BOOKING_ATTEMPTS_PER_HOUR,
      }),
    ])

    const content: Record<string, string> = {}
    contentRows.data?.forEach((r) => { content[r.key] = r.value })

    if (content.bookings_enabled !== 'true') {
      return NextResponse.json({ success: false, error: 'Bookings are currently closed.' }, { status: 400 })
    }

    if (rateLimitExceeded) {
      return NextResponse.json(
        { success: false, error: 'Too many booking attempts. Please try again later.' },
        { status: 429 }
      )
    }

    if (conflictingApt.data) {
      return NextResponse.json(
        { success: false, error: 'This slot is no longer available. Please choose another.' },
        { status: 409 }
      )
    }

    const durationMinutes = parseInt(content.appointment_duration_minutes ?? '') || APPOINTMENT_DEFAULTS.DURATION_MINUTES

    // Insert appointment
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert({
        ...result.data,
        slot_datetime: slotDatetime,
        duration_minutes: durationMinutes,
        appointment_type: 'online_video',
        status: 'pending',
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Re-check for duplicate bookings (race condition guard)
    const { data: duplicates } = await supabase
      .from('appointments')
      .select('id')
      .eq('slot_datetime', slotDatetime)
      .neq('status', 'cancelled')

    if (duplicates && duplicates.length > 1) {
      // Another booking was inserted concurrently — cancel ours
      await supabase.from('appointments').delete().eq('id', appointment.id)
      return NextResponse.json(
        { success: false, error: 'This slot is no longer available. Please choose another.' },
        { status: 409 }
      )
    }

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

    // Determine final status for email messaging
    const finalStatus = meetLink ? 'confirmed' : 'pending'
    const patientSubject = finalStatus === 'confirmed'
      ? 'Your appointment is confirmed — Dr. Bhargavi Pidugu'
      : 'Your appointment request has been received — Dr. Bhargavi Pidugu'

    // Send emails
    const resend = getResend()
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: result.data.contact_email,
        subject: patientSubject,
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
      data: { appointment_id: appointment.id, meet_link: meetLink },
    })
  } catch (error) {
    console.error('[book POST]', error)
    return NextResponse.json({ success: false, error: 'Booking failed. Please try again.' }, { status: 500 })
  }
}
