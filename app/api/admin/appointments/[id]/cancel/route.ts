import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'
import { deleteCalendarEvent } from '@/lib/google/calendar'
import { getAndUpdateAccessToken } from '@/lib/google/token-helper'
import { getResend, FROM_EMAIL } from '@/lib/email/resend'
import { bookingCancellationPatient } from '@/lib/email/templates/booking-cancellation'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const customMessage = body.message as string | undefined

    const supabase = await createAdminClient()
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !appointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found.' }, { status: 404 })
    }

    // Delete calendar event if exists
    if (appointment.google_calendar_event_id) {
      const { data: googleTokens } = await supabase.from('google_tokens').select('*').maybeSingle()
      if (googleTokens) {
        try {
          const accessToken = await getAndUpdateAccessToken(googleTokens, supabase)
          await deleteCalendarEvent(accessToken, googleTokens.calendar_id, appointment.google_calendar_event_id)
        } catch (e) {
          console.error('[cancel] Calendar delete error:', e)
        }
      }
    }

    // Update status
    await supabase
      .from('appointments')
      .update({ status: 'cancelled', cancellation_email_sent: true, updated_at: new Date().toISOString() })
      .eq('id', id)

    // Send cancellation email (don't roll back DB cancellation if email fails)
    try {
      const resend = getResend()
      await resend.emails.send({
        from: FROM_EMAIL,
        to: appointment.contact_email,
        subject: 'Appointment cancelled — Dr. Bhargavi Pidugu',
        html: bookingCancellationPatient({
          patientName: appointment.patient_name,
          contactName: appointment.patient_name,
          slotDatetime: appointment.slot_datetime,
          customMessage,
        }),
      })
    } catch (emailError) {
      console.error('[cancel] Failed to send cancellation email:', emailError)
      // DB cancellation already committed; email failure is non-fatal
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/appointments/[id]/cancel POST]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
