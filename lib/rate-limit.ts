import type { SupabaseClient } from '@supabase/supabase-js'

interface RateLimitOptions {
  /** Table to check for recent records */
  table: string
  /** Column holding the email address */
  emailColumn: string
  /** Email to check */
  email: string
  /** Max submissions allowed within a one-hour window */
  maxPerHour: number
}

/**
 * Returns `true` if the given email has exceeded `maxPerHour` submissions
 * in the last 60 minutes, `false` otherwise.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  { table, emailColumn, email, maxPerHour }: RateLimitOptions
): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count } = await supabase
    .from(table)
    .select('id', { count: 'exact', head: true })
    .eq(emailColumn, email)
    .gte('created_at', oneHourAgo)
  return (count ?? 0) >= maxPerHour
}
