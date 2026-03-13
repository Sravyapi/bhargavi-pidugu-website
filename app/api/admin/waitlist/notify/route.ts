import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'
import { getResend, FROM_EMAIL } from '@/lib/email/resend'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { subject, message } = body

    if (!subject || !message) {
      return NextResponse.json({ success: false, error: 'subject and message are required.' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Get all un-notified entries
    const { data: entries, error } = await supabase
      .from('waitlist')
      .select('*')
      .is('notified_at', null)

    if (error) throw error
    if (!entries || entries.length === 0) {
      return NextResponse.json({ success: true, data: { sent: 0 } })
    }

    const resend = getResend()

    const results = await Promise.allSettled(
      (entries || []).map(async (entry) => {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: entry.email,
          subject,
          html: `<p>Dear ${entry.name},</p><p>${message}</p><p>— Dr. Bhargavi Pidugu</p>`,
        })
        return entry.id
      })
    )

    let sent = 0
    const notifiedIds: string[] = []
    for (const result of results) {
      if (result.status === 'fulfilled') {
        sent++
        notifiedIds.push(result.value)
      } else {
        console.error('[notify] Email failed:', result.reason)
      }
    }

    // Batch update all successful sends
    if (notifiedIds.length > 0) {
      await supabase
        .from('waitlist')
        .update({ notified_at: new Date().toISOString() })
        .in('id', notifiedIds)
    }

    return NextResponse.json({ success: true, data: { sent } })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/waitlist/notify POST]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
