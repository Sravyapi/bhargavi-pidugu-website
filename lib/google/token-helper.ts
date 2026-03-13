import { getValidAccessToken } from './auth'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { GoogleTokens } from '@/lib/types'

export async function getAndUpdateAccessToken(
  googleTokens: GoogleTokens,
  supabase: SupabaseClient
): Promise<string> {
  return getValidAccessToken(
    googleTokens.access_token,
    googleTokens.refresh_token,
    googleTokens.expiry,
    async (token, expiry) => {
      await supabase
        .from('google_tokens')
        .update({ access_token: token, expiry: expiry.toISOString() })
        .eq('id', googleTokens.id)
    }
  )
}
