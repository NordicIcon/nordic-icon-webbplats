'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './Hero.module.css';

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const primaryRef   = useMagneticButton(0.28);
  const secondaryRef = useMagneticButton(0.22);

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        className={styles.heroBg}
        priority
      />

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden />

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.label} variants={item}>
          Webbyrå · Sverige
        </motion.div>

        <motion.h1 className={styles.heading} variants={item}>
          Premium hemsidor
          <br />
          <span className={styles.glowText}>för svenska bolag.</span>
        </motion.h1>

        <motion.p className={styles.subtext} variants={item}>
          Animerade. Mobilanpassade. Klara på 5–10 dagar.
        </motion.p>

        <motion.div className={styles.ctas} variants={item}>
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
          <a
            ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
            href="/planer"
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            Se planer & priser
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
