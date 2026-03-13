export const FILE_UPLOAD = {
  REPORTS_MAX_SIZE_BYTES: 10 * 1024 * 1024,   // 10 MB
  GALLERY_MAX_SIZE_BYTES: 5 * 1024 * 1024,    // 5 MB
  GALLERY_MAX_COUNT: 10,
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
} as const

export const READING = {
  WORDS_PER_MINUTE: 200,
} as const

export const APPOINTMENT_DEFAULTS = {
  DURATION_MINUTES: 30,
  BUFFER_MINUTES: 10,
} as const

/** Max size for uploaded patient report files (10 MB) */
export const MAX_REPORT_FILE_SIZE_BYTES = 10 * 1024 * 1024

/** Max size for hero/gallery image uploads (5 MB) */
export const MAX_IMAGE_FILE_SIZE_BYTES = 5 * 1024 * 1024

/** Default appointment duration if not set in site_content */
export const DEFAULT_DURATION_MINUTES = 30

/** Default buffer between appointments if not set in site_content */
export const DEFAULT_BUFFER_MINUTES = 10

/** Token refresh buffer — refresh if token expires within this window */
export const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000

/** Indian Standard Time timezone identifier */
export const IST_TIMEZONE = 'Asia/Kolkata'
