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
  const data = window.COURSE_DATA;
  const host = document.getElementById('practiceWeeks');
  if (!data || !host) return;
  const idx = { kk: 0, ru: 1, en: 2 }[data.lang];
  const pick = value => Array.isArray(value) ? value[idx] : value;
  const L = data.labels[data.lang];
  const filesWord = { kk: 'файл', ru: 'файла', en: 'files' }[data.lang];
  const weekLabel = week => ({ kk: `${week}-апта`, ru: `${week}-я неделя`, en: `Week ${week}` })[data.lang];
  host.innerHTML = data.practice.map(item => {
    const content = window.PRACTICE_CONTENT && window.PRACTICE_CONTENT[item.n] ? window.PRACTICE_CONTENT[item.n][data.lang] : null;
    const details = [weekLabel(item.n)];
    if (content) details.push(`${content.minutes} ${L.min}`, `${content.files.length} ${filesWord}`);
    return `<a class="practice-card practice-week-card" href="practice${suffix}.html?n=${item.n}"><span class="idx">${String(item.n).padStart(2, '0')}</span><span><b>${pick(item.title)}</b><small>${pick(item.summary)}</small><em class="practice-card-meta">${details.join(' · ')}</em></span><span class="go">↗</span></a>`;
  }).join('');
})();
