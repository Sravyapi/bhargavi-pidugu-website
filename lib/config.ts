import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().url(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
})

// Validate at runtime. Required vars throw immediately; optional vars warn only.
function getConfig() {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
    const missingRequired = required.filter(k => k in errors)
    if (missingRequired.length > 0) {
      throw new Error(`[config] Missing required env vars: ${missingRequired.join(', ')}`)
    }
    console.warn('[config] Missing optional env vars:', errors)
    return process.env as z.infer<typeof envSchema>
  }
  return parsed.data
}

export const config = getConfig()

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bhargavipidugu.vercel.app'


export const CONTACT = {
  phone: '+91 96186 89030',
  phoneHref: 'tel:+919618689030',
  email: 'dr.bhargavipidugu@gmail.com',
  emailHref: 'mailto:dr.bhargavipidugu@gmail.com',
  clinic: {
    name: 'LV Prasad Eye Institute',
    campus: 'Kallam Anji Reddy Campus',
    area: 'Road No. 2, Banjara Hills',
    city: 'Hyderabad – 500 034',
  },
} as const

export const DOCTOR = {
  name: 'Dr. Bhargavi Pidugu',
  credentials: 'MS (Ophthalmology) · MBBS',
} as const
