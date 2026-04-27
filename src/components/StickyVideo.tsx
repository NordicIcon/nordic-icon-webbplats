'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StickyVideo.module.css';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    num: '01',
    heading: 'Vi designar inte templates.',
    body: 'Varje sajt byggs från din brief. Ingen mall. Ingen genväg.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="10" y1="11" x2="22" y2="11" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="16" x2="22" y2="16" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="21" x2="17" y2="21" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    heading: 'Varje kund pratar med oss.',
    body: 'Inte ett callcenter. Du pratar med Max eller Rasmus.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="12" cy="10" r="4" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M4 26c0-4.418 3.582-8 8-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="10" r="4" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M20 18c4.418 0 8 3.582 8 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    heading: 'Klart på 14–30 dagar.',
    body: 'Eller pengarna tillbaka. Vi sätter ett datum och håller det.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="4" y="6" width="24" height="22" rx="3" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="4" y1="13" x2="28" y2="13" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="10" y1="4" x2="10" y2="9" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="22" y1="4" x2="22" y2="9" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 18l2 2 4-3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const particles = Array.from({ length: 50 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 1.5 + 0.5,
      speedY:  -(Math.random() * 0.4 + 0.1),
      speedX:  (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.15 + 0.05,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', setSize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

export default function StickyVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const right   = rightRef.current;
    if (!section || !right) return;

    const ctx = gsap.context(() => {
      const blocks = right.querySelectorAll('[data-statement]');
      blocks.forEach((block, i) => {
        const icon = block.querySelector('[data-icon]');
        if (icon) {
          gsap.fromTo(icon,
            { opacity: 0, y: 10 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
        gsap.fromTo(
          block,
          { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: icon ? 0.1 : 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Left: sticky video placeholder */}
      <div className={styles.left}>
        <div className={styles.videoWrap}>
          <div className={styles.videoBg}>
            <ParticleCanvas />
            <div className={styles.videoGlow} aria-hidden />
            <div className={styles.leftContent}>
              <div className={styles.videoLabel}>
                <span className={styles.videoLabelInner}>KLING VIDEO</span>
                <span className={styles.videoSubLabel}>
                  Abstract code and design elements — dark blue tones, cinematic.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: scrolling statements */}
      <div className={styles.right} ref={rightRef}>
        {statements.map((s, i) => (
          <div key={i} data-statement className={styles.statement}>
            <div data-icon className={styles.statementIcon}>{s.icon}</div>
            <span className={styles.statementNum}>{s.num}</span>
            <h3 className={styles.statementHeading}>{s.heading}</h3>
            <p className={styles.statementBody}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
