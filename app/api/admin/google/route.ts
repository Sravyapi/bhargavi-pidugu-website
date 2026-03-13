import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const supabase = await createAdminClient()
    const { data } = await supabase
      .from('google_tokens')
      .select('id, calendar_id, updated_at')
      .maybeSingle()

    return NextResponse.json({
      success: true,
      data: {
        connected: !!data,
        calendar_id: data?.calendar_id || null,
        updated_at: data?.updated_at || null,
      },
    })
  } catch (error) {
    console.error('[admin/google GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to check Google connection.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const supabase = await createAdminClient()
    await supabase.from('google_tokens').delete().not('id', 'is', null)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/google DELETE]', error)
    return NextResponse.json({ success: false, error: 'Failed to disconnect Google.' }, { status: 500 })
  }
}
