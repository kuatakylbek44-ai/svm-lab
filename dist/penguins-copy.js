window.PENGUINS_COPY = {
  "kk": {
    "chapters": [
      {
        "title": "Датасет",
        "kicker": "01 / ҮШ ТҮР. ТӨРТ ӨЛШЕМ.",
        "heading": "Пингвинді өлшемінен таны.",
        "intro": "Palmer Penguins — Антарктидадағы пингвиндер туралы деректер. Тұмсық ұзындығы мен тереңдігі, жүзбе қанат ұзындығы және дене массасы арқылы үш түрдің бірін болжаймыз.",
        "steps": [
          "344 жолдың тек қажетті өлшемдері жоқ екеуін алып тастадық. 342 пингвин қалды: Adelie — 151, Chinstrap — 68, Gentoo — 123.",
          "273 пингвинмен үйретеміз, бөлек 69 пингвинмен тексереміз. Барлық модель дәл осы бөліністі қолданады. random_state=42 нәтижені қайталауға көмектеседі.",
          "Параметрлерді train ішіндегі бес бөлікті кросс-валидация таңдайды. Test таңдау аяқталғанша бөлек сақталады. Ағаш модельдерге StandardScaler қажет емес."
        ],
        "takeaway": "Үш класс бар. Жынысы бос жолдарды алып тастамаймыз, себебі бұл тәжірибеде жынысты белгі ретінде қолданбаймыз.",
        "oral": "Мен Palmer Penguins датасетін алдым. Мақсатым — төрт өлшем арқылы пингвиннің үш түрінің бірін анықтау. 342 толық жазбаны 273 train және 69 test етіп бөлдім. Төрт модель бірдей деректермен тексерілді."
      },
      {
        "title": "Decision Tree",
        "kicker": "02 / БІР СҰРАҚТАН — ЖАУАПҚА",
        "heading": "Ағаш сұрақ қойып шешеді.",
        "intro": "Decision Tree пингвиннің өлшемдерін кезекпен тексереді. Әр шарттан солға не оңға өтеді. Соңғы жапырақта ең көп кездескен түрді таңдайды.",
        "steps": [
          "Біздің ағаштың бірінші сұрағы: жүзбе қанат ұзындығы 206,5 мм-ден аспай ма? Жауап келесі тармақты анықтайды.",
          "Gini аралас түрлерді азайтатын бөліністі іздейді. Ағаш тым терең болса, train дерегін жаттап алуы мүмкін.",
          "GridSearchCV таңдаған max_depth=4 және min_samples_leaf=1 қолданылды. Test-та 69/69 дұрыс; train ішіндегі орташа CV дәлдігі — 94,15%."
        ],
        "takeaway": "Анимация таңдалған test пингвинінің нақты үйретілген ағашта жүрген жолын көрсетеді.",
        "oral": "Decision Tree — сұрақтар тізбегі сияқты. Мысалы, қанаты 206,5 миллиметрден қысқа ма деп сұрайды. Жауапқа қарай тармақ ауысады. Біздің тереңдігі төрт ағаш test-та барлық 69 пингвинді дұрыс таныды."
      },
      {
        "title": "Random Forest",
        "kicker": "03 / КӨП АҒАШ. ОРТАҚ БОЛЖАМ.",
        "heading": "300 ағаш бірге шешеді.",
        "intro": "Random Forest — көптеген шешім ағашының жиынтығы. Әр ағаш train деректерінің қайта іріктелген үлгісін көріп, әр бөліністе белгілердің кездейсоқ бөлігін қарастырады.",
        "steps": [
          "Бір ағаш қателессе, басқа ағаштар оның әсерін азайта алады. Барлығы 300 ағаштың нәтижесі біріктіріледі.",
          "scikit-learn әр ағаштың класс ықтималдықтарын орташалайды. Ең жоғары орташа ықтималдығы бар түр соңғы болжам болады.",
          "Көріністе алғашқы 12 ағаш бар. Қорытынды барлық 300 ағаштан есептеледі. Test: 69/69, орташа CV: 96,71%."
        ],
        "takeaway": "Бұл жай ғана 12 дауысты санау емес: қорытынды — барлық 300 ағаштың ықтималдықтарының орташа мәні.",
        "oral": "Random Forest бір ағашқа ғана сенбейді. Ол 300 ағаштың болжамын біріктіреді. Әр түрдің ықтималдығын орташалап, ең жоғарысын алады. Осы test жиынында 69 пингвиннің бәрін дұрыс тапты."
      },
      {
        "title": "XGBoost",
        "kicker": "04 / КЕЗЕҢМЕН ҮЙРЕНУ",
        "heading": "Жаңа ағаш болжамды толықтырады.",
        "intro": "XGBoost ағаштарды кезекпен қосады. Әр жаңа кезең алдыңғы болжамға түзету енгізіп, train дерегіндегі қателік функциясын азайтуға тырысады.",
        "steps": [
          "Слайдер 1, 5, 10, 25, 50, 100 және 200 кезеңнен кейінгі нақты ықтималдықтарды көрсетеді. Үш кластың болжамы бірге өзгереді.",
          "learning_rate=0.05 әр түзетудің әсерін азайтады. Таңдалған max_depth=2, n_estimators=200. Көп кезең test нәтижесін міндетті түрде жақсартпайды.",
          "Орташа CV дәлдігі — 97,08%, төртеуінің ішіндегі ең жоғарысы. Бөлек test-та 66/69 дұрыс: дәлдігі 95,65%."
        ],
        "takeaway": "CV-де бірінші орын алу осы шағын test-та да бірінші болуға кепілдік бермейді.",
        "oral": "XGBoost ағаштарды бірінен кейін бірін қосады. Әр кезең болжамды түзетуге тырысады. Train ішіндегі кросс-валидацияда ол 97,08 пайызбен үздік болды. Бірақ бөлек test-та үш қате жіберіп, 66 пингвинді дұрыс таныды."
      },
      {
        "title": "Tree Regressor",
        "kicker": "05 / ТҮР МЕН САННЫҢ АЙЫРМАСЫ",
        "heading": "Регрессорды қалай салыстырамыз?",
        "intro": "Regressor әдетте сан болжайды. Түрді салыстыру үшін оны оқу мақсатында бейімдедік: үш түрге үш one-hot баған беріп, ең үлкен болжамды argmax арқылы таңдаймыз.",
        "steps": [
          "Adelie=[1,0,0], Chinstrap=[0,1,0], Gentoo=[0,0,1]. Түр кодтарын жай 0,1,2 деп алып, нәтижені дөңгелектемейміз.",
          "One-hot нысанасында squared error Gini-ге пропорционал. Сондықтан осы тәжірибеде оның ағашы мен нәтижесі Decision Tree Classifier-ге сәйкес келді.",
          "Бөлек регрессия тапсырмасында үш өлшемнен дене массасын болжаймыз. Массаны кіріс белгіге қоспаймыз. Қате граммен өлшенеді: RMSE неғұрлым аз болса, соғұрлым жақсы."
        ],
        "takeaway": "Түрді болжауда: 69/69. Нағыз масса регрессиясында: Tree RMSE=354,27 г, XGBoost RMSE=309,10 г. Грамды accuracy пайызымен салыстырмаймыз.",
        "oral": "Decision Tree Regressor сан болжайды. Түрлерді салыстыру үшін үш one-hot баған қолданып, ең үлкен мәнді таңдадым. Бұл — оқу бейімдеуі. Қосымша тәжірибеде дене массасын болжадым: XGBoost-тың граммен өлшенген қатесі аз болды."
      },
      {
        "title": "Салыстыру",
        "kicker": "06 / НӘТИЖЕГЕ ДЕРЕКПЕН ҚАРА",
        "heading": "Қай модель дәл тапты?",
        "intro": "Әділ салыстыру үшін төрт модель бірдей 69 test пингвинін болжады. Accuracy дұрыс жауаптар үлесін көрсетеді. Macro-F1 әр класқа бірдей салмақ береді.",
        "steps": [
          "Test-та Decision Tree Classifier, Random Forest және бейімделген Tree Regressor тең түсті: 100%, яғни 69/69. XGBoost: 95,65%, яғни 66/69.",
          "Параметрлер test арқылы таңдалған жоқ. Train ішіндегі бес бөлікті CV-де XGBoost бірінші: 97,08%. GridSearchCV әр модельдің сегіз параметр комбинациясын сынады.",
          "Қателер матрицасында жол — нақты түр, баған — болжанған түр. Диагональдағы сандар дұрыс жауаптар; қалғандары қателер. Үш қате үлгіні жеке ашып көр."
        ],
        "takeaway": "Бұл — 69 пингвині бар бір test бөлінісінің нәтижесі. 100% болашақ деректердің бәрін қатесіз таниды деген сөз емес.",
        "oral": "Тест қорытындысында үш модель 69 пингвиннің бәрін дұрыс тапты. XGBoost 66-сын таныды. Бірақ кросс-валидацияда ең жоғары орташа нәтиже XGBoost-та болды. Сондықтан test жеңімпазы мен CV жеңімпазын бөлек айттым. Нәтиже осы бөлініске қатысты."
      }
    ]
  },
  "ru": {
    "chapters": [
      {
        "title": "Датасет",
        "kicker": "01 / ТРИ ВИДА. ЧЕТЫРЕ ПРИЗНАКА.",
        "heading": "Узнай пингвина по его размерам.",
        "intro": "Palmer Penguins — данные об антарктических пингвинах. По длине и глубине клюва, длине ласта и массе тела предсказываем один из трёх видов.",
        "steps": [
          "Из 344 строк удалены только две без нужных измерений. Осталось 342 пингвина: Adelie — 151, Chinstrap — 68, Gentoo — 123.",
          "Обучаем на 273 пингвинах, проверяем на отдельных 69. Все модели используют одно разбиение. random_state=42 помогает повторить результат.",
          "Параметры выбирает пятикратная кросс-валидация внутри train. Test остаётся отдельно до завершения выбора. Деревьям StandardScaler не требуется."
        ],
        "takeaway": "Здесь три класса. Строки без значения пола сохраняем: пол в этом опыте не используется как признак.",
        "oral": "Я взял датасет Palmer Penguins. Цель — определить один из трёх видов по четырём измерениям. 342 полные записи разделил на 273 train и 69 test. Все четыре модели проверялись на одинаковых данных."
      },
      {
        "title": "Decision Tree",
        "kicker": "02 / ОТ ВОПРОСА К ОТВЕТУ",
        "heading": "Дерево решает, задавая вопросы.",
        "intro": "Decision Tree по очереди проверяет измерения пингвина. Каждое условие ведёт влево или вправо. В конечном листе выбирается самый частый вид.",
        "steps": [
          "Первый вопрос нашего дерева: длина ласта не больше 206,5 мм? Ответ определяет следующую ветку.",
          "Gini помогает найти разделение, уменьшающее смешение видов. Слишком глубокое дерево может запомнить обучающие данные.",
          "GridSearchCV выбрал max_depth=4 и min_samples_leaf=1. На test правильных ответов 69/69; средняя точность CV внутри train — 94,15%."
        ],
        "takeaway": "Анимация показывает реальный путь выбранного тестового пингвина в обученном дереве.",
        "oral": "Decision Tree похож на цепочку вопросов. Например: ласт короче 206,5 миллиметра? Ответ переводит на следующую ветку. Наше дерево глубиной четыре правильно распознало всех 69 пингвинов в test."
      },
      {
        "title": "Random Forest",
        "kicker": "03 / МНОГО ДЕРЕВЬЕВ. ОБЩИЙ ПРОГНОЗ.",
        "heading": "300 деревьев решают вместе.",
        "intro": "Random Forest объединяет множество решающих деревьев. Каждое обучается на выборке с возвращением и рассматривает случайную часть признаков при каждом разделении.",
        "steps": [
          "Если одно дерево ошибается, остальные могут уменьшить его влияние. Объединяются результаты всех 300 деревьев.",
          "scikit-learn усредняет вероятности классов от каждого дерева. Вид с наибольшей средней вероятностью становится итоговым прогнозом.",
          "На экране показаны первые 12 деревьев. Итог рассчитан по всем 300. Test: 69/69, средняя точность CV: 96,71%."
        ],
        "takeaway": "Итог — не просто подсчёт 12 голосов, а среднее вероятностей от всех 300 деревьев.",
        "oral": "Random Forest не полагается на одно дерево. Он объединяет 300 деревьев, усредняет вероятности каждого вида и выбирает наибольшую. На этом тестовом наборе он правильно определил всех 69 пингвинов."
      },
      {
        "title": "XGBoost",
        "kicker": "04 / ОБУЧЕНИЕ ПО ЭТАПАМ",
        "heading": "Новое дерево уточняет прогноз.",
        "intro": "XGBoost добавляет деревья последовательно. Каждый этап корректирует предыдущий прогноз, стараясь уменьшить функцию потерь на обучающих данных.",
        "steps": [
          "Слайдер показывает реальные вероятности после 1, 5, 10, 25, 50, 100 и 200 этапов. Прогнозы для трёх классов меняются вместе.",
          "learning_rate=0.05 уменьшает влияние каждой поправки. Выбраны max_depth=2, n_estimators=200. Больше этапов не обязательно улучшает результат на test.",
          "Средняя точность CV — 97,08%, лучшая из четырёх. На отдельном test правильных ответов 66/69: точность 95,65%."
        ],
        "takeaway": "Первое место по CV не гарантирует первое место на этом небольшом test.",
        "oral": "XGBoost добавляет деревья одно за другим. Каждый этап старается уточнить прогноз. На кросс-валидации внутри train он показал лучший результат: 97,08%. Но на отдельном test допустил три ошибки и распознал 66 пингвинов."
      },
      {
        "title": "Tree Regressor",
        "kicker": "05 / ВИД И ЧИСЛО — РАЗНЫЕ ЦЕЛИ",
        "heading": "Как сравнивать регрессор?",
        "intro": "Regressor обычно предсказывает число. Для сравнения видов мы учебно адаптировали его: три one-hot столбца для трёх видов, затем argmax выбирает наибольший прогноз.",
        "steps": [
          "Adelie=[1,0,0], Chinstrap=[0,1,0], Gentoo=[0,0,1]. Мы не используем коды 0,1,2 с последующим округлением.",
          "Для one-hot целей squared error пропорциональна Gini. Поэтому в этом опыте дерево и результат совпали с Decision Tree Classifier.",
          "В отдельной задаче регрессии предсказываем массу тела по трём измерениям. Масса не входит в признаки. Ошибка измеряется в граммах: чем ниже RMSE, тем лучше."
        ],
        "takeaway": "Распознавание вида: 69/69. Настоящая регрессия массы: Tree RMSE=354,27 г, XGBoost RMSE=309,10 г. Граммы нельзя сравнивать с accuracy в процентах.",
        "oral": "Decision Tree Regressor предсказывает число. Для видов я использовал три one-hot столбца и выбрал наибольшее значение. Это учебная адаптация. В дополнительном опыте предсказывал массу тела: XGBoost показал меньшую ошибку в граммах."
      },
      {
        "title": "Сравнение",
        "kicker": "06 / ВЫВОДЫ НА ОСНОВЕ ДАННЫХ",
        "heading": "Какая модель угадала точнее?",
        "intro": "Для честного сравнения четыре модели предсказали виды одних и тех же 69 тестовых пингвинов. Accuracy — доля верных ответов. Macro-F1 даёт каждому классу одинаковый вес.",
        "steps": [
          "На test ничья: Decision Tree Classifier, Random Forest и адаптированный Tree Regressor получили 100%, то есть 69/69. XGBoost: 95,65%, то есть 66/69.",
          "Параметры не выбирались по test. На пятикратной CV внутри train лидирует XGBoost: 97,08%. GridSearchCV проверил восемь комбинаций параметров для каждой модели.",
          "В матрице ошибок строка — истинный вид, столбец — прогноз. Диагональ показывает верные ответы, остальные клетки — ошибки. Открой три ошибочных примера."
        ],
        "takeaway": "Это результат одного разбиения с 69 пингвинами в test. 100% не означает безошибочных прогнозов на любых будущих данных.",
        "oral": "На test три модели правильно определили всех 69 пингвинов. XGBoost распознал 66. Но по средней кросс-валидации лучшим стал XGBoost. Поэтому я отдельно называю победителей test и CV. Вывод относится к этому разбиению."
      }
    ]
  },
  "en": {
    "chapters": [
      {
        "title": "Dataset",
        "kicker": "01 / THREE SPECIES. FOUR FEATURES.",
        "heading": "Recognise a penguin by its measurements.",
        "intro": "Palmer Penguins contains data about Antarctic penguins. Bill length, bill depth, flipper length and body mass help us predict one of three species.",
        "steps": [
          "We removed only two of 344 rows with missing required measurements. That leaves 342 penguins: 151 Adelie, 68 Chinstrap and 123 Gentoo.",
          "Train on 273 penguins and evaluate on a separate 69. Every model uses the same split. random_state=42 helps reproduce the experiment.",
          "Five-fold cross-validation within train selects parameters. Test stays separate until selection ends. Tree models do not need StandardScaler."
        ],
        "takeaway": "There are three classes. Rows with missing sex remain: sex is not a feature in this experiment.",
        "oral": "I chose Palmer Penguins to predict one of three species from four measurements. I split 342 complete records into 273 training and 69 test examples. All four models were evaluated on the same data."
      },
      {
        "title": "Decision Tree",
        "kicker": "02 / FROM A QUESTION TO AN ANSWER",
        "heading": "A tree decides by asking questions.",
        "intro": "A Decision Tree checks measurements one at a time. Each condition leads left or right. The final leaf predicts its most frequent species.",
        "steps": [
          "Our tree first asks: is the flipper length at most 206.5 mm? The answer determines the next branch.",
          "Gini finds splits that reduce the mixture of species. A tree that grows too deep may memorise its training data.",
          "GridSearchCV selected max_depth=4 and min_samples_leaf=1. Test: 69/69 correct. Mean CV accuracy within train: 94.15%."
        ],
        "takeaway": "The animation traces the selected test penguin through the actual fitted tree.",
        "oral": "A Decision Tree works like a sequence of questions. For example, is the flipper at most 206.5 millimetres long? The answer chooses a branch. Our depth-four tree recognised all 69 test penguins correctly."
      },
      {
        "title": "Random Forest",
        "kicker": "03 / MANY TREES. ONE PREDICTION.",
        "heading": "300 trees decide together.",
        "intro": "Random Forest combines many decision trees. Each tree sees a bootstrap sample of training rows and considers a random subset of features at each split.",
        "steps": [
          "When one tree makes a mistake, other trees can reduce its influence. Predictions from all 300 trees are combined.",
          "scikit-learn averages the class probabilities from individual trees. The species with the highest mean probability becomes the final prediction.",
          "The display shows the first 12 trees. The final result uses all 300. Test: 69/69. Mean CV accuracy: 96.71%."
        ],
        "takeaway": "The result is not a simple count of 12 votes: it averages probabilities from all 300 trees.",
        "oral": "Random Forest does not rely on a single tree. It combines 300 trees, averages the probability of each species and chooses the highest. It correctly identified all 69 penguins in this test set."
      },
      {
        "title": "XGBoost",
        "kicker": "04 / LEARNING IN STAGES",
        "heading": "Each new tree refines the prediction.",
        "intro": "XGBoost adds trees sequentially. Each stage adjusts the previous prediction, aiming to reduce the loss on the training data.",
        "steps": [
          "The slider shows actual probabilities after 1, 5, 10, 25, 50, 100 and 200 stages. Predictions for all three classes change together.",
          "learning_rate=0.05 reduces the size of each adjustment. Selected settings: max_depth=2, n_estimators=200. More stages do not necessarily improve test performance.",
          "Mean CV accuracy is 97.08%, the highest of the four. On the separate test set it gets 66/69 correct: 95.65% accuracy."
        ],
        "takeaway": "Winning on CV does not guarantee winning on this small test set.",
        "oral": "XGBoost adds trees one after another to refine its predictions. It achieved the best mean cross-validation accuracy within train: 97.08%. On the separate test set, it made three mistakes and correctly identified 66 penguins."
      },
      {
        "title": "Tree Regressor",
        "kicker": "05 / A SPECIES OR A NUMBER?",
        "heading": "How do we compare a regressor?",
        "intro": "A regressor normally predicts numbers. For species comparison, we use an educational adaptation: three one-hot target columns, then argmax selects the largest predicted value.",
        "steps": [
          "Adelie=[1,0,0], Chinstrap=[0,1,0], Gentoo=[0,0,1]. We do not predict numeric species codes 0,1,2 and round them.",
          "With one-hot targets, squared error is proportional to Gini. In this experiment, the tree and predictions match the Decision Tree Classifier.",
          "A separate regression task predicts body mass from three measurements. Mass is excluded from the input features. Error is measured in grams: lower RMSE is better."
        ],
        "takeaway": "Species prediction: 69/69. Actual mass regression: Tree RMSE=354.27 g, XGBoost RMSE=309.10 g. Do not compare grams with accuracy percentages.",
        "oral": "A Decision Tree Regressor predicts numbers. To classify species, I used three one-hot targets and selected the largest output. This is an educational adaptation. I also predicted body mass: XGBoost had the smaller error measured in grams."
      },
      {
        "title": "Comparison",
        "kicker": "06 / LET THE DATA SUPPORT THE CONCLUSION",
        "heading": "Which model predicted most accurately?",
        "intro": "For a fair comparison, all four models predicted the same 69 test penguins. Accuracy measures the share of correct answers. Macro-F1 gives every class equal weight.",
        "steps": [
          "Test is a tie: Decision Tree Classifier, Random Forest and adapted Tree Regressor achieve 100%, or 69/69. XGBoost achieves 95.65%, or 66/69.",
          "Parameters were not selected using test. XGBoost leads five-fold CV within train with 97.08%. GridSearchCV tried eight parameter combinations per model.",
          "In a confusion matrix, rows are true species and columns are predictions. Diagonal cells are correct answers; other cells are mistakes. Inspect the three misclassified examples."
        ],
        "takeaway": "These results come from one split with 69 test penguins. 100% does not promise perfect predictions on every future example.",
        "oral": "Three models correctly identified all 69 test penguins. XGBoost identified 66. However, XGBoost had the highest mean cross-validation accuracy. I therefore distinguish the test winners from the CV winner. The result applies to this particular split."
      }
    ]
  }
};
