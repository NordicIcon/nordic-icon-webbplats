'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 0,
    name: 'Koppar',
    industry: 'Specialty Coffee',
    city: 'Halmstad',
    plan: 'PRO',
    image: '/images/koppar-card.png',
  },
  {
    id: 1,
    name: 'Havets',
    industry: 'Fine Dining',
    city: 'Göteborg',
    plan: 'PRO',
    image: '/images/havets-card.png',
  },
  {
    id: 2,
    name: 'Strand Studio',
    industry: 'Salong',
    city: 'Stockholm',
    plan: 'BAS',
    image: '/images/strand-studio-card.png',
  },
  {
    id: 3,
    name: 'Solberg',
    industry: 'Restaurang',
    city: 'Stockholm',
    plan: 'PRO',
    image: '/images/solberg-card.png',
  },
];

/* Semi-circle math:
   Cards sit on a circle of radius R.
   Angle 0 = top (12 o'clock). Cards spread ±2 steps of 60° around the top.
   baseRotation is driven by scroll. */
const RADIUS   = 340;
const ANGLE_STEP = Math.PI / 3; /* 60° between cards */

function getCardStyle(index: number, activeIndex: number) {
  const diff  = (index - activeIndex + projects.length) % projects.length;
  /* Map diff to signed: 0=active, 1=right, 2=far right / left, 3=far left */
  const signed = diff <= projects.length / 2 ? diff : diff - projects.length;
  const angle  = signed * ANGLE_STEP;
  const x      = Math.sin(angle) * RADIUS;
  const y      = -Math.cos(angle) * RADIUS;
  const isActive = signed === 0;
  const far = Math.abs(signed) >= 2;

  return {
    transform: `translate(${x}px, ${y}px) scale(${isActive ? 1 : 0.72})`,
    opacity: isActive ? 1 : far ? 0.3 : 0.5,
    filter: isActive ? 'none' : 'blur(2px)',
    zIndex: isActive ? 4 : Math.abs(signed) === 1 ? 2 : 1,
    transition: 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.55s ease, filter 0.55s ease',
  };
}

export default function Portfolio() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const orbitRef      = useRef<HTMLDivElement>(null);
  const hasAnimated   = useRef(false);
  const [active, setActive] = useState(0);
  const scrollProgress = useRef(0);

  const advance = useCallback((direction: 1 | -1) => {
    setActive(prev => (prev + direction + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.from('[data-portfolio-header]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      /* Scroll-driven rotation */
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          const prev = scrollProgress.current;
          const curr = self.progress;
          const delta = curr - prev;
          scrollProgress.current = curr;

          if (Math.abs(delta) > 0.12) {
            setActive(a => (a + (delta > 0 ? 1 : -1) + projects.length) % projects.length);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* Intro spin when section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && orbitRef.current) {
            hasAnimated.current = true;
            gsap.fromTo(
              orbitRef.current,
              { rotation: 0 },
              {
                rotation: 360,
                duration: 1.2,
                ease: 'power2.out',
                onComplete: () => gsap.set(orbitRef.current, { rotation: 0 }),
              }
            );
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') advance(1);
      if (e.key === 'ArrowLeft') advance(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance]);

  const activeProject = projects[active];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div data-portfolio-header className={styles.header}>
        <div className={styles.label}>PORTFOLIO</div>
        <h2 className={styles.heading}>
          Hemsidor som
          <br />
          <em>faktiskt imponerar.</em>
        </h2>
        <p className={styles.sub}>Varje projekt byggs från grunden. Ingen mall. Ingen genväg.</p>
      </div>

      {/* Carousel — separate from header */}
      <div className={styles.carouselWrapper}>
        <div className={styles.stage}>
          <div className={styles.orbit} ref={orbitRef}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`${styles.card} ${i === active ? styles.cardActive : styles.cardInactive}`}
                style={getCardStyle(i, active)}
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                aria-label={`Visa ${project.name}`}
              >
                <div className={styles.cardInner}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="260px"
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardPlan}>{project.plan}</span>
                    <span className={styles.cardName}>{project.name}</span>
                    <span className={styles.cardMeta}>
                      {project.industry} · {project.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow buttons — inside stage for correct positioning */}
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => advance(-1)} aria-label="Föregående projekt">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => advance(1)} aria-label="Nästa projekt">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Active card info — below stage */}
        <div className={styles.activeInfo}>
          <div className={styles.activeProject}>
            <span className={styles.activePlan}>{activeProject.plan}</span>
            <span className={styles.activeName}>{activeProject.name}</span>
            <span className={styles.activeMeta}>
              {activeProject.industry} · {activeProject.city}
            </span>
          </div>
          <a href="#" className={styles.viewBtn}>
            Se projektet
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Navigation dots — below activeInfo */}
        <div className={styles.dots}>
          {projects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Gå till projekt ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/projekt" className={styles.allProjects}>
            Se alla projekt →
          </Link>
        </div>
      </div>
    </section>
  );
}
