'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function BlogError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[BlogError]', error)
  }, [error])

  return (
    <div className="section-padding container-site text-center">
      <p className="label-ui mb-4">Blog</p>
      <h2 className="heading-section mb-4">Couldn&apos;t load posts</h2>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
        There was an error loading blog posts. Please try again.
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-secondary">Go home</Link>
      </div>
    </div>
  )
}
