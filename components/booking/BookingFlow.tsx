'use client'
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Video, Check } from 'lucide-react'
import { BookingStep3Schema, type BookingStep3Input } from '@/lib/validations'
import type { TimeSlot } from '@/lib/types'
import { apiFetch, ApiError } from '@/lib/api-client'
import { IST_OFFSET_MS } from '@/lib/constants'
import { BookingStepType } from './BookingStepType'
import { BookingStepDateTime } from './BookingStepDateTime'
import { BookingStepPatient } from './BookingStepPatient'
import { BookingStepConfirm } from './BookingStepConfirm'

const CONSULTATION_TYPES = [
  {
    id: 'online_video',
    title: 'Online Video Call',
  },
]

const STEP_LABELS = ['Consultation Type', 'Date & Time', 'Patient Details', 'Confirm']

interface BookingState {
  type: string
  date: string
  time: string
  patient: BookingStep3Input | null
}

export function BookingFlow() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingState>({ type: '', date: '', time: '', patient: null })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [confirmation, setConfirmation] = useState<{ id: string; meet_link?: string } | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingStep3Input>({
    resolver: zodResolver(BookingStep3Schema),
    defaultValues: {
      whatsapp_preferred: false,
      previous_surgeries: false,
    },
  })

  const fetchSlots = useCallback(async (date: string) => {
    setLoadingSlots(true)
    try {
      const res = await fetch(`/api/slots?date=${date}`)
      if (res.ok) {
        const data = await res.json()
        // API returns { success: true, data: { slots: TimeSlot[] } }
        // Extract "HH:MM" IST time strings from available slots
        const slots: TimeSlot[] = data?.data?.slots ?? []
        const times = slots
          .filter((s) => s.available)
          .map((s) => {
            const d = new Date(new Date(s.start).getTime() + IST_OFFSET_MS)
            const hh = String(d.getUTCHours()).padStart(2, '0')
            const mm = String(d.getUTCMinutes()).padStart(2, '0')
            return `${hh}:${mm}`
          })
        setAvailableSlots(times)
      }
    } catch {
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  const handleTypeSelect = (typeId: string) => {
    setBooking(prev => ({ ...prev, type: typeId }))
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setBooking(prev => ({ ...prev, date, time: '' }))
    fetchSlots(date)
  }

  const handleTimeSelect = (time: string) => {
    setBooking(prev => ({ ...prev, time }))
  }

  const onPatientSubmit = (data: BookingStep3Input) => {
    setBooking(prev => ({ ...prev, patient: data }))
    setStep(4)
  }

  const confirmBooking = async () => {
    if (!booking.patient) return
    setConfirming(true)
    try {
      const slotDatetime = `${booking.date}T${booking.time}:00+05:30`

      const bookingData = {
        slot_datetime: slotDatetime,
        patient_name: booking.patient.patient_name,
        patient_dob: booking.patient.patient_dob,
        relation_to_patient: booking.patient.relation_to_patient,
        contact_email: booking.patient.contact_email,
        contact_phone: booking.patient.contact_phone,
        whatsapp_preferred: booking.patient.whatsapp_preferred ?? false,
        concern_type: booking.patient.concern_type,
        concern_description: booking.patient.concern_description,
        ...(booking.patient.previous_diagnosis ? { previous_diagnosis: booking.patient.previous_diagnosis } : {}),
        ...(booking.patient.current_prescription ? { current_prescription: booking.patient.current_prescription } : {}),
        previous_surgeries: booking.patient.previous_surgeries ?? false,
        ...(booking.patient.surgery_details ? { surgery_details: booking.patient.surgery_details } : {}),
      }

      const data = await apiFetch<{ data: { appointment_id: string; meet_link?: string } }>('/api/book', bookingData)
      setConfirmation({ id: data.data.appointment_id, meet_link: data.data.meet_link })
      toast.success('Appointment confirmed!')
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error('Network error. Please try again.')
      }
    } finally {
      setConfirming(false)
    }
  }

  if (confirmation) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: 'var(--cream)' }}>
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
    <div className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
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
                <div className="flex-1 h-px mx-1 min-w-[12px] sm:min-w-[32px]" style={{ background: step > i + 1 ? 'var(--sage)' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <BookingStepType
            selectedType={booking.type}
            onSelect={handleTypeSelect}
          />
        )}

        {step === 2 && (
          <BookingStepDateTime
            selectedDate={booking.date}
            selectedTime={booking.time}
            availableSlots={availableSlots}
            loadingSlots={loadingSlots}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <BookingStepPatient
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            watch={watch}
            onSubmit={onPatientSubmit}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && booking.patient && (
          <BookingStepConfirm
            bookingType={booking.type}
            bookingDate={booking.date}
            bookingTime={booking.time}
            patient={booking.patient}
            confirming={confirming}
            onBack={() => setStep(3)}
            onConfirm={confirmBooking}
          />
        )}
      </div>
    </div>
  )
}
