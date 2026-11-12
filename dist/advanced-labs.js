(() => {
  'use strict';
  const regression = [[1, 34], [2, 46], [3, 47], [4, 63], [5, 65], [6, 78], [7, 83], [8, 89]];
  const assessment = [[95, 1], [88, 1], [79, 0], [75, 1], [67, 1], [58, 0], [50, 1], [44, 0], [39, 1], [32, 0], [21, 0], [12, 0]];
  const xor = [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]];
  const mean = values => values.reduce((sum, n) => sum + n, 0) / values.length;
  const sigmoid = value => 1 / (1 + Math.exp(-value));
  const green = '#329e82', purple = '#9574ce', orange = '#d6844d';
  let networkHistory;

  // Save a checkpoint every ten updates so the training slider can be scrubbed in either direction.
  function trainNetwork() {
    if (networkHistory) return networkHistory;
    let seed = 42;
    const initial = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296 * 2 - 1;
    };
    const hidden = Array.from({ length: 4 }, () => [initial(), initial(), initial()]);
    const output = Array.from({ length: 5 }, initial);
    const forward = (x, y) => {
      const h = hidden.map(([b, wx, wy]) => Math.tanh(b + wx * x + wy * y));
      return { h, p: sigmoid(h.reduce((z, value, j) => z + value * output[j + 1], output[0])) };
    };
    networkHistory = [];
    for (let epoch = 0; epoch <= 2000; epoch++) {
      const outputs = xor.map(([x, y]) => forward(x, y));
      if (epoch % 10 === 0) {
        const probabilities = outputs.map(({ p }) => p);
        const loss = mean(probabilities.map((p, i) => -Math.log(Math.max(1e-12, xor[i][2] ? p : 1 - p))));
        networkHistory.push({
          probabilities, loss, activations: outputs.map(({ h }) => h),
          hidden: hidden.map(unit => [...unit]), output: [...output]
        });
      }
      if (epoch === 2000) break;
      const outputGradient = Array(5).fill(0);
      const hiddenGradient = hidden.map(() => [0, 0, 0]);
      outputs.forEach(({ h, p }, i) => {
        const [x, y, actual] = xor[i];
        const error = p - actual;
        outputGradient[0] += error;
        h.forEach((activation, j) => {
          outputGradient[j + 1] += error * activation;
          const delta = error * output[j + 1] * (1 - activation ** 2);
          hiddenGradient[j][0] += delta;
          hiddenGradient[j][1] += delta * x;
          hiddenGradient[j][2] += delta * y;
        });
      });
      output.forEach((value, j) => { output[j] -= .15 * outputGradient[j]; });
      hidden.forEach((unit, j) => unit.forEach((value, k) => { unit[k] -= .15 * hiddenGradient[j][k]; }));
    }
    return networkHistory;
  }

  window.createAdvancedLabs = ({ t, range, select, checkbox, table, chart, fmt, outcome }) => {
    const actual = t('Нақты', 'Факт', 'Actual');
    const predicted = t('Болжам', 'Прогноз', 'Prediction');
    const thresholdLabel = t('Шешім шегі, %', 'Порог решения, %', 'Decision threshold, %');
    const percent = value => value === null ? '—' : fmt(value * 100) + '%';
    const ratio = (num, den) => den ? num / den : null;
    return {
      5: {
        instructions: t('Түзуді қолмен жылжыт немесе оқыту дерегіне ең кіші квадраттар әдісімен сәйкестендір. Үзік сызықтар болжам қателерін көрсетеді.', 'Подвигай прямую вручную или подбери её по обучающим данным методом наименьших квадратов. Пунктир показывает ошибки прогноза.', 'Move the line manually or fit it to the training data by least squares. Dashed lines show prediction errors.'),
        controls: () => select('fit', t('Түзуді құру', 'Построение прямой', 'Line fitting'), [['manual', t('Қолмен', 'Вручную', 'Manual')], ['ols', t('Ең кіші квадраттар', 'Наименьшие квадраты', 'Least squares')]])
          + range('slope', t('Көлбеулік w', 'Наклон w', 'Slope w'), 0, 16, 4)
          + range('intercept', t('Бастапқы мән b', 'Свободный член b', 'Intercept b'), 0, 65, 28)
          + checkbox('residuals', t('Қалдықтарды көрсету', 'Показать остатки', 'Show residuals')),
        render: ({ fit, slope, intercept, residuals }) => {
          const train = regression.slice(0, 6);
          const xMean = mean(train.map(([x]) => x));
          const yMean = mean(train.map(([, y]) => y));
          const fitted = train.reduce((sum, [x, y]) => sum + (x - xMean) * (y - yMean), 0)
            / train.reduce((sum, [x]) => sum + (x - xMean) ** 2, 0);
          const w = fit === 'ols' ? fitted : Number(slope);
          const b = fit === 'ols' ? yMean - w * xMean : Number(intercept);
          const predict = x => w * x + b;
          const mse = rows => mean(rows.map(([x, y]) => (y - predict(x)) ** 2));
          const xAt = x => 45 + x * 42;
          const maxY = Math.max(100, predict(8));
          const yAt = y => 154 - 125 * y / maxY;
          const summary = `ŷ = ${fmt(w)}x + ${fmt(b)} · Train MSE ${fmt(mse(train))} · Test MSE ${fmt(mse(regression.slice(6)))}`;
          const marks = `<path class="starter-mark" d="M${xAt(0)} ${yAt(b)}L${xAt(8)} ${yAt(predict(8))}" fill="none" stroke="${purple}" stroke-width="3"/>`
            + regression.map(([x, y], i) => `${residuals ? `<path d="M${xAt(x)} ${yAt(y)}V${yAt(predict(x))}" stroke="${orange}" stroke-dasharray="3 3"/>` : ''}<circle cx="${xAt(x)}" cy="${yAt(y)}" r="5" fill="${i < train.length ? green : orange}"/><text x="${xAt(x)}" y="175" text-anchor="middle">${x}</text>`).join('');
          const columns = [t('Сағат', 'Часы', 'Hours'), actual, predicted, t('Қалдық', 'Остаток', 'Residual'), 'Split'];
          return outcome(summary, chart(summary, marks) + table(columns, regression.map(([x, y], i) => [x, y, fmt(predict(x)), fmt(y - predict(x)), i < train.length ? 'Train' : 'Test'])), fit === 'ols'
            ? t('Түзу жасыл оқыту нүктелерінің квадраттық қатесін азайтады. Қызғылт сары тест нүктелері оны құруға қолданылмады.', 'Прямая минимизирует квадратичную ошибку на зелёных обучающих точках. Оранжевые тестовые точки при подборе не использовались.', 'The fitted line minimizes squared error on the green training points. The orange test points were held out.')
            : t('Түзу нүктелерден алыстаған сайын MSE өседі. b түзу бойын көтереді, w көлбеулігін өзгертеді.', 'Чем дальше прямая от точек, тем больше MSE. b поднимает прямую, w меняет наклон.', 'MSE grows as the line moves away from the points. b shifts the line up and w changes its slope.'));
        }
      },
      7: {
        instructions: t('Дайын тест ұпайларына шешім шегін қолдан. Шекті төмендеткенде қанша оң жағдай табылатынын және қанша жалған дабыл қосылатынын бақыла.', 'Примени порог к готовым тестовым оценкам. Снизь порог и посмотри, сколько положительных случаев найдено и сколько ложных тревог добавилось.', 'Apply a decision threshold to fixed test scores. Lower the threshold and count the positive cases found and the false alarms added.'),
        controls: () => range('threshold', thresholdLabel, 10, 100, 60),
        render: ({ threshold }) => {
          let tp = 0, tn = 0, fp = 0, fn = 0;
          const rows = assessment.map(([score, label]) => {
            const prediction = Number(score >= Number(threshold));
            const cell = prediction ? (label ? 'TP' : 'FP') : (label ? 'FN' : 'TN');
            if (cell === 'TP') tp++;
            if (cell === 'TN') tn++;
            if (cell === 'FP') fp++;
            if (cell === 'FN') fn++;
            return [score, label, prediction, cell];
          });
          const xAt = score => 42 + score * 3.5;
          const summary = `Accuracy ${percent((tp + tn) / rows.length)} · Precision ${percent(ratio(tp, tp + fp))} · Recall ${percent(ratio(tp, tp + fn))} · F1 ${percent(ratio(2 * tp, 2 * tp + fp + fn))}`;
          const marks = `<path class="starter-mark" d="M${xAt(Number(threshold))} 20v134" stroke="${purple}" stroke-dasharray="5 4" stroke-width="3"/>`
            + rows.map(([score, label, prediction]) => `<circle class="starter-mark" cx="${xAt(score)}" cy="${label ? 55 : 114}" r="6" fill="${label === prediction ? green : orange}"/>`).join('')
            + [0, 25, 50, 75, 100].map(n => `<text x="${xAt(n)}" y="174" text-anchor="middle">${n}%</text>`).join('');
          const matrix = table([actual + ' ↓ / ' + predicted + ' →', '1', '0'], [['1', `TP · ${tp}`, `FN · ${fn}`], ['0', `FP · ${fp}`, `TN · ${tn}`]]);
          return outcome(summary, chart(summary, marks) + matrix, t(
            `Жоғарғы қатар — нақты оң жағдайлар. Қызғылт сары нүктелер — қате. Шек ${threshold}% болғанда ${fp} жалған дабыл, ${fn} өткізіп алу бар.`,
            `Верхний ряд — реальные положительные случаи. Оранжевые точки — ошибки. При пороге ${threshold}% ложных тревог: ${fp}, пропусков: ${fn}.`,
            `The upper row contains actual positives. Orange dots mark errors. At ${threshold}%, there are ${fp} false alarms and ${fn} misses.`
          ));
        }
      },
      11: {
        instructions: t('Оқыту қадамын алға жылжыт. 2 → 4 → 1 желісі XOR мысалындағы төрт жауапты үйренеді. Loss пен ықтималдықтардың өзгерісін салыстыр.', 'Передвигай шаг обучения. Сеть 2 → 4 → 1 учится на четырёх примерах XOR. Сравни изменение loss и вероятностей.', 'Move through the training checkpoints. The 2 → 4 → 1 network learns four XOR examples. Compare the loss and probabilities.'),
        controls: () => range('epochs', t('Оқыту қадамы (×10)', 'Шаг обучения (×10)', 'Training step (×10)'), 0, 200, 0) + range('input', t('Кіріс жұбының №', 'Номер пары входов', 'Input pair number'), 1, 4, 2),
        render: ({ epochs, input }) => {
          const history = trainNetwork();
          const current = Number(epochs);
          const { probabilities, loss, hidden, output, activations } = history[current];
          const selected = Number(input) - 1;
          const correct = probabilities.filter((p, i) => Number(p >= .5) === xor[i][2]).length;
          const peak = Math.max(...history.map(step => step.loss));
          const line = history.slice(0, current + 1).map((step, i) => `${i ? 'L' : 'M'}${35 + i * 1.8},${154 - step.loss / peak * 122}`).join(' ');
          const [a, b, expected] = xor[selected];
          const summary = `Epoch ${current * 10} · Loss ${fmt(loss)} · ${correct}/4 · XOR(${a}, ${b}) → ${percent(probabilities[selected])}`;
          const marks = `<path class="starter-mark" d="${line}" stroke="${purple}" stroke-width="3" fill="none"/><circle cx="${35 + current * 1.8}" cy="${154 - loss / peak * 122}" r="5" fill="${green}"/><text x="35" y="174">0</text><text x="395" y="174" text-anchor="end">2000 epochs</text><text x="40" y="20">Loss</text>`;
          const link = (x1, y1, x2, y2, weight) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${weight >= 0 ? green : purple}" stroke-width="${Math.min(5, .8 + Math.abs(weight) * .85)}" opacity=".66"><title>w = ${fmt(weight)}</title></line>`;
          const unit = (x, y, value) => `<circle class="starter-mark" cx="${x}" cy="${y}" r="16" fill="${value >= 0 ? green : purple}"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="network-value">${fmt(value)}</text>`;
          const hiddenAt = [34, 71, 108, 145];
          const connections = hidden.map((weights, i) => link(55, 65, 205, hiddenAt[i], weights[1])
            + link(55, 115, 205, hiddenAt[i], weights[2]) + link(205, hiddenAt[i], 355, 90, output[i + 1])).join('');
          const networkLabel = t('Кіріс → жасырын қабат → шығыс', 'Вход → скрытый слой → выход', 'Input → hidden layer → output');
          const network = `<svg class="starter-chart" viewBox="0 0 420 185" role="img" aria-label="${networkLabel}">
            ${connections}${unit(55, 65, a)}${unit(55, 115, b)}${hiddenAt.map((y, i) => unit(205, y, activations[selected][i])).join('')}${unit(355, 90, probabilities[selected])}
            <text x="210" y="176" text-anchor="middle">${networkLabel}</text>
          </svg>`;
          const rows = xor.map(([x, y, target], i) => [i + 1, x, y, target, `${percent(probabilities[i])} → ${Number(probabilities[i] >= .5)}`]);
          return outcome(summary, network + chart(summary, marks) + table(['№', 'x₁', 'x₂', actual, predicted], rows), t(
            `Таңдалған жұптың дұрыс жауабы — ${expected}. 50% шегі желінің ықтималдығын 0 немесе 1 класына айналдырады. Бұл — оқыту дерегіндегі нәтиже.`,
            `Правильный ответ для выбранной пары — ${expected}. Порог 50% превращает вероятность в класс 0 или 1. Результат посчитан на обучающих примерах.`,
            `The selected pair has target ${expected}. A 50% threshold turns the probability into class 0 or 1. These results are on training examples.`
          ));
        }
      }
    };
  };
})();
