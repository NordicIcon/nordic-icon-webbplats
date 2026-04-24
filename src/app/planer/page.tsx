import type { Metadata } from 'next';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'Planer & Priser | Nordic Icon',
  description: 'BAS från 7 900 kr. PRO från 17 900 kr. ELITE från 34 900 kr. Klart på 10 dagar.',
};

const plans = [
  {
    id: 'bas',
    name: 'BAS',
    price: '7 900',
    monthly: '590',
    tagline: 'Professionell närvaro online.',
    desc: 'Perfekt för lokala bolag och soloföretagare som behöver en trovärdig webbplats snabbt.',
    features: [
      '4 sidor (startsida + 3 undersidor)',
      'Mobilanpassad',
      'SEO-grund (meta, OG, sitemap)',
      'Kontaktformulär',
      'Google Analytics',
      'Cookie-banner (GDPR)',
      'Bokningssystem (Google Calendar)',
      'Leverans på 10 dagar',
      '3 revideringsrundor',
      'Hosting-guide ingår',
    ],
    notIncluded: [
      'Animationer',
      'Extra sidor',
      'Videoproduktion',
    ],
    featured: false,
    cta: 'Kom igång med BAS',
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '17 900',
    monthly: '990',
    tagline: 'Animerad. Imponerande. Konverterande.',
    desc: 'För bolag som vill sticka ut. Google Calendar och premium-design.',
    features: [
      'Allt i BAS, plus:',
      'Framer Motion-animationer',
      'GSAP ScrollTrigger-animationer',
      'Google Calendar bokningssystem',
      'Custom favicon & brand assets',
      'Resend e-postintegration',
      'Cookie-banner (GDPR)',
      'Upp till 8 sidor',
      '3 revideringsrundor',
      'Leverans på 14 dagar',
      'Prioriterad support',
    ],
    notIncluded: [
      '3D-effekter & parallax',
      'Headless CMS',
    ],
    featured: true,
    cta: 'Välj PRO',
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '34 900',
    monthly: '1 490',
    tagline: 'Ingen mall. Inget kompromiss.',
    desc: 'Fullständigt skräddarsytt — GSAP, 3D-animationer, CMS. Vi bygger precis vad du behöver.',
    features: [
      'Allt i PRO, plus:',
      'GSAP ScrollTrigger-animationer',
      '3D-effekter & parallax',
      'Custom animations & micro-interactions',
      'Upp till 15 sidor',
      '5 revideringsrundor',
      'Leverans på 21 dagar',
      'Dedikerad onboarding',
    ],
    notIncluded: [],
    featured: false,
    cta: 'Begär offert',
  },
];

const addons = [
  { name: 'Extra sida', price: '2 900 kr/st', desc: 'Ytterligare undersida med samma design.' },
  { name: 'CMS-integration', price: '4 900 kr', desc: 'Redigera innehåll utan kod (Sanity).' },
  { name: 'Automation-retainer', price: 'Från 2 900 kr/mån', desc: 'Automatisera repetitiva uppgifter i ditt bolag.' },
];

const faqs = [
  {
    q: 'Hur lång tid tar det?',
    a: 'BAS levereras på 10 arbetsdagar, PRO på 14 arbetsdagar och ELITE på 21 arbetsdagar — räknat från signerat avtal och levererat material (texter, logotyp) inom 2 dagar från start.',
  },
  {
    q: 'Vad händer om jag inte är nöjd?',
    a: 'Du har 3 (BAS) eller 5 (PRO/ELITE) revideringsrundor. Om vi ändå inte kan komma överens om ett resultat du är nöjd med återbetalar vi 50% av beloppet.',
  },
  {
    q: 'Äger jag hemsidan?',
    a: 'Vi hostar sidan åt dig — det ger dig bättre prestanda, support och uppdateringar ingår. Vill du äga och hosta koden själv kostar det 6 900 kr extra.',
  },
  {
    q: 'Behöver jag köpa hosting?',
    a: 'Nej. Hosting ingår alltid i månadsretainern. Du behöver inte tänka på servrar, deployment eller domänkonfiguration — vi sköter allt.',
  },
  {
    q: 'Hur ser betalningen ut?',
    a: '50% vid projektstart, 50% vid leverans. Vi fakturerar via e-post med 14 dagars betalningsvillkor.',
  },
];

export default function PlanerPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.label}>PRISER</div>
          <h1 className={styles.heading}>
            Välj din
            <br />
            <em>nivå.</em>
          </h1>
          <p className={styles.sub}>
            Tre planer. Tydliga priser. Ingen bindningstid.
          </p>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className={styles.plansGrid}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.featured ? styles.planFeatured : ''}`}
            >
              {plan.featured && (
                <div className={styles.popularBadge}>Mest populär</div>
              )}
              <div className={styles.planHeader}>
                <span className={styles.planName}>{plan.name}</span>
                <div className={styles.planPrice}>
                  <span className={styles.priceText}>{plan.price} kr</span>
                  <span className={styles.priceNote}>engångsbelopp</span>
                </div>
                <div className={styles.planMonthly}>+ {plan.monthly} kr/mån &mdash; hosting + drift</div>
                <p className={styles.planTagline}>{plan.tagline}</p>
                <p className={styles.planDesc}>{plan.desc}</p>
              </div>
              <ul className={styles.featureList}>
                {plan.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f, i) => (
                  <li key={`not-${i}`} className={`${styles.featureItem} ${styles.featureNo}`}>
                    <span className={styles.featureCross}>✕</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/kontakt" className={`${styles.planCta} ${plan.featured ? styles.planCtaFeatured : ''}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.addonsSection}>
        <div className={styles.addonsInner}>
          <div className={styles.sectionLabel}>TILLÄGG</div>
          <h2 className={styles.sectionHeading}>
            Bygg ut med
            <em> tillägg.</em>
          </h2>
          <div className={styles.addonsGrid}>
            {addons.map((a, i) => (
              <div key={i} className={styles.addonCard}>
                <div className={styles.addonTop}>
                  <span className={styles.addonName}>{a.name}</span>
                  <span className={styles.addonPrice}>{a.price}</span>
                </div>
                <p className={styles.addonDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.sectionLabel}>FAQ</div>
          <h2 className={styles.sectionHeading}>
            Vanliga
            <em> frågor.</em>
          </h2>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{f.q}</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <p className={styles.faqAnswer}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
      <Footer />
    </>
  );
}
