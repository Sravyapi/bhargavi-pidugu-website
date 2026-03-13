import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { exchangeCodeForTokens } from '@/lib/google/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.redirect(new URL('/admin/settings?error=no_code', request.url))
    }

    const tokens = await exchangeCodeForTokens(code)
    const expiry = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

    const supabase = await createAdminClient()

    // Delete any existing tokens, then insert fresh
    await supabase.from('google_tokens').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const { error } = await supabase.from('google_tokens').insert({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry,
      calendar_id: 'primary',
    })

    if (error) throw error

    return NextResponse.redirect(new URL('/admin/settings?google=connected', request.url))
  } catch (error) {
    console.error('[auth/google/callback]', error)
    return NextResponse.redirect(new URL('/admin/settings?error=auth_failed', request.url))
  }
}
