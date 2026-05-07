'use client';

import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const primaryRef   = useMagneticButton(0.28);
  const secondaryRef = useMagneticButton(0.22);

  return (
    <section className={styles.hero}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.videoBg}
      >
        <source src="/assets/videos/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden />

      {/* Content */}
      <div className={styles.content}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeNew}>Nytt</span>
          <span className={styles.badgeText}>Tar emot nya kunder</span>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>
          Premium hemsidor
          <br />
          <em className={styles.glowText}>för svenska bolag.</em>
        </h1>

        {/* Subtext */}
        <p className={styles.subtext}>
          Animerade. Mobilanpassade. Klara på 5–10 dagar.
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <a
            ref={primaryRef as React.RefObject<HTMLAnchorElement>}
            href="/kontakt"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Boka ett möte
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
            href="/projekt"
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            Se våra projekt
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Mobilresponsiv</div>
          </div>
          <div className={styles.statDivider} aria-hidden />
          <div className={styles.statItem}>
            <div className={styles.statValue}>90+</div>
            <div className={styles.statLabel}>Lighthouse score</div>
          </div>
          <div className={styles.statDivider} aria-hidden />
          <div className={styles.statItem}>
            <div className={styles.statValue}>5–10</div>
            <div className={styles.statLabel}>Dagar till live</div>
          </div>
        </div>
      </div>
    </section>
  );
}
