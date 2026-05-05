(function () {
  const forms = document.querySelectorAll('.validated-form');
  if (!forms.length) return;

  forms.forEach(form => {
    const successMsg = form.closest('.form-section')?.querySelector('.form-success');

    function validateField(field) {
      const wrapper = field.closest('.form-group');
      if (!wrapper) return true;
      const errorEl = wrapper.querySelector('.error-msg');

      const isEmpty = !field.value.trim();
      const isInvalidEmail = field.type === 'email' && field.value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      if (isEmpty) {
        wrapper.classList.add('error');
        if (errorEl) errorEl.textContent = field.dataset.error || 'This field is required.';
        return false;
      }

      if (isInvalidEmail) {
        wrapper.classList.add('error');
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        return false;
      }

      wrapper.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }

    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        const wrapper = field.closest('.form-group');
        if (wrapper && wrapper.classList.contains('error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let allValid = true;

      requiredFields.forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (allValid) {
        form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        form.style.opacity = '0';
        form.style.transform = 'translateY(-12px)';

        setTimeout(() => {
          form.style.display = 'none';
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.style.animation = 'heroFadeUp 0.6s ease forwards';
          }
        }, 420);
      }
    });
  });
})();
