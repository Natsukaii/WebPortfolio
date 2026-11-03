(() => {
const root = document.documentElement;
if (root.dataset.portfolioInitialized) return;
root.dataset.portfolioInitialized = 'true';

root.classList.remove('no-js');
root.classList.add('js');

const englishTranslations = {
  'meta.title': 'Samier Nicolas — Game Design & Dev',
  'meta.description': 'Samier Nicolas portfolio — creative developer designing and building distinctive digital experiences.',
  'meta.og-description': 'I design and develop games.',
  'loader.label': 'Loading the site',
  'brand.home': 'Samier Nicolas, home',
  'nav.label': 'Main navigation',
  'nav.start': 'Home',
  'nav.work': 'Work',
  'nav.lab': 'Lab',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'header.availability': 'Available for projects',
  'language.label': 'Choose language',
  'language.french': 'Switch to French',
  'language.english': 'Switch to English',
  'menu.open': 'Open menu',
  'menu.close': 'Close menu',
  'hero.eyebrow': 'Independent portfolio · France',
  'hero.greeting': 'Hello, my name is',
  'hero.title-one': 'I design',
  'hero.title-two': '& develop',
  'hero.title-three': 'digital <i>experiences</i><span class="orange-period">.</span>',
  'hero.description': 'Designer at heart, developer by passion.<br>I turn ideas into digital experiences.',
  'hero.discover': 'Discover my projects',
  'hero.scroll': 'SCROLL TO EXPLORE',
  'work.eyebrow': '02 / Selected work',
  'work.title': 'Selected <i>work</i><span class="orange-period">.</span>',
  'work.description': 'A few selected projects, crafted with<br>curiosity and care.',
  'project.nord.label': 'Atelier Nord project, branding and website',
  'project.nord.caption': 'HOMEWARE · 2025',
  'project.nord.type': 'Branding · E-commerce',
  'project.meteore.label': 'Météore project, identity and digital experience',
  'project.meteore.subtitle': 'THE TASTE OF MOVEMENT',
  'project.meteore.caption': 'IDENTITY &amp; DIGITAL · 2024',
  'project.meteore.type': 'Art direction · Web',
  'project.solaire.label': 'Maison Solaire project, editorial website',
  'project.solaire.tagline': 'SOUTHERN ROOTS',
  'project.solaire.caption': 'ART OF LIVING · 2024',
  'project.solaire.type': 'Editorial · Development',
  'project.forme.label': 'Studio Forme project, digital tool',
  'project.forme.caption': 'CREATIVE TOOL · 2023',
  'project.forme.type': 'Concept · Development',
  'work.cta.question': 'Have a project in mind?',
  'work.cta.action': 'Let’s talk',
  'lab.eyebrow': '03 / Experiments',
  'lab.title': 'The <i>lab</i><span class="orange-period">.</span>',
  'lab.description': 'A playground for ideas<br>that don’t wait for a brief.',
  'lab.item-one.title': 'Micro-interactions',
  'lab.item-one.description': 'Small details make all the difference.',
  'lab.item-one.year': 'IN PROGRESS',
  'lab.item-two.title': 'Procedural generation',
  'lab.item-two.description': 'Shapes, code, and a little randomness.',
  'lab.item-three.title': 'Creative web &amp; 3D',
  'lab.item-three.description': 'Exploring new dimensions.',
  'lab.footnote': 'Always under construction — like every good idea.',
  'about.title': 'About',
  'about.code-label': 'Samier Nicolas introduced in code format',
  'about.code.comment-one': '// I turn ideas into games.',
  'about.code.comment-two': '// From concept to gameplay, I build every step.',
  'about.code.role': "'Game Designer &amp; developer'",
  'about.code.project-one': "'2026': 'Dordogne game DLC'",
  'about.code.project-two': "'2026': 'Summer Wars — 2.5D platformer'",
  'about.code.project-three': "'2025': 'Ahantzi — Visual Novel'",
  'about.code.education': "'To be completed': 'Education details to be added'",
  'about.code.skills-one': "'Game Design', 'Unreal Engine', 'Unity',",
  'about.code.skills-two': "'Visual Novel', '2.5D'",
  'contact.eyebrow': '05 / Your turn',
  'contact.title': 'Shall we<br>make something<br><i>together?</i>',
  'footer.made-with': 'Made with intention <span class="footer-heart">♥</span> &amp; coffee',
  'footer.back-top': 'Back to top ↑'
};

const frenchText = new Map();
document.querySelectorAll('[data-i18n]').forEach((element) => {
  frenchText.set(element.dataset.i18n, element.innerHTML);
});

const frenchAttributes = new Map();
document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
  element.dataset.i18nAttr.split(',').forEach((translation) => {
    const [attribute, key] = translation.trim().split(':');
    if (!frenchAttributes.has(key)) frenchAttributes.set(key, new Map());
    frenchAttributes.get(key).set(element, { attribute, value: element.getAttribute(attribute) });
  });
});

const languageButtons = [...document.querySelectorAll('[data-language]')];
const menuToggle = document.querySelector('.menu-toggle');
const frenchDynamicTranslations = { 'menu.close': 'Fermer le menu' };
const translate = (key, language = root.lang) => {
  if (language === 'en') return englishTranslations[key] || frenchText.get(key);
  const attributeEntry = frenchAttributes.get(key)?.values().next().value;
  return frenchText.get(key) || attributeEntry?.value || frenchDynamicTranslations[key];
};

const getPreferredLanguage = () => {
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  if (requestedLanguage === 'fr' || requestedLanguage === 'en') return requestedLanguage;

  try {
    const savedLanguage = window.localStorage.getItem('portfolio-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') return savedLanguage;
  } catch (error) {
    // Language selection still works when browser storage is unavailable.
  }

  return navigator.language && navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr';
};

const applyLanguage = (language) => {
  const selectedLanguage = language === 'en' ? 'en' : 'fr';
  root.lang = selectedLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const message = translate(key, selectedLanguage);
    if (message) element.innerHTML = message;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(',').forEach((translation) => {
      const [attribute, key] = translation.trim().split(':');
      const frenchValue = frenchAttributes.get(key)?.get(element)?.value;
      const message = selectedLanguage === 'en' ? englishTranslations[key] : frenchValue;
      if (message) element.setAttribute(attribute, message);
    });
  });

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  if (menuToggle) {
    const menuLabel = menuToggle.getAttribute('aria-expanded') === 'true' ? 'menu.close' : 'menu.open';
    menuToggle.setAttribute('aria-label', translate(menuLabel, selectedLanguage));
  }
};

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.language;
    applyLanguage(language);
    try {
      window.localStorage.setItem('portfolio-language', language);
    } catch (error) {
      // The selected language remains active for the current page view.
    }
  });
});

applyLanguage(getPreferredLanguage());

const loader = document.querySelector('.loader');
if (loader) {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      loader.setAttribute('aria-hidden', 'true');
    }, 350);
  }, { once: true });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const navigation = document.querySelector('.main-navigation');
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', translate(isOpen ? 'menu.open' : 'menu.close'));
    navigation.classList.toggle('is-open', !isOpen);
    root.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', translate('menu.open'));
      navigation.classList.remove('is-open');
      root.classList.remove('menu-open');
    });
  });
}

const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-34% 0px -55% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

const canTilt = window.matchMedia('(pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canTilt) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
    element.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
})();