import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Areas of Expertise',
  description: 'Subspecialty paediatric eye care in Hyderabad — congenital cataract surgery, strabismus correction, neuro-ophthalmology, and amblyopia treatment at LV Prasad Eye Institute.',
  alternates: { canonical: `${SITE_URL}/expertise` },
  keywords: [
    'paediatric cataract surgery Hyderabad',
    'strabismus surgery children Hyderabad',
    'squint treatment Hyderabad',
    'neuro-ophthalmology Hyderabad',
    'lazy eye treatment Hyderabad',
    'amblyopia treatment children',
    'congenital cataract surgery baby',
    'LV Prasad Eye Institute paediatric',
  ],
  openGraph: {
    title: 'Areas of Expertise | Dr. Bhargavi Pidugu',
    description: 'Paediatric cataract, strabismus surgery, neuro-ophthalmology, and general eye care for children — at LV Prasad Eye Institute, Hyderabad.',
    url: `${SITE_URL}/expertise`,
  },
}

export default function ExpertiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
