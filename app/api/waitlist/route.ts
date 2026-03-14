import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { WaitlistSchema } from '@/lib/validations'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { waitlistConfirmation } from '@/lib/email/templates/waitlist'
import { requireAuth, UnauthorizedError, unauthorizedResponse } from '@/lib/auth-utils'
import { checkRateLimit } from '@/lib/rate-limit'
import { BOOKING_LIMITS } from '@/lib/constants'
import { escapeHtml } from '@/lib/email/templates/base'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = WaitlistSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = result.data
    const supabase = await createAdminClient()

    // Rate limit: max 3 attempts from same email per hour
    const rateLimitExceeded = await checkRateLimit(supabase, {
      table: 'waitlist',
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
      .from('waitlist')
      .upsert({ name, email, ...(phone ? { phone } : {}), ...(message ? { message } : {}) }, { onConflict: 'email', ignoreDuplicates: true })

    if (error) throw error

    const resend = getResend()
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're on the waitlist — Dr. Bhargavi Pidugu",
        html: waitlistConfirmation(name),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New waitlist signup: ${name} (${email})`,
        html: `<p>New waitlist entry: <strong>${escapeHtml(name)}</strong> — ${escapeHtml(email)}</p>`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[waitlist POST]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to join waitlist.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    try {
      await requireAuth()
    } catch (e) {
      if (e instanceof UnauthorizedError) return unauthorizedResponse()
      throw e
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[waitlist GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch waitlist.' }, { status: 500 })
  }
}
