(() => {
  'use strict';
  const lang = { kk: 0, ru: 1, en: 2 }[document.documentElement.lang];
  const t = (...copy) => copy[lang];
  window.TOPIC_LABS = {
    1: {
      question: t('Бір шек болжамды қалай өзгертеді?', 'Как один порог меняет прогноз?', 'How does one threshold change the prediction?'),
      demo: [{ threshold: 4 }, { threshold: 6 }, { threshold: 9 }, { threshold: 3 }],
      show: t('4 сағаттық шекті 9-ға көтер. Қызыл нүктелерді және дұрыс болжам санын салыстыр.', 'Подними порог с 4 до 9 часов. Сравни красные точки и число верных прогнозов.', 'Raise the threshold from 4 to 9 hours. Compare the red points and the number of correct predictions.'),
      say: t('Оқу сағаты — кіріс белгісі, емтихан нәтижесі — нақты класс. Ереже шекке жеткендерді «өтті» деп болжайды. Дәлдік дұрыс болжамдар санын барлық оқушы санына бөлу арқылы табылады.', 'Часы учёбы — входной признак, итог экзамена — фактический класс. Правило предсказывает сдачу при достижении порога. Точность — доля верных прогнозов.', 'Study hours are the input feature, and the exam outcome is the actual class. The rule predicts a pass at or above the threshold. Accuracy is the fraction of correct predictions.'),
      ask: t('Шекті көтергенде неге қате көбейді?', 'Почему ошибок стало больше при высоком пороге?', 'Why did errors rise at the higher threshold?'),
      answer: t('Оқу сағаты 9-ға жеткен оқушы жоқ. Ереже бәрін «өтпеді» деп белгілейді, сондықтан нақты өткендер қате саналады.', 'Никто не учился 9 часов. Правило помечает всех как несдавших, поэтому фактически сдавшие становятся ошибками.', 'No student studied for 9 hours. The rule predicts everyone failed, so every actual pass becomes an error.')
    },
    2: {
      question: t('Сүзгі мен сұрыптау кестеге қалай әсер етеді?', 'Как фильтр и сортировка меняют таблицу?', 'What do filtering and sorting change in a table?'),
      demo: [{ minimum: 0, sort: 'score' }, { minimum: 50, sort: 'score' }, { minimum: 75, sort: 'score' }, { minimum: 75, sort: 'sleep' }],
      show: t('Ең төменгі балды 75-ке қой. Кейін балл бойынша сұрыптауды ұйқы сағатына ауыстыр.', 'Установи минимум 75 баллов. Затем смени сортировку с балла на часы сна.', 'Set the minimum score to 75. Then change the sort column from score to sleep hours.'),
      say: t('DataFrame-де жол — оқушы, баған — белгі. Сүзгі сәйкес жолдарды ғана қалдырады. Сұрыптау қалған жолдардың орнын ауыстырады. Графиктегі бағандар кестемен бірдей ретте.', 'В DataFrame строка — ученик, столбец — признак. Фильтр оставляет подходящие строки. Сортировка меняет порядок. Столбцы графика следуют порядку таблицы.', 'In a DataFrame, a row is a student and a column is a feature. Filtering keeps matching rows. Sorting reorders them. The bars follow the same order as the table.'),
      ask: t('Неге сұрыптағаннан кейін орташа балл өзгермейді?', 'Почему средний балл после сортировки остаётся прежним?', 'Why does sorting leave the mean unchanged?'),
      answer: t('Сұрыптау мәндерді де, жол санын да өзгертпейді. Қосынды мен бөлгіш бірдей қалады.', 'Сортировка не меняет значения и число строк. Сумма и знаменатель остаются прежними.', 'Sorting changes neither the values nor the row count. The sum and denominator stay the same.')
    },
    3: {
      question: t('Бір дерек екі графикте не көрсетеді?', 'Что показывают два графика на одних данных?', 'What do two charts reveal about the same data?'),
      demo: [{ feature: 'hours', view: 'scatter' }, { feature: 'sleep', view: 'scatter' }, { feature: 'sleep', view: 'bars' }, { feature: 'hours', view: 'bars' }],
      show: t('Нүктелік графикте оқу сағатын ұйқы сағатына ауыстыр. Pearson r мәнін салыстыр. Кейін бағандық графикті аш.', 'На диаграмме рассеяния смени часы учёбы на часы сна. Сравни Pearson r, затем включи столбцы.', 'In the scatter plot, switch from study hours to sleep hours. Compare Pearson r, then switch to bars.'),
      say: t('Әр нүкте — жеке оқушы. Баған бірдей сағаттағы оқушылардың орташа балын көрсетеді. Pearson r сызықтық байланыстың бағыты мен күшін өлшейді.', 'Точка — отдельный ученик. Столбец — средний балл при одинаковом числе часов. Pearson r измеряет направление и силу линейной связи.', 'Each point represents a student. Each bar shows the mean score at a given hour value. Pearson r measures the direction and strength of a linear relationship.'),
      ask: t('Оң корреляция себепті дәлелдей ме?', 'Доказывает ли положительная корреляция причину?', 'Does positive correlation establish causation?'),
      answer: t('Корреляция бірге өзгеруді көрсетеді. Себепті анықтау үшін басқа факторларды бақылап, бөлек зерттеу жүргізу керек.', 'Корреляция показывает совместное изменение. Для установления причины нужно отдельное исследование с контролем других факторов.', 'Correlation shows variables moving together. Establishing cause takes a separate study that accounts for other factors.')
    },
    4: {
      question: t('Бос мәндерді өңдегенде дерек қалай өзгереді?', 'Как обработка пропусков меняет данные?', 'How does handling missing values change the data?'),
      demo: [{ strategy: 'mean', scale: false }, { strategy: 'median', scale: false }, { strategy: 'drop', scale: false }, { strategy: 'median', scale: true }],
      show: t('Орташа, медиана және алып тастау әдістерін салыстыр. Кейін Min–max қосып, ең кіші және үлкен мәнді көрсет.', 'Сравни среднее, медиану и удаление. Включи Min–max и покажи минимум и максимум.', 'Compare mean, median, and dropping rows. Turn on Min–max and point out the minimum and maximum.'),
      say: t('Толтыру жол санын сақтайды. Алып тастау бақылау санын азайтады. Min–max формуласы (x − min) / (max − min), сондықтан шеткі мәндер 0 мен 1 болады.', 'Заполнение сохраняет число строк. Удаление сокращает число наблюдений. Формула Min–max: (x − min) / (max − min), крайние значения становятся 0 и 1.', 'Imputation preserves the row count. Dropping rows reduces the number of observations. Min–max uses (x − min) / (max − min), mapping the endpoints to 0 and 1.'),
      ask: t('Неге өңдеу параметрлерін тек train дерегінен есептейміз?', 'Почему параметры обработки вычисляют только на train?', 'Why fit preprocessing on the training set?'),
      answer: t('Тест дерегі модельді бағалауға сақталады. Тесттің орташа мәнін немесе шектерін оқытуда қолдану бағалауға тест туралы ақпарат енгізеді.', 'Тест сохраняют для оценки модели. Среднее или границы теста передали бы информацию из него в обучение.', 'The test data is held out for evaluation. Using its mean or bounds during training would leak information into the model.')
    },
    5: {
      question: t('Деректерге ең жақын түзу қалай табылады?', 'Как найти прямую, которая лучше всего подходит данным?', 'How do we find the line that fits the data best?'),
      demo: [{ fit: 'manual', slope: 4, intercept: 28, residuals: true }, { fit: 'manual', slope: 8, intercept: 30, residuals: true }, { fit: 'ols', residuals: true }],
      show: t('Көлбеулікті өзгертіп, қалдықтарды көрсет. «Ең кіші квадраттар» режиміне ауысып, Train және Test MSE-ні салыстыр.', 'Измени наклон и покажи остатки. Включи наименьшие квадраты и сравни Train и Test MSE.', 'Change the slope and show the residuals. Switch to least squares and compare Train and Test MSE.'),
      say: t('ŷ = wx + b сандық болжам береді. Қалдық — нақты мән мен болжам айырмасы. Ең кіші квадраттар оқыту нүктелерінің квадраттық қателерін азайтатын w мен b-ны табады.', 'ŷ = wx + b даёт числовой прогноз. Остаток — разница между фактом и прогнозом. Наименьшие квадраты подбирают w и b с минимальной квадратичной ошибкой на обучении.', 'ŷ = wx + b predicts a number. A residual is actual minus predicted. Least squares finds the w and b that minimize squared errors on the training points.'),
      ask: t('Неге екі қызғылт сары нүктені түзу құруда пайдаланбадық?', 'Почему две оранжевые точки не использовались при подборе прямой?', 'Why were the two orange points excluded from fitting?'),
      answer: t('Олар тест бөлігі. Сол нүктелер модельдің оқытуда көрмеген дерекке қаншалықты дәл болжам беретінін көрсетеді.', 'Это тестовая часть. Она показывает, насколько точны прогнозы для данных, которых модель не видела при обучении.', 'They are held out for testing. They show how well the fitted line predicts data it did not see during training.')
    },
    7: {
      question: t('Дәлдік қай қателерді жасыруы мүмкін?', 'Какие ошибки может скрыть accuracy?', 'Which errors can accuracy hide?'),
      demo: [{ threshold: 80 }, { threshold: 60 }, { threshold: 45 }, { threshold: 25 }],
      show: t('Шекті 80%-дан 25%-ға түсір. Матрицадағы FN және FP санын, сондай-ақ precision мен recall мәндерін салыстыр.', 'Снизь порог с 80% до 25%. Сравни FN, FP, precision и recall.', 'Lower the threshold from 80% to 25%. Compare FN, FP, precision, and recall.'),
      say: t('Матрицада жол — нақты класс, баған — болжам. Precision оң болжамдардың дұрыс үлесін, recall табылған нақты оң жағдайлардың үлесін көрсетеді. F1 осы екі көрсеткішті біріктіреді.', 'В матрице строка — фактический класс, столбец — прогноз. Precision показывает долю верных положительных прогнозов, recall — долю найденных положительных случаев. F1 объединяет их.', 'Rows are actual classes and columns are predictions. Precision is the share of positive predictions that are correct; recall is the share of actual positives found. F1 combines them.'),
      ask: t('Қай кезде recall-ға көбірек мән береміз?', 'Когда важнее recall?', 'When does recall matter more?'),
      answer: t('Оң жағдайды өткізіп алудың салдары ауыр болса, recall-ды жоғары ұстағымыз келеді. Шек төмендегенде жалған дабылдар да артуы мүмкін.', 'Когда пропуск положительного случая особенно нежелателен, нужен высокий recall. Более низкий порог может добавить ложные тревоги.', 'When missing a positive case is costly, we favor higher recall. A lower threshold can also add false alarms.')
    },
    11: {
      question: t('Жасырын қабат XOR ережесін қалай үйренеді?', 'Как скрытый слой учит правило XOR?', 'How does a hidden layer learn XOR?'),
      demo: [{ epochs: 0, input: 2 }, { epochs: 25, input: 2 }, { epochs: 55, input: 2 }, { epochs: 100, input: 2 }, { epochs: 200, input: 2 }],
      show: t('Оқытуды 0-ден соңғы қадамға дейін жүргіз. Loss пен дұрыс жауап санын салыстыр, кейін төрт кіріс жұбын тексер.', 'Проведи обучение от 0 до последнего шага. Сравни loss и число правильных ответов, затем проверь четыре входные пары.', 'Play training from step 0 to the end. Compare loss and the correct count, then inspect all four input pairs.'),
      say: t('XOR-да кірістер әртүрлі болса жауап 1. Жасырын қабаттың tanh белсендіруі сызықтық емес байланыс құруға мүмкіндік береді. Кері тарату салмақтарды өзгертіп, loss-ты азайтады.', 'В XOR ответ равен 1, если входы различны. Активация tanh в скрытом слое позволяет выучить нелинейную зависимость. Обратное распространение меняет веса, уменьшая loss.', 'XOR returns 1 when the inputs differ. The hidden layer’s tanh activation lets the network learn a nonlinear relation. Backpropagation updates weights to reduce loss.'),
      ask: t('Неге бір сызық XOR-ды бөле алмайды?', 'Почему одной прямой нельзя разделить XOR?', 'Why can’t a single line separate XOR?'),
      answer: t('Бір кластың нүктелері диагональда орналасады. Түзу төрт нүктені дұрыс екіге бөле алмайды. Жасырын қабат бірнеше сызықтық емес белгіні біріктіреді.', 'Точки каждого класса лежат по диагонали. Одна прямая не разделяет их правильно. Скрытый слой объединяет несколько нелинейных признаков.', 'Points in the same class lie diagonally across from each other. One straight line cannot separate them correctly. The hidden layer combines nonlinear features.')
    }
  };
})();
