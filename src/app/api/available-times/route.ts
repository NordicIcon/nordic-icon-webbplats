import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return Response.json({ error: 'date parameter required' }, { status: 400 });
  }

  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) {
    return Response.json({ times: [] });
  }

  /* Stub — replace with real Google Calendar API call */
  return Response.json({
    times: ['10:00', '11:00', '13:00', '14:00', '15:00'],
    date,
  });
}
