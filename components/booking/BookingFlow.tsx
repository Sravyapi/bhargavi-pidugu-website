'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Video, ChevronLeft, ChevronRight, Check, Loader2, Calendar } from 'lucide-react'
import { format, addDays, startOfDay } from 'date-fns'

// Step 1 — Consultation Type
const CONSULTATION_TYPES = [
  {
    id: 'online_video',
    icon: Video,
    title: 'Online Video Call',
    desc: 'Face-to-face consultation via Google Meet. Best for assessments requiring visual examination.',
    duration: '30 min',
  },
]

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/

// Patient details schema — mirrors BookingStep3Schema in lib/validations.ts
const patientSchema = z.object({
  patient_name: z.string().min(2, 'Patient name is required').max(100),
  patient_dob: z.string().refine((d) => {
    const date = new Date(d)
    return !isNaN(date.getTime()) && date < new Date()
  }, 'Please enter a valid date of birth'),
  relation_to_patient: z.enum(['self', 'parent-guardian', 'spouse', 'sibling', 'other']),
  contact_email: z.string().email('Please enter a valid email address'),
  contact_phone: z.string().regex(phoneRegex, 'Please enter a valid Indian phone number'),
  whatsapp_preferred: z.boolean().default(false),
  concern_type: z.enum([
    'squint-strabismus',
    'lazy-eye-amblyopia',
    'refractive-error-child',
    'paediatric-cataract',
    'neuro-ophthalmology',
    'general-eye-examination',
    'follow-up',
    'other',
  ]),
  concern_description: z.string().min(20, 'Please describe the concern (at least 20 characters)').max(500),
  previous_diagnosis: z.string().max(300).optional(),
  current_prescription: z.string().max(200).optional(),
  previous_surgeries: z.boolean().optional(),
  surgery_details: z.string().max(300).optional(),
})
type PatientData = z.infer<typeof patientSchema>

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

interface BookingState {
  type: string
  date: string
  time: string
  patient: PatientData | null
}

const STEP_LABELS = ['Consultation Type', 'Date & Time', 'Patient Details', 'Confirm']

