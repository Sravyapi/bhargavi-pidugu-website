'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[RootError]', error)
  }, [error])

  return (
    <div
      className="min-h-screen flex items-center justify-center section-padding"
      style={{ background: 'var(--bg)' }}
    >
      <div className="text-center max-w-md">
        <p className="label-ui mb-4">Something went wrong</p>
        <h2 className="heading-section mb-4">We hit a snag</h2>
        <p className="text-sm mb-8" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          Something went wrong. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-secondary">Go home</Link>
        </div>
      </div>
    </div>
  )
}
