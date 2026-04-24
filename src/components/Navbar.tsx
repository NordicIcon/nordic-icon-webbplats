'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './Navbar.module.css';

const links = [
  { href: '/projekt', label: 'Projekt' },
  { href: '/planer',  label: 'Planer'  },
  { href: '/om-oss',  label: 'Om oss'  },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastScrollY = useRef(0);
  const ctaRef      = useMagneticButton(0.22);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.inner}>

        <Link href="/" className={styles.logo} aria-label="Nordic Icon — hem">
          <Image
            src="/images/nordic-icon-transparent.png"
            alt="Nordic Icon"
            height={28}
            width={140}
            style={{ height: 28, width: 'auto' }}
            priority
          />
        </Link>

        <div className={styles.links}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>

        <a
          ref={ctaRef as React.RefObject<HTMLAnchorElement>}
          href="/kontakt"
          className={styles.cta}
          data-cursor="button"
        >
          Kom igång
        </a>
      </div>
    </nav>
  );
}
