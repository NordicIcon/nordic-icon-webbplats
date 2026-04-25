'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './IPhoneMockup.module.css';

export default function IPhoneMockup() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0.2, 0.8], [-3, 3]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {/* Text side */}
        <div className={styles.textSide}>
          <div className={styles.label}>MOBILANPASSAD</div>
          <h2 className={styles.heading}>
            Ser lika bra ut
            <br />
            <em>på telefonen.</em>
          </h2>
          <p className={styles.body}>
            Varje sajt vi bygger är designad mobilfirst.
            Inga kompromisser. Testad på alla skärmstorlekar.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Mobilresponsiv</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>90+</span>
              <span className={styles.statLabel}>Lighthouse score</span>
            </div>
          </div>
        </div>

        {/* Phone side */}
        <div className={styles.phoneSide}>
          <div className={styles.glowBg} aria-hidden />
          <motion.div className={styles.phoneWrapper} style={{ rotate }}>
            <Image
              src="/images/nordic-icon-enhanced.png"
              alt="Mobilanpassad webbplats"
              width={1080}
              height={1080}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 90vw, 700px"
              quality={90}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
