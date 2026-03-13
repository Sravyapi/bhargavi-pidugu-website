'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { Send, Loader2 } from 'lucide-react'
import { apiFetch, ApiError } from '@/lib/api-client'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  reason: z.enum(['general_inquiry', 'appointment_query', 'second_opinion', 'other']),
  message: z.string().min(10, 'Please describe your query in at least 10 characters').max(1000),
})

type FormData = z.infer<typeof schema>

const REASONS = [
  { value: 'general_inquiry', label: 'General Inquiry' },
  { value: 'appointment_query', label: 'Appointment Query' },
  { value: 'second_opinion', label: 'Second Opinion' },
  { value: 'other', label: 'Other' },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: 'general_inquiry' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await apiFetch('/api/contact', data)
      setSubmitted(true)
      toast.success('Message sent! Dr. Bhargavi will get back to you shortly.')
      reset()
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error('Network error. Please try again.')
      }
    }
  }

  if (submitted) {
    return (
      <div className="card-warm p-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(168,196,164,0.3)' }}>
          <Send size={24} style={{ color: 'var(--sage-dark)' }} />
        </div>
        <h3 className="heading-card mb-2">Message received!</h3>
        <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)', fontSize: '0.9rem' }}>
          Dr. Bhargavi will respond within 24–48 hours.
        </p>
        <button className="btn-ghost mt-4" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            Phone Number *
          </label>
          <input {...register('phone')} placeholder="10-digit mobile" className="field-base" type="tel" />
          {errors.phone && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
          Email Address *
        </label>
        <input {...register('email')} placeholder="your@email.com" className="field-base" type="email" />
        {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
          Reason for Contact *
        </label>
        <select {...register('reason')} className="field-base">
          {REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
          Message *
        </label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Describe your query or concern…"
          className="field-base resize-none"
        />
        {errors.message && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
