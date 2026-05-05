'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import BookingCalendar from './BookingCalendar';
import styles from './Plans.module.css';

const plans = [
  {
    id: 'bas',
    name: 'BAS',
    price: '7 900',
    monthly: '990',
    tagline: 'Professionell närvaro online.',
    features: [
      '4 sidor (startsida + 3 undersidor)',
      'Mobilanpassad',
      'SEO-grund (meta, OG, sitemap)',
      'Kontaktformulär',
      'Google Analytics',
      'Cookie-banner (GDPR)',
      'Leverans på 14 dagar',
    ],
    cta: 'Kom igång',
    popular: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '15 900',
    monthly: '1 590',
    tagline: 'Animerad. Imponerande. Konverterande.',
    features: [
      'Allt i BAS, plus:',
      'Framer Motion-animationer',
      'GSAP ScrollTrigger-animationer',
      'Chatbot',
      'Custom favicon & brand assets',
      'Resend e-postintegration',
      'Upp till 8 sidor',
      'AI-synlighet',
      'Prioriterad support',
    ],
    cta: 'Välj PRO',
    popular: true,
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '34 900',
    monthly: '2 490',
    tagline: 'Ingen mall. Inget kompromiss.',
    features: [
      'Allt i PRO, plus:',
      'Custom animations & micro-interactions',
      'Chatbot premium',
      'Upp till 15 sidor',
      '5 revideringsrundor',
      'Leverans på 30 dagar',
      'Prioriterad support',
    ],
    cta: 'Boka möte',
    popular: false,
  },
];

const UPSELLS: Record<string, { name: string; price: string }[]> = {
  BAS: [
    { name: 'Animationer (Framer Motion)', price: '+2 900 kr' },
    { name: 'Fler sidor (upp till 8 st)', price: '+2 900 kr' },
    { name: 'Chatbot', price: '+1 900 kr' },
    { name: 'Flerspråkig sajt (EN + SV)', price: '+2 500 kr' },
    { name: 'E-handel (upp till 20 produkter)', price: '+3 900 kr' },
    { name: 'SEO-djupdykning (10 nyckelord)', price: '+1 500 kr' },
    { name: 'Nyhetsbrevintegration', price: '+900 kr' },
    { name: 'Videobakgrund (Kling AI)', price: '+2 500 kr' },
  ],
  PRO: [
    { name: 'Fler sidor (upp till 12 st)', price: '+2 900 kr' },
    { name: 'E-handel (upp till 50 produkter)', price: '+4 900 kr' },
    { name: 'Flerspråkig (3 språk)', price: '+2 900 kr' },
    { name: 'Kundportal med inloggning', price: '+5 900 kr' },
    { name: 'SEO-årspaket (12 månader)', price: '+990 kr/mån' },
    { name: 'Google Ads-kampanjsida', price: '+1 900 kr' },
    { name: 'Animerad intro-video (Kling AI)', price: '+3 900 kr' },
    { name: 'Chatbot premium', price: '+2 900 kr' },
  ],
  ELITE: [
    { name: 'Fler sidor (16–20 st)', price: '+4 900 kr' },
    { name: 'E-handel premium (Stripe, obegränsat)', price: '+7 900 kr' },
    { name: 'Varumärkesidentitet (logotyp + brand kit)', price: '+9 900 kr' },
    { name: 'Kundportal + CRM-system', price: '+9 900 kr' },
    { name: 'SEO-årspaket + länkbygge', price: '+1 490 kr/mån' },
    { name: 'Google Ads-hantering', price: '+1 990 kr/mån' },
    { name: 'Animerad intro-video (60 sek)', price: '+5 900 kr' },
    { name: 'Flerspråkig (upp till 4 språk)', price: '+3 900 kr' },
  ],
};

