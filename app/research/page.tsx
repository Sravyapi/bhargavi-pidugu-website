import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DownloadCVButton } from '@/components/about/DownloadCVButton'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Publications and conference presentations by Dr. Bhargavi Pidugu in paediatric ophthalmology and strabismus.',
}

const INTERNATIONAL = [
  { year: '2026', conf: 'APAO Hong Kong 2026', title: 'Oral Presentation 1 — Asia-Pacific Academy of Ophthalmology Annual Congress', city: 'Hong Kong' },
  { year: '2026', conf: 'APAO Hong Kong 2026', title: 'Oral Presentation 2 — Asia-Pacific Academy of Ophthalmology Annual Congress', city: 'Hong Kong' },
  { year: '2025', conf: 'APAO New Delhi 2025', title: 'Oral Presentation — Asia-Pacific Academy of Ophthalmology', city: 'New Delhi' },
]

const NATIONAL = [
  { year: '2025', conf: 'POSN 2025', title: 'Presentation — Paediatric Ophthalmology Society of India Annual Conference', city: 'India' },
  { year: '2024', conf: 'DOS 2024', title: 'Presentation — Delhi Ophthalmological Society', city: 'Delhi' },
  { year: '2024', conf: 'AIOC 2024', title: 'Presentation — All India Ophthalmological Conference', city: 'India' },
]

const STATE = [
  { year: '2023', conf: 'TOS 2023', title: 'Presentation — Telangana Ophthalmological Society', city: 'Hyderabad' },
]

export default function ResearchPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site">
          <p className="label-ui mb-3">Academic Work</p>
          <h1 className="heading-display mb-4">
            Research &<br />
            <em style={{ color: 'var(--terracotta)' }}>Academic Contributions</em>
          </h1>
          <p className="text-lg max-w-2xl mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
            Sharing original research at national and international forums, contributing to the evolving evidence base in paediatric ophthalmology and strabismus.
          </p>
          <DownloadCVButton />
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding">
        <div className="container-site max-w-4xl">
          <AnimatedSection>
            <SectionHeader label="Publications" title="Peer-reviewed research" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="card-warm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3
                    className="font-semibold mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '1rem' }}
                  >
                    Research publication details available upon request
                  </h3>
                  <p className="text-sm meta-text">
                    For DOI links and journal details, please contact Dr. Bhargavi directly.
                  </p>
                </div>
                <span className="badge-sage shrink-0">In press / Published</span>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)' }}
              >
                Request publication list <ExternalLink size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Conference presentations */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container-site max-w-4xl">
          <AnimatedSection>
            <SectionHeader label="Conference Presentations" title="Sharing research globally" />
          </AnimatedSection>

          {/* International */}
          <AnimatedSection delay={0.1}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--terracotta)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                International
              </span>
            </h3>
            <div className="space-y-3 mb-8">
              {INTERNATIONAL.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* National */}
          <AnimatedSection delay={0.15}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--sage)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                National
              </span>
            </h3>
            <div className="space-y-3 mb-8">
              {NATIONAL.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* State */}
          <AnimatedSection delay={0.2}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--stone)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                State
              </span>
            </h3>
            <div className="space-y-3">
              {STATE.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-site text-center max-w-xl">
          <AnimatedSection>
            <p className="label-ui mb-3 justify-center">Download CV</p>
            <h2 className="heading-section mb-4">Full academic record</h2>
            <p className="text-base mb-6 meta-text">
              Download the complete CV including all publications, conference presentations, and clinical experience.
            </p>
            <DownloadCVButton />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
