import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ date: string }> }) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { date } = await params
    const supabase = await createAdminClient()
    const { error } = await supabase.from('blocked_dates').delete().eq('date', date)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/blocked-dates/[date] DELETE]', error)
    return NextResponse.json({ success: false, error: 'Failed to unblock date.' }, { status: 500 })
  }
}
