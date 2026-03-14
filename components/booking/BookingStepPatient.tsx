'use client'
import { UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { BookingStep3Input } from '@/lib/validations'

interface BookingStepPatientProps {
  register: UseFormRegister<BookingStep3Input>
  handleSubmit: UseFormHandleSubmit<BookingStep3Input>
  errors: FieldErrors<BookingStep3Input>
  watch: UseFormWatch<BookingStep3Input>
  onSubmit: (data: BookingStep3Input) => void
  onBack: () => void
}

export function BookingStepPatient({
  register,
  handleSubmit,
  errors,
  watch,
  onSubmit,
  onBack,
}: BookingStepPatientProps) {
  const previousSurgeries = watch('previous_surgeries')

  return (
    <div>
      <h2 className="heading-section mb-2">Patient details</h2>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--stone)' }}>
        Tell us about the patient being seen.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={onBack} className="btn-secondary w-full sm:w-auto justify-center">
            <ChevronLeft size={16} /> Back
          </button>
          <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
            Review Details <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
