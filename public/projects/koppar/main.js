/* ============================================
   KOPPAR KAFÉ — main.js
   Nordic Icon AB | PRO Plan
   Lenis + GSAP + ScrollTrigger + SplitText
   ============================================ */

'use strict';

// ── PROGRESSIVE ENHANCEMENT ─────────────────
// Must run FIRST — before any async code.
// CSS uses .js-loaded to hide elements;
// without this class everything is visible (no-JS, SEO, crawlers).
document.documentElement.classList.add('js-loaded');

// ── LENIS SMOOTH SCROLL ─────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

window.__lenis = lenis;

// ── GSAP SETUP ──────────────────────────────
gsap.registerPlugin(ScrollTrigger, SplitText);

// ── NAVBAR ──────────────────────────────────
const initNavbar = () => {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('is-scrolled', scrollY > 20);

    if (scrollY > lastScrollY && scrollY > 80) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }
    lastScrollY = scrollY;
  }, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
};

// ── HERO — SplitText + staggered reveal ─────
// Pattern: gsap.set() to pre-hide chars (since SplitText
// creates spans dynamically — can't pre-hide in CSS),
// then gsap.to() to animate in.
const initHero = () => {
  const heading = document.querySelector('[data-split-heading]');
  if (!heading) return;

  const split = new SplitText(heading, { type: 'chars,words' });

  // Pre-hide chars immediately after splitting
  gsap.set(split.chars, { opacity: 0, y: 40 });

  // Animate chars in letter-by-letter
  gsap.to(split.chars, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.025,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Hero [data-animate] items — CSS already hides them via .js-loaded.
  // Use gsap.to() to bring them in with stagger.
  const heroItems = document.querySelectorAll('.hero [data-animate]');
  gsap.to(heroItems, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 1.0,
    onComplete: () => {
      // Remove transition to avoid re-triggering IO observer animation
      heroItems.forEach((el) => el.classList.add('is-visible'));
    },
  });
};

// ── GSAP SECTION REVEALS ────────────────────
// CSS pre-hides [data-gsap-child] via .js-loaded.
// gsap.to() animates them to visible state.
const initGSAPReveals = () => {
  gsap.utils.toArray('[data-gsap-reveal]').forEach((section) => {
    const children = section.querySelectorAll('[data-gsap-child]');
    if (!children.length) return;

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });
  });
};

// ── PARALLAX IMAGE ──────────────────────────
const initParallax = () => {
  gsap.utils.toArray('.is-parallax').forEach((img) => {
    gsap.to(img, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
};

// ── STICKY PROCESS STEPS ────────────────────
const initProcess = () => {
  const steps = document.querySelectorAll('.process__step');
  if (!steps.length) return;

  const currentNumEl = document.getElementById('processCurrentStep');

  steps.forEach((step, i) => {
    const num = String(i + 1).padStart(2, '0');
    ScrollTrigger.create({
      trigger: step,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => activateStep(step, num),
      onEnterBack: () => activateStep(step, num),
    });
  });

  function activateStep(activeStep, num) {
    steps.forEach((s) => s.classList.remove('is-active'));
    activeStep.classList.add('is-active');
    if (currentNumEl) currentNumEl.textContent = num;
  }
};

// ── EDITORIAL BREAK QUOTE ───────────────────
// [data-animate] on the quote — IO handles it,
// but also do a GSAP reveal for smoother feel.
const initEditorialBreak = () => {
  const quote = document.querySelector('.editorial-break__quote');
  if (!quote) return;

  // Quote uses [data-animate] so CSS already hides it.
  // Override with a GSAP to() for smoother control.
  gsap.to(quote, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: quote,
      start: 'top 75%',
    },
    onStart: () => quote.classList.add('is-visible'),
  });
};

// ── STATS — Counter animation ───────────────
const initCounters = () => {
  document.querySelectorAll('[data-count-to]').forEach((el) => {
    const target = +el.dataset.countTo;
    let started = false;

    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
          return;
        }
        el.textContent = Math.floor(current);
      }, 16);
    }, { threshold: 0.5 }).observe(el);
  });
};

// ── STATS — GSAP reveal ─────────────────────
const initStatsReveal = () => {
  const grid = document.querySelector('.stats__grid');
  if (!grid) return;

  const items = grid.querySelectorAll('.stats__item');

  // Pre-hide with gsap.set (stats__item doesn't have data-gsap-child)
  gsap.set(items, { opacity: 0, y: 20 });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: grid,
      start: 'top 80%',
    },
  });
};

// ── CTA GLOW pulse ──────────────────────────
const initCtaGlow = () => {
  const glow = document.querySelector('.cta-section__glow');
  if (!glow) return;

  gsap.to(glow, {
    scale: 1.2,
    opacity: 0.1,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
};

// ── FALLBACK: Intersection Observer ─────────
// Handles all remaining [data-animate] elements
// that GSAP doesn't explicitly take over.
const initScrollAnimations = () => {
  // Exclude hero items (handled by initHero) and
  // editorial break quote (handled by initEditorialBreak).
  const elements = document.querySelectorAll(
    '[data-animate]:not(.hero [data-animate]):not(.editorial-break__quote)'
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el) => observer.observe(el));
};

// ── CONTACT FORM submit ──────────────────────
const initContactForm = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.textContent = 'Skickat';
      btn.disabled = true;
    }
  });
};

// ── INIT ALL ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initGSAPReveals();
  initParallax();
  initProcess();
  initEditorialBreak();
  initCounters();
  initStatsReveal();
  initCtaGlow();
  initScrollAnimations();
  initContactForm();
});
