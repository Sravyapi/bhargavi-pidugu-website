import { emailBase, h1Style, pStyle, labelStyle, valueStyle, buttonStyle } from './base'
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

  const content = `
    <h1 style="${h1Style}">Your appointment is confirmed.</h1>
    <p style="${pStyle}">
      Dear ${data.contactName}, your online consultation with Dr. Bhargavi Pidugu has been successfully booked.
    </p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Patient</span>
      <span style="${valueStyle}">${data.patientName}</span>
      <span style="${labelStyle}">Date</span>
      <span style="${valueStyle}">${formattedDate}</span>
      <span style="${labelStyle}">Time</span>
      <span style="${valueStyle}">${formattedTime}</span>
      <span style="${labelStyle}">Duration</span>
      <span style="${valueStyle}">${data.durationMinutes} minutes</span>
      <span style="${labelStyle}">Concern</span>
      <span style="${valueStyle}">${concernLabel}</span>
    </div>
    ${data.meetLink ? `
    <p style="${pStyle}">Join your consultation using the Google Meet link below:</p>
    <p style="margin:0 0 24px;">
      <a href="${data.meetLink}" style="${buttonStyle}">Join Google Meet</a>
    </p>
    <p style="margin:0 0 16px;color:#7A6E68;font-size:13px;">
      Or copy this link: <span style="color:#C4754A;">${data.meetLink}</span>
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

  const content = `
    <h1 style="${h1Style}">New appointment booked</h1>
    <p style="${pStyle}">A new online consultation has been scheduled.</p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Patient Name</span>
      <span style="${valueStyle}">${data.patientName}</span>
      <span style="${labelStyle}">Date of Birth</span>
      <span style="${valueStyle}">${data.patientDob}</span>
      <span style="${labelStyle}">Contact Email</span>
      <span style="${valueStyle}">${data.contactEmail}</span>
      <span style="${labelStyle}">Contact Phone</span>
      <span style="${valueStyle}">${data.contactPhone}</span>
      <span style="${labelStyle}">Appointment</span>
      <span style="${valueStyle}">${formattedDate} at ${formattedTime}</span>
      <span style="${labelStyle}">Concern</span>
      <span style="${valueStyle}">${concernLabel}</span>
      <span style="${labelStyle}">Description</span>
      <span style="display:block;color:#2D2420;font-size:15px;white-space:pre-wrap;">${data.concernDescription}</span>
    </div>
  `
  return emailBase(content, `New appointment: ${data.patientName} — ${formattedDate}`)
}
