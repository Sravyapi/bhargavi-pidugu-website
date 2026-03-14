'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Scissors, Eye, Clock, Mic } from 'lucide-react'

const CountUp = memo(function CountUp({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])

  return (
    <span ref={ref} aria-label={`${target.toLocaleString()}${suffix}`}>
      <span aria-hidden="true">{count.toLocaleString()}{suffix}</span>
    </span>
  )
})

const stats = [
  { icon: Scissors, value: 1500, suffix: '+', label: 'Cataract Surgeries', sub: 'Independent surgeon', color: 'var(--terracotta)' },
  { icon: Eye,      value: 150,  suffix: '+', label: 'Strabismus Surgeries', sub: 'Independent surgeon', color: 'var(--terracotta)' },
  { icon: Clock,    value: 6,    suffix: '+', label: 'Years Experience', sub: 'Across hospital settings', color: 'var(--sage-dark)' },
  { icon: Mic,      value: 10,   suffix: '',  label: 'Conference Talks', sub: 'National & international', color: 'var(--sage-dark)' },
]

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--charcoal)' }}>

      <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'var(--terracotta)' }} />

      {/* Subtle grid — desktop only */}
      <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(184,117,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,117,58,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Mobile: 2 key stats in a clean row */}
      <div className="md:hidden container-site py-8">
        <div className="flex items-center justify-around">
          {stats.slice(0, 2).map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="up" className="text-center">
              <div className="stat-number mb-0.5 text-3xl" style={{ color: stat.color }}>
                <CountUp target={stat.value} suffix={stat.suffix} duration={1400} />
              </div>
              <p className="text-xs font-medium text-white/70 leading-snug" style={{ fontFamily: 'var(--font-ui)' }}>
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
          <div className="w-px h-12 bg-white/10" />
          {stats.slice(2).map((stat, i) => (
            <AnimatedSection key={i} delay={(i + 2) * 0.1} direction="up" className="text-center">
              <div className="stat-number mb-0.5 text-3xl" style={{ color: stat.color }}>
                <CountUp target={stat.value} suffix={stat.suffix} duration={1400} />
              </div>
              <p className="text-xs font-medium text-white/70 leading-snug" style={{ fontFamily: 'var(--font-ui)' }}>
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Desktop: full 4-col grid */}
      <div className="hidden md:block container-site relative z-10">
        <div className="grid grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <AnimatedSection key={i} delay={i * 0.1} direction="up" className="px-8 py-8 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <div className="stat-number mb-1" style={{ color: stat.color }}>
                  <CountUp target={stat.value} suffix={stat.suffix} duration={1600} />
                </div>
                <p className="text-sm font-semibold text-white/90 leading-snug" style={{ fontFamily: 'var(--font-ui)' }}>{stat.label}</p>
                <p className="text-xs text-white/45 mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>{stat.sub}</p>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
