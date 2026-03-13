import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}
    >
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-light mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)', opacity: 0.5 }}
        >
          404
        </div>
        <h1 className="heading-section mb-4">Page Not Found</h1>
        <p className="text-base mb-8" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
