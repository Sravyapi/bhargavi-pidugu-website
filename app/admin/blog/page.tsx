'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { toast } from 'sonner'
import { Plus, Edit3, Trash2, Eye, EyeOff } from 'lucide-react'

type BlogPost = {
  id: string
  title: string
  slug: string
  published: boolean
  published_at: string | null
  created_at: string
}

export default function AdminBlogPage() {
  const qc = useQueryClient()

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: async () => {
      const res = await fetch('/api/admin/blog')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published }),
      })
      if (!res.ok) throw new Error('Failed')
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); toast.success('Updated') },
    onError: () => toast.error('Could not update post'),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); toast.success('Post deleted') },
    onError: () => toast.error('Could not delete post'),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-section">Blog</h1>
        <Link href="/admin/blog/new" className="btn-primary text-sm">
          <Plus size={14} /> New Post
        </Link>
      </div>

      {isLoading ? (
        <div className="card-warm p-8 text-center text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</div>
      ) : posts.length === 0 ? (
        <div className="card-warm p-8 text-center">
          <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No blog posts yet.</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm">
            <Plus size={14} /> Create First Post
          </Link>
        </div>
      ) : (
        <div className="card-warm overflow-hidden">
          <table className="w-full text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
            <thead>
              <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {['Title', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left p-4 font-semibold text-xs" style={{ color: 'var(--charcoal)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post: BlogPost, i: number) => (
                <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td className="p-4">
                    <p className="font-medium" style={{ color: 'var(--charcoal)' }}>{post.title}</p>
                    <p className="text-xs" style={{ color: 'var(--stone)' }}>/{post.slug}</p>
                  </td>
                  <td className="p-4 text-xs" style={{ color: 'var(--stone)' }}>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-IN')
                      : new Date(post.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: post.id, published: !post.published })}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: post.published ? 'var(--sage-dark)' : 'var(--stone)' }}
                    >
                      {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 rounded-lg hover:bg-[var(--surface)]">
                        <Edit3 size={14} style={{ color: 'var(--terracotta)' }} />
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm('Delete this post?')) deleteMutation.mutate(post.id)
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--surface)]"
                      >
                        <Trash2 size={14} style={{ color: 'var(--stone)' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
