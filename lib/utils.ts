import { format } from 'date-fns'
import { READING } from '@/lib/constants'

export function formatDate(date: string | Date, fmt = 'dd MMM yyyy'): string {
  return format(new Date(date), fmt)
}

export function estimateReadingTime(body: string): number {
  const wordCount = body.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / READING.WORDS_PER_MINUTE))
}

