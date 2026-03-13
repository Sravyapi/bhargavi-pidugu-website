import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: {
    default: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist & Strabismus Specialist',
    template: '%s | Dr. Bhargavi Pidugu',
  },
  description: "Fellowship-trained paediatric ophthalmologist specialising in children's eye care, strabismus surgery, and neuro-ophthalmology at LV Prasad Eye Institute, Hyderabad.",
  keywords: ['paediatric ophthalmologist', 'strabismus surgeon', 'children eye doctor', 'LV Prasad Eye Institute', 'Hyderabad ophthalmologist', 'squint surgery', 'neuro-ophthalmology'],
  authors: [{ name: 'Dr. Bhargavi Pidugu' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://drbhargavipidugu.com',
    siteName: 'Dr. Bhargavi Pidugu',
    title: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist',
    description: 'Fellowship-trained paediatric ophthalmologist at LV Prasad Eye Institute, Hyderabad.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </QueryProvider>
      </body>
    </html>
  )
}
