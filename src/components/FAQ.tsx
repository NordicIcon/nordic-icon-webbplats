'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'Hur lång tid tar det att bygga?',
    a: 'BAS tar 7 dagar. PRO tar 14 dagar. ELITE tar 21 dagar. Vi sätter alltid ett datum och håller det.',
  },
  {
    q: 'Vad kostar hosting?',
    a: 'Hosting ingår i priset — inga månadsavgifter. Du betalar en gång, sen är det klart.',
  },
  {
    q: 'Kan jag byta text och bilder själv?',
    a: 'Ja. Du kontaktar oss när du vill ha ändringar — vi fixar det samma dag. Det ingår alltid.',
  },
  {
    q: 'Äger jag koden?',
    a: 'Vi hostar sidan åt dig, vilket ger dig bättre prestanda och support. Vill du äga och hosta koden själv kostar det 6 900 kr extra.',
  },
  {
    q: 'Vad händer om jag inte är nöjd?',
    a: 'Vi gör en omgång ändringar utan kostnad. Om du fortfarande inte är nöjd betalar du bara 50% av priset.',
  },
  {
    q: 'Jobbar ni med hela Sverige?',
    a: 'Ja. Alla möten sker digitalt via Google Meet. Vi har kunder i hela Sverige.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>FAQ</div>
          <h2 className={styles.heading}>
            Vanliga frågor.
            <br />
            <em>Direkta svar.</em>
          </h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={styles.questionText}>{faq.q}</span>
                <motion.span
                  className={styles.icon}
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  aria-hidden
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className={styles.answer}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
