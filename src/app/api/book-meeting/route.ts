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

    // Save to back office (non-blocking)
    saveToBackOffice({
      name, email, company,
      meeting_date: date || null,
      meeting_time: time || null,
      plan: plan || null,
      source: date ? 'booking_calendar' : 'plans_modal',
      status: 'ny',
    });

    // Create Google Meet event if date+time is provided
    let meetLink: string | null = null;
    if (date && time) {
      meetLink = await createMeetEvent({ name, email, date, time });
    }

    const dateLabel = date && time ? `${date} kl. ${time}` : 'Att bestämmas';
    const companyLabel = company ? ` (${company})` : '';
    const planLabel = plan ? ` — Plan: ${plan}` : '';
    const meetHtml = meetLink
      ? `<div style="margin:16px 0;padding:16px;background:#f0f4ff;border-radius:8px;">
           <p style="margin:0 0 8px;font-size:14px;font-weight:600;">Google Meet-länk</p>
           <a href="${meetLink}" style="color:#1B3A6B;font-size:14px;">${meetLink}</a>
         </div>`
      : '';

    // Notify Nordic Icon
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: ['info@nordicicon.se'],
      replyTo: email,
      subject: `Ny mötesbegäran — ${name}${companyLabel}${planLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #1A1A18;">
          <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 24px;">Ny mötesbegäran</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #9A9A96; width: 120px;">Namn</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #9A9A96;">E-post</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #9A9A96;">Företag</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            ${plan ? `<tr><td style="padding: 8px 0; color: #9A9A96;">Plan</td><td style="padding: 8px 0;">${plan}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #9A9A96;">Tid</td><td style="padding: 8px 0;">${dateLabel}</td></tr>
          </table>
          ${meetHtml}
          <p style="margin-top: 32px; font-size: 0.85rem; color: #9A9A96;">Skickat från nordicicon.se</p>
        </div>
      `,
    });

    // Confirmation to customer
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: [email],
      subject: 'Vi har tagit emot din förfrågan — Nordic Icon',
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #1A1A18;">
          <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 16px;">Hej ${name},</h2>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            Vi har tagit emot din förfrågan och hör av oss inom 24 timmar för att bekräfta ett möte.
          </p>
          ${date && time ? `<p style="line-height: 1.7; margin-bottom: 16px;">Du angav <strong>${dateLabel}</strong> som önskad tid.</p>` : ''}
          ${meetHtml}
          <p style="line-height: 1.7; margin-bottom: 32px;">
            Har du frågor i mellantiden? Kontakta oss på
            <a href="mailto:info@nordicicon.se">info@nordicicon.se</a>.
          </p>
          <p style="color: #9A9A96; font-size: 0.85rem;">— Teamet på Nordic Icon</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('book-meeting error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
