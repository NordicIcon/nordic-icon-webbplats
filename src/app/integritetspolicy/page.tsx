import type { Metadata } from 'next';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Integritetspolicy | Nordic Icon',
  description: 'Nordic Icons integritetspolicy — hur vi hanterar personuppgifter och cookies.',
};

export default function IntegritetspolicyPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.label}>INTEGRITETSPOLICY</div>
          <h1 className={styles.heading}>
            Hur vi hanterar
            <br />
            <em>dina uppgifter.</em>
          </h1>
          <p className={styles.updated}>Senast uppdaterad: januari 2025</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>

          <h2>Personuppgiftsansvarig</h2>
          <p>
            Nordic Icon AB ansvarar för behandlingen av dina personuppgifter på denna webbplats.
            Har du frågor om hur vi hanterar dina uppgifter är du välkommen att kontakta oss på{' '}
            <a href="mailto:info@nordicicon.se">info@nordicicon.se</a>.
          </p>

          <h2>Vilka uppgifter vi samlar in</h2>
          <p>
            Vi samlar in personuppgifter som du lämnar frivilligt via kontaktformuläret eller bokningswidgeten:
          </p>
          <ul>
            <li>Namn</li>
            <li>E-postadress</li>
            <li>Telefonnummer (valfritt)</li>
            <li>Företagsnamn (valfritt)</li>
            <li>Meddelande/förfrågan</li>
          </ul>
          <p>
            Vi samlar inte in känsliga personuppgifter och vi säljer aldrig dina uppgifter till tredje part.
          </p>

          <h2>Varför vi behandlar dina uppgifter</h2>
          <p>
            Uppgifterna används uteslutande för att besvara din förfrågan och, om du bokar ett möte,
            för att genomföra bokningen. Den rättsliga grunden är <strong>berättigat intresse</strong> —
            att kunna hantera affärskontakter och förbättra vår service.
          </p>

          <h2>Hur länge vi sparar dina uppgifter</h2>
          <p>
            Vi sparar dina uppgifter så länge det är nödvändigt för det syfte de samlades in för.
            För kontaktförfrågningar innebär det normalt 12 månader. Du kan när som helst begära
            att dina uppgifter raderas.
          </p>

          <h2>Cookies</h2>
          <p>
            Vår webbplats använder cookies för att förbättra din upplevelse:
          </p>
          <ul>
            <li>
              <strong>Nödvändiga cookies</strong> — krävs för att webbplatsen ska fungera korrekt.
            </li>
            <li>
              <strong>Analytiska cookies (Google Analytics)</strong> — hjälper oss förstå hur besökare
              använder webbplatsen. Dessa aktiveras endast om du godkänner cookies.
            </li>
          </ul>
          <p>
            Du kan ändra dina cookie-inställningar när som helst genom att rensa webbläsarens
            lagrade data för nordicicon.se.
          </p>

          <h2>Dina rättigheter (GDPR)</h2>
          <p>Enligt dataskyddsförordningen (GDPR) har du rätt att:</p>
          <ul>
            <li>Få tillgång till de uppgifter vi har om dig</li>
            <li>Begära rättelse av felaktiga uppgifter</li>
            <li>Begära radering av dina uppgifter</li>
            <li>Invända mot behandlingen</li>
            <li>Begära begränsning av behandlingen</li>
            <li>Dataportabilitet</li>
          </ul>
          <p>
            Skicka din begäran till{' '}
            <a href="mailto:info@nordicicon.se">info@nordicicon.se</a> och vi svarar inom 30 dagar.
            Du har även rätt att lämna klagomål till{' '}
            <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer">
              Integritetsskyddsmyndigheten (IMY)
            </a>.
          </p>

          <h2>Kontakt</h2>
          <p>
            Nordic Icon AB<br />
            <a href="mailto:info@nordicicon.se">info@nordicicon.se</a>
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
}
