import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

async function getPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    const res = await fetch(`${baseUrl}/api/blog/posts/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getAllPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    const res = await fetch(`${baseUrl}/api/blog/posts`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.cover_image_url && { images: [post.cover_image_url] }),
    },
  }
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPost(slug), getAllPosts()])

  if (!post) notFound()

  const currentIdx = allPosts.findIndex((p: { slug: string }) => p.slug === slug)
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null

  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}
      >
        <div className="container-site max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Cover */}
          {post.cover_image_url && (
            <div
              className="w-full h-72 rounded-2xl mb-8 overflow-hidden"
              style={{ background: 'var(--warm-beige)' }}
            />
          )}

          <div className="flex items-center gap-4 mb-4 text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.published_at ? formatDate(post.published_at) : 'Draft'}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {estimateReadTime(post.content)} min read
            </span>
          </div>

          <h1 className="heading-display mb-0">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <div
            className="prose prose-stone prose-warm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Prev/Next */}
      {(prevPost || nextPost) && (
        <section className="section-padding" style={{ background: 'var(--surface)' }}>
          <div className="container-site max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="card-warm p-4 group" style={{ textDecoration: 'none' }}>
                  <p className="text-xs mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>← Previous</p>
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-[var(--terracotta)] transition-colors" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                    {prevPost.title}
                  </p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="card-warm p-4 group text-right sm:col-start-2" style={{ textDecoration: 'none' }}>
                  <p className="text-xs mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Next →</p>
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-[var(--terracotta)] transition-colors" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
