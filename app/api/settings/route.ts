import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

const KEYS = [
  'bookings_enabled',
  'appointment_duration_minutes',
  'advance_booking_days',
  'consultation_fee',
]

async function isGoogleConnected() {
  const supabase = await createAdminClient()
  const { data } = await supabase.from('google_tokens').select('id').maybeSingle()
  return !!data
}

export async function GET() {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value')
      .in('key', KEYS)

    if (error) throw error

    const map = Object.fromEntries(data.map(({ key, value }) => [key, value]))

    const googleConnected = await isGoogleConnected()

    return NextResponse.json({
      bookings_enabled: map.bookings_enabled === 'true',
      consultation_duration: parseInt(map.appointment_duration_minutes ?? '30') || 30,
      consultation_fee: parseInt(map.consultation_fee ?? '0') || 0,
      advance_booking_days: parseInt(map.advance_booking_days ?? '14') || 14,
      google_connected: googleConnected,
    })
  } catch (error) {
    console.error('[settings GET]:', error)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}
