import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/admin'

  // Validate redirect target to prevent open redirect
  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/admin'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Exchange failed or no code — send back to login
  return NextResponse.redirect(`${origin}/admin/login?error=auth`)
}
