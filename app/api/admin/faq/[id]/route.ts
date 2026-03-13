import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { id } = await params
    const body = await request.json()
    const supabase = await createAdminClient()

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (typeof body.question === 'string') updates.question = body.question
    if (typeof body.answer === 'string') updates.answer = body.answer
    if (typeof body.order_index === 'number') updates.order_index = body.order_index
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active

    const { data, error } = await supabase
      .from('faq_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[admin/faq/[id] PATCH]', error)
    return NextResponse.json({ success: false, error: 'Failed to update FAQ.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { id } = await params
    const supabase = await createAdminClient()

    const { error } = await supabase.from('faq_items').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/faq/[id] DELETE]', error)
    return NextResponse.json({ success: false, error: 'Failed to delete FAQ.' }, { status: 500 })
  }
}
