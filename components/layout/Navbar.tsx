'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Info, Stethoscope, BookOpen, FlaskConical, Phone, CalendarCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/about',     label: 'About',     icon: Info },
  { href: '/expertise', label: 'Expertise',  icon: Stethoscope },
  { href: '/research',  label: 'Research',   icon: FlaskConical },
  { href: '/blog',      label: 'Blog',       icon: BookOpen },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: '#2C2420',
        borderBottom: 'none',
        boxShadow: '0 2px 24px rgba(0,0,0,0.18)',
      }}
    >
      <nav className="container-site flex items-center justify-between h-20 md:h-24">

        {/* Logo — name prominent */}
        <Link href="/" className="flex flex-col leading-none gap-0.5 group" style={{ textDecoration: 'none' }}>
          <span
            className="font-semibold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Dr.
          </span>
          <span
            className="font-semibold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)' }}
          >
            Bhargavi Pidugu
          </span>
          <span
            className="tracking-widest uppercase leading-none mt-0.5"
            style={{ fontFamily: 'var(--font-ui)', color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', letterSpacing: '0.15em' }}
          >
            MS · Ophthalmology
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-ui)',
                  color: 'white',
                  background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} />
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'white' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: 'var(--font-ui)',
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
            }}
          >
            <Phone size={14} />
            Contact
          </Link>
          <Link
            href="/book"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-ui)',
              background: 'white',
              color: 'var(--terracotta)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}
          >
            <CalendarCheck size={15} />
            Book Appointment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors"
          style={{ background: open ? 'rgba(255,255,255,0.15)' : 'transparent' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} style={{ color: 'white' }} /> : <Menu size={22} style={{ color: 'white' }} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: '#2C2420', borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="container-site py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      color: 'white',
                      background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.7)' }} />
                    {link.label}
                  </Link>
                )
              })}
              <div className="flex flex-col gap-2 mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-medium"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                  }}
                  onClick={() => setOpen(false)}
                >
                  <Phone size={16} />
                  Contact Us
                </Link>
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    background: 'white',
                    color: 'var(--terracotta)',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  }}
                  onClick={() => setOpen(false)}
                >
                  <CalendarCheck size={18} />
                  Book an Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
