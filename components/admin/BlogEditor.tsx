'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapImage from '@tiptap/extension-image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Image as ImageIcon, Loader2, Save } from 'lucide-react'

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug: lowercase letters, numbers, hyphens only'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters').max(300),
  published: z.boolean(),
})
type FormData = z.infer<typeof schema>

interface BlogEditorProps {
  initialData?: {
    id?: string
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    published?: boolean
  }
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

export function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      published: initialData?.published ?? false,
    },
  })

  const title = watch('title')

  useEffect(() => {
    if (!slugEdited && title) {
      setValue('slug', generateSlug(title))
    }
  }, [title, slugEdited, setValue])

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage.configure({ inline: false }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-stone max-w-none min-h-[300px] p-4 outline-none',
        style: 'font-family: var(--font-body)',
      },
    },
  })

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const payload = { ...data, content: editor?.getHTML() || '' }
      const url = initialData?.id ? `/api/admin/blog/${initialData.id}` : '/api/admin/blog'
      const method = initialData?.id ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(data.published ? 'Post published!' : 'Draft saved!')
        router.push('/admin/blog')
      } else {
        toast.error('Could not save post. Please try again.')
      }
    } catch {
      toast.error('Network error.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
            Title *
          </label>
          <input
            {...register('title')}
            placeholder="Post title"
            className="field-base text-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          />
          {errors.title && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.title.message}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
            Slug (URL) *
          </label>
          {(() => {
            const { onChange: onSlugChange, ...slugRest } = register('slug')
            return (
              <input
                {...slugRest}
                placeholder="post-url-slug"
                className="field-base"
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                onChange={(e) => { setSlugEdited(true); onSlugChange(e) }}
              />
            )
          })()}
          {errors.slug && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.slug.message}</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
            Excerpt * (shown in blog listing)
          </label>
          <textarea
            {...register('excerpt')}
            rows={3}
            placeholder="Brief description shown in the blog listing…"
            className="field-base resize-none"
          />
          {errors.excerpt && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.excerpt.message}</p>}
        </div>

        {/* TipTap Editor */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
            Content *
          </label>

          {/* Toolbar */}
          <div
            className="flex items-center gap-1 p-2 border-b rounded-t-lg flex-wrap"
            style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderBottom: '1px solid var(--border)' }}
          >
            {[
              { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), title: 'Bold' },
              { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), title: 'Italic' },
              { icon: Heading2, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), title: 'H2' },
              { icon: Heading3, action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), title: 'H3' },
              { icon: Quote, action: () => editor?.chain().focus().toggleBlockquote().run(), title: 'Quote' },
              { icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), title: 'Bullet List' },
              { icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), title: 'Ordered List' },
            ].map(btn => {
              const Icon = btn.icon
              return (
                <button
                  key={btn.title}
                  type="button"
                  title={btn.title}
                  onClick={btn.action}
                  className="p-1.5 rounded transition-colors hover:bg-[var(--border)]"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  <Icon size={14} />
                </button>
              )
            })}
            <button
              type="button"
              title="Insert Image"
              onClick={() => {
                const url = prompt('Image URL:')
                if (url) editor?.chain().focus().setImage({ src: url }).run()
              }}
              className="p-1.5 rounded transition-colors hover:bg-[var(--border)]"
              style={{ color: 'var(--charcoal-light)' }}
            >
              <ImageIcon size={14} />
            </button>
          </div>

          <div
            className="rounded-b-lg border"
            style={{ border: '1.5px solid var(--border)', borderTop: 'none', background: 'white', minHeight: '300px' }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Published toggle + Actions */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('published')}
              className="w-4 h-4 accent-[var(--terracotta)]"
            />
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
              Publish immediately
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/blog')}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving…' : 'Save Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
