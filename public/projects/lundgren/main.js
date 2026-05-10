/* =============================================
   Lundgren Fastigheter — ELITE
   main.js v2 — All animations and interactions
   ============================================= */

'use strict';

/* ─────────────────────────────────────────────
   SAFE INIT — wait for DOM + mark js-ready
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initGSAP();
  initCursor();
  initNavbar();
  initHero();
  initScrollReveal();
  initServices();
  initStaggeredGrid();
  initHorizontalScroll();
  initStats();
  initEditorialParallax();
  initMagneticButtons();
  initReducedMotion();
});

/* ─────────────────────────────────────────────
   1. LENIS SMOOTH SCROLL
   ───────────────────────────────────────────── */
let lenis;

function initLenis() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  window.__lenis = lenis;
}

/* ─────────────────────────────────────────────
   2. GSAP REGISTER PLUGINS
   ───────────────────────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  const plugins = [];
  if (typeof ScrollTrigger !== 'undefined') plugins.push(ScrollTrigger);
  if (typeof SplitText !== 'undefined') plugins.push(SplitText);
  if (plugins.length) gsap.registerPlugin(...plugins);
}

/* ─────────────────────────────────────────────
   3. CUSTOM CURSOR
   ───────────────────────────────────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorLabel) gsap.set(cursorLabel, { x: mouseX, y: mouseY });
  });

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(() => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      gsap.set(cursor, { x: curX, y: curY });
    });
  }

  // Hover states
  document.querySelectorAll('a, button, [data-cursor-hover], .lcard, .svc-row, .btn').forEach((el) => {
    const label = el.dataset.cursorLabel || '';
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      if (label && cursorLabel) {
        cursorLabel.textContent = label;
        cursorLabel.classList.add('is-visible');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      if (cursorLabel) cursorLabel.classList.remove('is-visible');
    });
  });

  document.querySelectorAll('.nav__link, .footer__link').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
  });
}

/* ─────────────────────────────────────────────
   4. NAVBAR — scroll behavior
   ───────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('nav');
  if (!navbar) return;

  let lastScrollY = 0;

  const onScroll = (scroll) => {
    navbar.classList.toggle('is-scrolled', scroll > 40);
    if (scroll > lastScrollY && scroll > 120) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }
    lastScrollY = scroll;
  };

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  } else {
    window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  }
}

/* ─────────────────────────────────────────────
   5. HERO — SplitText H1 + element stagger
   ───────────────────────────────────────────── */
