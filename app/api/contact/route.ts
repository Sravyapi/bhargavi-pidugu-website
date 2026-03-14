import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { ContactFormSchema } from '@/lib/validations'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { contactConfirmationPatient, contactNotificationAdmin } from '@/lib/email/templates/contact-confirmation'
import { BOOKING_LIMITS } from '@/lib/constants'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = ContactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, phone, email, reason } = result.data
    const supabase = await createAdminClient()

    // Rate limit: max 3 submissions from same email per hour
    const rateLimitExceeded = await checkRateLimit(supabase, {
      table: 'contact_messages',
      emailColumn: 'email',
      email,
      maxPerHour: BOOKING_LIMITS.MAX_CONTACT_REQUESTS_PER_HOUR,
    })
    if (rateLimitExceeded) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, phone, email, reason })

    if (error) throw error

    const resend = getResend()
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Thank you for reaching out — Dr. Bhargavi Pidugu',
        html: contactConfirmationPatient(name),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New contact message from ${name}`,
        html: contactNotificationAdmin({ name, phone, email, reason }),
      }),
    ])
    const emailFailures = emailResults.filter(r => r.status === 'rejected')
    if (emailFailures.length > 0) {
      console.error('[contact/route] Email send failures:', emailFailures.map(f => (f as PromiseRejectedResult).reason))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact/route]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
