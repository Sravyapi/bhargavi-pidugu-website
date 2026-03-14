'use client'
import { useMemo } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { format, addDays, startOfDay } from 'date-fns'

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

interface BookingStepDateTimeProps {
  selectedDate: string
  selectedTime: string
  availableSlots: string[]
  loadingSlots: boolean
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
  onBack: () => void
  onContinue: () => void
}

export function BookingStepDateTime({
  selectedDate,
  selectedTime,
  availableSlots,
  loadingSlots,
  onDateSelect,
  onTimeSelect,
  onBack,
  onContinue,
}: BookingStepDateTimeProps) {
  const availableSet = useMemo(
    () => new Set(availableSlots),
    [availableSlots]
  )

  return (
    <div>
      <h2 className="heading-section mb-2">Pick a date &amp; time</h2>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
        Select your preferred appointment slot (IST).
      </p>

      {/* Date picker (next 14 days) */}
      <div className="mb-6">
        <label className="block text-xs font-medium mb-2" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Select Date</label>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 14 }, (_, i) => {
            const d = addDays(startOfDay(new Date()), i + 1)
            const dateStr = format(d, 'yyyy-MM-dd')
            const isWeekend = d.getDay() === 0
            return (
              <button
                key={dateStr}
                disabled={isWeekend}
                onClick={() => onDateSelect(dateStr)}
                className="px-3 py-2 rounded-lg text-xs transition-all"
                style={{
                  fontFamily: 'var(--font-ui)',
                  background: selectedDate === dateStr ? 'var(--terracotta)' : isWeekend ? 'var(--surface)' : 'white',
                  color: selectedDate === dateStr ? 'white' : isWeekend ? 'var(--stone-light)' : 'var(--charcoal)',
                  border: `1px solid ${selectedDate === dateStr ? 'var(--terracotta)' : 'var(--border)'}`,
                  cursor: isWeekend ? 'not-allowed' : 'pointer',
                  opacity: isWeekend ? 0.5 : 1,
                }}
              >
                <div>{format(d, 'EEE')}</div>
                <div className="font-semibold">{format(d, 'd MMM')}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <label className="block text-xs font-medium mb-2" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Select Time (IST)</label>
          {loadingSlots ? (
            <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              <Loader2 size={14} className="animate-spin" /> Loading slots…
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {TIMES.map(t => {
                const available = availableSlots.length === 0 || availableSet.has(t)
                return (
                  <button
                    key={t}
                    disabled={!available}
                    onClick={() => onTimeSelect(t)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      background: selectedTime === t ? 'var(--terracotta)' : available ? 'white' : 'var(--surface)',
                      color: selectedTime === t ? 'white' : available ? 'var(--charcoal)' : 'var(--stone-light)',
                      border: `1px solid ${selectedTime === t ? 'var(--terracotta)' : 'var(--border)'}`,
                      cursor: available ? 'pointer' : 'not-allowed',
                      opacity: available ? 1 : 0.5,
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button onClick={onBack} className="btn-secondary w-full sm:w-auto justify-center">
          <ChevronLeft size={16} /> Back
        </button>
        <button
          disabled={!selectedDate || !selectedTime}
          onClick={onContinue}
          className="btn-primary w-full sm:w-auto justify-center"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
