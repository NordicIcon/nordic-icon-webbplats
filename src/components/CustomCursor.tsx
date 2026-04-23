'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Don't run on touch devices */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      dot.style.transform  = `translate(${mx - 5}px, ${my - 5}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="button"]')) {
        ring.classList.add(styles.ringHoverLink);
        ring.classList.remove(styles.ringHoverText);
      } else if (target.closest('p, h1, h2, h3, h4')) {
        ring.classList.add(styles.ringHoverText);
        ring.classList.remove(styles.ringHoverLink);
      }
    };

    const onLeave = () => {
      ring.classList.remove(styles.ringHoverLink, styles.ringHoverText);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden />
      <div ref={ringRef} className={styles.ring} aria-hidden />
    </>
  );
}
