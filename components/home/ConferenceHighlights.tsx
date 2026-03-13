import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Globe, MapPin } from 'lucide-react'

const conferences = [
  {
    year: '2026',
    type: 'International',
    conference: 'APAO — Hong Kong',
    presentations: [
      'Oral: Nystagmus surgery outcomes in paediatric patients',
      'Oral: Strabismus pattern analysis in neuro-ophthalmology cases',
    ],
    icon: Globe,
  },
  {
    year: '2025',
    type: 'International',
    conference: 'APAO — New Delhi',
    presentations: [
      'Poster: Long-term outcomes of early-onset strabismus intervention',
    ],
    icon: Globe,
  },
  {
    year: '2025',
    type: 'National',
    conference: 'POSN — Annual Conference',
    presentations: [
      'Oral: Paediatric cataract surgical volume and visual outcomes',
      'Poster: Amblyopia compliance and digital therapy tools',
    ],
    icon: MapPin,
  },
]

export function ConferenceHighlights() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'var(--surface)' }}>

      {/* Background watermark */}
      <div
        className="absolute right-0 bottom-0 text-[14rem] font-bold leading-none opacity-[0.03] pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}
        aria-hidden
      >
        Research
      </div>

      <div className="container-site relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <AnimatedSection>
            <p className="label-ui mb-3">Academic Presentations</p>
            <h2 className="heading-section">
              Sharing research{' '}
              <em className="text-gradient not-italic">globally</em>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="shrink-0">
            <Link href="/research" className="btn-secondary inline-flex items-center gap-2 group">
              View All Research
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>

        {/* Timeline cards */}
        <div className="flex flex-col gap-6">
          {conferences.map(({ year, type, conference, presentations, icon: Icon }, i) => (
            <AnimatedSection key={i} delay={i * 0.12} direction="left">
              <div
                className="card-lift rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Year + type column */}
                <div className="flex lg:flex-col items-start lg:items-center gap-3 lg:gap-2 lg:w-28 flex-shrink-0">
                  <span
                    className="text-3xl font-bold leading-none"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}
                  >
                    {year}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: type === 'International' ? 'rgba(194,119,62,0.12)' : 'rgba(140,158,148,0.12)',
                      color: type === 'International' ? 'var(--terracotta-dark)' : 'var(--sage-dark)',
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    <Icon size={10} />
                    {type}
                  </span>
                </div>

                {/* Vertical divider */}
                <div className="hidden lg:block w-px self-stretch" style={{ background: 'var(--border)' }} />

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="heading-card" style={{ color: 'var(--charcoal)' }}>{conference}</h3>
                  <ul className="flex flex-col gap-2">
                    {presentations.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                        <span style={{ color: 'var(--terracotta)', flexShrink: 0, marginTop: '2px' }}>◆</span>
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
