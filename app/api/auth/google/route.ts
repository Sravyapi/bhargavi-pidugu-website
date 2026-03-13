import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getGoogleAuthUrl } from '@/lib/google/auth'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const authUrl = getGoogleAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('[auth/google GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to generate auth URL.' }, { status: 500 })
  }
}
