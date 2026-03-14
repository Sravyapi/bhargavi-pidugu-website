import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'
import { z } from 'zod'

const ALLOWED_KEYS = new Set([
  'bookings_enabled',
  'appointment_duration_minutes',
  'advance_booking_days',
  'consultation_fee',
  'admin_email',
])

// Map frontend key names to site_content key names
const KEY_MAP: Record<string, string> = {
  consultation_duration: 'appointment_duration_minutes',
}

const PatchSchema = z.object({
  key: z.string(),
  value: z.string(),
})

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const parsed = PatchSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const dbKey = KEY_MAP[parsed.data.key] ?? parsed.data.key

    if (!ALLOWED_KEYS.has(dbKey)) {
      return NextResponse.json({ error: 'Unknown setting key' }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('site_content')
      .upsert({ key: dbKey, value: parsed.data.value }, { onConflict: 'key' })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/settings PATCH]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
