import Link from 'next/link'
import { Baby, Eye, Brain, Stethoscope } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const expertiseAreas = [
  {
    icon: Baby,
    title: 'Paediatric Cataract',
    description: 'Congenital and developmental cataracts in infants and children. Swift intervention to protect lifelong vision.',
    href: '/expertise#paediatric-cataract',
    color: 'var(--terracotta)',
    bg: 'rgba(184,117,58,0.08)',
    ring: 'rgba(184,117,58,0.2)',
    num: '01',
  },
  {
    icon: Eye,
    title: 'Strabismus Surgery',
    description: 'Eye alignment correction for squints (esotropia, exotropia). Addressing the root cause, not just the appearance.',
    href: '/expertise#strabismus',
    color: 'var(--terracotta)',
    bg: 'rgba(184,117,58,0.08)',
    ring: 'rgba(184,117,58,0.2)',
    num: '02',
  },
  {
    icon: Brain,
    title: 'Neuro-Ophthalmology',
    description: 'Where the eye and brain connect — optic neuritis, cranial nerve palsies, nystagmus, and more.',
    href: '/expertise#neuro-ophthalmology',
    color: 'var(--sage-dark)',
    bg: 'rgba(140,158,148,0.1)',
    ring: 'rgba(140,158,148,0.25)',
    num: '03',
  },
  {
    icon: Stethoscope,
    title: 'General Eye Care',
    description: 'Thorough paediatric eye exams, glasses prescriptions, amblyopia treatment, and myopia monitoring.',
    href: '/expertise#general',
    color: 'var(--sage-dark)',
    bg: 'rgba(140,158,148,0.1)',
    ring: 'rgba(140,158,148,0.25)',
    num: '04',
  },
]

export function ExpertiseOverview() {
  return (
    <section className="py-16 lg:py-32" style={{ background: 'var(--cream)' }}>
      <div className="container-site">

        {/* Header */}
        <AnimatedSection className="text-center mb-10 lg:mb-16">
          <p className="label-ui mb-3">Areas of Expertise</p>
          <h2 className="heading-section max-w-2xl mx-auto">
            Subspecialty care{' '}
            <em className="text-gradient not-italic">from birth onwards</em>
          </h2>
          <p className="mt-4 text-[var(--stone)] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-ui)' }}>
            From newborn cataracts to complex strabismus surgery — fellowship-level expertise backed by 1,500+ independent procedures.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {expertiseAreas.map(({ icon: Icon, title, description, href, color, bg, ring, num }, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="up">
              <Link href={href} className="group block h-full">
                <div
                  className="card-lift h-full rounded-2xl p-4 lg:p-6 flex flex-col gap-3 lg:gap-4 cursor-pointer transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Number badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest opacity-30"
                    style={{ color, fontFamily: 'var(--font-ui)' }}
                  >
                    {num}
                  </span>

                  {/* Hover background sweep */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${bg} 0%, transparent 60%)` }}
                  />

                  {/* Icon with ring */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: bg, boxShadow: `inset 0 0 0 1px ${ring}` }}
                    />
                    <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center">
                      <Icon size={24} style={{ color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1 relative z-10">
                    <h3 className="text-sm lg:text-base font-semibold leading-snug" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>
                      {title}
                    </h3>
                    <p className="text-xs lg:text-sm leading-relaxed flex-1" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                      {description}
                    </p>
                  </div>

                  {/* Arrow CTA */}
                  <div
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-all duration-200 group-hover:gap-2 relative z-10"
                    style={{ color, fontFamily: 'var(--font-ui)' }}
                  >
                    Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Link href="/expertise" className="btn-secondary inline-flex items-center gap-2 group">
            View All Expertise Areas
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
