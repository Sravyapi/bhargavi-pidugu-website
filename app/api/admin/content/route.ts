import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'

const ALLOWED_CONTENT_KEYS = new Set([
  'hero_title', 'hero_subtitle', 'about_bio', 'about_photo_url',
  'consultation_fee', 'appointment_duration_minutes', 'buffer_minutes',
  'bookings_enabled', 'waitlist_message', 'meta_description',
])

export async function GET(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('site_content').select('key, value')

    if (error) throw error

    const content: Record<string, string> = {}
    data?.forEach((row: { key: string; value: string }) => { content[row.key] = row.value })

    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('[admin/content GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch content.' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const body = await request.json()
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: 'Body must be a key-value object.' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    for (const [key, value] of Object.entries(body)) {
      if (!ALLOWED_CONTENT_KEYS.has(key)) {
        return NextResponse.json({ success: false, error: `Invalid key: ${key}` }, { status: 400 })
      }
      await supabase
        .from('site_content')
        .upsert({ key, value: String(value), updated_at: new Date().toISOString() }, { onConflict: 'key' })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/content PATCH]', error)
    return NextResponse.json({ success: false, error: 'Failed to update content.' }, { status: 500 })
  }
}
