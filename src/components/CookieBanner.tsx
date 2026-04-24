'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('ni-cookie-consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ni-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('ni-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie-samtycke">
      <div className={styles.content}>
        <p className={styles.text}>
          Vi använder cookies för att förbättra upplevelsen och analysera trafik.{' '}
          <Link href="/integritetspolicy" className={styles.link}>Läs mer</Link>
        </p>
        <div className={styles.actions}>
          <button className={styles.btnDecline} onClick={decline}>Neka</button>
          <button className={styles.btnAccept} onClick={accept}>Acceptera alla</button>
        </div>
      </div>
    </div>
  );
}
