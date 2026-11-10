(() => {
  'use strict';
  const suffix = { kk: '', ru: '.ru', en: '.en' }[document.documentElement.lang] || '';
  document.querySelectorAll('.lecture-row').forEach((row, i) => {
    const link = document.createElement('a');
    link.className = 'lecture-row';
    link.href = `lecture${suffix}.html?n=${i + 1}`;
    link.innerHTML = row.innerHTML;
    row.replaceWith(link);
  });
  document.querySelectorAll('.sroj-item').forEach((item, i) => {
    const link = document.createElement('a');
    link.className = 'sroj-item';
    link.href = `sroj${suffix}.html?n=${i + 1}`;
    link.innerHTML = item.innerHTML;
    item.replaceWith(link);
  });
})();
