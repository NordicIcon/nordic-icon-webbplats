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
    monthly: '590',
    tagline: 'Professionell närvaro online.',
    features: [
      '4 sidor (startsida + 3 undersidor)',
      'Mobilanpassad',
      'SEO-grund (meta, OG, sitemap)',
      'Kontaktformulär',
      'Google Analytics',
      'Cookie-banner (GDPR)',
      'Bokningssystem (Google Calendar)',
      'Leverans på 10 dagar',
    ],
    cta: 'Kom igång',
    popular: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '15 900',
    monthly: '990',
    tagline: 'Animerad. Imponerande. Konverterande.',
    features: [
      'Allt i BAS, plus:',
      'Framer Motion-animationer',
      'GSAP ScrollTrigger-animationer',
      'Google Calendar bokningssystem',
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
    monthly: '1 490',
    tagline: 'Ingen mall. Inget kompromiss.',
    features: [
      'Allt i PRO, plus:',
      '3D-effekter & parallax',
      'Custom animations & micro-interactions',
      'Upp till 15 sidor',
      '5 revideringsrundor',
      'Leverans på 21 dagar',
      'Dedikerad onboarding',
      'Prioriterad support',
    ],
    cta: 'Begär offert',
    popular: false,
  },
];

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

interface BookingForm {
  name: string;
  company: string;
  email: string;
  message: string;
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
  const [tab, setTab] = useState<'calendar' | 'message'>('calendar');
  const [form, setForm] = useState<BookingForm>({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan: planName }),
      });
    } catch {
      // stub — show success regardless
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Stäng">×</button>

        <p className={styles.modalPlan}>{planName} — {planPrice} kr</p>
        <h3 className={styles.modalHeading}>
          Kom igång <em>idag</em>
        </h3>

        {/* Tabs */}
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

        {/* Tab: Calendar */}
        {tab === 'calendar' && (
          <BookingCalendar hideHeader />
        )}

        {/* Tab: Contact form */}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Skickar...' : 'Skicka förfrågan →'}
              </button>
            </form>
          )
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
