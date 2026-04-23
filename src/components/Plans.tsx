'use client';

import Link from 'next/link';
import { useMagneticButton } from '@/hooks/useMagneticButton';
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
    ctaHref: '/kontakt',
    popular: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '17 900',
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
      'Prioriterad support',
    ],
    cta: 'Välj PRO',
    ctaHref: '/kontakt',
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
    ctaHref: '/kontakt',
    popular: false,
  },
];

function PlanCard({ plan }: { plan: typeof plans[0] }) {
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

      <a
        ref={ctaRef as React.RefObject<HTMLAnchorElement>}
        href={plan.ctaHref}
        className={`${styles.cta} ${plan.popular ? styles.ctaPrimary : styles.ctaSecondary}`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function Plans() {
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
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/planer" className={styles.allPlans}>
            Se fullständig jämförelse →
          </Link>
        </div>
      </div>
    </section>
  );
}
