import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    const header = 'Name,Email,Notified At,Joined At\n'
    const rows = (data || [])
      .map((entry: { name: string; email: string; notified_at: string | null; created_at: string }) =>
        `"${entry.name}","${entry.email}","${entry.notified_at || ''}","${entry.created_at}"`
      )
      .join('\n')

    const csv = header + rows

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="waitlist.csv"',
      },
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/waitlist/export GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
