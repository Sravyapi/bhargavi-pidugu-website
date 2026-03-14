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

      {/* Decorative numeral — desktop only */}
      <div
        className="hidden md:block absolute right-0 top-0 text-[20rem] font-bold leading-none pointer-events-none select-none opacity-[0.03]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}
        aria-hidden="true"
      >
        6
      </div>

      <div className="container-site">

        {/* ── MOBILE layout: text-first, no photo ── */}
        <div className="flex flex-col gap-8 md:hidden">

          {/* Top: photo + name side by side */}
          <AnimatedSection direction="up" delay={0}>
            <div className="flex items-center gap-5">
              <div
                className="rounded-2xl overflow-hidden flex-shrink-0"
                style={{ width: 88, height: 104, boxShadow: '0 8px 24px rgba(44,44,44,0.12)', border: '1px solid rgba(184,117,58,0.15)' }}
              >
                <Image src="/photos/personal/7.jpeg" alt="Dr. Bhargavi Pidugu" width={88} height={104} className="object-cover object-top w-full h-full" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="label-ui">About Dr. Bhargavi</p>
                <h2 className="text-xl font-bold leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}>
                  Surgical precision,<br />
                  <em className="text-gradient not-italic">genuine care</em>
                </h2>
                {/* Credential pills */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {credentials.map(({ icon: Icon, text }, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: 'var(--cream)', border: '1px solid rgba(184,117,58,0.2)', color: 'var(--charcoal)', fontFamily: 'var(--font-ui)' }}>
                      <Icon size={10} style={{ color: 'var(--terracotta)' }} />
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Body text */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)', lineHeight: 1.75 }}>
              <p>
                Fellowship-trained at LV Prasad Eye Institute — Asia&apos;s foremost tertiary eye care centre — Dr. Bhargavi specialises in paediatric ophthalmology, strabismus, and neuro-ophthalmology.
              </p>
              <p>
                With over <strong style={{ color: 'var(--charcoal)' }}>1,500 independent cataract</strong> and <strong style={{ color: 'var(--charcoal)' }}>150+ strabismus surgeries</strong>, she brings technical precision to every case — and genuine warmth to every family.
              </p>
            </div>
          </AnimatedSection>

          {/* Quote */}
          <AnimatedSection delay={0.2}>
            <blockquote
              className="pl-4 py-1 text-sm italic"
              style={{ borderLeft: '3px solid var(--terracotta)', color: 'var(--stone)', fontFamily: 'var(--font-body)' }}
            >
              &ldquo;She gives candies to children after every exam — and presents her research at international conferences.&rdquo;
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <Link href="/about" className="btn-primary self-start inline-flex items-center gap-2 group text-sm py-2.5 px-5">
              Read Full Bio
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </AnimatedSection>
        </div>

        {/* ── DESKTOP layout: original two-column ── */}
        <div className="hidden md:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* LEFT: Photo */}
          <AnimatedSection direction="left" delay={0}>
            <div className="relative flex justify-center lg:justify-start px-4 sm:px-8 lg:px-0">
              <div className="hidden md:block absolute -top-12 -left-12 rounded-full pointer-events-none" style={{ width: '120%', aspectRatio: '1', border: '2px solid rgba(184,117,58,0.08)' }} />
              <div className="hidden md:block absolute -bottom-6 -left-6 w-64 h-64 lg:w-80 lg:h-80 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(184,117,58,0.12), rgba(140,158,148,0.12))', border: '2px solid rgba(184,117,58,0.15)' }} />

              <div className="relative z-10 rounded-3xl overflow-hidden" style={{ width: 'clamp(200px, 70vw, 340px)', height: 'clamp(240px, 80vw, 400px)', boxShadow: '0 24px 60px rgba(44,44,44,0.15), 0 0 0 1px rgba(184,117,58,0.1)' }}>
                <Image src="/photos/personal/7.jpeg" alt="Dr. Bhargavi Pidugu" fill sizes="(max-width: 1024px) 70vw, 340px" className="object-cover object-top" />
              </div>

              <div className="hidden lg:flex absolute -right-4 lg:-right-10 top-8 flex-col gap-2 z-20">
                {credentials.map(({ icon: Icon, text }, i) => (
                  <AnimatedSection key={i} direction="right" delay={0.3 + i * 0.12}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-md whitespace-nowrap"
                      style={{ background: 'var(--cream)', border: '1px solid rgba(184,117,58,0.2)', color: 'var(--charcoal)', fontFamily: 'var(--font-ui)' }}>
                      <Icon size={12} style={{ color: 'var(--terracotta)' }} />
                      {text}
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <div className="hidden md:grid absolute -bottom-2 right-4 grid-cols-5 gap-1.5 opacity-30 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--terracotta)' }} />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT: Text */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}><p className="label-ui">About Dr. Bhargavi</p></AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="heading-section">
                Where surgical precision meets{' '}
                <em className="text-gradient not-italic">genuine care</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="space-y-4" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)', lineHeight: 1.8 }}>
                <p>Fellowship-trained at LV Prasad Eye Institute — Asia&apos;s foremost tertiary eye care centre — Dr. Bhargavi specialises in paediatric ophthalmology, strabismus, and neuro-ophthalmology.</p>
                <p>With over <strong style={{ color: 'var(--charcoal)' }}>1,500 independent cataract</strong> and <strong style={{ color: 'var(--charcoal)' }}>150+ strabismus surgeries</strong>, she brings technical precision to every case — and genuine warmth to every family.</p>
                <p>Her approach: listen carefully, explain clearly, treat gently — every time.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="flex flex-col gap-1">
                <div className="text-6xl leading-none font-bold opacity-20 -mb-2" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-display)' }} aria-hidden="true">&ldquo;</div>
                <blockquote className="pl-4 py-1 text-base italic" style={{ borderLeft: '3px solid var(--terracotta)', color: 'var(--stone)', fontFamily: 'var(--font-body)' }}>
                  &ldquo;She gives candies to children after every exam — and presents her research at international conferences. Both feel equally natural to her.&rdquo;
                </blockquote>
              </div>
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
