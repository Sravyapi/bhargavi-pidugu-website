import { IST_TIMEZONE } from '@/lib/constants'

const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3'

export async function createCalendarEvent(
  accessToken: string,
  calendarId: string,
  eventData: {
    summary: string
    description: string
    startDateTime: string
    endDateTime: string
    attendeeEmail: string
    attendeeName: string
    requestId: string
  }
) {
  const res = await fetch(
    `${CALENDAR_BASE}/calendars/${calendarId}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: eventData.summary,
        description: eventData.description,
        start: { dateTime: eventData.startDateTime, timeZone: IST_TIMEZONE },
        end: { dateTime: eventData.endDateTime, timeZone: IST_TIMEZONE },
        attendees: [{ email: eventData.attendeeEmail, displayName: eventData.attendeeName }],
        conferenceData: {
          createRequest: {
            requestId: eventData.requestId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      }),
    }
  )

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Calendar event creation failed: ${error}`)
  }

  const event = await res.json()
  return {
    eventId: event.id as string,
    meetLink: (event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri || '') as string,
  }
}

export async function deleteCalendarEvent(
  accessToken: string,
  calendarId: string,
  eventId: string
) {
  const res = await fetch(
    `${CALENDAR_BASE}/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )
  if (!res.ok && res.status !== 410) {
    throw new Error(`Calendar event deletion failed: ${res.status}`)
  }
}
