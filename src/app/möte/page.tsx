import type { Metadata } from 'next';
import styles from './page.module.css';
import BookingCalendar from '@/components/BookingCalendar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Boka möte | Nordic Icon',
  description: 'Boka ett kostnadsfritt 30-minutersmöte med Nordic Icon. Välj tid direkt i kalendern.',
  robots: 'noindex',
};

export default function MotePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.label}>BOKA MÖTE</div>
          <h1 className={styles.heading}>
            Välj en tid
            <br />
            <em>som passar dig</em>
          </h1>
          <p className={styles.sub}>
            30 minuter · Google Meet · Kostnadsfritt
          </p>
          <div className={styles.calendarWrap}>
            <BookingCalendar hideHeader />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