function initHero() {
  const heroH1 = document.getElementById('heroH1');
  const heroEls = document.querySelectorAll('.hero [data-anim]:not(#heroH1)');

  if (typeof gsap === 'undefined') {
    // No GSAP — show everything immediately
    if (heroH1) heroH1.classList.add('visible');
    heroEls.forEach((el) => el.classList.add('visible'));
    return;
  }

  // SplitText on hero H1
  // CSS hides heroH1 via [data-anim]{opacity:0} — gsap.to overrides via inline style
  if (heroH1 && typeof SplitText !== 'undefined') {
    document.fonts.ready.then(() => {
      heroH1.style.opacity = '1'; // clear CSS opacity so SplitText chars are visible
      heroH1.style.transform = 'none';
      const split = new SplitText(heroH1, { type: 'chars,words' });
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 0.6, stagger: 0.028, ease: 'power3.out', delay: 0.25 }
      );
    });
  } else if (heroH1) {
    // gsap.to overrides CSS opacity:0 with inline opacity:1
    gsap.to(heroH1, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.25 });
  }

  // Other hero elements — gsap.to sets inline opacity:1 overriding CSS opacity:0
  if (heroEls.length) {
    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      delay: 0.7,
    });
  }

  // Hero bg parallax
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg && typeof ScrollTrigger !== 'undefined') {
    gsap.to(heroBg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

/* ─────────────────────────────────────────────
   6. SCROLL REVEAL — [data-anim] via IntersectionObserver
   ───────────────────────────────────────────── */
function initScrollReveal() {
  const allAnimEls = document.querySelectorAll('[data-anim]');
  const nonHero = Array.from(allAnimEls).filter((el) => !el.closest('.hero'));

  if (!nonHero.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger siblings by index
        const siblings = Array.from((el.parentElement || document.body).children);
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 70}ms`;
        el.classList.add('visible');
        observer.unobserve(el);
      });
    },
    { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
  );

  nonHero.forEach((el) => observer.observe(el));

  // SplitText on major section headings
  if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const splitTargets = document.querySelectorAll(
      '.about__heading, .services__heading, .objekt__heading, .cta__heading, .statement__text'
    );
    document.fonts.ready.then(() => {
      splitTargets.forEach((el) => {
        const split = new SplitText(el, { type: 'chars,words' });
        gsap.from(split.chars, {
          opacity: 0,
          y: '100%',
          duration: 0.45,
          stagger: 0.018,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });
    });
  }
}

/* ─────────────────────────────────────────────
   7. SERVICES — cursor-follow image + stagger reveal
   ───────────────────────────────────────────── */
function initServices() {
  const svcRows = document.querySelectorAll('.svc-row');
  const svcImg = document.getElementById('svcImg');

  if (svcImg && svcRows.length && window.matchMedia('(pointer: fine)').matches && typeof gsap !== 'undefined') {
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.09;
      cy += (my - cy) * 0.09;
      gsap.set(svcImg, { x: cx, y: cy });
    });

    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
      servicesSection.addEventListener('mouseenter', () => {
        svcImg.style.display = 'block';
      });
      servicesSection.addEventListener('mouseleave', () => {
        gsap.to(svcImg, { opacity: 0, scale: 0.88, duration: 0.3, ease: 'power2.out' });
      });
    }

    svcRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        gsap.to(svcImg, { opacity: 1, scale: 1, rotate: -2, duration: 0.45, ease: 'power3.out' });
      });
      row.addEventListener('mouseleave', () => {
        gsap.to(svcImg, { opacity: 0, scale: 0.88, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // GSAP stagger reveal of rows
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.svc-row', {
      opacity: 0,
      y: 24,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.services__list', start: 'top 82%' },
    });
  }
}

/* ─────────────────────────────────────────────
   8. STAGGERED GRID — parallax on each image
   ───────────────────────────────────────────── */
function initStaggeredGrid() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.sg__item[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax);
    gsap.to(el, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/* ─────────────────────────────────────────────
   9. HORIZONTAL SCROLL — Objekt listings
   ───────────────────────────────────────────── */
function initHorizontalScroll() {
  const section = document.getElementById('hScroll');
  if (!section) return;

  if (window.innerWidth <= 768) {
    // Mobile: natural overflow-x scroll
    const sticky = section.querySelector('.hs__sticky');
    if (sticky) {
      sticky.style.position = 'relative';
      sticky.style.height = 'auto';
      sticky.style.overflowX = 'auto';
      sticky.style.paddingBottom = '1.5rem';
    }
    return;
  }

  const sticky = section.querySelector('.hs__sticky');
  const track = section.querySelector('.hs__track');
  if (!sticky || !track) return;

  let distance = 0;
  let sectionTop = 0;

  const measure = () => {
    const trackWidth = track.scrollWidth;
    const viewWidth = sticky.clientWidth;
    distance = Math.max(0, trackWidth - viewWidth + 80);
    section.style.height = `${distance + window.innerHeight}px`;
    sectionTop = section.getBoundingClientRect().top + window.scrollY;
  };

  const onScroll = () => {
    const scrolled = window.scrollY - sectionTop;
    const progress = Math.max(0, Math.min(1, scrolled / distance));
    track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
  };

  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); onScroll(); });
}

/* ─────────────────────────────────────────────
   10. STATS COUNTER
   ───────────────────────────────────────────── */
function initStats() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const duration = 1800;
        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
  });
}

/* ─────────────────────────────────────────────
   11. EDITORIAL BREAK PARALLAX
   ───────────────────────────────────────────── */
function initEditorialParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const editorialBg = document.getElementById('editorialBg');
  if (editorialBg) {
    gsap.to(editorialBg, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.editorial',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

/* ─────────────────────────────────────────────
   12. MAGNETIC BUTTONS
   ───────────────────────────────────────────── */
function initMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('[data-magnetic]').forEach((wrap) => {
    const btn = wrap.querySelector('.btn');
    if (!btn) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.to(btn, {
        x: (e.clientX - cx) * 0.22,
        y: (e.clientY - cy) * 0.22,
        duration: 0.35,
        ease: 'power2.out',
      });
    });

    wrap.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}

/* ─────────────────────────────────────────────
   13. REDUCED MOTION OVERRIDE
   ───────────────────────────────────────────── */
function initReducedMotion() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof gsap !== 'undefined') gsap.globalTimeline.clear();
  if (lenis) lenis.destroy();
  // CSS @media (prefers-reduced-motion) already forces opacity:1 via !important
}
