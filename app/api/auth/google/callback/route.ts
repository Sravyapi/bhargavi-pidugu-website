import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { exchangeCodeForTokens } from '@/lib/google/auth'
import { requireAuth } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    // Verify OAuth state parameter to prevent CSRF
    const storedState = request.cookies.get('google_oauth_state')?.value
    if (!state || !storedState || state !== storedState) {
      return NextResponse.redirect(new URL('/admin/settings?error=invalid_state', request.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL('/admin/settings?error=no_code', request.url))
    }

    const tokens = await exchangeCodeForTokens(code)
    const expiry = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

    const supabase = await createAdminClient()

    // Delete any existing tokens, then insert fresh
    await supabase.from('google_tokens').delete().not('id', 'is', null)

    const { error } = await supabase.from('google_tokens').insert({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry,
      calendar_id: 'primary',
    })

    if (error) throw error

    const response = NextResponse.redirect(new URL('/admin/settings?google=connected', request.url))
    response.cookies.delete('google_oauth_state')
    return response
  } catch (error) {
    console.error('[auth/google/callback]', error)
    return NextResponse.redirect(new URL('/admin/settings?error=auth_failed', request.url))
  }
}
