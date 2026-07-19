const intro = document.querySelector('#brand-intro');
const introDuration = 4200;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let introSeen = false;
try {
  introSeen = sessionStorage.getItem('ma-intro-seen') === '1';
} catch (_) {}

function markIntroSeen() {
  try {
    sessionStorage.setItem('ma-intro-seen', '1');
  } catch (_) {}
}

function finishIntro({ immediate = false } = {}) {
  document.body.classList.remove('intro-active');
  document.documentElement.classList.remove('skip-intro');
  if (!intro) return;

  if (immediate) {
    intro.remove();
    return;
  }

  intro.classList.add('is-finished');
  window.setTimeout(() => intro.remove(), 900);
}

if (reducedMotion || !intro || introSeen) {
  finishIntro({ immediate: true });
} else {
  markIntroSeen();
  window.setTimeout(() => finishIntro(), introDuration);
}

const menuToggle = document.querySelector('.ma-menu-toggle');
const heroNav = document.querySelector('.ma-hero-nav');

function setMenuState(isOpen) {
  if (!menuToggle || !heroNav) return;
  heroNav.classList.toggle('is-open', isOpen);
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
}

if (menuToggle && heroNav) {
  menuToggle.addEventListener('click', () => {
    setMenuState(!heroNav.classList.contains('is-open'));
  });

  heroNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuState(false);
  });
}

// Store explicit language selection and suppress the intro on the destination page.
document.querySelectorAll('[data-language]').forEach((link) => {
  link.addEventListener('click', () => {
    const language = link.dataset.language;
    if (!['cs', 'sk', 'en'].includes(language)) return;
    try {
      localStorage.setItem('ma-language', language);
      sessionStorage.setItem('ma-intro-seen', '1');
    } catch (_) {}
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.06, rootMargin: '0px 0px -2% 0px' }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('section-visible');
    });
  },
  { threshold: 0.05 }
);

document.querySelectorAll('.chapter').forEach((section) => chapterObserver.observe(section));

const progressBar = document.querySelector('.scroll-progress span');
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;

function updateScrollEffects() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (progressBar) progressBar.style.transform = `scaleX(${Math.min(1, scrollTop / scrollable)})`;

  if (!reducedMotion) {
    const viewportCenter = window.innerHeight / 2;
    parallaxItems.forEach((item) => {
      const factor = Number(item.dataset.parallax || 0);
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const offset = (itemCenter - viewportCenter) * factor;
      item.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });
  }
  ticking = false;
}

function requestScrollEffects() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScrollEffects, { passive: true });
window.addEventListener('resize', requestScrollEffects);
requestScrollEffects();

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.service-card, .work-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

const navLinks = [...document.querySelectorAll('.ma-hero-nav a[href^="#"]')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (observedSections.length) {
  const activeNavObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', active);
      });
    },
    { threshold: [0.2, 0.45, 0.7], rootMargin: '-18% 0px -55% 0px' }
  );
  observedSections.forEach((section) => activeNavObserver.observe(section));
}
