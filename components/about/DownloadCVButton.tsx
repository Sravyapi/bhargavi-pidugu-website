'use client'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function DownloadCVButton() {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cv')
      if (!res.ok) throw new Error('Failed to generate CV')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Dr_Bhargavi_Pidugu_CV.pdf'
      a.click()
      URL.revokeObjectURL(url)
      toast.success('CV downloaded successfully')
    } catch {
      toast.error('Could not download CV. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDownload} disabled={loading} className="btn-secondary gap-2">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
      {loading ? 'Generating PDF…' : 'Download CV (PDF)'}
    </button>
  )
}
