const intro = document.querySelector('#brand-intro');
const introDuration = 4200;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function finishIntro() {
  document.body.classList.remove('intro-active');
  if (!intro) return;
  intro.classList.add('is-finished');
  window.setTimeout(() => intro.remove(), 900);
}

if (reducedMotion || !intro) {
  finishIntro();
} else {
  window.setTimeout(finishIntro, introDuration);
}

const menuToggle = document.querySelector('.ma-menu-toggle');
const heroNav = document.querySelector('.ma-hero-nav');

if (menuToggle && heroNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = heroNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  heroNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      heroNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!heroNav.contains(event.target) && !menuToggle.contains(event.target)) {
      heroNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      heroNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Store explicit language selection. Root index will respect it on future visits.
document.querySelectorAll('[data-language]').forEach((link) => {
  link.addEventListener('click', () => {
    const language = link.dataset.language;
    if (['cs', 'sk', 'en'].includes(language)) {
      localStorage.setItem('ma-language', language);
    }
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
  { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('section-visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.chapter').forEach((section) => chapterObserver.observe(section));

// Subtle section progress and parallax. One animation frame per scroll, because browsers also deserve dignity.
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

// Pointer-following light on selected cards. Disabled on touch devices.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.service-card, .work-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

// Keep the desktop navigation state aligned with the currently visible chapter.
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
