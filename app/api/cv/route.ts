import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
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
