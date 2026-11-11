(() => {
  'use strict';

  const locale = { kk: 0, ru: 1, en: 2 }[document.documentElement.lang] ?? 0;
  const t = (...labels) => labels[locale];
  const labels = {
    student: t('Оқушы', 'Ученик', 'Student'),
    hours: t('Оқу сағаты', 'Часы учёбы', 'Study hours'),
    sleep: t('Ұйқы сағаты', 'Часы сна', 'Sleep hours'),
    score: t('Балл', 'Балл', 'Score'),
    actual: t('Нақты нәтиже', 'Фактический результат', 'Actual result'),
    predicted: t('Болжам', 'Прогноз', 'Prediction'),
    passed: t('Өтті', 'Сдал', 'Passed'),
    failed: t('Өтпеді', 'Не сдал', 'Failed'),
    correct: t('Дұрыс', 'Верно', 'Correct'),
    wrong: t('Қате', 'Ошибка', 'Incorrect'),
    mean: t('Орташа', 'Среднее', 'Mean'),
    rows: t('Жол саны', 'Число строк', 'Rows'),
    before: t('Бастапқы балл', 'Исходный балл', 'Original score'),
    after: t('Өңделген балл', 'Обработанный балл', 'Processed score')
  };
  const students = [
    { hours: 1, sleep: 8, score: 35 },
    { hours: 2, sleep: 6, score: 52 },
    { hours: 3, sleep: 7, score: 47 },
    { hours: 4, sleep: 5, score: 59 },
    { hours: 5, sleep: 8, score: 72 },
    { hours: 6, sleep: 6, score: 68 },
    { hours: 7, sleep: 7, score: 83 },
    { hours: 8, sleep: 5, score: 92 }
  ].map((student, i) => ({ ...student, id: i + 1 }));
  const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  const fmt = value => value.toLocaleString(document.documentElement.lang, { maximumFractionDigits: 2 });
  const table = (columns, rows) => `<div class="starter-table"><table><thead><tr>${columns.map(col => `<th scope="col">${col}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const range = (name, label, min, max, value) => `<label>${label} <output for="starter-${name}" data-value="${name}">${value}</output><input id="starter-${name}" type="range" name="${name}" min="${min}" max="${max}" value="${value}"></label>`;
  const select = (name, label, options) => `<label>${label}<select name="${name}">${options.map(([value, text]) => `<option value="${value}">${text}</option>`).join('')}</select></label>`;
  const checkbox = (name, label) => `<label class="starter-checkbox"><input type="checkbox" name="${name}"> ${label}</label>`;
  const chart = (label, marks) => `<svg class="starter-chart" viewBox="0 0 420 185" role="img" aria-label="${label}"><path d="M30 18v136h370" fill="none" stroke="currentColor" opacity=".35"/>${marks}</svg>`;
  const outcome = (summary, details) => ({ summary, details });

  const labs = {
    1: {
      instructions: t(
        'Оқу сағаты шектен асса немесе оған тең болса, модель «өтті» деп болжайды. Нақты нәтиже 50 баллдан басталады. Шекті өзгертіп, дәлдікті салыстыр.',
        'Модель предсказывает сдачу, если число часов не меньше порога. Фактический проходной балл — 50. Измени порог и сравни точность.',
        'The model predicts a pass when study hours meet the threshold. The actual passing score is 50. Move the threshold and compare accuracy.'
      ),
      controls: () => range('threshold', t('Оқу сағатының шегі', 'Порог часов учёбы', 'Study hours threshold'), 1, 9, 4),
      render: ({ threshold }) => {
        const results = students.map(student => {
          const actual = student.score >= 50;
          const predicted = student.hours >= Number(threshold);
          return { ...student, actual, predicted, correct: actual === predicted };
        });
        const correct = results.filter(row => row.correct).length;
        const x = hours => 55 + (hours - 1) * 40;
        const summary = t('Дәлдік', 'Точность', 'Accuracy') + `: ${fmt(100 * correct / results.length)}% (${correct}/${results.length})`;
        const marks = `<path d="M${x(Number(threshold)) - 12} 22v132" stroke="#9b72db" stroke-width="3" stroke-dasharray="5 5"/>`
          + results.map(row => `<circle class="starter-mark" cx="${x(row.hours)}" cy="${row.actual ? 57 : 115}" r="9" fill="${row.correct ? '#26866e' : '#c75259'}"/><text x="${x(row.hours)}" y="174" text-anchor="middle">${row.hours}</text>`).join('');
        return outcome(summary, chart(summary, marks) + table(
          [labels.hours, labels.actual, labels.predicted, t('Тексеру', 'Проверка', 'Check')],
          results.map(row => [row.hours, row.actual ? labels.passed : labels.failed, row.predicted ? labels.passed : labels.failed, row.correct ? labels.correct : labels.wrong])
        ));
      }
    },
    2: {
      instructions: t(
        'DataFrame жолдарын балл бойынша сүз және баған бойынша сұрыпта. Жол саны мен орташа балл қалай өзгеретінін байқа.',
        'Отфильтруй строки DataFrame по баллу и отсортируй по столбцу. Посмотри, как меняются число строк и средний балл.',
        'Filter the DataFrame by score and sort it by a column. Watch the row count and mean score change.'
      ),
      controls: () => range('minimum', t('Ең төменгі балл', 'Минимальный балл', 'Minimum score'), 0, 100, 50)
        + select('sort', t('Кему ретімен сұрыптау', 'Сортировать по убыванию', 'Sort descending'), [['score', labels.score], ['hours', labels.hours], ['sleep', labels.sleep]]),
      render: ({ minimum, sort }) => {
        const rows = students.filter(row => row.score >= Number(minimum)).sort((a, b) => b[sort] - a[sort]);
        const summary = `${labels.rows}: ${rows.length}/${students.length} · ${labels.mean}: ${rows.length ? fmt(mean(rows.map(row => row.score))) : '—'}`;
        return outcome(summary, table([labels.student, labels.hours, labels.sleep, labels.score], rows.map(row => [row.id, row.hours, row.sleep, row.score])));
      }
    },
    3: {
      instructions: t(
        'Оқу немесе ұйқы сағатын таңда. Нүктелік график әр оқушыны, ал бағандар әр сағат мәніндегі орташа балды көрсетеді.',
        'Выбери часы учёбы или сна. Точки показывают отдельных учеников, столбцы — средний балл для каждого значения часов.',
        'Choose study or sleep hours. The scatter plot shows each student, and bars show the mean score at each hour value.'
      ),
      controls: () => select('feature', t('Көлденең ось', 'Горизонтальная ось', 'Horizontal axis'), [['hours', labels.hours], ['sleep', labels.sleep]])
        + select('view', t('График түрі', 'Вид графика', 'Chart type'), [['scatter', t('Нүктелік', 'Точечный', 'Scatter')], ['bars', t('Бағандық', 'Столбчатый', 'Bars')]]),
      render: ({ feature, view }) => {
        const xs = students.map(row => row[feature]);
        const ys = students.map(row => row.score);
        const dx = xs.map(x => x - mean(xs));
        const dy = ys.map(y => y - mean(ys));
        const correlation = mean(dx.map((x, i) => x * dy[i])) / Math.sqrt(mean(dx.map(x => x ** 2)) * mean(dy.map(y => y ** 2)));
        const summary = `${labels[feature]} → ${labels.score} · Pearson r = ${fmt(correlation)}`;
        const x = value => 55 + (value - 1) * 44;
        const y = score => 154 - score * 1.25;
        const buckets = [...new Set(xs)].sort((a, b) => a - b);
        const ticks = buckets.map(value => `<text x="${x(value)}" y="175" text-anchor="middle">${value}</text>`).join('')
          + [0, 50, 100].map(score => `<text x="25" y="${y(score) + 4}" text-anchor="end">${score}</text>`).join('');
        const marks = view === 'scatter'
          ? students.map(row => `<circle class="starter-mark" cx="${x(row[feature])}" cy="${y(row.score)}" r="7" fill="#26866e"><title>${labels.student} ${row.id}: ${row.score}</title></circle>`).join('')
          : buckets.map(value => {
            const average = mean(students.filter(row => row[feature] === value).map(row => row.score));
            return `<rect class="starter-mark" x="${x(value) - 13}" y="${y(average)}" width="26" height="${154 - y(average)}" rx="4" fill="#8c69c5"><title>${value}: ${fmt(average)}</title></rect>`;
          }).join('');
        return outcome(summary, chart(summary, ticks + marks));
      }
    },
    4: {
      instructions: t(
        'Бос балдарды орташа немесе медианамен толтыр, не сол жолдарды алып таста. Min–max мәндерді 0 мен 1 аралығына келтіреді.',
        'Заполни пропуски средним или медианой либо удали строки. Min–max приводит значения к диапазону от 0 до 1.',
        'Fill missing scores with the mean or median, or drop those rows. Min–max scales the resulting values to the 0–1 range.'
      ),
      controls: () => select('strategy', t('Бос мәндерді өңдеу', 'Обработка пропусков', 'Missing values'), [
        ['mean', labels.mean], ['median', t('Медиана', 'Медиана', 'Median')], ['drop', t('Жолды алып тастау', 'Удалить строку', 'Drop row')]
      ]) + checkbox('scale', t('Min–max масштабтау', 'Min–max масштабирование', 'Min–max scaling')),
      render: ({ strategy, scale }) => {
        const scores = [35, null, 47, 59, null, 68, 83, 92];
        const known = scores.filter(score => score !== null).sort((a, b) => a - b);
        const middle = Math.floor(known.length / 2);
        const median = known.length % 2 ? known[middle] : mean([known[middle - 1], known[middle]]);
        const fill = strategy === 'median' ? median : mean(known);
        const rows = scores.map((score, i) => ({ id: i + 1, score, value: score ?? fill }))
          .filter(row => strategy !== 'drop' || row.score !== null);
        const low = known[0];
        const high = known[known.length - 1];
        const summary = `${labels.rows}: ${rows.length}/${scores.length} · ${scale ? 'Min–max: 0–1' : `${low}–${high}`}`;
        return outcome(summary, table([labels.student, labels.before, labels.after], rows.map(row => [
          row.id, row.score ?? '—', fmt(scale ? (row.value - low) / (high - low) : row.value)
        ])));
      }
    }
  };

  window.mountStarterLab = (host, week) => {
    const lab = labs[week];
    host.innerHTML = `<p class="starter-instructions">${lab.instructions}</p><form class="starter-controls">${lab.controls()}</form><p class="starter-result" role="status"></p><div class="starter-details"></div>`;
    const form = host.querySelector('form');
    const result = host.querySelector('.starter-result');
    const details = host.querySelector('.starter-details');
    const update = () => {
      const values = Object.fromEntries(new FormData(form));
      host.querySelectorAll('output[data-value]').forEach(output => { output.value = values[output.dataset.value]; });
      const view = lab.render(values);
      result.textContent = view.summary;
      details.innerHTML = view.details;
    };
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', update);
    update();
  };
})();
