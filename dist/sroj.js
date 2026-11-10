(() => {
  'use strict';
  const data = window.COURSE_DATA;
  const idx = { kk: 0, ru: 1, en: 2 }[data.lang];
  const pick = value => Array.isArray(value) ? value[idx] : value;
  const L = data.labels[data.lang];
  const params = new URLSearchParams(location.search);
  const total = data.sroj.length;
  let n = parseInt(params.get('n'), 10);
  if (!Number.isFinite(n) || n < 1 || n > total) n = 1;
  const task = data.sroj.find(item => item.n === n);
  const num = String(n).padStart(2, '0');
  const weekLabel = week => ({ kk: `${week}-апта`, ru: `${week}-я неделя`, en: `Week ${week}` })[data.lang];
  const title = `${L.sroj} · ${weekLabel(task.week)}`;
  document.title = `${title} · ML LAB`;

  document.getElementById('lessonKicker').innerHTML = `<span>СОӨЖ ${num} / ${String(total).padStart(2, '0')}</span><span class="badge">${weekLabel(task.week).toUpperCase()}</span>`;
  document.getElementById('lessonTitle').textContent = title;
  document.getElementById('lessonLead').textContent = L.srojPending;
  document.getElementById('lessonMeta').innerHTML = `<span><b>${weekLabel(task.week)}</b></span><span>${L.sroj}</span>`;

  const slots = [
    { id: 'objective', title: L.srojObj },
    { id: 'conditions', title: L.cond },
    { id: 'format', title: L.form },
    { id: 'criteria', title: L.criteria },
    { id: 'deadline', title: L.deadline }
  ];
  document.getElementById('toc').innerHTML = slots.map((slot, i) => `<a href="#${slot.id}"><span>${String(i + 1).padStart(2, '0')}</span>${slot.title}</a>`).join('');
  document.getElementById('lessonBody').innerHTML = slots.map((slot, i) => `<section class="lesson-slot" id="${slot.id}"><div class="slot-head"><span>${String(i + 1).padStart(2, '0')}</span><h2>${slot.title}</h2></div><p class="slot-empty">${L.pending}</p></section>`).join('');

  const prev = data.sroj.find(item => item.n === n - 1);
  const next = data.sroj.find(item => item.n === n + 1);
  const prevHTML = prev ? `<a href="sroj.html?n=${prev.n}"><small>← ${L.prev}</small><b>${weekLabel(prev.week)}</b></a>` : '<span></span>';
  const nextHTML = next ? `<a class="next" href="sroj.html?n=${next.n}"><small>${L.next} →</small><b>${weekLabel(next.week)}</b></a>` : '<span></span>';
  document.getElementById('lessonNav').innerHTML = prevHTML + nextHTML;
})();
