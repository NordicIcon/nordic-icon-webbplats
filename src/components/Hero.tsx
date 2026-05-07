'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import styles from './Hero.module.css';

/* Aurora blobs config */
const BLOBS = [
  { x: 0.25, y: 0.3,  r: 380, phase: 0,    speed: 0.00055, amp: 70,  color: 'rgba(27,58,107,0.13)' },
  { x: 0.75, y: 0.2,  r: 280, phase: 1.2,  speed: 0.00040, amp: 55,  color: 'rgba(41,98,185,0.08)' },
  { x: 0.5,  y: 0.65, r: 340, phase: 2.5,  speed: 0.00065, amp: 80,  color: 'rgba(100,149,237,0.06)' },
  { x: 0.15, y: 0.7,  r: 220, phase: 0.8,  speed: 0.00045, amp: 50,  color: 'rgba(27,58,107,0.09)' },
  { x: 0.85, y: 0.55, r: 260, phase: 3.8,  speed: 0.00050, amp: 60,  color: 'rgba(41,98,185,0.07)' },
];

/* Floating rings config */
const RINGS = [
  { size: 300, x: '8%',  y: '12%', delay: 0,   dur: 16 },
  { size: 160, x: '82%', y: '8%',  delay: 2.5, dur: 20 },
  { size: 200, x: '76%', y: '68%', delay: 1,   dur: 18 },
  { size: 100, x: '12%', y: '72%', delay: 3.5, dur: 22 },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const primaryRef   = useMagneticButton(0.28);
  const secondaryRef = useMagneticButton(0.22);

  /* Aurora canvas animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0;
    let rafId: number;

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Mutable positions */
    const blobs = BLOBS.map(b => ({ ...b, cx: b.x * window.innerWidth, cy: b.y * window.innerHeight }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        b.cx = b.x * w + Math.sin(t * b.speed + b.phase) * b.amp;
        b.cy = b.y * h + Math.cos(t * b.speed * 0.7 + b.phase) * b.amp;
        const g = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.cx, b.cy, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Aurora canvas */}
      <canvas ref={canvasRef} className={styles.aurora} aria-hidden />

      {/* Floating rings */}
      <div className={styles.floatingLayer} aria-hidden>
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className={styles.ring}
            style={{
              width:           ring.size,
              height:          ring.size,
              left:            ring.x,
              top:             ring.y,
              animationDelay:  `${ring.delay}s`,
              animationDuration:`${ring.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.label} variants={item}>
          Webbyrå · Sverige
        </motion.div>

        <motion.h1 className={styles.heading} variants={item}>
          Premium hemsidor
          <br />
          <span className={styles.glowText}>för svenska bolag.</span>
        </motion.h1>

        <motion.p className={styles.subtext} variants={item}>
          Animerade. Mobilanpassade. Premium utan kompromisser.
        </motion.p>

        <motion.div className={styles.ctas} variants={item}>
          <a
            ref={primaryRef as React.RefObject<HTMLAnchorElement>}
            href="/kontakt"
            className={`${styles.btn} ${styles.btnPrimary}`}
            data-cursor="button"
          >
            Boka ett möte
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
            href="/planer"
            className={`${styles.btn} ${styles.btnSecondary}`}
            data-cursor="button"
          >
            Se planer & priser
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
