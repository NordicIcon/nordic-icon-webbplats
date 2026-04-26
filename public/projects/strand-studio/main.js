/* ============================================================
   Strand Studio — main.js
   Nordic Icon BAS | Vanilla JS only — no GSAP, no Lenis
   ============================================================ */

'use strict';

/* ─── NAVBAR SCROLL BEHAVIOR ────────────────────────────────── */
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });
};

/* ─── MOBILE NAV ─────────────────────────────────────────────── */
const initMobileNav = () => {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('nav-mobile');
  const close     = document.getElementById('nav-close');
  if (!hamburger || !overlay) return;

  const open  = () => { overlay.classList.add('is-open');  document.body.style.overflow = 'hidden'; };
  const close_ = () => { overlay.classList.remove('is-open'); document.body.style.overflow = ''; };

  hamburger.addEventListener('click', open);
  if (close) close.addEventListener('click', close_);

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close_);
  });
};

/* ─── INTERSECTION OBSERVER — SCROLL REVEALS ─────────────────── */
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const siblings = Array.from(entry.target.parentElement.children)
        .filter(el => el.hasAttribute('data-animate'));
      const index = siblings.indexOf(entry.target);

      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

/* ─── COUNTER ANIMATION ──────────────────────────────────────── */
const initCounters = () => {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  counters.forEach(el => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);

      const target = parseInt(el.dataset.countTo, 10);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(el);
  });
};

/* ─── FAQ ACCORDION ──────────────────────────────────────────── */
const initFaq = () => {
  const triggers = document.querySelectorAll('.faq-trigger');
  if (!triggers.length) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      triggers.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const answer = b.nextElementSibling;
        if (answer) answer.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });
};

/* ─── ACTIVE NAV LINK ────────────────────────────────────────── */
const initActiveNav = () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      link.style.color = 'var(--text)';
    }
  });
};

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initCounters();
  initFaq();
  initActiveNav();
});
