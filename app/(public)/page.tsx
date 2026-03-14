import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsStrip } from '@/components/home/StatsStrip'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { ExpertiseOverview } from '@/components/home/ExpertiseOverview'
import { ConferenceHighlights } from '@/components/home/ConferenceHighlights'
import { FAQSection } from '@/components/home/FAQSection'
import { CTABanner } from '@/components/home/CTABanner'

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL },
  twitter: { card: 'summary_large_image' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What age should I first bring my child for an eye exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The first eye check should ideally happen at 6 months of age, then again at 3 years, and before starting school. However, if you notice any signs of eye misalignment, unusual eye movements, or your child squinting or tilting their head — bring them in at any age. Early detection always leads to better outcomes.',
      },
    },
    {
      '@type': 'Question',
      name: 'My child seems to have a squint. How serious is this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A squint (strabismus) means the eyes are not aligned correctly. Left untreated, it can lead to amblyopia (lazy eye), where the brain starts to suppress vision from the misaligned eye. With the right treatment — glasses, patching, or surgery — most children do very well.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my child has a lazy eye?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Amblyopia is tricky to spot because children often don't complain — they simply learn to rely on the stronger eye. Watch for: closing one eye in bright light, consistently tilting or turning the head, missing things on one side, or difficulty with depth perception.",
      },
    },
    {
      '@type': 'Question',
      name: 'What happens during a paediatric eye examination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The exam checks visual acuity, eye alignment, movement, and the back of the eye (dilated fundus exam). We use special drops to widen the pupil — these sting briefly for 2–3 seconds, then cause temporary blurred vision and light sensitivity for 4–6 hours. Bring sunglasses for after.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is strabismus surgery safe for children?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Strabismus surgery is one of the most commonly performed paediatric eye operations — with an excellent safety record. Performed under general anaesthesia, the eye is never removed from the socket, and recovery is typically quick. Children are usually back to normal activities within a day or two.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can too much screen time damage my child\'s eyes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Screen time causes digital eye strain (tired eyes, headaches) but does not permanently damage the eyes. More concerning is that reduced outdoor time is linked to myopia progression. Limit recreational screen time, ensure 1–2 hours outdoors daily, and schedule regular eye checks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an optometrist and an ophthalmologist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An optometrist tests vision and prescribes glasses. An ophthalmologist is a medical doctor (MBBS + MS) who manages eye diseases and performs surgery. Dr. Bhargavi is an ophthalmologist with subspecialty fellowship training — she handles conditions well beyond glasses prescriptions.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <StatsStrip />
      <AboutTeaser />
      <ExpertiseOverview />
      <ConferenceHighlights />
      <FAQSection />
      <CTABanner />
    </>
  )
}
