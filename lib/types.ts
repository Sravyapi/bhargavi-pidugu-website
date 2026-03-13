// ============================================================
// SITE CONTENT
// ============================================================
export interface SiteContent {
  hero_image_url: string
  about_bio: string
  consultation_fee: string
  show_fee: boolean
  bookings_enabled: boolean
  tagline_line1: string
  tagline_line2: string
  appointment_duration_minutes: number
  advance_booking_days: number
  buffer_minutes: number
}

// ============================================================
// FAQ
// ============================================================
export interface FaqItem {
  id: string
  question: string
  answer: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateFaqItemInput {
  question: string
  answer: string
  order_index?: number
}

export interface UpdateFaqItemInput {
  question?: string
  answer?: string
  order_index?: number
  is_active?: boolean
}

// ============================================================
// GALLERY
// ============================================================
export interface GalleryImage {
  id: string
  url: string
  storage_path: string
  has_consent_tag: boolean
  order_index: number
  uploaded_at: string
}

// ============================================================
// BLOG
// ============================================================
export type BlogCategory =
  | 'paediatric-eye-health'
  | 'for-parents'
  | 'strabismus'
  | 'neuro-ophthalmology'
  | 'general-eye-care'

export type BlogStatus = 'draft' | 'published'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  cover_image_url: string | null
  category: BlogCategory | null
  status: BlogStatus
  meta_title: string | null
  meta_description: string | null
  reading_time_minutes: number | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateBlogPostInput {
  title: string
  slug: string
  excerpt?: string
  body?: string
  cover_image_url?: string
  category?: BlogCategory
  status?: BlogStatus
  meta_title?: string
  meta_description?: string
  published_at?: string
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {}

// ============================================================
// AVAILABILITY
// ============================================================
export interface AvailabilitySchedule {
  id: string
  day_of_week: number // 0=Sunday, 1=Monday, ..., 6=Saturday
  is_active: boolean
  start_time: string | null // 'HH:MM'
  end_time: string | null
  lunch_start: string | null
  lunch_end: string | null
}

export interface BlockedDate {
  id: string
  date: string // 'YYYY-MM-DD'
  reason: string | null
  created_at: string
}

export interface TimeSlot {
  start: string // ISO string
  end: string   // ISO string
  available: boolean
}

// ============================================================
// APPOINTMENTS
// ============================================================
export type ConcernType =
  | 'squint-strabismus'
  | 'lazy-eye-amblyopia'
  | 'refractive-error-child'
  | 'paediatric-cataract'
  | 'neuro-ophthalmology'
  | 'general-eye-examination'
  | 'follow-up'
  | 'other'

export type RelationToPatient = 'self' | 'parent-guardian' | 'spouse' | 'sibling' | 'other'

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'no_show' | 'cancelled'

export interface ReportFile {
  name: string
  url: string
  storage_path: string
}

export interface Appointment {
  id: string
  patient_name: string
  patient_dob: string // 'YYYY-MM-DD'
  relation_to_patient: RelationToPatient
  contact_email: string
  contact_phone: string
  whatsapp_preferred: boolean
  concern_type: ConcernType
  concern_description: string
  previous_diagnosis: string | null
  current_prescription: string | null
  previous_surgeries: boolean | null
  surgery_details: string | null
  report_urls: ReportFile[]
  slot_datetime: string // ISO string
  duration_minutes: number
  appointment_type: 'online_video'
  google_calendar_event_id: string | null
  google_meet_link: string | null
  status: AppointmentStatus
  admin_notes: string | null
  confirmation_email_sent: boolean
  cancellation_email_sent: boolean
  created_at: string
  updated_at: string
}

export interface CreateAppointmentInput {
  patient_name: string
  patient_dob: string
  relation_to_patient: RelationToPatient
  contact_email: string
  contact_phone: string
  whatsapp_preferred?: boolean
  concern_type: ConcernType
  concern_description: string
  previous_diagnosis?: string
  current_prescription?: string
  previous_surgeries?: boolean
  surgery_details?: string
  slot_datetime: string
  appointment_type?: 'online_video'
}

export interface UpdateAppointmentInput {
  status?: AppointmentStatus
  admin_notes?: string
  google_calendar_event_id?: string
  google_meet_link?: string
}

// ============================================================
// CONTACT MESSAGES
// ============================================================
export interface ContactMessage {
  id: string
  name: string
  phone: string
  email: string
  reason: string
  is_read: boolean
  created_at: string
}

export interface CreateContactMessageInput {
  name: string
  phone: string
  email: string
  reason: string
}

// ============================================================
// WAITLIST
// ============================================================
export interface WaitlistEntry {
  id: string
  name: string
  email: string
  notified_at: string | null
  created_at: string
}

// ============================================================
// GOOGLE TOKENS
// ============================================================
export interface GoogleTokens {
  id: string
  access_token: string
  refresh_token: string
  expiry: string
  calendar_id: string
  updated_at: string
}

// ============================================================
// API RESPONSE WRAPPERS
// ============================================================
export interface ApiSuccess<T = undefined> {
  success: true
  data?: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = undefined> = ApiSuccess<T> | ApiError

// ============================================================
// ADMIN DASHBOARD
// ============================================================
export interface DashboardStats {
  todayAppointmentsCount: number
  todayAppointments: Appointment[]
  thisWeekCount: number
  newBookingsSinceLastLogin: number
  waitlistCount: number
}
