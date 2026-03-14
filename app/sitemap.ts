import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { SITE_URL } from '@/lib/config'

const BASE_URL = SITE_URL

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/expertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/research`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE_URL}/book`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...STATIC_ROUTES, ...blogRoutes]
  } catch {
    return STATIC_ROUTES
  }
}
