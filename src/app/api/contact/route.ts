import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

function saveToBackOffice(data: Record<string, unknown>) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  supabase.from('calendar_bookings').insert(data).then(() => {});
}

const BASE = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
    <div style="background:#0D1B2A;padding:28px 32px;border-radius:12px 12px 0 0;">
      <span style="font-size:13px;font-weight:700;letter-spacing:0.12em;color:#7aa7e8;text-transform:uppercase;">NORDIC ICON</span>
    </div>
`;
const BASE_END = `
    <div style="padding:20px 32px 28px;background:#F3F2EE;border-radius:0 0 12px 12px;">
      <p style="margin:0;font-size:12px;color:#9A9A96;">
        Nordic Icon AB &nbsp;·&nbsp; <a href="https://nordicicon.se" style="color:#9A9A96;">nordicicon.se</a>
      </p>
    </div>
  </div>
`;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, company, phone, message, email } = body;

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to back office (non-blocking)
    saveToBackOffice({
      name, email, company, phone: phone || null, message,
      source: 'contact_form',
      status: 'ny',
    });

    const companyLabel = company ? ` (${company})` : '';

    // Notify Nordic Icon
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: ['info@nordicicon.se'],
      replyTo: email,
      subject: `Nytt meddelande — ${name}${companyLabel}`,
      html: `${BASE}
        <div style="padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#9A9A96;text-transform:uppercase;">Nytt kontaktmeddelande</p>
          <h1 style="margin:0 0 24px;font-size:22px;font-weight:500;color:#1A1A18;">${name}${companyLabel}</h1>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:12px;color:#9A9A96;width:110px;vertical-align:top;">E-POST</td>
              <td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:14px;color:#1A1A18;"><a href="mailto:${email}" style="color:#1B3A6B;">${email}</a></td>
            </tr>
            ${company ? `<tr><td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:12px;color:#9A9A96;vertical-align:top;">FÖRETAG</td><td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:14px;color:#1A1A18;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:12px;color:#9A9A96;vertical-align:top;">TELEFON</td><td style="padding:10px 0;border-top:1px solid #E5E5E0;font-size:14px;color:#1A1A18;">${phone}</td></tr>` : ''}
          </table>

          ${message ? `
          <div style="background:#F3F2EE;border-radius:10px;padding:18px 20px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#9A9A96;text-transform:uppercase;">Meddelande</p>
            <p style="margin:0;font-size:14px;line-height:1.75;color:#1A1A18;white-space:pre-wrap;">${message}</p>
          </div>` : ''}
        </div>
      ${BASE_END}`,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: 'Nordic Icon <noreply@nordicicon.se>',
      to: [email],
      subject: 'Tack för ditt meddelande — Nordic Icon',
      html: `${BASE}
        <div style="padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#9A9A96;text-transform:uppercase;">Bekräftelse</p>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:500;color:#1A1A18;">Hej ${name}!</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5A5A56;">Tack för ditt meddelande — vi hör av oss inom 24 timmar.</p>

          <div style="background:#F3F2EE;border-radius:12px;padding:22px 24px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#9A9A96;text-transform:uppercase;">Ditt meddelande</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#5A5A56;white-space:pre-wrap;">${message || '(inget meddelande)'}</p>
          </div>

          <p style="font-size:14px;color:#5A5A56;line-height:1.7;margin:0 0 8px;">Har du brådskande frågor? Skriv till oss direkt på <a href="mailto:info@nordicicon.se" style="color:#1B3A6B;font-weight:500;">info@nordicicon.se</a>.</p>
          <p style="font-size:14px;color:#9A9A96;margin:0;">— Max &amp; Rasmus, Nordic Icon</p>
        </div>
      ${BASE_END}`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('contact error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
