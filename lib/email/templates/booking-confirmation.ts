import { emailBase, h1Style, pStyle, labelStyle, valueStyle, buttonStyle, escapeHtml } from './base'
import { format } from 'date-fns'

export function bookingConfirmationPatient(data: {
  patientName: string
  contactName: string
  slotDatetime: string
  durationMinutes: number
  meetLink: string
  concernType: string
}): string {
  const date = new Date(data.slotDatetime)
  const formattedDate = format(date, 'EEEE, dd MMMM yyyy')
  const formattedTime = format(date, 'h:mm a') + ' IST'
  const concernLabel = data.concernType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const safePatientName = escapeHtml(data.patientName)
  const safeContactName = escapeHtml(data.contactName)
  const safeMeetLink = data.meetLink ? escapeHtml(data.meetLink) : ''

  const content = `
    <h1 style="${h1Style}">Your appointment is confirmed.</h1>
    <p style="${pStyle}">
      Dear ${safeContactName}, your online consultation with Dr. Bhargavi Pidugu has been successfully booked.
    </p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Patient</span>
      <span style="${valueStyle}">${safePatientName}</span>
      <span style="${labelStyle}">Date</span>
      <span style="${valueStyle}">${formattedDate}</span>
      <span style="${labelStyle}">Time</span>
      <span style="${valueStyle}">${formattedTime}</span>
      <span style="${labelStyle}">Duration</span>
      <span style="${valueStyle}">${data.durationMinutes} minutes</span>
      <span style="${labelStyle}">Concern</span>
      <span style="${valueStyle}">${escapeHtml(concernLabel)}</span>
    </div>
    ${safeMeetLink ? `
    <p style="${pStyle}">Join your consultation using the Google Meet link below:</p>
    <p style="margin:0 0 24px;">
      <a href="${safeMeetLink}" style="${buttonStyle}">Join Google Meet</a>
    </p>
    <p style="margin:0 0 16px;color:#7A6E68;font-size:13px;">
      Or copy this link: <span style="color:#C4754A;">${safeMeetLink}</span>
    </p>
    ` : ''}
    <p style="${pStyle}">
      Please keep any previous eye reports, prescriptions, or photographs ready to share during the call.
    </p>
    <p style="margin:32px 0 0;color:#7A6E68;font-size:13px;line-height:1.6;">
      If you need to cancel or reschedule, please contact us at least 24 hours before your appointment.
    </p>
  `
  return emailBase(content, `Appointment confirmed — ${formattedDate}`)
}

export function bookingNotificationAdmin(data: {
  patientName: string
  patientDob: string
  contactEmail: string
  contactPhone: string
  concernType: string
  concernDescription: string
  slotDatetime: string
}): string {
  const date = new Date(data.slotDatetime)
  const formattedDate = format(date, 'EEEE, dd MMMM yyyy')
  const formattedTime = format(date, 'h:mm a') + ' IST'
  const concernLabel = data.concernType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const safe = {
    patientName: escapeHtml(data.patientName),
    patientDob: escapeHtml(data.patientDob),
    contactEmail: escapeHtml(data.contactEmail),
    contactPhone: escapeHtml(data.contactPhone),
    concernLabel: escapeHtml(concernLabel),
    concernDescription: escapeHtml(data.concernDescription),
  }

  const content = `
    <h1 style="${h1Style}">New appointment booked</h1>
    <p style="${pStyle}">A new online consultation has been scheduled.</p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Patient Name</span>
      <span style="${valueStyle}">${safe.patientName}</span>
      <span style="${labelStyle}">Date of Birth</span>
      <span style="${valueStyle}">${safe.patientDob}</span>
      <span style="${labelStyle}">Contact Email</span>
      <span style="${valueStyle}">${safe.contactEmail}</span>
      <span style="${labelStyle}">Contact Phone</span>
      <span style="${valueStyle}">${safe.contactPhone}</span>
      <span style="${labelStyle}">Appointment</span>
      <span style="${valueStyle}">${formattedDate} at ${formattedTime}</span>
      <span style="${labelStyle}">Concern</span>
      <span style="${valueStyle}">${safe.concernLabel}</span>
      <span style="${labelStyle}">Description</span>
      <span style="display:block;color:#2D2420;font-size:15px;white-space:pre-wrap;">${safe.concernDescription}</span>
    </div>
  `
  return emailBase(content, `New appointment: ${safe.patientName} — ${formattedDate}`)
}
