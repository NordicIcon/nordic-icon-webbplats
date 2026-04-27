'use client';

import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './PreFooterCTA.module.css';

export default function PreFooterCTA() {
  const primaryRef = useMagneticButton(0.28);

  return (
    <section className={styles.section}>
      {/* Floating rings */}
      <div className={styles.floatingLayer} aria-hidden>
        {[
          { size: 280, x: '5%',  y: '20%', delay: 0 },
          { size: 160, x: '88%', y: '15%', delay: 2 },
          { size: 200, x: '80%', y: '65%', delay: 1 },
          { size: 100, x: '15%', y: '70%', delay: 3 },
        ].map((ring, i) => (
          <div
            key={i}
            className={styles.ring}
            style={{
              width: ring.size,
              height: ring.size,
              left: ring.x,
              top: ring.y,
              animationDelay: `${ring.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.label}>KOM IGÅNG</div>

        <h2 className={styles.heading}>
          Din nästa hemsida
          <br />
          <em>är ett samtal bort.</em>
        </h2>

        <p className={styles.sub}>
          Vi bygger premium hemsidor för svenska bolag.
          <br />
          Klara på 14–30 dagar. Från 7 900 kr.
        </p>

        <div className={styles.ctas}>
          <a
            ref={primaryRef as React.RefObject<HTMLAnchorElement>}
            href="/kontakt"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Boka ett möte
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
