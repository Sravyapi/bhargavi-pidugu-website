import { emailBase, h1Style, pStyle, labelStyle, valueStyle } from './base'
import { format } from 'date-fns'

export function bookingCancellationPatient(data: {
  patientName: string
  contactName: string
  slotDatetime: string
  customMessage?: string
}): string {
  const date = new Date(data.slotDatetime)
  const formattedDate = format(date, 'EEEE, dd MMMM yyyy')
  const formattedTime = format(date, 'h:mm a') + ' IST'

  const content = `
    <h1 style="${h1Style}">Appointment cancellation notice</h1>
    <p style="${pStyle}">
      Dear ${data.contactName}, we regret to inform you that the following appointment has been cancelled.
    </p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Patient</span>
      <span style="${valueStyle}">${data.patientName}</span>
      <span style="${labelStyle}">Cancelled Appointment</span>
      <span style="${valueStyle}">${formattedDate} at ${formattedTime}</span>
    </div>
    ${data.customMessage ? `
    <p style="${pStyle}"><strong>Message from Dr. Bhargavi:</strong></p>
    <p style="${pStyle}">${data.customMessage}</p>
    ` : ''}
    <p style="${pStyle}">
      We apologise for any inconvenience. Please visit our website to book a new appointment at your convenience.
    </p>
    <p style="margin:32px 0 0;color:#7A6E68;font-size:13px;line-height:1.6;">
      If you believe this cancellation was made in error, please contact us immediately.
    </p>
  `
  return emailBase(content, `Appointment cancellation — ${formattedDate}`)
}
