import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const supabase = await createAdminClient()
    const [scheduleResult, contentResult] = await Promise.all([
      supabase.from('availability_schedule').select('*').order('day_of_week'),
      supabase.from('site_content').select('key, value').in('key', [
        'appointment_duration_minutes', 'buffer_minutes', 'advance_booking_days',
      ]),
    ])

    const settings: Record<string, string> = {}
    contentResult.data?.forEach((r) => { settings[r.key] = r.value })

    return NextResponse.json({
      success: true,
      data: { schedule: scheduleResult.data, settings },
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/availability GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { schedule, settings } = body
    const supabase = await createAdminClient()

    const VALID_DAYS = [0, 1, 2, 3, 4, 5, 6]
    const ALLOWED_DAY_FIELDS = ['day_of_week', 'is_active', 'start_time', 'end_time']
    const ALLOWED_SETTING_KEYS = ['appointment_duration_minutes', 'buffer_minutes', 'advance_booking_days']

    if (schedule && Array.isArray(schedule)) {
      for (const day of schedule) {
        // Validate day_of_week
        if (!VALID_DAYS.includes(day.day_of_week)) {
          return NextResponse.json({ error: `Invalid day_of_week: ${day.day_of_week}` }, { status: 400 })
        }
        // Reject unknown keys
        const unknownKeys = Object.keys(day).filter(k => !ALLOWED_DAY_FIELDS.includes(k))
        if (unknownKeys.length > 0) {
          return NextResponse.json({ error: `Unknown schedule fields: ${unknownKeys.join(', ')}` }, { status: 400 })
        }
        await supabase
          .from('availability_schedule')
          .update(day)
          .eq('day_of_week', day.day_of_week)
      }
    }

    if (settings && typeof settings === 'object') {
      const unknownSettings = Object.keys(settings).filter(k => !ALLOWED_SETTING_KEYS.includes(k))
      if (unknownSettings.length > 0) {
        return NextResponse.json({ error: `Unknown settings: ${unknownSettings.join(', ')}` }, { status: 400 })
      }
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from('site_content')
          .update({ value: String(value) })
          .eq('key', key)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/availability PATCH]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
