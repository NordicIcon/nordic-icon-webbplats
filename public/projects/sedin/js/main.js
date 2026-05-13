/* ============================================
   MAIN.JS — Sedin Hotel PRO
   Lenis + GSAP + Navbar + Shared Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Lenis Smooth Scroll ──────────────────
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

  // ── Navbar Scroll Behavior ───────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScrollY = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('is-scrolled', scrollY > 20);
      if (scrollY > lastScrollY && scrollY > 80) {
        navbar.classList.add('is-hidden');
      } else {
        navbar.classList.remove('is-hidden');
      }
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Active nav link ──────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.startsWith(href) && href !== '/') {
      link.classList.add('is-active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('is-active');
    }
  });

  // ── Intersection Observer Fallback ───────
  // Körs för element som inte hanteras av GSAP
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // ── Room Gallery — Drag, Touch & Arrows ──
  const trackWrap = document.getElementById('rooms-track-wrap');
  const prevBtn   = document.getElementById('rooms-prev');
  const nextBtn   = document.getElementById('rooms-next');

  if (trackWrap) {
    const STEP = 384; // card width (360) + gap (24)

    // Mouse drag
    let isDragging = false;
    let startX, scrollStart;

    trackWrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = trackWrap.scrollLeft;
      trackWrap.style.scrollBehavior = 'auto';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      trackWrap.style.scrollBehavior = 'smooth';
    });

    trackWrap.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      trackWrap.scrollLeft = scrollStart - (e.pageX - startX);
    });

    // Prevent click-through on cards after drag
    trackWrap.addEventListener('click', (e) => {
      if (Math.abs(trackWrap.scrollLeft - scrollStart) > 4) e.preventDefault();
    }, true);

    // Arrow buttons
    if (prevBtn) prevBtn.addEventListener('click', () => {
      trackWrap.style.scrollBehavior = 'smooth';
      trackWrap.scrollLeft -= STEP;
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      trackWrap.style.scrollBehavior = 'smooth';
      trackWrap.scrollLeft += STEP;
    });
  }

});
