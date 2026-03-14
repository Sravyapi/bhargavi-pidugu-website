import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ClientBlogEditor } from '@/components/admin/ClientBlogEditor'

export const metadata: Metadata = { title: 'New Blog Post' }

export default function NewBlogPost() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blog" className="btn-ghost p-1.5">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="heading-section">New Blog Post</h1>
      </div>
      <div className="card-warm p-6">
        <ClientBlogEditor />
      </div>
    </div>
  )
}
