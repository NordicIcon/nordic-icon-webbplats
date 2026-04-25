import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { createMeetEvent } from '@/lib/googleMeet';

function saveToBackOffice(data: Record<string, unknown>) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  supabase.from('calendar_bookings').insert(data).then(() => {});
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { date, time, name, email, company, plan } = body;

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create Google Meet event
    let meetLink: string | null = null;
    if (date && time) {
      meetLink = await createMeetEvent({ name, email, date, time });
    }

    // Save to back office — auto-confirmed
    saveToBackOffice({
      name, email, company,
      meeting_date: date || null,
      meeting_time: time || null,
      plan: plan || null,
      source: date ? 'booking_calendar' : 'plans_modal',
      status: 'bekraftad',
    });

    const dateLabel = date && time ? `${date} kl. ${time}` : 'Att bestämmas';
    const companyLabel = company ? ` (${company})` : '';
    const planLabel = plan ? ` — Plan: ${plan}` : '';

    const meetHtml = meetLink
      ? `<div style="margin:20px 0;padding:16px 20px;background:#EEF2FF;border-radius:10px;border-left:3px solid #1B3A6B;">
           <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#1B3A6B;letter-spacing:0.05em;text-transform:uppercase;">Google Meet-länk</p>
           <a href="${meetLink}" style="color:#1B3A6B;font-size:15px;word-break:break-all;">${meetLink}</a>
         </div>`
      : '';

    // Notify Nordic Icon
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: ['info@nordicicon.se'],
      replyTo: email,
      subject: `Nytt möte bokat — ${name}${companyLabel}${planLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#1A1A18;">
          <h2 style="font-size:1.4rem;font-weight:400;margin-bottom:24px;">Nytt möte bokat</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#9A9A96;width:120px;">Namn</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#9A9A96;">E-post</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#9A9A96;">Företag</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
            ${plan ? `<tr><td style="padding:8px 0;color:#9A9A96;">Plan</td><td style="padding:8px 0;">${plan}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#9A9A96;">Tid</td><td style="padding:8px 0;font-weight:500;">${dateLabel}</td></tr>
          </table>
          ${meetHtml}
          ${!meetLink && date ? `<p style="font-size:13px;color:#F59E0B;margin-top:16px;">⚠ Google Meet-länk kunde inte skapas automatiskt. Skapa manuellt och skicka till kunden.</p>` : ''}
          <p style="margin-top:32px;font-size:0.85rem;color:#9A9A96;">Skickat från nordicicon.se</p>
        </div>
      `,
    });

    // Direct confirmation to customer
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: [email],
      subject: `Möte bekräftat — ${dateLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#1A1A18;">
          <h2 style="font-size:1.4rem;font-weight:400;margin-bottom:16px;">Hej ${name},</h2>
          <p style="line-height:1.7;margin-bottom:20px;">
            Ditt möte med Nordic Icon är bekräftat. Vi ser fram emot att ses!
          </p>
          <div style="padding:20px;background:#F3F2EE;border-radius:12px;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:12px;color:#9A9A96;text-transform:uppercase;letter-spacing:0.08em;">Tid</p>
            <p style="margin:0;font-size:18px;font-weight:500;">${dateLabel}</p>
          </div>
          ${meetHtml}
          ${meetLink ? `<p style="line-height:1.7;margin-bottom:20px;font-size:14px;color:#5A5A56;">Klicka på länken ovan strax innan mötet för att ansluta till Google Meet.</p>` : ''}
          <p style="line-height:1.7;margin-bottom:32px;">
            Frågor? Svara på detta mail eller kontakta oss på
            <a href="mailto:info@nordicicon.se" style="color:#1B3A6B;">info@nordicicon.se</a>.
          </p>
          <p style="color:#9A9A96;font-size:0.85rem;">— Teamet på Nordic Icon</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('book-meeting error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
