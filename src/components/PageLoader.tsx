'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('ni-loader-shown')) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('ni-loader-shown', 'true');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loader}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.inner}>
            <div className={styles.lines}>
              {[0, 0.35, 0.55].map((delay, i) => (
                <motion.div
                  key={i}
                  className={styles.line}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
                />
              ))}
            </div>

            <motion.div
              className={styles.brand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Image
                src="/images/nordic-icon-vit.png"
                alt="Nordic Icon"
                width={160}
                height={32}
                style={{ width: 160, height: 'auto', opacity: 0.7 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