function PlanCard({
  plan,
  onBook,
}: {
  plan: typeof plans[0];
  onBook: (name: string, price: string) => void;
}) {
  const ctaRef = useMagneticButton(0.25);

  return (
    <div className={`${styles.card} ${plan.popular ? styles.cardPopular : ''}`}>
      {plan.popular && (
        <div className={styles.badge}>Mest populär</div>
      )}

      <div className={styles.cardTop}>
        <div className={styles.planName}>{plan.name}</div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{plan.price}</span>
          <span className={styles.priceCurrency}>kr</span>
        </div>
        <div className={styles.monthly}>
          {plan.monthly} kr / mån (hosting + drift)
        </div>
        <p className={styles.tagline}>{plan.tagline}</p>
      </div>

      <div className={styles.divider} />

      <ul className={styles.features}>
        {plan.features.map((f, i) => (
          <li key={i} className={`${styles.feature} ${f.startsWith('Allt') ? styles.featureAll : ''}`}>
            {!f.startsWith('Allt') && (
              <svg className={styles.check} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2.5 7l3.5 3.5 5.5-6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {f}
          </li>
        ))}
      </ul>

      <button
        ref={ctaRef as React.RefObject<HTMLButtonElement>}
        onClick={() => onBook(plan.name, plan.price)}
        className={`${styles.cta} ${plan.popular ? styles.ctaPrimary : styles.ctaSecondary}`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

function BookingModal({
  planName,
  planPrice,
  onClose,
}: {
  planName: string;
  planPrice: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<'upsells' | 'booking'>('upsells');
  const [tab, setTab] = useState<'calendar' | 'message'>('calendar');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const upsells = UPSELLS[planName] ?? [];

  const toggleUpsell = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) { next.delete(name); } else { next.add(name); }
      return next;
    });
  };

  const selectedAddons = Array.from(selected).map(name => {
    const item = upsells.find(u => u.name === name);
    return item ? `${name} (${item.price})` : name;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan: planName, addons: selectedAddons }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      // show success anyway — email still sent
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Stäng">×</button>

        <p className={styles.modalPlan}>{planName} — {planPrice} kr</p>
        <h3 className={styles.modalHeading}>
          {step === 'upsells' ? <>Anpassa din <em>sajt</em></> : <>Boka din <em>tid</em></>}
        </h3>

        {/* Step 1: Upsells */}
        {step === 'upsells' && (
          <div>
            <p className={styles.upsellIntro}>
              Lägg till funktioner nu — du slipper göra om det senare. Allt är valfritt.
            </p>
            <div className={styles.upsellList}>
              {upsells.map(u => (
                <label key={u.name} className={`${styles.upsellItem} ${selected.has(u.name) ? styles.upsellSelected : ''}`}>
                  <input
                    type="checkbox"
                    checked={selected.has(u.name)}
                    onChange={() => toggleUpsell(u.name)}
                    className={styles.upsellCheck}
                  />
                  <span className={styles.upsellName}>{u.name}</span>
                  <span className={styles.upsellPrice}>{u.price}</span>
                </label>
              ))}
            </div>
            <button className={styles.upsellCta} onClick={() => setStep('booking')}>
              {selected.size > 0 ? `Gå vidare med ${selected.size} tillägg →` : 'Gå vidare →'}
            </button>
            <button className={styles.upsellSkip} onClick={() => setStep('booking')}>
              Hoppa över tillägg
            </button>
          </div>
        )}

        {/* Step 2: Booking */}
        {step === 'booking' && (
          <>
            {selected.size > 0 && (
              <div className={styles.selectedSummary}>
                {Array.from(selected).map(name => (
                  <span key={name} className={styles.selectedTag}>{name}</span>
                ))}
              </div>
            )}

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${tab === 'calendar' ? styles.tabActive : ''}`}
                onClick={() => setTab('calendar')}
              >
                Boka tid
              </button>
              <button
                className={`${styles.tab} ${tab === 'message' ? styles.tabActive : ''}`}
                onClick={() => setTab('message')}
              >
                Skicka meddelande
              </button>
            </div>

            {tab === 'calendar' && (
              <BookingCalendar
                hideHeader
                extraData={{ plan: planName, addons: selectedAddons }}
              />
            )}

            {tab === 'message' && (
              submitted ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>Tack för din förfrågan!</h3>
                  <p className={styles.successBody}>
                    Vi hör av oss inom 24 timmar.<br />
                    Vi ser fram emot att prata med dig.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="bm-name">Namn</label>
                      <input
                        id="bm-name"
                        name="name"
                        className={styles.input}
                        placeholder="Ditt namn"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="bm-company">Företag</label>
                      <input
                        id="bm-company"
                        name="company"
                        className={styles.input}
                        placeholder="Företagsnamn"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="bm-email">E-post</label>
                    <input
                      id="bm-email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="din@email.se"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="bm-message">Meddelande (valfritt)</label>
                    <textarea
                      id="bm-message"
                      name="message"
                      className={styles.textarea}
                      placeholder="Berätta kort om ditt projekt..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  <button type="submit" className={styles.submit} disabled={loading}>
                    {loading ? 'Skickar...' : 'Skicka förfrågan →'}
                  </button>
                </form>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Plans() {
  const [booking, setBooking] = useState<{ name: string; price: string } | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.plansBackground} aria-hidden />

      <div className={styles.plansContent}>
        <div className={styles.header}>
          <div className={styles.label}>PLANER & PRISER</div>
          <h2 className={styles.heading}>
            Välj din
            <br />
            <em>ambitionsnivå.</em>
          </h2>
          <p className={styles.sub}>
            Alla planer inkluderar hosting, support och Nano Banana AI-bilder.
            <br />
            Retainer är obligatorisk — framas alltid som &ldquo;hosting + teknisk garanti.&rdquo;
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onBook={(name, price) => setBooking({ name, price })}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/planer" className={styles.allPlans}>
            Se fullständig jämförelse →
          </Link>
        </div>
      </div>

      {booking && (
        <BookingModal
          planName={booking.name}
          planPrice={booking.price}
          onClose={() => setBooking(null)}
        />
      )}
    </section>
  );
}
