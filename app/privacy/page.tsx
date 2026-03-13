import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Dr. Bhargavi Pidugu website.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section
        className="section-padding gradient-surface"
      >
        <div className="container-site max-w-3xl">
          <p className="label-ui mb-3">Legal</p>
          <h1 className="heading-display">Privacy Policy</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <AnimatedSection>
            <div className="prose-warm prose prose-stone" style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal-light)' }}>
              <p className="meta-text">
                Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>

              <h2>1. What Data We Collect</h2>
              <p>
                When you use this website, we may collect the following personal information:
              </p>
              <ul>
                <li><strong>Contact form submissions:</strong> Name, phone number, email address, and your message.</li>
                <li><strong>Appointment data:</strong> Patient name, age, gender, contact details, and clinical information you choose to share.</li>
                <li><strong>Waitlist entries:</strong> Name, phone, email, and optional message.</li>
                <li><strong>Technical data:</strong> Standard server logs including IP address and browser type (not linked to personal profiles).</li>
              </ul>

              <h2>2. How Your Data Is Used</h2>
              <p>
                Your data is used <strong>exclusively</strong> for:
              </p>
              <ul>
                <li>Responding to your inquiry or booking request</li>
                <li>Sending appointment confirmations and reminders</li>
                <li>Notifying waitlist members when consultations open</li>
                <li>Communicating care-related information relevant to your query</li>
              </ul>
              <p>
                We do not sell, share, or disclose your personal information to third parties except where required by law, or to provide the services you requested (e.g., Google Meet for video consultations).
              </p>

              <h2>3. Data Retention</h2>
              <p>
                Personal data is retained for a period of <strong>2 years</strong> from the date of collection, after which it is securely deleted. Appointment records may be retained longer if required for clinical continuity.
              </p>

              <h2>4. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2>5. Contact for Data Requests</h2>
              <p>
                To exercise any of the above rights, or for any privacy-related queries, please contact:
              </p>
              <p>
                <strong>Dr. Bhargavi Pidugu</strong><br />
                Email: <a href="mailto:dr.bhargavipidugu@gmail.com">dr.bhargavipidugu@gmail.com</a><br />
                LV Prasad Eye Institute, Banjara Hills, Hyderabad
              </p>

              <h2>6. Medical Disclaimer</h2>
              <p>
                Information published on this website is for general educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified medical professional for any health concerns.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
