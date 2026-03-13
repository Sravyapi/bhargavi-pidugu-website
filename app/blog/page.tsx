import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPostThumbnail } from '@/components/ui/BlogPostThumbnail'

export const metadata: Metadata = {
  title: 'Blog — Children\'s Eye Health',
  description: "Parent-friendly articles on paediatric ophthalmology by Dr. Bhargavi Pidugu — squint, lazy eye, cataracts, myopia, and more. Written for families in Hyderabad and across India.",
  alternates: { canonical: 'https://drbhargavipidugu.com/blog' },
  openGraph: {
    title: "Children's Eye Health Blog | Dr. Bhargavi Pidugu",
    description: "Expert articles on paediatric eye conditions — strabismus, amblyopia, cataracts, screen time, and vision development — written for Indian parents.",
    url: 'https://drbhargavipidugu.com/blog',
  },
}

async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    const res = await fetch(`${baseUrl}/api/blog/posts`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}
      >
        <div className="container-site">
          <p className="label-ui mb-3">Blog</p>
          <h1 className="heading-display mb-4">
            Insights on<br />
            <em style={{ color: 'var(--terracotta)' }}>children&apos;s eye health</em>
          </h1>
          <p className="text-lg max-w-2xl" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
            Practical, parent-friendly articles on paediatric ophthalmology — from spotting early signs to understanding treatment.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-padding">
        <div className="container-site">
          {posts.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-20">
                <div
                  className="text-6xl mb-4"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)', opacity: 0.3 }}
                >
                  ✎
                </div>
                <h3 className="heading-card mb-2">No blog posts yet</h3>
                <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)', fontSize: '0.9rem' }}>
                  Articles will appear here once published via the admin panel.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: {
                id: string
                slug: string
                title: string
                excerpt: string
                cover_image_url: string | null
                published_at: string | null
                content: string
                category: string
              }, i: number) => (
                <AnimatedSection key={post.id} delay={i * 0.07}>
                  <Link href={`/blog/${post.slug}`} className="card-warm block overflow-hidden group" style={{ textDecoration: 'none' }}>
                    {/* Cover */}
                    <div className="w-full h-48 relative overflow-hidden">
                      <BlogPostThumbnail
                        category={post.category as 'paediatric-eye-health' | 'for-parents' | 'strabismus' | 'neuro-ophthalmology' | 'general-eye-care'}
                        title={post.title}
                        className="absolute inset-0"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3 text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.published_at ? formatDate(post.published_at) : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {estimateReadTime(post.content)} min read
                        </span>
                      </div>

                      <h2 className="heading-card mb-2 line-clamp-2 group-hover:text-[var(--terracotta)] transition-colors">
                        {post.title}
                      </h2>
                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-3"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}
                      >
                        {post.excerpt?.slice(0, 120)}{post.excerpt?.length > 120 ? '…' : ''}
                      </p>

                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)' }}
                      >
                        Read more <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
