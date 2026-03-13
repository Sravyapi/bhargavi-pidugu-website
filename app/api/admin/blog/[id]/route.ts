import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'
import { BlogPostSchema } from '@/lib/validations'
import { estimateReadingTime } from '@/lib/utils'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { id } = await params
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

    if (error) return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[admin/blog/[id] GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch post.' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { id } = await params
    const body = await request.json()
    const parsed = BlogPostSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const supabase = await createAdminClient()

    const updateData: Record<string, unknown> = { ...parsed.data, updated_at: new Date().toISOString() }
    if (parsed.data.body) {
      updateData.reading_time_minutes = estimateReadingTime(parsed.data.body)
    }
    if (parsed.data.status === 'published') {
      const { data: existing } = await supabase.from('blog_posts').select('published_at').eq('id', id).single()
      if (!existing?.published_at) {
        updateData.published_at = new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[admin/blog/[id] PATCH]', error)
    return NextResponse.json({ success: false, error: 'Failed to update post.' }, { status: 500 })
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

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/blog/[id] DELETE]', error)
    return NextResponse.json({ success: false, error: 'Failed to delete post.' }, { status: 500 })
  }
}
