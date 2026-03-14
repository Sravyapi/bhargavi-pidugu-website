'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Eye, X, Video, MessageSquare } from 'lucide-react'

type Appointment = {
  id: string
  patient_name: string
  patient_dob: string | null
  contact_email: string
  contact_phone: string
  concern_type: string
  concern_description: string | null
  appointment_type: string
  slot_datetime: string
  duration_minutes: number
  status: string
  google_meet_link: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: 'rgba(184,117,58,0.1)', color: 'var(--terracotta)' },
  confirmed: { bg: 'rgba(140,158,148,0.2)', color: 'var(--sage-dark)' },
  cancelled: { bg: 'rgba(140,123,107,0.15)', color: 'var(--stone)' },
  completed: { bg: 'rgba(140,158,148,0.1)', color: 'var(--sage-dark)' },
}

export default function AppointmentsPage() {
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Appointment | null>(null)
  const qc = useQueryClient()

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await fetch('/api/admin/appointments')
      if (!res.ok) throw new Error('Failed to load')
      const json = await res.json()
      return json.data?.appointments ?? []
    },
    staleTime: 5 * 60 * 1000,
  })

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/appointments/${id}/cancel`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Failed')
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Appointment cancelled')
      setSelected(null)
    },
    onError: () => toast.error('Could not cancel appointment'),
  })

  const filtered = filter === 'all' ? appointments : appointments.filter((a: Appointment) => a.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-section">Appointments</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
            style={{
              fontFamily: 'var(--font-ui)',
              background: filter === s ? 'var(--terracotta)' : 'white',
              color: filter === s ? 'white' : 'var(--charcoal)',
              border: `1px solid ${filter === s ? 'var(--terracotta)' : 'var(--border)'}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="card-warm p-8 text-center text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card-warm p-8 text-center text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>No appointments found.</div>
      ) : (
        <div className="card-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
              <thead>
                <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                  {['Date/Time', 'Patient', 'Type', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left p-4 font-semibold text-xs" style={{ color: 'var(--charcoal)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((apt: Appointment, i: number) => (
                  <tr
                    key={apt.id}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="p-4">
                      <p className="font-medium text-xs" style={{ color: 'var(--charcoal)' }}>
                        {new Date(apt.slot_datetime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--stone)' }}>
                        {new Date(apt.slot_datetime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium" style={{ color: 'var(--charcoal)' }}>{apt.patient_name}</p>
                      <p className="text-xs" style={{ color: 'var(--stone)' }}>{apt.contact_email}</p>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--stone)' }}>
                        {apt.appointment_type === 'online_video' ? <Video size={12} /> : <MessageSquare size={12} />}
                        {apt.appointment_type === 'online_video' ? 'Video' : 'Chat'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={STATUS_COLORS[apt.status] || { bg: 'var(--surface)', color: 'var(--stone)' }}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(apt)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-[var(--surface)]"
                          title="View"
                        >
                          <Eye size={14} style={{ color: 'var(--terracotta)' }} />
                        </button>
                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <button
                            onClick={() => cancelMutation.mutate(apt.id)}
                            className="p-1.5 rounded-lg transition-colors hover:bg-[var(--surface)]"
                            title="Cancel"
                          >
                            <X size={14} style={{ color: 'var(--stone)' }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="card-warm p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-card">Appointment Details</h3>
              <button onClick={() => setSelected(null)} className="btn-ghost p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
              {[
                ['Patient', selected.patient_name],
                ['DOB', selected.patient_dob ?? '—'],
                ['Phone', selected.contact_phone],
                ['Email', selected.contact_email],
                ['Type', selected.appointment_type === 'online_video' ? 'Online Video' : 'Online Chat'],
                ['Date/Time', `${new Date(selected.slot_datetime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })} IST`],
                ['Duration', `${selected.duration_minutes} min`],
                ['Status', selected.status],
                ['Concern', selected.concern_type],
                ...(selected.concern_description ? [['Description', selected.concern_description]] : []),
              ].map(([key, val]) => (
                <div key={key}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--stone)' }}>{key}</p>
                  <p style={{ color: 'var(--charcoal)' }}>{val}</p>
                </div>
              ))}

              {selected.google_meet_link && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--stone)' }}>Google Meet</p>
                  <a
                    href={selected.google_meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2"
                  >
                    <Video size={12} /> Join Meet
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
