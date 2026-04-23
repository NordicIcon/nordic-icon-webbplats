import type { Metadata } from 'next';
import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import BookingCalendar from '@/components/BookingCalendar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kontakt | Nordic Icon',
  description: 'Boka ett gratis möte med Nordic Icon. Vi svarar inom 24 timmar.',
};

export default function KontaktPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.label}>KONTAKT</div>
          <h1 className={styles.heading}>
            Redo att
            <br />
            <em>komma igång?</em>
          </h1>
          <p className={styles.sub}>
            Boka ett kostnadsfritt 30-minutersmöte. Vi pratar igenom ditt projekt
            och du får en prisuppskattning direkt.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactInner}>
          <div className={styles.formSide}>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>E-POST</span>
                <a href="mailto:info@nordicicon.se" className={styles.infoValue}>
                  info@nordicicon.se
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>SVARSTID</span>
                <span className={styles.infoValue}>Inom 24 timmar</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>MÖTE</span>
                <span className={styles.infoValue}>Google Meet</span>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className={styles.calendarSide}>
            <h2 className={styles.calendarHeading}>Boka ett möte</h2>
            <p className={styles.calendarSub}>
              Välj en tid som passar dig. Vi bekräftar via e-post.
            </p>
            <BookingCalendar />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
