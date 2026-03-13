import Link from 'next/link'
import { Baby, Eye, Brain, Stethoscope } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const expertiseAreas = [
  {
    icon: Baby,
    title: 'Paediatric Cataract',
    description: 'Congenital and developmental cataracts in infants and children. Early intervention for lifelong vision.',
    href: '/expertise#paediatric-cataract',
    color: 'var(--terracotta)',
    bg: 'rgba(184,117,58,0.08)',
  },
  {
    icon: Eye,
    title: 'Strabismus Surgery',
    description: 'Eye alignment surgery for squint (esotropia, exotropia). Treating the cause — not just the symptom.',
    href: '/expertise#strabismus',
    color: 'var(--terracotta)',
    bg: 'rgba(184,117,58,0.08)',
  },
  {
    icon: Brain,
    title: 'Neuro-Ophthalmology',
    description: 'Visual pathway disorders where brain and eye intersect — optic neuritis, palsies, nystagmus.',
    href: '/expertise#neuro-ophthalmology',
    color: 'var(--sage-dark)',
    bg: 'rgba(140,158,148,0.1)',
  },
  {
    icon: Stethoscope,
    title: 'General Eye Care',
    description: 'Comprehensive paediatric eye exams, refraction, amblyopia screening, myopia management.',
    href: '/expertise#general',
    color: 'var(--sage-dark)',
    bg: 'rgba(140,158,148,0.1)',
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
            Subspecialty care for{' '}
            <em className="text-gradient not-italic">every age and condition</em>
          </h2>
          <p className="mt-4 text-[var(--stone)] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-ui)' }}>
            From newborn cataracts to complex strabismus surgeries — fellowship-level expertise across the full spectrum.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {expertiseAreas.map(({ icon: Icon, title, description, href, color, bg }, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="up">
              <Link href={href} className="group block h-full">
                <div
                  className="card-lift h-full rounded-2xl p-4 lg:p-6 flex flex-col gap-3 lg:gap-4 cursor-pointer transition-all duration-300"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Icon with ring */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: bg }}
                    />
                    <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center">
                      <Icon size={22} style={{ color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-sm lg:text-base font-semibold leading-snug" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>
                      {title}
                    </h3>
                    <p className="text-xs lg:text-sm leading-relaxed flex-1" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                      {description}
                    </p>
                  </div>

                  {/* Arrow CTA */}
                  <div
                    className="hidden lg:flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-all duration-200 group-hover:gap-2"
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
