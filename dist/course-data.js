(() => {
  'use strict';
  const langs = ['kk', 'ru', 'en'];
  const lang = langs.includes(document.documentElement.lang) ? document.documentElement.lang : 'kk';
  const i = { kk: 0, ru: 1, en: 2 }[lang];
  const pick = value => Array.isArray(value) ? value[i] : value;
  window.COURSE_DATA = {
    lang,
    lectures: [
      { n: 1, title: ['Машиналық оқытуға кіріспе', 'Введение в машинное обучение', 'Introduction to machine learning'], summary: ['Негізгі ұғымдар, есеп түрлері, қолданылу салалары', 'Основные понятия, типы задач, области применения', 'Key concepts, task types, application areas'] },
      { n: 2, title: ['Python, Pandas және деректер құрылымдары', 'Python, Pandas и структуры данных', 'Python, Pandas and data structures'], summary: ['DataFrame, Series, индекстеу және тазалау негіздері', 'DataFrame, Series, индексация и основы очистки', 'DataFrame, Series, indexing and cleaning basics'] },
      { n: 3, title: ['Деректерді визуализациялау', 'Визуализация данных', 'Data visualization'], summary: ['Бөліну, корреляция және көрнекі талдау', 'Распределения, корреляции и визуальный анализ', 'Distributions, correlations and visual analysis'] },
      { n: 4, title: ['Деректерді алдын ала өңдеу', 'Предобработка данных', 'Data preprocessing'], summary: ['Бос мәндер, категориялық белгілер, масштабтау', 'Пропуски, категориальные признаки, масштабирование', 'Missing values, categorical features, scaling'] },
      { n: 5, title: ['Сызықтық регрессия', 'Линейная регрессия', 'Linear regression'], summary: ['Түзу, шығын функциясы және коэффициенттер', 'Прямая, функция потерь и коэффициенты', 'Line, loss function and coefficients'] },
      { n: 6, title: ['Логистикалық регрессия', 'Логистическая регрессия', 'Logistic regression'], summary: ['Сигмоида, ықтималдық және шешім шекарасы', 'Сигмоида, вероятность и граница решения', 'Sigmoid, probability and decision boundary'] },
      { n: 7, title: ['Модель сапасын бағалау', 'Оценка качества модели', 'Model evaluation'], summary: ['Train/test, кросс-валидация, метрикалар', 'Train/test, кросс-валидация, метрики', 'Train/test, cross-validation, metrics'] },
      { n: 8, title: ['Бақылау арқылы оқыту: SVM', 'Обучение с учителем: SVM', 'Supervised learning: SVM'], summary: ['Тірек векторлары, margin және kernel', 'Опорные векторы, margin и kernel', 'Support vectors, margin and kernel'] },
      { n: 9, title: ['Decision Tree, Random Forest және XGBoost', 'Decision Tree, Random Forest и XGBoost', 'Decision Tree, Random Forest and XGBoost'], summary: ['Ансамбльдер және ағаш негізіндегі модельдер', 'Ансамбли и модели на основе деревьев', 'Ensembles and tree-based models'] },
      { n: 10, title: ['Бақылаусыз оқыту: K-Means және PCA', 'Обучение без учителя: K-Means и PCA', 'Unsupervised learning: K-Means and PCA'], summary: ['Кластерлеу, өлшемді азайту және теңгерімсіз деректер', 'Кластеризация, снижение размерности и дисбаланс классов', 'Clustering, dimensionality reduction and imbalanced data'] }
    ],
    sroj: [
      { n: 1, week: 3 },
      { n: 2, week: 4 },
      { n: 3, week: 5 },
      { n: 4, week: 7 }
    ],
    labels: {
      kk: { lecture: 'Дәріс', of: '/ 10', course: 'Курс картасына оралу', objectives: 'Мақсаты', theory: 'Негізгі теория', visual: 'Визуализация', code: 'Python коды', check: 'Өзін-өзі тексеру', conclusion: 'Қорытынды', pending: 'Мазмұн дайындалуда', ready: 'Конспект дайын', min: 'мин', sections: 'бөлім', copy: 'Көшіру', copied: 'Көшірілді', correct: 'Дұрыс!', incorrect: 'Қате', answer: 'Жауап', score: 'Дұрыс жауап', retry: 'Қайталау', quizHint: 'Бір жауапты таңдаңыз', prev: 'Алдыңғы дәріс', next: 'Келесі дәріс', sroj: 'СОӨЖ тапсырмасы', week: 'апта', srojObj: 'Тапсырма мақсаты', cond: 'Орындау шарты', form: 'Тапсыру формасы', criteria: 'Бағалау критерийлері', deadline: 'Тапсыру мерзімі', srojPending: 'Тапсырма мәтіні дайындалуда', allSroj: 'Барлық СОӨЖ', allLectures: 'Барлық дәрістер', back: 'Курс картасы' },
      ru: { lecture: 'Лекция', of: '/ 10', course: 'Вернуться к карте курса', objectives: 'Цель', theory: 'Основная теория', visual: 'Визуализация', code: 'Python-код', check: 'Самопроверка', conclusion: 'Вывод', pending: 'Содержание готовится', ready: 'Конспект готов', min: 'мин', sections: 'раздела', copy: 'Копировать', copied: 'Скопировано', correct: 'Верно!', incorrect: 'Неверно', answer: 'Ответ', score: 'Правильных ответов', retry: 'Повторить', quizHint: 'Выберите один ответ', prev: 'Предыдущая лекция', next: 'Следующая лекция', sroj: 'Задание СРО', week: 'неделя', srojObj: 'Цель задания', cond: 'Условия выполнения', form: 'Форма сдачи', criteria: 'Критерии оценивания', deadline: 'Срок сдачи', srojPending: 'Текст задания готовится', allSroj: 'Все задания СРО', allLectures: 'Все лекции', back: 'Карта курса' },
      en: { lecture: 'Lecture', of: '/ 10', course: 'Back to the course map', objectives: 'Objective', theory: 'Core theory', visual: 'Visualization', code: 'Python code', check: 'Self-check', conclusion: 'Conclusion', pending: 'Content in progress', ready: 'Notes ready', min: 'min', sections: 'sections', copy: 'Copy', copied: 'Copied', correct: 'Correct!', incorrect: 'Incorrect', answer: 'Answer', score: 'Correct answers', retry: 'Try again', quizHint: 'Choose one answer', prev: 'Previous lecture', next: 'Next lecture', sroj: 'Self-study task', week: 'week', srojObj: 'Task objective', cond: 'Requirements', form: 'Submission format', criteria: 'Grading criteria', deadline: 'Deadline', srojPending: 'Task text in progress', allSroj: 'All self-study tasks', allLectures: 'All lectures', back: 'Course map' }
    },
    pick
  };
})();
