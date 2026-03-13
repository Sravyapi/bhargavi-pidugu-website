import { emailBase, h1Style, pStyle, labelStyle, valueStyle } from './base'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function contactConfirmationPatient(name: string): string {
  const safeName = escapeHtml(name)
  const content = `
    <h1 style="${h1Style}">Thank you for reaching out, ${safeName}.</h1>
    <p style="${pStyle}">
      We have received your message and Dr. Bhargavi will be in touch with you shortly.
      If your query is urgent, please call or WhatsApp directly.
    </p>
    <p style="${pStyle}">
      We aim to respond within 1–2 working days.
    </p>
    <p style="margin:32px 0 0;color:#7A6E68;font-size:13px;line-height:1.6;">
      If you did not send this message, please ignore this email.
    </p>
  `
  return emailBase(content, 'We received your message — Dr. Bhargavi Pidugu')
}

export function contactNotificationAdmin(data: {
  name: string
  phone: string
  email: string
  reason: string
}): string {
  const safe = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    email: escapeHtml(data.email),
    reason: escapeHtml(data.reason),
  }
  const content = `
    <h1 style="${h1Style}">New contact message received</h1>
    <p style="${pStyle}">Someone has filled in the contact form on your website.</p>
    <div style="background:#F0EAE0;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <span style="${labelStyle}">Name</span>
      <span style="${valueStyle}">${safe.name}</span>
      <span style="${labelStyle}">Phone</span>
      <span style="${valueStyle}">${safe.phone}</span>
      <span style="${labelStyle}">Email</span>
      <span style="${valueStyle}">${safe.email}</span>
      <span style="${labelStyle}">Message</span>
      <span style="display:block;color:#2D2420;font-size:15px;white-space:pre-wrap;">${safe.reason}</span>
    </div>
  `
  return emailBase(content, 'New contact message — Dr. Bhargavi Pidugu')
}
