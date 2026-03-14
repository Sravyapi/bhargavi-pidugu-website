'use client'
import { useEffect } from 'react'

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[AdminError]', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm">
        <p className="label-ui mb-3">Admin Error</p>
        <h2 className="heading-card mb-3">Something went wrong</h2>
        <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button onClick={reset} className="btn-primary">Retry</button>
      </div>
    </div>
  )
}
