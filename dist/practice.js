(() => {
  'use strict';
  const data = window.COURSE_DATA;
  const idx = { kk: 0, ru: 1, en: 2 }[data.lang];
  const pick = value => Array.isArray(value) ? value[idx] : value;
  const L = data.labels[data.lang];
  const suffix = { kk: '', ru: '.ru', en: '.en' }[data.lang] || '';
  const total = data.practice.length;
  const params = new URLSearchParams(location.search);
  const raw = parseInt(params.get('n'), 10);
  const filesWord = { kk: 'файл', ru: 'файла', en: 'files' }[data.lang];
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const weekLabel = week => ({ kk: `${week}-апта`, ru: `${week}-я неделя`, en: `Week ${week}` })[data.lang];
  const pageHref = n => `practice${suffix}.html?n=${n}`;
  const labHref = lab => {
    if (!lab) return '';
    if (/^https?:/i.test(lab)) return lab;
    return lab.replace(/\.html$/, `${suffix}.html`);
  };
  const kicker = document.getElementById('practiceKicker');
  const title = document.getElementById('practiceTitle');
  const lead = document.getElementById('practiceLead');
  const meta = document.getElementById('practiceMeta');
  const contentHost = document.getElementById('practiceContent');
  const nav = document.getElementById('practiceNav');

  const copyText = (text, button) => {
    const done = () => {
      button.textContent = L.copied;
      window.setTimeout(() => { button.textContent = L.copy; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        const area = document.createElement('textarea');
        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        done();
      });
    } else {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      done();
    }
  };

  const renderList = () => {
    document.title = `${L.practice} — ML LAB`;
    lead.textContent = L.practiceListLead;
    kicker.innerHTML = `<span>${L.practice.toUpperCase()} / ${String(total).padStart(2, '0')}</span><span class="badge">ML LAB · ${L.practiceAll.toUpperCase()}</span>`;
    meta.innerHTML = `<span><b>${total}</b> ${L.practiceWeek}</span><span><b>${total}</b> ${L.practice}</span><span class="lesson-ready"><i></i>${L.practiceReady}</span>`;
    const cards = data.practice.map(item => {
      const content = window.PRACTICE_CONTENT && window.PRACTICE_CONTENT[item.n] ? window.PRACTICE_CONTENT[item.n][data.lang] : null;
      const minutes = content ? `${content.minutes} ${L.min}` : '';
      const files = content ? `${content.files.length} ${filesWord}` : '';
      return `<a class="practice-card practice-week-card" href="${pageHref(item.n)}"><span class="idx">${String(item.n).padStart(2, '0')}</span><span><b>${esc(pick(item.title))}</b><small>${esc(pick(item.summary))}</small><em class="practice-card-meta">${esc(weekLabel(item.n))}${minutes ? ` · ${esc(minutes)}` : ''}${files ? ` · ${esc(files)}` : ''}</em></span><span class="go">↗</span></a>`;
    }).join('');
    contentHost.innerHTML = `<div class="course-section wrap"><div class="practice-grid practice-week-grid">${cards}</div><p class="practice-note">${esc(L.practiceListLead)}</p></div>`;
    nav.hidden = true;
  };

  if (!Number.isFinite(raw) || raw < 1 || raw > total) {
    renderList();
    return;
  }

  const n = raw;
  const item = data.practice.find(entry => entry.n === n);
  const content = window.PRACTICE_CONTENT && window.PRACTICE_CONTENT[n] ? window.PRACTICE_CONTENT[n][data.lang] : null;
  const num = String(n).padStart(2, '0');
  const itemTitle = pick(item.title);
  const itemSummary = pick(item.summary);
  const hasStarterLab = n <= 4;
  const guideId = { 1: 'intro', 2: 'pandas', 3: 'visualization', 4: 'preprocessing', 5: 'linear', 6: 'logistic', 7: 'evaluation', 8: 'svm', 9: 'penguins', 10: 'unsupervised', 11: 'neural' }[n];
  const labTitle = hasStarterLab ? pick(data.lectures.find(lecture => lecture.n === n).title) : itemTitle;
  document.title = `${hasStarterLab ? L.practiceLab : L.practice} ${num} — ${labTitle} · ML LAB`;
  title.textContent = labTitle;
  lead.textContent = itemSummary;
  kicker.innerHTML = `<span>${L.practice.toUpperCase()} ${num} / ${String(total).padStart(2, '0')}</span><span class="badge">${weekLabel(n).toUpperCase()}</span>`;
  meta.innerHTML = `<span><b>${weekLabel(n)}</b></span><span>${content ? `${content.minutes} ${L.min}` : L.pending}</span><span>${content ? `${content.files.length} ${filesWord}` : ''}</span><span class="lesson-ready"><i></i>${L.practiceReady}</span>`;

  if (!content) {
    contentHost.innerHTML = `<div class="course-section wrap"><p class="slot-empty">${L.pending}</p></div>`;
    nav.hidden = true;
    return;
  }

  const slots = [
    { id: 'goals', title: L.practiceGoals },
    { id: 'dataset', title: L.practiceDataset },
    { id: 'steps', title: L.practiceSteps },
    { id: 'code', title: L.practiceCode },
    { id: 'files', title: L.practiceFiles },
    { id: 'lab', title: L.practiceLab },
    { id: 'note', title: L.practiceNote }
  ];

  const tocOrder = hasStarterLab ? [slots[5], ...slots.slice(0, 5), slots[6]] : slots;
  const slotNumber = slot => String(tocOrder.indexOf(slot) + 1).padStart(2, '0');
  const slotHTML = (slot, inner) => `<section class="lesson-slot" id="${slot.id}"><div class="slot-head"><span>${slotNumber(slot)}</span><h2>${slot.title}</h2></div>${inner}</section>`;
  const goals = slotHTML(slots[0], `<ul class="goal-list">${content.goals.map(goal => `<li>${esc(goal)}</li>`).join('')}</ul>`);
  const dataset = slotHTML(slots[1], `<div class="practice-dataset"><div><b>${esc(content.dataset.name)}</b><p>${esc(content.dataset.detail)}</p></div><span>${esc(content.dataset.meta)}</span></div>`);
  const steps = slotHTML(slots[2], `<ol class="practice-steps">${content.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>`);
  const code = slotHTML(slots[3], `<p class="lesson-note">${esc(content.code.note)}</p><div class="code-card"><div class="code-bar"><span>${esc(content.code.title)}</span><button type="button" class="copy-btn">${L.copy}</button></div><pre><code>${esc(content.code.source)}</code></pre></div>`);
  const files = slotHTML(slots[4], `<div class="practice-files">${content.files.map(file => `<a class="practice-file" href="${esc(file.href)}" download><span class="practice-file-icon" aria-hidden="true">↓</span><span><b>${esc(file.label)}</b><small>${esc(file.meta)}</small></span></a>`).join('')}</div>`);
  const existingLab = content.lab
    ? `<a class="practice-lab-card" href="${esc(labHref(content.lab))}"><span><b>${L.practiceLab}</b><small>${esc(content.lab)}</small></span><span class="go">↗</span></a>`
    : '';
  const guide = window.TOPIC_GUIDE;
  const starter = hasStarterLab ? `<div id="starterLab"></div><details class="starter-explanation" open><summary>${guide.label}</summary><p>${esc(guide.text(guideId))}</p></details>` : '';
  const lab = slotHTML(slots[5], starter
    + existingLab + (!hasStarterLab && !existingLab ? `<p class="slot-empty">${esc(L.practiceNoLab)}</p>` : ''));
  const note = slotHTML(slots[6], `<p class="lesson-note">${esc(content.note)}</p>`);
  const chapters = hasStarterLab ? `<nav class="starter-chapters" aria-label="${L.practiceLab}">${data.lectures.slice(0, 4).map(lecture => `<a href="${pageHref(lecture.n)}"${lecture.n === n ? ' aria-current="page"' : ''}><span>${String(lecture.n).padStart(2, '0')}</span>${esc(pick(lecture.title))}</a>`).join('')}</nav>` : '';
  contentHost.innerHTML = `<div class="lesson-layout wrap"><aside class="lesson-toc practice-toc" aria-label="${esc(L.practice)}">${chapters}<span class="eyebrow">${L.practice.toUpperCase()}</span><div id="practiceToc"></div></aside><div class="lesson-body">${hasStarterLab ? lab + goals + dataset + steps + code + files + note : goals + dataset + steps + code + files + lab + note}</div></div>`;
  document.getElementById('practiceToc').innerHTML = tocOrder.map(slot => `<a href="#${slot.id}"><span>${slotNumber(slot)}</span>${slot.title}</a>`).join('');
  document.querySelector('.header-inner').append(guide.button([{ id: guideId, name: labTitle }]));
  if (hasStarterLab) {
    document.body.classList.add('starter-lab-page');
    window.mountStarterLab(document.getElementById('starterLab'), n);
    if (location.hash === '#lab') {
      requestAnimationFrame(() => document.getElementById('lab').scrollIntoView());
    }
  }

  const copyBtn = document.querySelector('.copy-btn');
  const codeEl = document.querySelector('.code-card code');
  if (copyBtn && codeEl) copyBtn.addEventListener('click', () => copyText(codeEl.textContent, copyBtn));

  const prev = data.practice.find(entry => entry.n === n - 1);
  const next = data.practice.find(entry => entry.n === n + 1);
  const prevHTML = prev ? `<a href="${pageHref(prev.n)}"><small>← ${L.prev}</small><b>${String(prev.n).padStart(2, '0')} · ${esc(pick(prev.title))}</b></a>` : '<span></span>';
  const nextHTML = next ? `<a class="next" href="${pageHref(next.n)}"><small>${L.next} →</small><b>${String(next.n).padStart(2, '0')} · ${esc(pick(next.title))}</b></a>` : '<span></span>';
  nav.innerHTML = prevHTML + nextHTML;
})();
