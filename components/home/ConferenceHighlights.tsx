import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Globe, MapPin } from 'lucide-react'

const conferences = [
  {
    year: '2026',
    type: 'International',
    conference: 'APAO — Hong Kong',
    presentations: [
      'Oral: Cerebrotendinous Xanthomatosis Through the Eye',
      'Oral: Genetic Landscape of Ectopia Lentis',
    ],
    icon: Globe,
  },
  {
    year: '2025',
    type: 'International',
    conference: 'APAO — New Delhi',
    presentations: [
      'E-Poster: Rare Case of Cyclic Esotropia',
      'Poster: Unilateral Acquired Brown\'s Syndrome',
    ],
    icon: Globe,
  },
  {
    year: '2024',
    type: 'National',
    conference: 'POSN — Bengaluru',
    presentations: [
      'Oral: Achiasma Revealed by Congenital Nystagmus',
      'Oral: Oculomotor Abnormalities in Gaucher\'s Disease',
    ],
    icon: MapPin,
  },
]

export function ConferenceHighlights() {
  return (
    <section className="py-16 lg:py-32 relative overflow-hidden" style={{ background: 'var(--surface)' }}>

      {/* Background watermark — desktop only */}
      <div className="hidden md:block absolute right-0 bottom-0 text-[14rem] font-bold leading-none opacity-[0.03] pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }} aria-hidden>
        Research
      </div>

      <div className="container-site relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 lg:mb-16">
          <AnimatedSection>
            <p className="label-ui mb-3">Academic Presentations</p>
            <h2 className="heading-section">
              Advancing the science,{' '}
              <em className="text-gradient not-italic">sharing the findings</em>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="shrink-0 hidden md:block">
            <Link href="/research" className="btn-secondary inline-flex items-center gap-2 group">
              View All Research
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>

        {/* Mobile: compact timeline */}
        <div className="flex flex-col gap-0 md:hidden">
          {conferences.map(({ year, type, conference, presentations, icon: Icon }, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="up">
              <div className="relative flex gap-4 pb-6">
                {/* Timeline line */}
                {i < conferences.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(184,117,58,0.3), rgba(184,117,58,0.05))' }} />
                )}
                {/* Dot */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 z-10"
                  style={{ background: type === 'International' ? 'rgba(184,117,58,0.12)' : 'rgba(140,158,148,0.12)', border: `1px solid ${type === 'International' ? 'rgba(184,117,58,0.25)' : 'rgba(140,158,148,0.25)'}` }}>
                  <Icon size={14} style={{ color: type === 'International' ? 'var(--terracotta)' : 'var(--sage-dark)' }} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>{year}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: type === 'International' ? 'rgba(184,117,58,0.1)' : 'rgba(140,158,148,0.1)', color: type === 'International' ? 'var(--terracotta-dark)' : 'var(--sage-dark)', fontFamily: 'var(--font-ui)' }}>
                      {type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-ui)' }}>{conference}</p>
                  <ul className="space-y-1">
                    {presentations.map((p, j) => (
                      <li key={j} className="text-xs leading-relaxed" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                        · {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile CTA */}
        <AnimatedSection delay={0.35} className="mt-2 md:hidden">
          <Link href="/research" className="btn-secondary inline-flex items-center gap-2 group text-sm w-full justify-center">
            View All Research
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </AnimatedSection>

        {/* Desktop: original timeline cards */}
        <div className="hidden md:flex relative flex-col gap-6">
          <div className="absolute left-[3.5rem] top-4 bottom-4 w-px pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, var(--terracotta), rgba(184,117,58,0.08))' }} />

          {conferences.map(({ year, type, conference, presentations, icon: Icon }, i) => (
            <AnimatedSection key={i} delay={i * 0.12} direction="left" className="relative">
              <div className="absolute left-[3.5rem] -translate-x-1/2 top-10 w-3 h-3 rounded-full z-10"
                style={{ background: 'var(--terracotta)', border: '2px solid var(--surface)' }} />
              <div className="card-lift rounded-2xl p-8 flex flex-col lg:flex-row gap-10 lg:ml-20"
                style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
                <div className="flex lg:flex-col items-start lg:items-center gap-3 lg:gap-2 lg:w-28 flex-shrink-0">
                  <span className="text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>{year}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: type === 'International' ? 'rgba(184,117,58,0.12)' : 'rgba(140,158,148,0.12)', color: type === 'International' ? 'var(--terracotta-dark)' : 'var(--sage-dark)', fontFamily: 'var(--font-ui)' }}>
                    <Icon size={10} />{type}
                  </span>
                </div>
                <div className="hidden lg:block w-px self-stretch" style={{ background: 'var(--border)' }} />
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="heading-card" style={{ color: 'var(--charcoal)' }}>{conference}</h3>
                  <ul className="flex flex-col gap-2">
                    {presentations.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                        <span style={{ color: 'var(--terracotta)', flexShrink: 0 }}>›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
