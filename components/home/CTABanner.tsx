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

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating blobs — desktop only */}
      <div
        className="hidden md:block absolute -top-20 -left-20 w-72 h-72 blob pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="hidden md:block absolute -bottom-20 -right-20 w-96 h-96 blob pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          animationDelay: '-5s',
        }}
      />

      {/* Floating geometric shapes — desktop only */}
      <motion.div
        className="hidden md:block absolute top-12 right-[15%] w-16 h-16 rounded-full border-2 border-white/20"
        animate={{ y: [0, -16, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hidden md:block absolute bottom-16 left-[10%] w-10 h-10 border-2 border-white/15 rotate-45"
        animate={{ y: [0, 12, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="hidden md:block absolute top-1/2 left-[5%] w-6 h-6 rounded-full bg-white/10"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <div className="container-site relative z-10 text-center">

        <AnimatedSection direction="none" delay={0}>
          <p
            className="text-white/60 text-xs uppercase tracking-[0.2em] font-semibold mb-5"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Take the First Step
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <h2 className="heading-display text-white mb-6 max-w-3xl mx-auto">
            Your child&apos;s vision{' '}
            <span
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'rgba(255,255,255,0.4)',
                textUnderlineOffset: '6px',
              }}
            >
              matters.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p
            className="text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Early intervention makes the biggest difference. Most paediatric eye
            conditions are fully treatable when caught in time.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'white',
                color: 'var(--terracotta-dark)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <Calendar size={16} />
              Book a Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/30 text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Get in Touch →
            </Link>
          </div>
        </AnimatedSection>

        {/* Trust markers */}
        <AnimatedSection delay={0.45} className="mt-14">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-8">
            {[
              'Fellowship-trained at LVPEI',
              'Online consultations available',
              'Paediatric specialist',
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
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
