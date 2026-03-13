import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, cover_image_url, published_at, body, category')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error

    // Map `body` → `content` to match what the blog page expects
    const posts = (data ?? []).map(({ body, ...rest }) => ({ ...rest, content: body ?? '' }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('[api/blog/posts GET]', error)
    return NextResponse.json([], { status: 500 })
  }
}
