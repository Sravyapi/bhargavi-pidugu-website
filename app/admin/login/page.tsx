'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { sendMagicLink } from './actions'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sendMagicLink(email)
      setSent(true)
      toast.success('Magic link sent! Check your inbox.')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send magic link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)' }}>
            Dr. Bhargavi Pidugu
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--terracotta)', letterSpacing: '0.1em' }} className="uppercase">
            Admin Panel
          </p>
        </div>

        <div className="card-warm p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--sage-dark)' }} />
              <h2 className="heading-card mb-2">Check your inbox</h2>
              <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                A magic link has been sent to <strong>{email}</strong>. Click the link to sign in.
              </p>
              <button className="btn-ghost mt-4" onClick={() => setSent(false)}>
                Try again
              </button>
            </div>
          ) : (
            <>
              <h2 className="heading-card mb-2">Admin Sign In</h2>
              <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                Enter your email to receive a secure magic link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="field-base"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                  {loading ? 'Sending…' : 'Send Magic Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
