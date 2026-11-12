(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const lang = document.documentElement.lang;
  const t = (...copy) => copy[{ kk: 0, ru: 1, en: 2 }[lang]];
  const number = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ru-RU', { maximumFractionDigits: 1 });
  const meters = lang === 'en' ? 'm' : 'м';
  const pause = t('Ⅱ Кідірту', 'Ⅱ Пауза', 'Ⅱ Pause');
  const mergeLabel = t('▶ Біріктіруді ойнату', '▶ Оживить объединения', '▶ Animate merges');
  const parkLabel = t('▶ Өзгерістерді ойнату', '▶ Показать изменения', '▶ Play the changes');
  const colors = ['#50c69e', '#a88ae6', '#e3a45e', '#65abd9', '#e0829c'];
  const grades = [20, 25, 50, 80, 85];
  const leaves = grades.map((value, i) => ({ x: 56 + i * 95, height: 0, members: [value] }));
  const merges = [];
  function join(left, right, height, note) {
    const group = { left, right, height, x: (left.x + right.x) / 2, members: [...left.members, ...right.members], note };
    merges.push(group);
    return group;
  }
  const left = join(leaves[0], leaves[1], 5, t('20 мен 25 қосылады: арасы 5. 80 мен 85-тің арасы да 5.', '20 и 25 объединяются: расстояние 5. У 80 и 85 такое же расстояние.', '20 and 25 merge: their distance is 5. The distance between 80 and 85 is also 5.'));
  const right = join(leaves[3], leaves[4], 5, t('80 мен 85 те 5 биіктігінде қосылады. Үш топ қалды.', '80 и 85 тоже объединяются на высоте 5. Осталось три группы.', '80 and 85 also merge at height 5. Three groups remain.'));
  const three = join(left, leaves[2], 25, t('50 саны 20 мен 25-ке қосылады. 25-ке дейінгі аралық 25, 80-ге дейінгі аралық 30.', '50 присоединяется к 20 и 25: ближайший сосед — 25, расстояние 25. До 80 расстояние 30.', '50 joins 20 and 25. It is 25 away from 25 and 30 away from 80.'));
  join(three, right, 30, t('Қалған екі топ бірігеді: олардың ең жақын жұбы — 50 және 80, арасы 30.', 'Две последние группы сливаются: их ближайшие оценки — 50 и 80, расстояние 30.', 'The final two groups merge: their closest grades are 50 and 80, at distance 30.'));
  let shown = 0, cutMode = false, mergeTimer;
  const y = height => 212 - height * 5.3;

  function drawTree() {
    const height = Number(byId('cutHeight').value);
    const count = cutMode ? merges.filter(group => group.height <= height).length : shown;
    const groups = [...leaves];
    merges.slice(0, count).forEach(group => {
      groups.splice(groups.indexOf(group.left), 1);
      groups.splice(groups.indexOf(group.right), 1);
      groups.push(group);
    });
    groups.sort((a, b) => a.members[0] - b.members[0]);
    const branchColor = item => colors[groups.findIndex(group => group.members.includes(item.members[0]))];
    const visible = merges.slice(0, cutMode ? merges.length : count);
    const plot = visible.map((group, i) => {
      const { left, right, height } = group;
      const common = branchColor(left) === branchColor(right);
      return `<path class="${!cutMode && i === shown - 1 ? 'guide-reveal' : ''}" d="M${left.x} ${y(left.height)}V${y(height)}H${right.x}V${y(right.height)}" stroke="${common ? branchColor(group) : 'var(--muted)'}" stroke-width="3" fill="none"/>`;
    }).join('');
    const grid = [0, 5, 10, 20, 25, 30].map(height => `<path d="M36 ${y(height)}H451" class="guide-grid"/><text x="29" y="${y(height) + 4}" text-anchor="end">${height}</text>`).join('');
    const cut = cutMode ? `<path d="M35 ${y(height)}H451" stroke="#e3a45e" stroke-width="2" stroke-dasharray="6 4"/><text x="448" y="${y(height) - 6}" text-anchor="end">${t('кесу', 'срез', 'cut')} ${height}</text>` : '';
    const marks = leaves.map((leaf, i) => `<circle cx="${leaf.x}" cy="${y(0)}" r="5" fill="${branchColor(leaf)}"/><text x="${leaf.x}" y="238" text-anchor="middle">${grades[i]}</text>`).join('');
    byId('mergeTree').innerHTML = `<svg class="guide-plot" viewBox="0 0 470 247" role="img" aria-label="${t('Бағалар дендрограммасы. Топ саны', 'Дендрограмма оценок. Групп', 'Grade dendrogram. Groups')}: ${groups.length}"><text x="36" y="18">${t('Біріктіру қашықтығы', 'Расстояние объединения', 'Merge distance')}</text>${grid}${plot}${cut}${marks}</svg>`;
    const stepLabel = t('Қадам', 'Шаг', 'Step');
    byId('mergeStatus').textContent = cutMode ? t(`Кесу биіктігі — ${height}. Топ саны: ${groups.length}.`, `Срез на высоте ${height}. Количество групп: ${groups.length}.`, `Cut at height ${height}. Groups: ${groups.length}.`)
      : shown ? `${stepLabel} ${shown}/4. ${merges[shown - 1].note}` : t('Қадам 0/4. Әр баға әзірге жеке топта.', 'Шаг 0/4. Каждая оценка пока в своей группе.', 'Step 0/4. Each grade is in its own group.');
    byId('mergeGroups').innerHTML = groups.map((group, i) => `<span style="--group:${colors[i]}">{${group.members.join(', ')}}</span>`).join('');
    byId('cutValue').value = height;
    byId('mergeNext').disabled = !cutMode && shown === merges.length;
  }

  function stopMerge() {
    clearInterval(mergeTimer);
    mergeTimer = undefined;
    byId('mergePlay').textContent = mergeLabel;
  }
  byId('mergeNext').onclick = () => {
    stopMerge();
    shown = cutMode ? 1 : shown + 1;
    cutMode = false;
    drawTree();
  };
  byId('mergeReset').onclick = () => { stopMerge(); shown = 0; cutMode = false; drawTree(); };
  byId('cutHeight').oninput = () => { stopMerge(); cutMode = true; drawTree(); };
  byId('mergePlay').onclick = () => {
    if (mergeTimer) { stopMerge(); return; }
    if (cutMode || shown === merges.length) shown = 0;
    cutMode = false;
    drawTree();
    byId('mergePlay').textContent = pause;
    mergeTimer = setInterval(() => {
      shown++;
      drawTree();
      if (shown === merges.length) stopMerge();
    }, 850);
  };

  const spots = [0, 1, 2, 3, 9, 10, 11, 12, 20];
  const park = spots.map(value => [value, 0]);
  const parkX = value => 31 + value * 20;
  let parkTimer;
  byId('parkPerson').innerHTML = spots.map((value, i) => `<option value="${i}" ${i === 1 ? 'selected' : ''}>${value} ${meters}</option>`).join('');
  function drawPark() {
    const eps = Number(byId('parkEps').value);
    const min = Number(byId('parkMin').value);
    const person = Number(byId('parkPerson').value);
    const result = window.SROJ11.density(eps, min, park);
    const neighbors = result.neighbors[person];
    const point = spots[person];
    const minX = Math.max(13, parkX(point - eps));
    const maxX = Math.min(454, parkX(point + eps));
    const people = spots.map((value, i) => {
      const x = parkX(value);
      const group = result.labels[i];
      const tint = group === -1 ? 'var(--muted)' : colors[group % colors.length];
      const selected = i === person;
      const mark = group === -1 ? `<path d="M${x - 4} 71l8 8m0-8l-8 8" stroke="${tint}" stroke-width="2"/>`
        : `<circle cx="${x}" cy="75" r="6" stroke="${tint}" stroke-width="2" fill="${result.core[i] ? tint : 'var(--paper)'}"/>`;
      return `<g data-person="${i}">${selected ? `<circle cx="${x}" cy="75" r="10" fill="none" stroke="#e3a45e" stroke-width="2"/>` : ''}${mark}<text x="${x}" y="106" text-anchor="middle">${value}</text><circle cx="${x}" cy="75" r="10" fill="transparent"/></g>`;
    }).join('');
    const counts = t(`Топ саны: ${result.clusters} · Шу нүктелері: ${result.noise}`, `Групп: ${result.clusters} · Шумовых точек: ${result.noise}`, `Groups: ${result.clusters} · Noise points: ${result.noise}`);
    byId('parkPlot').innerHTML = `<svg class="guide-plot guide-park" viewBox="0 0 470 126" role="img" aria-label="${counts}">
      <path d="M13 75H454" stroke="var(--line)" stroke-width="2"/><path class="guide-reveal" d="M${minX} 58v-12H${maxX}v12" stroke="#e3a45e" fill="none" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="${(minX + maxX) / 2}" y="36" text-anchor="middle">ε = ${number.format(eps)} ${meters}</text>${people}<text x="450" y="106">${meters}</text></svg>`;
    const type = result.labels[person] < 0 ? t('шу', 'шум', 'noise')
      : result.core[person] ? t('негізгі нүкте', 'основная точка', 'core point') : t('шекаралық нүкте', 'край группы', 'border point');
    const nearby = neighbors.map(i => spots[i] + ' ' + meters).join(', ');
    byId('parkStatus').textContent = counts + '. ' + t(`${point} м белгісінде: ${type}. Радиуста ${neighbors.length} нүкте: ${nearby}.`, `На отметке ${point} м: ${type}. В радиусе ${neighbors.length} точек: ${nearby}.`, `At ${point} m: ${type}. Points within the radius (${neighbors.length}): ${nearby}.`);
    byId('epsValue').value = number.format(eps);
    byId('minValue').value = min;
  }
  function stopPark() {
    clearInterval(parkTimer);
    parkTimer = undefined;
    byId('parkPlay').textContent = parkLabel;
  }
  function preset(eps, min) {
    byId('parkEps').value = eps;
    byId('parkMin').value = min;
    drawPark();
  }
  const examples = [[.5, 3], [1, 3], [1, 4], [6, 3]];
  ['parkEps', 'parkMin', 'parkPerson'].forEach(id => byId(id).oninput = () => { stopPark(); drawPark(); });
  document.querySelectorAll('[data-eps]').forEach(button => button.onclick = () => { stopPark(); preset(button.dataset.eps, button.dataset.min); });
  byId('parkPlot').onclick = event => {
    const group = event.target.closest('[data-person]');
    if (!group) return;
    stopPark();
    byId('parkPerson').value = group.dataset.person;
    drawPark();
  };
  byId('parkPlay').onclick = () => {
    if (parkTimer) { stopPark(); return; }
    let step = 1;
    preset(...examples[0]);
    byId('parkPlay').textContent = pause;
    parkTimer = setInterval(() => {
      preset(...examples[step++]);
      if (step === examples.length) stopPark();
    }, 1250);
  };

  drawTree();
  drawPark();
})();
