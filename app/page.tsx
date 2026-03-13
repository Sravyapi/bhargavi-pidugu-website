import { HeroSection } from '@/components/home/HeroSection'
import { StatsStrip } from '@/components/home/StatsStrip'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { ExpertiseOverview } from '@/components/home/ExpertiseOverview'
import { ConferenceHighlights } from '@/components/home/ConferenceHighlights'
import { FAQSection } from '@/components/home/FAQSection'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
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
