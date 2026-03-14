import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft } from 'lucide-react'
import { ClientBlogEditor } from '@/components/admin/ClientBlogEditor'

export const metadata: Metadata = { title: 'Edit Blog Post' }

export default async function EditBlogPost({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) notFound()

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blog" className="btn-ghost p-1.5">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="heading-section">Edit Post</h1>
      </div>
      <div className="card-warm p-6">
        <ClientBlogEditor initialData={post} />
      </div>
    </div>
  )
}
