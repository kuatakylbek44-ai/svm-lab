(() => {
  'use strict';
  const lang = document.documentElement.lang;
  const i = { kk: 0, ru: 1, en: 2 }[lang];
  const suffix = lang === 'kk' ? '' : '.' + lang;
  const t = (...labels) => labels[i];
  const species = ['setosa', 'versicolor', 'virginica'];
  const colors = ['#329e82', '#9574ce', '#d47648'];
  const percent = value => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 1 }).format(value);
  const lengthLabel = t('Күлте ұзындығы, см', 'Длина лепестка, см', 'Petal length, cm');
  const widthLabel = t('Күлте ені, см', 'Ширина лепестка, см', 'Petal width, cm');
  const logisticTitle = t('Логистикалық регрессия', 'Логистическая регрессия', 'Logistic regression');
  const host = document.getElementById('irisExperiment');
  const title = document.getElementById('irisModelTitle');
  const guide = document.getElementById('irisModelGuide');
  const tabs = [...document.querySelectorAll('.iris-model-tabs a')];
  const softmax = scores => {
    const peak = Math.max(...scores);
    const exp = scores.map(value => Math.exp(value - peak));
    const total = exp.reduce((sum, value) => sum + value, 0);
    return exp.map(value => value / total);
  };
  const best = scores => scores.indexOf(Math.max(...scores));
  const x = length => 48 + (length - 1) * 81;
  const y = width => 291 - width * 102;

  function fit(rows) {
    // Every fifth observation per species is reserved for evaluation.
    const train = rows.filter(row => !row.test);
    const test = rows.filter(row => row.test);
    const average = column => train.reduce((sum, row) => sum + row.features[column], 0) / train.length;
    const means = [average(0), average(1)];
    const scale = means.map((mean, column) => Math.sqrt(train.reduce((sum, row) => sum + (row.features[column] - mean) ** 2, 0) / train.length));
    const transform = features => [1, ...features.map((value, column) => (value - means[column]) / scale[column])];
    const training = train.map(row => ({ ...row, input: transform(row.features) }));
    const weights = species.map(() => [0, 0, 0]);
    const infer = input => softmax(weights.map(weight => weight.reduce((sum, value, column) => sum + value * input[column], 0)));

    for (let epoch = 0; epoch < 400; epoch++) {
      const gradient = species.map(() => [0, 0, 0]);
      for (const row of training) {
        const scores = infer(row.input);
        scores.forEach((probability, cls) => {
          const error = probability - Number(cls === row.cls);
          row.input.forEach((value, col) => { gradient[cls][col] += error * value; });
        });
      }
      weights.forEach((weight, cls) => weight.forEach((value, col) => {
        weight[col] -= .5 * gradient[cls][col] / training.length;
      }));
    }

    function nearest(features, k) {
      const input = transform(features);
      const neighbors = training.map(row => ({
        row, distance: (row.input[1] - input[1]) ** 2 + (row.input[2] - input[2]) ** 2
      })).sort((a, b) => a.distance - b.distance).slice(0, k);
      const scores = [0, 0, 0];
      neighbors.forEach(({ row }) => { scores[row.cls] += 1 / k; });
      // Break tied votes with the nearest member of a tied class.
      const winner = neighbors.find(({ row }) => scores[row.cls] === Math.max(...scores)).row.cls;
      return { scores, neighbors, winner };
    }
    const logistic = features => {
      const scores = infer(transform(features));
      return { scores, neighbors: [], winner: best(scores) };
    };
    const accuracy = predict => test.filter(row => predict(row.features).winner === row.cls).length / test.length;
    return { logistic, nearest, accuracy, trainCount: train.length, testCount: test.length };
  }

  const slider = (name, label, min, max, step, value) => `<label>${label} <output data-slider="${name}" for="iris-${name}">${value}</output><input id="iris-${name}" name="${name}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
  const dots = rows => rows.map(row => `<circle cx="${x(row.features[0])}" cy="${y(row.features[1])}" r="4" fill="${row.test ? 'none' : colors[row.cls]}" stroke="${colors[row.cls]}" opacity=".72"/>`).join('');
  const ticks = [1, 2, 3, 4, 5, 6, 7].map(value => `<path d="M${x(value)} 26V291"/><text x="${x(value)}" y="312" text-anchor="middle">${value}</text>`).join('')
    + [0, .5, 1, 1.5, 2, 2.5].map(value => `<path d="M48 ${y(value)}H534"/><text x="40" y="${y(value) + 4}" text-anchor="end">${value}</text>`).join('');

  function render(rows, model) {
    const isKnn = location.hash === '#knn';
    const name = isKnn ? 'KNN' : logisticTitle;
    const id = isKnn ? 'knn' : 'logistic';
    title.textContent = name;
    document.title = name + ' · Iris Lab';
    tabs.forEach((tab, index) => {
      if (index === Number(isKnn)) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    guide.replaceChildren(window.TOPIC_GUIDE.button([{ id, name }]));
    const instructions = isKnn
      ? t('Жаңа гүлдің өлшемдері мен k мәнін өзгерт. Сызықтар дауыс беретін көршілерді көрсетеді.', 'Измени размеры цветка и k. Линии показывают соседей, которые голосуют.', 'Change the flower measurements and k. Lines connect the neighbors that vote.')
      : t('Жаңа гүлдің өлшемдерін өзгерт. Модель үш түрдің ықтималдығын есептейді.', 'Измени размеры цветка. Модель вычислит вероятности трёх видов.', 'Change the flower measurements. The model calculates probabilities for all three species.');
    const share = isKnn ? t('Дауыс үлесі', 'Доля голосов', 'Vote share') : t('Ықтималдық', 'Вероятность', 'Probability');
    host.innerHTML = `<div class="starter-workbench">
      <section class="starter-visual">
        <h2>Iris · ${model.trainCount} / ${model.testCount} · train / test</h2>
        <ul class="iris-legend">${species.map((name, cls) => `<li><span style="--species:${colors[cls]}"></span>${name}</li>`).join('')}</ul>
        <svg class="iris-model-plot" viewBox="0 0 558 344" role="img" aria-label="${lengthLabel} × ${widthLabel}">
          <g class="iris-grid">${ticks}</g>
          <text x="50" y="17">${widthLabel}</text><text x="535" y="333" text-anchor="end">${lengthLabel}</text>
          <g>${dots(rows)}</g><g class="iris-neighbors"></g><circle class="iris-sample" r="8"/>
        </svg>
        <p>${t('Боялмаған нүктелер — тест деректері. Үлкен ақ нүкте — сен таңдаған гүл.', 'Пустые точки — тестовые данные. Большая белая точка — выбранный цветок.', 'Hollow points are test data. The large white point is your selected flower.')}</p>
      </section>
      <section class="starter-panel">
        <h2>${t('Өлшемдерді өзгерт', 'Измени параметры', 'Change the settings')}</h2><p>${instructions}</p>
        <form class="starter-controls">${slider('length', lengthLabel, 1, 7, .1, 4.5)}${slider('width', widthLabel, .1, 2.5, .1, 1.4)}${isKnn ? slider('k', t('Көршілер саны', 'Число соседей', 'Number of neighbors'), 1, 25, 1, 5) : ''}</form>
        <p class="starter-result" role="status"></p>
        <p>${share}</p><div class="iris-shares"></div>
      </section>
    </div>
    <details class="starter-explanation" open><summary>${window.TOPIC_GUIDE.label}</summary><p>${window.TOPIC_GUIDE.text(id)}</p>
    <p>${t('Бұл тәжірибе екі белгіге сүйенеді: күлтенің ұзындығы мен ені. Дәлдік модельге оқыту кезінде берілмеген 30 гүлден есептеледі.', 'Опыт использует два признака: длину и ширину лепестка. Точность считается на 30 цветках, исключённых из обучения.', 'This experiment uses two features: petal length and width. Accuracy is measured on 30 flowers held out from training.')}</p></details>`;
    const form = host.querySelector('form');
    const sample = host.querySelector('.iris-sample');
    const edges = host.querySelector('.iris-neighbors');
    const result = host.querySelector('.starter-result');
    const shares = host.querySelector('.iris-shares');
    let previousK;
    let accuracy;
    const update = () => {
      const { length, width, k } = Object.fromEntries(new FormData(form));
      const predict = isKnn ? features => model.nearest(features, Number(k)) : model.logistic;
      if (accuracy === undefined || k !== previousK) {
        accuracy = model.accuracy(predict);
        previousK = k;
      }
      form.querySelectorAll('output').forEach(output => { output.value = form.elements[output.dataset.slider].value; });
      const { scores, neighbors, winner } = predict([Number(length), Number(width)]);
      const cx = x(Number(length));
      const cy = y(Number(width));
      sample.setAttribute('cx', cx);
      sample.setAttribute('cy', cy);
      sample.setAttribute('stroke', colors[winner]);
      edges.innerHTML = neighbors.map(({ row }) => `<path d="M${cx} ${cy}L${x(row.features[0])} ${y(row.features[1])}" stroke="${colors[row.cls]}"/>`).join('');
      result.textContent = `${species[winner]} · ${t('Тест дәлдігі', 'Точность на тесте', 'Test accuracy')}: ${percent(accuracy)}`;
      shares.innerHTML = scores.map((value, cls) => `<div><label for="iris-share-${cls}">${species[cls]} <b>${percent(value)}</b></label><meter id="iris-share-${cls}" min="0" max="1" value="${value}"></meter></div>`).join('');
    };
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', update);
    update();
  }

  fetch('iris.csv').then(response => {
    if (!response.ok) throw new Error('Iris CSV');
    return response.text();
  }).then(csv => {
    const counts = [0, 0, 0];
    const rows = csv.trim().split(/\r?\n/).slice(1).map(line => {
      const [, , , length, width, name] = line.split(',');
      const cls = species.indexOf(name.trim());
      return { features: [Number(length), Number(width)], cls, test: ++counts[cls] % 5 === 0 };
    });
    if (rows.length !== 150 || rows.some(row => row.cls < 0 || !row.features.every(Number.isFinite))) throw new Error('Invalid Iris CSV');
    const model = fit(rows);
    window.addEventListener('hashchange', () => render(rows, model));
    render(rows, model);
  }).catch(() => {
    host.textContent = t('Iris деректері жүктелмеді. Бетті қайта жүктеп көр.', 'Не удалось загрузить Iris. Обнови страницу.', 'Iris data could not load. Refresh the page to try again.');
  });
})();
