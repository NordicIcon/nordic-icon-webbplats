export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
}

export interface BookingResponse {
  success: boolean;
  eventId?: string;
  message?: string;
}

/* Stub — replace with real Google Calendar API calls
   when GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
   and RESEND_API_KEY are available in .env.local */

export async function getAvailableTimes(date: string): Promise<TimeSlot[]> {
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) return [];

  return [
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
  ];
}

export async function createBooking(request: BookingRequest): Promise<BookingResponse> {
  console.log('Booking request (stub):', request);
  return { success: true, message: 'Bokningsbekräftelse skickad.' };
}
