// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.setAttribute('aria-hidden', String(isOpen));
    menu.classList.toggle('nav-mobile-menu--open', !isOpen);
    toggle.classList.toggle('nav-mobile-toggle--open', !isOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove('nav-mobile-menu--open');
      toggle.classList.remove('nav-mobile-toggle--open');
    }
  });

  // Scroll-aware nav
  const nav = document.getElementById('site-nav');
  let lastY = 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (y > 80) {
      nav.classList.add('site-nav--scrolled');
    } else {
      nav.classList.remove('site-nav--scrolled');
    }
    lastY = y;
  }, { passive: true });
})();
