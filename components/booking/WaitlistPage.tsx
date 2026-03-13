'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { Clock, Loader2, CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const fireConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#C2773E', '#8C9E94', '#E8BF9A', '#B8C8BF'],
  })
}

export function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        fireConfetti()
        toast.success("You're on the waitlist! We'll notify you when bookings open.")
        reset()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    }
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'linear-gradient(135deg, var(--warm-beige), var(--cream))' }}>
      <div className="container-site section-padding">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(194,119,62,0.12)', border: '2px solid rgba(194,119,62,0.3)' }}
            >
              <Clock size={32} style={{ color: 'var(--terracotta)' }} />
            </div>
            <p className="label-ui mb-3 justify-center">Coming Soon</p>
            <h1 className="heading-display mb-4">
              Consultations<br />
              <em style={{ color: 'var(--terracotta)' }}>opening soon</em>
            </h1>
            <p className="text-base" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
              Online consultations are launching <strong>post-June 2026</strong>, once Dr. Bhargavi completes her fellowship at LV Prasad Eye Institute.
            </p>
            <div
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: 'rgba(140,158,148,0.15)', color: 'var(--sage-dark)', fontFamily: 'var(--font-ui)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
              Fellowship ends June 2026
            </div>
          </div>

          {submitted ? (
            <div className="card-warm p-8 text-center">
              <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--sage-dark)' }} />
              <h2 className="heading-card mb-2">You&apos;re on the list!</h2>
              <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                We&apos;ll send you an email as soon as online consultations open. Thank you for your interest.
              </p>
              <button className="btn-ghost mt-4" onClick={() => setSubmitted(false)}>
                Add another contact
              </button>
            </div>
          ) : (
            <div className="card-warm p-6 md:p-8">
              <h2 className="heading-card mb-2">Join the waitlist</h2>
              <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                Be the first to know when online consultations become available.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                      Full Name *
                    </label>
                    <input {...register('name')} placeholder="Your name" className="field-base" />
                    {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                      Phone *
                    </label>
                    <input {...register('phone')} placeholder="10-digit mobile" className="field-base" type="tel" />
                    {errors.phone && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                    Email *
                  </label>
                  <input {...register('email')} placeholder="your@email.com" className="field-base" type="email" />
                  {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                    Brief message (optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Tell us briefly about your concern…"
                    className="field-base resize-none"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isSubmitting ? 'Joining…' : 'Join the Waitlist'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
