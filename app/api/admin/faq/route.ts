import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'
import { FaqSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[admin/faq GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch FAQs.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const parsed = FaqSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Auto-assign order_index if not provided
    let orderIndex = parsed.data.order_index
    if (orderIndex === undefined) {
      const { data: maxRow } = await supabase
        .from('faq_items')
        .select('order_index')
        .order('order_index', { ascending: false })
        .limit(1)
      orderIndex = (maxRow?.[0]?.order_index ?? -1) + 1
    }

    const { data, error } = await supabase
      .from('faq_items')
      .insert({ ...parsed.data, order_index: orderIndex })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[admin/faq POST]', error)
    return NextResponse.json({ success: false, error: 'Failed to create FAQ.' }, { status: 500 })
  }
}
