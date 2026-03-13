'use client'

import dynamic from 'next/dynamic'
import type { BlogPost } from '@/lib/types'

const BlogEditor = dynamic(() => import('@/components/admin/BlogEditor').then(m => ({ default: m.BlogEditor })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 rounded-full border-2 border-[var(--terracotta)] border-t-transparent animate-spin" />
    </div>
  ),
})

export function ClientBlogEditor({ initialData }: { initialData?: BlogPost }) {
  const data = initialData
    ? { ...initialData, excerpt: initialData.excerpt ?? undefined }
    : undefined
  return <BlogEditor initialData={data} />
}
