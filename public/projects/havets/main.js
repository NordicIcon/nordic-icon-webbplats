/**
 * HAVETS — main.js
 * Nordic Icon AB | PRO Plan
 * Lenis + GSAP + ScrollTrigger + SplitText
 */

'use strict';

// ============================================================
// 0. REDUCED MOTION CHECK
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// 1. LENIS SMOOTH SCROLL (PRO)
// ============================================================

let lenis;

if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Expose globally
  window.__lenis = lenis;
}

// ============================================================
// 2. GSAP SETUP
// ============================================================

gsap.registerPlugin(ScrollTrigger, SplitText);

// ============================================================
// 3. NAVBAR — scroll behavior
// ============================================================

const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Scrolled state
        navbar.classList.toggle('is-scrolled', scrollY > 20);

        // Hide on scroll down, show on scroll up (PRO)
        if (scrollY > lastScrollY && scrollY > 80) {
          navbar.classList.add('is-hidden');
        } else {
          navbar.classList.remove('is-hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
};

// ============================================================
// 4. MOBILE NAV TOGGLE
// ============================================================

const initMobileNav = () => {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  const close = document.getElementById('navClose');

  if (!toggle || !mobile) return;

  const openNav = () => {
    mobile.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeNav = () => {
    mobile.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  toggle.addEventListener('click', openNav);
  if (close) close.addEventListener('click', closeNav);

  // Close on link click
  mobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on outside click
  mobile.addEventListener('click', (e) => {
    if (e.target === mobile) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobile.classList.contains('is-open')) closeNav();
  });
};

// ============================================================
// 5. HERO ANIMATIONS — SplitText + stagger (PRO signature)
// ============================================================

const initHeroAnimations = () => {
  const heading = document.getElementById('heroHeading');
  const eyebrow = document.getElementById('heroEyebrow');
  const cta = document.getElementById('heroCta');
  const media = document.getElementById('heroMedia');

  if (!heading) return;

  if (prefersReducedMotion) {
    // Just show everything immediately
    [heading, eyebrow, cta].forEach(el => {
      if (el) { el.style.opacity = 1; el.style.transform = 'none'; }
    });
    return;
  }

  // Set initial states
  gsap.set(eyebrow, { opacity: 0, y: 16 });
  gsap.set(cta, { opacity: 0, y: 20 });

  // SplitText — split heading into chars
  const split = new SplitText(heading, { type: 'chars,words,lines' });

  // Set initial state for chars
  gsap.set(split.chars, { opacity: 0, y: '110%', rotateX: -40 });

  // Timeline: heading first, then eyebrow, then CTA
  const tl = gsap.timeline({ delay: 0.2 });

  tl.to(split.chars, {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    duration: 0.55,
    stagger: 0.03,
    ease: 'power3.out',
  })
  .to(eyebrow, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.3')
  .to(cta, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.5');

  // Hero media parallax on scroll
  if (media) {
    gsap.to(media, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero--fullscreen',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
};

// ============================================================
// 6. MARQUEE — GSAP smooth loop
// ============================================================

const initMarquee = () => {
  const track = document.getElementById('marqueeTrack');
  if (!track || prefersReducedMotion) return;

  // Calculate half-width for seamless loop
  gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    repeat: -1,
    duration: 32,
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => {
    gsap.getTweensOf(track).forEach(t => t.pause());
  });
  track.parentElement.addEventListener('mouseleave', () => {
    gsap.getTweensOf(track).forEach(t => t.resume());
  });
};

// ============================================================
// 7. IMAGE MARQUEE (VISUAL-D) — GSAP smooth loop
// ============================================================

const initImageMarquee = () => {
  const track = document.getElementById('imgMarqueeTrack');
  if (!track || prefersReducedMotion) return;

  gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    repeat: -1,
    duration: 44,
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => {
    gsap.getTweensOf(track).forEach(t => t.pause());
  });
  track.parentElement.addEventListener('mouseleave', () => {
    gsap.getTweensOf(track).forEach(t => t.resume());
  });
};

// ============================================================
// 8. GSAP SECTION REVEALS — stagger children
// ============================================================

const initGSAPReveals = () => {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('[data-gsap-reveal]').forEach(section => {
    const children = section.querySelectorAll('[data-gsap-child]');

    if (children.length > 0) {
      // Reveal children with stagger
      gsap.from(children, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });
    } else {
      // Reveal section itself
      gsap.from(section, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      });
    }
  });
};

// ============================================================
// 9. SCROLL ANIMATIONS — Intersection Observer (BAS fallback)
// ============================================================

const initScrollAnimations = () => {
  if (prefersReducedMotion) {
    // Show all immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.filter(s => s.hasAttribute('data-animate')).indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
};

// ============================================================
// 10. STICKY PROCESS — scroll-driven step switching
// ============================================================

class StickyProcess {
  constructor() {
    this.wrap = document.querySelector('.sticky-wrap');
    this.steps = document.querySelectorAll('.sticky-step');
    this.dots = document.querySelectorAll('.sticky-dot');
    if (!this.wrap || this.steps.length === 0) return;

    // Mobile: no sticky, show all
    if (window.innerWidth < 769) {
      this.steps.forEach(s => {
        s.classList.add('active');
        s.style.display = 'block';
      });
      return;
    }

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll(); // Initial call
  }

  onScroll() {
    const rect = this.wrap.getBoundingClientRect();
    const wrapHeight = this.wrap.offsetHeight;
    const viewportH = window.innerHeight;

    // Progress 0 → 1 as the wrap scrolls through viewport
    const scrolled = -rect.top;
    const total = wrapHeight - viewportH;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    const stepIndex = Math.min(
      this.steps.length - 1,
      Math.floor(progress * this.steps.length)
    );

    this.steps.forEach((s, i) => s.classList.toggle('active', i === stepIndex));
    this.dots.forEach((d, i) => d.classList.toggle('active', i === stepIndex));
  }
}

// ============================================================
// 11. ABOUT IMAGE — parallax scrub
// ============================================================

const initAboutParallax = () => {
  const img = document.getElementById('aboutImg');
  if (!img || prefersReducedMotion) return;

  const wrap = img.closest('.about-media-wrap');
  if (!wrap) return;

  gsap.to(img, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-split',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
};

// ============================================================
// 12. COUNTER ANIMATION — stats numbers
// ============================================================

const initCounters = () => {
  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = parseInt(el.dataset.countTo, 10);
    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);

      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };

      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(el);
  });
};

