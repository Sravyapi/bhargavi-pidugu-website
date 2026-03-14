import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simple in-memory IP rate limit: max 5 downloads per IP per hour
// NOTE: In-memory rate limiting is ineffective in serverless environments
// where each invocation may use a different instance. Kept as best-effort.
const cvRateMap = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  // Cap map size to prevent unbounded memory growth
  if (cvRateMap.size > 10000) {
    cvRateMap.clear()
  }
  const now = Date.now()
  const cutoff = now - 60 * 60 * 1000
  const hits = (cvRateMap.get(ip) ?? []).filter(t => t > cutoff)
  if (hits.length >= 5) return true
  cvRateMap.set(ip, [...hits, now])
  return false
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const { generateCVPdf } = await import('@/lib/pdf/cv-document')
    const buffer = await generateCVPdf()
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Bhargavi_Pidugu_CV.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[cv GET]', error)
    return NextResponse.json({ success: false, error: 'Failed to generate CV.' }, { status: 500 })
  }
}
