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
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
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

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
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

          {/* Hamburger — mobile only */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Öppna meny"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden />
      )}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Stäng meny">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <nav className={styles.drawerNav}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.drawerLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <a href="/kontakt" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
          Kom igång
        </a>
      </div>
    </>
  );
}
