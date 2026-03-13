import { AnimatedSection } from '@/components/ui/AnimatedSection'

const CAREER = [
  {
    title: 'Fellow — Paediatric Ophthalmology, Neuro-Ophthalmology & Strabismus',
    institution: 'LV Prasad Eye Institute, Banjara Hills, Hyderabad',
    period: 'Jul 2023 – Jun 2026',
    current: true,
    bullets: [
      'Training under internationally recognised faculty Drs. Ramesh Kekunnaya and Goura Chattannavar',
      'Performing independent strabismus surgeries and complex paediatric cataract procedures',
      'Presenting original research at national and international conferences including APAO 2025 and APAO 2026',
    ],
  },
  {
    title: 'Consultant Ophthalmologist',
    institution: 'Solis Eye Care Hospitals, Secunderabad',
    period: 'Feb 2023 – Jun 2023',
    current: false,
    bullets: [],
  },
  {
    title: 'Consultant Ophthalmologist',
    institution: 'Prema Eye Care Centre, Secunderabad',
    period: 'Jun 2022 – Jan 2023',
    current: false,
    bullets: [],
  },
  {
    title: 'Career Break',
    institution: 'Maternity leave and early childcare',
    period: 'Jan 2021 – May 2022',
    current: false,
    bullets: [],
    isBreak: true,
  },
  {
    title: 'Consultant Ophthalmologist',
    institution: 'Vasan Eye Care, A S Rao Nagar, Hyderabad',
    period: 'Jul 2019 – Dec 2020',
    current: false,
    bullets: [
      'High-volume cataract surgery (phacoemulsification and SICS)',
      'Comprehensive outpatient eye care and refraction',
    ],
  },
  {
    title: 'Junior Resident — MS Ophthalmology',
    institution: 'Regional Eye Hospital, Kakatiya Medical College, Warangal',
    period: 'Jun 2016 – May 2019',
    current: false,
    bullets: [
      'Completed MS Ophthalmology with hands-on surgical training',
      'Performed independent cataract, glaucoma, and minor surgeries',
    ],
  },
]

export function CareerTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: 'var(--border)' }}
      />

      <div className="space-y-8 pl-12">
        {CAREER.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="relative">
              {/* Dot */}
              <div
                className="absolute -left-12 top-1.5 w-4 h-4 rounded-full border-2 border-white"
                style={{
                  background: item.current ? 'var(--terracotta)' : item.isBreak ? 'var(--stone-light)' : 'var(--sage)',
                  boxShadow: item.current ? 'var(--shadow-warm)' : 'none',
                }}
              />

              <div className="card-warm p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3
                      className="font-semibold mb-0.5"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        color: item.isBreak ? 'var(--stone)' : 'var(--charcoal)',
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                      {item.institution}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="badge-sage">{item.period}</span>
                    {item.current && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--terracotta)', color: 'white', fontFamily: 'var(--font-ui)' }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {item.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--terracotta-light)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
