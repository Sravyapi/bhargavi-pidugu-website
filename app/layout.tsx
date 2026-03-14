import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL } from '@/lib/config'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
})

const BASE_URL = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist & Strabismus Specialist, Hyderabad',
    template: '%s | Dr. Bhargavi Pidugu',
  },
  description: "Fellowship-trained paediatric ophthalmologist specialising in children's eye care, strabismus surgery, and neuro-ophthalmology at LV Prasad Eye Institute, Hyderabad.",
  keywords: [
    'paediatric ophthalmologist Hyderabad',
    'strabismus surgeon Hyderabad',
    'squint surgery children Hyderabad',
    'children eye doctor Hyderabad',
    'LV Prasad Eye Institute',
    'lazy eye treatment Hyderabad',
    'congenital cataract surgery',
    'neuro-ophthalmology Hyderabad',
    'best paediatric eye doctor Hyderabad',
    'squint treatment Hyderabad',
  ],
  authors: [{ name: 'Dr. Bhargavi Pidugu', url: BASE_URL }],
  creator: 'Dr. Bhargavi Pidugu',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Dr. Bhargavi Pidugu',
    title: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist & Strabismus Specialist, Hyderabad',
    description: "Fellowship-trained paediatric ophthalmologist at LV Prasad Eye Institute, Hyderabad. Specialist in strabismus surgery, paediatric cataracts, and neuro-ophthalmology.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmologist, Hyderabad',
    description: "Fellowship-trained paediatric ophthalmologist at LV Prasad Eye Institute, Hyderabad.",
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? 'SI3Gi320iaboamlNoFHElRVVhPL1BM72x_D1JXhd7j4',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Bhargavi Pidugu',
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  description: "Fellowship-trained paediatric ophthalmologist specialising in strabismus surgery, paediatric cataracts, and neuro-ophthalmology.",
  jobTitle: 'Paediatric Ophthalmologist & Strabismus Specialist',
  worksFor: {
    '@type': 'MedicalOrganization',
    name: 'LV Prasad Eye Institute',
    url: 'https://lvpei.org',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kallam Anji Reddy Campus, Banjara Hills',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500034',
      addressCountry: 'IN',
    },
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Kakatiya Medical College, Warangal' },
    { '@type': 'CollegeOrUniversity', name: 'Bhaskara Medical College, Hyderabad' },
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MS Ophthalmology' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MBBS' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'fellowship', name: 'Fellowship in Paediatric Ophthalmology, Neuro-Ophthalmology & Strabismus, LV Prasad Eye Institute' },
  ],
  medicalSpecialty: ['Ophthalmology', 'Paediatric Ophthalmology', 'Neuro-Ophthalmology'],
  knowsAbout: ['Strabismus', 'Paediatric Cataract', 'Amblyopia', 'Nystagmus', 'Optic Neuritis', 'Retinopathy of Prematurity'],
  sameAs: [],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Dr. Bhargavi Pidugu — Paediatric Ophthalmology',
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  description: "Subspecialty paediatric eye care clinic — strabismus, paediatric cataracts, neuro-ophthalmology, and general children's eye care.",
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Card, UPI',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kallam Anji Reddy Campus, Banjara Hills',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500034',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '17.4165',
    longitude: '78.4480',
  },
  telephone: '+91-96186-89030',
  email: 'dr.bhargavipidugu@gmail.com',
  medicalSpecialty: 'Ophthalmology',
  hasMap: 'https://maps.google.com/?q=LV+Prasad+Eye+Institute+Banjara+Hills+Hyderabad',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <QueryProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </QueryProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
