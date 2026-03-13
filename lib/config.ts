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
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
})

// Only validate at runtime (not during build type-checking)
function getConfig() {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    // Log warnings but don't crash build — missing vars cause runtime errors naturally
    console.warn('[config] Missing env vars:', parsed.error.flatten().fieldErrors)
    return process.env as z.infer<typeof envSchema>
  }
  return parsed.data
}

export const config = getConfig()

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
  shortCredentials: 'MS · Ophthalmology',
  speciality: 'Paediatric Ophthalmologist',
  institute: 'LV Prasad Eye Institute, Hyderabad',
} as const
