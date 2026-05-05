(function () {
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const wrapper = document.querySelector('.testimonials-wrapper');
  if (!track || !slides.length) return;

  let current = 0;
  let autoplay;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      stopAutoplay();
      startAutoplay();
    });
  });

  goTo(0);
  startAutoplay();
})();
