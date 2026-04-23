/* ==========================================================
   Beyond-the-work folder renderer
   Prefers inline data (<script id="inline-beyond-data">),
   falls back to fetch() for development workflows.
   ========================================================== */

(function () {
  const slug = document.body.getAttribute('data-slug');
  if (!slug) return;

  function render(data) {
    const entry = data[slug];
    if (!entry) {
      const t = document.getElementById('b-title');
      if (t) t.textContent = 'Folder not found';
      return;
    }

    const bc = document.getElementById('bc-slug');
    if (bc) bc.textContent = entry.title;

    const icon = document.getElementById('b-icon');
    if (icon) icon.textContent = entry.icon || '•';
    const title = document.getElementById('b-title');
    if (title) title.innerHTML = entry.title;
    const sub = document.getElementById('b-subtitle');
    if (sub) sub.textContent = entry.subtitle || '';
    const intro = document.getElementById('b-intro');
    if (intro) intro.innerHTML = entry.intro || '';

    const host = document.getElementById('b-sections');
    if (!host) return;
    host.innerHTML = (entry.sections || []).map(function (s) {
      if (s.kind === 'memory') {
        return '<section class="beyond-memory reveal">' +
          '<p class="beyond-memory-label">' + (s.title || 'A memory') + '</p>' +
          '<blockquote class="beyond-memory-body">' + (s.body || '') + '</blockquote>' +
          '</section>';
      }
      var items = (s.items || []).map(function (it) {
        return '<li class="folder-entry">' +
          '<span class="folder-entry-text">' + (it.text || '') + '</span>' +
          (it.meta ? '<span class="folder-entry-meta">' + it.meta + '</span>' : '') +
          '</li>';
      }).join('');
      return '<section class="beyond-list reveal">' +
        '<h2 class="section-subtitle">' + (s.title || '') + '</h2>' +
        '<ul class="folder-list">' + items + '</ul>' +
        '</section>';
    }).join('');

    if (window.__reInitReveal) window.__reInitReveal();
  }

  // 1) Prefer inline data — works on any host, no fetch, no CORS, no MIME pain
  var inline = document.getElementById('inline-beyond-data');
  if (inline && inline.textContent) {
    try { render(JSON.parse(inline.textContent)); return; }
    catch (e) { /* fall through to fetch */ }
  }

  // 2) Fallback: fetch (useful during local development)
  fetch('../content/beyond.json')
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () {
      var t = document.getElementById('b-title');
      if (t) t.textContent = 'Could not load folder';
      var i = document.getElementById('b-intro');
      if (i) i.innerHTML = '<span style="color:var(--text3);font-family:DM Mono,monospace;font-size:12px;">Folder data unavailable. Check the browser console for details.</span>';
    });
})();
