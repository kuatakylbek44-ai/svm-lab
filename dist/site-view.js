(() => {
  const root = document.documentElement;
  let theme;
  try {
    theme = localStorage.getItem('ml-theme');
  } catch (e) {}
  root.dataset.theme = theme === 'dark' || theme === 'light'
    ? theme
    : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const lang = root.lang || 'kk';
  const labels = lang === 'ru'
    ? ['Тёмный режим', 'Светлый режим', 'На весь экран', 'Выйти из полного экрана', 'Назад']
    : lang === 'en'
      ? ['Dark mode', 'Light mode', 'Full screen', 'Exit full screen', 'Back']
      : ['Қараңғы режим', 'Жарық режим', 'Толық экран', 'Толық экраннан шығу', 'Артқа'];

  const pageFile = location.pathname.split('/').pop() || 'index.html';
  const page = pageFile.replace(/\.(ru|en)(?:\.html)?$/, '').replace(/\.html$/, '') || 'index';
  const suffix = lang === 'ru' ? '.ru.html' : lang === 'en' ? '.en.html' : '.html';
  const backTargets = {
    course: 'index',
    lecture: 'course',
    practice: 'course',
    sroj: 'course',
    svm: 'course',
    penguins: 'course',
    autompg: 'course',
    unsupervised: 'course',
    imbalanced: 'course',
    iris: 'index'
  };

  function sameTab() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    });
  }

  let sameTabQueued = false;
  function scheduleSameTab() {
    if (sameTabQueued) return;
    sameTabQueued = true;
    requestAnimationFrame(() => {
      sameTabQueued = false;
      sameTab();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.lesson-hero')) document.body.classList.add('lesson-page');
    if (document.querySelector('.course-hero')) document.body.classList.add('course-page');

    const header = document.querySelector('.header-inner') || document.querySelector('.topbar');
    if (header) {
      if (page !== 'index') {
        const back = document.createElement('a');
        back.className = 'back-button';
        back.href = page === 'iris-model' ? 'index' + suffix + '#topics' : (backTargets[page] || 'index') + suffix;
        back.setAttribute('aria-label', labels[4]);
        back.title = labels[4];
        back.innerHTML = '<span aria-hidden="true">←</span>';
        header.prepend(back);
      }

      const controls = document.createElement('div');
      controls.className = 'view-controls';
      const toggle = document.createElement('button');
      const full = document.createElement('button');
      toggle.type = full.type = 'button';
      controls.append(toggle, full);
      header.append(controls);

      function sync() {
        const dark = root.dataset.theme === 'dark';
        toggle.textContent = dark ? '☀' : '☾';
        toggle.title = toggle.ariaLabel = labels[dark ? 1 : 0];
        toggle.setAttribute('aria-pressed', String(dark));
        full.textContent = document.fullscreenElement ? '⤢' : '⛶';
        full.title = full.ariaLabel = labels[document.fullscreenElement ? 3 : 2];
        full.setAttribute('aria-pressed', String(!!document.fullscreenElement));
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = dark ? '#101d19' : '#f4f5ef';
      }

      toggle.onclick = () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem('ml-theme', root.dataset.theme);
        } catch (e) {}
        sync();
      };

      full.onclick = async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await root.requestFullscreen();
        } catch (e) {
          full.title = lang === 'kk'
            ? 'Толық экран үшін F11 басыңыз'
            : lang === 'ru'
              ? 'Нажмите F11 для полного экрана'
              : 'Press F11 for full screen';
          let notice = document.querySelector('.view-notice');
          if (!notice) {
            notice = document.createElement('div');
            notice.className = 'view-notice';
            notice.setAttribute('role', 'status');
            document.body.append(notice);
          }
          notice.textContent = full.title;
          setTimeout(() => notice.remove(), 5000);
        }
      };

      document.addEventListener('fullscreenchange', sync);
      sync();
    }

    sameTab();
    if ('MutationObserver' in window) {
      new MutationObserver(scheduleSameTab).observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  });
})();
