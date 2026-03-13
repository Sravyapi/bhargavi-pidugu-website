import { IST_TIMEZONE } from '@/lib/constants'

const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3'

export interface BusyInterval {
  start: string
  end: string
}

export async function getFreeBusy(
  accessToken: string,
  calendarId: string,
  timeMin: string,
  timeMax: string
): Promise<BusyInterval[]> {
  const res = await fetch(`${CALENDAR_BASE}/freeBusy`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: IST_TIMEZONE,
      items: [{ id: calendarId }],
    }),
  })

  if (!res.ok) {
    console.error('FreeBusy check failed:', await res.text())
    return [] // Graceful degradation — return empty so slots are not blocked
  }

  const data = await res.json()
  return data.calendars?.[calendarId]?.busy || []
}

export function isSlotBusy(
  slotStart: string,
  slotEnd: string,
  busyIntervals: BusyInterval[]
): boolean {
  const start = new Date(slotStart).getTime()
  const end = new Date(slotEnd).getTime()

  return busyIntervals.some((interval) => {
    const busyStart = new Date(interval.start).getTime()
    const busyEnd = new Date(interval.end).getTime()
    return start < busyEnd && end > busyStart
  })
}
