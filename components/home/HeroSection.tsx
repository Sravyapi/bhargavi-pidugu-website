'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--cream)]">

      {/* Dot grid — desktop only */}
      <div className="hidden md:block absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Decorative blobs — desktop only */}
      <div
        className="hidden md:block absolute -top-24 -right-24 w-96 h-96 blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,117,58,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="hidden md:block absolute -bottom-32 -left-32 w-[28rem] h-[28rem] blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(140,158,148,0.15) 0%, transparent 70%)', animationDelay: '-4s' }}
      />

      {/* Floating geometric accents — desktop only */}
      <motion.div className="hidden md:block absolute top-20 right-[10%] w-8 h-8 rounded-full border-2 border-[var(--terracotta)] opacity-40" aria-hidden="true" animate={{ y: [0, -12, 0], rotate: [0, 90, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hidden md:block absolute bottom-32 right-[20%] w-4 h-4 rounded-sm bg-[var(--sage)] opacity-50" aria-hidden="true" animate={{ y: [0, 10, 0], rotate: [0, -45, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      <motion.div className="hidden md:block absolute top-1/3 left-[5%] w-5 h-5 rounded-full bg-[var(--terracotta)] opacity-25" aria-hidden="true" animate={{ y: [0, -8, 0], x: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      {/* ── Main content ── */}
      <div className="container-site relative z-10 w-full">

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col items-center text-center pt-28 pb-16 gap-7 md:hidden">

          {/* Photo — top, clean circle */}
          <motion.div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 140,
              height: 140,
              border: '3px solid var(--terracotta)',
              boxShadow: '0 8px 32px rgba(184,117,58,0.2)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/photos/personal/9.jpeg" alt="Dr. Bhargavi Pidugu" fill className="object-cover object-top" priority />
          </motion.div>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, rgba(140,158,148,0.15), rgba(140,158,148,0.25))',
                color: 'var(--sage-dark)',
                border: '1px solid rgba(140,158,148,0.3)',
              }}>
              <Star size={9} fill="currentColor" />
              APAO Hong Kong 2026
            </span>
          </motion.div>

          {/* Name + title */}
          <motion.div className="flex flex-col gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
            <p className="label-ui justify-center">Paediatric Ophthalmologist</p>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2rem, 8vw, 2.75rem)', lineHeight: 1.15 }}>
              Caring for little eyes<br />
              <em className="text-gradient not-italic">with precision</em>
            </h1>
          </motion.div>

          {/* Location */}
          <motion.p
            className="flex items-center justify-center gap-1.5 text-sm"
            style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <MapPin size={13} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
            LV Prasad Eye Institute · Hyderabad
          </motion.p>

          {/* CTAs — full width */}
          <motion.div className="flex flex-col gap-3 w-full max-w-xs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <Link href="/book" className="btn-primary inline-flex items-center justify-center gap-2 group w-full py-3.5">
              Book a Consultation
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center justify-center gap-2 w-full py-3.5">
              Meet Dr. Bhargavi
            </Link>
          </motion.div>

          {/* 3 key stats — minimal */}
          <motion.div
            className="flex items-center justify-center gap-8 pt-2 border-t border-[var(--border)] w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            {[
              { value: '1,500+', label: 'Surgeries' },
              { value: '6+', label: 'Years' },
              { value: '10', label: 'Talks' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-bold text-lg" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden md:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-36">

          {/* Left: Text */}
          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, rgba(140,158,148,0.15), rgba(140,158,148,0.25))',
                  color: 'var(--sage-dark)',
                  border: '1px solid rgba(140,158,148,0.3)',
                }}>
                <Star size={10} fill="currentColor" />
                APAO Hong Kong 2026 — Oral Presenter
              </span>
            </motion.div>

            <motion.p className="label-ui" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              Paediatric Ophthalmologist
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1 className="heading-display" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                Caring for little eyes<br />
                <em className="text-gradient not-italic">with precision</em><br />
                <span style={{ color: 'var(--charcoal)' }}>&amp; warmth.</span>
              </motion.h1>
            </div>

            <motion.p className="text-[var(--stone)] text-lg leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-ui)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              Fellowship-trained at LV Prasad Eye Institute, Asia&apos;s foremost tertiary eye care centre. Subspecialty expertise in squints, paediatric cataracts, and neuro-ophthalmology.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 pt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
              <Link href="/book" className="btn-primary inline-flex items-center gap-2 group">
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                Meet Dr. Bhargavi
              </Link>
            </motion.div>

            <motion.div className="flex items-center gap-2 text-sm" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}>
              <MapPin size={14} style={{ color: 'var(--terracotta)' }} />
              <span>LV Prasad Eye Institute · Banjara Hills, Hyderabad</span>
            </motion.div>

            <motion.div className="flex flex-wrap gap-5 pt-2 border-t border-[var(--border)]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
              {[
                { value: '1,500+', label: 'Surgeries' },
                { value: '6+', label: 'Years' },
                { value: '10', label: 'Presentations' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-bold text-xl" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo */}
          <div className="relative flex justify-center items-center">
            <motion.div className="absolute w-80 h-80 lg:w-[26rem] lg:h-[26rem] rounded-full spin-slow pointer-events-none" style={{ border: '2px dashed rgba(184,117,58,0.25)' }} />
            <motion.div className="absolute w-64 h-64 lg:w-[22rem] lg:h-[22rem] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(184,117,58,0.12) 0%, transparent 70%)' }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

            <motion.div
              className="relative z-10 rounded-full overflow-hidden glow-terracotta"
              style={{ width: 'clamp(200px, 40vw, 360px)', height: 'clamp(200px, 40vw, 360px)', border: '4px solid var(--terracotta)' }}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
            >
              <Image src="/photos/personal/9.jpeg" alt="Dr. Bhargavi Pidugu — Paediatric Ophthalmologist" fill className="object-cover object-top" priority />
            </motion.div>

            <motion.div className="absolute -bottom-2 -left-4 lg:-left-8 glass-card rounded-2xl px-4 py-3 z-20" initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.7, delay: 0.8, type: 'spring', stiffness: 150 }} whileHover={{ scale: 1.05 }}>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-ui)' }}>Surgeries Performed</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>1,500+</p>
            </motion.div>

            <motion.div className="absolute top-4 -right-4 lg:-right-8 glass-card rounded-2xl px-4 py-3 z-20" initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.7, delay: 1.0, type: 'spring', stiffness: 150 }} whileHover={{ scale: 1.05 }}>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--sage-dark)', fontFamily: 'var(--font-ui)' }}>Fellowship</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>LV Prasad Eye Institute</p>
            </motion.div>

            <div className="hidden lg:grid absolute top-8 left-4 grid-cols-4 gap-1.5 opacity-40 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>Scroll</span>
        <motion.div className="w-px h-10 bg-gradient-to-b from-[var(--terracotta)] to-transparent" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: 'top' }} />
      </motion.div>
    </section>
  )
}
