import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('blocked_dates').select('*').order('date')
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/blocked-dates GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { date, reason } = body

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ success: false, error: 'Valid date required (YYYY-MM-DD)' }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('blocked_dates')
      .insert({ date, reason: reason || null })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/blocked-dates POST]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
