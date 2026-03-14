'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CTABanner() {
  return (
    <section
      className="relative py-20 lg:py-36 overflow-hidden gradient-animate"
      style={{
        background: 'linear-gradient(135deg, var(--terracotta) 0%, #B8753A 30%, var(--terracotta-dark) 60%, #6B3020 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none" style={{ height: '64px' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,64 1080,0 1440,64 L1440,0 L0,0 Z" fill="var(--surface)" />
        </svg>
      </div>

      {/* Decorative shapes — desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />
      <motion.div className="hidden md:block absolute top-12 right-[15%] w-16 h-16 rounded-full border-2 border-white/20" animate={{ y: [0, -16, 0], rotate: [0, 180, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hidden md:block absolute bottom-16 left-[10%] w-10 h-10 border-2 border-white/15 rotate-45" animate={{ y: [0, 12, 0], rotate: [45, 90, 45] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      {/* Content */}
      <div className="container-site relative z-10 text-center">

        <AnimatedSection direction="none" delay={0}>
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-semibold mb-5" style={{ fontFamily: 'var(--font-ui)' }}>
            Act Early, See Better
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <h2 className="heading-display text-white mb-5 max-w-3xl mx-auto" style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}>
            Don&apos;t let a treatable{' '}
            <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.4)', textUnderlineOffset: '6px' }}>
              condition wait.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-white/75 text-base lg:text-lg max-w-md mx-auto mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-ui)' }}>
            Most paediatric eye conditions are fully treatable when caught early. The window matters.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 group w-full sm:w-auto justify-center"
              style={{ background: 'white', color: 'var(--terracotta-dark)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontFamily: 'var(--font-ui)' }}
            >
              <Calendar size={16} />
              Book a Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/30 text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Get in Touch →
            </Link>
          </div>
        </AnimatedSection>

        {/* Trust markers — desktop only */}
        <AnimatedSection delay={0.45} className="hidden md:block mt-14">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              'Fellowship-trained at LV Prasad Eye Institute',
              'Online consultations · coming soon',
              '1,500+ independent surgeries',
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-ui)' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>✦</span>
                {t}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
