(() => {
  'use strict';
  const { lang, lectures, practice, labels } = window.COURSE_DATA;
  const langIndex = { kk: 0, ru: 1, en: 2 }[lang];
  const t = (...copy) => copy[langIndex];
  const suffix = lang === 'kk' ? '' : '.' + lang;
  const week = Number(new URLSearchParams(location.search).get('n'));
  const content = window.TOPIC_LABS[week];
  const host = document.getElementById('topicLab');
  if (!content) {
    host.innerHTML = `<a href="index${suffix}.html#topics">${t('Тақырыптарға қайту', 'Вернуться к темам', 'Back to topics')} ←</a>`;
    return;
  }

  const lecture = lectures.find(item => item.n === week);
  const lesson = lecture || practice.find(item => item.n === week);
  const title = lesson.title[langIndex];
  const number = String(week).padStart(2, '0');
  const stages = [
    ['overview', t('Мақсат пен міндет', 'Цель и задачи', 'Aim and objectives')],
    ['experiment', t('Интерактивті тәжірибе', 'Интерактивный опыт', 'Interactive experiment')],
    ['results', t('Нәтижені салыстыру', 'Сравнение результатов', 'Compare results')],
    ['defense', t('Қорғауға дайындық', 'Подготовка к защите', 'Presentation preparation')],
    ['code', t('Толық код', 'Полный код', 'Full code')]
  ];
  const defenseLabel = t('Қорғау мәтіні', 'Текст для защиты', 'Presentation notes');
  const startLabel = t('Зертхананы бастау', 'Начать лабораторную', 'Start the lab');
  const playLabel = t('Тәжірибені көрсету', 'Показать опыт', 'Run the demo');
  const pauseLabel = t('Кідірту', 'Пауза', 'Pause');
  const closeLabel = t('Жабу', 'Закрыть', 'Close');
  const topicsLabel = t('Тақырыптарға қайту', 'Вернуться к темам', 'Back to topics');
  const referenceLabels = {
    code: t('Осы беттің коды', 'Код этой страницы', 'Code for this page'),
    formulas: t('Формулалар', 'Формулы', 'Formulas'),
    explanation: t('Түсіндірме', 'Объяснение', 'Explanation')
  };
  const referenceBar = (fullPage = false) => `<div class="topic-lab-actions topic-lab-reference">
    ${fullPage ? '' : `<button type="button" class="topic-lab-button" data-reference="code">&lt;/&gt; ${referenceLabels.code}</button>`}
    <button type="button" class="topic-lab-button" data-reference="formulas">ƒ ${referenceLabels.formulas}</button>
    <button type="button" class="topic-lab-button" data-reference="explanation">${referenceLabels.explanation}</button>
    ${fullPage ? '' : `<a class="topic-lab-button" href="#code" data-stage="4">${stages[4][1]} →</a>`}
  </div>`;
  const theory = window.LAB_THEORY[week];
  const formulaCards = `<dl class="topic-lab-formulas">${theory.map(({ expression, meaning }) => `<div><dt>${expression}</dt><dd>${meaning}</dd></div>`).join('')}</dl>`;
  const defense = `<div class="topic-lab-defense">
    <section><h3>${t('Экранда көрсет', 'Покажи на экране', 'Show on screen')}</h3><p>${content.show}</p></section>
    <section><h3>${t('Осылай түсіндір', 'Объясни своими словами', 'Explain it aloud')}</h3><p>${content.say}</p></section>
    <details><summary>${content.ask}</summary><p>${content.answer}</p></details>
  </div>`;
  const topicHref = `index${suffix}.html#topic-group-${week}`;
  const stageLinks = stages.map(([id, name], index) => `<a href="#${id}" data-stage="${index}"><span>0${index + 1}</span>${name}</a>`).join('');
  document.title = `${number} · ${title} · ML LAB`;
  document.getElementById('labRail').innerHTML = `<a class="topic-lab-brand" href="${topicHref}">ML<span>LAB</span></a>
    <p class="topic-lab-topic">${number} · ${title}</p>
    <nav aria-label="${labels[lang].practiceLab}">${stageLinks}</nav>
    <a class="topic-lab-return" href="${topicHref}">← ${topicsLabel}</a>`;
  document.getElementById('labTopbarContent').innerHTML = `<span class="topic-lab-crumb"></span>
    <button type="button" class="topic-lab-button" id="labNotes">${defenseLabel} ↗</button>`;

  host.innerHTML = `
    <section class="topic-lab-stage" data-panel="0">
      <div class="topic-lab-hero">
        <div>
          <p class="topic-lab-kicker">${number} / ${labels[lang].practiceLab}</p>
          <h1>${title}</h1>
          <p class="topic-lab-question">${content.question}</p>
          <p class="topic-lab-lead">${lesson.summary[langIndex]}</p>
          ${referenceBar()}
          <a class="topic-lab-button primary" href="#experiment" data-stage="1">${startLabel} ↗</a>
        </div>
        <figure class="topic-lab-preview">
          <figcaption>${t('Тәжірибенің бастапқы көрінісі', 'Начальный вид опыта', 'Starting view of the experiment')}</figcaption>
          <div id="labPreview"></div>
          <p id="labPreviewMetric"></p>
        </figure>
      </div>
    </section>
    <section class="topic-lab-stage" data-panel="1" hidden>
      <div class="topic-lab-heading"><div><p class="topic-lab-kicker">${number} / 02</p><h2>${stages[1][1]}</h2></div>
        <div class="topic-lab-actions"><button type="button" class="topic-lab-button primary" id="labPlay">▶ ${playLabel}</button>
        <button type="button" class="topic-lab-button" id="labReset">${t('Қалпына келтіру', 'Сбросить', 'Reset')}</button></div>
      </div>
      ${referenceBar()}
      <p class="topic-lab-demo" id="labDemoStatus" role="status"></p>
      <div id="labWorkbench"></div>
    </section>
    <section class="topic-lab-stage" data-panel="2" hidden>
      <div class="topic-lab-heading"><div><p class="topic-lab-kicker">${number} / 03</p><h2>${stages[2][1]}</h2></div>
      <button type="button" class="topic-lab-button" id="labBaseline">${t('Ағымдағыны бастапқы мән ету', 'Взять текущий результат за основу', 'Set current as baseline')}</button></div>
      ${referenceBar()}
      <div class="topic-lab-comparison">
        <section><h3>${t('Бастапқы нәтиже', 'Исходный результат', 'Baseline result')}</h3><p id="labBefore"></p><div id="labBeforePlot"></div></section>
        <section><h3>${t('Ағымдағы нәтиже', 'Текущий результат', 'Current result')}</h3><p id="labAfter"></p><div id="labAfterPlot"></div></section>
      </div>
      <p class="topic-lab-takeaway" id="labTakeaway"></p>
      <a class="topic-lab-button" href="#experiment" data-stage="1">← ${stages[1][1]}</a>
    </section>
    <section class="topic-lab-stage" data-panel="3" hidden>
      <div class="topic-lab-heading"><div><p class="topic-lab-kicker">${number} / 04</p><h2>${stages[3][1]}</h2></div></div>
      ${referenceBar()}
      ${defense}
      <div class="topic-lab-actions">
        <a class="topic-lab-button" href="practice${suffix}.html?n=${week}&amp;fromTopic=${week}">${labels[lang].practice} · Notebook ↗</a>
        ${lecture ? `<a class="topic-lab-button" href="lecture${suffix}.html?n=${week}&amp;fromTopic=${week}">${labels[lang].lecture} ↗</a>` : ''}
      </div>
    </section>
    <section class="topic-lab-stage" data-panel="4" hidden>
      <div class="topic-lab-heading"><div><p class="topic-lab-kicker">${number} / 05</p><h2>${stages[4][1]}</h2></div></div>
      ${referenceBar(true)}
      <div id="labFullCode"></div>
    </section>
    <dialog class="topic-lab-dialog" id="labDefenseDialog" aria-labelledby="labDefenseTitle">
      <div class="topic-lab-heading"><h2 id="labDefenseTitle">${defenseLabel}</h2><form method="dialog"><button class="topic-lab-button">${closeLabel}</button></form></div>
      ${defense}
    </dialog>
    <dialog class="topic-lab-dialog topic-lab-reference-dialog" id="labReferenceDialog" aria-labelledby="labReferenceTitle">
      <div class="topic-lab-heading"><h2 id="labReferenceTitle"></h2><form method="dialog"><button class="topic-lab-button">${closeLabel}</button></form></div>
      <div id="labReferenceText"></div><div id="labPageCode" hidden></div>
    </dialog>`;
  document.getElementById('labFooter').innerHTML = `<div class="topic-lab-progress"><span id="labProgressText"></span><progress id="labProgress" max="${stages.length}" value="1"></progress></div>
    <div class="topic-lab-actions"><button type="button" class="topic-lab-button" id="labPrev">← ${t('Артқа', 'Назад', 'Back')}</button>
    <button type="button" class="topic-lab-button primary" id="labNext"></button></div>`;

  const byId = id => document.getElementById(id);
  const panels = [...host.querySelectorAll('[data-panel]')];
  const workbench = byId('labWorkbench');
  let active = 0;
  let timer;
  let current;
  let baseline;
  const plot = view => view.details.match(/<svg\b[\s\S]*?<\/svg>/)?.[0] || '';
  const updateComparison = () => {
    byId('labBefore').textContent = baseline.summary;
    byId('labAfter').textContent = current.summary;
    byId('labBeforePlot').innerHTML = plot(baseline);
    byId('labAfterPlot').innerHTML = plot(current);
    byId('labTakeaway').textContent = current.insight;
  };
  const experiment = window.mountStarterLab(workbench, week, (view, settings) => {
    current = { ...view, settings };
    baseline ||= current;
  });
  const loadSource = window.LAB_REFERENCE.createSource(number);
  const pageCode = window.LAB_REFERENCE.createCodePanel(byId('labPageCode'), number, loadSource);
  const fullCode = window.LAB_REFERENCE.createCodePanel(byId('labFullCode'), number, loadSource);
  byId('labPreview').innerHTML = plot(current);
  byId('labPreviewMetric').textContent = current.summary;

  function stopDemo() {
    clearInterval(timer);
    timer = undefined;
    byId('labPlay').textContent = '▶ ' + playLabel;
  }
  function openStage(index, updateHash = true) {
    stopDemo();
    active = index;
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    document.querySelectorAll('#labRail [data-stage]').forEach((link, i) => {
      if (index === i) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    document.querySelector('.topic-lab-crumb').textContent = stages[index][1];
    byId('labProgress').value = index + 1;
    byId('labProgressText').textContent = `0${index + 1} / 0${stages.length}`;
    byId('labPrev').disabled = index === 0;
    byId('labNext').textContent = index === stages.length - 1 ? topicsLabel + ' ↗' : stages[index + 1][1] + ' →';
    if (index === 2) updateComparison();
    if (stages[index][0] === 'code') fullCode('code', current.settings, baseline.settings);
    if (updateHash) history.replaceState(null, '', '#' + stages[index][0]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const stageFromHash = () => Math.max(0, stages.findIndex(([id]) => '#' + id === location.hash));
  document.querySelectorAll('[data-stage]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openStage(Number(link.dataset.stage));
    const heading = panels[active].querySelector('h1,h2');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }));
  document.querySelector('.skip').addEventListener('click', event => {
    event.preventDefault();
    host.focus();
  });
  window.addEventListener('hashchange', () => openStage(stageFromHash(), false));
  byId('labPrev').addEventListener('click', () => openStage(active - 1));
  byId('labNext').addEventListener('click', () => {
    if (active === stages.length - 1) location.assign(topicHref);
    else openStage(active + 1);
  });
  byId('labNotes').addEventListener('click', () => { stopDemo(); byId('labDefenseDialog').showModal(); });
  const stageExplanations = [
    t('Беттің мақсатын және деректің нені білдіретінін түсіндір. Содан кейін қандай нәтиже күтетіндігіңді айт.', 'Объясни цель страницы и смысл данных. Затем сформулируй ожидаемый результат.', 'Explain the aim and what the data represents. Then state what you expect to see.'),
    t('Бір параметрді өзгертіп, графиктегі және кестедегі өзгерісті бақыла.', 'Измени один параметр и проследи изменения графика и таблицы.', 'Change one parameter and observe the chart and table.'),
    t('Бастапқы және ағымдағы мәндерді салыстыр. Айырманы қай параметр өзгерткенін атап өт.', 'Сравни исходный и текущий результат. Назови параметр, который вызвал разницу.', 'Compare the baseline and current results. Name the parameter that caused the difference.'),
    t('Әуелі экраннан нәтижені көрсет, содан кейін оның себебін түсіндір.', 'Сначала покажи результат на экране, затем объясни его причину.', 'Show the result on screen first, then explain its cause.'),
    t('Код бөлімдері деректі көрсетеді, тәжірибені орындайды, нәтижені салыстырады және қорғаудағы мысалды тексереді.', 'Разделы кода показывают данные, выполняют опыт, сравнивают результаты и проверяют пример для защиты.', 'The code sections inspect the data, run the experiment, compare results, and check the presentation example.')
  ];
  host.querySelectorAll('[data-reference]').forEach(button => button.addEventListener('click', () => {
    stopDemo();
    const kind = button.dataset.reference;
    const text = byId('labReferenceText');
    text.hidden = kind === 'code';
    byId('labPageCode').hidden = kind !== 'code';
    byId('labReferenceTitle').textContent = `${referenceLabels[kind]} · ${stages[active][1]}`;
    if (kind === 'code') pageCode(stages[active][0], current.settings, baseline.settings);
    else {
      text.innerHTML = `<p class="topic-code-help">${stageExplanations[active]}</p>` + (kind === 'formulas' ? formulaCards : defense);
      if (kind === 'explanation' && (active === 1 || active === 2)) {
        const result = document.createElement('p');
        result.className = 'topic-lab-takeaway';
        result.textContent = active === 1 ? `${current.summary}. ${current.insight}` : `${baseline.summary} → ${current.summary}. ${current.insight}`;
        text.append(result);
      }
      if (kind === 'explanation') {
        const walkthrough = document.createElement('section');
        walkthrough.className = 'topic-lab-walkthrough';
        walkthrough.innerHTML = `<h3>${t('Есептеу жолы', 'Ход расчёта', 'How the result is calculated')}</h3>${formulaCards}`;
        text.append(walkthrough);
      }
    }
    byId('labReferenceDialog').showModal();
  }));
  byId('labBaseline').addEventListener('click', () => { baseline = current; updateComparison(); });
  byId('labReset').addEventListener('click', () => {
    stopDemo();
    experiment.reset();
    baseline = current;
    byId('labDemoStatus').textContent = '';
  });
  workbench.addEventListener('input', () => { stopDemo(); byId('labDemoStatus').textContent = ''; });
  byId('labPlay').addEventListener('click', () => {
    if (timer) { stopDemo(); return; }
    let step = 0;
    const next = () => {
      experiment.apply(content.demo[step]);
      if (step === 0) baseline = current;
      byId('labDemoStatus').textContent = `${t('Тәжірибе қадамы', 'Шаг опыта', 'Demo step')} ${step + 1} / ${content.demo.length}`;
      step++;
      if (step === content.demo.length) stopDemo();
    };
    byId('labPlay').textContent = 'Ⅱ ' + pauseLabel;
    timer = setInterval(next, 1100);
    next();
  });
  openStage(stageFromHash(), false);
})();
