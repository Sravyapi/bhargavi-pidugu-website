import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, UnauthorizedError } from '@/lib/auth-utils'
import { FILE_UPLOAD } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ success: false, error: 'File must be an image.' }, { status: 400 })
    if (file.size > FILE_UPLOAD.GALLERY_MAX_SIZE_BYTES) return NextResponse.json({ success: false, error: 'File must be under 5MB.' }, { status: 400 })

    const supabase = await createAdminClient()
    const buffer = await file.arrayBuffer()

    const { error: uploadError } = await supabase.storage
      .from('hero')
      .upload('hero.jpg', buffer, { contentType: file.type, upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from('hero').getPublicUrl('hero.jpg')
    const url = urlData.publicUrl + `?t=${Date.now()}`

    await supabase
      .from('site_content')
      .upsert({ key: 'hero_image_url', value: url, updated_at: new Date().toISOString() }, { onConflict: 'key' })

    return NextResponse.json({ success: true, data: { url } })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/upload/hero POST]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
