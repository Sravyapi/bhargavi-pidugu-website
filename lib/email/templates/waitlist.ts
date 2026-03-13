import { emailBase, h1Style, pStyle, buttonStyle } from './base'
import { SITE_URL } from '../resend'

export function waitlistConfirmation(name: string): string {
  const content = `
    <h1 style="${h1Style}">You're on the waitlist, ${name}.</h1>
    <p style="${pStyle}">
      Thank you for your interest in booking an online consultation with Dr. Bhargavi Pidugu.
    </p>
    <p style="${pStyle}">
      Online bookings are not yet open, but you are now on the waitlist. As soon as appointments become available,
      you will be among the first to know.
    </p>
    <p style="${pStyle}">
      In the meantime, feel free to explore the website to learn more about Dr. Bhargavi's expertise and the
      conditions she treats.
    </p>
    <p style="margin:32px 0 0;color:#7A6E68;font-size:13px;line-height:1.6;">
      If you did not sign up for this waitlist, please ignore this email.
    </p>
  `
  return emailBase(content, "You're on the waitlist — Dr. Bhargavi Pidugu")
}

export function waitlistOpenNotification(name: string): string {
  const content = `
    <h1 style="${h1Style}">Bookings are now open, ${name}!</h1>
    <p style="${pStyle}">
      Great news — online consultations with Dr. Bhargavi Pidugu are now available to book.
    </p>
    <p style="${pStyle}">
      As a waitlist member, you're hearing about this first. Slots are limited, so book now to secure your preferred time.
    </p>
    <p style="margin:0 0 32px;">
      <a href="${SITE_URL}/book" style="${buttonStyle}">Book Your Consultation</a>
    </p>
    <p style="margin:0;color:#7A6E68;font-size:13px;line-height:1.6;">
      If you no longer need an appointment, you can simply disregard this email.
    </p>
  `
  return emailBase(content, 'Bookings are now open — Dr. Bhargavi Pidugu')
}
