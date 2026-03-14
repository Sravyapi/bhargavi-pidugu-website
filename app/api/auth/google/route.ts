import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getGoogleAuthUrl, generateOAuthState } from '@/lib/google/auth'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const state = generateOAuthState()
    const authUrl = getGoogleAuthUrl(state)
    const response = NextResponse.redirect(authUrl)
    response.cookies.set('google_oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    })
    return response
  } catch (error) {
    console.error('[auth/google GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to generate auth URL.' }, { status: 500 })
  }
}
