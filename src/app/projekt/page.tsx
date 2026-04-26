'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

type Project = {
  id: string; name: string; industry: string; city: string;
  plan: 'BAS' | 'PRO' | 'ELITE'; desc: string; image: string; noEmbed?: boolean;
};

const projects: Project[] = [
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
    noEmbed: true,
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


function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  const inner = (
    <>
      <div className={styles.cardImage}>
        <div className={styles.cardImageZoom}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            sizes={featured ? '(max-width: 1024px) 100vw, 1200px' : '(max-width: 1024px) 100vw, 50vw'}
            priority={featured}
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
    </>
  );

  const cls = `${styles.cardWrap} ${featured ? styles.cardFeatured : ''}`;

  if (p.noEmbed) return <div className={cls}>{inner}</div>;
  return <Link href={`/projekt/${p.id}`} className={cls}>{inner}</Link>;
}

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
              <ProjectCard p={featured} featured />

              {/* Remaining cards */}
              {rest.map((p) => <ProjectCard key={p.id} p={p} />)}

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
