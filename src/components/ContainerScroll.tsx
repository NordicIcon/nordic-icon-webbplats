'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './ContainerScroll.module.css';

export default function ContainerScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0.05, 0.55], [22, 0]);
  const scale   = useTransform(scrollYProgress, [0.05, 0.55], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25], [0,   1]);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.label}>PORTFOLIO</div>
        <h2 className={styles.heading}>
          Hemsidor som
          <br />
          <em>faktiskt imponerar.</em>
        </h2>
        <p className={styles.sub}>
          Varje projekt byggs från grunden. Ingen mall. Ingen genväg.
        </p>
      </div>

      <div className={styles.perspective}>
        <motion.div
          className={styles.mockup}
          style={{ rotateX, scale, opacity }}
        >
          <div className={styles.browserBar}>
            <div className={styles.dots}>
              <span /><span /><span />
            </div>
            <div className={styles.urlBar}>nordicicon.se/projekt/koppar</div>
          </div>

          <div className={styles.screen}>
            {/* Placeholder for Koppar PRO screenshot */}
            <div className={styles.placeholder}>
              <div className={styles.placeholderInner}>
                <span className={styles.placeholderLabel}>KOPPAR PRO</span>
                <span className={styles.placeholderSub}>Specialty Coffee · Halmstad</span>
              </div>
              {/* Simulated page content */}
              <div className={styles.mockContent}>
                <div className={styles.mockHero} />
                <div className={styles.mockSection}>
                  <div className={styles.mockHeading} />
                  <div className={styles.mockText} />
                  <div className={styles.mockText} style={{ width: '70%' }} />
                </div>
                <div className={styles.mockGrid}>
                  <div className={styles.mockCard} />
                  <div className={styles.mockCard} />
                  <div className={styles.mockCard} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
