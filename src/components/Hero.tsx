'use client';

import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const primaryRef   = useMagneticButton(0.28);
  const secondaryRef = useMagneticButton(0.22);

  return (
    <section className={styles.hero}>
      {/* Background video — falls back to #0a1628 when no file */}
      <video autoPlay muted loop playsInline className={styles.videoBg}>
        <source src="/assets/videos/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Subtle vignette ring */}
      <div className={styles.ringOverlay} aria-hidden />

      <div className={styles.contentWrap}>
        <div className={styles.inner}>

          {/* ── Text block ── */}
          <div className={styles.textBlock}>

            {/* Badge */}
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>Nytt</span>
              <span className={styles.badgeText}>Tar emot nya kunder</span>
            </div>

            {/* Heading */}
            <h1 className={styles.heading}>
              Premium hemsidor
              <br className={styles.smBreak} />
              för svenska bolag.
            </h1>

            {/* Description */}
            <p className={styles.description}>
              Animerade. Mobilanpassade. Klara på 5–10 dagar.
            </p>

            {/* CTAs */}
            <div className={styles.buttons}>
              <a
                ref={primaryRef as React.RefObject<HTMLAnchorElement>}
                href="/kontakt"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Boka ett möte
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
                href="/projekt"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Se våra projekt
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Stats (replaces Partners) ── */}
          <div className={styles.statsSection}>
            <p className={styles.statsTitle}>Byggt för att prestera</p>
            <div className={styles.statsGrid}>
              {[
                { value: '100%', label: 'Mobilresponsiv' },
                { value: '90+',  label: 'Lighthouse score' },
                { value: '5–10', label: 'Dagar till live' },
              ].map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
