import type { Metadata } from 'next';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'Planer & Priser | Nordic Icon',
  description: 'BAS från 9 900 kr. PRO från 19 900 kr. ELITE från 39 900 kr. Klart på 7–21 dagar.',
};

const plans = [
  {
    id: 'bas',
    name: 'BAS',
    price: '9 900',
    tagline: 'Professionell närvaro online.',
    desc: 'Professionell närvaro online. För bolag som behöver en trovärdig sajt snabbt.',
    features: [
      '4 sidor (startsida + 3 undersidor)',
      'Mobilanpassad',
      'SEO-grund (meta, OG, sitemap)',
      'Kontaktformulär',
      'Cookie-banner (GDPR)',
      'Leverans på 7 dagar',
      'En omgång feedback ingår',
      'Innehållsändringar ingår alltid',
    ],
    notIncluded: [
      'Animationer',
      'Extra sidor',
    ],
    featured: false,
    cta: 'Kom igång med BAS',
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '19 900',
    tagline: 'Animerad. Imponerande. Konverterande.',
    desc: 'För bolag som vill sticka ut. Premium-design med animationer.',
    features: [
      'Allt i BAS, plus:',
      'Framer Motion-animationer',
      'GSAP ScrollTrigger-animationer',
      'Custom favicon & brand assets',
      'AI-synlighet',
      'Upp till 8 sidor',
      'Leverans på 14 dagar',
      'Prioriterad support',
      'En omgång feedback ingår',
      'Innehållsändringar ingår alltid',
    ],
    notIncluded: [],
    featured: true,
    cta: 'Välj PRO',
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '39 900',
    tagline: 'Ingen mall. Inget kompromiss.',
    desc: 'Fullständigt skräddarsytt. Vi bygger precis vad du behöver — utan kompromiss.',
    features: [
      'Allt i PRO, plus:',
      'Custom animations & micro-interactions',
      'Upp till 15 sidor',
      'Leverans på 21 dagar',
      'Prioriterad support',
      'En omgång feedback ingår',
      'Innehållsändringar ingår alltid',
    ],
    notIncluded: [],
    featured: false,
    cta: 'Boka möte',
  },
];

const addons = [
  { name: 'Extra sida', price: '1 900 kr/st', desc: 'Ytterligare undersida med samma design och animationer.' },
  { name: 'Chatbot', price: '1 900 kr', desc: 'AI-driven chatbot som svarar på vanliga frågor dygnet runt.' },
  { name: 'Google Analytics setup', price: '990 kr', desc: 'Konfiguration av Google Analytics 4 med konverteringsspårning.' },
  { name: 'AI-bilder & video', price: '1 900 kr', desc: 'AI-genererade bilder och bakgrundsvideo skräddarsydda för din sajt.' },
  { name: 'Bokningsintegration', price: '1 900 kr', desc: 'Kalenderbokning direkt på sajten — kopplad till Google Calendar.' },
  { name: 'Google Business-optimering', price: '1 490 kr', desc: 'Optimering av ditt Google Business-profil för lokal synlighet.' },
];

const faqs = [
  {
    q: 'Hur lång tid tar det?',
    a: 'BAS levereras på 7 arbetsdagar, PRO på 14 arbetsdagar och ELITE på 21 arbetsdagar — räknat från signerat avtal och levererat material (texter, logotyp) inom 2 dagar från start.',
  },
  {
    q: 'Vad händer om jag inte är nöjd?',
    a: 'En omgång feedback ingår i alla planer. Behöver du mer hjälp löser vi det — vi jobbar tills du är nöjd.',
  },
  {
    q: 'Äger jag hemsidan?',
    a: 'Vi hostar sidan åt dig — det ger dig bättre prestanda och support ingår. Vill du äga och hosta koden själv löser vi det.',
  },
  {
    q: 'Behöver jag köpa hosting?',
    a: 'Nej. Hosting ingår i priset — inga månadsavgifter. Du betalar en gång, sen är det klart.',
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
            Tre planer. Tydliga priser. Inga månadsavgifter.
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
              </ul>
              <a href="/kontakt" className={`${styles.planCta} ${plan.featured ? styles.planCtaFeatured : ''}`}>
                {plan.cta}
              </a>
              <a href={`/projekt?plan=${plan.name}`} className={styles.planExample}>
                Visa exempel →
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
