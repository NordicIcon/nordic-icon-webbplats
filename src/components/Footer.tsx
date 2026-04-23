import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const nav = [
  { href: '/',        label: 'Hem' },
  { href: '/projekt', label: 'Projekt' },
  { href: '/planer',  label: 'Planer' },
  { href: '/om-oss',  label: 'Om oss' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Columns */}
      <div className={styles.columns}>
        <div className={styles.col}>
          <div className={styles.logo}>
            <Image
              src="/images/nordic-icon-vit.png"
              alt="Nordic Icon"
              height={28}
              width={140}
              style={{ height: 28, width: 'auto' }}
            />
          </div>
          <p className={styles.tagline}>
            Premium hemsidor för svenska bolag.
            <br />
            Klara på 10 dagar. Från 7 900 kr.
          </p>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span className={styles.liveText}>Tar emot nya kunder</span>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.colLabel}>SIDOR</div>
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.footerLink}>
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <div className={styles.colLabel}>KONTAKT</div>
          <a href="mailto:info@nordicicon.se" className={styles.footerLink}>
            info@nordicicon.se
          </a>
          <p className={styles.footerNote} style={{ marginTop: '16px' }}>
            Sverige · Heldigitalt
          </p>
        </div>
      </div>

      {/* Giant outline brand name */}
      <div className={styles.brandWrap} aria-hidden>
        <div className={styles.brandText}>
          NORDIC<span style={{ marginLeft: '0.25em' }}>ICON</span>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.bottom}>
        <span>© {year} Nordic Icon AB</span>
        <span>
          Byggd av{' '}
          <a href="https://nordicicon.se" className={styles.bottomLink}>
            Nordic Icon
          </a>
        </span>
      </div>
    </footer>
  );
}
