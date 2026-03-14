'use client'
import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Upload, Trash2, Loader2 } from 'lucide-react'

type Photo = {
  id: string
  url: string
  caption: string | null
  display_order: number
}

export default function PhotosPage() {
  const qc = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['admin-photos'],
    queryFn: async () => {
      const res = await fetch('/api/admin/photos')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/photos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-photos'] }); toast.success('Photo deleted') },
    onError: () => toast.error('Could not delete photo'),
  })

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/admin/photos', { method: 'POST', body: formData })
        if (!res.ok) throw new Error('Upload failed')
      }
      qc.invalidateQueries({ queryKey: ['admin-photos'] })
      toast.success(`${files.length} photo(s) uploaded`)
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-section">Photos</h1>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-primary"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading…' : 'Upload Photos'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleUpload(e.target.files)}
        />
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed rounded-2xl p-8 text-center mb-6 cursor-pointer transition-colors hover:border-[var(--terracotta)]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files) }}
      >
        <Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--stone-light)' }} />
        <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          Drag & drop photos here, or click to browse
        </p>
        <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>
          JPG, PNG, WebP supported
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</div>
      ) : photos.length === 0 ? (
        <div className="text-center py-8 text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No photos uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo: Photo) => (
            <div key={photo.id} className="card-warm overflow-hidden group">
              <div
                className="w-full aspect-square relative"
                style={{ background: 'var(--surface)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || 'Gallery photo'}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    if (confirm('Delete this photo?')) deleteMutation.mutate(photo.id)
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.6)' }}
                >
                  <Trash2 size={12} color="white" />
                </button>
              </div>
              {photo.caption && (
                <div className="p-2">
                  <p className="text-xs line-clamp-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                    {photo.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
