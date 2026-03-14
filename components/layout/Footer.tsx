import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT, DOCTOR } from '@/lib/config'

export function Footer() {
  return (
    <>
    <div className="h-px w-full" style={{
      background: 'linear-gradient(90deg, transparent, var(--terracotta), transparent)'
    }} />
    <footer style={{ background: 'var(--charcoal)', color: 'var(--stone-light)' }} className="mt-0">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 400 }} className="text-xl md:text-2xl mb-2">
              {DOCTOR.name}
            </h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--terracotta-light)', letterSpacing: '0.1em' }} className="uppercase mb-4">
              {DOCTOR.credentials}
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-ui)' }}>
              Fellowship-trained paediatric ophthalmologist — precision surgical care and genuine compassion for children&apos;s eyes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 400 }} className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
              {[
                { href: '/about', label: 'About' },
                { href: '/expertise', label: 'Expertise' },
                { href: '/research', label: 'Research & Publications' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Get in Touch' },
                { href: '/book', label: 'Book Consultation' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--terracotta-light)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 400 }} className="text-lg mb-4">Contact</h4>
            <ul className="space-y-3" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--terracotta-light)' }} />
                <span>{CONTACT.clinic.name}<br />{CONTACT.clinic.campus}<br />Banjara Hills, Hyderabad</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} style={{ color: 'var(--terracotta-light)' }} />
                <a href={CONTACT.phoneHref} className="hover:text-[var(--terracotta-light)] transition-colors">{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} style={{ color: 'var(--terracotta-light)' }} />
                <a href={CONTACT.emailHref} className="hover:text-[var(--terracotta-light)] transition-colors break-all">{CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
          <p>© {new Date().getFullYear()} {DOCTOR.name}. All rights reserved.</p>
          <p>Content on this site is for educational purposes only and is not a substitute for professional medical advice.</p>
        </div>
      </div>
    </footer>
    </>
  )
}
