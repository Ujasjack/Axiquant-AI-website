/* =============================================================
   main.js — AxiQuant AI  |  2 themes: dark + light
   This file runs on EVERY page. It is the single source of
   truth for theme management.
============================================================= */
(function () {
  'use strict';

  /* ── Step 1: Apply theme IMMEDIATELY before anything renders ──
     This prevents flash of wrong theme on page load.
     We set data-theme on <html> right away.              */
  var saved = localStorage.getItem('axq-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  /* ── Step 2: CSS variable sets per theme ── */
  var VARS = {
    dark: {
      '--primary-navy':    '#0d1b2e',
      '--primary-gold':    '#e8a87c',
      '--accent-blue':     '#4f8ef7',
      '--accent-teal':     '#2dd4bf',
      '--text-primary':    '#eaf1ff',
      '--text-secondary':  '#7ea3cc',
      '--text-tertiary':   '#3d5a7a',
      '--bg-primary':      '#070d18',
      '--bg-secondary':    '#0d1421',
      '--bg-card':         'rgba(11,20,38,0.85)',
      '--border-color':    'rgba(79,142,247,0.18)',
      '--border-hover':    'rgba(79,142,247,0.42)',
      '--shadow-glow':     '0 0 32px rgba(79,142,247,0.18)',
      '--shadow-card':     '0 8px 32px rgba(0,0,0,0.45)'
    },
    light: {
      '--primary-navy':    '#1e3a8a',
      '--primary-gold':    '#b45309',
      '--accent-blue':     '#1d4ed8',
      '--accent-teal':     '#0891b2',
      '--text-primary':    '#0a1628',
      '--text-secondary':  '#1e3a6e',
      '--text-tertiary':   '#4a6a9a',
      '--bg-primary':      '#eef3ff',
      '--bg-secondary':    '#e2eaff',
      '--bg-card':         'rgba(255,255,255,0.92)',
      '--border-color':    'rgba(29,78,216,0.18)',
      '--border-hover':    'rgba(29,78,216,0.45)',
      '--shadow-glow':     '0 0 32px rgba(29,78,216,0.14)',
      '--shadow-card':     '0 8px 32px rgba(29,78,216,0.10)'
    }
  };

  function applyTheme(name) {
    /* Clamp to only 2 valid options */
    if (name !== 'dark' && name !== 'light') name = 'dark';

    var vars = VARS[name];
    var root = document.documentElement;

    /* Set the data-theme attribute — CSS selectors use this */
    root.setAttribute('data-theme', name);

    /* Also set CSS custom properties directly so they override
       anything style.css sets via [data-theme] selectors     */
    Object.keys(vars).forEach(function (k) {
      root.style.setProperty(k, vars[k]);
    });

    /* Save preference */
    localStorage.setItem('axq-theme', name);

    /* Update icon in toggle button */
    var icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = name === 'light' ? '☀️' : '🌙';

    /* Mark active button */
    document.querySelectorAll('.theme-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === name);
    });
  }

  /* Apply immediately (vars on root before DOMContentLoaded) */
  applyTheme(saved);

  /* ── Step 3: Wire up UI after DOM is ready ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Remove ocean/warm/midnight options that old style.css may add */
    ['ocean', 'warm', 'midnight'].forEach(function (t) {
      document.querySelectorAll('.theme-option[data-theme="' + t + '"]')
        .forEach(function (el) { el.remove(); });
    });

    /* Re-apply to make sure UI reflects saved theme */
    applyTheme(localStorage.getItem('axq-theme') || 'dark');

    /* Theme toggle button */
    var toggleBtn = document.getElementById('theme-toggle');
    var themeDrop = document.getElementById('theme-dropdown');

    if (toggleBtn && themeDrop) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        themeDrop.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        if (themeDrop) themeDrop.classList.remove('open');
      });
      themeDrop.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.querySelectorAll('.theme-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyTheme(btn.dataset.theme);
          themeDrop.classList.remove('open');
        });
      });
    }

    /* Live Demos dropdown */
    var demosBtn = document.getElementById('demos-toggle');
    var demosDrop = document.getElementById('demos-dropdown');
    if (demosBtn && demosDrop) {
      demosBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        demosDrop.classList.toggle('open');
        demosBtn.setAttribute('aria-expanded', demosDrop.classList.contains('open'));
      });
      document.addEventListener('click', function () {
        if (demosDrop) demosDrop.classList.remove('open');
      });
      demosDrop.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    /* Mobile menu */
    var mobileBtn = document.querySelector('.mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('open');
        mobileMenu.setAttribute('aria-hidden', !open);
        mobileBtn.setAttribute('aria-expanded', open);
      });
    }

    /* EmailJS */
    if (typeof emailjs !== 'undefined') {
      emailjs.init('ttowYJCftsKzoSAGO');
    }

    /* Contact form */
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        emailjs.sendForm('service_8iub6d9', 'template_6zzmzpm', form)
          .then(function () {
            if (btn) btn.textContent = 'Sent! ✓';
            form.reset();
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
            alert('Error. Please email info@axiquantai.com directly.');
          });
      });
    }

  }); /* end DOMContentLoaded */

})();
