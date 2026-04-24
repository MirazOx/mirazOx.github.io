/* ==========================================================
   Beyond-the-work folder renderer
   Loads content from content/beyond.json and renders a shared page shell.
   ========================================================== */

(function () {
  const slug = document.body.getAttribute('data-slug');
  const hero = document.body.getAttribute('data-hero');

  if (!slug) return;

  function sectionMarkup(section) {
    if (section.kind === 'memory') {
      return `
        <section class="beyond-memory reveal">
          <p class="beyond-memory-label">${section.title || 'A memory'}</p>
          <blockquote class="beyond-memory-body">${section.body || ''}</blockquote>
        </section>
      `;
    }

    const items = (section.items || []).map((item) => `
      <li class="folder-entry">
        <span class="folder-entry-text">${item.text || ''}</span>
        ${item.meta ? `<span class="folder-entry-meta">${item.meta}</span>` : ''}
      </li>
    `).join('');

    return `
      <section class="beyond-list reveal">
        <h2 class="section-subtitle">${section.title || ''}</h2>
        <ul class="folder-list">${items}</ul>
      </section>
    `;
  }

  function render(data) {
    const entry = data[slug];
    if (!entry) {
      const title = document.getElementById('b-title');
      const intro = document.getElementById('b-intro');
      if (title) title.textContent = 'Folder not found';
      if (intro) intro.textContent = 'This Beyond page could not find its matching content entry.';
      return;
    }

    const breadcrumbSlug = document.getElementById('bc-slug');
    const icon = document.getElementById('b-icon');
    const title = document.getElementById('b-title');
    const subtitle = document.getElementById('b-subtitle');
    const intro = document.getElementById('b-intro');
    const heroMedia = document.getElementById('b-hero-media');
    const heroMeta = document.getElementById('b-meta');
    const sectionsHost = document.getElementById('b-sections');
    const addLabel = document.getElementById('b-folder-label');

    if (breadcrumbSlug) breadcrumbSlug.textContent = entry.title;
    if (icon) icon.textContent = entry.icon || '•';
    if (title) title.innerHTML = entry.title || '';
    if (subtitle) subtitle.textContent = entry.subtitle || '';
    if (intro) intro.innerHTML = entry.intro || '';
    if (addLabel) addLabel.textContent = slug;

    if (heroMedia && hero) {
      heroMedia.style.backgroundImage = `url('${hero}')`;
    }

    if (heroMeta) {
      const listCount = (entry.sections || []).filter((section) => Array.isArray(section.items)).length;
      heroMeta.innerHTML = `
        <span class="beyond-meta-chip">${entry.icon || '•'} beyond the work</span>
        <span class="beyond-meta-chip">${(entry.sections || []).length} story blocks</span>
        <span class="beyond-meta-chip">${listCount} list sections</span>
      `;
    }

    if (sectionsHost) {
      sectionsHost.innerHTML = (entry.sections || []).map(sectionMarkup).join('');
    }

    if (window.__reInitReveal) window.__reInitReveal();
  }

  fetch('../content/beyond.json')
    .then((response) => response.json())
    .then(render)
    .catch(() => {
      const title = document.getElementById('b-title');
      const intro = document.getElementById('b-intro');
      if (title) title.textContent = 'Could not load folder';
      if (intro) {
        intro.innerHTML = '<span style="color:var(--text3);font-family:DM Mono,monospace;font-size:12px;">Folder data is unavailable right now.</span>';
      }
    });
})();
