'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Calendar, Clock, Mail, Edit3, Image, Settings, LogOut, Menu, X
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/availability', label: 'Availability', icon: Clock },
  { href: '/admin/contacts', label: 'Contact Messages', icon: Mail },
  { href: '/admin/blog', label: 'Blog', icon: Edit3 },
  { href: '/admin/photos', label: 'Photos', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const NavContent = () => (
    <>
      {/* Brand */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <p style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 400 }} className="text-lg">
          Dr. Bhargavi
        </p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--terracotta-light)', letterSpacing: '0.1em' }} className="uppercase">
          Admin Panel
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                fontFamily: 'var(--font-ui)',
                background: active ? 'var(--terracotta)' : 'transparent',
                color: active ? 'white' : 'rgba(255,255,255,0.7)',
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all"
            style={{ fontFamily: 'var(--font-ui)', color: 'rgba(255,255,255,0.6)' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg"
        style={{ background: 'var(--charcoal)', color: 'white' }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 min-h-screen shrink-0"
        style={{ background: 'var(--charcoal)' }}
      >
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <aside
            className="flex flex-col w-56 min-h-screen"
            style={{ background: 'var(--charcoal)' }}
          >
            <NavContent />
          </aside>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
