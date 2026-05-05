(function () {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all open items
      items.forEach(other => {
        if (other.classList.contains('active')) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
