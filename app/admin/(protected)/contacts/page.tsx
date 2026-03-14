'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronUp } from 'lucide-react'

type Contact = {
  id: string
  name: string
  phone: string
  email: string
  reason: string
  message: string
  created_at: string
}

const REASON_LABELS: Record<string, string> = {
  general_inquiry: 'General Inquiry',
  appointment_query: 'Appointment Query',
  second_opinion: 'Second Opinion',
  other: 'Other',
}

export default function ContactsPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await fetch('/api/admin/contacts')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
  })

  return (
    <div>
      <h1 className="heading-section mb-6">Contact Messages</h1>

      {isLoading ? (
        <div className="card-warm p-8 text-center text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</div>
      ) : contacts.length === 0 ? (
        <div className="card-warm p-8 text-center text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No contact messages yet.</div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c: Contact) => (
            <div key={c.id} className="card-warm overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{c.name}</p>
                    <p className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>{c.email} · {c.phone}</p>
                  </div>
                  <span className="badge-sage">{REASON_LABELS[c.reason] || c.reason}</span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone-light)' }}>
                    {new Date(c.created_at).toLocaleDateString('en-IN')}
                  </span>
                </div>
                {expanded === c.id ? <ChevronUp size={16} style={{ color: 'var(--stone)', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'var(--stone)', flexShrink: 0 }} />}
              </button>
              {expanded === c.id && (
                <div className="px-4 pb-4 border-t border-[var(--border)]">
                  <p className="text-sm leading-relaxed pt-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal-light)' }}>
                    {c.message}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <a href={`mailto:${c.email}`} className="btn-secondary text-xs py-1.5 px-3">
                      Reply via Email
                    </a>
                    <a href={`tel:${c.phone}`} className="btn-ghost text-xs py-1.5 px-3">
                      Call
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
