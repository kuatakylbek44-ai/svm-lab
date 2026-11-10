(() => {
  'use strict';
  const data = window.COURSE_DATA;
  const idx = { kk: 0, ru: 1, en: 2 }[data.lang];
  const pick = value => Array.isArray(value) ? value[idx] : value;
  const L = data.labels[data.lang];
  const params = new URLSearchParams(location.search);
  const total = data.lectures.length;
  let n = parseInt(params.get('n'), 10);
  if (!Number.isFinite(n) || n < 1 || n > total) n = 1;
  const lecture = data.lectures.find(item => item.n === n);
  const num = String(n).padStart(2, '0');
  const title = pick(lecture.title);
  document.title = `${L.lecture} ${num} — ${title} · ML LAB`;

  const content = window.LECTURE_CONTENT && window.LECTURE_CONTENT[n] ? window.LECTURE_CONTENT[n][data.lang] : null;

  document.getElementById('lessonKicker').innerHTML = `<span>${L.lecture.toUpperCase()} ${num} / ${String(total).padStart(2, '0')}</span><span class="badge">ML LAB · ${L.allLectures.toUpperCase()}</span>`;
  document.getElementById('lessonTitle').textContent = title;
  document.getElementById('lessonLead').textContent = pick(lecture.summary);

  const meta = [`<span><b>${L.lecture} ${num}</b></span>`];
  if (content) {
    meta.push(`<span>${content.minutes} ${L.min}</span>`);
    meta.push(`<span>${content.theory.length} ${L.sections}</span>`);
    meta.push(`<span class="lesson-ready"><i></i>${L.ready}</span>`);
  }
  document.getElementById('lessonMeta').innerHTML = meta.join('');

  const slots = [
    { id: 'objective', title: L.objectives },
    { id: 'theory', title: L.theory },
    { id: 'visual', title: L.visual },
    { id: 'code', title: L.code },
    { id: 'check', title: L.check },
    { id: 'conclusion', title: L.conclusion }
  ];
  document.getElementById('toc').innerHTML = slots.map((slot, i) => `<a href="#${slot.id}"><span>${String(i + 1).padStart(2, '0')}</span>${slot.title}</a>`).join('');

  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const slotHTML = (slot, i, inner) => `<section class="lesson-slot" id="${slot.id}"><div class="slot-head"><span>${String(i + 1).padStart(2, '0')}</span><h2>${slot.title}</h2></div>${inner}</section>`;

  const renderList = (items, ordered) => {
    if (!items || !items.length) return '';
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} class="lesson-list">${items.map(item => `<li>${esc(item)}</li>`).join('')}</${tag}>`;
  };

  const renderTable = table => {
    if (!table) return '';
    const head = `<tr>${table.head.map(cell => `<th>${esc(cell)}</th>`).join('')}</tr>`;
    const rows = table.rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('');
    return `<div class="table-wrap"><table class="lesson-table"><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
  };

  const renderBody = () => {
    if (!content) {
      return slots.map((slot, i) => slotHTML(slot, i, `<p class="slot-empty">${L.pending}</p>`)).join('');
    }

    const objective = slotHTML(slots[0], 0, `<ul class="goal-list">${content.goals.map(goal => `<li>${esc(goal)}</li>`).join('')}</ul>`);

    const theory = slotHTML(slots[1], 1, content.theory.map(section => `
      <article class="lesson-block">
        <h3>${esc(section.h)}</h3>
        ${(section.p || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
        ${renderTable(section.table)}
        ${renderList(section.list, false)}
        ${renderList(section.ordered, true)}
        ${section.note ? `<p class="lesson-note">${esc(section.note)}</p>` : ''}
      </article>`).join(''));

    const visual = slotHTML(slots[2], 2, `
      <figure class="lesson-figure">
        <h3 class="figure-title">${esc(content.visual.title)}</h3>
        ${content.visual.html}
        <figcaption>${esc(content.visual.caption)}</figcaption>
      </figure>`);

    const code = slotHTML(slots[3], 3, `
      <p class="lesson-note">${esc(content.code.note)}</p>
      <div class="code-card">
        <div class="code-bar"><span>${esc(content.code.title)}</span><button type="button" class="copy-btn">${L.copy}</button></div>
        <pre><code>${esc(content.code.source)}</code></pre>
      </div>`);

    const quiz = slotHTML(slots[4], 4, `
      <p class="quiz-hint">${L.quizHint}</p>
      <div class="quiz-list">${content.quiz.map((item, qi) => `
        <article class="quiz-item" data-index="${qi}">
          <h3 class="quiz-q">${qi + 1}. ${esc(item.q)}</h3>
          <div class="quiz-options">${item.options.map((option, oi) => `<button type="button" class="quiz-option" data-option="${oi}">${esc(option)}</button>`).join('')}</div>
          <p class="quiz-feedback" role="status" aria-live="polite"></p>
        </article>`).join('')}</div>
      <p class="quiz-score" id="quizScore">${L.score}: 0 / ${content.quiz.length}</p>`);

    const conclusion = slotHTML(slots[5], 5, `<ul class="summary-list">${content.summary.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`);

    return objective + theory + visual + code + quiz + conclusion;
  };

  document.getElementById('lessonBody').innerHTML = renderBody();

  if (content) {
    let right = 0;
    const answered = new Set();
    const score = document.getElementById('quizScore');
    document.querySelectorAll('.quiz-item').forEach((item, qi) => {
      const question = content.quiz[qi];
      const buttons = Array.from(item.querySelectorAll('.quiz-option'));
      const feedback = item.querySelector('.quiz-feedback');
      buttons.forEach((button, oi) => {
        button.addEventListener('click', () => {
          if (answered.has(qi)) return;
          answered.add(qi);
          buttons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.answer) btn.classList.add('correct');
          });
          if (oi === question.answer) {
            right += 1;
            feedback.className = 'quiz-feedback good';
            feedback.innerHTML = `<b>${L.correct}</b> ${esc(question.why)}`;
          } else {
            button.classList.add('wrong');
            feedback.className = 'quiz-feedback bad';
            feedback.innerHTML = `<b>${L.incorrect}.</b> ${L.answer}: ${esc(question.options[question.answer])}. ${esc(question.why)}`;
          }
          score.textContent = `${L.score}: ${right} / ${content.quiz.length}`;
        });
      });
    });

    const copyBtn = document.querySelector('.copy-btn');
    const codeEl = document.querySelector('.code-card code');
    if (copyBtn && codeEl) {
      copyBtn.addEventListener('click', () => {
        const text = codeEl.textContent;
        const done = () => {
          copyBtn.textContent = L.copied;
          window.setTimeout(() => { copyBtn.textContent = L.copy; }, 1600);
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
      });
    }
  }

  const prev = data.lectures.find(item => item.n === n - 1);
  const next = data.lectures.find(item => item.n === n + 1);
  const prevHTML = prev ? `<a href="lecture.html?n=${prev.n}"><small>← ${L.prev}</small><b>${String(prev.n).padStart(2, '0')} · ${pick(prev.title)}</b></a>` : '<span></span>';
  const nextHTML = next ? `<a class="next" href="lecture.html?n=${next.n}"><small>${L.next} →</small><b>${String(next.n).padStart(2, '0')} · ${pick(next.title)}</b></a>` : '<span></span>';
  document.getElementById('lessonNav').innerHTML = prevHTML + nextHTML;
})();
