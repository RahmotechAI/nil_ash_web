/* ─── Sticky Nav ─────────────────────────────────────────── */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
})();

/* ─── Active Nav Link ────────────────────────────────────── */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0];
    if (linkFile === path || (path === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ─── Scroll Reveal ──────────────────────────────────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();

/* ─── Mobile Hamburger ───────────────────────────────────── */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');
  if (!hamburger || !mobileNav || !overlay) return;

  function openNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
})();

/* ─── Smooth Scroll ──────────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
