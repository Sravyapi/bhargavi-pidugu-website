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

/** Token refresh buffer — refresh if token expires within this window */
export const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000

/** Indian Standard Time timezone identifier */
export const IST_TIMEZONE = 'Asia/Kolkata'
