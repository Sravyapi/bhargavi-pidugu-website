'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, Brain, Baby, Stethoscope } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const SECTIONS = [
  {
    id: 'paediatric-cataract',
    icon: Baby,
    title: 'Paediatric Cataract',
    intro: 'Cataracts in children — though rare — require prompt recognition and swift treatment to preserve vision during critical developmental years.',
    paragraphs: [
      'Unlike adult cataracts, which develop gradually over decades, paediatric cataracts can be congenital (present at birth), developmental (appearing in early childhood), or secondary to systemic disease or trauma. The stakes are particularly high in infants: the visual system develops rapidly in the first years of life, and an untreated cataract can cause permanent amblyopia (deprivation amblyopia) within weeks.',
      'Surgery in neonates and infants differs substantially from adult phacoemulsification — lens aspiration techniques, intraocular lens decisions (primary vs. secondary implantation), optical rehabilitation, and amblyopia management all require subspecialty expertise. Post-operative patching and close follow-up are as important as the surgery itself.',
    ],
    conditions: [
      'Congenital cataracts (unilateral and bilateral)',
      'Developmental cataracts',
      'Traumatic cataracts in children',
      'Posterior capsular opacification (after-cataract)',
      'Aphakic contact lens / spectacle rehabilitation',
      'Post-cataract amblyopia management',
    ],
  },
  {
    id: 'strabismus',
    icon: Eye,
    title: 'Strabismus Surgery',
    intro: 'Strabismus — the misalignment of the eyes — affects approximately 2–4% of children and can have significant visual and psychosocial consequences if untreated.',
    paragraphs: [
      'The eyes must work together to create binocular single vision and depth perception. When one eye deviates (turns in, out, up, or down), the brain may suppress the image from the deviating eye to avoid double vision — leading over time to amblyopia. The goal of strabismus management is to restore alignment, preserve or develop binocular vision, and treat amblyopia.',
      'Surgical correction involves adjusting the length or insertion point of one or more of the six extraocular muscles around each eye. The procedure is performed under general anaesthesia, does not enter the eye, and typically takes 30–60 minutes. Most patients are discharged the same day and recover quickly.',
    ],
    conditions: [
      'Esotropia (convergent squint / inward turning)',
      'Exotropia (divergent squint / outward turning)',
      'Hypertropia (vertical squint)',
      'Paralytic squint (cranial nerve palsies)',
      'Restrictive strabismus (thyroid eye disease, post-trauma)',
      'Amblyopia management (patching, penalisation)',
      'Nystagmus surgery',
    ],
  },
  {
    id: 'neuro-ophthalmology',
    icon: Brain,
    title: 'Neuro-Ophthalmology',
    intro: 'Neuro-ophthalmology sits at the boundary of ophthalmology and neurology, addressing conditions where the brain, nerves, and visual pathways are involved.',
    paragraphs: [
      'The visual pathway extends from the retina through the optic nerve, chiasm, optic tracts, and lateral geniculate nucleus to the visual cortex — a vast stretch of neural tissue that can be affected by a wide range of neurological, vascular, and systemic conditions. Accurate localisation of the lesion often requires careful clinical examination combined with imaging.',
      'Common presentations include sudden or gradual vision loss not explained by the eye itself, double vision, ptosis (drooping eyelid), abnormal pupil reactions, papilloedema, and disorders of eye movement. Early accurate diagnosis can be life-saving in conditions such as raised intracranial pressure, intracranial tumours, or demyelinating disease.',
    ],
    conditions: [
      'Optic neuritis and optic neuropathy',
      'Papilloedema and raised intracranial pressure',
      'Optic atrophy',
      'Third, fourth, and sixth cranial nerve palsies',
      'Nystagmus',
      'Ptosis (drooping eyelid)',
      'Cortical visual impairment in children',
      'Myasthenia gravis (ocular)',
    ],
  },
  {
    id: 'general',
    icon: Stethoscope,
    title: 'General Paediatric Eye Care',
    intro: 'Every child deserves a thorough, age-appropriate eye examination — ideally before starting school, and sooner if there are any concerns.',
    paragraphs: [
      'Routine paediatric eye assessments check visual acuity (using age-appropriate charts), refractive error (glasses prescription), binocular vision, ocular motility, and eye health. Cycloplegic refraction — using dilating drops to relax the focusing muscles — gives the most accurate prescription in children, who can otherwise over-accommodate and mask their true refractive error.',
      'Amblyopia ("lazy eye") is the most common cause of preventable vision impairment in childhood, affecting 2–3% of the population. It is highly treatable if caught before the age of 7–8 years, with patching or atropine penalisation of the stronger eye. Glasses for significant refractive errors are often the first step.',
    ],
    conditions: [
      'Comprehensive paediatric eye examinations',
      'Cycloplegic refraction and glasses prescription',
      'Amblyopia (lazy eye) detection and management',
      'Myopia (short-sightedness) in children',
      'Colour vision assessment',
      'Screening for retinopathy of prematurity (ROP)',
      'Nasolacrimal duct obstruction (blocked tear duct)',
      'Chalazion and eyelid conditions',
    ],
  },
]

