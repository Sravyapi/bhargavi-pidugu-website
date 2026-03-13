import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

const ALLOWED_CONTENT_KEYS = new Set([
  'hero_title', 'hero_subtitle', 'about_bio', 'about_photo_url',
  'consultation_fee', 'appointment_duration_minutes', 'buffer_minutes',
  'bookings_enabled', 'waitlist_message', 'meta_description',
])

export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('site_content').select('key, value')

    if (error) throw error

    const content: Record<string, string> = {}
    data?.forEach((row: { key: string; value: string }) => { content[row.key] = row.value })

    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/content GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: 'Body must be a key-value object.' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    for (const key of Object.keys(body)) {
      if (!ALLOWED_CONTENT_KEYS.has(key)) {
        return NextResponse.json({ success: false, error: `Invalid key: ${key}` }, { status: 400 })
      }
    }

    await Promise.all(
      Object.entries(body).map(([key, value]) =>
        supabase
          .from('site_content')
          .upsert({ key, value: String(value), updated_at: new Date().toISOString() }, { onConflict: 'key' })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/content PATCH]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
