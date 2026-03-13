import { Resend } from 'resend'

let resendClient: Resend | null = null

export function getResend(): Resend {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'PASTE_YOUR_RESEND_API_KEY_HERE') {
      // Mock client for development — logs emails to console
      return {
        emails: {
          send: async (payload: unknown) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[EMAIL MOCK] Would send:', JSON.stringify(payload, null, 2))
            }
            return { data: { id: 'mock-email-id' }, error: null }
          },
        },
      } as unknown as Resend
    }
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@drbhargavipidugu.com'
export const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'dr.bhargavipidugu@gmail.com'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drbhargavipidugu.com'
