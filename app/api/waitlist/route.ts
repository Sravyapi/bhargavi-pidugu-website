import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { WaitlistSchema } from '@/lib/validations'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { waitlistConfirmation } from '@/lib/email/templates/waitlist'

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

    const { name, email } = result.data
    const supabase = await createAdminClient()

    const { error } = await supabase
      .from('waitlist')
      .upsert({ name, email }, { onConflict: 'email', ignoreDuplicates: true })

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
        html: `<p>New waitlist entry: <strong>${name}</strong> — ${email}</p>`,
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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
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
