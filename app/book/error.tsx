'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function BookError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[book error]', error)
  }, [error])

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="container-site max-w-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--warm-beige)', color: 'var(--terracotta)' }}
        >
          <span className="text-2xl">!</span>
        </div>
        <h2
          className="text-xl font-semibold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
        >
          Something went wrong
        </h2>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}
        >
          We couldn&apos;t load the booking page. Please try again or contact us directly.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary text-sm"
          >
            Try again
          </button>
          <Link href="/contact" className="btn-secondary text-sm">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
