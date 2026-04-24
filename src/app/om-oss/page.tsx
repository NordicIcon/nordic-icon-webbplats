import type { Metadata } from 'next';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'Om oss | Nordic Icon',
  description: 'Nordic Icon bygger premium hemsidor för svenska bolag. Läs om vår filosofi och vilka vi är.',
};

const values = [
  {
    number: '01',
    title: 'Ärlighet före försäljning.',
    text: 'Vi säger nej till projekt vi inte kan leverera riktigt bra. Hellre tappa ett uppdrag än göra ett halvbra jobb.',
  },
  {
    number: '02',
    title: 'Detaljer avgör allt.',
    text: 'En pixel fel syns inte för de flesta — men vi ser den. Det är den inställningen som skiljer premium från medioker.',
  },
  {
    number: '03',
    title: 'Rätt tempo, varje gång.',
    text: 'BAS på 10 dagar. PRO på 14. ELITE på 21. Varje deadline är ett löfte — inte en förhoppning.',
  },
  {
    number: '04',
    title: 'Transparens utan undantag.',
    text: 'Du vet exakt vad du betalar för, vad vi jobbar på och när det är klart. Inga dolda avgifter. Inga obehagliga överraskningar.',
  },
];

export default function OmOssPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.label}>OM OSS</div>
          <h1 className={styles.heading}>
            Vi uppgraderar
            <br />
            <em>Sveriges hemsidor.</em>
          </h1>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <div className={styles.sectionLabel}>BAKGRUNDEN</div>
            <h2 className={styles.storyHeading}>
              Varför vi
              <em> startade.</em>
            </h2>
            <p>
              Nordic Icon grundades med en enkel övertygelse: svenska bolag förtjänar
              hemsidor i världsklass — utan att behöva betala byråpriser eller vänta i månader.
            </p>
            <p>
              Vi tröttnade på att se bolag nöja sig med template-sajter som ser exakt
              likadana ut som konkurrenternas. Och på byråer som tar 150 000 kr och
              6 månader för något som borde ta 10 dagar.
            </p>
            <p>
              Nordic Icon är svaret på det gapet.
            </p>
          </div>
          <div className={styles.storyVisual}>
            <div className={styles.storyCard}>
              <div className={styles.storyCardLabel}>FILOSOFIN</div>
              <blockquote className={styles.storyQuote}>
                &ldquo;En hemsida är inte ett kostnadsställe. Det är din bästa säljare —
                tillgänglig dygnet runt, sju dagar i veckan.&rdquo;
              </blockquote>
              <div className={styles.storyCardAuthor}>Nordic Icon AB</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <div className={styles.sectionLabel}>VÄRDERINGAR</div>
          <h2 className={styles.valuesHeading}>
            Hur vi
            <em> arbetar.</em>
          </h2>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.number} className={styles.valueCard}>
                <span className={styles.valueNumber}>{v.number}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
      <Footer />
    </>
  );
}
