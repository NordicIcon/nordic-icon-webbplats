import { google } from 'googleapis';

export async function createMeetEvent({
  name, email, date, time,
}: {
  name: string; email: string; date: string; time: string;
}): Promise<string | null> {
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_REFRESH_TOKEN
  ) return null;

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const calendar = google.calendar({ version: 'v3', auth });

    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const { data } = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID ?? 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Möte med ${name} — Nordic Icon`,
        start: { dateTime: start.toISOString(), timeZone: 'Europe/Stockholm' },
        end: { dateTime: end.toISOString(), timeZone: 'Europe/Stockholm' },
        attendees: [
          { email },
          { email: 'info@nordicicon.se' },
        ],
        conferenceData: {
          createRequest: {
            requestId: `ni-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    return data.hangoutLink ?? null;
  } catch (err) {
    console.error('Google Meet error:', err);
    return null;
  }
}
