'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What age should I first bring my child for an eye exam?',
    a: 'The first eye check should ideally happen at 6 months of age, then again at 3 years, and before starting school. However, if you notice any signs of eye misalignment, unusual eye movements, or your child squinting or tilting their head — bring them in at any age. Early detection always leads to better outcomes.',
  },
  {
    q: 'My child seems to have a squint. How serious is this?',
    a: 'A squint (strabismus) means the eyes are not aligned correctly. Left untreated, it can lead to amblyopia (lazy eye), where the brain starts to suppress vision from the misaligned eye. With the right treatment — glasses, patching, or surgery — most children do very well.',
  },
  {
    q: 'How do I know if my child has a lazy eye?',
    a: "Amblyopia is tricky to spot because children often don't complain — they simply learn to rely on the stronger eye. Watch for: closing one eye in bright light, consistently tilting or turning the head, missing things on one side, or difficulty with depth perception.",
  },
  {
    q: 'What happens during a paediatric eye examination?',
    a: 'The exam checks visual acuity, eye alignment, movement, and the back of the eye (dilated fundus exam). We use special drops to widen the pupil — these sting briefly for 2–3 seconds, then cause temporary blurred vision and light sensitivity for 4–6 hours. Bring sunglasses for after.',
  },
  {
    q: 'How does an online consultation work?',
    a: 'You book a 30-minute video call and receive a Google Meet link by email. Have previous eye reports, prescriptions, or photographs of the concern ready to share. Dr. Bhargavi will review everything, give her clinical impression, and recommend appropriate next steps.',
  },
  {
    q: 'Is strabismus surgery safe for children?',
    a: 'Strabismus surgery is one of the most commonly performed paediatric eye operations — with an excellent safety record. Performed under general anaesthesia, the eye is never removed from the socket, and recovery is typically quick. Children are usually back to normal activities within a day or two.',
  },
  {
    q: "Can too much screen time damage my child's eyes?",
    a: 'Screen time causes digital eye strain (tired eyes, headaches) but does not permanently damage the eyes. More concerning is that reduced outdoor time is linked to myopia progression. Limit recreational screen time, ensure 1–2 hours outdoors daily, and schedule regular eye checks.',
  },
  {
    q: 'What is the difference between an optometrist and an ophthalmologist?',
    a: 'An optometrist tests vision and prescribes glasses. An ophthalmologist is a medical doctor (MBBS + MS) who manages eye diseases and performs surgery. Dr. Bhargavi is an ophthalmologist with subspecialty fellowship training — she handles conditions well beyond glasses prescriptions.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32" style={{ background: 'var(--cream)' }}>
      <div className="container-site">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20 items-start">

          {/* LEFT: sticky header */}
          <AnimatedSection direction="left" className="lg:sticky lg:top-28">
            <p className="label-ui mb-3">FAQ</p>
            <h2 className="heading-section mb-6">
              Questions parents{' '}
              <em className="text-gradient not-italic">often ask</em>
            </h2>
            <p className="text-[var(--stone)] leading-relaxed mb-8" style={{ fontFamily: 'var(--font-ui)' }}>
              From first appointments to surgery — clear answers to the questions we hear most often.
            </p>
            {/* Decorative element */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--terracotta)' }} />
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
          </AnimatedSection>

          {/* RIGHT: accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05} direction="up">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    border: open === i
                      ? '1px solid rgba(194,119,62,0.4)'
                      : '1px solid var(--border)',
                    background: open === i ? 'var(--surface)' : 'var(--cream)',
                    boxShadow: open === i ? '0 4px 20px rgba(194,119,62,0.08)' : 'none',
                  }}
                >
                  {/* Question row */}
                  <button
                    className="w-full flex items-start gap-4 p-5 lg:p-6 text-left group"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    {/* Number */}
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                      style={{
                        background: open === i ? 'var(--terracotta)' : 'var(--surface)',
                        color: open === i ? 'white' : 'var(--stone)',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Text */}
                    <span
                      className="flex-1 text-sm font-semibold leading-snug pt-1 transition-colors duration-200"
                      style={{
                        color: open === i ? 'var(--charcoal)' : 'var(--charcoal-light)',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {faq.q}
                    </span>

                    {/* Icon */}
                    <span
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 transition-colors duration-200"
                      style={{ color: open === i ? 'var(--terracotta)' : 'var(--stone)' }}
                    >
                      {open === i ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-[4.5rem]">
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--stone)', fontFamily: 'var(--font-ui)' }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
