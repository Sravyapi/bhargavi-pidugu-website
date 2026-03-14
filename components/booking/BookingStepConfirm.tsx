'use client'
import { ChevronLeft, Calendar, Loader2 } from 'lucide-react'
import type { BookingStep3Input } from '@/lib/validations'
import { CONSULTATION_TYPES } from '@/lib/constants'

interface BookingStepConfirmProps {
  bookingType: string
  bookingDate: string
  bookingTime: string
  patient: BookingStep3Input
  confirming: boolean
  onBack: () => void
  onConfirm: () => void
}

export function BookingStepConfirm({
  bookingType,
  bookingDate,
  bookingTime,
  patient,
  confirming,
  onBack,
  onConfirm,
}: BookingStepConfirmProps) {
  return (
    <div>
      <h2 className="heading-section mb-2">Review &amp; confirm</h2>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
        Please review your appointment details before confirming.
      </p>

      <div className="card-warm p-6 mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
          <div>
            <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</p>
            <p style={{ color: 'var(--charcoal)' }}>{CONSULTATION_TYPES.find(t => t.id === bookingType)?.title}</p>
          </div>
          <div>
            <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date &amp; Time</p>
            <p style={{ color: 'var(--charcoal)' }}>{bookingDate} at {bookingTime} IST</p>
          </div>
          <div>
            <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient</p>
            <p style={{ color: 'var(--charcoal)' }}>{patient.patient_name} (DOB: {patient.patient_dob})</p>
          </div>
          <div>
            <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</p>
            <p style={{ color: 'var(--charcoal)' }}>{patient.contact_phone}<br />{patient.contact_email}</p>
          </div>
          <div className="sm:col-span-2">
            <p style={{ color: 'var(--stone)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Concern</p>
            <p style={{ color: 'var(--charcoal)' }}>{patient.concern_description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onBack} className="btn-secondary w-full sm:w-auto justify-center">
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={onConfirm} disabled={confirming} className="btn-primary w-full sm:w-auto justify-center">
          {confirming ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
          {confirming ? 'Confirming…' : 'Confirm Appointment'}
        </button>
      </div>
    </div>
  )
}