export function BookingFlow() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingState>({ type: '', date: '', time: '', patient: null })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [confirmation, setConfirmation] = useState<{ id: string; meet_link?: string } | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PatientData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      whatsapp_preferred: false,
      previous_surgeries: false,
    },
  })

  const previousSurgeries = watch('previous_surgeries')

  const fetchSlots = async (date: string) => {
    setLoadingSlots(true)
    try {
      const res = await fetch(`/api/slots?date=${date}`)
      if (res.ok) {
        const data = await res.json()
        setAvailableSlots(data.map((s: { time: string }) => s.time))
      }
    } catch {
      setAvailableSlots(TIMES)
    } finally {
      setLoadingSlots(false)
    }
  }

  const onPatientSubmit = (data: PatientData) => {
    setBooking(prev => ({ ...prev, patient: data }))
    setStep(4)
  }

  const confirmBooking = async () => {
    if (!booking.patient) return
    setConfirming(true)
    try {
      // Build ISO datetime from date + time (IST = UTC+5:30)
      const slotDatetime = `${booking.date}T${booking.time}:00+05:30`

      // Server expects FormData (not JSON)
      const fd = new FormData()
      fd.append('slot_datetime', slotDatetime)
      fd.append('patient_name', booking.patient.patient_name)
      fd.append('patient_dob', booking.patient.patient_dob)
      fd.append('relation_to_patient', booking.patient.relation_to_patient)
      fd.append('contact_email', booking.patient.contact_email)
      fd.append('contact_phone', booking.patient.contact_phone)
      fd.append('whatsapp_preferred', String(booking.patient.whatsapp_preferred ?? false))
      fd.append('concern_type', booking.patient.concern_type)
      fd.append('concern_description', booking.patient.concern_description)
      if (booking.patient.previous_diagnosis) fd.append('previous_diagnosis', booking.patient.previous_diagnosis)
      if (booking.patient.current_prescription) fd.append('current_prescription', booking.patient.current_prescription)
      fd.append('previous_surgeries', String(booking.patient.previous_surgeries ?? false))
      if (booking.patient.surgery_details) fd.append('surgery_details', booking.patient.surgery_details)

      const res = await fetch('/api/book', {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        const data = await res.json()
        setConfirmation({ id: data.data.appointment_id, meet_link: data.data.meet_link })
        toast.success('Appointment confirmed!')
      } else {
        const errData = await res.json().catch(() => ({}))
        toast.error((errData as { error?: string }).error || 'Could not confirm appointment. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setConfirming(false)
    }
  }

  if (confirmation) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="container-site max-w-md">
          <div className="card-warm p-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--sage-light)', color: 'var(--sage-dark)' }}
            >
              <Check size={28} />
            </div>
            <h2 className="heading-section mb-2">Appointment Confirmed!</h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Booking ID: <code style={{ fontFamily: 'monospace' }}>{confirmation.id.slice(0, 8)}</code>
            </p>
            <div className="card-warm p-4 mb-6 text-left">
              <p className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                <strong>Type:</strong> {CONSULTATION_TYPES.find(t => t.id === booking.type)?.title}<br />
                <strong>Date:</strong> {booking.date}<br />
                <strong>Time:</strong> {booking.time} IST<br />
                <strong>Patient:</strong> {booking.patient?.patient_name}
              </p>
              {confirmation.meet_link && (
                <a href={confirmation.meet_link} className="btn-primary mt-4 text-sm" target="_blank" rel="noopener noreferrer">
                  <Video size={14} /> Join Google Meet
                </a>
              )}
            </div>
            <p className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              A confirmation email has been sent. You&apos;ll receive a reminder 24 hours before your appointment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="container-site section-padding max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: step > i + 1 ? 'var(--sage)' : step === i + 1 ? 'var(--terracotta)' : 'var(--border)',
                    color: step >= i + 1 ? 'white' : 'var(--stone)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block" style={{ fontFamily: 'var(--font-ui)', color: step === i + 1 ? 'var(--terracotta)' : 'var(--stone)' }}>
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="w-8 sm:w-16 h-px mx-1" style={{ background: step > i + 1 ? 'var(--sage)' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="heading-section mb-2">Choose consultation type</h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Select how you&apos;d like to connect with Dr. Bhargavi.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONSULTATION_TYPES.map(type => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => { setBooking(prev => ({ ...prev, type: type.id })); setStep(2) }}
                    className="card-warm p-6 text-left group transition-all hover:border-[var(--terracotta)]"
                    style={{ border: booking.type === type.id ? '2px solid var(--terracotta)' : undefined }}
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
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="heading-section mb-2">Pick a date & time</h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Select your preferred appointment slot (IST).
            </p>

            {/* Date picker (simple — next 14 days) */}
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
                      onClick={() => { setBooking(prev => ({ ...prev, date: dateStr, time: '' })); fetchSlots(dateStr) }}
                      className="px-3 py-2 rounded-lg text-xs transition-all"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        background: booking.date === dateStr ? 'var(--terracotta)' : isWeekend ? 'var(--surface)' : 'white',
                        color: booking.date === dateStr ? 'white' : isWeekend ? 'var(--stone-light)' : 'var(--charcoal)',
                        border: `1px solid ${booking.date === dateStr ? 'var(--terracotta)' : 'var(--border)'}`,
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
            {booking.date && (
              <div>
                <label className="block text-xs font-medium mb-2" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Select Time (IST)</label>
                {loadingSlots ? (
                  <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
                    <Loader2 size={14} className="animate-spin" /> Loading slots…
                  </div>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {TIMES.map(t => {
                      const available = availableSlots.length === 0 || availableSlots.includes(t)
                      return (
                        <button
                          key={t}
                          disabled={!available}
                          onClick={() => setBooking(prev => ({ ...prev, time: t }))}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                          style={{
                            fontFamily: 'var(--font-ui)',
                            background: booking.time === t ? 'var(--terracotta)' : available ? 'white' : 'var(--surface)',
                            color: booking.time === t ? 'white' : available ? 'var(--charcoal)' : 'var(--stone-light)',
                            border: `1px solid ${booking.time === t ? 'var(--terracotta)' : 'var(--border)'}`,
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

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                disabled={!booking.date || !booking.time}
                onClick={() => setStep(3)}
                className="btn-primary"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="heading-section mb-2">Patient details</h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Tell us about the patient being seen.
            </p>

            <form onSubmit={handleSubmit(onPatientSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Patient Name *</label>
                  <input {...register('patient_name')} className="field-base" placeholder="Full name" />
                  {errors.patient_name && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.patient_name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Date of Birth *</label>
                  <input {...register('patient_dob')} className="field-base" type="date" max={new Date().toISOString().split('T')[0]} />
                  {errors.patient_dob && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.patient_dob.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Relation to Patient *</label>
                <select {...register('relation_to_patient')} className="field-base">
                  <option value="">Select</option>
                  <option value="self">Self</option>
                  <option value="parent-guardian">Parent / Guardian</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="other">Other</option>
                </select>
                {errors.relation_to_patient && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.relation_to_patient.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Contact Phone *</label>
                  <input {...register('contact_phone')} className="field-base" type="tel" placeholder="10-digit mobile" />
                  {errors.contact_phone && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.contact_phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Contact Email *</label>
                  <input {...register('contact_email')} className="field-base" type="email" placeholder="your@email.com" />
                  {errors.contact_email && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.contact_email.message}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                  <input {...register('whatsapp_preferred')} type="checkbox" className="w-4 h-4 accent-[var(--terracotta)]" />
                  Prefer WhatsApp for communication
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Concern Type *</label>
                <select {...register('concern_type')} className="field-base">
                  <option value="">Select concern</option>
                  <option value="squint-strabismus">Squint / Strabismus</option>
                  <option value="lazy-eye-amblyopia">Lazy Eye / Amblyopia</option>
                  <option value="refractive-error-child">Refractive Error (Child)</option>
                  <option value="paediatric-cataract">Paediatric Cataract</option>
                  <option value="neuro-ophthalmology">Neuro-ophthalmology</option>
                  <option value="general-eye-examination">General Eye Examination</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="other">Other</option>
                </select>
                {errors.concern_type && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.concern_type.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Describe the Concern *</label>
                <textarea {...register('concern_description')} rows={3} className="field-base resize-none" placeholder="Please describe the main concern in detail (min 20 characters)…" />
                {errors.concern_description && <p className="text-xs mt-1" style={{ color: 'var(--terracotta)' }}>{errors.concern_description.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Previous Diagnosis (optional)</label>
                <input {...register('previous_diagnosis')} className="field-base" placeholder="Any existing diagnosis" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Current Prescription (optional)</label>
                <input {...register('current_prescription')} className="field-base" placeholder="Current glasses / contact prescription" />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>
                  <input {...register('previous_surgeries')} type="checkbox" className="w-4 h-4 accent-[var(--terracotta)]" />
                  Previous eye surgeries
                </label>
              </div>

              {previousSurgeries && (
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-ui)', color: 'var(--charcoal)' }}>Surgery Details</label>
                  <textarea {...register('surgery_details')} rows={2} className="field-base resize-none" placeholder="Details of previous eye surgeries…" />
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">
                  <ChevronLeft size={16} /> Back
                </button>
                <button type="submit" className="btn-primary">
                  Review Details <ChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && booking.patient && (
          <div>
            <h2 className="heading-section mb-2">Review & confirm</h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
              Please review your appointment details before confirming.
            </p>

            <div className="card-warm p-6 mb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
                <div>
                  <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</p>
                  <p style={{ color: 'var(--charcoal)' }}>{CONSULTATION_TYPES.find(t => t.id === booking.type)?.title}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date & Time</p>
                  <p style={{ color: 'var(--charcoal)' }}>{booking.date} at {booking.time} IST</p>
                </div>
                <div>
                  <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient</p>
                  <p style={{ color: 'var(--charcoal)' }}>{booking.patient.patient_name} (DOB: {booking.patient.patient_dob})</p>
                </div>
                <div>
                  <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</p>
                  <p style={{ color: 'var(--charcoal)' }}>{booking.patient.contact_phone}<br />{booking.patient.contact_email}</p>
                </div>
                <div className="col-span-2">
                  <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Concern</p>
                  <p style={{ color: 'var(--charcoal)' }}>{booking.patient.concern_description}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button onClick={confirmBooking} disabled={confirming} className="btn-primary">
                {confirming ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
                {confirming ? 'Confirming…' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