export default function ExpertisePage() {
  const [activeSection, setActiveSection] = useState('paediatric-cataract')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(sec => {
      const el = document.getElementById(sec.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sec.id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="pt-20">
      {/* Header */}
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site">
          <p className="label-ui mb-3">Areas of Expertise</p>
          <h1 className="heading-display mb-4">
            Specialist care for<br />
            <em style={{ color: 'var(--terracotta)' }}>every little eye</em>
          </h1>
          <p className="text-base lg:text-lg max-w-2xl" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
            From a child&apos;s first eye exam to complex surgical correction — subspecialty expertise in paediatric ophthalmology, strabismus, and neuro-ophthalmology.
          </p>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div
        className="sticky top-20 md:top-24 z-40 border-b"
        style={{ background: 'white', borderColor: 'var(--border)' }}
      >
        <div className="container-site overflow-x-auto">
          <div className="flex items-center gap-1 py-3 min-w-max">
            {SECTIONS.map(sec => {
              const Icon = sec.icon
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    background: activeSection === sec.id ? 'var(--terracotta)' : 'transparent',
                    color: activeSection === sec.id ? 'white' : 'var(--charcoal-light)',
                  }}
                >
                  <Icon size={14} />
                  {sec.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div>
        {SECTIONS.map((sec, idx) => {
          const Icon = sec.icon
          return (
            <section
              key={sec.id}
              id={sec.id}
              className="section-padding"
              style={{ background: idx % 2 === 0 ? 'var(--bg)' : 'var(--surface)' }}
            >
              <div className="container-site max-w-4xl">
                <AnimatedSection>
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'var(--terracotta)', color: 'white' }}
                    >
                      <Icon size={26} />
                    </div>
                    <div>
                      <p className="label-ui">Expertise</p>
                      <h2 className="heading-section">{sec.title}</h2>
                    </div>
                  </div>
                  <p
                    className="text-lg leading-relaxed mb-6 font-medium"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal)', borderLeft: '3px solid var(--terracotta)', paddingLeft: '1.25rem' }}
                  >
                    {sec.intro}
                  </p>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal-light)' }}>
                      {p}
                    </p>
                  ))}
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
                      Conditions & Procedures
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sec.conditions.map(c => (
                        <span key={c} className="badge-sage">{c}</span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Before/after panel — only on strabismus section */}
                {sec.id === 'strabismus' && (
                  <AnimatedSection delay={0.3}>
                    <div
                      className="mt-10 rounded-2xl overflow-hidden p-6"
                      style={{ background: 'white', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
                    >
                      <p className="label-ui mb-4">Clinical Case — Strabismus Correction</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src="/photos/patients/before_1.jpeg"
                              alt="Before strabismus surgery"
                              fill
                              style={{ objectFit: 'cover', objectPosition: 'center' }}
                              sizes="(max-width: 768px) 50vw, 350px"
                            />
                          </div>
                          <p
                            className="text-center text-xs mt-2 font-medium meta-text"
                          >
                            Before surgery
                          </p>
                        </div>
                        <div>
                          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src="/photos/patients/after_1.png"
                              alt="After strabismus surgery"
                              fill
                              style={{ objectFit: 'cover', objectPosition: 'center' }}
                              sizes="(max-width: 768px) 50vw, 350px"
                            />
                          </div>
                          <p
                            className="text-center text-xs mt-2 font-medium"
                            style={{ fontFamily: 'var(--font-ui)', color: 'var(--sage-dark)' }}
                          >
                            After surgery
                          </p>
                        </div>
                      </div>
                      <p
                        className="text-xs mt-3 text-center italic"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}
                      >
                        Shared with patient consent. Results may vary.
                      </p>
                    </div>

                    {/* More Clinical Cases */}
                    <div className="mt-10">
                      <h4 className="heading-card mb-4">More Clinical Cases</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          '/photos/patients/2.jpeg',
                          '/photos/patients/3.jpeg',
                          '/photos/patients/4.jpeg',
                          '/photos/patients/5.jpeg',
                          '/photos/patients/6.jpeg',
                          '/photos/patients/7.jpeg',
                        ].map((src, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden bg-[var(--surface)]" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src={src}
                              alt={`Clinical case ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-[var(--text-secondary)] italic">Results may vary.</p>
                    </div>
                  </AnimatedSection>
                )}

                {/* From Our Clinic — only on general section */}
                {sec.id === 'general' && (
                  <AnimatedSection delay={0.3}>
                    {/* From Our Clinic */}
                    <div className="mt-10">
                      <h4 className="heading-card mb-1">From Our Clinic</h4>
                      <p className="text-sm text-[var(--text-secondary)] italic mb-4">Clinical photographs shared with patient consent.</p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          '/photos/patients/8.jpeg',
                          '/photos/patients/10.jpeg',
                          '/photos/patients/12.jpeg',
                          '/photos/patients/13.jpeg',
                        ].map((src, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden bg-[var(--surface)]" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src={src}
                              alt={`Clinical photograph ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
