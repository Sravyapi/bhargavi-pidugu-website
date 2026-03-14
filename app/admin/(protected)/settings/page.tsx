'use client'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, ToggleLeft, ToggleRight, Link2, Link2Off, Save } from 'lucide-react'

interface Settings {
  bookings_enabled: boolean
  consultation_duration: number
  consultation_fee: number
  advance_booking_days: number
  admin_email: string
  google_connected: boolean
}

export default function SettingsPage() {
  const qc = useQueryClient()
  const [settings, setSettings] = useState<Settings>({
    bookings_enabled: false,
    consultation_duration: 30,
    consultation_fee: 500,
    advance_booking_days: 14,
    admin_email: 'dr.bhargavipidugu@gmail.com',
    google_connected: false,
  })
  const [saving, setSaving] = useState(false)
  const [togglingBookings, setTogglingBookings] = useState(false)

  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
  })

  useEffect(() => {
    if (data) {
      setSettings(prev => ({ ...prev, ...data }))
    }
  }, [data])

  const toggleBookings = async () => {
    setTogglingBookings(true)
    try {
      const newValue = !settings.bookings_enabled
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'bookings_enabled', value: String(newValue) }),
      })
      if (res.ok) {
        setSettings(prev => ({ ...prev, bookings_enabled: newValue }))
        qc.invalidateQueries({ queryKey: ['settings'] })
        toast.success(newValue ? 'Bookings are now OPEN' : 'Bookings are now CLOSED (waitlist mode)')
      } else {
        toast.error('Could not update setting')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setTogglingBookings(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const toSave = [
        { key: 'appointment_duration_minutes', value: String(settings.consultation_duration) },
        { key: 'consultation_fee', value: String(settings.consultation_fee) },
        { key: 'advance_booking_days', value: String(settings.advance_booking_days) },
        { key: 'admin_email', value: settings.admin_email },
      ]
      await Promise.all(toSave.map(({ key, value }) =>
        fetch('/api/admin/settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value }),
        })
      ))
      toast.success('Settings saved!')
    } catch {
      toast.error('Could not save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="heading-section mb-6">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        {/* Bookings toggle */}
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
                Accept Bookings
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                When <strong>OFF</strong>, visitors see the waitlist form instead of the booking calendar.
              </p>
            </div>
            <button
              onClick={toggleBookings}
              disabled={togglingBookings}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all text-sm"
              style={{
                fontFamily: 'var(--font-ui)',
                background: settings.bookings_enabled ? 'var(--sage)' : 'var(--stone-light)',
                color: 'white',
              }}
            >
              {togglingBookings ? (
                <Loader2 size={16} className="animate-spin" />
              ) : settings.bookings_enabled ? (
                <ToggleRight size={20} />
              ) : (
                <ToggleLeft size={20} />
              )}
              {settings.bookings_enabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Site info */}
        <div className="card-warm p-6">
          <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
            Consultation Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.consultation_duration}
                onChange={e => setSettings(prev => ({ ...prev, consultation_duration: Number(e.target.value) }))}
                className="field-base"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                Fee (₹)
              </label>
              <input
                type="number"
                value={settings.consultation_fee}
                onChange={e => setSettings(prev => ({ ...prev, consultation_fee: Number(e.target.value) }))}
                className="field-base"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                Advance Booking (days)
              </label>
              <input
                type="number"
                value={settings.advance_booking_days}
                onChange={e => setSettings(prev => ({ ...prev, advance_booking_days: Number(e.target.value) }))}
                className="field-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
              Admin Notification Email
            </label>
            <input
              type="email"
              value={settings.admin_email}
              onChange={e => setSettings(prev => ({ ...prev, admin_email: e.target.value }))}
              className="field-base"
            />
          </div>
        </div>

        {/* Google Calendar */}
        <div className="card-warm p-6">
          <h3 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)', fontSize: '0.95rem' }}>
            Google Calendar
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: settings.google_connected ? 'var(--sage-dark)' : 'var(--stone)' }}>
              {settings.google_connected ? '✓ Connected' : 'Not connected'}
            </p>
            {settings.google_connected ? (
              <a
                href="/api/auth/google/disconnect"
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Link2Off size={14} /> Disconnect
              </a>
            ) : (
              <a
                href="/api/auth/google"
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Link2 size={14} /> Connect Google Calendar
              </a>
            )}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button onClick={saveSettings} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
