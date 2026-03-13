import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'
import { BlogPostSchema } from '@/lib/validations'
import { estimateReadingTime } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[admin/blog GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch posts.' }, { status: 500 })
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
    const parsed = BlogPostSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const supabase = await createAdminClient()

    const insertData: Record<string, unknown> = { ...parsed.data }
    if (parsed.data.body) {
      insertData.reading_time_minutes = estimateReadingTime(parsed.data.body)
    }
    if (parsed.data.status === 'published' && !parsed.data.published_at) {
      insertData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[admin/blog POST]', error)
    return NextResponse.json({ success: false, error: 'Failed to create post.' }, { status: 500 })
  }
}
