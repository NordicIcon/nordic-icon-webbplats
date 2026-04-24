import type { Metadata } from 'next';
import Image from 'next/image';
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
    image: '/images/koppar-card.png',
  },
  {
    id: 'havets',
    name: 'Havets',
    industry: 'Fine Dining',
    city: 'Göteborg',
    plan: 'PRO',
    desc: 'Mörk premium-sajt för fine dining-restaurang i centrala Göteborg.',
    image: '/images/havets-card.png',
  },
  {
    id: 'solberg',
    name: 'Solberg',
    industry: 'Restaurang',
    city: 'Stockholm',
    plan: 'PRO',
    desc: 'Modern restaurangsajt med premium-design och bokningssystem.',
    image: '/images/solberg-card.png',
  },
  {
    id: 'strand-studio',
    name: 'Strand Studio',
    industry: 'Salong',
    city: 'Stockholm',
    plan: 'BAS',
    desc: 'Ren och professionell salong-sajt i light editorial-stil.',
    image: '/images/strand-studio-card.png',
  },
  {
    id: 'lindqvist-vvs',
    name: 'Lindqvist VVS',
    industry: 'VVS',
    city: 'Karlstad',
    plan: 'BAS',
    desc: 'Trovärdig BAS-sajt för lokal VVS-firma i Karlstad.',
    image: '/images/lindqvist-card.png',
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
            <div key={p.id} className={styles.cardWrap}>
              <div className={styles.card}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardPlan}>{p.plan}</span>
                <span className={styles.cardName}>{p.name}</span>
                <span className={styles.cardMeta}>{p.industry} · {p.city}</span>
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
