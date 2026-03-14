import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { CONTACT } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Dr. Bhargavi Pidugu, paediatric ophthalmologist at LV Prasad Eye Institute, Banjara Hills, Hyderabad. Send a message for appointments, second opinions, or general enquiries.',
  alternates: { canonical: 'https://drbhargavipidugu.com/contact' },
  openGraph: {
    title: 'Contact Dr. Bhargavi Pidugu | Paediatric Ophthalmologist, Hyderabad',
    description: 'Get in touch with Dr. Bhargavi Pidugu at LV Prasad Eye Institute, Hyderabad for paediatric eye care enquiries and appointments.',
    url: 'https://drbhargavipidugu.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site">
          <p className="label-ui mb-3">Get in Touch</p>
          <h1 className="heading-display mb-4">
            Let&apos;s talk about<br />
            <em style={{ color: 'var(--terracotta)' }}>your child&apos;s eyes</em>
          </h1>
          <p className="text-lg max-w-xl" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
            Whether you have a question, concern, or just want to know what to expect — reach out. Every message is read and replied to personally.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="card-warm p-6 md:p-8">
                  <h2 className="heading-card mb-6">Send a message</h2>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <div className="card-warm p-6">
                  <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
                    Contact Details
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--terracotta)' }} />
                      <div className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                        <p className="font-medium text-[var(--charcoal)]">{CONTACT.clinic.name}</p>
                        <p>{CONTACT.clinic.campus}</p>
                        <p>{CONTACT.clinic.area}</p>
                        <p>{CONTACT.clinic.city}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone size={16} style={{ color: 'var(--terracotta)' }} />
                      <a href={CONTACT.phoneHref} className="text-sm hover:text-[var(--terracotta)] transition-colors" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail size={16} style={{ color: 'var(--terracotta)' }} />
                      <a href={CONTACT.emailHref} className="text-sm hover:text-[var(--terracotta)] transition-colors break-all" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                        {CONTACT.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="card-warm p-6">
                  <h3 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
                    <Clock size={14} className="inline mr-2" style={{ color: 'var(--terracotta)' }} />
                    Response Time
                  </h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                    All messages are typically responded to within <strong>24–48 hours</strong> during working days.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div
                  className="p-5 rounded-2xl terracotta-accent-bg"
                >
                  <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                    <strong style={{ color: 'var(--terracotta)' }}>Note:</strong> This contact form is for general inquiries only. For medical emergencies, please visit the nearest hospital emergency department immediately.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
