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

  heroNav.querySelectorAll('a').forEach((link) => {
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
