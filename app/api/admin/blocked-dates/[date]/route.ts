import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ date: string }> }) {
  try {
    await requireAuth()

    const { date } = await params
    const supabase = await createAdminClient()
    const { error } = await supabase.from('blocked_dates').delete().eq('date', date)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/blocked-dates/[date] DELETE]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
