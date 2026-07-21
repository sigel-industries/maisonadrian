(() => {
  'use strict';

  const MEASUREMENT_ID = 'G-N6YCH3NG3V';
  const STORAGE_KEY = 'ma-analytics-consent-v1';
  const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const ANALYTICS_COOKIE_AGE = 395 * 24 * 60 * 60;

  const translations = {
    en: {
      label: 'Analytics preferences',
      text: 'We use optional analytics to understand what works on this website. It loads only after you allow it.',
      details: 'Details',
      reject: 'Reject',
      accept: 'Allow analytics',
      settings: 'Cookie settings',
      privacyUrl: '/en/privacy/'
    },
    sk: {
      label: 'Nastavenie analytiky',
      text: 'Používame voliteľnú analytiku, aby sme vedeli, čo na tomto webe funguje. Spustí sa až po vašom súhlase.',
      details: 'Podrobnosti',
      reject: 'Odmietnuť',
      accept: 'Povoliť analytiku',
      settings: 'Nastavenie cookies',
      privacyUrl: '/sk/ochrana-sukromia/'
    },
    cs: {
      label: 'Nastavení analytiky',
      text: 'Používáme volitelnou analytiku, abychom věděli, co na tomto webu funguje. Spustí se až po vašem souhlasu.',
      details: 'Podrobnosti',
      reject: 'Odmítnout',
      accept: 'Povolit analytiku',
      settings: 'Nastavení cookies',
      privacyUrl: '/cs/ochrana-soukromi/'
    }
  };

  const langCode = (document.documentElement.lang || document.body?.dataset.locale || 'en')
    .toLowerCase()
    .slice(0, 2);
  const copy = translations[langCode] || translations.en;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  // Basic Consent Mode v2: defaults are queued locally, but Google's tag is not
  // downloaded and no analytics request is sent until the visitor opts in.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  let analyticsLoaded = false;
  let banner = null;

  function readConsent() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!stored || !['granted', 'denied'].includes(stored.value) || !Number.isFinite(stored.updatedAt)) {
        return null;
      }
      if (Date.now() - stored.updatedAt > CONSENT_MAX_AGE) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return stored.value;
    } catch (_) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        value,
        updatedAt: Date.now(),
        version: 1
      }));
    } catch (_) {
      // The current page still respects the choice even when storage is blocked.
    }
  }

  function grantAnalyticsConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function denyAnalyticsConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    grantAnalyticsConsent();
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', false);
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: ANALYTICS_COOKIE_AGE,
      cookie_update: true
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    script.dataset.maAnalytics = 'true';
    document.head.appendChild(script);
  }

  function removeAnalyticsCookies() {
    const cookieNames = document.cookie
      .split(';')
      .map((item) => item.split('=')[0].trim())
      .filter((name) => name === '_ga' || name.startsWith('_ga_'));

    const host = window.location.hostname;
    const domains = ['', host, `.${host}`, '.maisonadriano.com'];

    cookieNames.forEach((name) => {
      domains.forEach((domain) => {
        const domainPart = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax; Secure`;
      });
    });
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('is-visible');
    banner.setAttribute('aria-hidden', 'true');
  }

  function showBanner({ focus = false } = {}) {
    if (!banner) return;
    banner.setAttribute('aria-hidden', 'false');
    window.requestAnimationFrame(() => {
      banner.classList.add('is-visible');
      if (focus) banner.querySelector('[data-consent-reject]')?.focus({ preventScroll: true });
    });
  }

  function saveChoice(value) {
    const previous = readConsent();
    writeConsent(value);

    if (value === 'granted') {
      loadAnalytics();
      hideBanner();
      return;
    }

    denyAnalyticsConsent();
    removeAnalyticsCookies();
    hideBanner();

    // Fully unload an already-running Google tag after consent is withdrawn.
    if (analyticsLoaded || previous === 'granted') {
      window.setTimeout(() => window.location.reload(), 120);
    }
  }

  function createBanner() {
    banner = document.createElement('section');
    banner.className = 'ma-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', copy.label);
    banner.setAttribute('aria-hidden', 'true');
    banner.innerHTML = `
      <p class="ma-consent__text">
        ${copy.text}
        <a href="${copy.privacyUrl}">${copy.details}</a>
      </p>
      <div class="ma-consent__actions">
        <button class="ma-consent__button ma-consent__button--secondary" type="button" data-consent-reject>${copy.reject}</button>
        <button class="ma-consent__button ma-consent__button--primary" type="button" data-consent-accept>${copy.accept}</button>
      </div>`;

    banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => saveChoice('denied'));
    banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => saveChoice('granted'));
    document.body.appendChild(banner);
  }

  function addSettingsControls() {
    document.querySelectorAll('.footer-links, .legal-footer nav').forEach((container) => {
      if (container.querySelector('[data-cookie-settings]')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ma-cookie-settings-link';
      button.dataset.cookieSettings = '';
      button.textContent = copy.settings;
      button.addEventListener('click', () => showBanner({ focus: true }));
      container.appendChild(button);
    });
  }

  function trackEvent(name, parameters = {}) {
    if (readConsent() !== 'granted') return;
    loadAnalytics();
    window.gtag('event', name, parameters);
  }

  function bindMeasurementEvents() {
    document.addEventListener('click', (event) => {
      const contactTrigger = event.target.closest('[data-contact-open]');
      if (contactTrigger) {
        trackEvent('contact_open', {
          page_language: langCode,
          trigger_location: contactTrigger.closest('header') ? 'header' : 'page'
        });
      }

      const emailLink = event.target.closest('a[href^="mailto:"]');
      if (emailLink) {
        trackEvent('contact_email_click', { page_language: langCode });
      }

      const languageLink = event.target.closest('[data-language]');
      if (languageLink?.dataset.language) {
        trackEvent('language_select', {
          from_language: langCode,
          to_language: languageLink.dataset.language
        });
      }
    });
  }

  function init() {
    createBanner();
    addSettingsControls();
    bindMeasurementEvents();

    const consent = readConsent();
    if (consent === 'granted') {
      loadAnalytics();
    } else if (!consent) {
      showBanner();
    }
  }

  window.maCookieConsent = {
    open: () => showBanner({ focus: true }),
    status: () => readConsent()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
