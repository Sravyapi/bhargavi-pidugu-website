import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const supabase = await createAdminClient()

    const { data: image, error: fetchError } = await supabase
      .from('gallery_images')
      .select('storage_path')
      .eq('id', id)
      .single()

    if (fetchError || !image) return NextResponse.json({ success: false, error: 'Image not found.' }, { status: 404 })

    await supabase.storage.from('gallery').remove([image.storage_path])

    const { error } = await supabase.from('gallery_images').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/gallery/[id] DELETE]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()
    const supabase = await createAdminClient()

    const updates: Record<string, unknown> = {}
    if (typeof body.has_consent_tag === 'boolean') updates.has_consent_tag = body.has_consent_tag
    if (typeof body.order_index === 'number') updates.order_index = body.order_index

    const { data, error } = await supabase
      .from('gallery_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/gallery/[id] PATCH]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
