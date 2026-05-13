/* ============================================
   ANIMATIONS.JS — Sedin Hotel PRO
   GSAP ScrollTrigger + SplitText
   Körs efter main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ── SplitText Heading Reveals ────────────
  document.querySelectorAll('[data-split-heading]').forEach(el => {
    const split = new SplitText(el, { type: 'lines,words' });
    gsap.from(split.words, {
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      }
    });
  });

  // ── Section Reveal: stagger children ─────
  gsap.utils.toArray('[data-gsap-reveal]').forEach(section => {
    const children = section.querySelectorAll('[data-gsap-child]');
    if (!children.length) return;
    gsap.from(children, {
      opacity: 0,
      y: 30,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
      }
    });
  });

  // ── Parallax Hero Image ───────────────────
  const heroParallax = document.querySelector('.hero__bg .img-placeholder');
  if (heroParallax) {
    gsap.to(heroParallax, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      }
    });
  }

  // ── Room cards stagger ────────────────────
  const roomCards = document.querySelectorAll('.room-card, .rooms-overview-card');
  if (roomCards.length) {
    gsap.from(roomCards, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: roomCards[0].closest('section') || roomCards[0].parentElement,
        start: 'top 80%',
      }
    });
  }

  // ── Stats CountUp ─────────────────────────
  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = +el.dataset.countTo;
    const suffix = el.dataset.suffix || '';
    let triggered = false;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString('sv-SE');
          },
          onComplete: () => {
            el.textContent = target.toLocaleString('sv-SE') + suffix;
          }
        });
      }
    });
  });

  // ── Parallax section images ───────────────
  gsap.utils.toArray('.is-parallax').forEach(img => {
    gsap.to(img, {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.parallax-wrap') || img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      }
    });
  });

  // ── Magnetic Buttons ──────────────────────
  document.querySelectorAll('.btn-magnetic-wrap').forEach(wrap => {
    const btn = wrap.querySelector('.btn');
    if (!btn) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.22;
      const dy = (e.clientY - cy) * 0.22;
      gsap.to(btn, { x: dx, y: dy, duration: 0.1, ease: 'power2.out' });
    });

    wrap.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ── Fade line — sektion-dividers ──────────
  gsap.utils.toArray('.section-divider').forEach(line => {
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
      }
    });
  });

});
