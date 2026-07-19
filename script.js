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

const main = document.querySelector('main');
const footer = document.querySelector('.site-footer');
const menuToggle = document.querySelector('.ma-menu-toggle');
const mobileMenu = document.querySelector('#ma-mobile-menu');
const menuClose = mobileMenu?.querySelector('[data-menu-close]');
const contactModal = document.querySelector('#contact-modal');
const contactCloseButtons = [...document.querySelectorAll('[data-contact-close]')];
let lastMenuFocus = null;
let lastModalFocus = null;

if (mobileMenu && 'inert' in HTMLElement.prototype) mobileMenu.inert = true;
if (contactModal && 'inert' in HTMLElement.prototype) contactModal.inert = true;

function getFocusable(container) {
  if (!container) return [];
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => !element.hasAttribute('hidden') && element.offsetParent !== null);
}

function updatePageInert() {
  const overlayOpen = mobileMenu?.classList.contains('is-open') || contactModal?.classList.contains('is-open');
  if ('inert' in HTMLElement.prototype) {
    if (main) main.inert = Boolean(overlayOpen);
    if (footer) footer.inert = Boolean(overlayOpen);
  }
}

function updateScrollLock() {
  const menuOpen = Boolean(mobileMenu?.classList.contains('is-open'));
  const modalOpen = Boolean(contactModal?.classList.contains('is-open'));
  document.body.classList.toggle('menu-open', menuOpen);
  document.body.classList.toggle('modal-open', modalOpen);
  updatePageInert();
}

function openMenu() {
  if (!mobileMenu || !menuToggle) return;
  closeContactModal({ restoreFocus: false });
  lastMenuFocus = document.activeElement;
  if ('inert' in HTMLElement.prototype) mobileMenu.inert = false;
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  updateScrollLock();
  window.requestAnimationFrame(() => (menuClose || getFocusable(mobileMenu)[0])?.focus());
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!mobileMenu || !menuToggle) return;
  const wasOpen = mobileMenu.classList.contains('is-open');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  if ('inert' in HTMLElement.prototype) mobileMenu.inert = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  updateScrollLock();
  if (restoreFocus && wasOpen) {
    (lastMenuFocus instanceof HTMLElement ? lastMenuFocus : menuToggle).focus();
  }
}

function openContactModal(trigger = null) {
  if (!contactModal) return;
  const menuWasOpen = Boolean(mobileMenu?.classList.contains('is-open'));
  closeMenu({ restoreFocus: false });
  lastModalFocus = trigger || document.activeElement;
  if ('inert' in HTMLElement.prototype) contactModal.inert = false;
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  updateScrollLock();
  window.setTimeout(() => {
    const preferred = contactModal.querySelector('input[name="name"]');
    (preferred || getFocusable(contactModal)[0])?.focus({ preventScroll: true });
  }, menuWasOpen ? 320 : 40);
}

function closeContactModal({ restoreFocus = true } = {}) {
  if (!contactModal) return;
  const wasOpen = contactModal.classList.contains('is-open');
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  if ('inert' in HTMLElement.prototype) contactModal.inert = true;
  updateScrollLock();
  if (restoreFocus && wasOpen && lastModalFocus instanceof HTMLElement) {
    lastModalFocus.focus();
  }
}

menuToggle?.addEventListener('click', () => {
  if (mobileMenu?.classList.contains('is-open')) closeMenu();
  else openMenu();
});

menuClose?.addEventListener('click', () => closeMenu());

mobileMenu?.querySelectorAll('[data-menu-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.hasAttribute('data-contact-open')) {
      event.preventDefault();
      openContactModal(link);
      return;
    }
    closeMenu({ restoreFocus: false });
  });
});

document.querySelectorAll('[data-contact-open]').forEach((trigger) => {
  if (mobileMenu?.contains(trigger)) return;
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openContactModal(trigger);
  });
});

contactCloseButtons.forEach((button) => {
  button.addEventListener('click', () => closeContactModal());
});

function trapFocus(event, container) {
  if (event.key !== 'Tab') return;
  const focusable = getFocusable(container);
  if (!focusable.length) {
    event.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (contactModal?.classList.contains('is-open')) {
      closeContactModal();
      return;
    }
    if (mobileMenu?.classList.contains('is-open')) closeMenu();
  }

  if (contactModal?.classList.contains('is-open')) {
    trapFocus(event, contactModal);
  } else if (mobileMenu?.classList.contains('is-open')) {
    trapFocus(event, mobileMenu);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu({ restoreFocus: false });
});

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

const navLinks = [...document.querySelectorAll('[data-nav-link][href^="#"]')];
const observedSections = [...new Set(
  navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
)];

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

// V7 interactive lighting for the redesigned post-hero sections.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.vip-service, .vip-case').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

// V8 editorial interactions for post-hero sections.
const editorialServicePanels = [...document.querySelectorAll('.mae-service-panel')];
const editorialServiceCurrent = document.querySelector('[data-service-current]');

if (editorialServicePanels.length) {
  const editorialServiceObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      editorialServicePanels.forEach((panel) => panel.classList.toggle('is-active', panel === active.target));
      if (editorialServiceCurrent) editorialServiceCurrent.textContent = active.target.dataset.service || '01';
    },
    { threshold: [0.22, 0.42, 0.62], rootMargin: '-18% 0px -24% 0px' }
  );
  editorialServicePanels.forEach((panel) => editorialServiceObserver.observe(panel));
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.mae-service-panel, .mae-work-card').forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      panel.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}
