import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, name, email, company } = body;

    if (!date || !time || !name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    /* Stub — replace with:
       1. Google Calendar API: create event in Rasmus's calendar
       2. Resend: send confirmation email to name+email and to hej@nordicicon.se */
    console.log('Booking request:', { date, time, name, email, company });

    return Response.json({
      success: true,
      message: `Mötet ${date} kl ${time} är bokat. Bekräftelse skickad till ${email}.`,
    });
  } catch {
    return Response.json({ error: 'Booking failed' }, { status: 500 });
  }
}
