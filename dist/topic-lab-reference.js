(() => {
  'use strict';
  const languageIndex = { kk: 0, ru: 1, en: 2 }[document.documentElement.lang];
  const t = (...copy) => copy[languageIndex];
  const controls = `<p class="topic-code-help">${t(
    'Код ағымдағы параметрлермен ашылады. Python 3-те немесе Colab ұяшығында іске қос. График үшін Matplotlib орнатылған ортада файлды --plot параметрімен орында.',
    'Код открывается с текущими параметрами. Запусти его в Python 3 или ячейке Colab. Для графика запусти файл с --plot в среде с Matplotlib.',
    'The code opens with your current parameters. Run it in Python 3 or a Colab cell. To draw the chart, run the file with --plot in an environment with Matplotlib.'
  )}</p>
  <div class="topic-lab-actions topic-code-actions">
    <button type="button" class="topic-lab-button" data-copy disabled>${t('Көшіру', 'Копировать', 'Copy')}</button>
    <button type="button" class="topic-lab-button" data-download disabled>${t('Python файлын жүктеу', 'Скачать файл Python', 'Download Python file')} ↓</button>
    <span data-code-status role="status"></span>
  </div><pre class="topic-code"><code></code></pre>`;
  const pythonValue = value => typeof value === 'boolean' ? (value ? 'True' : 'False') : JSON.stringify(value);
  const pythonDict = settings => '{' + Object.entries(settings).map(([key, value]) => `${JSON.stringify(key)}: ${pythonValue(value)}`).join(', ') + '}';

  function createSource(number) {
    let request;
    const source = () => {
      request ||= fetch(`lab-python/lab-${number}.py`).then(response => {
        if (!response.ok) throw new Error('Lab source is unavailable');
        return response.text();
      }).catch(error => {
        request = undefined;
        throw error;
      });
      return request;
    };
    return async (stage, current, baseline) => {
      const full = (await source()).replace(/^PARAMETERS = .*$/m, () => 'PARAMETERS = ' + pythonDict(current))
        .replace(/^BASELINE = .*$/m, () => 'BASELINE = ' + pythonDict(baseline));
      if (stage === 'code') return full;
      const blocks = full.split(/^# --- (overview|experiment|results|defense|main) ---\r?\n/gm);
      const index = blocks.indexOf(stage);
      if (index === -1) throw new Error('Lab section is unavailable');
      return blocks[0] + blocks[index + 1].trimEnd() + `\n\n\nif __name__ == "__main__":\n    ${stage}()\n`;
    };
  }

  function createCodePanel(host, number, loadSource) {
    host.innerHTML = controls;
    const code = host.querySelector('code');
    const copy = host.querySelector('[data-copy]');
    const download = host.querySelector('[data-download]');
    const status = host.querySelector('[data-code-status]');
    let revision = 0;
    let filename;

    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = t('Көшірілді', 'Скопировано', 'Copied');
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = t('Код белгіленді. Ctrl+C бас.', 'Код выделен. Нажми Ctrl+C.', 'Code selected. Press Ctrl+C to copy.');
      }
    });
    download.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([code.textContent], { type: 'text/x-python;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    return async (stage, current, baseline) => {
      const requested = ++revision;
      code.textContent = '';
      copy.disabled = download.disabled = true;
      status.textContent = t('Код жүктелуде…', 'Код загружается…', 'Loading code…');
      try {
        const source = await loadSource(stage, current, baseline);
        if (requested !== revision) return;
        filename = `lab-${number}${stage === 'code' ? '' : '-' + stage}.py`;
        code.textContent = source;
        status.textContent = filename;
        copy.disabled = download.disabled = false;
      } catch {
        if (requested === revision) status.textContent = t('Код жүктелмеді. Бетті қайта ашып көр.', 'Код не загрузился. Попробуй открыть страницу заново.', 'The code did not load. Try reopening the page.');
      }
    };
  }

  window.LAB_REFERENCE = { createSource, createCodePanel };
})();
