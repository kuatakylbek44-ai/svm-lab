(() => {
  'use strict';
  const lang = document.documentElement.lang;
  const t = (...copy) => copy[{ kk: 0, ru: 1, en: 2 }[lang]];
  const suffix = lang === 'kk' ? '' : '.' + lang;
  const numberLocale = lang === 'kk' ? 'ru-RU' : lang;
  const locale = new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 2 });
  const integer = new Intl.NumberFormat(numberLocale);
  const percent = value => locale.format(value * 100) + '%';
  const asset = 'week11-files/';
  const back = `index${suffix}.html#topic-group-11`;
  const host = document.getElementById('week11Main');
  const chapters = [
    ['overview', t('Жұмыстың мақсаты', 'Цель работы', 'Aim'), ['setup']],
    ['digits', t('NumPy · DIGITS', 'NumPy · DIGITS', 'NumPy · DIGITS'), ['digits']],
    ['mnist', t('TensorFlow · MNIST', 'TensorFlow · MNIST', 'TensorFlow · MNIST'), ['mnist-data', 'mnist-train']],
    ['predictions', t('Болжамдар және қателер', 'Прогнозы и ошибки', 'Predictions and errors'), ['evaluate']],
    ['compare', t('128 / 256 және Tuner', '128 / 256 и Tuner', '128 / 256 and Tuner'), ['mnist-train', 'tuner']],
    ['defense', t('Ақылбек пен Алмас · қорғау', 'Акылбек и Алмас · защита', 'Akylbek and Almas · presentation'), []],
    ['code', t('Толық Python коды', 'Полный код Python', 'Full Python code'), []]
  ];
  const labels = {
    heading: t('Компьютер цифрды қалай таниды?', 'Как компьютер распознаёт цифры?', 'How does a computer recognize digits?'),
    actual: t('Нақты', 'Факт', 'Actual'), predicted: t('Болжам', 'Прогноз', 'Prediction'),
    notes: t('Қорғау мәтіні', 'Текст для защиты', 'Presentation notes'),
    explanation: t('Түсіндірме', 'Объяснение', 'Explanation'),
    formulas: t('Формулалар', 'Формулы', 'Formulas'),
    pageCode: t('Осы беттің коды', 'Код этой страницы', 'Code for this page'),
    training: t('Оқыту', 'Обучение', 'Training'), loss: t('Шығын', 'Потери', 'Loss'),
    next: t('Келесі бет', 'Следующая страница', 'Next page'), prev: t('Артқа', 'Назад', 'Back')
  };
  const metric = (value, label) => `<div><strong>${value}</strong><small>${label}</small></div>`;
  const metrics = (...items) => `<div class="week11-metrics">${items.map(args => metric(...args)).join('')}</div>`;
  const table = (headers, rows, extra = '') => `<div class="week11-table-wrap"><table class="week11-table ${extra}"><thead><tr>${headers.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => extra && i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const notebook = `<a class="topic-lab-button" href="${asset}week11-akylbek-almas.ipynb" download>↓ Colab notebook</a>`;
  const python = `<a class="topic-lab-button" href="${asset}week11-study.py" download>↓ Python</a>`;
  const practice = `<a class="topic-lab-button" href="topic-lab${suffix}.html?n=11&amp;fromTopic=11">XOR ↗</a>`;
  const heading = (title, desc = '') => `<div class="topic-lab-heading"><div><p class="topic-lab-kicker">11 / ${String(active + 1).padStart(2, '0')}</p><h2 tabindex="-1">${title}</h2>${desc ? `<p class="week11-lead">${desc}</p>` : ''}</div></div>`;
  const toolbar = () => `<div class="topic-lab-actions topic-lab-reference">
    ${chapters[active][2].length ? `<button type="button" class="topic-lab-button" data-dialog="code">&lt;/&gt; ${labels.pageCode}</button>` : ''}
    <button type="button" class="topic-lab-button" data-dialog="formulas">ƒ ${labels.formulas}</button>
    <button type="button" class="topic-lab-button" data-dialog="explanation">${labels.explanation}</button>
    <button type="button" class="topic-lab-button" data-dialog="notes">${labels.notes}</button>
    ${active === 6 ? '' : `<a class="topic-lab-button" href="#code">${chapters[6][1]} →</a>`}
  </div>`;
  let data;
  let active = 0;
  let timer;
  let sourceRequest;

  function paint(canvas, pixels, signed = false) {
    const side = Math.sqrt(pixels.length);
    canvas.width = canvas.height = side;
    const ctx = canvas.getContext('2d');
    const picture = ctx.createImageData(side, side);
    const max = signed ? Math.max(...pixels.map(Math.abs), .01) : 255;
    pixels.forEach((pixel, i) => {
      const n = Math.abs(pixel) / max;
      const rgb = signed ? (pixel < 0 ? [146, 111, 211] : [88, 216, 173]) : [172, 242, 213];
      picture.data.set([Math.round(15 + (rgb[0] - 15) * n), Math.round(28 + (rgb[1] - 28) * n), Math.round(22 + (rgb[2] - 22) * n), 255], i * 4);
    });
    ctx.putImageData(picture, 0, 0);
  }

  function miniGrid(node, samples) {
    node.innerHTML = `<div class="week11-digit-grid">${samples.map(sample => `<figure><canvas aria-label="${labels.actual}: ${sample.actual}" role="img"></canvas><figcaption>${sample.actual}</figcaption></figure>`).join('')}</div>`;
    node.querySelectorAll('canvas').forEach((canvas, i) => paint(canvas, samples[i].pixels));
  }

  function gallery(node, samples) {
    node.innerHTML = `<div class="week11-digit-grid">${samples.map((sample, i) => `<button type="button" data-sample="${i}" aria-label="${labels.actual} ${sample.actual}, ${labels.predicted} ${sample.prediction}" aria-pressed="false"><canvas aria-hidden="true"></canvas><span>${sample.actual} → ${sample.prediction}</span></button>`).join('')}</div>
      <div class="week11-detail"><canvas role="img"></canvas><div><p data-prediction role="status"></p><div class="week11-bars"></div></div></div>`;
    const buttons = [...node.querySelectorAll('button[data-sample]')];
    buttons.forEach((button, i) => paint(button.querySelector('canvas'), samples[i].pixels));
    const select = index => {
      const sample = samples[index];
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const canvas = node.querySelector('.week11-detail canvas');
      canvas.setAttribute('aria-label', `${labels.actual} ${sample.actual}`);
      paint(canvas, sample.pixels);
      node.querySelector('[data-prediction]').textContent = `${labels.actual}: ${sample.actual} · ${labels.predicted}: ${sample.prediction}`;
      node.querySelector('.week11-bars').innerHTML = sample.probabilities.map((p, digit) => `<label>${digit}<meter min="0" max="1" value="${p}" aria-label="${digit}: ${percent(p)}"></meter><span>${percent(p)}</span></label>`).join('');
      node.dispatchEvent(new CustomEvent('digit-selection', { detail: sample }));
    };
    buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
    select(0);
  }

  function chart(series, limit, maxY, maxX, axis) {
    const colors = ['#52bd99', '#a98ad8', '#df9c5c'];
    const x = value => 44 + value / maxX * 492;
    const y = value => 183 - value / maxY * 149;
    const grid = Array.from({ length: 5 }, (_, i) => {
      const v = i * maxY / 4;
      return `<path class="grid" d="M44 ${y(v)}H536"/><text x="40" y="${y(v) + 4}" text-anchor="end">${locale.format(v)}</text>`;
    }).join('');
    const plots = series.map((line, index) => {
      const values = line.values.slice(0, limit + 1);
      const last = values.at(-1);
      return `<polyline points="${values.map(([a, b]) => `${x(a)},${y(b)}`).join(' ')}" stroke="${colors[index]}" stroke-width="3" fill="none"/>${last ? `<circle cx="${x(last[0])}" cy="${y(last[1])}" r="5" fill="${colors[index]}"/>` : ''}
      <text x="${49 + index * 110}" y="17" style="fill:${colors[index]}">${line.name}</text>`;
    }).join('');
    return `<svg class="week11-plot" viewBox="0 0 550 218" role="img" aria-label="${axis}">${grid}${plots}<text x="44" y="203">0</text><text x="536" y="203" text-anchor="end">${maxX}</text><text x="280" y="215" text-anchor="middle">${axis}</text></svg>`;
  }

  function overview() {
    return `<div class="topic-lab-hero"><div><p class="topic-lab-kicker">11 / DIGITS + MNIST</p><h1 tabindex="-1">${labels.heading}</h1>
      <p class="topic-lab-question">${t('Пиксельден болжамға.', 'От пикселей к прогнозу.', 'From pixels to a prediction.')}</p>
      <p class="topic-lab-lead">${t('Ақылбек NumPy желісін ашады. Алмас TensorFlow моделінің нәтижесін және қате таныған цифрларын көрсетеді.', 'Акылбек разбирает сеть NumPy. Алмас показывает результаты TensorFlow и ошибки на цифрах.', 'Akylbek opens up the NumPy network. Almas shows TensorFlow results and misclassified digits.')}</p>
      ${toolbar()}
      <div class="topic-lab-actions"><a class="topic-lab-button primary" href="#digits">${t('Зертхананы бастау', 'Начать лабораторную', 'Start the lab')} ↗</a>${notebook}${practice}</div>
      ${metrics([percent(data.digits.accuracy32), 'DIGITS · NumPy'], [percent(data.mnist.models[0].accuracy), 'MNIST · Dense 128'], [integer.format(data.mnist.testCount), t('MNIST тест кескіні', 'тестовых изображений MNIST', 'MNIST test images')])}</div>
      <figure class="topic-lab-preview"><figcaption>MNIST · 28×28</figcaption><div id="previewDigits"></div></figure></div>`;
  }

  function digits() {
    const d = data.digits;
    return heading(chapters[1][1], t('Ақылбек · 64 кіріс, tanh жасырын қабаты, 10 Softmax ықтималдығы. 300 қадамдағы нақты оқыту жазбасын ойнат.', 'Акылбек · 64 входа, скрытый tanh, 10 вероятностей Softmax. Проиграй сохранённые результаты 300 шагов.', 'Akylbek · 64 inputs, a tanh hidden layer, and 10 Softmax probabilities. Replay the recorded 300 updates.')) + toolbar()
      + metrics([percent(d.accuracy2), t('2 нейрон · test', '2 нейрона · test', '2 units · test')], [percent(d.accuracy32), t('32 нейрон · test', '32 нейрона · test', '32 units · test')], [`${d.testCount - d.errors}/${d.testCount}`, t('Дұрыс болжам', 'Верные прогнозы', 'Correct predictions')])
      + `<div class="week11-grid"><section class="week11-panel"><h3>${labels.training} · DIGITS</h3>
      <div class="week11-controls"><label>${t('Градиент қадамы', 'Шаг градиента', 'Gradient step')} <output id="digitsStep"></output><input id="digitsRange" type="range" min="0" max="30" value="0"></label>
      <button id="digitsPlay" type="button" class="topic-lab-button">▶ ${t('Ойнату', 'Проиграть', 'Replay')}</button></div><div id="digitsChart"></div><p class="week11-insight" id="digitsMetric"></p></section>
      <section class="week11-panel"><h3>${t('32 нейронның салмақ картасы', 'Карты весов 32 нейронов', '32 learned weight maps')}</h3>
      <div class="week11-controls"><label>${t('Жасырын нейрон', 'Скрытый нейрон', 'Hidden unit')} <output id="weightNumber"></output><input id="weightRange" type="range" min="1" max="32" value="1"></label></div>
      <div class="week11-detail"><canvas id="weightMap" role="img" aria-label="8×8"></canvas><p id="activation"></p></div></section></div>
      <section class="week11-panel"><h3>${t('Цифрды таңдап, он ықтималдықты қара', 'Выбери цифру и проверь десять вероятностей', 'Pick a digit and inspect its ten probabilities')}</h3><div id="digitsGallery"></div></section>`;
  }

  function mnist() {
    const m = data.mnist;
    const baseline = m.models[0];
    return heading(chapters[2][1], t('Алмас · 28×28 пиксель, 5 эпоха. Adam және SparseCategoricalCrossentropy(from_logits=True).', 'Алмас · 28×28 пикселей, 5 эпох. Adam и SparseCategoricalCrossentropy(from_logits=True).', 'Almas · 28×28 pixels, 5 epochs. Adam and SparseCategoricalCrossentropy(from_logits=True).')) + toolbar()
      + metrics([integer.format(m.trainCount), 'Train'], [integer.format(m.validationCount), 'Validation'], [integer.format(m.testCount), 'Test'])
      + `<div class="week11-flow"><span>28 × 28</span> → <span>Flatten · 784</span> → <span>Dense · 128 / ReLU</span> → <span>Dropout · 0.2</span> → <span>Dense · 10 logits</span></div>
      <div class="week11-grid"><section class="week11-panel"><h3>${t('Алғашқы 10 оқыту кескіні', 'Первые 10 обучающих изображений', 'First 10 training images')}</h3><div id="mnistTraining"></div></section>
      <section class="week11-panel"><h3>${t('Валидациядағы дәлдік', 'Точность на валидации', 'Validation accuracy')}</h3>
      ${chart([{ name: baseline.name, values: baseline.history.val_accuracy.map((v, i) => [i + 1, v]) }], 4, 1, 5, t('Эпоха', 'Эпоха', 'Epoch'))}
      <p class="week11-insight">Test accuracy: <strong>${percent(baseline.accuracy)}</strong> · Test loss: ${baseline.test_loss.toFixed(4)}</p></section></div>`;
  }

  function predictions() {
    const m = data.mnist;
    const maximum = Math.max(...m.matrix.flat());
    const matrix = table(['↓ / →', ...m.matrix.map((_, i) => i)], m.matrix.map((row, a) => [a, ...row.map((count, b) => `<button type="button" data-actual="${a}" data-predicted="${b}" aria-label="${labels.actual} ${a}, ${labels.predicted} ${b}: ${count}" aria-pressed="false" style="background:${a === b ? 'rgba(65,170,127,' + (.13 + count / maximum * .5) + ')' : 'rgba(211,129,91,' + Math.min(.8, count * .024) + ')'}">${count}</button>`)]), 'week11-matrix');
    return heading(chapters[3][1], t('Базалық 128 нейрондық желі. Кескінді басып, Softmax ықтималдықтарын қара. Матрицада жол — нақты цифр, баған — болжам.', 'Базовая сеть 128. Нажми изображение, чтобы увидеть вероятности Softmax. Строка матрицы — факт, столбец — прогноз.', 'Baseline with 128 units. Select an image to inspect Softmax probabilities. Matrix rows are actual digits; columns are predictions.')) + toolbar()
      + metrics([integer.format(m.testCount - m.errors), t('Дұрыс жауап', 'Верные прогнозы', 'Correct predictions')], [integer.format(m.errors), t('Қате', 'Ошибки', 'Errors')], [percent(m.models[0].accuracy), 'Test accuracy'])
      + `<div class="week11-grid"><section class="week11-panel"><h3>${t('Тест кескінін зертте', 'Исследуй тестовое изображение', 'Inspect a test image')}</h3>
      <div class="week11-controls"><label>${t('Үлгілер', 'Примеры', 'Examples')}<select id="predictionSet"><option value="first">${t('Алғашқы 10', 'Первые 10', 'First 10')}</option><option value="mistakes">${t('10 қате болжам', '10 ошибок', '10 misclassifications')}</option></select></label></div><div id="mnistGallery"></div></section>
      <section class="week11-panel"><h3>${t('Қателер матрицасы', 'Матрица ошибок', 'Confusion matrix')}</h3>${matrix}
      <p class="week11-insight" id="matrixReading" role="status">${t('Ұяшықты басып, санын оқы.', 'Нажми ячейку, чтобы прочитать число.', 'Select a cell to read its count.')}</p></section></div>
      <section class="week11-panel"><h3>${t('Ең жиі шатасқан жұптар', 'Самые частые ошибки', 'Most frequent mistakes')}</h3>
      ${table([labels.actual, labels.predicted, t('Саны', 'Число', 'Count')], m.top.map(row => [row.actual, row.prediction, row.count]))}</section>`;
  }

  function compare() {
    const m = data.mnist;
    const [baseline, wide, tuned] = m.models;
    const change = (wide.accuracy - baseline.accuracy) * 100;
    return heading(chapters[4][1], t('Әділ салыстыру: бірдей деректер мен 5 эпоха. Tuner 4 нұсқаны validation дәлдігімен таңдады; тест тек соңғы бағалауға қолданылды.', 'Сравнение на одинаковых данных за 5 эпох. Tuner проверил 4 конфигурации на validation; test применён только для итоговой оценки.', 'Same data and five epochs. Tuner compared four configurations on validation; test was used only for final evaluation.')) + toolbar()
      + metrics([percent(baseline.accuracy), 'Dense 128 · test'], [percent(wide.accuracy), 'Dense 256 · test'], [percent(tuned.accuracy), 'Tuned · test'])
      + `<div class="week11-grid"><section class="week11-panel"><h3>${t('Үш модельдің тест нәтижесі', 'Тестовые результаты трёх моделей', 'Three models on the test set')}</h3>
      ${table([t('Модель', 'Модель', 'Model'), t('Нейрон', 'Нейронов', 'Units'), 'Adam LR', t('Параметр', 'Параметры', 'Parameters'), 'Accuracy', 'Loss'], m.models.map(r => [r.name, r.units, r.rate, integer.format(r.parameters), percent(r.accuracy), r.test_loss.toFixed(4)]))}
      <p class="week11-insight">256 − 128: ${change >= 0 ? '+' : ''}${locale.format(change)} ${t('пайыздық тармақ', 'процентного пункта', 'percentage points')}.</p></section>
      <section class="week11-panel"><h3>Keras Tuner · RandomSearch</h3>
      ${table([t('Нейрон', 'Нейронов', 'Units'), 'Adam LR', 'Validation accuracy'], m.trials.map(r => [r.units, r.rate, percent(r.val_accuracy)]))}
      <p class="week11-insight">${t('Таңдалған нұсқа', 'Выбранная конфигурация', 'Selected configuration')}: ${tuned.units} · LR ${tuned.rate}</p>
      ${tuned.units === wide.units && tuned.rate === wide.rate ? `<p>${t(
        'Tuner 256 нейрондық модельдің параметрлерін қайта таңдады. Екі нәтиженің айырмасы бөлек оқытудағы топтардың әртүрлі ретімен байланысты болуы мүмкін.',
        'Tuner выбрал ту же конфигурацию, что и модель на 256 нейронов. Разница может зависеть от порядка пакетов при повторном обучении.',
        'The tuner chose the same configuration as the 256-unit model. The difference may come from batch order in the separate training run.'
      )}</p>` : ''}</section></div>
      <section class="week11-panel"><h3>${t('Эпохалар бойынша салыстыру', 'Сравнение по эпохам', 'Compare by epoch')}</h3>
      <div class="week11-controls"><label>${t('Көрсеткіш', 'Показатель', 'Metric')}<select id="compareMetric"><option value="val_accuracy">Validation accuracy</option><option value="val_loss">Validation loss</option></select></label></div><div id="comparePlot"></div></section>`;
  }

  function speech() {
    const d = data.digits;
    const m = data.mnist;
    const [baseline, wide, tuned] = m.models;
    const mistakes = m.top.slice(0, 3).map(row => `${row.actual} → ${row.prediction} (${row.count})`).join(', ');
    return `<div class="topic-lab-defense week11-speech">
      <section><h3>Ақылбек · 1–2 ${t('минут', 'минуты', 'minutes')}</h3><p>${t(
        `DIGITS-тегі 8×8 суретті 64 мәнге айналдырдық. Бірдей деректе 2 және 32 нейронды салыстырдық. 300 қадамнан кейін тест дәлдігі ${percent(d.accuracy2)} және ${percent(d.accuracy32)} болды. Салмақ картасын және бір цифрдың Softmax мәндерін көрсетемін. Алға тарату ықтималдық береді, кері тарату сол болжамның қатесі бойынша салмақтарды түзетеді. Енді Алмас үлкенірек MNIST дерегіндегі жұмысты көрсетеді.`,
        `Снимок DIGITS 8×8 превращаем в 64 числа. Сравнили 2 и 32 нейрона на одних данных. После 300 шагов тестовая точность ${percent(d.accuracy2)} и ${percent(d.accuracy32)}. Покажу карту весов и вероятности одного примера. Прямой проход даёт прогноз, обратный изменяет веса по ошибке. Теперь Алмас покажет MNIST.`,
        `DIGITS turns an 8×8 image into 64 values. We compared 2 and 32 hidden units on the same split. After 300 steps, test accuracies were ${percent(d.accuracy2)} and ${percent(d.accuracy32)}. I’ll show a weight map and one digit’s Softmax probabilities. The forward pass predicts and backpropagation updates weights from the error. Almas will now show MNIST.`
      )}</p></section>
      <section><h3>Алмас · 2–3 ${t('минут', 'минуты', 'minutes')}</h3><p>${t(
        `MNIST-те 28×28 пиксельді 0–1 аралығына келтірдік. Желіні 5 эпоха оқыттық. 128 нейрон ${percent(baseline.accuracy)}, 256 нейрон ${percent(wide.accuracy)}, Tuner нұсқасы ${percent(tuned.accuracy)} көрсетті. Қателер матрицасында жол — нақты цифр, баған — болжам. Ең жиі шатасулар: ${mistakes}. Жақсарту үшін CNN мен деректі көбейтуді validation арқылы салыстырар едім.`,
        `Пиксели MNIST 28×28 нормализовали до 0–1. Обучали 5 эпох. 128 нейронов дали ${percent(baseline.accuracy)}, 256 — ${percent(wide.accuracy)}, вариант Tuner — ${percent(tuned.accuracy)}. В матрице строка — факт, столбец — прогноз. Частые ошибки: ${mistakes}. Для улучшения сравню CNN и аугментацию на validation.`,
        `MNIST inputs are 28×28 and normalized to 0–1. We trained for five epochs. 128 units reached ${percent(baseline.accuracy)}, 256 reached ${percent(wide.accuracy)}, and the tuned model reached ${percent(tuned.accuracy)}. Rows are actual digits and columns are predictions. Frequent mistakes: ${mistakes}. Next I’d compare a CNN and augmentation using validation.`
      )}</p></section>
      <details><summary>${t('Неге validation мен test бөлек?', 'Зачем разделять validation и test?', 'Why separate validation and test?')}</summary><p>${t('Validation модель мен гиперпараметр таңдауға қолданылады. Test соңында тәуелсіз баға береді.', 'Validation служит для выбора модели и гиперпараметров. Test даёт независимую итоговую оценку.', 'Validation guides model and hyperparameter selection. Test provides an independent final evaluation.')}</p></details>
      <details><summary>${t('Неге Dropout тестте сөнеді?', 'Почему Dropout выключен на тесте?', 'Why is Dropout off at test time?')}</summary><p>${t('Оқыту кезінде ғана нейрондардың бір бөлігін уақытша өшіреді. Тестте толық желі тұрақты болжам береді.', 'Только при обучении он временно отключает часть нейронов. На тесте работает вся сеть.', 'Dropout temporarily masks some units during training. The full network runs during evaluation.')}</p></details>
      <details><summary>${t('Неге соңғы қабат Softmax қолданбайды?', 'Почему в последнем слое нет Softmax?', 'Why is Softmax separate from the final layer?')}</summary><p>${t('Оқытуда from_logits=True шығынды логиттерден тұрақты есептейді. Болжамды көрсеткенде логиттерге Softmax қолданамыз.', 'При обучении from_logits=True стабильно считает потери из логитов. Для вывода вероятностей применяем Softmax отдельно.', 'During training, from_logits=True computes the loss directly from logits. We apply Softmax separately when displaying probabilities.')}</p></details>
      <details><summary>${t('Ең үлкен желі әрқашан жақсы ма?', 'Всегда ли большая сеть лучше?', 'Is a wider network always better?')}</summary><p>${t('Нейрон саны өскенде параметр саны да артады. Кестеден дәлдік өсімі мен қосымша параметр санын қатар салыстыр. Бір іске қосу қорытындыны барлық дерекке таратпайды.', 'С числом нейронов растёт число параметров. Сравни прирост точности и размер сети. Один запуск не позволяет обобщить результат.', 'More units add parameters. Compare the gain in accuracy with model size. One run cannot establish that the gain generalizes.')}</p></details>
    </div>`;
  }

  const formulas = () => `<dl class="topic-lab-formulas">
    <div><dt>x′ = x / 16 (DIGITS) · x′ = x / 255 (MNIST)</dt><dd>${t('Пиксельді 0–1 аралығына келтіреміз. Мысалы, MNIST-тегі 128 → 0,502.', 'Пиксели приводим к 0–1. Например, 128 → 0,502.', 'Scale pixels to 0–1. For MNIST, 128 → 0.502.')}</dd></div>
    <div><dt>h = tanh(XW₁+b₁) · z = hW₂+b₂ · ReLU(z) = max(0,z)</dt><dd>${t('NumPy жасырын қабаты tanh, Keras жасырын қабаты ReLU қолданады. z — Softmax-қа дейінгі логиттер.', 'В NumPy используется tanh, в скрытом слое Keras — ReLU. z — логиты до Softmax.', 'NumPy uses tanh, while the Keras hidden layer uses ReLU. z contains logits before Softmax.')}</dd></div>
    <div><dt>pⱼ = exp(zⱼ − max z) / Σₖ exp(zₖ − max z) · L = −mean(log pᵧ)</dt><dd>${t('Softmax он ықтималдық береді, қосындысы 1. Cross-entropy тек нақты кластың ықтималдығына қарайды. pᵧ = 0,9 → L ≈ 0,105.', 'Softmax даёт десять вероятностей с суммой 1. Cross-entropy использует вероятность истинного класса. При pᵧ = 0,9 получаем L ≈ 0,105.', 'Softmax produces ten probabilities that sum to one. Cross-entropy uses the true-class probability. pᵧ = 0.9 gives L ≈ 0.105.')}</dd></div>
    <div><dt>dZ = (P−Y)/n · dH = (dZ W₂ᵀ) ⊙ (1−H²) · W ← W − ηdW</dt><dd>${t('Шығыстағы қате жасырын қабатқа тарайды. Салмақтар шығынды азайтатын бағытқа жаңарады.', 'Ошибка выхода передаётся в скрытый слой. Веса обновляются в сторону снижения потерь.', 'Output error propagates into the hidden layer. We update weights to reduce loss.')}</dd></div>
    <div><dt>ŷ = argmaxⱼ pⱼ · Accuracy = correct / total</dt><dd>${t('Ең үлкен ықтималдықтың индексі — цифр болжамы. Тесттегі дұрыс жауаптар үлесі дәлдікті береді.', 'Индекс максимальной вероятности — прогноз цифры. Точность — доля верных ответов на тесте.', 'The largest probability gives the predicted digit. Accuracy is the fraction of correct test predictions.')}</dd></div>
  </dl>`;

  function explanation() {
    const d = data.digits;
    const m = data.mnist;
    const [base, wide, tuned] = m.models;
    const most = m.top[0];
    const pages = [
      [
        t('Мақсат — пиксельдерден 0–9 цифрларының бірін болжау. Оң жақтағы он сурет — MNIST оқыту жиынының басы; астындағы сан — деректегі нақты белгі.', 'Цель — предсказать цифру от 0 до 9 по пикселям. Справа первые десять обучающих изображений MNIST, под ними истинные метки.', 'The goal is to predict a digit from 0 to 9 from its pixels. The ten images are the first MNIST training examples. The digits below are their actual labels.'),
        t('«Зертхананы бастау» батырмасын бас. Алдымен 8×8 DIGITS желісін, кейін 28×28 MNIST желісін аш.', 'Нажми «Начать лабораторную». Сначала открой сеть DIGITS 8×8, затем MNIST 28×28.', 'Start the lab. Open the 8×8 DIGITS network first, then the 28×28 MNIST network.'),
        t('«Ақылбек NumPy-де желінің ішін көрсетеді. Алмас TensorFlow моделін бағалайды. Екі дәлдікті тікелей жарыстырмаймыз: суреттер мен тест жиындары бөлек.»', '«Акылбек покажет устройство сети NumPy, Алмас оценит TensorFlow. Точности относятся к разным изображениям и тестовым наборам».', '“Akylbek will show how the NumPy network works. Almas will evaluate the TensorFlow model. Each accuracy belongs to a different dataset and test set.”')
      ],
      [
        t('8×8 кескін 64 санға айналады. Алға тарату tanh пен Softmax арқылы он ықтималдық береді. Кері тарату шығынның градиентін есептеп, салмақтарды түзетеді. Қисықтар оқыту жиынындағы шығынды көрсетеді; жоғарғы карточкалар бөлек тест дәлдігін көрсетеді.', 'Изображение 8×8 превращается в 64 числа. Прямой проход через tanh и Softmax даёт десять вероятностей. Обратный проход обновляет веса по градиенту потерь. На графике потери обучения, на карточках точность отдельного теста.', 'An 8×8 image becomes 64 values. The forward pass uses tanh and Softmax to give ten probabilities. Backpropagation computes gradients to update the weights. The curves show training loss; the cards show held-out test accuracy.'),
        t('«Ойнату» батырмасын басып, 0–300 қадамдағы қисықтарды салыстыр. Цифр мен жасырын нейронды таңда: картадағы түс кіріс салмағының таңбасын, tanh мәні осы цифрға берілген реакцияны көрсетеді.', 'Проиграй 0–300 шагов. Выбери цифру и скрытый нейрон: цвет карты показывает знак веса пикселя, а tanh — реакцию на выбранное изображение.', 'Replay steps 0–300. Pick a digit and hidden unit: map colors show the signs of pixel weights, and the tanh value shows the response to that digit.'),
        t(`«Бірдей бөлініс пен 300 қадамда 2 нейрон ${percent(d.accuracy2)}, 32 нейрон ${percent(d.accuracy32)} көрсетті. 32 нейрондық модель ${d.testCount} тест цифрының ${d.testCount - d.errors}-сын таныды.»`, `«На одном разбиении после 300 шагов 2 нейрона дали ${percent(d.accuracy2)}, а 32 — ${percent(d.accuracy32)}. Верно распознано ${d.testCount - d.errors} из ${d.testCount} цифр».`, `“On the same split after 300 steps, two units scored ${percent(d.accuracy2)} and 32 scored ${percent(d.accuracy32)}. The larger network got ${d.testCount - d.errors} of ${d.testCount} test digits right.”`)
      ],
      [
        t('Пиксельді 255-ке бөлеміз. Flatten 28×28 кескінді 784 санға жазады. Dense(128) пен ReLU белгілерді үйренеді. Dropout(0,2) тек оқытуда жұмыс істейді. Соңғы он логит cross-entropy-ге тікелей беріледі.', 'Пиксель делим на 255. Flatten превращает 28×28 в 784 числа. Dense(128) и ReLU изучают признаки. Dropout(0,2) работает при обучении. Десять логитов идут прямо в cross-entropy.', 'Divide pixels by 255. Flatten turns 28×28 into 784 values. Dense(128) and ReLU learn features. Dropout(0.2) runs during training. Ten logits go directly into cross-entropy.'),
        t('Алғашқы 10 кескіннің астындағы нақты цифрларды көрсет. Архитектураны солдан оңға оқып, бес эпоханың validation қисығын соңғы test accuracy мәнімен шатастырма.', 'Покажи истинные цифры под первыми 10 изображениями. Пройди схему слева направо и отличи кривую validation за пять эпох от итоговой test accuracy.', 'Show the labels under the first ten images. Walk through the architecture from left to right and distinguish the five-epoch validation curve from final test accuracy.'),
        t(`«Оқытуға ${integer.format(m.trainCount)}, бақылауға ${integer.format(m.validationCount)} кескін бердік. Adam бес эпоха бойы салмақтарды жаңартты. Соңында модель бөлек тестте ${percent(base.accuracy)} көрсетті.»`, `«Обучали на ${integer.format(m.trainCount)}, проверяли на validation из ${integer.format(m.validationCount)} изображений. Adam обновлял веса пять эпох. Итоговый тест — ${percent(base.accuracy)}».`, `“We trained on ${integer.format(m.trainCount)} images and validated on ${integer.format(m.validationCount)}. Adam updated weights for five epochs. The separate test score was ${percent(base.accuracy)}.”`)
      ],
      [
        t('Softmax ықтималдықтары қосындысы 1 болады. Ең үлкен мәннің индексі — болжам. Матрицада жол — нақты цифр, баған — болжам; диагональ — дұрыс жауаптар.', 'Вероятности Softmax в сумме дают 1. Индекс максимума — прогноз. В матрице строки — истинные цифры, столбцы — прогноз, диагональ — верные ответы.', 'Softmax probabilities sum to one. The maximum gives the predicted digit. Matrix rows are actual digits, columns are predictions, and the diagonal contains correct predictions.'),
        t(`«10 қате болжамды» таңда да, бір кескіндегі ең үлкен екі ықтималдықты салыстыр. Матрицада ${most.actual} жолы мен ${most.prediction} бағанын бас: ${most.count} деген сан осы бағыттағы қателерді білдіреді.`, `Выбери «10 ошибок» и сравни две крупнейшие вероятности. Нажми строку ${most.actual} и столбец ${most.prediction}: ${most.count} — число ошибок в этом направлении.`, `Select ten misclassifications and compare the two highest probabilities for one image. Select row ${most.actual}, column ${most.prediction}: ${most.count} is the error count in that direction.`),
        t(`«Базалық модель ${integer.format(m.testCount - m.errors)} кескінді дұрыс таныды, ${m.errors} кескінде қателесті. Мысалы, нақты ${most.actual} цифрын ${most.prediction} деп ${most.count} рет болжады.»`, `«Базовая модель правильно распознала ${integer.format(m.testCount - m.errors)} изображений и ошиблась ${m.errors} раз. Например, ${most.actual} принят за ${most.prediction} ${most.count} раза».`, `“The baseline correctly recognized ${integer.format(m.testCount - m.errors)} images and made ${m.errors} errors. It predicted ${most.prediction} for an actual ${most.actual} on ${most.count} occasions.”`)
      ],
      [
        t('128 және 256 нейрон бірдей дерек бөлінісінде 5 эпоха оқыды. Tuner төрт нұсқаны validation дәлдігімен салыстырды. Таңдалған нұсқа жаңадан оқытылып, test-те бағаланды.', 'Модели 128 и 256 обучались 5 эпох на одном разбиении. Tuner сравнил четыре конфигурации по validation. Выбранная модель обучена заново и проверена на test.', 'The 128- and 256-unit models trained for five epochs on the same split. The tuner compared four configurations on validation. The selected model was retrained and evaluated on test.'),
        t('Кестеде дәлдікпен бірге параметр санын қара. Графикті Validation accuracy-ден Validation loss-қа ауыстыр. Accuracy дұрыс жауапты санайды, loss модельдің сенімділігін де ескереді.', 'Сравни точность и число параметров. Переключи Validation accuracy на Validation loss. Accuracy считает верные ответы, loss учитывает также уверенность.', 'Compare both accuracy and parameter count. Switch the chart from validation accuracy to validation loss. Accuracy counts correct predictions, while loss also accounts for confidence.'),
        t(`«128 нейрон ${percent(base.accuracy)}, 256 нейрон ${percent(wide.accuracy)} көрсетті. Tuner ${tuned.units} нейрон мен LR=${tuned.rate} таңдады. Қайта оқыту нәтижесі — ${percent(tuned.accuracy)}; бір іске қосудағы айырма тұрақты артықшылықты дәлелдемейді.»`, `«128 нейронов дали ${percent(base.accuracy)}, 256 — ${percent(wide.accuracy)}. Tuner выбрал ${tuned.units} и LR=${tuned.rate}. Повторное обучение дало ${percent(tuned.accuracy)}; один запуск не доказывает устойчивого преимущества».`, `“128 units reached ${percent(base.accuracy)}, and 256 reached ${percent(wide.accuracy)}. The tuner chose ${tuned.units} units and LR=${tuned.rate}. Retraining scored ${percent(tuned.accuracy)}; one run cannot establish a consistent advantage.”`)
      ],
      [
        t('Қорғау екі бөлікке бөлінген: Ақылбек модельдің қалай үйренетінін көрсетеді, Алмас тест нәтижесін және қателерді талдайды.', 'Защита состоит из двух частей: Акылбек показывает обучение сети, Алмас анализирует тест и ошибки.', 'The presentation has two parts. Akylbek shows how the network learns, and Almas explains the test results and errors.'),
        t('Әр адам бір тәжірибені қолмен көрсетсін. Содан кейін төмендегі сұрақтарды ашып, жауапты өз сөздеріңмен айтыңдар.', 'Каждый показывает один пример сам. Затем откройте вопросы и ответьте своими словами.', 'Each presenter should demonstrate one interaction. Then open the questions and answer in your own words.'),
        t('«Жұмысымыз екі модельді салыстырумен аяқталады. Келесі қадам — CNN мен деректі көбейтуді validation арқылы тексеріп, жиі шатасатын цифрларға әсерін өлшеу.»', '«Дальше сравним CNN и аугментацию на validation и оценим их влияние на частые ошибки».', '“Next we would compare a CNN and data augmentation on validation and measure their effect on the most frequent mistakes.”')
      ],
      [
        t('Толық Python файлы деректі жүктейді, NumPy және Keras модельдерін оқытады, төрт Tuner сынағын орындайды және график пен нәтижелерді шығарады.', 'Полный файл загружает данные, обучает NumPy и Keras, запускает четыре пробы Tuner и сохраняет графики и результаты.', 'The full Python file loads the data, trains the NumPy and Keras models, runs four tuner trials, and saves plots and results.'),
        t('Notebook-ты ашып, алдымен сақталған нәтижелерді қара. Қайта есептеу қажет болса, Colab-та Run all таңда. Жеке бет коды алдыңғы ұяшықтарға сүйенеді, толық файлды басынан орындауға болады.', 'Открой notebook и сначала посмотри сохранённые результаты. Для пересчёта запусти Run all в Colab. Фрагменты страниц зависят от предыдущих ячеек; полный файл запускается целиком.', 'Open the notebook and inspect the saved outputs first. Choose Run all in Colab to recompute. Page excerpts rely on earlier cells; the full script can run from the beginning.'),
        t('«Кодтан үш жерді көрсете аламыз: train_digits — қолмен кері тарату, build_mnist — Keras архитектурасы, confusion_matrix — қателерді жинау.»', '«Покажем три места: train_digits — ручной обратный проход, build_mnist — архитектура Keras, confusion_matrix — подсчёт ошибок».', '“We can point to three places in the code: train_digits for manual backpropagation, build_mnist for the Keras architecture, and confusion_matrix for counting errors.”')
      ]
    ];
    const titles = [t('Бұл бетте не көрсетілген?', 'Что показывает страница?', 'What this page shows'),
      t('Экранда не істеу керек?', 'Что сделать на экране?', 'What to do on screen'),
      t('Қорғауда қалай айтуға болады?', 'Как объяснить на защите?', 'What to say during the presentation')];
    return `<div class="week11-explanation">${pages[active].map((paragraph, i) => `<section class="week11-panel"><h3>${titles[i]}</h3><p>${paragraph}</p></section>`).join('')}</div>`;
  }

  const source = () => {
    sourceRequest ||= fetch(asset + 'week11-study.py').then(response => {
      if (!response.ok) throw Error('Source unavailable');
      return response.text();
    }).catch(error => { sourceRequest = undefined; throw error; });
    return sourceRequest;
  };
  async function showCode(node, sections) {
    node.innerHTML = `<p class="week11-lead">${sections.length ? t('Бұл үзінді notebook-та алдыңғы ұяшықтардан кейін орындалады.', 'Этот раздел выполняется после предыдущих ячеек ноутбука.', 'Run this section after the preceding notebook cells.') : t('Толық файлды Python-да орында немесе Colab-та notebook аш.', 'Запусти полный файл в Python или открой notebook в Colab.', 'Run the full Python file or open the notebook in Colab.')}</p>
      <div class="topic-lab-actions"><button type="button" class="topic-lab-button" data-copy disabled>${t('Көшіру', 'Копировать', 'Copy')}</button>${python}${notebook}<span role="status"></span></div><pre class="topic-code"><code></code></pre>`;
    const block = node.querySelector('code');
    const button = node.querySelector('[data-copy]');
    const status = node.querySelector('[role=status]');
    status.textContent = t('Жүктелуде…', 'Загрузка…', 'Loading…');
    try {
      const full = await source();
      const parts = full.split(/^# %% ([\w-]+)[ \t]*\r?$/gm);
      block.textContent = sections.length ? sections.map(section => '# %% ' + section + parts[parts.indexOf(section) + 1]).join('\n') : full;
      status.textContent = '';
      button.disabled = false;
      button.onclick = async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          status.textContent = t('Көшірілді', 'Скопировано', 'Copied');
        } catch {
          const range = document.createRange();
          range.selectNodeContents(block);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          status.textContent = 'Ctrl+C';
        }
      };
    } catch { status.textContent = t('Код жүктелмеді.', 'Код не загрузился.', 'Code could not load.'); }
  }

  function showDialog(kind) {
    const dialog = document.getElementById('week11Dialog');
    const body = document.getElementById('week11DialogBody');
    document.getElementById('week11DialogTitle').textContent = kind === 'explanation'
      ? `${labels.explanation} · ${chapters[active][1]}`
      : labels[kind === 'code' ? 'pageCode' : kind];
    if (kind === 'code') showCode(body, chapters[active][2]);
    else if (kind === 'explanation') body.innerHTML = explanation();
    else body.innerHTML = kind === 'notes' ? speech() : formulas();
    dialog.showModal();
  }

  function bindDigits() {
    const d = data.digits;
    const slider = host.querySelector('#digitsRange');
    const weights = host.querySelector('#weightRange');
    let selected;
    const draw = () => {
      const i = Number(slider.value);
      const series = [
        { name: '2 units', values: d.history2.map(row => [row.step, row.loss]) },
        { name: '32 units', values: d.history32.map(row => [row.step, row.loss]) }
      ];
      const maximum = Math.max(...series.flatMap(line => line.values.map(([, v]) => v)));
      host.querySelector('#digitsChart').innerHTML = chart(series, i, maximum, 300, labels.loss);
      host.querySelector('#digitsStep').value = d.history32[i].step;
      host.querySelector('#digitsMetric').textContent = `32 · Loss ${d.history32[i].loss.toFixed(3)} · Train accuracy ${percent(d.history32[i].accuracy)}`;
    };
    const weight = () => {
      const i = Number(weights.value) - 1;
      host.querySelector('#weightNumber').value = i + 1;
      paint(host.querySelector('#weightMap'), d.weights[i], true);
      host.querySelector('#activation').textContent = `${t('Таңдалған цифр', 'Выбранная цифра', 'Selected digit')}: ${selected.actual} · tanh = ${selected.activations[i].toFixed(3)}`;
    };
    const galleryNode = host.querySelector('#digitsGallery');
    galleryNode.addEventListener('digit-selection', event => { selected = event.detail; weight(); });
    gallery(galleryNode, d.samples);
    slider.addEventListener('input', () => { clearInterval(timer); draw(); });
    weights.addEventListener('input', weight);
    host.querySelector('#digitsPlay').onclick = () => {
      clearInterval(timer);
      slider.value = 0;
      draw();
      timer = setInterval(() => {
        slider.value = Number(slider.value) + 1;
        draw();
        if (Number(slider.value) === 30) clearInterval(timer);
      }, 105);
    };
    draw();
  }

  function render() {
    clearInterval(timer);
    active = Math.max(0, chapters.findIndex(([key]) => '#' + key === location.hash));
    const section = [
      overview, digits, mnist, predictions, compare,
      () => heading(chapters[5][1]) + toolbar() + speech() + `<div class="topic-lab-actions">${notebook}${python}</div>
        <p class="week11-lead">${t('Дереккөздер', 'Источники', 'Sources')} · <a href="https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_digits.html">DIGITS</a> · <a href="https://www.tensorflow.org/tutorials/quickstart/beginner">TensorFlow MNIST</a> · <a href="https://www.tensorflow.org/tutorials/keras/keras_tuner">Keras Tuner</a></p>`,
      () => heading(chapters[6][1]) + toolbar() + '<div id="week11FullCode"></div>'
    ][active];
    host.innerHTML = section();
    document.querySelectorAll('#week11Rail nav a').forEach((link, i) => {
      if (i === active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('week11Crumb').textContent = chapters[active][1];
    document.getElementById('week11ProgressText').textContent = `0${active + 1} / 0${chapters.length}`;
    document.getElementById('week11Progress').value = active + 1;
    document.getElementById('week11Prev').hidden = active === 0;
    document.getElementById('week11Prev').href = '#' + chapters[Math.max(0, active - 1)][0];
    document.getElementById('week11Next').href = active === chapters.length - 1 ? back : '#' + chapters[active + 1][0];
    document.getElementById('week11Next').textContent = (active === chapters.length - 1 ? t('Тақырыптар', 'Темы', 'Topics') : labels.next) + ' →';
    if (active === 0) miniGrid(host.querySelector('#previewDigits'), data.mnist.training);
    if (active === 1) bindDigits();
    if (active === 2) miniGrid(host.querySelector('#mnistTraining'), data.mnist.training);
    if (active === 3) {
      const select = host.querySelector('#predictionSet');
      const draw = () => gallery(host.querySelector('#mnistGallery'), data.mnist[select.value]);
      select.addEventListener('change', draw);
      draw();
      host.querySelectorAll('[data-actual]').forEach(button => button.addEventListener('click', () => {
        host.querySelector('[data-actual][aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-pressed', 'true');
        const { actual, predicted } = button.dataset;
        host.querySelector('#matrixReading').textContent = `${labels.actual} ${actual} → ${labels.predicted} ${predicted}: ${data.mnist.matrix[actual][predicted]}`;
      }));
    }
    if (active === 4) {
      const select = host.querySelector('#compareMetric');
      const draw = () => {
        const series = data.mnist.models.map(model => ({ name: model.name, values: model.history[select.value].map((v, i) => [i + 1, v]) }));
        const maximum = select.value === 'val_accuracy' ? 1 : Math.max(...series.flatMap(line => line.values.map(([, value]) => value)));
        host.querySelector('#comparePlot').innerHTML = chart(series, 4, maximum, 5, t('Эпоха', 'Эпоха', 'Epoch'));
      };
      select.addEventListener('change', draw);
      draw();
    }
    if (active === 6) showCode(host.querySelector('#week11FullCode'), []);
    host.querySelectorAll('[data-dialog]').forEach(button => button.onclick = () => showDialog(button.dataset.dialog));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.getElementById('week11Rail').innerHTML = `<a class="topic-lab-brand" href="${back}">ML<span>LAB</span></a>
    <p class="topic-lab-topic">11 · DIGITS &amp; MNIST</p><nav aria-label="ML LAB">${chapters.map(([key, title], i) => `<a href="#${key}"><span>0${i + 1}</span>${title}</a>`).join('')}</nav><a class="topic-lab-return" href="${back}">← ${t('Тақырыптар', 'Темы', 'Topics')}</a>`;
  document.getElementById('week11Header').innerHTML = `<span class="topic-lab-crumb" id="week11Crumb"></span><button type="button" class="topic-lab-button" id="labNotes" disabled>${labels.notes} ↗</button>`;
  document.getElementById('week11Footer').innerHTML = `<div class="topic-lab-progress"><span id="week11ProgressText"></span><progress id="week11Progress" max="${chapters.length}" value="1"></progress></div>
    <div class="topic-lab-actions"><a class="topic-lab-button" id="week11Prev" hidden>← ${labels.prev}</a><a class="topic-lab-button primary" id="week11Next"></a></div>`;
  document.getElementById('week11Dialog').innerHTML = `<div class="topic-lab-heading"><h2 id="week11DialogTitle"></h2><form method="dialog"><button class="topic-lab-button">${t('Жабу', 'Закрыть', 'Close')}</button></form></div><div id="week11DialogBody"></div>`;

  fetch(asset + 'week11-results.json').then(response => {
    if (!response.ok) throw Error('Result data unavailable');
    return response.json();
  }).then(result => {
    data = result;
    document.getElementById('labNotes').disabled = false;
    document.getElementById('labNotes').onclick = () => showDialog('notes');
    window.addEventListener('hashchange', render);
    render();
  }).catch(() => {
    host.innerHTML = `<p>${t('Нәтиже жүктелмеді. Notebook файлын ашып көр.', 'Результат не загрузился. Открой notebook.', 'Results could not load. Open the notebook instead.')}</p>${notebook}`;
  });
})();