// ============================================================
// 13. FAQ ACCORDION (for contact/menu pages)
// ============================================================

const initFAQ = () => {
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      document.querySelectorAll('.faq-trigger').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const answer = b.nextElementSibling;
        if (answer) answer.classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });
};

// ============================================================
// 14. CONTACT FORM — basic submit handler
// ============================================================

const initContactForm = () => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Skickar...';
    btn.disabled = true;

    // Simulate submission — replace with real endpoint
    setTimeout(() => {
      btn.textContent = 'Tack — vi återkommer inom ett dygn.';
      btn.style.background = 'rgba(196, 149, 106, 0.2)';
      btn.style.color = 'var(--accent)';
      btn.style.border = '1px solid var(--accent)';

      // Reset after 5s
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.border = '';
        form.reset();
      }, 5000);
    }, 800);
  });
};

// ============================================================
// 15. INIT ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initHeroAnimations();
  initMarquee();
  initImageMarquee();
  initGSAPReveals();
  initScrollAnimations();
  initCounters();
  initFAQ();
  initContactForm();

  // Sticky process needs DOM ready
  new StickyProcess();

  // About parallax
  initAboutParallax();

  // Refresh ScrollTrigger after fonts load
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
});

// ============================================================
// 16. RESIZE HANDLER
// ============================================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
}, { passive: true });
