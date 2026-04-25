import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, company, phone, message, email } = body;

    // Save to back office
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    await supabase.from('calendar_bookings').insert({
      name, email, company, message,
      source: 'contact_form',
      status: 'ny',
    });

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const companyLabel = company ? ` (${company})` : '';

    // Notify Nordic Icon
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: ['info@nordicicon.se'],
      replyTo: email,
      subject: `Nytt meddelande — ${name}${companyLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #1A1A18;">
          <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 24px;">
            Nytt kontaktmeddelande
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #9A9A96; width: 120px;">Namn</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #9A9A96;">E-post</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #9A9A96;">Företag</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding: 8px 0; color: #9A9A96;">Telefon</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
          </table>
          ${message ? `
          <div style="margin-top: 24px; padding: 16px; background: #F3F2EE; border-radius: 8px;">
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>` : ''}
          <p style="margin-top: 32px; font-size: 0.85rem; color: #9A9A96;">Skickat från nordicicon.se</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: [email],
      subject: 'Tack för ditt meddelande — Nordic Icon',
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #1A1A18;">
          <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 16px;">
            Hej ${name},
          </h2>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            Tack för ditt meddelande! Vi hör av oss inom 24 timmar.
          </p>
          <p style="line-height: 1.7; margin-bottom: 32px;">
            Har du brådskande frågor? Kontakta oss direkt på
            <a href="mailto:info@nordicicon.se">info@nordicicon.se</a>.
          </p>
          <p style="color: #9A9A96; font-size: 0.85rem;">— Teamet på Nordic Icon</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('contact error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
