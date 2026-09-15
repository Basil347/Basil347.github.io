/* Progressive enhancement: all portfolio content and links work without JavaScript. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#nav-links');
  const mobile = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeToggle = document.querySelector('.theme-toggle');
  let savedTheme;
  try { savedTheme = localStorage.getItem('basil-theme'); } catch (_) {}

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0b1423' : '#f5f8ff';
  }

  // Dark is the default; only an explicit saved choice of light overrides it.
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    // Private browsing or blocked storage must not prevent switching themes.
    try { localStorage.setItem('basil-theme', theme); } catch (_) {}
  });

  function closeMenu(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }

  toggle.hidden = false;
  header.classList.add('menu-ready');

  // The header is fixed, so the page reserves its height as padding. Measure the
  // rendered height rather than trusting the token: it shifts with the breakpoint,
  // the text size and the browser zoom.
  const syncHeaderSpace = () => {
    const height = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-space', height + 'px');
  };
  syncHeaderSpace();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeaderSpace).observe(header);
  else window.addEventListener('resize', syncHeaderSpace);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasMobileOpen = mobile.matches && toggle.getAttribute('aria-expanded') === 'true';
    closeMenu();
    // Move keyboard focus out of the collapsed menu to the selected section.
    if (wasMobileOpen) {
      const destination = document.querySelector(link.getAttribute('href'));
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  header.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
  });
  mobile.addEventListener('change', () => {
    const hiddenFocusedLink = mobile.matches && navigation.contains(document.activeElement);
    closeMenu(hiddenFocusedLink);
  });

  document.querySelector('#current-year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    // Enhance the navigation with the section currently in view.
    const links = [...navigation.querySelectorAll('a')];
    const activeSections = new Map();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => activeSections.set(entry.target.id, entry.isIntersecting));
      const current = links.find((link) => activeSections.get(link.hash.slice(1)));
      links.forEach((link) => {
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]:not(#home)').forEach((section) => sectionObserver.observe(section));

    if (!reducedMotion.matches) {
      const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !reducedMotion.matches) {
            entry.target.classList.add('is-entering');
            entry.target.addEventListener('animationend', () => entry.target.classList.remove('is-entering'), { once: true });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach((element) => entranceObserver.observe(element));
    }
  }
})();
