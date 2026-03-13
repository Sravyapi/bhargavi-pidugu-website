'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--cream)]">

      {/* ── Dot grid background ── */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* ── Decorative blobs ── */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(194,119,62,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] blob pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(140,158,148,0.15) 0%, transparent 70%)',
          animationDelay: '-4s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(194,119,62,0.08) 0%, transparent 60%)',
        }}
      />

      {/* ── Floating geometric accents ── */}
      <motion.div
        className="absolute top-20 right-[10%] w-8 h-8 rounded-full border-2 border-[var(--terracotta)] opacity-40"
        animate={{ y: [0, -12, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-[20%] w-4 h-4 rounded-sm bg-[var(--sage)] opacity-50"
        animate={{ y: [0, 10, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 left-[5%] w-5 h-5 rounded-full bg-[var(--terracotta)] opacity-25"
        animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-24 left-[15%] w-6 h-6 border-2 border-[var(--sage)] opacity-35 rotate-45"
        animate={{ y: [0, 8, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ── Main content ── */}
      <div className="container-site relative z-10 w-full py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-0 lg:py-32">

          {/* Left: Text */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
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

            {/* Label */}
            <motion.p
              className="label-ui"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Paediatric Ophthalmologist
            </motion.p>

            {/* Heading */}
            <div className="overflow-hidden">
              <motion.h1
                className="heading-display"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Caring for little eyes<br />
                <em className="text-gradient not-italic">with precision</em><br />
                <span style={{ color: 'var(--charcoal)' }}>&amp; warmth.</span>
              </motion.h1>
            </div>

            {/* Body */}
            <motion.p
              className="text-[var(--stone)] text-lg leading-relaxed max-w-lg"
              style={{ fontFamily: 'var(--font-ui)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Fellowship-trained specialist at LV Prasad Eye Institute — one of Asia&apos;s
              foremost eye care centres. Subspecialty expertise in strabismus,
              paediatric cataracts, and neuro-ophthalmology.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/book" className="btn-primary inline-flex items-center gap-2 group">
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                Learn More
              </Link>
            </motion.div>

            {/* Meta */}
            <motion.div
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <MapPin size={14} style={{ color: 'var(--terracotta)' }} />
              <span>LV Prasad Eye Institute · Banjara Hills, Hyderabad</span>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              className="flex flex-wrap gap-6 pt-2 border-t border-[var(--border)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {[
                { value: '1,500+', label: 'Surgeries' },
                { value: '6+', label: 'Years' },
                { value: '8', label: 'Presentations' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-bold text-xl" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">

            {/* Spinning ring */}
            <motion.div
              className="absolute w-80 h-80 lg:w-[26rem] lg:h-[26rem] rounded-full spin-slow pointer-events-none"
              style={{
                border: '2px dashed rgba(194,119,62,0.25)',
              }}
            />

            {/* Outer glow ring */}
            <motion.div
              className="absolute w-64 h-64 lg:w-[22rem] lg:h-[22rem] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(194,119,62,0.12) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Photo container */}
            <motion.div
              className="relative z-10 rounded-full overflow-hidden glow-terracotta"
              style={{
                width: 'clamp(240px, 40vw, 360px)',
                height: 'clamp(240px, 40vw, 360px)',
                border: '4px solid var(--terracotta)',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
            >
              <Image
                src="/photos/personal/9.jpeg"
                alt="Dr. Bhargavi Pidugu — Paediatric Ophthalmologist"
                fill
                className="object-cover object-top"
                priority
              />
            </motion.div>

            {/* Floating badge — surgeries */}
            <motion.div
              className="absolute -bottom-2 -left-4 lg:-left-8 glass-card rounded-2xl px-4 py-3 z-20"
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, type: 'spring', stiffness: 150 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--terracotta)', fontFamily: 'var(--font-ui)' }}>Surgeries Performed</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>1,500+</p>
            </motion.div>

            {/* Floating badge — fellowship */}
            <motion.div
              className="absolute top-4 -right-4 lg:-right-8 glass-card rounded-2xl px-4 py-3 z-20"
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, type: 'spring', stiffness: 150 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--sage-dark)', fontFamily: 'var(--font-ui)' }}>Fellowship</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>LV Prasad Eye Institute</p>
            </motion.div>

            {/* Decorative dots cluster */}
            <div className="absolute top-8 left-4 grid grid-cols-4 gap-1.5 opacity-40 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--terracotta)] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
