'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
            <Image
              src="/images/koppar-desktop.png"
              alt="Koppar PRO — Specialty Coffee Halmstad"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
