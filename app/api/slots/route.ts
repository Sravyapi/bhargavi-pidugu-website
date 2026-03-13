import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSlots } from '@/lib/slots'
import { getFreeBusy, isSlotBusy } from '@/lib/google/freebusy'
import { getAndUpdateAccessToken } from '@/lib/google/token-helper'
import type { TimeSlot } from '@/lib/types'
import { startOfDay, endOfDay } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'
import { IST_TIMEZONE, APPOINTMENT_DEFAULTS } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: 'date param required (YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    const supabase = await createAdminClient()

    // Check bookings enabled first (early return if disabled)
    const { data: contentRows } = await supabase
      .from('site_content')
      .select('key, value')
      .in('key', ['bookings_enabled', 'appointment_duration_minutes', 'buffer_minutes'])

    const content: Record<string, string> = {}
    contentRows?.forEach((r) => { content[r.key] = r.value })

    if (content.bookings_enabled !== 'true') {
      return NextResponse.json({ success: true, data: { slots: [] } })
    }

    // Compute day-level range upfront (needed for appointments + google queries)
    const dayOfWeek = new Date(date + 'T12:00:00').getDay()
    const dayStart = fromZonedTime(startOfDay(new Date(date + 'T00:00:00')), IST_TIMEZONE).toISOString()
    const dayEnd = fromZonedTime(endOfDay(new Date(date + 'T00:00:00')), IST_TIMEZONE).toISOString()

    // Parallelise all remaining queries
    const [blockedDateResult, scheduleResult, appointmentsResult, googleTokensResult] = await Promise.all([
      supabase
        .from('blocked_dates')
        .select('id')
        .eq('date', date)
        .maybeSingle(),
      supabase
        .from('availability_schedule')
        .select('*')
        .eq('day_of_week', dayOfWeek)
        .maybeSingle(),
      supabase
        .from('appointments')
        .select('slot_datetime, duration_minutes')
        .gte('slot_datetime', dayStart)
        .lte('slot_datetime', dayEnd)
        .neq('status', 'cancelled'),
      supabase
        .from('google_tokens')
        .select('*')
        .maybeSingle(),
    ])

    if (blockedDateResult.data) {
      return NextResponse.json({ success: true, data: { slots: [] } })
    }

    const schedule = scheduleResult.data
    if (!schedule || !schedule.is_active) {
      return NextResponse.json({ success: true, data: { slots: [] } })
    }

    const durationMinutes = parseInt(content.appointment_duration_minutes || String(APPOINTMENT_DEFAULTS.DURATION_MINUTES))
    const bufferMinutes = parseInt(content.buffer_minutes || String(APPOINTMENT_DEFAULTS.BUFFER_MINUTES))

    let slots: TimeSlot[] = generateSlots(date, schedule, durationMinutes, bufferMinutes)

    // Mark booked slots unavailable
    const appointments = appointmentsResult.data
    slots = slots.map((slot) => {
      const isBooked = appointments?.some((apt) => {
        const aptStart = new Date(apt.slot_datetime).getTime()
        const aptEnd = aptStart + apt.duration_minutes * 60000
        const slotStart = new Date(slot.start).getTime()
        const slotEnd = new Date(slot.end).getTime()
        return slotStart < aptEnd && slotEnd > aptStart
      })
      return { ...slot, available: !isBooked }
    })

    // Check Google Calendar freebusy if tokens exist
    const googleTokens = googleTokensResult.data
    if (googleTokens) {
      try {
        const accessToken = await getAndUpdateAccessToken(googleTokens, supabase)

        const busyIntervals = await getFreeBusy(
          accessToken,
          googleTokens.calendar_id,
          dayStart,
          dayEnd
        )

        slots = slots.map((slot) => ({
          ...slot,
          available: slot.available && !isSlotBusy(slot.start, slot.end, busyIntervals),
        }))
      } catch (e) {
        console.error('[slots] Google FreeBusy error:', e)
      }
    }

    return NextResponse.json({ success: true, data: { slots } })
  } catch (error) {
    console.error('[slots GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch slots.' }, { status: 500 })
  }
}
