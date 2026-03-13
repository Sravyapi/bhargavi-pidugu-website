import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'
import { PAGINATION } from '@/lib/constants'
import { z } from 'zod'

const QuerySchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  date_from: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
  date_to: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(PAGINATION.DEFAULT_PAGE_SIZE),
  search: z.string().max(100).optional(),
})

export async function GET(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const rawQuery = {
      status: searchParams.get('status') ?? undefined,
      date_from: searchParams.get('date_from') ?? undefined,
      date_to: searchParams.get('date_to') ?? undefined,
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    }

    const parsed = QuerySchema.safeParse(rawQuery)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 })
    }

    const { status, date_from, date_to, page, limit, search } = parsed.data
    const concern_type = searchParams.get('concern_type')
    const offset = (page - 1) * limit

    const supabase = await createAdminClient()
    let query = supabase
      .from('appointments')
      .select('*', { count: 'exact' })
      .order('slot_datetime', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) query = query.eq('status', status)
    if (date_from) query = query.gte('slot_datetime', date_from)
    if (date_to) query = query.lte('slot_datetime', date_to)
    if (concern_type) query = query.eq('concern_type', concern_type)
    if (search) {
      const escapedSearch = search.replace(/[%_\\]/g, (c) => `\\${c}`)
      query = query.or(`patient_name.ilike.%${escapedSearch}%,contact_email.ilike.%${escapedSearch}%,contact_phone.ilike.%${escapedSearch}%`)
    }

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({
      success: true,
      data: { appointments: data, total: count, page, limit },
    })
  } catch (error) {
    console.error('[admin/appointments GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch appointments.' }, { status: 500 })
  }
}
