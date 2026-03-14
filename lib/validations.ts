import { z } from 'zod'

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(phoneRegex, 'Please enter a valid Indian phone number'),
  email: z.string().email('Please enter a valid email address'),
  reason: z.string().min(1, 'Please select a reason for contact').max(1000),
})
export type ContactFormInput = z.infer<typeof ContactFormSchema>

export const WaitlistSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number').optional(),
  message: z.string().max(500).optional(),
})
export type WaitlistInput = z.infer<typeof WaitlistSchema>

export const BookingStep3Schema = z.object({
  patient_name: z.string().min(2, 'Patient name is required').max(100),
  patient_dob: z.string().refine((d) => {
    const date = new Date(d)
    return !isNaN(date.getTime()) && date < new Date()
  }, 'Please enter a valid date of birth'),
  relation_to_patient: z.enum(['self', 'parent-guardian', 'spouse', 'sibling', 'other']),
  contact_email: z.string().email('Please enter a valid email address'),
  contact_phone: z.string().regex(phoneRegex, 'Please enter a valid Indian phone number'),
  whatsapp_preferred: z.boolean().default(false),
  concern_type: z.enum([
    'squint-strabismus',
    'lazy-eye-amblyopia',
    'refractive-error-child',
    'paediatric-cataract',
    'neuro-ophthalmology',
    'general-eye-examination',
    'follow-up',
    'other',
  ]),
  concern_description: z.string().min(20, 'Please describe the concern (at least 20 characters)').max(500),
  previous_diagnosis: z.string().max(300).optional(),
  current_prescription: z.string().max(200).optional(),
  previous_surgeries: z.boolean().optional(),
  surgery_details: z.string().max(300).optional(),
})
export type BookingStep3Input = z.infer<typeof BookingStep3Schema>

export const FaqSchema = z.object({
  question: z.string().min(5).max(300),
  answer: z.string().min(10).max(2000),
  order_index: z.number().int().min(0).optional(),
})

export const BlogPostSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().max(300).optional(),
  body: z.string().optional(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
  category: z.enum([
    'paediatric-eye-health',
    'for-parents',
    'strabismus',
    'neuro-ophthalmology',
    'general-eye-care',
  ]).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  published_at: z.string().optional(),
})
