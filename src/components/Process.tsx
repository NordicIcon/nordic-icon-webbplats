'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    label: 'DISCOVERY',
    title: 'Vi lär känna ditt bolag.',
    body: '30 minuter. Inga slides. Vi lyssnar på vad du behöver och vad som ska hända.',
    bg: '#0D1B2A',
    textColor: '#FAFAFA',
  },
  {
    number: '02',
    label: 'FÖRSTA FÖRSLAG',
    title: 'Du ser ett första förslag.',
    body: 'Vi presenterar ett designförslag baserat på din brief. Du ger feedback och vi justerar.',
    bg: '#FAFAFA',
    textColor: '#1A1A18',
  },
  {
    number: '03',
    label: 'REVIDERING',
    title: 'Vi jobbar tills du är nöjd.',
    body: 'Du har 3 (BAS) eller 5 (PRO/ELITE) revideringsrundor. Kan vi ändå inte enas — återbetalar vi 50%.',
    bg: '#0D1B2A',
    textColor: '#FAFAFA',
  },
  {
    number: '04',
    label: 'LIVE',
    title: 'Domän kopplad. Analytics aktivt.',
    body: 'Du är live. Vi följer upp efter 7 dagar och ser till att allt fungerar.',
    bg: '#F3F2EE',
    textColor: '#1A1A18',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stepsEl = stepsRef.current;
    if (!section || !stepsEl) return;

    const ctx = gsap.context(() => {
      const totalWidth = stepsEl.scrollWidth - window.innerWidth;

      gsap.to(stepsEl, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.wrapper}>
        <div ref={stepsRef} className={styles.stepsContainer}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={styles.step}
              style={{ background: step.bg, color: step.textColor }}
            >
              <div className={styles.stepContent}>
                <p className={styles.label}>{step.label}</p>
                <h2 className={styles.title}>{step.title}</h2>
                <p className={styles.body}>{step.body}</p>
              </div>
              <div className={styles.dots} aria-hidden>
                {steps.map((_, j) => (
                  <span
                    key={j}
                    className={`${styles.dot} ${i === j ? styles.dotActive : ''}`}
                    style={{
                      background: i === j
                        ? (step.textColor === '#FAFAFA' ? 'rgba(255,255,255,0.9)' : '#1B3A6B')
                        : (step.textColor === '#FAFAFA' ? 'rgba(255,255,255,0.2)' : 'rgba(26,26,24,0.2)'),
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
