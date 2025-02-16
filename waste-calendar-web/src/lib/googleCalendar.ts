import { CollectionEvent } from '@/types'

export async function createCalendarEvent(
  event: CollectionEvent,
  accessToken: string
): Promise<Response> {
  const startDateTime = new Date(event.date)
  startDateTime.setHours(7, 0, 0, 0)

  const endDateTime = new Date(startDateTime)
  endDateTime.setHours(8, 0, 0, 0)

  const calendarEvent = {
    summary: `${event.type.charAt(0) + event.type.slice(1).toLowerCase()} Collection`,
    description: `Scheduled ${event.type.toLowerCase()} collection`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    recurrence: [`RRULE:FREQ=${event.recurrence}`],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 }
      ]
    }
  }

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(calendarEvent)
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to create calendar event: ${await response.text()}`)
  }

  return response
}
