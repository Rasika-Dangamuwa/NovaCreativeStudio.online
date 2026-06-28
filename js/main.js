/* ============================================================
   NOVA CREATIVE STUDIO — Main Script
   ============================================================ */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const backTop   = document.getElementById('backTop');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  /* ---- Navbar scroll effect + back-to-top visibility ---- */
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backTop.classList.toggle('visible', y > 420);
    highlightActiveNav(y);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Active nav link ---- */
  function highlightActiveNav(scrollY) {
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ---- Mobile menu ---- */
  function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', () => {
    closeMenu();
  }));

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Back to top ---- */
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll-reveal animations (lightweight AOS replacement) ---- */
  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          aosObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ---- Service cards: stagger delay on mobile (single column) ---- */
  function setServiceDelays() {
    const cards = document.querySelectorAll('.service-card');
    if (window.innerWidth < 768) {
      cards.forEach((card, i) => {
        card.style.transitionDelay = (i * 0.08) + 's';
      });
    } else {
      cards.forEach(card => { card.style.transitionDelay = ''; });
    }
  }

  window.addEventListener('resize', setServiceDelays, { passive: true });
  setServiceDelays();

  /* ---- Trigger initial scroll check (for page refresh mid-page) ---- */
  onScroll();

})();
