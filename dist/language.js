(function () {
  'use strict';
  const languages = ['kk', 'ru', 'en'];
  const current = languages.includes(document.documentElement.lang) ? document.documentElement.lang : 'kk';
  const url = new URL(location.href);
  const explicit = url.pathname.match(/\.(ru|en)(?:\.html)?$/);
  let saved = null;
  try { saved = localStorage.getItem('ml-lab-language'); } catch (_) {}
  const requested = url.searchParams.get('lang');
  const selected = languages.includes(requested) ? requested : explicit ? explicit[1] : languages.includes(saved) ? saved : current;
  function languageURL(lang) {
    const next = new URL(location.href);
    const filename = next.pathname.split('/').pop() || 'index.html';
    // Static hosting may redirect .html pages to extensionless URLs.
    const base = filename.replace(/\.html$/, '').replace(/\.(ru|en)$/, '');
    if (!['index', 'course', 'lecture', 'sroj', 'practice', 'topic-lab', 'week11', 'svm', 'iris', 'iris-model', 'penguins', 'autompg', 'unsupervised', 'imbalanced'].includes(base)) return next.href;
    const target = base + (lang === 'kk' ? '' : '.' + lang) + '.html';
    next.pathname = next.pathname.slice(0, next.pathname.lastIndexOf('/') + 1) + target;
    next.searchParams.delete('lang');
    return next.href;
  }
  try { localStorage.setItem('ml-lab-language', selected); } catch (_) {}
  if (selected !== current) { location.replace(languageURL(selected)); return; }
  function addSwitcher() {
    const host = document.querySelector('.header-inner') || document.querySelector('.topbar');
    if (!host) return;
    const switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', {kk:'Сайт тілі',ru:'Язык сайта',en:'Site language'}[current]);
    const labels = {kk:['ҚАЗ','Қазақша'],ru:['РУС','Русский'],en:['ENG','English']};
    languages.forEach(lang => {
      const link = document.createElement('a');
      link.href = languageURL(lang); link.textContent = labels[lang][0];
      link.title = labels[lang][1]; link.setAttribute('aria-label',labels[lang][1]);
      link.lang = lang; link.hreflang = lang;
      if (lang === current) link.setAttribute('aria-current', 'true');
      link.addEventListener('click', () => {
        link.href = languageURL(lang);
        try { localStorage.setItem('ml-lab-language', lang); } catch (_) {}
      });
      switcher.append(link);
    });
    const anchor = host.querySelector('.course-label') || host.querySelector('.top-actions');
    host.insertBefore(switcher, anchor);
  }
  // Recompute links after opening another profile or lesson section.
  window.addEventListener('hashchange', () => {
    document.querySelectorAll('.language-switch a').forEach(link => { link.href = languageURL(link.hreflang); });
  });
  document.addEventListener('DOMContentLoaded', addSwitcher, {once:true});
})();
