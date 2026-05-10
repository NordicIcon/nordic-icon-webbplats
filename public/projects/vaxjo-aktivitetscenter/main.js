/* ============================================================
   Röda Tråden Aktivitetscenter — main.js
   Nordic Icon AB | BAS Plan
   Vanilla JS — Intersection Observer only. No GSAP. No Lenis.
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — Scroll effect + mobile toggle
   ============================================================ */
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('mobileNav');
  if (!navbar) return;

  // Scroll: add .is-scrolled class past 20px
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile toggle
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
};

/* ============================================================
   2. SCROLL ANIMATIONS — Intersection Observer
   Source: 03_SECTION_RECIPES.md BAS pattern
   ============================================================ */
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings: 80ms delay per index
      const siblings = Array.from(entry.target.parentElement.children);
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

/* ============================================================
   3. COUNTER ANIMATION — counts up on scroll enter
   Source: 03_SECTION_RECIPES.md Counter Animation
   ============================================================ */
const initCounters = () => {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  counters.forEach(el => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);

      const target = +el.dataset.countTo;
      const duration = 1200; // ms
      const steps = 60;
      const step = target / steps;
      const interval = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
          return;
        }
        el.textContent = Math.floor(current);
      }, interval);
    }, { threshold: 0.5 });

    observer.observe(el);
  });
};

/* ============================================================
   4. ACTIVE NAV LINK — highlight current page link
   ============================================================ */
const initActiveNav = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPath) {
      link.style.color = 'var(--accent)';
    }
  });
};

/* ============================================================
   5. SMOOTH SCROLL — for in-page anchor links (BAS native)
   ============================================================ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* ============================================================
   INIT — run everything on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounters();
  initActiveNav();
  initSmoothScroll();
});
