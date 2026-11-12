(() => {
  'use strict';
  const lang = document.documentElement.lang;
  const index = { kk: 0, ru: 1, en: 2 }[lang];
  const t = (...copy) => copy[index];
  const suffix = lang === 'kk' ? '' : '.' + lang;
  const { points, hierarchy, density } = window.SROJ11;
  const palette = ['#56c49d', '#a68ae0', '#eca861', '#60a8df', '#e37d9b', '#9fbb5b', '#56baba', '#ce9788', '#b5a863', '#9fa1d4', '#d88368', '#7cc7b2'];
  const fmt = value => new Intl.NumberFormat(lang === 'kk' ? 'ru-RU' : lang, { maximumFractionDigits: 3 }).format(value);
  const title = t('Кластерлеу · СОӨЖ', 'Кластеризация · СРОП', 'Clustering · guided assignment');
  const labels = {
    groups: t('Кластер', 'Кластеры', 'Clusters'),
    noise: t('Шу', 'Шум', 'Noise'),
    core: t('Негізгі нүкте', 'Ядровая точка', 'Core point'),
    border: t('Шекаралық нүкте', 'Граничная точка', 'Border point'),
    notes: t('Қорғау мәтіні', 'Текст для защиты', 'Presentation notes'),
    explanation: t('Түсіндірме', 'Объяснение', 'Explanation'),
    formulas: t('Формулалар', 'Формулы', 'Formulas'),
    code: t('Осы беттің коды', 'Код этой страницы', 'Code for this page')
  };
  const pages = [
    ['hierarchy', t('Иерархиялық кластерлеу', 'Иерархическая кластеризация', 'Hierarchical clustering')],
    ['dbscan', 'DBSCAN'],
    ['compare', t('Екі әдісті салыстыру', 'Сравнение методов', 'Compare the methods')],
    ['defense', t('Қорғауға дайындық', 'Подготовка к защите', 'Presentation preparation')]
  ];
  const state = { linkage: 'average', groups: 5, eps: .34, minPts: 3, selected: 0 };
  const main = document.getElementById('sroj11Main');
  const dialog = document.getElementById('sroj11Dialog');
  const sourceFile = 'sroj11-files/cluster-sroj.py';
  const download = `<a class="topic-lab-button" href="${sourceFile}" download>↓ ${t('Толық Python коды', 'Полный код Python', 'Full Python code')}</a>`;
  const back = `index${suffix}.html#topic-group-11`;
  const color = group => palette[group] || '#aeb8b0';
  const px = value => 183 + value * 92;
  const py = value => 185 - value * 92;
  let active = 0;
  let timer;
  let sourceRequest;

  const intro = [
    t('Әр нүкте жеке топтан басталады. Ең жақын топтар біртіндеп қосылады. Дендограммада қосылу биіктігін бақыла.', 'Каждая точка начинает отдельной группой. Ближайшие группы последовательно объединяются. Следи за высотой на дендрограмме.', 'Each point starts as a group. The closest groups merge step by step. Watch the merge heights on the dendrogram.'),
    t('Екі доға мен үш оқшау нүктеде ε радиусы мен MinPts мәнін өзгерт. Нүктені таңдағанда оның ε-көршілері көрінеді.', 'Меняй ε и MinPts на двух дугах с тремя отдельными точками. Выбранная точка показывает своих ε-соседей.', 'Change ε and MinPts on two arcs with three isolated points. Select a point to see its ε-neighbors.'),
    t('Екі әдіс те бірдей 31 нүктені пайдаланады. Иерархия барлық нүктені топқа қосады. DBSCAN кей нүктелерді шу деп қалдырады.', 'Оба метода используют те же 31 точку. Иерархия назначает группу каждой точке; DBSCAN может оставить шум.', 'Both methods use the same 31 points. Hierarchical clustering assigns every point to a group; DBSCAN may leave points as noise.'),
    t('Ақылбек дендрограмманы көрсетеді. Алмас тығыздық, ε-көршілері және шу туралы түсіндіреді.', 'Акылбек показывает дендрограмму. Алмас объясняет плотность, ε-соседей и шум.', 'Akylbek demonstrates the dendrogram. Almas explains density, ε-neighbors, and noise.')
  ];
  const details = [
    t('Single — екі топтың ең жақын нүктелерін салыстырады, complete — ең алыс нүктелерін, average — барлық жұптың орташа арақашықтығын. k өзгерсе, біріктіру тізбегінің қай жерінде тоқтайтынымыз өзгереді. Байланыс әдісін ауыстырсаң, ағаштың өзі өзгереді.', 'Single сравнивает ближайшую пару, complete — самую дальнюю, average — среднее по всем парам. Изменение k выбирает другой шаг остановки. Смена linkage перестраивает дерево.', 'Single compares the closest pair, complete the farthest pair, and average the mean across all cross-group pairs. Changing k changes where we stop; changing linkage rebuilds the tree.'),
    t('ε ішіндегі нүктелер саны MinPts-ке жетсе, нүкте негізгі болады. Нүктенің өзі де есепке кіреді. Негізгіге жақын, бірақ көршісі аз нүкте — шекаралық. Ешбір негізгі нүктеге қосылмаса — шу.', 'Если в ε-окрестности достаточно точек, включая саму точку, она ядровая. Неядерная точка рядом с ядровой — граничная. Остальные считаются шумом.', 'A point is core if its ε-neighborhood, including itself, reaches MinPts. A non-core point beside a core point is border. Other points are noise.'),
    t('k — алдын ала таңдаған топ саны. DBSCAN-да топ саны тығыздықтан шығады. Шағын ε топтарды бөлшектеуі мүмкін; үлкен ε жақын топтарды біріктіруі мүмкін.', 'k — заданное число групп. В DBSCAN число групп определяется плотностью. Малое ε может раздробить группы, большое — объединить соседние.', 'k is a chosen group count. DBSCAN derives its group count from density. A small ε can fragment groups; a large ε can connect them.'),
    t('Алдымен экранда бір өзгеріс көрсетіп, одан кейін нәтижені түсіндір. Соңында екі әдістің айырмасын осы деректегі шу нүктелерінен көрсет.', 'Сначала покажи одно изменение на экране, затем объясни результат. В конце сравни методы на шумовых точках.', 'Show one change first, then explain the result. End by comparing how the methods handle isolated points.')
  ];
  const formulas = [
    ['d(p,q) = √((xₚ−xᵩ)² + (yₚ−yᵩ)²)', t('Екі нүктенің Евклид арақашықтығы.', 'Евклидово расстояние между точками.', 'Euclidean distance between two points.')],
    ['single = min d(p,q) · complete = max d(p,q) · average = Σd(p,q)/(|A||B|)', t('p ∈ A, q ∈ B. Linkage екі топ арасындағы біріктіру қашықтығын береді.', 'p ∈ A, q ∈ B. Linkage задаёт расстояние объединения двух групп.', 'p ∈ A, q ∈ B. Linkage gives the distance at which two groups merge.')],
    ['Nε(p) = {q : d(p,q) ≤ ε} · Core(p) ⇔ |Nε(p)| ≥ MinPts', t('ε-көрші шеңбер ішіне шекара мен p нүктесінің өзі кіреді.', 'ε-окрестность включает границу и саму точку p.', 'The ε-neighborhood includes the boundary and the point p itself.')]
  ];
  const toolbar = () => `<div class="topic-lab-actions topic-lab-reference">
    <button type="button" class="topic-lab-button" data-dialog="code">&lt;/&gt; ${labels.code}</button>
    <button type="button" class="topic-lab-button" data-dialog="formulas">ƒ ${labels.formulas}</button>
    <button type="button" class="topic-lab-button" data-dialog="explanation">${labels.explanation}</button>
    ${download}</div>`;
  const metric = (value, label) => `<div><strong>${value}</strong><small>${label}</small></div>`;
  const metricRow = (...items) => `<div class="week11-metrics">${items.map(args => metric(...args)).join('')}</div>`;

  function scatter(labelsByPoint, result = null, inspect = false) {
    const [x, y] = points[state.selected];
    const circle = inspect ? `<circle cx="${px(x)}" cy="${py(y)}" r="${state.eps * 92}" fill="#65bb9a17" stroke="#79cbad" stroke-dasharray="5 4" clip-path="url(#sroj11Bounds)"/>` : '';
    const grid = [-1, 0, 1, 2].map(i => `<path class="grid" d="M${px(i)} 26v255"/><text x="${px(i)}" y="302" text-anchor="middle">${i}</text>`).join('')
      + [-1, 0, 1].map(i => `<path class="grid" d="M36 ${py(i)}h392"/><text x="28" y="${py(i) + 4}" text-anchor="end">${i}</text>`).join('');
    const marks = points.map(([a, b], i) => {
      const group = labelsByPoint[i];
      const x = px(a), y = py(b);
      const current = inspect && i === state.selected;
      const neighbor = inspect && !current && result.neighbors[state.selected].includes(i);
      const mark = group < 0 ? `<path d="M${x - 4} ${y - 4}l8 8m0-8l-8 8" fill="none" stroke="${color(group)}" stroke-width="2"/>`
        : `<circle cx="${x}" cy="${y}" r="${result && !result.core[i] ? 5 : 6}" fill="${result && !result.core[i] ? 'var(--paper)' : color(group)}" stroke="${color(group)}" stroke-width="2"/>`;
      return `<g ${inspect ? `data-point="${i}" role="button" tabindex="0" aria-label="P${i + 1}"` : ''}>
        ${current || neighbor ? `<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${current ? '#f4bd6e' : '#79cbad'}" stroke-width="2"/>` : ''}
        ${mark}<title>P${i + 1} (${a}, ${b})</title>${inspect ? `<circle cx="${x}" cy="${y}" r="10" fill="transparent"/>` : ''}</g>`;
    }).join('');
    return `<svg class="week11-plot sroj11-plot" viewBox="0 0 450 316" role="${inspect ? 'group' : 'img'}" aria-label="x, y">
      ${inspect ? '<defs><clipPath id="sroj11Bounds"><rect x="36" y="26" width="392" height="255"/></clipPath></defs>' : ''}
      ${grid}${circle}${marks}<text x="430" y="302">x</text><text x="20" y="28">y</text></svg>`;
  }

  function dendrogram({ tree, labels: groups }) {
    let column = 0;
    const scale = 212 / tree.height;
    const branches = [];
    function walk(node) {
      if (!node.left) {
        const x = 28 + column++ * 13;
        branches.push(`<circle cx="${x}" cy="259" r="3" fill="${color(groups[node.id])}"><title>P${node.id + 1}</title></circle>`);
        return [x, 251];
      }
      const [a, ay] = walk(node.left), [b, by] = walk(node.right);
      const y = 251 - node.height * scale;
      const group = groups[node.members[0]];
      const stroke = node.members.every(id => groups[id] === group) ? color(group) : 'var(--muted)';
      branches.push(`<path d="M${a} ${ay}V${y}H${b}V${by}" fill="none" stroke="${stroke}" stroke-width="2"><title>d = ${fmt(node.height)}</title></path>`);
      return [(a + b) / 2, y];
    }
    walk(tree);
    return `<svg class="week11-plot" viewBox="0 0 450 280" role="img" aria-label="Dendrogram">
      <text x="26" y="22">d · ${fmt(tree.height)}</text><text x="12" y="255">0</text>${branches.join('')}</svg>`;
  }

  function defense() {
    return `<div class="topic-lab-defense week11-speech">
      <section><h3>Ақылбек · ${pages[0][1]}</h3><p>${t(
        'Әр нүкте жеке топтан басталады. Кластерлерді таңдалған linkage бойынша біріктіреміз. k-ны 5-тен 2-ге түсіріп, дендрограммада қай тармақтардың бір түске ауысқанын көрсетемін.',
        'Каждая точка сначала отдельная группа. Объединяем группы по linkage. Уменьшу k с 5 до 2 и покажу, как ветви получают общий цвет.',
        'Each point begins as its own group. We merge groups by linkage. I’ll lower k from 5 to 2 and show which branches take the same color.'
      )}</p></section>
      <section><h3>Алмас · DBSCAN</h3><p>${t(
        'ε=0,34 және MinPts=3 кезінде екі доға екі кластерге бөлінеді, үш оқшау нүкте шу болып қалады. Бір шеткі нүктені басып, ε шеңбері мен көрші санын көрсетемін. ε-ді азайтқанда тығыздық шарты орындалмай қалуы мүмкін.',
        'При ε=0,34 и MinPts=3 получаются два кластера на дугах и три шумовые точки. Выберу крайнюю точку и покажу ε-окрестность. При меньшем ε плотности может не хватить.',
        'At ε=0.34 and MinPts=3, the arcs form two clusters and three isolated points are noise. I’ll select an endpoint and show its ε-neighborhood. Lowering ε can leave too few neighbors.'
      )}</p></section>
      <details><summary>${t('DBSCAN үшін k керек пе?', 'Нужно ли задавать k в DBSCAN?', 'Does DBSCAN need k?')}</summary><p>${t('Жоқ. Кластер саны ε және MinPts шарттарынан шығады.', 'Нет. Число кластеров следует из ε и MinPts.', 'No. The cluster count follows from ε and MinPts.')}</p></details>
    </div>`;
  }

  function update() {
    const h = hierarchy(state.linkage, state.groups);
    const d = density(state.eps, state.minPts);
    const result = document.getElementById('sroj11Result');
    if (active === 0) {
      document.getElementById('sroj11K').value = state.groups;
      result.innerHTML = metricRow([points.length, t('Нүкте', 'Точек', 'Points')], [state.groups, labels.groups], [points.length - state.groups, t('Біріктіру қадамы', 'Шагов объединения', 'Merge steps')])
        + `<div class="week11-grid"><section class="week11-panel"><h3>${labels.groups}</h3>${scatter(h.labels)}</section><section class="week11-panel"><h3>Dendrogram</h3>${dendrogram(h)}</section></div>`;
    } else if (active === 1) {
      document.getElementById('sroj11Eps').value = fmt(state.eps);
      document.getElementById('sroj11Min').value = state.minPts;
      const type = d.labels[state.selected] < 0 ? labels.noise : d.core[state.selected] ? labels.core : labels.border;
      result.innerHTML = metricRow([d.clusters, labels.groups], [d.core.filter(Boolean).length, labels.core], [d.noise, labels.noise])
        + `<div class="week11-grid"><section class="week11-panel">${scatter(d.labels, d, true)}</section><section class="week11-panel"><h3>P${state.selected + 1} · ${type}</h3>
        <p>${t('Өзін қосқандағы көрші саны', 'Число соседей с самой точкой', 'Neighbors including itself')}: <strong>${d.neighbors[state.selected].length}</strong></p>
        <p class="week11-insight">${t('Толық шеңбер — негізгі, бос шеңбер — шекаралық, × — шу. Үзік шеңбер таңдалған нүктенің ε аймағын көрсетеді.', 'Сплошной круг — ядро, пустой — граница, × — шум. Пунктир — ε-окрестность выбранной точки.', 'Filled circles are core, hollow circles are border, and × is noise. The dashed circle is the selected point’s ε-neighborhood.')}</p></section></div>`;
    } else if (active === 2) {
      result.innerHTML = `<div class="week11-grid"><section class="week11-panel"><h3>${pages[0][1]} · k=${state.groups}</h3>${scatter(h.labels)}</section>
      <section class="week11-panel"><h3>DBSCAN · ε=${fmt(state.eps)} · MinPts=${state.minPts}</h3>${scatter(d.labels, d)}<p>${labels.groups}: ${d.clusters} · ${labels.noise}: ${d.noise}</p></section></div>`;
    }
  }

  const range = (id, name, min, max, step, value, output) => `<label>${name} <output id="${output}" for="${id}"></output><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
  function render() {
    clearInterval(timer);
    active = Math.max(0, pages.findIndex(([key]) => '#' + key === location.hash));
    const demo = `<button type="button" class="topic-lab-button primary" id="sroj11Play">▶ ${t('Көрсетілім', 'Демонстрация', 'Replay')}</button>`;
    const controls = active === 0
      ? `<div class="week11-controls"><label>Linkage <select id="sroj11Linkage">${['single', 'complete', 'average'].map(value => `<option ${value === state.linkage ? 'selected' : ''}>${value}</option>`).join('')}</select></label>
         ${range('sroj11Groups', 'k', 1, 12, 1, state.groups, 'sroj11K')}${demo}</div>`
      : active === 1 ? `<div class="week11-controls">${range('sroj11Radius', 'ε', .12, .8, .01, state.eps, 'sroj11Eps')}
        ${range('sroj11MinPts', 'MinPts', 2, 8, 1, state.minPts, 'sroj11Min')}${demo}</div>` : '';
    main.innerHTML = `<div class="topic-lab-heading"><div><p class="topic-lab-kicker">11 / ${title}</p>
      <h1>${pages[active][1]}</h1><p class="week11-lead">${intro[active]}</p></div></div>${toolbar()}${controls}
      <div id="sroj11Result">${active === 3 ? defense() : ''}</div>`;
    document.querySelectorAll('#sroj11Rail nav a').forEach((link, i) => {
      if (i === active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('sroj11Crumb').textContent = pages[active][1];
    document.getElementById('sroj11Progress').textContent = `0${active + 1} / 04`;
    document.getElementById('sroj11Next').href = active < 3 ? '#' + pages[active + 1][0] : back;
    document.getElementById('sroj11Next').textContent = (active < 3 ? t('Келесі бөлім', 'Следующий раздел', 'Next section') : t('Тақырыптар', 'Темы', 'Topics')) + ' →';
    update();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openDialog(kind) {
    clearInterval(timer);
    const body = document.getElementById('sroj11DialogBody');
    document.getElementById('sroj11DialogTitle').textContent = labels[kind];
    if (kind === 'notes') body.innerHTML = defense();
    if (kind === 'explanation') body.innerHTML = `<p class="week11-lead">${intro[active]}</p><p class="week11-insight">${details[active]}</p>`;
    if (kind === 'formulas') body.innerHTML = `<dl class="topic-lab-formulas">${formulas.map(([formula, meaning]) => `<div><dt>${formula}</dt><dd>${meaning}</dd></div>`).join('')}</dl>`;
    if (kind === 'code') {
      body.innerHTML = `<p class="week11-lead">${t('Толық файл екі әдісті есептеп, дендрограмма мен екі графикті шығарады. Осы беттегі параметрлер үзіндіде көрсетіледі.', 'Полный файл считает оба метода и строит дендрограмму и два графика. Фрагмент показывает текущие настройки.', 'The full file calculates both methods and draws the dendrogram and two scatter plots. The excerpt shows your current settings.')}</p>
        <div class="topic-lab-actions"><button type="button" class="topic-lab-button" data-copy disabled>${t('Көшіру', 'Копировать', 'Copy')}</button>${download}<span role="status"></span></div><pre class="topic-code"><code></code></pre>`;
      const code = body.querySelector('code');
      const copy = body.querySelector('[data-copy]');
      const status = body.querySelector('[role=status]');
      sourceRequest ||= fetch(sourceFile).then(response => {
        if (!response.ok) throw Error('Source unavailable');
        return response.text();
      }).catch(error => { sourceRequest = undefined; throw error; });
      const section = active;
      sourceRequest.then(source => {
        const chunks = source.split(/^# %% ([a-z]+)[ \t]*\r?$/gm);
        const keys = ['data', ...(section === 0 ? ['hierarchy'] : section === 1 ? ['dbscan'] : ['hierarchy', 'dbscan', 'compare'])];
        code.textContent = keys.map(key => '# %% ' + key + chunks[chunks.indexOf(key) + 1]).join('\n')
          .replace(/^METHOD, K = .*$/m, `METHOD, K = "${state.linkage}", ${state.groups}`)
          .replace(/^EPS, MIN_PTS = .*$/m, `EPS, MIN_PTS = ${state.eps}, ${state.minPts}`);
        copy.disabled = false;
        copy.onclick = async () => {
          try {
            await navigator.clipboard.writeText(code.textContent);
            status.textContent = t('Көшірілді', 'Скопировано', 'Copied');
          } catch {
            const range = document.createRange();
            range.selectNodeContents(code);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            status.textContent = 'Ctrl+C';
          }
        };
      }).catch(() => { code.textContent = t('Код жүктелмеді.', 'Код не загрузился.', 'Code could not load.'); });
    }
    dialog.showModal();
  }

  main.addEventListener('input', event => {
    const keys = { sroj11Groups: 'groups', sroj11Linkage: 'linkage', sroj11Radius: 'eps', sroj11MinPts: 'minPts' };
    const key = keys[event.target.id];
    if (!key) return;
    clearInterval(timer);
    state[key] = key === 'linkage' ? event.target.value : Number(event.target.value);
    update();
  });
  const selectPoint = (target, restoreFocus) => {
    const point = target.closest('[data-point]');
    if (!point) return;
    state.selected = Number(point.dataset.point);
    update();
    if (restoreFocus) main.querySelector(`[data-point="${state.selected}"]`).focus();
  };
  main.addEventListener('keydown', event => {
    if (event.target.closest('[data-point]') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      selectPoint(event.target, true);
    }
  });
  main.addEventListener('click', event => {
    selectPoint(event.target, false);
    const action = event.target.closest('[data-dialog]');
    if (action) openDialog(action.dataset.dialog);
    if (event.target.id !== 'sroj11Play') return;
    clearInterval(timer);
    const hierarchical = active === 0;
    const steps = hierarchical ? [12, 8, 5, 3, 2] : [.15, .24, .34, .45, .65];
    let step = 0;
    const tick = () => {
      state[hierarchical ? 'groups' : 'eps'] = steps[step++];
      document.getElementById(hierarchical ? 'sroj11Groups' : 'sroj11Radius').value = steps[step - 1];
      update();
      if (step === steps.length) clearInterval(timer);
    };
    timer = setInterval(tick, 700);
    tick();
  });

  document.getElementById('sroj11Rail').innerHTML = `<a class="topic-lab-brand" href="${back}">ML<span>LAB</span></a>
    <p class="topic-lab-topic">${title} · 11</p><nav aria-label="${title}">${pages.map(([id, name], i) => `<a href="#${id}"><span>0${i + 1}</span>${name}</a>`).join('')}</nav>
    <a class="topic-lab-return" href="week11${suffix}.html">← DIGITS + MNIST</a>`;
  document.getElementById('sroj11Header').innerHTML = `<span class="topic-lab-crumb" id="sroj11Crumb"></span><button type="button" class="topic-lab-button" id="labNotes">${labels.notes} ↗</button>`;
  document.getElementById('labNotes').onclick = () => openDialog('notes');
  document.getElementById('sroj11Footer').innerHTML = '<div class="topic-lab-progress" id="sroj11Progress"></div><a class="topic-lab-button primary" id="sroj11Next"></a>';
  dialog.innerHTML = `<div class="topic-lab-heading"><h2 id="sroj11DialogTitle"></h2><form method="dialog"><button class="topic-lab-button">${t('Жабу', 'Закрыть', 'Close')}</button></form></div><div id="sroj11DialogBody"></div>`;
  window.addEventListener('hashchange', render);
  render();
})();
