import { addMinutes, setHours, setMinutes, setSeconds, setMilliseconds, isBefore, isAfter } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import type { AvailabilitySchedule, TimeSlot } from './types'
import { IST_TIMEZONE as IST } from './constants'

function parseTimeToDate(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number)
  let d = setHours(date, hours)
  d = setMinutes(d, minutes)
  d = setSeconds(d, 0)
  d = setMilliseconds(d, 0)
  return d
}

export function generateSlots(
  dateStr: string,
  schedule: AvailabilitySchedule,
  durationMinutes: number,
  bufferMinutes: number
): TimeSlot[] {
  if (!schedule.is_active || !schedule.start_time || !schedule.end_time) return []

  const dateInIST = toZonedTime(new Date(`${dateStr}T00:00:00`), IST)
  const startTime = parseTimeToDate(dateInIST, schedule.start_time)
  const endTime = parseTimeToDate(dateInIST, schedule.end_time)
  const lunchStart = schedule.lunch_start ? parseTimeToDate(dateInIST, schedule.lunch_start) : null
  const lunchEnd = schedule.lunch_end ? parseTimeToDate(dateInIST, schedule.lunch_end) : null

  const slots: TimeSlot[] = []
  let current = startTime

  while (isBefore(addMinutes(current, durationMinutes), endTime) ||
         current.getTime() + durationMinutes * 60000 <= endTime.getTime()) {
    const slotEnd = addMinutes(current, durationMinutes)

    // Skip if in lunch break
    let inLunch = false
    if (lunchStart && lunchEnd) {
      if (
        (isAfter(current, lunchStart) || current.getTime() === lunchStart.getTime()) &&
        isBefore(current, lunchEnd)
      ) {
        inLunch = true
      }
      if (isBefore(current, lunchStart) && isAfter(slotEnd, lunchStart)) {
        inLunch = true
      }
    }

    if (!inLunch) {
      slots.push({
        start: fromZonedTime(current, IST).toISOString(),
        end: fromZonedTime(slotEnd, IST).toISOString(),
        available: true,
      })
    }

    current = addMinutes(current, durationMinutes + bufferMinutes)
  }

  return slots
}
