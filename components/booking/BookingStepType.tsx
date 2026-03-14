'use client'
import { Video } from 'lucide-react'
import { CONSULTATION_TYPES } from '@/lib/constants'

const CONSULTATION_TYPE_ICONS: Record<string, typeof Video> = {
  online_video: Video,
}

interface BookingStepTypeProps {
  selectedType: string
  onSelect: (typeId: string) => void
}

export function BookingStepType({ selectedType, onSelect }: BookingStepTypeProps) {
  return (
    <div>
      <h2 className="heading-section mb-2">Choose consultation type</h2>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
        Select how you&apos;d like to connect with Dr. Bhargavi.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONSULTATION_TYPES.map(type => {
          const Icon = CONSULTATION_TYPE_ICONS[type.id] ?? Video
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className="card-warm p-6 text-left group transition-all hover:border-[var(--terracotta)]"
              style={{ border: selectedType === type.id ? '2px solid var(--terracotta)' : undefined }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--surface)' }}
              >
                <Icon size={22} style={{ color: 'var(--terracotta)' }} />
              </div>
              <h3 className="heading-card mb-1">{type.title}</h3>
              <p className="text-sm mb-3" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>{type.desc}</p>
              <span className="badge-sage">{type.duration}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
