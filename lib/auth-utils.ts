import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export class UnauthorizedError extends Error {
  constructor() { super('Unauthorized') }
}

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new UnauthorizedError()
  }
  return user
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
}
