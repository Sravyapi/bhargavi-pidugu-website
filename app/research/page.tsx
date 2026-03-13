import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DownloadCVButton } from '@/components/about/DownloadCVButton'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research & Academic Contributions',
  description: 'Conference presentations and peer-reviewed research by Dr. Bhargavi Pidugu — oral presenter at APAO Hong Kong 2026, contributor to POSN, and published author in paediatric ophthalmology.',
  alternates: { canonical: 'https://drbhargavipidugu.com/research' },
  openGraph: {
    title: 'Research & Academic Work | Dr. Bhargavi Pidugu',
    description: 'Oral presenter at APAO Hong Kong 2026. Publications and conference contributions in paediatric ophthalmology, strabismus, and neuro-ophthalmology.',
    url: 'https://drbhargavipidugu.com/research',
  },
}

const INTERNATIONAL = [
  {
    year: '2026',
    conf: '41st APAO Congress, Hong Kong',
    title: 'Oral: Unveiling Cerebrotendinous Xanthomatosis Through the Eye – Clinical and Genetic Insights',
    city: 'Hong Kong',
  },
  {
    year: '2026',
    conf: '41st APAO Congress, Hong Kong',
    title: 'Oral: Genetic Landscape of Ectopia Lentis Over Three Years in a Single Tertiary Eye Care Centre',
    city: 'Hong Kong',
  },
  {
    year: '2025',
    conf: '40th APAO Congress & 83rd AIOS Annual Conference, New Delhi',
    title: 'E-Poster: A Rare Case of Cyclic Esotropia – Presentation and Management',
    city: 'New Delhi',
  },
  {
    year: '2025',
    conf: '40th APAO Congress & 83rd AIOS Annual Conference, New Delhi',
    title: 'Poster: Unilateral Acquired Brown\'s Syndrome of Inflammatory Origin – Presentation and Management',
    city: 'New Delhi',
  },
]

const NATIONAL = [
  {
    year: '2025',
    conf: '7th POSN, Dr. Shroff\'s Charity Eye Hospital, New Delhi',
    title: 'Grand Rounds: Genetic Landscape of Ectopia Lentis Over Two Years in a Single Tertiary Eye Care Centre',
    city: 'New Delhi',
  },
  {
    year: '2024',
    conf: '6th Paediatric Ophthalmology & Strabismus Network (POSN), Bengaluru',
    title: 'Oral: Achiasma Revealed by Congenital Nystagmus and MRI Imaging',
    city: 'Bengaluru',
  },
  {
    year: '2024',
    conf: '6th Paediatric Ophthalmology & Strabismus Network (POSN), Bengaluru',
    title: 'Oral: Oculomotor Abnormalities and Surgical Outcome of Acquired Esotropia in Type 3 Gaucher\'s Disease',
    city: 'Bengaluru',
  },
]

const STATE = [
  {
    year: '2024',
    conf: '9th TOSCON — Telangana Ophthalmological Society Annual Conference',
    title: 'E-Poster: A Rare Case of Strabismus – Cyclic Esotropia – Presentation and Management',
    city: 'Hyderabad',
  },
  {
    year: '2018',
    conf: 'Telangana State Ophthalmology Conference',
    title: 'Award Paper: Incidence of Work-Disabling Decreased Vision with Posterior Capsular Opacity Following SICS with Rigid PMMA IOL',
    city: 'Telangana',
  },
  {
    year: '2018',
    conf: 'State Ophthalmology Conference',
    title: 'Poster: Case Report of Atypical Retinitis Pigmentosa',
    city: 'Telangana',
  },
]

export default function ResearchPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site">
          <p className="label-ui mb-3">Academic Work</p>
          <h1 className="heading-display mb-4">
            Research &<br />
            <em style={{ color: 'var(--terracotta)' }}>Academic Contributions</em>
          </h1>
          <p className="text-lg max-w-2xl mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
            Sharing original research at national and international forums, contributing to the evolving evidence base in paediatric ophthalmology and strabismus.
          </p>
          <DownloadCVButton />
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding">
        <div className="container-site max-w-4xl">
          <AnimatedSection>
            <SectionHeader label="Publications" title="Peer-reviewed research" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="card-warm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3
                    className="font-semibold mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '1rem' }}
                  >
                    Incidence of work-disabling decreased vision with posterior capsular opacity (PCO) following small-incision cataract surgery with rigid PMMA IOL
                  </h3>
                  <p className="text-sm meta-text mb-1">
                    Kumar GRB, Manasa B, <strong>Bhargavi P.</strong> <em>Journal of Evolution of Medical and Dental Sciences.</em> 2018;7(42):4580–4583.
                  </p>
                </div>
                <span className="badge-sage shrink-0">Published 2018</span>
              </div>
              <a
                href="https://doi.org/10.14260/jemds/2018/1021"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--terracotta)' }}
              >
                DOI: 10.14260/jemds/2018/1021 <ExternalLink size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Conference presentations */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container-site max-w-4xl">
          <AnimatedSection>
            <SectionHeader label="Conference Presentations" title="Sharing research globally" />
          </AnimatedSection>

          {/* International */}
          <AnimatedSection delay={0.1}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--terracotta)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                International
              </span>
            </h3>
            <div className="space-y-3 mb-8">
              {INTERNATIONAL.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* National */}
          <AnimatedSection delay={0.15}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--sage)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                National
              </span>
            </h3>
            <div className="space-y-3 mb-8">
              {NATIONAL.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* State */}
          <AnimatedSection delay={0.2}>
            <h3
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.9rem' }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--stone)', color: 'white', fontFamily: 'var(--font-ui)' }}
              >
                State
              </span>
            </h3>
            <div className="space-y-3">
              {STATE.map((c, i) => (
                <div key={i} className="card-warm p-4 flex items-start gap-4">
                  <span className="badge-sage shrink-0">{c.year}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.conf}</p>
                    <p className="text-sm meta-text">{c.title}</p>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>{c.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-site text-center max-w-xl">
          <AnimatedSection>
            <p className="label-ui mb-3 justify-center">Download CV</p>
            <h2 className="heading-section mb-4">Full academic record</h2>
            <p className="text-base mb-6 meta-text">
              Download the complete CV including all publications, conference presentations, and clinical experience.
            </p>
            <DownloadCVButton />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
