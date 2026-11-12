(() => {
  'use strict';
  const lang = document.documentElement.lang;
  const index = { kk: 0, ru: 1, en: 2 }[lang] ?? 0;
  const label = ['Түсіндірме', 'Объяснение', 'Explanation'][index];
  const close = ['Жабу', 'Закрыть', 'Close'][index];
  const guides = {
    intro: [
      'Оқу сағаты шекке тең немесе одан көп болса, болжам «өтті» болады. Дәлдік = дұрыс болжам саны / барлық болжам саны. Шекті 4-тен 9-ға жылжыт: жоғары шек өткен оқушыларды да «өтпеді» деп жіктей бастайды.',
      'Число часов не ниже порога даёт прогноз «сдал». Точность = верные прогнозы / все прогнозы. Подними порог с 4 до 9: часть сдавших модель начнёт относить к несдавшим.',
      'Hours at or above the threshold predict a pass. Accuracy is correct predictions divided by all predictions. Move the threshold from 4 to 9: students who passed start being classified as failures.'
    ],
    pandas: [
      'DataFrame-де әр жол бір оқушыны, әр баған бір белгіні білдіреді. Сүзгі шектен төмен жолдарды алып тастайды, ал сұрыптау қалған жолдардың ретін ғана өзгертеді. Бір шекте сұрыптау бағанын ауыстырып, орташа балдың сақталатынын тексер.',
      'Строка DataFrame — ученик, столбец — признак. Фильтр убирает строки ниже порога, а сортировка меняет только порядок. При фиксированном пороге смени столбец сортировки: средний балл останется прежним.',
      'Each DataFrame row is a student and each column is a feature. A filter removes rows below the cutoff; sorting only reorders the remaining rows. Keep the cutoff fixed and change the sort column: the mean stays the same.'
    ],
    visualization: [
      'Әр нүкте бір оқушыны көрсетеді, ал баған бірдей сағаттағы оқушылардың орташа балын көрсетеді. Pearson r +1-ге жақындаса, сызықтық байланыс оң, −1-ге жақындаса, теріс. Оқу сағатын ұйқы сағатына ауыстырып салыстыр.',
      'Точка показывает одного ученика, столбец — средний балл для одного значения часов. Pearson r около +1 означает положительную линейную связь, около −1 — отрицательную. Сравни часы учёбы и сна.',
      'A point represents one student; a bar shows the mean score for one hour value. Pearson r near +1 means a positive linear relationship, and near −1 means a negative one. Switch from study to sleep hours to compare.'
    ],
    preprocessing: [
      'Орташа мен медиана бос ұяшықты толтырады, ал жолды алып тастау бақылау санын азайтады. Min–max формуласы (x − min) / (max − min). Масштабтауды қосып, ең кіші мән 0, ең үлкен мән 1 болғанын тексер.',
      'Среднее и медиана заполняют пропуски, а удаление строк сокращает число наблюдений. Формула min–max: (x − min) / (max − min). Включи масштабирование и найди минимум 0 и максимум 1.',
      'Mean and median imputation fill blanks, while dropping rows reduces the sample size. Min–max uses (x − min) / (max − min). Turn scaling on and look for a minimum of 0 and a maximum of 1.'
    ],
    linear: ['Регрессия санды болжайды. Қалдық — нақты мән мен болжамның айырмасы. MSE осы айырмаларды квадраттап орташалайды, сондықтан үлкен қателердің әсері артады.', 'Регрессия предсказывает число. Остаток — разность факта и прогноза. MSE усредняет квадраты остатков, усиливая влияние крупных ошибок.', 'Regression predicts a number. A residual is the actual value minus the prediction. MSE averages squared residuals, so large errors have more influence.'],
    logistic: ['Iris моделіне гүлдің төрт өлшемі беріледі. Softmax үш түрдің ықтималдығын есептейді. 04-бөлімде өлшемдерді өзгертіп, болжамның қалай өзгеретінін көр.', 'Модель Iris использует четыре измерения цветка. Softmax рассчитывает вероятности трёх видов. В разделе 04 измени измерения и посмотри, как меняется прогноз.', 'The Iris model uses four flower measurements. Softmax calculates probabilities for the three species. In chapter 04, change the measurements to see how the prediction moves.'],
    evaluation: ['Модельді оқытуға қатыспаған дерекпен бағала. Precision болжанған оң нәтижелерді, recall нақты оң нәтижелерді негізге алады. Қате түрлерін confusion matrix арқылы салыстыр.', 'Оцени модель на данных вне обучения. Precision опирается на предсказанные положительные случаи, recall — на фактические. Сравни виды ошибок по матрице ошибок.', 'Evaluate on data held out from training. Precision uses predicted positives; recall uses actual positives. Compare error types in the confusion matrix.'],
    knn: ['KNN ең жақын k гүлдің дауысына сүйенеді. 06-бөлімде k мәндерін ауыстырып, бес бөліктік кросс-валидация нәтижесін салыстыр.', 'KNN использует голоса k ближайших цветков. В разделе 06 сравни результаты пятикратной кросс-валидации при разных k.', 'KNN uses votes from the k closest flowers. In chapter 06, compare five-fold cross-validation scores for different k values.'],
    svm: ['Margin — шекара мен оған ең жақын нүктелер арасындағы аралық. C өскенде оқыту қателеріне айып күшейеді. Шекара зертханасында C-ні өзгертіп, тірек векторларын салыстыр.', 'Margin — отступ от границы до ближайших точек. При росте C ошибки обучения штрафуются сильнее. Измени C и сравни опорные векторы.', 'The margin is the distance from the boundary to the closest points. Larger C penalizes training errors more strongly. Change C and compare the support vectors.'],
    penguins: ['Бір ағаш тармақтар арқылы шешім қабылдайды. Random Forest бірнеше ағаштың дауысын біріктіреді. Бір пингвиннің белгілерін өзгертіп, модельдердің болжамдарын салыстыр.', 'Одно дерево принимает решение по ветвям. Random Forest объединяет голоса деревьев. Измени признаки одного пингвина и сравни прогнозы моделей.', 'One tree makes decisions along branches. Random Forest combines votes from multiple trees. Change a penguin’s features and compare the models’ predictions.'],
    autompg: ['MPG — отынның бір галлонына жүретін миль саны. Салмақты өзгертіп, модельдер берген болжамдарды салыстыр. RMSE үлкен қателерге MAE-ге қарағанда көбірек салмақ береді.', 'MPG — мили на галлон топлива. Измени вес и сравни прогнозы моделей. RMSE сильнее реагирует на крупные ошибки, чем MAE.', 'MPG means miles traveled per gallon of fuel. Change vehicle weight and compare predictions. RMSE gives large errors more weight than MAE.'],
    unsupervised: ['K-Means нүктелерді ең жақын центрге бөледі. k мәнін өзгертіп, топтардың бөлінуін бақыла. PCA көп белгіні аз оське проекциялап, топтарды графикте көруге көмектеседі.', 'K-Means назначает точки ближайшему центру. Измени k и посмотри на разбиение. PCA проецирует признаки на меньшее число осей, чтобы показать группы.', 'K-Means assigns points to the nearest center. Change k and compare the grouping. PCA projects features onto fewer axes to make groups easier to visualize.'],
    imbalanced: ['Сирек класс үшін accuracy жоғары болғанның өзінде recall төмен болуы мүмкін. Шекті төмендетіп, recall мен precision қалай өзгеретінін салыстыр.', 'У редкого класса recall может быть низким даже при высокой accuracy. Снизь порог и сравни изменения recall и precision.', 'A rare class can have low recall even when accuracy is high. Lower the threshold and compare changes in recall and precision.'],
    neural: ['XOR зертханасында жасырын қабаттың оқыту кезінде қалай өзгеретінін бақыла. MNIST практикасында softmax арқылы болжанған цифрды нақты белгімен салыстыр.', 'В лаборатории XOR проследи, как скрытый слой меняется при обучении. В практике MNIST сравни цифру, предсказанную через softmax, с истинной меткой.', 'In the XOR lab, watch the hidden layer change during training. In the MNIST practice, compare the digit predicted with softmax to the actual label.'],
    digits11: ['DIGITS дерегінде NumPy кері таратуын, MNIST дерегінде TensorFlow моделін зертте. Матрицаның жолы — нақты цифр, бағаны — болжам.', 'Изучи обратное распространение NumPy на DIGITS и TensorFlow на MNIST. В матрице строка — факт, столбец — прогноз.', 'Explore NumPy backpropagation on DIGITS and TensorFlow on MNIST. In the matrix, rows are actual digits and columns are predictions.'],
    sroj11: ['Иерархиялық әдіс топтарды біріктіріп, дендрограмма құрады. DBSCAN ε мен MinPts арқылы тығыз топтарды және шу нүктелерін табады.', 'Иерархический метод строит дендрограмму. DBSCAN находит плотные группы и шум с помощью ε и MinPts.', 'Hierarchical clustering builds a dendrogram. DBSCAN uses ε and MinPts to identify dense groups and noise.']
  };

  function button(topics) {
    const trigger = document.createElement('button');
    trigger.className = 'topic-guide-button';
    trigger.type = 'button';
    trigger.textContent = label + ' ↗';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', () => {
      const dialog = document.createElement('dialog');
      dialog.className = 'topic-guide-dialog';
      dialog.setAttribute('aria-label', label);
      const heading = document.createElement('h2');
      heading.textContent = label;
      dialog.append(heading);
      topics.forEach(({ id, name }) => {
        const title = document.createElement('h3');
        title.textContent = name;
        const description = document.createElement('p');
        description.textContent = guides[id][index];
        dialog.append(title, description);
      });
      const dismiss = document.createElement('button');
      dismiss.className = 'topic-guide-button';
      dismiss.textContent = close;
      dismiss.addEventListener('click', () => dialog.close());
      dialog.append(dismiss);
      dialog.addEventListener('close', () => {
        dialog.remove();
        trigger.focus();
      }, { once: true });
      document.body.append(dialog);
      dialog.showModal();
      dismiss.focus();
    });
    return trigger;
  }

  window.TOPIC_GUIDE = { label, button, text: id => guides[id][index] };

  document.addEventListener('DOMContentLoaded', () => {
    const page = location.pathname.split('/').pop().replace(/(?:\.(?:ru|en))?(?:\.html)?$/, '');
    const localLabs = { penguins: 'Palmer Penguins', autompg: 'Auto MPG', unsupervised: 'K-Means / PCA', imbalanced: ['Теңгерімсіз деректер', 'Дисбаланс классов', 'Imbalanced data'][index] };
    if (Object.hasOwn(localLabs, page)) {
      document.querySelector('.topbar')?.append(button([{ id: page, name: localLabs[page] }]));
    }
  });
})();
