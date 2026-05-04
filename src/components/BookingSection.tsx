'use client';

import BookingCalendar from './BookingCalendar';
import styles from './BookingSection.module.css';

export default function BookingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.label}>BOKA ETT MÖTE</div>
          <h2 className={styles.heading}>
            Redo att
            <br />
            <em>komma igång?</em>
          </h2>
          <p className={styles.sub}>
            Välj en tid som passar dig — 30 minuter via Google Meet, helt kostnadsfritt.
            Vi pratar om ditt projekt och vad vi kan göra för dig.
          </p>
          <ul className={styles.features}>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              30 minuter · Google Meet
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kostnadsfritt och utan förpliktelser
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Du pratar direkt med Max eller Rasmus
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <BookingCalendar hideHeader />
        </div>
      </div>
    </section>
  );
}
