import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CareerTimeline } from '@/components/about/CareerTimeline'
import { SurgicalTable } from '@/components/about/SurgicalTable'
import { DownloadCVButton } from '@/components/about/DownloadCVButton'
import { MapPin, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Fellowship-trained paediatric ophthalmologist with 6+ years of experience and 1,500+ independent surgeries.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site">
          <AnimatedSection>
            <p className="label-ui mb-3">About Dr. Bhargavi</p>
            <h1 className="heading-display mb-4">
              A surgeon who<br />
              <em style={{ color: 'var(--terracotta)' }}>listens first</em>
            </h1>
            <div
              className="flex flex-wrap items-center gap-3 text-sm mb-6 meta-text"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: 'var(--terracotta)' }} />
                LV Prasad Eye Institute, Hyderabad
              </span>
              <span className="badge-sage">Fellowship 2023–2026</span>
              <span className="badge-sage">MS Ophthalmology</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <DownloadCVButton />
          </AnimatedSection>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <AnimatedSection>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal-light)' }}
            >
              Dr. Bhargavi Pidugu is a subspecialty-trained ophthalmologist completing a three-year fellowship in Paediatric Ophthalmology, Neuro-Ophthalmology, and Strabismus at LV Prasad Eye Institute — Asia&apos;s foremost tertiary eye care centre — under Drs. Ramesh Kekunnaya and Goura Chattannavar.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal-light)' }}
            >
              With an independent surgical record of 1,500+ cataract and 150+ strabismus procedures across six years of clinical practice, she has presented original research at national and international conferences including two oral presentations at APAO Hong Kong 2026.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Surgical experience */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <AnimatedSection>
            <SectionHeader label="Surgical Experience" title="Hands-on expertise" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <SurgicalTable />
          </AnimatedSection>
        </div>
      </section>

      {/* Career timeline */}
      <section className="section-padding">
        <div className="container-site">
          <AnimatedSection>
            <SectionHeader label="Career Journey" title="Built across high-volume settings" />
          </AnimatedSection>
          <CareerTimeline />
        </div>
      </section>

      {/* Education */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container-site max-w-2xl">
          <AnimatedSection>
            <SectionHeader label="Education" title="Foundation of expertise" />
            <div className="space-y-4">
              {[
                { degree: 'MS Ophthalmology', inst: 'Regional Eye Hospital, Kakatiya Medical College, Warangal', year: '2016–2019' },
                { degree: 'MBBS', inst: 'Bhaskara Medical College, Hyderabad', year: '2008–2014' },
              ].map(e => (
                <div key={e.degree} className="card-warm p-5 flex gap-4">
                  <GraduationCap size={20} style={{ color: 'var(--terracotta)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h3 className="font-semibold mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{e.degree}</h3>
                    <p className="text-sm meta-text">{e.inst}</p>
                    <span className="badge-sage mt-2 inline-flex">{e.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* References */}
      <section className="section-padding">
        <div className="container-site max-w-2xl">
          <AnimatedSection>
            <SectionHeader label="References" title="Available upon request" />
            <div className="space-y-4">
              {[
                { name: 'Dr. Ramesh Kekunnaya', role: 'Head, Paediatric Ophthalmology & Strabismus', inst: 'LV Prasad Eye Institute, Hyderabad' },
                { name: 'Dr. Goura Chattannavar', role: 'Consultant, Neuro-Ophthalmology & Strabismus', inst: 'LV Prasad Eye Institute, Hyderabad' },
              ].map(ref => (
                <div key={ref.name} className="card-warm p-5">
                  <h3 className="font-semibold mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>{ref.name}</h3>
                  <p className="text-sm meta-text">{ref.role}</p>
                  <p className="text-sm meta-text">{ref.inst}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
