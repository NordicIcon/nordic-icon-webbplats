import type { Metadata } from 'next';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

export const metadata: Metadata = {
  title: 'Våra Projekt | Nordic Icon',
  description: 'Se de hemsidor Nordic Icon har byggt för svenska bolag — från BAS till ELITE.',
};

const projects = [
  {
    id: 'koppar',
    name: 'Koppar',
    industry: 'Specialty Coffee',
    city: 'Halmstad',
    plan: 'PRO',
    desc: 'Animerad webbplats för Halmstads ledande specialty coffee-bar.',
    bg: 'linear-gradient(135deg, #2C1810 0%, #C17B35 100%)',
    featured: true,
  },
  {
    id: 'havets',
    name: 'Havets',
    industry: 'Fine Dining',
    city: 'Göteborg',
    plan: 'PRO',
    desc: 'Mörk premium-sajt för fine dining-restaurang i centrala Göteborg.',
    bg: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A6B 100%)',
    featured: true,
  },
  {
    id: 'strand-studio',
    name: 'Strand Studio',
    industry: 'Salong',
    city: 'Stockholm',
    plan: 'BAS',
    desc: 'Ren och professionell salong-sajt i light editorial-stil.',
    bg: 'linear-gradient(135deg, #2A2A28 0%, #6A6A60 100%)',
    featured: false,
  },
  {
    id: 'lindqvist-vvs',
    name: 'Lindqvist VVS',
    industry: 'VVS',
    city: 'Karlstad',
    plan: 'BAS',
    desc: 'Trovärdig BAS-sajt för lokal VVS-firma i Karlstad.',
    bg: 'linear-gradient(135deg, #1A3B35 0%, #2D6A5F 100%)',
    featured: false,
  },
];

export default function ProjektPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.label}>PORTFOLIO</div>
          <h1 className={styles.heading}>
            Vad vi
            <br />
            <em>har byggt.</em>
          </h1>
          <p className={styles.sub}>
            Varje projekt är byggt från grunden. Ingen mall. Ingen genväg.
          </p>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.gridInner}>
          {projects.map(p => (
            <div
              key={p.id}
              className={`${styles.card} ${p.featured ? styles.cardFeatured : ''}`}
            >
              <div className={styles.cardBg} style={{ background: p.bg }}>
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardPlan}>{p.plan}</span>
                  <span className={styles.cardName}>{p.name}</span>
                  <span className={styles.cardMeta}>{p.industry} · {p.city}</span>
                </div>
                <div className={styles.cardHover}>
                  <span>{p.desc}</span>
                  <span className={styles.cardHoverLink}>Se projektet →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PreFooterCTA />
      <Footer />
    </>
  );
}
