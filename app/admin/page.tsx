import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Calendar, MessageSquare, FileText, ToggleRight, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Dashboard' }

async function getDashboardStats(supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const todayStart = new Date(today + 'T00:00:00+05:30').toISOString()
    const todayEnd = new Date(today + 'T23:59:59+05:30').toISOString()

    const [
      { count: todayCount },
      { count: totalCount },
      { count: contactCount },
      { count: blogCount },
    ] = await Promise.all([
      supabase.from('appointments').select('*', { count: 'exact', head: true }).gte('slot_datetime', todayStart).lte('slot_datetime', todayEnd),
      supabase.from('appointments').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
    ])

    return { todayCount, totalCount, contactCount, blogCount }
  } catch {
    return { todayCount: 0, totalCount: 0, contactCount: 0, blogCount: 0 }
  }
}

async function getRecentAppointments(supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    return data || []
  } catch {
    return []
  }
}

async function getBookingsSetting(supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const { data } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', 'bookings_enabled')
      .single()
    return data?.value === 'true'
  } catch {
    return false
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [stats, appointments, bookingsEnabled] = await Promise.all([
    getDashboardStats(supabase),
    getRecentAppointments(supabase),
    getBookingsSetting(supabase),
  ])

  const statCards = [
    { label: "Today's Appointments", value: stats.todayCount ?? 0, icon: Calendar, href: '/admin/appointments' },
    { label: 'Total Appointments', value: stats.totalCount ?? 0, icon: Calendar, href: '/admin/appointments' },
    { label: 'Unread Contacts', value: stats.contactCount ?? 0, icon: MessageSquare, href: '/admin/contacts' },
    { label: 'Blog Posts Published', value: stats.blogCount ?? 0, icon: FileText, href: '/admin/blog' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-section mb-1">Dashboard</h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          Welcome back, Dr. Bhargavi
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <Link key={card.label} href={card.href} className="card-warm p-5 block" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface)' }}>
                  <Icon size={16} style={{ color: 'var(--terracotta)' }} />
                </div>
              </div>
              <div className="text-3xl font-light mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>
                {card.value}
              </div>
              <div className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                {card.label}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card-warm p-5">
          <h3 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}>
            Quick Actions
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
              <div>
                <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                  Accept Bookings
                </p>
                <p className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                  {bookingsEnabled ? 'Currently ON' : 'Currently OFF (Waitlist)'}
                </p>
              </div>
              <Link href="/admin/settings" className="btn-secondary text-xs py-1.5 px-3">
                <ToggleRight size={14} /> Toggle
              </Link>
            </div>
            <Link href="/admin/availability" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[var(--surface)]" style={{ textDecoration: 'none' }}>
              <Clock size={16} style={{ color: 'var(--terracotta)' }} />
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                Manage Availability
              </span>
            </Link>
          </div>
        </div>

        {/* Recent appointments */}
        <div className="card-warm p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}>
              Recent Appointments
            </h3>
            <Link href="/admin/appointments" className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)' }}>
              View all
            </Link>
          </div>
          {appointments.length === 0 ? (
            <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No appointments yet.</p>
          ) : (
            <div className="space-y-2">
              {appointments.map((apt: {
                id: string
                patient_name: string
                slot_date: string
                slot_time: string
                consultation_type: string
                status: string
              }) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg text-sm" style={{ background: 'var(--surface)', fontFamily: 'var(--font-ui)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--charcoal)' }}>{apt.patient_name}</p>
                    <p className="text-xs" style={{ color: 'var(--stone)' }}>{apt.slot_date} · {apt.slot_time}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: apt.status === 'confirmed' ? 'rgba(140,158,148,0.2)' : apt.status === 'cancelled' ? 'rgba(194,119,62,0.15)' : 'rgba(194,119,62,0.1)',
                      color: apt.status === 'confirmed' ? 'var(--sage-dark)' : 'var(--terracotta)',
                    }}
                  >
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
