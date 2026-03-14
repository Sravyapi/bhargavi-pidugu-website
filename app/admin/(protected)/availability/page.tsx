'use client'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2, Link2 } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface DayConfig {
  enabled: boolean
  start: string
  end: string
}

type WeekConfig = Record<string, DayConfig>

const DEFAULT_CONFIG: WeekConfig = Object.fromEntries(
  DAYS.map(d => [d, { enabled: d !== 'Saturday', start: '09:00', end: '17:00' }])
)

export default function AvailabilityPage() {
  const [config, setConfig] = useState<WeekConfig>(DEFAULT_CONFIG)
  const [blockouts, setBlockouts] = useState<string[]>([])
  const [newBlockout, setNewBlockout] = useState('')
  const [slotDuration, setSlotDuration] = useState(30)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, blockouts, slot_duration: slotDuration }),
      })
      if (res.ok) {
        toast.success('Availability saved!')
      } else {
        toast.error('Could not save. Please try again.')
      }
    } catch {
      toast.error('Network error.')
    } finally {
      setSaving(false)
    }
  }

  const addBlockout = () => {
    if (newBlockout && !blockouts.includes(newBlockout)) {
      setBlockouts(prev => [...prev, newBlockout].sort())
      setNewBlockout('')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-section">Availability</h1>
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? <Loader2 size={16} className="animate-spin" /> : null}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Days config */}
        <div className="card-warm p-6">
          <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
            Working Hours
          </h3>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
              Slot Duration (minutes)
            </label>
            <select
              value={slotDuration}
              onChange={e => setSlotDuration(Number(e.target.value))}
              className="field-base w-auto"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
          </div>

          <div className="space-y-3">
            {DAYS.map(day => (
              <div key={day} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={config[day]?.enabled ?? false}
                  onChange={e => setConfig(prev => ({
                    ...prev,
                    [day]: { ...prev[day], enabled: e.target.checked },
                  }))}
                  className="w-4 h-4 accent-[var(--terracotta)]"
                />
                <label
                  htmlFor={`day-${day}`}
                  className="w-24 text-sm font-medium"
                  style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}
                >
                  {day}
                </label>
                {config[day]?.enabled && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={config[day]?.start || '09:00'}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        [day]: { ...prev[day], start: e.target.value },
                      }))}
                      className="field-base w-auto py-1.5 text-xs"
                    />
                    <span className="text-xs" style={{ color: 'var(--stone)' }}>to</span>
                    <input
                      type="time"
                      value={config[day]?.end || '17:00'}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        [day]: { ...prev[day], end: e.target.value },
                      }))}
                      className="field-base w-auto py-1.5 text-xs"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Blockout dates & Google Calendar */}
        <div className="space-y-6">
          <div className="card-warm p-6">
            <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
              Block-out Dates
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="date"
                value={newBlockout}
                onChange={e => setNewBlockout(e.target.value)}
                className="field-base flex-1"
              />
              <button onClick={addBlockout} className="btn-primary py-2 px-3">
                <Plus size={16} />
              </button>
            </div>
            {blockouts.length === 0 ? (
              <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No block-out dates added.</p>
            ) : (
              <div className="space-y-2">
                {blockouts.map(date => (
                  <div key={date} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                    <span className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>{date}</span>
                    <button
                      onClick={() => setBlockouts(prev => prev.filter(d => d !== date))}
                      className="p-1 rounded hover:bg-[var(--border)]"
                    >
                      <Trash2 size={12} style={{ color: 'var(--stone)' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card-warm p-6">
            <h3 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
              Google Calendar
            </h3>
            <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Connect Google Calendar to auto-create Meet links and sync events.
            </p>
            <a href="/api/auth/google" className="btn-secondary text-sm">
              <Link2 size={14} /> Connect Google Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
