(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.masonry-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!tabs.length || !items.length) return;

  /* ─── Filter ─────────────────────────────────────────── */
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  /* ─── Lightbox ───────────────────────────────────────── */
  let currentIndex = 0;

  function visibleItems() {
    return [...items].filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    const visible = visibleItems();
    if (!visible.length) return;
    currentIndex = Math.max(0, Math.min(index, visible.length - 1));
    const img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxPrev.style.display = visible.length > 1 ? 'flex' : 'none';
    lightboxNext.style.display = visible.length > 1 ? 'flex' : 'none';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navigateLightbox(dir) {
    const visible = visibleItems();
    currentIndex = (currentIndex + dir + visible.length) % visible.length;
    const img = visible[currentIndex].querySelector('img');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      const visible = visibleItems();
      const visibleIndex = visible.indexOf(item);
      openLightbox(visibleIndex);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  });
})();
