import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { startOfDay, endOfDay, startOfWeek, endOfWeek, subDays } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'

export async function GET(request: NextRequest) {
  try {
    const { user, errorResponse } = await requireAdmin()
    if (errorResponse) return errorResponse

    const supabase = await createAdminClient()
    const now = new Date()
    const IST = 'Asia/Kolkata'

    const todayStart = fromZonedTime(startOfDay(now), IST).toISOString()
    const todayEnd = fromZonedTime(endOfDay(now), IST).toISOString()
    const weekStart = fromZonedTime(startOfWeek(now), IST).toISOString()
    const weekEnd = fromZonedTime(endOfWeek(now), IST).toISOString()
    const sevenDaysAgo = subDays(now, 7).toISOString()

    const [todayResult, weekResult, recentResult, waitlistResult] = await Promise.all([
      supabase
        .from('appointments')
        .select('id, slot_datetime, patient_name, contact_email, status, google_meet_link, duration_minutes')
        .gte('slot_datetime', todayStart)
        .lte('slot_datetime', todayEnd)
        .neq('status', 'cancelled')
        .order('slot_datetime', { ascending: true }),
      supabase
        .from('appointments')
        .select('id', { count: 'exact' })
        .gte('slot_datetime', weekStart)
        .lte('slot_datetime', weekEnd)
        .neq('status', 'cancelled'),
      supabase
        .from('appointments')
        .select('id', { count: 'exact' })
        .gte('created_at', sevenDaysAgo),
      supabase
        .from('waitlist')
        .select('id', { count: 'exact' }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        todayAppointmentsCount: todayResult.data?.length ?? 0,
        todayAppointments: todayResult.data ?? [],
        thisWeekCount: weekResult.count ?? 0,
        newBookingsSinceLastLogin: recentResult.count ?? 0,
        waitlistCount: waitlistResult.count ?? 0,
      },
    })
  } catch (error) {
    console.error('[admin/dashboard GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to load dashboard.' }, { status: 500 })
  }
}
