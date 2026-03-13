import type { Metadata } from 'next'
import { WaitlistPage } from '@/components/booking/WaitlistPage'
import { BookingFlow } from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description: 'Book an online consultation with Dr. Bhargavi Pidugu, paediatric ophthalmologist.',
}

async function getBookingSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    const res = await fetch(`${baseUrl}/api/settings`, { next: { revalidate: 60 } })
    if (!res.ok) return { bookings_enabled: false }
    const data = await res.json()
    return data
  } catch {
    return { bookings_enabled: false }
  }
}

export default async function BookPage() {
  const settings = await getBookingSettings()
  const bookingsEnabled = settings?.bookings_enabled === true || settings?.bookings_enabled === 'true'

  if (!bookingsEnabled) {
    return <WaitlistPage />
  }

  return <BookingFlow />
}
