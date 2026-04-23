/* ==========================================================
   mirazhossain.com — shared JS
   Theme toggle · reveal animations · rotating tags
   ========================================================== */

// ---------- THEME ----------
(function initTheme() {
  const saved = localStorage.getItem('miraz-theme');
  if (saved === 'dark' || saved === 'light') {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let next;
  if (current === 'dark') next = 'light';
  else if (current === 'light') next = 'dark';
  else next = prefersDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('miraz-theme', next);
}

function injectThemeToggle() {
  if (document.querySelector('.theme-toggle')) return;
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.innerHTML = `
    <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>`;
  btn.addEventListener('click', toggleTheme);
  document.body.appendChild(btn);
}

// ---------- REVEAL ON SCROLL ----------
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => obs.observe(el));
}
// Allow async-injected content (blog posts, folder pages) to get the reveal animation.
window.__reInitReveal = initReveal;

// ---------- ROTATING TAG WIDGET ----------
function initRotatingTags() {
  const box = document.querySelector('.rotating-tag-box');
  if (!box) return;
  const items = Array.from(box.querySelectorAll('.rotating-tag-item'));
  if (!items.length) return;
  let idx = 0;
  items[0].classList.add('is-active');
  setInterval(() => {
    const current = items[idx];
    idx = (idx + 1) % items.length;
    const next = items[idx];
    current.classList.remove('is-active');
    current.classList.add('is-leaving');
    next.classList.add('is-active');
    setTimeout(() => current.classList.remove('is-leaving'), 700);
  }, 1800);
}

// ---------- LIGHTBOX (Recognition awards) ----------
function initLightbox() {
  const cards = document.querySelectorAll('.award-card[data-full]');
  const box = document.getElementById('lightbox');
  if (!cards.length || !box) return;
  const img   = box.querySelector('.lightbox-img');
  const cap   = box.querySelector('.lightbox-cap');
  const close = box.querySelector('.lightbox-close');

  function open(card) {
    if (card.querySelector('.is-placeholder')) return;
    const imgEl = card.querySelector('img');
    if (!imgEl) return;
    const src   = card.getAttribute('data-full');
    const badge = card.querySelector('.award-badge');
    const note  = card.querySelector('.award-note');
    img.src = src;
    img.alt = imgEl.alt || '';
    cap.textContent = [badge && badge.textContent.trim(), note && note.textContent.trim()].filter(Boolean).join(' — ');
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeBox() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.src = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => open(card));
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });
  close.addEventListener('click', closeBox);
  box.addEventListener('click', e => { if (e.target === box) closeBox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBox(); });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  injectThemeToggle();
  initReveal();
  initRotatingTags();
  initLightbox();
});
