import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth, unauthorizedResponse } from '@/lib/auth-utils'
import { FILE_UPLOAD } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    try {
      await requireAuth()
    } catch {
      return unauthorizedResponse()
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) return NextResponse.json({ success: false, error: 'No files provided.' }, { status: 400 })

    const supabase = await createAdminClient()

    // Get current max order_index
    const { data: existing } = await supabase
      .from('gallery_images')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    let orderIndex = (existing?.[0]?.order_index ?? -1) + 1

    const uploaded = []

    for (const file of files.slice(0, FILE_UPLOAD.GALLERY_MAX_COUNT)) {
      if (!(file instanceof File)) continue
      if (!file.type.startsWith('image/')) continue
      if (file.size > FILE_UPLOAD.GALLERY_MAX_SIZE_BYTES) continue

      const ext = file.name.split('.').pop() || 'jpg'
      const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = await file.arrayBuffer()

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(storagePath, buffer, { contentType: file.type })

      if (uploadError) {
        console.error('Gallery upload error:', uploadError)
        continue
      }

      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(storagePath)

      const { data: imageRecord, error: dbError } = await supabase
        .from('gallery_images')
        .insert({
          url: urlData.publicUrl,
          storage_path: storagePath,
          order_index: orderIndex++,
        })
        .select()
        .single()

      if (!dbError && imageRecord) uploaded.push(imageRecord)
    }

    return NextResponse.json({ success: true, data: { images: uploaded } })
  } catch (error) {
    console.error('[admin/upload/gallery POST]', error)
    return NextResponse.json({ success: false, error: 'Failed to upload gallery images.' }, { status: 500 })
  }
}
