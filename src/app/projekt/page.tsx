'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

const projects = [
  {
    id: 'koppar',
    name: 'Koppar',
    industry: 'Specialty Coffee',
    city: 'Halmstad',
    plan: 'PRO' as const,
    desc: 'Animerad webbplats för Halmstads ledande specialty coffee-bar.',
    image: '/images/koppar-card.png',
  },
  {
    id: 'havets',
    name: 'Havets',
    industry: 'Fine Dining',
    city: 'Göteborg',
    plan: 'PRO' as const,
    desc: 'Mörk premium-sajt för fine dining-restaurang i centrala Göteborg.',
    image: '/images/havets-card.png',
  },
  {
    id: 'solberg',
    name: 'Solberg',
    industry: 'Restaurang',
    city: 'Stockholm',
    plan: 'PRO' as const,
    desc: 'Modern restaurangsajt med premium-design och bokningssystem.',
    image: '/images/solberg-card.png',
  },
  {
    id: 'strand-studio',
    name: 'Strand Studio',
    industry: 'Salong',
    city: 'Stockholm',
    plan: 'BAS' as const,
    desc: 'Ren och professionell salong-sajt i light editorial-stil.',
    image: '/images/strand-studio-card.png',
  },
  {
    id: 'lindqvist-vvs',
    name: 'Lindqvist VVS',
    industry: 'VVS',
    city: 'Karlstad',
    plan: 'BAS' as const,
    desc: 'Trovärdig BAS-sajt för lokal VVS-firma i Karlstad.',
    image: '/images/lindqvist-card.png',
  },
];

type FilterLevel = 'ALLA' | 'BAS' | 'PRO' | 'ELITE';

function ProjektContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') as FilterLevel | null;
  const [filter, setFilter] = useState<FilterLevel>(
    initialPlan && ['BAS', 'PRO', 'ELITE'].includes(initialPlan) ? initialPlan : 'ALLA'
  );

  const filtered = filter === 'ALLA' ? projects : projects.filter(p => p.plan === filter);
  const [featured, ...rest] = filtered;

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
          {/* Filter buttons */}
          <div className={styles.filters}>
            {(['ALLA', 'BAS', 'PRO', 'ELITE'] as FilterLevel[]).map(level => (
              <button
                key={level}
                className={`${styles.filterBtn} ${filter === level ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(level)}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Disclaimer */}
          <p className={styles.disclaimer}>* Fiktiva referensprojekt — inga riktiga kunder</p>

          {featured && (
            <>
              {/* Featured card — full width */}
              <div className={`${styles.cardWrap} ${styles.cardFeatured}`}>
                <div className={styles.cardImage}>
                  <div className={styles.cardImageZoom}>
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      priority
                    />
                  </div>
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardPlan}>{featured.plan}</span>
                  <span className={styles.cardName}>{featured.name}</span>
                  <span className={styles.cardMeta}>{featured.industry} · {featured.city}</span>
                  <p className={styles.cardDesc}>{featured.desc}</p>
                </div>
              </div>

              {/* Remaining cards */}
              {rest.map((p) => (
                <div key={p.id} className={styles.cardWrap}>
                  <div className={styles.cardImage}>
                    <div className={styles.cardImageZoom}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className={styles.cardOverlay} />
                  </div>
                  <div className={styles.cardText}>
                    <span className={styles.cardPlan}>{p.plan}</span>
                    <span className={styles.cardName}>{p.name}</span>
                    <span className={styles.cardMeta}>{p.industry} · {p.city}</span>
                    <p className={styles.cardDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className={styles.emptyMsg}>Inga projekt för den valda nivån ännu.</p>
              )}
            </>
          )}

          {!featured && (
            <p className={styles.emptyMsg}>Inga projekt för den valda nivån ännu.</p>
          )}
        </div>
      </section>

      <PreFooterCTA />
      <Footer />
    </>
  );
}

export default function ProjektPage() {
  return (
    <Suspense fallback={null}>
      <ProjektContent />
    </Suspense>
  );
}
