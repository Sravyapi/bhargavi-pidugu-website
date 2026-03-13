import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Award, GraduationCap, Stethoscope } from 'lucide-react'

const credentials = [
  { icon: GraduationCap, text: 'MS Ophthalmology' },
  { icon: Award,         text: 'Fellowship · LVPEI' },
  { icon: Stethoscope,   text: '6+ Years Practice' },
]

export function AboutTeaser() {
  return (
    <section className="relative py-16 lg:py-32 overflow-hidden" style={{ background: 'var(--surface)' }}>

      {/* Decorative large terracotta numeral */}
      <div
        className="hidden md:block absolute right-0 top-0 text-[20rem] font-bold leading-none pointer-events-none select-none opacity-[0.03]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}
        aria-hidden
      >
        6
      </div>

      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* LEFT: Photo with decorative offset frame */}
          <AnimatedSection direction="left" delay={0}>
            <div className="relative flex justify-center lg:justify-start">

              {/* Offset decorative box */}
              <div
                className="hidden md:block absolute -bottom-6 -left-6 w-64 h-64 lg:w-80 lg:h-80 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(184,117,58,0.12), rgba(140,158,148,0.12))',
                  border: '2px solid rgba(184,117,58,0.15)',
                }}
              />

              {/* Photo */}
              <div
                className="relative z-10 rounded-3xl overflow-hidden"
                style={{
                  width: 'clamp(200px, 70vw, 340px)',
                  height: 'clamp(240px, 80vw, 400px)',
                  boxShadow: '0 24px 60px rgba(44,44,44,0.15), 0 0 0 1px rgba(184,117,58,0.1)',
                }}
              >
                <Image
                  src="/photos/personal/7.jpeg"
                  alt="Dr. Bhargavi Pidugu"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Credential pills — floating, desktop only */}
              <div className="hidden lg:flex absolute -right-4 lg:-right-10 top-8 flex-col gap-2 z-20">
                {credentials.map(({ icon: Icon, text }, i) => (
                  <AnimatedSection key={i} direction="right" delay={0.3 + i * 0.12}>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-md whitespace-nowrap"
                      style={{
                        background: 'var(--cream)',
                        border: '1px solid rgba(184,117,58,0.2)',
                        color: 'var(--charcoal)',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      <Icon size={12} style={{ color: 'var(--terracotta)' }} />
                      {text}
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Dot pattern */}
              <div className="hidden md:grid absolute -bottom-2 right-4 grid-cols-5 gap-1.5 opacity-30 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--terracotta)' }} />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT: Text */}
          <div className="flex flex-col gap-6">

            <AnimatedSection delay={0.1}>
              <p className="label-ui">About Dr. Bhargavi</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="heading-section">
                Six years at the intersection of{' '}
                <em className="text-gradient not-italic">science and compassion</em>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="space-y-4" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)', lineHeight: 1.8 }}>
                <p>
                  Fellowship-trained at LV Prasad Eye Institute — Asia&apos;s foremost tertiary
                  eye care centre — Dr. Bhargavi specialises in paediatric ophthalmology,
                  strabismus, and neuro-ophthalmology.
                </p>
                <p>
                  With over <strong style={{ color: 'var(--charcoal)' }}>1,500 independent cataract</strong> and{' '}
                  <strong style={{ color: 'var(--charcoal)' }}>150+ strabismus surgeries</strong>, she brings
                  technical precision to every case — and genuine warmth to every family.
                </p>
                <p>
                  Her philosophy: listen carefully, explain clearly, treat gently.
                </p>
              </div>
            </AnimatedSection>

            {/* Horizontal divider with quote */}
            <AnimatedSection delay={0.4}>
              <blockquote
                className="pl-4 py-1 text-base italic"
                style={{
                  borderLeft: '3px solid var(--terracotta)',
                  color: 'var(--stone)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                &ldquo;She gives candies to children after their exam. She also presents research
                at international conferences.&rdquo;
              </blockquote>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <Link href="/about" className="btn-primary self-start inline-flex items-center gap-2 group">
                Read Full Bio
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
