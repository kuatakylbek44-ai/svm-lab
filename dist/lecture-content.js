(function () {
  "use strict";
  window.LECTURE_CONTENT = {
    1: {
      kk: {
        minutes: 90,
        goals: [
          "Машиналық оқытудың не екенін және оның дәстүрлі бағдарламалаудан айырмашылығын түсіну.",
          "Бақылаумен, бақылаусыз және күшейтілген оқытуды ажырату.",
          "Жіктеу, регрессия және кластерлеу есептерін тану.",
          "ML өмірлік циклінің негізгі кезеңдерін білу."
        ],
        theory: [
          {
            h: "Машиналық оқыту дегеніміз не?",
            p: [
              "Машиналық оқыту (ML) — модель деп аталатын бағдарламалық жасақтаманы деректерден заңдылықтарды үйренуге және жаңа жағдайларға болжам жасауға үйрету процесі. Дәстүрлі бағдарламалауда ережелерді адам қолмен жазады, ал ML-де модель бұл ережелерді мысалдардан өзі табады.",
              "Артур Самуэльдің классикалық анықтамасы бойынша, бағдарлама E тәжірибесі арқылы T тапсырмасын орындауда P өлшемі бойынша жақсарады."
            ],
            list: [
              "E — тәжірибе: оқыту деректері (мысалы, 10 000 дойбы партиясы).",
              "T — тапсырма: модель шешетін міндет (дойбы ойнау, суретте мысықты тану).",
              "P — өлшенетін нәтиже: дәлдік, ұту ықтималдығы, қателік."
            ],
            note: "Мысалы, жауын-шашынды болжау үшін метеорологиялық деректерді (температура, ылғалдылық, қысым) беріп, модельден жауап аламыз. Модель физикалық теңдеулерді шешпейді — деректердегі байланысты үйренеді."
          },
          {
            h: "Оқыту түрлері",
            p: [
              "ML жүйелері деректерде мақсатты белгінің (label) бар-жоғына және оқыту тәсіліне қарай бөлінеді. Бақылаумен оқытуда модель дұрыс жауаппен салыстырып, қатесін түзетеді. Бақылаусыз оқытуда дұрыс жауап жоқ: модель деректердің ішкі құрылымын өзі ашады. Күшейтілген оқытуда агент әрекет жасап, марапат арқылы стратегияны жетілдіреді."
            ],
            table: {
              head: ["Түрі", "Деректер", "Негізгі есептер", "Мысал"],
              rows: [
                ["Бақылаумен оқыту", "X және Y (белгі бар)", "Жіктеу, регрессия", "Спамды анықтау, үй бағасы"],
                ["Бақылаусыз оқыту", "Тек X (белгі жоқ)", "Кластерлеу, өлшемді азайту", "Тұтынушыларды топтау"],
                ["Күшейтілген оқыту", "Орта + марапат/жаза", "Стратегияны үйрену", "Робот, AlphaGo"]
              ]
            },
            list: [
              "Жіктеу (classification) — объектінің класын анықтайды: спам/спам емес, алма/шие.",
              "Регрессия (regression) — үздіксіз санды болжайды: үй бағасы, температура, жалақы.",
              "Кластерлеу (clustering) — белгісіз деректерді ұқсастығы бойынша топтайды."
            ]
          },
          {
            h: "ML өмірлік циклі",
            p: [
              "Нақты жоба бір модель оқытумен бітпейді. ML өмірлік циклі жеті кезеңнен тұрады және әр кезең қайталанып отырады."
            ],
            ordered: [
              "Мәселенің мақсатын анықтау: жіктеу ме, регрессия ма, кластерлеу ме?",
              "Деректерді жинау: ішкі дерекқор, ашық дереккөздер, API немесе веб-скрейпинг.",
              "Тазалау және дайындау: бос мәндер, дубликаттар, қате өлшемдер.",
              "Зерттеушілік талдау (EDA): бөліну, корреляция, қажет белгілер.",
              "Модельді таңдау және оқыту: train/validation бөліктері.",
              "Бағалау және оңтайландыру: метрикалар, гиперпараметрлер.",
              "Енгізу және мониторинг: деплой, деректердің өзгеруін қадағалау."
            ],
            note: "Тәжірибеде модель сапасының басым бөлігі деректерді дайындауға байланысты: бос мәндер, қайталанатын жазбалар, өлшем бірліктерінің сәйкессіздігі немесе деректердің ағып кетуі (data leakage) нәтижені төмендетеді."
          }
        ],
        visual: {
          title: "ML өмірлік циклі",
          html: `
            <div class="flow" role="img" aria-label="Жеті кезеңнен тұратын ML өмірлік циклі">
              <div class="flow-step"><span>01</span><b>Мәселе</b><small>Жіктеу ме, регрессия ма?</small></div>
              <div class="flow-step"><span>02</span><b>Деректер</b><small>Жинау, көздер</small></div>
              <div class="flow-step"><span>03</span><b>Дайындау</b><small>Бос мәндер, дубликаттар</small></div>
              <div class="flow-step"><span>04</span><b>EDA</b><small>Бөліну, корреляция</small></div>
              <div class="flow-step"><span>05</span><b>Оқыту</b><small>Train / validation</small></div>
              <div class="flow-step"><span>06</span><b>Бағалау</b><small>Метрика, баптау</small></div>
              <div class="flow-step"><span>07</span><b>Мониторинг</b><small>Деплой, қадағалау</small></div>
            </div>`,
          caption: "Әр кезеңнің нәтижесі келесісіне әсер етеді. Іс жүзінде 3–6 кезеңдер бірнеше рет қайталанады."
        },
        code: {
          title: "Scikit-learn: бірінші модель",
          note: "Мысал бақылаумен оқытудың мини-циклін көрсетеді: деректерді бөлу, модельді оқыту, болжау және дәлдікті бағалау.",
          source: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "Автокөліктің түсін (сұр, қара, ақ) анықтау қандай есеп?",
            options: ["Жіктеу", "Регрессия"],
            answer: 0,
            why: "Түс — дискретті класс, сондықтан бұл жіктеу есебі."
          },
          {
            q: "Адамның суретіне қарап жасын болжау қандай есеп?",
            options: ["Жіктеу", "Регрессия"],
            answer: 1,
            why: "Жас — үздіксіз сандық мән, сондықтан бұл регрессия."
          },
          {
            q: "Белгісіз деректерді ұқсастығы бойынша топтарға бөлу қай түрге жатады?",
            options: ["Бақылаумен оқыту", "Бақылаусыз оқыту", "Күшейтілген оқыту"],
            answer: 1,
            why: "Мақсатты белгі жоқ, құрылым ішкі ұқсастықтан табылады."
          },
          {
            q: "Дойбы бағдарламасында P (performance) нені білдіреді?",
            options: ["Ойналған партиялар саны", "Келесі ойында ұту ықтималдығы", "Ойын ережелері"],
            answer: 1,
            why: "P — тапсырма сапасын өлшейтін көрсеткіш; бұл мысалда ұту ықтималдығы."
          },
          {
            q: "Деректерді train және test жиындарына бөлудің мақсаты неде?",
            options: ["Деректерді көбейту", "Модельді жаңа деректерде әділ бағалау", "Оқытуды жылдамдату"],
            answer: 1,
            why: "Test жиыны модель көрмеген деректерде оның шынайы сапасын көрсетеді."
          }
        ],
        summary: [
          "ML — ережелерді қолмен жазбай, деректерден заңдылық үйренетін тәсіл.",
          "Үш негізгі түрі: бақылаумен, бақылаусыз және күшейтілген оқыту.",
          "Жіктеу класты, регрессия санды болжайды; кластерлеу белгісіз деректерді топтайды.",
          "ML өмірлік циклі жеті кезеңнен тұрады және қайталанып отырады.",
          "Модель сапасы көбіне деректердің сапасымен анықталады."
        ]
      },
      ru: {
        minutes: 90,
        goals: [
          "Понять, что такое машинное обучение и чем оно отличается от традиционного программирования.",
          "Различать обучение с учителем, без учителя и с подкреплением.",
          "Узнавать задачи классификации, регрессии и кластеризации.",
          "Знать основные этапы жизненного цикла ML."
        ],
        theory: [
          {
            h: "Что такое машинное обучение?",
            p: [
              "Машинное обучение (ML) — это процесс обучения программного обеспечения, называемого моделью, находить закономерности в данных и делать прогнозы для новых ситуаций. В традиционном программировании правила пишет человек, а в ML модель находит эти правила сама по примерам.",
              "Согласно классическому определению Артура Самуэля, программа улучшает выполнение задачи T по мере P благодаря опыту E."
            ],
            list: [
              "E — опыт: обучающие данные (например, 10 000 партий в шашки).",
              "T — задача: что решает модель (играть в шашки, распознавать кошку на фото).",
              "P — измеримый результат: точность, вероятность победы, ошибка."
            ],
            note: "Например, для прогноза осадков мы подаём метеорологические данные (температуру, влажность, давление) и получаем ответ модели. Модель не решает физические уравнения — она учит связь в данных."
          },
          {
            h: "Типы обучения",
            p: [
              "ML-системы делятся по наличию целевой метки (label) в данных и по способу обучения. При обучении с учителем модель сравнивает прогноз с правильным ответом и исправляет ошибку. При обучении без учителя правильного ответа нет: модель сама раскрывает внутреннюю структуру данных. При обучении с подкреплением агент действует и улучшает стратегию за счёт награды."
            ],
            table: {
              head: ["Тип", "Данные", "Основные задачи", "Пример"],
              rows: [
                ["С учителем", "X и Y (метка есть)", "Классификация, регрессия", "Определение спама, цена дома"],
                ["Без учителя", "Только X (метки нет)", "Кластеризация, снижение размерности", "Группировка клиентов"],
                ["С подкреплением", "Среда + награда/штраф", "Обучение стратегии", "Робот, AlphaGo"]
              ]
            },
            list: [
              "Классификация — определяет класс объекта: спам/не спам, яблоко/вишня.",
              "Регрессия — предсказывает непрерывное число: цена дома, температура, зарплата.",
              "Кластеризация — группирует неразмеченные данные по сходству."
            ]
          },
          {
            h: "Жизненный цикл ML",
            p: [
              "Реальный проект не заканчивается обучением одной модели. Жизненный цикл ML состоит из семи этапов, и каждый этап повторяется."
            ],
            ordered: [
              "Постановка цели: классификация, регрессия или кластеризация?",
              "Сбор данных: внутренняя база, открытые источники, API или веб-скрейпинг.",
              "Очистка и подготовка: пропуски, дубликаты, неверные единицы измерения.",
              "Разведочный анализ (EDA): распределения, корреляции, нужные признаки.",
              "Выбор и обучение модели: train/validation.",
              "Оценка и оптимизация: метрики, гиперпараметры.",
              "Внедрение и мониторинг: деплой, отслеживание изменений данных."
            ],
            note: "На практике большая часть качества модели зависит от подготовки данных: пропуски, дубликаты, несогласованные единицы измерения или утечка данных (data leakage) снижают результат."
          }
        ],
        visual: {
          title: "Жизненный цикл ML",
          html: `
            <div class="flow" role="img" aria-label="Жизненный цикл ML из семи этапов">
              <div class="flow-step"><span>01</span><b>Задача</b><small>Классификация или регрессия?</small></div>
              <div class="flow-step"><span>02</span><b>Данные</b><small>Сбор, источники</small></div>
              <div class="flow-step"><span>03</span><b>Подготовка</b><small>Пропуски, дубликаты</small></div>
              <div class="flow-step"><span>04</span><b>EDA</b><small>Распределения, корреляции</small></div>
              <div class="flow-step"><span>05</span><b>Обучение</b><small>Train / validation</small></div>
              <div class="flow-step"><span>06</span><b>Оценка</b><small>Метрики, настройка</small></div>
              <div class="flow-step"><span>07</span><b>Мониторинг</b><small>Деплой, контроль</small></div>
            </div>`,
          caption: "Результат каждого этапа влияет на следующий. На практике этапы 3–6 повторяются несколько раз."
        },
        code: {
          title: "Scikit-learn: первая модель",
          note: "Пример показывает мини-цикл обучения с учителем: разделение данных, обучение модели, прогноз и оценку точности.",
          source: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "Определение цвета автомобиля (серый, чёрный, белый) — это какая задача?",
            options: ["Классификация", "Регрессия"],
            answer: 0,
            why: "Цвет — дискретный класс, поэтому это классификация."
          },
          {
            q: "Предсказание возраста человека по фотографии — какая задача?",
            options: ["Классификация", "Регрессия"],
            answer: 1,
            why: "Возраст — непрерывное числовое значение, поэтому это регрессия."
          },
          {
            q: "Разбиение неизвестных данных на группы по сходству — какой это тип?",
            options: ["С учителем", "Без учителя", "С подкреплением"],
            answer: 1,
            why: "Целевой метки нет, структура находится по внутреннему сходству."
          },
          {
            q: "Что означает P (performance) в примере с шашками?",
            options: ["Количество партий", "Вероятность победы в следующей игре", "Правила игры"],
            answer: 1,
            why: "P — измеримый показатель качества задачи; в этом примере это вероятность победы."
          },
          {
            q: "Зачем делить данные на train и test?",
            options: ["Чтобы увеличить объём данных", "Чтобы честно оценить модель на новых данных", "Чтобы ускорить обучение"],
            answer: 1,
            why: "Тестовая выборка показывает реальное качество на данных, которые модель не видела."
          }
        ],
        summary: [
          "ML учит закономерности по данным, а не по правилам, написанным вручную.",
          "Три основных типа: с учителем, без учителя и с подкреплением.",
          "Классификация предсказывает класс, регрессия — число, кластеризация группирует данные.",
          "Жизненный цикл ML состоит из семи этапов и повторяется.",
          "Качество модели во многом определяется качеством данных."
        ]
      },
      en: {
        minutes: 90,
        goals: [
          "Understand what machine learning is and how it differs from traditional programming.",
          "Tell supervised, unsupervised and reinforcement learning apart.",
          "Recognise classification, regression and clustering tasks.",
          "Know the main stages of the ML lifecycle."
        ],
        theory: [
          {
            h: "What is machine learning?",
            p: [
              "Machine learning (ML) is the process of teaching software, called a model, to find patterns in data and make predictions for new situations. In traditional programming a human writes the rules; in ML the model finds those rules itself from examples.",
              "In Arthur Samuel's classic definition, a program improves its performance P on a task T with experience E."
            ],
            list: [
              "E — experience: training data (for example, 10,000 checkers games).",
              "T — task: what the model does (play checkers, recognise a cat in a photo).",
              "P — measurable performance: accuracy, win probability, error."
            ],
            note: "For example, to predict rainfall we feed the model weather data (temperature, humidity, pressure) and get an answer. The model does not solve physical equations — it learns the relationship in the data."
          },
          {
            h: "Types of learning",
            p: [
              "ML systems are divided by whether the data has a target label and by the learning approach. In supervised learning the model compares its prediction with the correct answer and corrects the error. In unsupervised learning there is no correct answer: the model discovers the internal structure of the data. In reinforcement learning an agent acts and improves a strategy through rewards."
            ],
            table: {
              head: ["Type", "Data", "Main tasks", "Example"],
              rows: [
                ["Supervised", "X and Y (labels present)", "Classification, regression", "Spam detection, house price"],
                ["Unsupervised", "X only (no labels)", "Clustering, dimensionality reduction", "Customer segmentation"],
                ["Reinforcement", "Environment + reward/penalty", "Learning a strategy", "Robot, AlphaGo"]
              ]
            },
            list: [
              "Classification predicts a class: spam/not spam, apple/cherry.",
              "Regression predicts a continuous number: house price, temperature, salary.",
              "Clustering groups unlabeled data by similarity."
            ]
          },
          {
            h: "The ML lifecycle",
            p: [
              "A real project does not end with training one model. The ML lifecycle has seven stages, and each stage repeats."
            ],
            ordered: [
              "Define the goal: classification, regression or clustering?",
              "Collect data: internal database, open sources, API or web scraping.",
              "Clean and prepare: missing values, duplicates, wrong units.",
              "Exploratory analysis (EDA): distributions, correlations, useful features.",
              "Select and train a model: train/validation splits.",
              "Evaluate and optimise: metrics, hyperparameters.",
              "Deploy and monitor: production rollout, data drift tracking."
            ],
            note: "In practice most of a model's quality depends on data preparation: missing values, duplicates, inconsistent units or data leakage reduce the result."
          }
        ],
        visual: {
          title: "The ML lifecycle",
          html: `
            <div class="flow" role="img" aria-label="Seven-stage machine learning lifecycle">
              <div class="flow-step"><span>01</span><b>Problem</b><small>Classification or regression?</small></div>
              <div class="flow-step"><span>02</span><b>Data</b><small>Collection, sources</small></div>
              <div class="flow-step"><span>03</span><b>Preparation</b><small>Missing values, duplicates</small></div>
              <div class="flow-step"><span>04</span><b>EDA</b><small>Distributions, correlations</small></div>
              <div class="flow-step"><span>05</span><b>Training</b><small>Train / validation</small></div>
              <div class="flow-step"><span>06</span><b>Evaluation</b><small>Metrics, tuning</small></div>
              <div class="flow-step"><span>07</span><b>Monitoring</b><small>Deploy, track</small></div>
            </div>`,
          caption: "Each stage affects the next one. In practice stages 3–6 repeat several times."
        },
        code: {
          title: "Scikit-learn: your first model",
          note: "This example shows a minimal supervised learning cycle: split the data, train the model, predict and evaluate accuracy.",
          source: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "Detecting a car's colour (grey, black, white) is which task?",
            options: ["Classification", "Regression"],
            answer: 0,
            why: "Colour is a discrete class, so this is classification."
          },
          {
            q: "Predicting a person's age from a photo is which task?",
            options: ["Classification", "Regression"],
            answer: 1,
            why: "Age is a continuous numeric value, so this is regression."
          },
          {
            q: "Grouping unknown data by similarity is which type?",
            options: ["Supervised", "Unsupervised", "Reinforcement"],
            answer: 1,
            why: "There is no target label, so the structure comes from internal similarity."
          },
          {
            q: "In the checkers example, what does P (performance) mean?",
            options: ["Number of games played", "Probability of winning the next game", "The rules of the game"],
            answer: 1,
            why: "P is a measurable quality of the task; here it is the probability of winning."
          },
          {
            q: "Why split data into train and test sets?",
            options: ["To increase the amount of data", "To evaluate the model fairly on unseen data", "To speed up training"],
            answer: 1,
            why: "The test set shows real quality on data the model has not seen."
          }
        ],
        summary: [
          "ML learns patterns from data instead of relying on hand-written rules.",
          "Three main types: supervised, unsupervised and reinforcement learning.",
          "Classification predicts a class, regression a number, clustering groups data.",
          "The ML lifecycle has seven stages and repeats.",
          "Model quality is largely determined by data quality."
        ]
      }
    },
    2: {
      kk: {
        minutes: 90,
        goals: [
          "Python экожүйесіндегі NumPy, Pandas және scikit-learn кітапханаларының рөлін түсіну.",
          "NumPy-дың ndarray құрылымын және векторландырудың артықшылығын білу.",
          "Pandas-та Series пен DataFrame құрып, деректерді оқу, тексеру және сүзу.",
          "scikit-learn-те деректерді жүктеу, бөлу, масштабтау және модель оқыту ретін меңгеру."
        ],
        theory: [
          {
            h: "Python деректер экожүйесі",
            p: [
              "Машиналық оқытуда Python негізгі құралға айналды, өйткені есептеу, кестелік талдау және модельдеу бір тілде жасалады. Негізгі кітапханалар әр қабатта жұмыс істейді: NumPy сандық массивтерді, Pandas кестелерді, scikit-learn модельдерді ұсынады.",
              "Бұл кітапханалар бір-бірін толықтырады: Pandas ішінде NumPy массивтері қолданылады, ал scikit-learn Pandas кестесін де, NumPy массивін де кіріс ретінде қабылдайды."
            ],
            list: [
              "NumPy — жылдам сандық есептеулер мен көпөлшемді массивтер.",
              "Pandas — CSV, Excel, SQL және JSON деректерімен жұмыс істейтін кестелік құрал.",
              "scikit-learn — алдын ала өңдеу, модель таңдау, оқыту және бағалау.",
              "Matplotlib және Seaborn — нәтижені визуализациялау құралдары."
            ],
            note: "Орнату үшін pip install numpy pandas scikit-learn жеткілікті. Бұл кітапханалар тегін және ашық бастапқы кодты."
          },
          {
            h: "NumPy: массив және векторландыру",
            p: [
              "NumPy-дың негізгі нысаны — ndarray, яғни n-өлшемді массив. Массив элементтері әдетте бір типті болады, ал өлшемі құрылған кезде анықталады. Бұл жадыны үнемдеп, есептеуді Python тізімдеріне қарағанда әлдеқайда жылдам етеді.",
              "Басты артықшылық — векторландыру: цикл жазбай-ақ барлық элементке бір операцияны қолдану. Мысалы, a * b екі массивтің сәйкес элементтерін автоматты түрде көбейтеді."
            ],
            list: [
              "ndim — өлшем саны, shape — әр өлшемнің мөлшері.",
              "dtype — элементтер типі; astype() арқылы түрлендіруге болады.",
              "Агрегаттар: mean(), std(), min(), max(), sum().",
              "Индекстеу және кесу: a[0], a[:, 1], a[a > 0]."
            ],
            note: "Векторланған код ықшам ғана емес, үлкен деректерде циклден бірнеше есе жылдам. Себебі операциялар төменгі деңгейдегі C кодында орындалады."
          },
          {
            h: "Pandas: Series және DataFrame",
            p: [
              "Pandas кестелік деректерді оқуға, тазалауға, сүзуге және топтауға арналған. Series — индексі бар бір өлшемді баған, ал DataFrame — атаулы бағандары мен индексі бар екі өлшемді кесте.",
              "DataFrame төрт бөліктен тұрады: жолдар (бақылаулар), бағандар (белгілер), индекс (жолды анықтайтын белгі) және мәндер (ұяшықтардағы деректер). Талдау әдетте құрылымды тексеруден басталады."
            ],
            table: {
              head: ["Команда", "Не істейді", "Қашан қолданылады"],
              rows: [
                ["head() / tail()", "Алғашқы немесе соңғы 5 жолды көрсетеді", "Жылдам танысу"],
                ["info()", "Бағандар, типтер және бос емес мәндер", "Құрылымды тексеру"],
                ["describe()", "Сандық статистика", "Таралуды бағалау"],
                ["isna().sum()", "Әр бағандағы бос мән саны", "Дерек сапасын тексеру"]
              ]
            },
            list: [
              "Оқу: pd.read_csv(), pd.read_excel(), pd.read_json().",
              "Тандау: df['col'], df.loc[шарт, бағандар], df.iloc[0:5].",
              "Сүзу: df[df['age'] > 30].",
              "Топтау: df.groupby('city')['price'].mean()."
            ],
            note: "loc индекстің атауы бойынша, iloc позициясы бойынша таңдайды. Бұл айырмашылықты шатастыру жиі кездеседі."
          },
          {
            h: "scikit-learn: бірізді API",
            p: [
              "scikit-learn барлық модельдерге ортақ қарапайым API ұсынады: fit() модельді оқытады, predict() болжам жасайды, transform() деректерді түрлендіреді. Сол себепті бір алгоритмнен екіншісіне ауысу оңай.",
              "Деректер әдетте X (белгілер матрицасы) және y (мақсатты вектор) болып бөлінеді. Модельді әділ бағалау үшін деректер train және test жиындарына бөлінеді, ал қажет болса, белгілер масштабталады."
            ],
            list: [
              "Алдын ала өңдеу: StandardScaler, MinMaxScaler, OneHotEncoder.",
              "Бөлу: train_test_split(X, y, test_size=0.2, random_state=42).",
              "Модельдер: LogisticRegression, RandomForestClassifier, KMeans.",
              "Бағалау: accuracy_score, mean_squared_error, cross_val_score."
            ],
            note: "Ереже: scaler-ді тек train жиынында оқытып, test жиынына сол оқытылған scaler-ді қолдану керек. Әйтпесе тест деректері туралы ақпарат модельге ертерек жетіп, бағалау бұрмаланады."
          }
        ],
        visual: {
          title: "DataFrame құрылымы",
          html: `
            <div class="flow" role="img" aria-label="DataFrame құрылымы: жолдар, бағандар, индекс және мәндер">
              <div class="flow-step"><span>01</span><b>Жолдар</b><small>Жеке бақылаулар: әр пациент, әр сату</small></div>
              <div class="flow-step"><span>02</span><b>Бағандар</b><small>Белгілер: жас, қант деңгейі, баға</small></div>
              <div class="flow-step"><span>03</span><b>Индекс</b><small>Жолды анықтайтын белгі</small></div>
              <div class="flow-step"><span>04</span><b>Мәндер</b><small>Ұяшықтардағы нақты деректер</small></div>
            </div>`,
          caption: "DataFrame — бағандары атаулы, индексі бар екі өлшемді кесте. loc атау бойынша, iloc позиция бойынша таңдайды."
        },
        code: {
          title: "Pandas және scikit-learn: дайындық ағыны",
          note: "Код деректерді кестеге айналдырып, сапасын тексереді, train/test-ке бөледі және масштабтайды. Содан кейін қарапайым модель оқытылады.",
          source: `import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True, as_frame=True)
df = X.copy()
df["target"] = y

print(df.head())
print(df.info())
print(df.isna().sum())

X_train, X_test, y_train, y_test = train_test_split(
    df.drop(columns="target"), df["target"],
    test_size=0.2, random_state=42, stratify=df["target"]
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "DataFrame дегеніміз не?",
            options: ["Бір өлшемді баған", "Атаулы бағандары бар екі өлшемді кесте", "Модель оқытатын функция"],
            answer: 1,
            why: "DataFrame — жолдар, бағандар және индекстен тұратын екі өлшемді кесте."
          },
          {
            q: "df.iloc[0] өрнегі нені қайтарады?",
            options: ["Позиция бойынша бірінші жолды", "Атауы 0 болатын бағанды", "Барлық жолдардың орташасын"],
            answer: 0,
            why: "iloc позиция бойынша таңдайды; loc индекстің атауы бойынша жұмыс істейді."
          },
          {
            q: "150 бақылау және 4 белгісі бар X массивінің shape мәні қандай?",
            options: ["(4, 150)", "(150, 4)", "(150,)"],
            answer: 1,
            why: "NumPy-да shape (жолдар саны, бағандар саны) түрінде беріледі: (150, 4)."
          },
          {
            q: "Векторландырудың негізгі артықшылығы неде?",
            options: ["Циклсіз барлық элементке операция қолданылады", "Деректер автоматты түрде жойылады", "Тек мәтіндік деректермен жұмыс істейді"],
            answer: 0,
            why: "Векторланған операция бүкіл массивке бірден қолданылып, циклден жылдам орындалады."
          },
          {
            q: "fit() және predict() ортақ API-ін қай кітапхана ұсынады?",
            options: ["Pandas", "NumPy", "scikit-learn"],
            answer: 2,
            why: "scikit-learn модельдерінің барлығы дерлік fit/predict/transform интерфейсін қолданады."
          }
        ],
        summary: [
          "NumPy сандық массивтерді, Pandas кестелерді, scikit-learn модельдерді ұсынады.",
          "ndarray бір типті элементтерден тұрады және векторланған есептеуге арналған.",
          "Series — бір баған, DataFrame — индексі мен атаулы бағандары бар кесте.",
          "loc атау бойынша, iloc позиция бойынша таңдайды; info() құрылымды тексереді.",
          "scikit-learn-те деректер train/test-ке бөлініп, scaler тек train-де оқытылады."
        ]
      },
      ru: {
        minutes: 90,
        goals: [
          "Понять роль библиотек NumPy, Pandas и scikit-learn в экосистеме Python.",
          "Знать структуру ndarray и преимущества векторизации NumPy.",
          "Создавать Series и DataFrame, читать, проверять и фильтровать данные в Pandas.",
          "Освоить порядок загрузки, разделения, масштабирования данных и обучения модели в scikit-learn."
        ],
        theory: [
          {
            h: "Экосистема Python для данных",
            p: [
              "Python стал основным инструментом машинного обучения, потому что вычисления, табличный анализ и моделирование выполняются в одном языке. Библиотеки работают на разных уровнях: NumPy отвечает за числовые массивы, Pandas — за таблицы, scikit-learn — за модели.",
              "Библиотеки дополняют друг друга: внутри Pandas используются массивы NumPy, а scikit-learn принимает на вход и таблицу Pandas, и массив NumPy."
            ],
            list: [
              "NumPy — быстрые числовые вычисления и многомерные массивы.",
              "Pandas — табличный инструмент для CSV, Excel, SQL и JSON.",
              "scikit-learn — предобработка, выбор модели, обучение и оценка.",
              "Matplotlib и Seaborn — инструменты визуализации результатов."
            ],
            note: "Для установки достаточно pip install numpy pandas scikit-learn. Все библиотеки бесплатны и имеют открытый исходный код."
          },
          {
            h: "NumPy: массивы и векторизация",
            p: [
              "Основной объект NumPy — ndarray, n-мерный массив. Элементы массива обычно одного типа, а размер задаётся при создании. Это экономит память и делает вычисления значительно быстрее списков Python.",
              "Главное преимущество — векторизация: операция применяется ко всем элементам без явного цикла. Например, a * b автоматически перемножает соответствующие элементы двух массивов."
            ],
            list: [
              "ndim — число измерений, shape — размер каждого измерения.",
              "dtype — тип элементов; преобразование через astype().",
              "Агрегаты: mean(), std(), min(), max(), sum().",
              "Индексация и срезы: a[0], a[:, 1], a[a > 0]."
            ],
            note: "Векторизованный код не только короче, но и в несколько раз быстрее цикла на больших данных: операции выполняются в низкоуровневом коде на C."
          },
          {
            h: "Pandas: Series и DataFrame",
            p: [
              "Pandas предназначен для чтения, очистки, фильтрации и группировки табличных данных. Series — одномерный столбец с индексом, а DataFrame — двумерная таблица с именованными столбцами и индексом.",
              "DataFrame состоит из четырёх частей: строки (наблюдения), столбцы (признаки), индекс (метка строки) и значения (данные в ячейках). Анализ обычно начинается с проверки структуры."
            ],
            table: {
              head: ["Команда", "Что делает", "Когда используется"],
              rows: [
                ["head() / tail()", "Показывает первые или последние 5 строк", "Быстрое знакомство"],
                ["info()", "Столбцы, типы и непустые значения", "Проверка структуры"],
                ["describe()", "Числовая статистика", "Оценка распределения"],
                ["isna().sum()", "Число пропусков в каждом столбце", "Проверка качества данных"]
              ]
            },
            list: [
              "Чтение: pd.read_csv(), pd.read_excel(), pd.read_json().",
              "Выбор: df['col'], df.loc[условие, столбцы], df.iloc[0:5].",
              "Фильтрация: df[df['age'] > 30].",
              "Группировка: df.groupby('city')['price'].mean()."
            ],
            note: "loc выбирает по имени индекса, iloc — по позиции. Эту разницу путают чаще всего."
          },
          {
            h: "scikit-learn: единый API",
            p: [
              "scikit-learn предлагает общий простой API для всех моделей: fit() обучает модель, predict() делает прогноз, transform() преобразует данные. Поэтому переход от одного алгоритма к другому почти не меняет код.",
              "Данные обычно делятся на X (матрица признаков) и y (целевой вектор). Для честной оценки данные разделяют на train и test, а при необходимости масштабируют признаки."
            ],
            list: [
              "Предобработка: StandardScaler, MinMaxScaler, OneHotEncoder.",
              "Разделение: train_test_split(X, y, test_size=0.2, random_state=42).",
              "Модели: LogisticRegression, RandomForestClassifier, KMeans.",
              "Оценка: accuracy_score, mean_squared_error, cross_val_score."
            ],
            note: "Правило: scaler обучают только на train и применяют к test тот же обученный scaler. Иначе информация о тестовых данных попадёт в модель слишком рано и оценка исказится."
          }
        ],
        visual: {
          title: "Структура DataFrame",
          html: `
            <div class="flow" role="img" aria-label="Структура DataFrame: строки, столбцы, индекс и значения">
              <div class="flow-step"><span>01</span><b>Строки</b><small>Отдельные наблюдения: пациент, продажа</small></div>
              <div class="flow-step"><span>02</span><b>Столбцы</b><small>Признаки: возраст, сахар, цена</small></div>
              <div class="flow-step"><span>03</span><b>Индекс</b><small>Метка, определяющая строку</small></div>
              <div class="flow-step"><span>04</span><b>Значения</b><small>Конкретные данные в ячейках</small></div>
            </div>`,
          caption: "DataFrame — двумерная таблица с именованными столбцами и индексом. loc выбирает по имени, iloc — по позиции."
        },
        code: {
          title: "Pandas и scikit-learn: поток подготовки",
          note: "Код превращает данные в таблицу, проверяет качество, делит на train/test и масштабирует признаки. Затем обучается простая модель.",
          source: `import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True, as_frame=True)
df = X.copy()
df["target"] = y

print(df.head())
print(df.info())
print(df.isna().sum())

X_train, X_test, y_train, y_test = train_test_split(
    df.drop(columns="target"), df["target"],
    test_size=0.2, random_state=42, stratify=df["target"]
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "Что такое DataFrame?",
            options: ["Одномерный столбец", "Двумерная таблица с именованными столбцами", "Функция обучения модели"],
            answer: 1,
            why: "DataFrame — двумерная таблица из строк, столбцов и индекса."
          },
          {
            q: "Что возвращает df.iloc[0]?",
            options: ["Первую строку по позиции", "Столбец с именем 0", "Среднее всех строк"],
            answer: 0,
            why: "iloc выбирает по позиции; loc работает по имени индекса."
          },
          {
            q: "Каков shape массива X с 150 наблюдениями и 4 признаками?",
            options: ["(4, 150)", "(150, 4)", "(150,)"],
            answer: 1,
            why: "В NumPy shape записывается как (число строк, число столбцов): (150, 4)."
          },
          {
            q: "В чём главное преимущество векторизации?",
            options: ["Операция применяется ко всем элементам без цикла", "Данные удаляются автоматически", "Работает только с текстом"],
            answer: 0,
            why: "Векторизованная операция применяется ко всему массиву сразу и выполняется быстрее цикла."
          },
          {
            q: "Какая библиотека предоставляет общий API fit() и predict()?",
            options: ["Pandas", "NumPy", "scikit-learn"],
            answer: 2,
            why: "Почти все модели scikit-learn используют интерфейс fit/predict/transform."
          }
        ],
        summary: [
          "NumPy отвечает за числовые массивы, Pandas — за таблицы, scikit-learn — за модели.",
          "ndarray состоит из элементов одного типа и предназначен для векторизованных вычислений.",
          "Series — один столбец, DataFrame — таблица с индексом и именованными столбцами.",
          "loc выбирает по имени, iloc по позиции; info() проверяет структуру.",
          "В scikit-learn данные делят на train/test, а scaler обучают только на train."
        ]
      },
      en: {
        minutes: 90,
        goals: [
          "Understand the roles of NumPy, Pandas and scikit-learn in the Python ecosystem.",
          "Know the ndarray structure and the advantage of NumPy vectorisation.",
          "Create Series and DataFrames and read, inspect and filter data in Pandas.",
          "Master loading, splitting, scaling and training a model in scikit-learn."
        ],
        theory: [
          {
            h: "The Python data ecosystem",
            p: [
              "Python became the main tool for machine learning because computation, tabular analysis and modelling happen in one language. The libraries work at different layers: NumPy provides numeric arrays, Pandas provides tables, and scikit-learn provides models.",
              "The libraries complement each other: Pandas uses NumPy arrays internally, and scikit-learn accepts both a Pandas table and a NumPy array as input."
            ],
            list: [
              "NumPy — fast numeric computation and multidimensional arrays.",
              "Pandas — tabular tooling for CSV, Excel, SQL and JSON.",
              "scikit-learn — preprocessing, model selection, training and evaluation.",
              "Matplotlib and Seaborn — result visualisation tools."
            ],
            note: "To install everything, run pip install numpy pandas scikit-learn. All three libraries are free and open source."
          },
          {
            h: "NumPy: arrays and vectorisation",
            p: [
              "The main NumPy object is ndarray, an n-dimensional array. Array elements usually share one type, and the size is fixed at creation. This saves memory and makes computation much faster than Python lists.",
              "The main advantage is vectorisation: an operation applies to every element without writing a loop. For example, a * b automatically multiplies matching elements of two arrays."
            ],
            list: [
              "ndim — number of dimensions, shape — the size of each dimension.",
              "dtype — element type; convert with astype().",
              "Aggregates: mean(), std(), min(), max(), sum().",
              "Indexing and slicing: a[0], a[:, 1], a[a > 0]."
            ],
            note: "Vectorised code is shorter and several times faster than a loop on large data because the operations run in low-level C code."
          },
          {
            h: "Pandas: Series and DataFrame",
            p: [
              "Pandas is designed for reading, cleaning, filtering and grouping tabular data. A Series is a one-dimensional labelled column, while a DataFrame is a two-dimensional table with named columns and an index.",
              "A DataFrame has four parts: rows (observations), columns (features), an index (the row label) and values (the data in cells). Analysis usually starts with inspecting the structure."
            ],
            table: {
              head: ["Command", "What it does", "When to use it"],
              rows: [
                ["head() / tail()", "Shows the first or last 5 rows", "Quick first look"],
                ["info()", "Columns, dtypes and non-null counts", "Structure check"],
                ["describe()", "Numeric summary statistics", "Distribution check"],
                ["isna().sum()", "Missing value count per column", "Data quality check"]
              ]
            },
            list: [
              "Reading: pd.read_csv(), pd.read_excel(), pd.read_json().",
              "Selection: df['col'], df.loc[condition, columns], df.iloc[0:5].",
              "Filtering: df[df['age'] > 30].",
              "Grouping: df.groupby('city')['price'].mean()."
            ],
            note: "loc selects by index label, iloc by integer position. Mixing them up is a very common mistake."
          },
          {
            h: "scikit-learn: one consistent API",
            p: [
              "scikit-learn offers one simple API for every model: fit() trains, predict() makes predictions and transform() converts data. Switching from one algorithm to another therefore changes very little code.",
              "Data is usually split into X (the feature matrix) and y (the target vector). For a fair evaluation the data is divided into train and test sets, and features are scaled when needed."
            ],
            list: [
              "Preprocessing: StandardScaler, MinMaxScaler, OneHotEncoder.",
              "Splitting: train_test_split(X, y, test_size=0.2, random_state=42).",
              "Models: LogisticRegression, RandomForestClassifier, KMeans.",
              "Evaluation: accuracy_score, mean_squared_error, cross_val_score."
            ],
            note: "Rule: fit the scaler on the train set only and apply that fitted scaler to the test set. Otherwise information about the test data leaks into the model too early."
          }
        ],
        visual: {
          title: "DataFrame anatomy",
          html: `
            <div class="flow" role="img" aria-label="DataFrame anatomy: rows, columns, index and values">
              <div class="flow-step"><span>01</span><b>Rows</b><small>Individual observations: a patient, a sale</small></div>
              <div class="flow-step"><span>02</span><b>Columns</b><small>Features: age, glucose, price</small></div>
              <div class="flow-step"><span>03</span><b>Index</b><small>The label that identifies a row</small></div>
              <div class="flow-step"><span>04</span><b>Values</b><small>The actual data inside cells</small></div>
            </div>`,
          caption: "A DataFrame is a two-dimensional table with named columns and an index. loc selects by label, iloc by position."
        },
        code: {
          title: "Pandas and scikit-learn: a preparation pipeline",
          note: "The code turns the data into a table, checks quality, splits it into train/test and scales the features. It then trains a simple model.",
          source: `import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True, as_frame=True)
df = X.copy()
df["target"] = y

print(df.head())
print(df.info())
print(df.isna().sum())

X_train, X_test, y_train, y_test = train_test_split(
    df.drop(columns="target"), df["target"],
    test_size=0.2, random_state=42, stratify=df["target"]
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "What is a DataFrame?",
            options: ["A one-dimensional column", "A two-dimensional table with named columns", "A function that trains a model"],
            answer: 1,
            why: "A DataFrame is a two-dimensional table made of rows, columns and an index."
          },
          {
            q: "What does df.iloc[0] return?",
            options: ["The first row by position", "The column named 0", "The mean of all rows"],
            answer: 0,
            why: "iloc selects by position; loc works by index label."
          },
          {
            q: "What is the shape of X with 150 observations and 4 features?",
            options: ["(4, 150)", "(150, 4)", "(150,)"],
            answer: 1,
            why: "NumPy shape is (number of rows, number of columns): (150, 4)."
          },
          {
            q: "What is the main advantage of vectorisation?",
            options: ["An operation applies to all elements without a loop", "Data is deleted automatically", "It only works with text"],
            answer: 0,
            why: "A vectorised operation applies to the whole array at once and runs faster than a loop."
          },
          {
            q: "Which library provides the shared fit() and predict() API?",
            options: ["Pandas", "NumPy", "scikit-learn"],
            answer: 2,
            why: "Almost every scikit-learn model uses the fit/predict/transform interface."
          }
        ],
        summary: [
          "NumPy handles numeric arrays, Pandas handles tables, scikit-learn handles models.",
          "An ndarray holds same-type elements and is built for vectorised computation.",
          "A Series is one column; a DataFrame is a table with an index and named columns.",
          "loc selects by label, iloc by position; info() checks the structure.",
          "In scikit-learn, data is split into train/test and the scaler is fitted on train only."
        ]
      }
    },
    3: {
      kk: {
        minutes: 90,
        goals: [
          "Дерек пен datum айырмашылығын және деректен құндылық қалай шығатынын түсіну.",
          "Ішкі және сыртқы дереккөздерді, API, RSS және веб-скрейпингті ажырату.",
          "Сандық, бульдік, жолдық, санаттық және реттік дерек типтерін тану.",
          "DataFrame құрудан топтық талдауға дейінгі EDA ағынын және визуализация құралдарын меңгеру."
        ],
        theory: [
          {
            h: "Дерек және datum",
            p: [
              "Datum — бір реттік өлшем: ортақ шкала бойынша тіркелген нақты факт немесе сан. Мысалы, «бүгін ауа температурасы +25°C». Data — осындай жеке өлшемдердің жиынтығы, мысалы, соңғы 10 күндегі температуралар тізімі.",
              "Кез келген нәрсе дерекке айнала алады: жүректің соғуы, сайттағы клик саны, көлік жылдамдығы, бөлмедегі жарық деңгейі. Шарты — құбылысты тіркеушіге де, оқырманға да түсінікті шкалаға салып өлшеу."
            ],
            list: [
              "Datum — бірлік өлшем, data — сол өлшемдердің жиынтығы.",
              "Дерек шикі фактілерден тұрады; ақпарат — өңделген, мағына берілген дерек.",
              "Сапалы дерек шешімге негіз болады, сапасыз дерек қатені көбейтеді."
            ],
            note: "«Garbage in, garbage out»: сапасыз кіріс сапасыз нәтиже береді. Сондықтан EDA деректің өзін түсінуден басталады."
          },
          {
            h: "Дереккөздер және жинау",
            p: [
              "Дереккөздер үш топқа бөлінеді. Ішкі дереккөздер — ұйымның өз дерекқорындағы операциялық, ғылыми немесе эксперименттік деректер. Дайын сыртқы дереккөздер — тегін немесе ақылы түрде дайын форматта қолжетімді ашық дерекқорлар, биржа деректері, пікірлер.",
              "Үшінші топ — жинақтауды қажет ететін сыртқы дереккөздер: қағаз архивтегі немесе сайтта жарияланған, бірақ дайын файл түрінде жоқ деректер. Оларды API, RSS немесе веб-скрейпинг арқылы алады."
            ],
            list: [
              "API — сервистің ресми интерфейсі; сұранысқа JSON немесе XML қайтарады. Мысалы: Google Maps, Twitter API.",
              "RSS (Rich Site Summary) — жаңалықтар мен блогтардың жаңарту таспасы; оқу тегін және стандартты.",
              "Web scraping — HTML-ден қажет мәтін, баға немесе кестені бағдарламамен бөліп алу.",
              "Қағаз архив, сканерленген құжат және сурет те дереккөз бола алады."
            ],
            note: "Скрейпингте сайттың пайдалану шарттарын, robots.txt және авторлық құқықты тексеру керек. Мүмкін болса, ресми API-ды таңда."
          },
          {
            h: "Дерек типтері және EDA ағыны",
            p: [
              "Қарапайым (атомдық) типтер: сандық (бүтін және бөлшек), бульдік (true/false) және жолдық (мәтін). Олардан басқа санаттық (nominal) және реттік (ordinal) белгілер жиі кездеседі: санаттықта рет жоқ (қала, түс), реттікте бағыт бар (төмен, орта, жоғары).",
              "EDA — деректі модельге бермес бұрын мұқият қарап шығу процесі. Ол құрылымды, үлгілерді, қателерді және айнымалылар арасындағы байланысты ашады. Жұмыс төрт қадаммен жүреді: DataFrame құру, тазалау, жалпы қасиеттерді зерттеу, топтық қасиеттерді салыстыру."
            ],
            table: {
              head: ["Қадам", "Не істеледі", "Құрал"],
              rows: [
                ["1. DataFrame", "Барлық деректі бір кестеге жинау", "pd.DataFrame, read_csv"],
                ["2. Тазалау", "Жол — объект, баған — қасиет, мән атомдық", "dropna, astype, rename"],
                ["3. Global", "Таралу, байланыс, агрегаттар", "describe, hist, scatter"],
                ["4. Group", "Ішкі жиындарды салыстыру", "groupby, small multiples"]
              ]
            },
            list: [
              "Әр жол бір ғана объектіні, әр баған сол объектінің бір қасиетін сипаттауы керек.",
              "Сандық бағандар сандық типте, категориялық бағандар category типінде болғаны ыңғайлы.",
              "Тексеру: shape, dtypes, isna().sum(), duplicated().sum(), describe().",
              "Data leakage — модель білмеуі керек ақпараттың белгілерге кіріп кетуі."
            ],
            note: "EDA белгілі бір модельге бағытталмайды, сондықтан күтпеген байланыстарды байқауға көмектеседі. Нәтижесін деректің қысқа «құжаттамасы» ретінде сақтаған пайдалы."
          },
          {
            h: "Визуализация құралдары",
            p: [
              "Pandas Visualization модулі DataFrame-нен тікелей график салуға мүмкіндік береді (.plot()). Matplotlib — Python-дағы негізгі, төменгі деңгейлі графика кітапханасы; ол ось, түс және белгілеу сияқты барлық детальді басқарады. Seaborn Matplotlib негізінде құрылған және статистикалық визуализацияға ыңғайлы.",
              "Бұл құралдар бір-бірімен араласады: Seaborn графигін Matplotlib арқылы өзгертуге, ал Pandas .plot() нәтижесін қосымша реттеуге болады. Мақсат — әр графикті нөлден жазбай, ең қысқа жолмен деректің негізгі үлгісін көрсету."
            ],
            table: {
              head: ["Сұрақ", "График", "Не көрсетеді"],
              rows: [
                ["Бір белгінің таралуы қандай?", "Гистограмма, box plot", "Орталық, шашырау, ауытқу"],
                ["Екі белгі байланысқан ба?", "Scatter plot", "Бағыт, күш, сызықтық емес үлгі"],
                ["Санаттарды салыстыру", "Bar chart", "Топтар арасындағы айырма"],
                ["Уақыт бойынша өзгеріс", "Line chart", "Тренд, маусымдық"],
                ["Көп белгінің корреляциясы", "Heatmap", "Байланыс матрицасы"]
              ]
            },
            list: [
              "Бір айнымалыдан бастап, содан кейін жұптарға және топтарға көшу.",
              "Осьтерді атау, өлшем бірлігін жазу және легенданы қосу — графиктің міндетті бөлігі.",
              "Түспен тек мағыналы айырмашылықты көрсету; артық безендіруден аулақ болу."
            ],
            note: "EDA-да әдемі график емес, дұрыс сұраққа жауап беретін график маңызды. Әр графиктен кейін «бұл нені білдіреді?» деп сұрақ қою керек."
          }
        ],
        visual: {
          title: "EDA жұмыс барысы",
          html: `
            <div class="flow" role="img" aria-label="EDA жұмыс барысы: DataFrame, тазалау, глобалды және топтық талдау">
              <div class="flow-step"><span>01</span><b>DataFrame</b><small>Барлық деректі бір кестеге жинау</small></div>
              <div class="flow-step"><span>02</span><b>Тазалау</b><small>Жол — объект, баған — қасиет</small></div>
              <div class="flow-step"><span>03</span><b>Global</b><small>Таралу, корреляция, агрегат</small></div>
              <div class="flow-step"><span>04</span><b>Group</b><small>groupby және small multiples</small></div>
            </div>`,
          caption: "Әр қадам келесісіне сүйенеді: тазаланбаған кестедегі қорытынды сандар сенімсіз болады."
        },
        code: {
          title: "Pandas және Seaborn: бірінші EDA",
          note: "Код құрылымды, типтерді және бос мәндерді тексереді, топтық статистиканы есептейді және жұп графиктерді салады. Жергілікті penguins.csv файлы қолданылады.",
          source: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("penguins-files/penguins.csv")

print(df.shape)
print(df.dtypes)
print(df.isna().sum())
print(df.describe())
print(df["species"].value_counts())

df = df.dropna()
print(df.groupby("species")["body_mass_g"].mean())

sns.pairplot(df, hue="species")
plt.show()`
        },
        quiz: [
          {
            q: "Datum мен data айырмашылығы неде?",
            options: ["Datum — бір өлшем, data — өлшемдер жиынтығы", "Datum — мәтін, data — сурет", "Айырмашылығы жоқ"],
            answer: 0,
            why: "Datum — бірлік өлшем, ал data — сол сияқты өлшемдердің жиынтығы."
          },
          {
            q: "Қағаз архивтегі, дайын файлға айналмаған дерек қай топқа жатады?",
            options: ["Ішкі дереккөз", "Жинақтауды қажет ететін сыртқы дереккөз", "Дайын сыртқы дереккөз"],
            answer: 1,
            why: "Дерек бар, бірақ оны алу үшін қосымша жинау немесе өңдеу жұмысы қажет."
          },
          {
            q: "Сайтта API жоқ болса, HTML-ден дерек алу тәсілі қалай аталады?",
            options: ["Web scraping", "RSS", "Кэштеу"],
            answer: 0,
            why: "Web scraping HTML бетінен қажет деректерді бағдарламамен бөліп алады."
          },
          {
            q: "Бір айнымалының таралуын қай график жақсы көрсетеді?",
            options: ["Scatter plot", "Гистограмма", "Line chart"],
            answer: 1,
            why: "Гистограмма мәндердің қалай таралғанын, орталығын және ауытқуын көрсетеді."
          },
          {
            q: "groupby() әдетте нені істейді?",
            options: ["Деректерді топтап, әр топ бойынша агрегат есептейді", "Барлық бос мәнді жояды", "Кестені суретке айналдырады"],
            answer: 0,
            why: "groupby топтарға бөледі, содан кейін mean(), sum() сияқты агрегаттар қолданылады."
          }
        ],
        summary: [
          "Datum — бір өлшем, data — сол өлшемдердің жиынтығы; кез келген өлшенетін құбылыс дерек бола алады.",
          "Дереккөздер ішкі, дайын сыртқы және жинақтауды қажет ететін сыртқы болып бөлінеді.",
          "API ресми интерфейс, RSS жаңарту таспасы, web scraping HTML-ден дерек алу тәсілі.",
          "EDA: DataFrame құру → тазалау → global талдау → group талдау.",
          "Pandas .plot(), Matplotlib және Seaborn бірге қолданылады; график нақты сұраққа жауап беруі керек."
        ]
      },
      ru: {
        minutes: 90,
        goals: [
          "Понять разницу между datum и data и то, как из данных получается ценность.",
          "Различать внутренние и внешние источники, API, RSS и веб-скрейпинг.",
          "Распознавать числовые, булевы, строковые, категориальные и порядковые типы данных.",
          "Освоить EDA от создания DataFrame до группового анализа и инструменты визуализации."
        ],
        theory: [
          {
            h: "Данные и datum",
            p: [
              "Datum — единичное измерение: конкретный факт или число, зафиксированное по общей шкале. Например, «сегодня температура воздуха +25°C». Data — набор таких отдельных измерений, например список температур за последние 10 дней.",
              "Данными может стать что угодно: пульс, число кликов на сайте, скорость автомобиля, уровень освещённости в комнате. Условие — измерить явление по шкале, понятной и тому, кто фиксирует, и тому, кто читает."
            ],
            list: [
              "Datum — единичное измерение, data — набор таких измерений.",
              "Данные состоят из сырых фактов; информация — это обработанные данные с приданным смыслом.",
              "Качественные данные становятся основой решения, некачественные — умножают ошибки."
            ],
            note: "«Garbage in, garbage out»: плохой вход даёт плохой результат. Поэтому EDA начинается с понимания самих данных."
          },
          {
            h: "Источники данных и сбор",
            p: [
              "Источники делятся на три группы. Внутренние — операционные, научные или экспериментальные данные из собственной базы организации. Готовые внешние — открытые базы, биржевые данные и отзывы, доступные бесплатно или платно в готовом формате.",
              "Третья группа — внешние источники, требующие сбора: данные в бумажном архиве или на сайте, но не в виде готового файла. Их получают через API, RSS или веб-скрейпинг."
            ],
            list: [
              "API — официальный интерфейс сервиса; возвращает JSON или XML. Примеры: Google Maps, Twitter API.",
              "RSS (Rich Site Summary) — лента обновлений новостей и блогов; чтение бесплатное и стандартное.",
              "Web scraping — программное извлечение нужного текста, цены или таблицы из HTML.",
              "Бумажный архив, отсканированный документ и изображение тоже могут быть источником."
            ],
            note: "При скрейпинге проверяйте условия использования сайта, robots.txt и авторские права. Если возможно, выбирайте официальный API."
          },
          {
            h: "Типы данных и процесс EDA",
            p: [
              "Простые (атомарные) типы: числовые (целые и дробные), булевы (true/false) и строковые (текст). Кроме них часто встречаются категориальные (nominal) и порядковые (ordinal) признаки: в категориальных нет порядка (город, цвет), в порядковых есть направление (низкий, средний, высокий).",
              "EDA — процесс внимательного изучения данных до передачи модели. Он раскрывает структуру, закономерности, ошибки и связи между переменными. Работа идёт в четыре шага: создать DataFrame, очистить, изучить глобальные свойства, сравнить групповые свойства."
            ],
            table: {
              head: ["Шаг", "Что делается", "Инструмент"],
              rows: [
                ["1. DataFrame", "Собрать все данные в одну таблицу", "pd.DataFrame, read_csv"],
                ["2. Очистка", "Строка — объект, столбец — свойство, значение атомарно", "dropna, astype, rename"],
                ["3. Global", "Распределение, связи, агрегаты", "describe, hist, scatter"],
                ["4. Group", "Сравнить подмножества", "groupby, small multiples"]
              ]
            },
            list: [
              "Каждая строка должна описывать один объект, каждый столбец — одно свойство этого объекта.",
              "Числовые столбцы удобно держать в числовом типе, категориальные — в типе category.",
              "Проверка: shape, dtypes, isna().sum(), duplicated().sum(), describe().",
              "Data leakage — попадание в признаки информации, которую модель знать не должна."
            ],
            note: "EDA не привязан к конкретной модели, поэтому помогает заметить неожиданные связи. Полезно сохранить результат как краткую «документацию» данных."
          },
          {
            h: "Инструменты визуализации",
            p: [
              "Модуль Pandas Visualization позволяет строить график прямо из DataFrame (.plot()). Matplotlib — основная низкоуровневая библиотека графики в Python; она управляет осями, цветами и подписями. Seaborn построен на Matplotlib и удобен для статистической визуализации.",
              "Эти инструменты смешиваются: график Seaborn можно доработать через Matplotlib, а результат Pandas .plot() — дополнительно настроить. Цель — не писать каждый график с нуля, а кратчайшим путём показать главную закономерность данных."
            ],
            table: {
              head: ["Вопрос", "График", "Что показывает"],
              rows: [
                ["Как распределён один признак?", "Гистограмма, box plot", "Центр, разброс, выбросы"],
                ["Связаны ли два признака?", "Scatter plot", "Направление, сила, нелинейность"],
                ["Сравнить категории", "Bar chart", "Разницу между группами"],
                ["Изменение во времени", "Line chart", "Тренд, сезонность"],
                ["Корреляция многих признаков", "Heatmap", "Матрицу связей"]
              ]
            },
            list: [
              "Начинайте с одной переменной, затем переходите к парам и группам.",
              "Подписи осей, единицы измерения и легенда — обязательная часть графика.",
              "Цветом показывайте только значимые различия; избегайте лишнего оформления."
            ],
            note: "В EDA важен не красивый график, а график, отвечающий на правильный вопрос. После каждого графика спрашивайте: «Что это значит?»"
          }
        ],
        visual: {
          title: "Процесс EDA",
          html: `
            <div class="flow" role="img" aria-label="Процесс EDA: DataFrame, очистка, глобальный и групповой анализ">
              <div class="flow-step"><span>01</span><b>DataFrame</b><small>Собрать все данные в одну таблицу</small></div>
              <div class="flow-step"><span>02</span><b>Очистка</b><small>Строка — объект, столбец — свойство</small></div>
              <div class="flow-step"><span>03</span><b>Global</b><small>Распределение, корреляция, агрегаты</small></div>
              <div class="flow-step"><span>04</span><b>Group</b><small>groupby и small multiples</small></div>
            </div>`,
          caption: "Каждый шаг опирается на предыдущий: выводы по неочищенной таблице ненадёжны."
        },
        code: {
          title: "Pandas и Seaborn: первый EDA",
          note: "Код проверяет структуру, типы и пропуски, считает групповую статистику и строит парные графики. Используется локальный файл penguins.csv.",
          source: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("penguins-files/penguins.csv")

print(df.shape)
print(df.dtypes)
print(df.isna().sum())
print(df.describe())
print(df["species"].value_counts())

df = df.dropna()
print(df.groupby("species")["body_mass_g"].mean())

sns.pairplot(df, hue="species")
plt.show()`
        },
        quiz: [
          {
            q: "В чём разница между datum и data?",
            options: ["Datum — одно измерение, data — набор измерений", "Datum — текст, data — изображение", "Разницы нет"],
            answer: 0,
            why: "Datum — единичное измерение, а data — набор таких измерений."
          },
          {
            q: "К какой группе относится бумажный архив, не превращённый в готовый файл?",
            options: ["Внутренний источник", "Внешний источник, требующий сбора", "Готовый внешний источник"],
            answer: 1,
            why: "Данные есть, но для их получения нужна дополнительная работа по сбору или обработке."
          },
          {
            q: "Как называется извлечение данных из HTML, если у сайта нет API?",
            options: ["Web scraping", "RSS", "Кэширование"],
            answer: 0,
            why: "Web scraping программно извлекает нужные данные со страницы HTML."
          },
          {
            q: "Какой график лучше показывает распределение одной переменной?",
            options: ["Scatter plot", "Гистограмма", "Line chart"],
            answer: 1,
            why: "Гистограмма показывает, как распределены значения, где центр и насколько велик разброс."
          },
          {
            q: "Что обычно делает groupby()?",
            options: ["Группирует данные и считает агрегат по каждой группе", "Удаляет все пропуски", "Превращает таблицу в изображение"],
            answer: 0,
            why: "groupby делит данные на группы, после чего применяются mean(), sum() и другие агрегаты."
          }
        ],
        summary: [
          "Datum — одно измерение, data — набор измерений; данные может дать любое измеримое явление.",
          "Источники бывают внутренними, готовыми внешними и внешними, требующими сбора.",
          "API — официальный интерфейс, RSS — лента обновлений, web scraping — извлечение данных из HTML.",
          "EDA: создать DataFrame → очистить → глобальный анализ → групповой анализ.",
          "Pandas .plot(), Matplotlib и Seaborn работают вместе; график должен отвечать на конкретный вопрос."
        ]
      },
      en: {
        minutes: 90,
        goals: [
          "Understand the difference between datum and data and how data becomes value.",
          "Distinguish internal and external sources, APIs, RSS and web scraping.",
          "Recognise numeric, boolean, string, categorical and ordinal data types.",
          "Master EDA from building a DataFrame to group analysis, plus visualisation tools."
        ],
        theory: [
          {
            h: "Data and datum",
            p: [
              "A datum is a single measurement: one fact or number recorded on a shared scale. For example, “today the air temperature is +25°C”. Data is a collection of such individual measurements, for example the list of temperatures over the last 10 days.",
              "Almost anything can become data: a heartbeat, the number of clicks on a site, a car's speed, the light level in a room. The condition is measuring the phenomenon on a scale that both the recorder and the reader understand."
            ],
            list: [
              "Datum is one measurement; data is a collection of measurements.",
              "Data consists of raw facts; information is processed data with meaning attached.",
              "Good data supports decisions; poor data multiplies errors."
            ],
            note: "“Garbage in, garbage out”: poor input produces poor output. That is why EDA starts with understanding the data itself."
          },
          {
            h: "Data sources and collection",
            p: [
              "Sources fall into three groups. Internal sources are operational, scientific or experimental data from the organisation's own database. Existing external sources are open datasets, stock exchange data and reviews available free or paid in a ready format.",
              "The third group is external sources that require collection: data held in a paper archive or published on a website but not available as a ready file. It is obtained through an API, RSS or web scraping."
            ],
            list: [
              "API — a service's official interface; it returns JSON or XML. Examples: Google Maps, Twitter API.",
              "RSS (Rich Site Summary) — an update feed for news and blogs; free and standard to read.",
              "Web scraping — programmatically extracting the needed text, price or table from HTML.",
              "A paper archive, a scanned document or an image can also be a data source."
            ],
            note: "When scraping, check the site's terms of use, robots.txt and copyright. Prefer the official API when one exists."
          },
          {
            h: "Data types and the EDA workflow",
            p: [
              "Simple (atomic) types are numeric (integers and floats), boolean (true/false) and string (text). Categorical (nominal) and ordinal features are also common: categorical values have no order (city, colour), while ordinal values have a direction (low, medium, high).",
              "EDA is the process of inspecting data carefully before giving it to a model. It reveals structure, patterns, errors and relationships between variables. The work has four steps: build a DataFrame, clean it, study global properties and compare group properties."
            ],
            table: {
              head: ["Step", "What happens", "Tool"],
              rows: [
                ["1. DataFrame", "Collect all data in one table", "pd.DataFrame, read_csv"],
                ["2. Cleaning", "Row = object, column = property, atomic values", "dropna, astype, rename"],
                ["3. Global", "Distribution, relationships, aggregates", "describe, hist, scatter"],
                ["4. Group", "Compare subsets", "groupby, small multiples"]
              ]
            },
            list: [
              "Each row should describe one object; each column should describe one property of that object.",
              "Numeric columns should use numeric dtypes; categorical columns are best stored as category.",
              "Checks: shape, dtypes, isna().sum(), duplicated().sum(), describe().",
              "Data leakage means information the model must not know gets into the features."
            ],
            note: "EDA is not tied to a specific model, so it helps reveal unexpected relationships. Keeping the result as short data documentation is useful."
          },
          {
            h: "Visualisation tools",
            p: [
              "The Pandas Visualization module builds a chart directly from a DataFrame (.plot()). Matplotlib is Python's main low-level plotting library; it controls axes, colours and labels. Seaborn is built on Matplotlib and is convenient for statistical visualisation.",
              "The tools mix: a Seaborn chart can be refined through Matplotlib, and a Pandas .plot() result can be adjusted further. The goal is not to write every chart from scratch but to show the main pattern in the data by the shortest route."
            ],
            table: {
              head: ["Question", "Chart", "What it shows"],
              rows: [
                ["How is one feature distributed?", "Histogram, box plot", "Centre, spread, outliers"],
                ["Are two features related?", "Scatter plot", "Direction, strength, non-linearity"],
                ["Compare categories", "Bar chart", "Differences between groups"],
                ["Change over time", "Line chart", "Trend, seasonality"],
                ["Correlation of many features", "Heatmap", "Correlation matrix"]
              ]
            },
            list: [
              "Start with one variable, then move to pairs and groups.",
              "Axis labels, units and a legend are a required part of a chart.",
              "Use colour only for meaningful differences and avoid decoration for its own sake."
            ],
            note: "In EDA the important chart is the one that answers the right question, not the prettiest one. After each chart ask: “What does this mean?”"
          }
        ],
        visual: {
          title: "The EDA workflow",
          html: `
            <div class="flow" role="img" aria-label="EDA workflow: DataFrame, cleaning, global and group analysis">
              <div class="flow-step"><span>01</span><b>DataFrame</b><small>Collect all data in one table</small></div>
              <div class="flow-step"><span>02</span><b>Cleaning</b><small>Row = object, column = property</small></div>
              <div class="flow-step"><span>03</span><b>Global</b><small>Distribution, correlation, aggregates</small></div>
              <div class="flow-step"><span>04</span><b>Group</b><small>groupby and small multiples</small></div>
            </div>`,
          caption: "Each step builds on the previous one: conclusions from an unclean table are unreliable."
        },
        code: {
          title: "Pandas and Seaborn: a first EDA",
          note: "The code checks structure, dtypes and missing values, computes group statistics and draws pairwise plots. It uses the local penguins.csv file.",
          source: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("penguins-files/penguins.csv")

print(df.shape)
print(df.dtypes)
print(df.isna().sum())
print(df.describe())
print(df["species"].value_counts())

df = df.dropna()
print(df.groupby("species")["body_mass_g"].mean())

sns.pairplot(df, hue="species")
plt.show()`
        },
        quiz: [
          {
            q: "What is the difference between datum and data?",
            options: ["Datum is one measurement; data is a set of measurements", "Datum is text; data is an image", "There is no difference"],
            answer: 0,
            why: "A datum is a single measurement, while data is a collection of such measurements."
          },
          {
            q: "Which group does a paper archive that is not a ready file belong to?",
            options: ["An internal source", "An external source requiring collection", "An existing external source"],
            answer: 1,
            why: "The data exists, but extra collection or processing work is needed to obtain it."
          },
          {
            q: "What is extracting data from HTML called when a site has no API?",
            options: ["Web scraping", "RSS", "Caching"],
            answer: 0,
            why: "Web scraping programmatically extracts the needed data from an HTML page."
          },
          {
            q: "Which chart best shows the distribution of one variable?",
            options: ["Scatter plot", "Histogram", "Line chart"],
            answer: 1,
            why: "A histogram shows how values are distributed, where the centre is and how wide the spread is."
          },
          {
            q: "What does groupby() usually do?",
            options: ["Groups data and computes an aggregate per group", "Removes all missing values", "Turns a table into an image"],
            answer: 0,
            why: "groupby splits data into groups, then mean(), sum() and other aggregates are applied."
          }
        ],
        summary: [
          "A datum is one measurement, data is a set of measurements; any measurable phenomenon can become data.",
          "Sources are internal, existing external, or external and requiring collection.",
          "API is an official interface, RSS an update feed, web scraping extracts data from HTML.",
          "EDA: build a DataFrame → clean → global analysis → group analysis.",
          "Pandas .plot(), Matplotlib and Seaborn work together; a chart must answer a specific question."
        ]
      }
    },
    4: {
      kk: {
        minutes: 100,
        goals: [
          "Деректерді алдын ала өңдеудің мақсаты мен алты кезеңін түсіну.",
          "Бос мәндерді, дубликаттарды және выбростарды дұрыс өңдеу.",
          "Категориялық белгілерді кодтап, сандық белгілерді масштабтау.",
          "Pipeline және ColumnTransformer арқылы data leakage-тен қорғану."
        ],
        theory: [
          {
            h: "Неге preprocessing маңызды?",
            p: [
              "Модель сапасының басым бөлігі алгоритмге емес, деректердің қаншалықты сауатты дайындалғанына байланысты. Шикі деректер — өңделмеген кен: одан пайдалы ақпарат алу үшін тазалау, толтыру және түрлендіру қажет.",
              "Preprocessing — шикі деректерді модель оқи алатын форматқа келтіру. Дұрыс өңдеу дәлдікті арттырады; сапасыз дерек ең күрделі алгоритмнің де нәтижесін нөлге түсіруі мүмкін."
            ],
            ordered: [
              "Exploration — құрылым, типтер және статистиканы түсіну.",
              "Quality Assessment — қате, жетіспеушілік және қайшылықтарды табу.",
              "Cleansing — дубликаттарды жою, шуды түзету.",
              "Labeling — мақсатты айнымалыны тағайындау.",
              "Imputation — бос мәндерді толтыру.",
              "Feature Engineering — пайдалы белгілерді таңдау және жаңа белгілер құру."
            ],
            table: {
              head: ["Тип", "Сипаттамасы", "Мысал"],
              rows: [
                ["Сандық үздіксіз", "Кез келген диапазондағы мән", "Баға, температура"],
                ["Сандық дискретті", "Тек бүтін мән", "Бөлме саны, студент саны"],
                ["Категориялық номинал", "Математикалық реті жоқ", "Аудан, түс, жыныс"],
                ["Категориялық реттік", "Логикалық реті бар", "Small < Medium < Large"]
              ]
            },
            note: "Пошта индексі сырттай санға ұқсағанымен, ол сандық белгі емес: онымен арифметика жүргізудің мағынасы жоқ."
          },
          {
            h: "Тазалау: бос мәндер, дубликаттар, выбростар",
            p: [
              "Бос мәндер датчик ақауынан, адам факторынан немесе ақпараттың жоқтығынан пайда болады. Жолды жай өшіру пайдалы ақпараттан айыруы мүмкін, сондықтан импутация қолданылады. SimpleImputer стратегиялары: mean (сандық), median (выбростарға төзімді), most_frequent (категориялық) және constant.",
              "KNNImputer ең ұқсас k көршінің мәніне сүйеніп толтырады: дәлірек болуы мүмкін, бірақ есептеу қымбат және выбростарға сезімтал. Дубликаттар қайталанатын жазбаларды бұрмалайды; оларды duplicated() арқылы тауып, drop_duplicates() арқылы жою керек."
            ],
            list: [
              "IQR = Q3 − Q1; төменгі шек Q1 − 1.5·IQR, жоғарғы шек Q3 + 1.5·IQR.",
              "Выбростарды жоюдың орнына шектеуге (capping) болады — дерек көлемі сақталады.",
              "Орташа мән выбростарға сезімтал, медиана тұрақтырақ.",
              "Дубликаттарды тек толық сәйкестік бойынша емес, бизнес-кілт бойынша да тексеру керек."
            ],
            note: "Выбростар әрқашан қате емес: алаяқтық, сирек ауру немесе нағыз рекордтық мән де болуы мүмкін. Оларды жою алдында себебін түсіну керек."
          },
          {
            h: "Кодтау және масштабтау",
            p: [
              "ML модельдері мәтінмен емес, сандармен жұмыс істейді. OrdinalEncoder ретті санаттарды (төмен/орта/жоғары) санға айналдырады, бірақ жасанды «3 > 1» қатынасын енгізуі мүмкін. OneHotEncoder реті жоқ санаттардың әрқайсысына жеке 0/1 бағанын жасайды.",
              "Масштабтау әртүрлі диапазондағы белгілерді теңестіреді: әйтпесе жалақы (0–2 000 000) жасқа (0–100) қарағанда басым болып кетеді. StandardScaler орташаны 0, стандартты ауытқуды 1 етеді; MinMaxScaler [0,1] диапазонына сығады; RobustScaler медиана мен IQR қолданып, выбростарға төзімді болады."
            ],
            table: {
              head: ["Скалер", "Нәтиже", "Выбростарға"],
              rows: [
                ["StandardScaler", "Орташа 0, ауытқу 1", "Орташа сезімтал"],
                ["MinMaxScaler", "[0, 1] диапазоны", "Жоғары сезімтал"],
                ["RobustScaler", "Медиана және IQR", "Төзімді"]
              ]
            },
            list: [
              "StandardScaler — гаусс үлестірімге жақын деректер мен сызықтық модельдер, SVM, PCA үшін.",
              "MinMaxScaler — үлестірімі белгісіз деректер мен KNN, нейрондық желілер үшін.",
              "RobustScaler — выбростар көп болғанда.",
              "Кодтау мен масштабтауды тек train жиынында fit ету керек."
            ],
            note: "OneHotEncoder параметрі handle_unknown='ignore' тестте жаңа санат кездессе, қате бермей оны нөлдермен кодтайды."
          },
          {
            h: "Pipeline, data leakage және feature engineering",
            p: [
              "Трансформациялар көбейген сайын кодты қолмен басқару қиындайды және data leakage қаупі артады. Pipeline қадамдарды ретімен байланыстырып, fit тек train-де, transform test-те автоматты түрде орындалуын қамтамасыз етеді.",
              "ColumnTransformer сандық және категориялық бағандарға бөлек тізбек қолдануға мүмкіндік береді: сандықтарға SimpleImputer + StandardScaler, категориялықтарға SimpleImputer + OneHotEncoder. Соңында бәрі бір матрицаға бірігіп, модельге беріледі."
            ],
            list: [
              "Data leakage — тест жиынының статистикасының оқытуға кездейсоқ кіруі.",
              "Ереже: fit()/fit_transform() тек train-де, transform() тек test-те.",
              "Feature engineering: derived (жас = жыл айырмасы), interaction (x1·x2), binning, polynomial.",
              "Салалық білім (domain expertise) көбіне автоматты құралдардан маңыздырақ."
            ],
            note: "Pipeline — өндірістік кодтың стандарты: ол қайталанатын preprocessing-ті бір объектіге жинап, қатені азайтады."
          }
        ],
        visual: {
          title: "Preprocessing ағыны",
          html: `
            <div class="flow" role="img" aria-label="Preprocessing ағыны: зерттеу, тазалау, түрлендіру және модель">
              <div class="flow-step"><span>01</span><b>Зерттеу</b><small>Типтер, статистика, сапа</small></div>
              <div class="flow-step"><span>02</span><b>Тазалау</b><small>Бос мән, дубликат, выброс</small></div>
              <div class="flow-step"><span>03</span><b>Түрлендіру</b><small>Кодтау және масштабтау</small></div>
              <div class="flow-step"><span>04</span><b>Модель</b><small>Pipeline және бағалау</small></div>
            </div>`,
          caption: "Бұл қадамдарды қолмен емес, Pipeline ішінде орындау керек: сонда fit тек train деректерінде қалады."
        },
        code: {
          title: "ColumnTransformer және Pipeline",
          note: "Сандық және категориялық бағандарға бөлек өңдеу қолданылады, содан кейін бәрі бір модельге бірігеді. Бос мәндер және жаңа санаттар қатесіз өңделеді.",
          source: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["species"])

X = df.drop(columns=["species"])
y = df["species"]

num = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
cat = ["island", "sex"]

prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("scale", StandardScaler())
    ]), num),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(handle_unknown="ignore"))
    ]), cat)
])

model = Pipeline([
    ("prep", prep),
    ("clf", RandomForestClassifier(random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "Пошта индексі қандай белгі типіне жатады?",
            options: ["Сандық үздіксіз", "Категориялық номинал", "Категориялық реттік"],
            answer: 1,
            why: "Индекс санға ұқсағанымен, онымен арифметика жүргізілмейді; ол санаттық белгі."
          },
          {
            q: "Выбростар көп болғанда қай scaler қолайлы?",
            options: ["MinMaxScaler", "StandardScaler", "RobustScaler"],
            answer: 2,
            why: "RobustScaler медиана мен IQR қолданады, сондықтан шеткі мәндерге төзімді."
          },
          {
            q: "Реті жоқ қала атауларын қалай кодтаған дұрыс?",
            options: ["OrdinalEncoder", "OneHotEncoder", "StandardScaler"],
            answer: 1,
            why: "Қалалар арасында табиғи рет жоқ, сондықтан әр санатқа жеке 0/1 бағаны жасалады."
          },
          {
            q: "Pipeline-ның басты пайдасы неде?",
            options: ["Data leakage-тен қорғайды және қадамдарды реттейді", "Деректерді автоматты жинайды", "Модельдің дәлдігін 100% етеді"],
            answer: 0,
            why: "Pipeline fit/transform тәртібін сақтап, preprocessing-ті қайталанатын және қауіпсіз етеді."
          },
          {
            q: "IQR әдісінде жоғарғы шек қалай есептеледі?",
            options: ["Q1 − 1.5·IQR", "Q3 + 1.5·IQR", "Q3 − Q1"],
            answer: 1,
            why: "Жоғарғы шек Q3 + 1.5·IQR, төменгі шек Q1 − 1.5·IQR."
          }
        ],
        summary: [
          "Preprocessing алты кезеңнен тұрады: зерттеу, сапа, тазалау, белгілеу, толтыру, feature engineering.",
          "Бос мәндерді mean, median, most_frequent немесе KNN арқылы толтыруға болады; выбростарды IQR анықтайды.",
          "OrdinalEncoder ретті, OneHotEncoder реті жоқ санаттарға қолданылады.",
          "StandardScaler, MinMaxScaler және RobustScaler белгілерді әртүрлі жағдайда теңестіреді.",
          "Pipeline мен ColumnTransformer data leakage-тен қорғайды және өндірістік кодтың стандарты болып саналады."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Понять цель предобработки данных и её шесть этапов.",
          "Правильно обрабатывать пропуски, дубликаты и выбросы.",
          "Кодировать категориальные признаки и масштабировать числовые.",
          "Защищаться от data leakage с помощью Pipeline и ColumnTransformer."
        ],
        theory: [
          {
            h: "Почему preprocessing важен?",
            p: [
              "Качество модели в основном зависит не от алгоритма, а от того, насколько грамотно подготовлены данные. Сырые данные — это необработанная руда: чтобы извлечь пользу, нужны очистка, заполнение и преобразование.",
              "Preprocessing — приведение сырых данных к формату, который модель может изучать. Правильная обработка заметно повышает точность; плохие данные сводят на нет работу даже самого сложного алгоритма."
            ],
            ordered: [
              "Exploration — понять структуру, типы и статистику.",
              "Quality Assessment — найти ошибки, пропуски и логические противоречия.",
              "Cleansing — удалить дубликаты и исправить шум.",
              "Labeling — назначить целевую переменную.",
              "Imputation — заполнить пропуски.",
              "Feature Engineering — выбрать полезные признаки и создать новые."
            ],
            table: {
              head: ["Тип", "Описание", "Пример"],
              rows: [
                ["Числовой непрерывный", "Любое значение в диапазоне", "Цена, температура"],
                ["Числовой дискретный", "Только целые значения", "Число комнат, студентов"],
                ["Категориальный номинальный", "Нет математического порядка", "Район, цвет, пол"],
                ["Категориальный порядковый", "Есть логический порядок", "Small < Medium < Large"]
              ]
            },
            note: "Почтовый индекс похож на число, но не является числовым признаком: арифметика с ним не имеет смысла."
          },
          {
            h: "Очистка: пропуски, дубликаты, выбросы",
            p: [
              "Пропуски появляются из-за сбоя датчика, человеческого фактора или отсутствия информации. Простое удаление строки может лишить полезных данных, поэтому применяют импутацию. Стратегии SimpleImputer: mean (числовые), median (устойчива к выбросам), most_frequent (категориальные) и constant.",
              "KNNImputer заполняет значение по наиболее похожим k соседям: может быть точнее, но требует больше вычислений и чувствителен к выбросам. Дубликаты искажают записи; их находят через duplicated(), а удаляют через drop_duplicates()."
            ],
            list: [
              "IQR = Q3 − Q1; нижняя граница Q1 − 1.5·IQR, верхняя Q3 + 1.5·IQR.",
              "Вместо удаления выбросы можно ограничить (capping) — объём данных сохраняется.",
              "Среднее чувствительно к выбросам, медиана устойчивее.",
              "Дубликаты проверяют не только по полному совпадению, но и по бизнес-ключу."
            ],
            note: "Выброс — не всегда ошибка: это может быть мошенничество, редкая болезнь или настоящий рекорд. Прежде чем удалять, поймите причину."
          },
          {
            h: "Кодирование и масштабирование",
            p: [
              "ML-модели работают не с текстом, а с числами. OrdinalEncoder превращает упорядоченные категории (низкий/средний/высокий) в числа, но может внести искусственное отношение «3 > 1». OneHotEncoder создаёт для каждой категории без порядка отдельный столбец 0/1.",
              "Масштабирование выравнивает признаки с разными диапазонами: иначе зарплата (0–2 000 000) будет доминировать над возрастом (0–100). StandardScaler делает среднее 0 и стандартное отклонение 1; MinMaxScaler сжимает в [0,1]; RobustScaler использует медиану и IQR и устойчив к выбросам."
            ],
            table: {
              head: ["Скалер", "Результат", "К выбросам"],
              rows: [
                ["StandardScaler", "Среднее 0, отклонение 1", "Средне чувствителен"],
                ["MinMaxScaler", "Диапазон [0, 1]", "Сильно чувствителен"],
                ["RobustScaler", "Медиана и IQR", "Устойчив"]
              ]
            },
            list: [
              "StandardScaler — для данных, близких к гауссову распределению, линейных моделей, SVM, PCA.",
              "MinMaxScaler — для данных с неизвестным распределением, KNN и нейронных сетей.",
              "RobustScaler — когда выбросов много.",
              "Кодирование и масштабирование обучают только на train."
            ],
            note: "Параметр handle_unknown='ignore' у OneHotEncoder позволяет не падать, если в тесте встретилась новая категория: она кодируется нулями."
          },
          {
            h: "Pipeline, data leakage и feature engineering",
            p: [
              "Чем больше преобразований, тем сложнее управлять кодом вручную и тем выше риск data leakage. Pipeline связывает шаги по порядку и гарантирует, что fit выполняется только на train, а transform — на test.",
              "ColumnTransformer позволяет применять отдельные цепочки к числовым и категориальным столбцам: для числовых SimpleImputer + StandardScaler, для категориальных SimpleImputer + OneHotEncoder. В конце всё объединяется в одну матрицу для модели."
            ],
            list: [
              "Data leakage — случайное попадание статистики тестового набора в обучение.",
              "Правило: fit()/fit_transform() только на train, transform() только на test.",
              "Feature engineering: derived (возраст = разница лет), interaction (x1·x2), binning, polynomial.",
              "Знание предметной области часто важнее автоматических инструментов."
            ],
            note: "Pipeline — стандарт production-кода: он собирает повторяющуюся предобработку в один объект и снижает число ошибок."
          }
        ],
        visual: {
          title: "Поток preprocessing",
          html: `
            <div class="flow" role="img" aria-label="Поток preprocessing: исследование, очистка, преобразование и модель">
              <div class="flow-step"><span>01</span><b>Исследование</b><small>Типы, статистика, качество</small></div>
              <div class="flow-step"><span>02</span><b>Очистка</b><small>Пропуски, дубликаты, выбросы</small></div>
              <div class="flow-step"><span>03</span><b>Преобразование</b><small>Кодирование и масштабирование</small></div>
              <div class="flow-step"><span>04</span><b>Модель</b><small>Pipeline и оценка</small></div>
            </div>`,
          caption: "Эти шаги нужно выполнять внутри Pipeline, а не вручную: тогда fit остаётся только на train."
        },
        code: {
          title: "ColumnTransformer и Pipeline",
          note: "Числовые и категориальные столбцы обрабатываются отдельно, затем всё объединяется в одну модель. Пропуски и новые категории обрабатываются безопасно.",
          source: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["species"])

X = df.drop(columns=["species"])
y = df["species"]

num = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
cat = ["island", "sex"]

prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("scale", StandardScaler())
    ]), num),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(handle_unknown="ignore"))
    ]), cat)
])

model = Pipeline([
    ("prep", prep),
    ("clf", RandomForestClassifier(random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "К какому типу относится почтовый индекс?",
            options: ["Числовой непрерывный", "Категориальный номинальный", "Категориальный порядковый"],
            answer: 1,
            why: "Индекс похож на число, но арифметика с ним не имеет смысла; это категориальный признак."
          },
          {
            q: "Какой scaler подходит при большом числе выбросов?",
            options: ["MinMaxScaler", "StandardScaler", "RobustScaler"],
            answer: 2,
            why: "RobustScaler использует медиану и IQR, поэтому устойчив к крайним значениям."
          },
          {
            q: "Как правильно кодировать названия городов без порядка?",
            options: ["OrdinalEncoder", "OneHotEncoder", "StandardScaler"],
            answer: 1,
            why: "У городов нет естественного порядка, поэтому для каждой категории создаётся отдельный столбец 0/1."
          },
          {
            q: "В чём главная польза Pipeline?",
            options: ["Защищает от data leakage и упорядочивает шаги", "Автоматически собирает данные", "Делает точность модели 100%"],
            answer: 0,
            why: "Pipeline соблюдает порядок fit/transform и делает preprocessing повторяемым и безопасным."
          },
          {
            q: "Как вычисляется верхняя граница в методе IQR?",
            options: ["Q1 − 1.5·IQR", "Q3 + 1.5·IQR", "Q3 − Q1"],
            answer: 1,
            why: "Верхняя граница — Q3 + 1.5·IQR, нижняя — Q1 − 1.5·IQR."
          }
        ],
        summary: [
          "Preprocessing состоит из шести этапов: исследование, качество, очистка, разметка, заполнение, feature engineering.",
          "Пропуски заполняют mean, median, most_frequent или KNN; выбросы находят через IQR.",
          "OrdinalEncoder — для упорядоченных категорий, OneHotEncoder — для категорий без порядка.",
          "StandardScaler, MinMaxScaler и RobustScaler выравнивают признаки в разных условиях.",
          "Pipeline и ColumnTransformer защищают от data leakage и являются стандартом production-кода."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Understand the purpose of preprocessing and its six stages.",
          "Handle missing values, duplicates and outliers correctly.",
          "Encode categorical features and scale numeric features.",
          "Protect against data leakage with Pipeline and ColumnTransformer."
        ],
        theory: [
          {
            h: "Why preprocessing matters",
            p: [
              "Model quality depends mostly not on the algorithm but on how carefully the data was prepared. Raw data is unrefined ore: cleaning, imputation and transformation are needed to extract value.",
              "Preprocessing means bringing raw data into a format the model can learn from. Good preparation clearly improves accuracy; poor data neutralises even the most sophisticated algorithm."
            ],
            ordered: [
              "Exploration — understand structure, types and statistics.",
              "Quality Assessment — find errors, gaps and logical contradictions.",
              "Cleansing — remove duplicates and fix noise.",
              "Labeling — assign the target variable.",
              "Imputation — fill missing values.",
              "Feature Engineering — select useful features and create new ones."
            ],
            table: {
              head: ["Type", "Description", "Example"],
              rows: [
                ["Continuous numeric", "Any value in a range", "Price, temperature"],
                ["Discrete numeric", "Integer values only", "Room count, student count"],
                ["Categorical nominal", "No mathematical order", "Neighbourhood, colour, sex"],
                ["Categorical ordinal", "Has a logical order", "Small < Medium < Large"]
              ]
            },
            note: "A postcode looks like a number but is not a numeric feature: arithmetic on it is meaningless."
          },
          {
            h: "Cleaning: missing values, duplicates, outliers",
            p: [
              "Missing values come from sensor failure, human error or simply absent information. Dropping the row can lose useful data, so imputation is used. SimpleImputer strategies: mean (numeric), median (robust to outliers), most_frequent (categorical) and constant.",
              "KNNImputer fills a value from the most similar k neighbours: it can be more accurate, but it is computationally expensive and sensitive to outliers. Duplicates distort records; find them with duplicated() and remove them with drop_duplicates()."
            ],
            list: [
              "IQR = Q3 − Q1; lower bound Q1 − 1.5·IQR, upper bound Q3 + 1.5·IQR.",
              "Instead of deleting outliers, cap them at the nearest allowed bound — the data volume is preserved.",
              "The mean is sensitive to outliers; the median is more robust.",
              "Check duplicates by full match and by business key."
            ],
            note: "An outlier is not always an error: it may be fraud, a rare disease or a genuine record. Understand the cause before removing it."
          },
          {
            h: "Encoding and scaling",
            p: [
              "ML models work with numbers, not text. OrdinalEncoder turns ordered categories (low/medium/high) into numbers, but it can introduce an artificial “3 > 1” relation. OneHotEncoder creates a separate 0/1 column for every category without an order.",
              "Scaling levels features with different ranges: otherwise salary (0–2,000,000) dominates age (0–100). StandardScaler makes the mean 0 and the standard deviation 1; MinMaxScaler compresses to [0,1]; RobustScaler uses the median and IQR and is resistant to outliers."
            ],
            table: {
              head: ["Scaler", "Result", "Outlier sensitivity"],
              rows: [
                ["StandardScaler", "Mean 0, deviation 1", "Moderate"],
                ["MinMaxScaler", "Range [0, 1]", "High"],
                ["RobustScaler", "Median and IQR", "Low"]
              ]
            },
            list: [
              "StandardScaler — for near-Gaussian data, linear models, SVM and PCA.",
              "MinMaxScaler — for unknown distributions, KNN and neural networks.",
              "RobustScaler — when there are many outliers.",
              "Fit encoding and scaling on the train set only."
            ],
            note: "OneHotEncoder with handle_unknown='ignore' does not fail when a new category appears in test data; it encodes it as zeros."
          },
          {
            h: "Pipeline, data leakage and feature engineering",
            p: [
              "As transformations multiply, manual code becomes harder to manage and the risk of data leakage grows. A Pipeline chains the steps in order and guarantees that fit runs only on train while transform runs on test.",
              "ColumnTransformer lets you apply separate chains to numeric and categorical columns: SimpleImputer + StandardScaler for numeric, SimpleImputer + OneHotEncoder for categorical. Everything is then combined into one matrix for the model."
            ],
            list: [
              "Data leakage is test-set statistics accidentally entering training.",
              "Rule: fit()/fit_transform() on train only; transform() on test only.",
              "Feature engineering: derived (age = year difference), interaction (x1·x2), binning, polynomial.",
              "Domain expertise often matters more than automatic tooling."
            ],
            note: "A Pipeline is the production-code standard: it packages repeated preprocessing into one object and reduces mistakes."
          }
        ],
        visual: {
          title: "The preprocessing pipeline",
          html: `
            <div class="flow" role="img" aria-label="Preprocessing pipeline: explore, clean, transform and model">
              <div class="flow-step"><span>01</span><b>Explore</b><small>Types, statistics, quality</small></div>
              <div class="flow-step"><span>02</span><b>Clean</b><small>Missing values, duplicates, outliers</small></div>
              <div class="flow-step"><span>03</span><b>Transform</b><small>Encoding and scaling</small></div>
              <div class="flow-step"><span>04</span><b>Model</b><small>Pipeline and evaluation</small></div>
            </div>`,
          caption: "Run these steps inside a Pipeline rather than by hand: that keeps fit on the training data only."
        },
        code: {
          title: "ColumnTransformer and Pipeline",
          note: "Numeric and categorical columns are processed separately, then combined into one model. Missing values and new categories are handled safely.",
          source: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["species"])

X = df.drop(columns=["species"])
y = df["species"]

num = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
cat = ["island", "sex"]

prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("scale", StandardScaler())
    ]), num),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(handle_unknown="ignore"))
    ]), cat)
])

model = Pipeline([
    ("prep", prep),
    ("clf", RandomForestClassifier(random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model.fit(X_train, y_train)
print("Accuracy:", round(model.score(X_test, y_test), 3))`
        },
        quiz: [
          {
            q: "Which feature type is a postcode?",
            options: ["Continuous numeric", "Categorical nominal", "Categorical ordinal"],
            answer: 1,
            why: "A postcode looks numeric, but arithmetic on it is meaningless; it is categorical."
          },
          {
            q: "Which scaler is suitable when there are many outliers?",
            options: ["MinMaxScaler", "StandardScaler", "RobustScaler"],
            answer: 2,
            why: "RobustScaler uses the median and IQR, so it is resistant to extreme values."
          },
          {
            q: "How should city names without an order be encoded?",
            options: ["OrdinalEncoder", "OneHotEncoder", "StandardScaler"],
            answer: 1,
            why: "Cities have no natural order, so each category gets its own 0/1 column."
          },
          {
            q: "What is the main benefit of a Pipeline?",
            options: ["It prevents data leakage and orders the steps", "It collects data automatically", "It makes model accuracy 100%"],
            answer: 0,
            why: "A Pipeline enforces the fit/transform order and makes preprocessing repeatable and safe."
          },
          {
            q: "How is the upper bound calculated in the IQR method?",
            options: ["Q1 − 1.5·IQR", "Q3 + 1.5·IQR", "Q3 − Q1"],
            answer: 1,
            why: "The upper bound is Q3 + 1.5·IQR; the lower bound is Q1 − 1.5·IQR."
          }
        ],
        summary: [
          "Preprocessing has six stages: exploration, quality, cleansing, labelling, imputation and feature engineering.",
          "Fill missing values with mean, median, most_frequent or KNN; find outliers with IQR.",
          "OrdinalEncoder is for ordered categories, OneHotEncoder for categories without order.",
          "StandardScaler, MinMaxScaler and RobustScaler match different data conditions.",
          "Pipeline and ColumnTransformer prevent data leakage and are the production standard."
        ]
      }
    },
    5: {
      kk: {
        minutes: 100,
        goals: [
          "Регрессия есебін жіктеу және ранжирлеуден ажырату.",
          "Сызықтық регрессия формуласын және коэффициенттерді түсіндіру.",
          "MSE, RMSE, MAE және R² метрикаларын дұрыс таңдау.",
          "Градиенттік түсу мен қалыпты теңдеуді салыстырып, болжамдарды тексеру."
        ],
        theory: [
          {
            h: "Регрессия деген не?",
            p: [
              "Регрессия — мақсаттың сандық мәнін болжау. Үй бағасы, температура, жалақы немесе сату көлемі — бұлардың барлығы регрессия есептері. Модель белгілер мен мақсат арасындағы заңдылықты тауып, жаңа жағдай үшін нақты санды қайтарады.",
              "Жіктеу класты (спам/спам емес), ранжирлеу ретті (қай нәтиже бірінші тұруы керек) болжайды. Регрессияда жауап «қай класс?» емес, «қанша?» деген сұраққа беріледі."
            ],
            list: [
              "Жіктеу — объектінің қай топқа жататынын анықтайды.",
              "Регрессия — үздіксіз санды болжайды.",
              "Ранжирлеу — объектілерді маңыздылығы бойынша реттейді.",
              "Train моделі оқиды, validation баптайды, test соңғы әділ баға береді."
            ],
            note: "Тест жиынын соңына дейін ұстаңыз: оны модельді таңдауға немесе параметрлерді баптауға қолдансаңыз, баға шынайы болмайды."
          },
          {
            h: "Сызықтық регрессия моделі",
            p: [
              "Бір белгі үшін модель y = β₀ + β₁x + ε түрінде жазылады. Көп белгі болса, y = β₀ + β₁x₁ + … + βₙxₙ + ε. Мұндағы β₀ — бос мүше, βᵢ — салмақтар, ε — модель ескермеген кездейсоқ қате.",
              "Коэффициент «басқа белгілер өзгеріссіз қалғанда, xᵢ бір бірлікке артса, y орта есеппен қаншаға өзгереді» дегенді білдіреді. Сызықтық деп модель параметрлері бойынша сызықты болуын айтады: x² немесе log(x) қосуға болады, бірақ коэффициенттер бірінші дәрежеде қалады."
            ],
            list: [
              "β₀ — барлық x = 0 болғандағы теориялық мән; көбіне жеке түсіндірілмейді.",
              "Оң коэффициент — белгі артқанда нәтиже өседі, теріс — төмендейді.",
              "Бинарлық белгі (pool = 0/1) екі топтың орташа айырмасын көрсетеді.",
              "Өзара әрекеттесу мүшесі (x₁·x₂) бір белгінің әсері екіншісіне тәуелді екенін білдіреді."
            ],
            note: "Коэффициент байланысты көрсетеді, бірақ себептілікті дәлелдемейді. «Бассейн бағаны қымбаттатты» деп айтуға әлі ерте."
          },
          {
            h: "Шығын функциялары және метрикалар",
            p: [
              "Модель сапасы қалдықтармен өлшенеді: әр нақты мән мен болжамның айырмасы. MSE = (1/n) Σ(yᵢ − ŷᵢ)². Квадраттау оң және теріс қателердің бірін-бірі жоймауын қамтамасыз етеді және үлкен қателерді қаттырақ жазалайды.",
              "R² = 1 − SS_қалдық / SS_жалпы модель мақсаттағы өзгерістің қанша бөлігін түсіндіретінін көрсетеді. R² = 1 — толық сәйкестік, 0 — орташа мән деңгейі, теріс мән — орташа мәннен де нашар."
            ],
            table: {
              head: ["Метрика", "Мағынасы", "Өлшем бірлігі", "Ерекшелігі"],
              rows: [
                ["MAE", "Орташа абсолюттік қате", "Мақсатпен бірдей", "Шеткі мәндерге төзімді"],
                ["MSE", "Орташа квадраттық қате", "Квадратталған", "Үлкен қатені қатты жазалайды"],
                ["RMSE", "MSE-нің түбірі", "Мақсатпен бірдей", "Үлкен қатеге сезімтал"],
                ["R²", "Түсіндірілген дисперсия үлесі", "Өлшемсіз", "1-ге жақын болғаны жақсы"]
              ]
            },
            note: "Үлкен қате компанияға қымбат болса, MSE/RMSE таңдаңыз. «Орта есеппен қаншаға қателестік?» деген түсінікті жауап керек болса, MAE қолайлы."
          },
          {
            h: "Коэффициенттерді табу және болжамдар",
            p: [
              "Коэффициенттерді табудың екі жолы бар. Градиенттік түсу қатені біртіндеп азайтып, параметрлерді итерация сайын жаңартады. Қалыпты теңдеу (Normal Equation) RSS-ті минимизациялайтын шешімді бір формуламен береді: β = (XᵀX)⁻¹Xᵀy.",
              "Сызықтық регрессияның негізгі болжамдары: сызықтылық, қателердің тәуелсіздігі, гомоскедастикалылық, қателердің қалыпты таралуы және деректердің репрезентативтілігі. Бұзылса, белгі қосу, түрлендіру, регуляризация немесе күрделірек модель қолданылады."
            ],
            list: [
              "Градиенттік түсу — үлкен деректерге жарамды, масштабтауды талап етеді.",
              "Қалыпты теңдеу — шағын/орташа деректерге ыңғайлы, үлкен матрицада қымбат.",
              "p-мәні, t-тест және F-тест коэффициенттердің маңыздылығын тексереді.",
              "Полиномиальды регрессия қисық байланысты, логистикалық регрессия класты болжайды."
            ],
            note: "Сызықтық регрессия санды болжайды; логистикалық регрессия класс ықтималдығын береді. Атаулары ұқсас болғанымен, есептері әртүрлі."
          }
        ],
        visual: {
          title: "Регрессия жұмыс ағыны",
          html: `
            <div class="flow" role="img" aria-label="Регрессия ағыны: деректер, модель, шығын және бағалау">
              <div class="flow-step"><span>01</span><b>Деректер</b><small>Белгілер және мақсат</small></div>
              <div class="flow-step"><span>02</span><b>Модель</b><small>y = β₀ + β₁x₁ + …</small></div>
              <div class="flow-step"><span>03</span><b>Шығын</b><small>MSE-ті минимизациялау</small></div>
              <div class="flow-step"><span>04</span><b>Бағалау</b><small>MAE, RMSE, R²</small></div>
            </div>`,
          caption: "Оқыту шығынды азайтады, ал бағалау модельдің жаңа деректерде қаншалықты дұрыс екенін көрсетеді."
        },
        code: {
          title: "Сызықтық регрессия және метрикалар",
          note: "Пингвиннің дене салмағы қанат ұзындығы мен тұмсық ұзындығы арқылы болжанады. MAE, RMSE және R² тест жиынында есептеледі.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["body_mass_g", "flipper_length_mm", "bill_length_mm"])

X = df[["flipper_length_mm", "bill_length_mm"]]
y = df["body_mass_g"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coef:", model.coef_.round(2))
print("intercept:", round(model.intercept_, 1))
print("MAE:", round(mean_absolute_error(y_test, pred), 1))
print("RMSE:", round(mean_squared_error(y_test, pred) ** 0.5, 1))
print("R2:", round(r2_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "Қандай есепте модель сандық мәнді болжайды?",
            options: ["Жіктеу", "Регрессия", "Ранжирлеу"],
            answer: 1,
            why: "Регрессия үй бағасы, температура сияқты үздіксіз санды болжайды."
          },
          {
            q: "R² = 1 нені білдіреді?",
            options: ["Модель ешнәрсе түсіндірмейді", "Модель деректерді толық түсіндіреді", "Модель орташа мәннен нашар"],
            answer: 1,
            why: "R² = 1 болса, қалдықтар нөлге тең және модель мақсаттағы өзгерісті толық түсіндіреді."
          },
          {
            q: "Қай метрика үлкен қателерді қаттырақ жазалайды?",
            options: ["MAE", "MSE", "R²"],
            answer: 1,
            why: "MSE қатені квадраттайды, сондықтан үлкен ауытқуларға әлдеқайда сезімтал."
          },
          {
            q: "Бөлме саны коэффициенті 2,5 болса, оны қалай түсіндіреміз?",
            options: ["Бөлме саны 1-ге артса, баға орта есеппен 2,5 бірлікке өседі", "Үй бағасы 2,5 есе өседі", "Бөлме саны бағаға әсер етпейді"],
            answer: 0,
            why: "Басқа белгілер өзгеріссіз болғанда, коэффициент бір бірлік өзгеріске сәйкес орташа өзгерісті көрсетеді."
          },
          {
            q: "Тест жиыны қашан қолданылады?",
            options: ["Модельді баптау кезінде", "Соңғы әділ бағалау үшін", "Белгілерді таңдау үшін"],
            answer: 1,
            why: "Тест жиыны соңғы бағалауға арналған; оны баптауға қолдану бағаны бұрмалайды."
          }
        ],
        summary: [
          "Регрессия сандық мәнді болжайды, жіктеу класты, ранжирлеу ретті анықтайды.",
          "Сызықтық модель y = β₀ + β₁x₁ + … + ε түрінде жазылады; коэффициенттер байланысты түсіндіреді.",
          "MSE үлкен қателерді жазалайды, RMSE бірлікті қайтарады, MAE түсінікті, R² дисперсия үлесін көрсетеді.",
          "Коэффициенттер градиенттік түсу немесе қалыпты теңдеу арқылы табылады.",
          "Сызықтылық, тәуелсіздік және гомоскедастикалылық болжамдарын тексеру керек."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Отличать регрессию от классификации и ранжирования.",
          "Понимать формулу линейной регрессии и интерпретацию коэффициентов.",
          "Правильно выбирать метрики MSE, RMSE, MAE и R².",
          "Сравнивать градиентный спуск и нормальное уравнение, проверять допущения."
        ],
        theory: [
          {
            h: "Что такое регрессия?",
            p: [
              "Регрессия предсказывает числовое значение цели. Цена дома, температура, зарплата или объём продаж — всё это задачи регрессии. Модель находит закономерность между признаками и целью и возвращает конкретное число для новой ситуации.",
              "Классификация предсказывает класс (спам/не спам), ранжирование — порядок (какой результат должен быть первым). В регрессии ответ на вопрос «сколько?», а не «какой класс?»."
            ],
            list: [
              "Классификация определяет, к какой группе относится объект.",
              "Регрессия предсказывает непрерывное число.",
              "Ранжирование упорядочивает объекты по важности.",
              "Train обучает модель, validation настраивает, test даёт финальную честную оценку."
            ],
            note: "Держите тестовый набор до самого конца: если использовать его для выбора модели или настройки, оценка перестанет быть честной."
          },
          {
            h: "Модель линейной регрессии",
            p: [
              "Для одного признака модель записывается как y = β₀ + β₁x + ε. Для нескольких признаков: y = β₀ + β₁x₁ + … + βₙxₙ + ε. Здесь β₀ — свободный член, βᵢ — веса, ε — случайная ошибка, которую модель не учитывает.",
              "Коэффициент означает: «при неизменных остальных признаках увеличение xᵢ на единицу меняет y в среднем на βᵢ». Линейность здесь по параметрам, а не по признакам: можно добавить x² или log(x), но коэффициенты остаются в первой степени."
            ],
            list: [
              "β₀ — теоретическое значение при всех x = 0; часто отдельно не интерпретируется.",
              "Положительный коэффициент — признак увеличивает результат, отрицательный — уменьшает.",
              "Бинарный признак (pool = 0/1) показывает среднюю разницу между двумя группами.",
              "Член взаимодействия (x₁·x₂) означает, что эффект одного признака зависит от другого."
            ],
            note: "Коэффициент показывает связь, но не доказывает причинность. Говорить «бассейн повысил цену» преждевременно."
          },
          {
            h: "Функции потерь и метрики",
            p: [
              "Качество модели измеряется остатками: разницей между фактическим значением и прогнозом. MSE = (1/n) Σ(yᵢ − ŷᵢ)². Возведение в квадрат не даёт положительным и отрицательным ошибкам взаимно уничтожиться и сильнее наказывает большие ошибки.",
              "R² = 1 − SS_ост / SS_общ показывает, какую долю изменчивости цели объясняет модель. R² = 1 — полное соответствие, 0 — уровень среднего, отрицательное значение — хуже среднего."
            ],
            table: {
              head: ["Метрика", "Смысл", "Единица", "Особенность"],
              rows: [
                ["MAE", "Средняя абсолютная ошибка", "Как у цели", "Устойчива к выбросам"],
                ["MSE", "Средняя квадратичная ошибка", "Квадрат единицы", "Сильно наказывает большие ошибки"],
                ["RMSE", "Корень MSE", "Как у цели", "Чувствительна к большим ошибкам"],
                ["R²", "Доля объяснённой дисперсии", "Безразмерная", "Чем ближе к 1, тем лучше"]
              ]
            },
            note: "Если большая ошибка дорого стоит бизнесу, выбирайте MSE/RMSE. Если нужен понятный ответ «на сколько в среднем ошибаемся?», подойдёт MAE."
          },
          {
            h: "Как найти коэффициенты и какие есть допущения",
            p: [
              "Есть два способа найти коэффициенты. Градиентный спуск постепенно уменьшает ошибку и обновляет параметры на каждой итерации. Нормальное уравнение (Normal Equation) сразу даёт решение, минимизирующее RSS: β = (XᵀX)⁻¹Xᵀy.",
              "Основные допущения линейной регрессии: линейность, независимость ошибок, гомоскедастичность, близость ошибок к нормальному распределению и репрезентативность данных. При нарушении помогают новые признаки, преобразования, регуляризация или более сложная модель."
            ],
            list: [
              "Градиентный спуск — для больших данных, требует масштабирования.",
              "Нормальное уравнение — для небольших/средних данных, дорого при большой матрице.",
              "p-значение, t-тест и F-тест проверяют значимость коэффициентов.",
              "Полиномиальная регрессия моделирует кривую, логистическая — предсказывает класс."
            ],
            note: "Линейная регрессия предсказывает число; логистическая регрессия выдаёт вероятность класса. Названия похожи, задачи разные."
          }
        ],
        visual: {
          title: "Поток работы регрессии",
          html: `
            <div class="flow" role="img" aria-label="Поток регрессии: данные, модель, loss и оценка">
              <div class="flow-step"><span>01</span><b>Данные</b><small>Признаки и цель</small></div>
              <div class="flow-step"><span>02</span><b>Модель</b><small>y = β₀ + β₁x₁ + …</small></div>
              <div class="flow-step"><span>03</span><b>Loss</b><small>Минимизация MSE</small></div>
              <div class="flow-step"><span>04</span><b>Оценка</b><small>MAE, RMSE, R²</small></div>
            </div>`,
          caption: "Обучение уменьшает loss, а оценка показывает, насколько модель точна на новых данных."
        },
        code: {
          title: "Линейная регрессия и метрики",
          note: "Масса пингвина предсказывается по длине плавника и длине клюва. MAE, RMSE и R² считаются на тестовом наборе.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["body_mass_g", "flipper_length_mm", "bill_length_mm"])

X = df[["flipper_length_mm", "bill_length_mm"]]
y = df["body_mass_g"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coef:", model.coef_.round(2))
print("intercept:", round(model.intercept_, 1))
print("MAE:", round(mean_absolute_error(y_test, pred), 1))
print("RMSE:", round(mean_squared_error(y_test, pred) ** 0.5, 1))
print("R2:", round(r2_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "В какой задаче модель предсказывает числовое значение?",
            options: ["Классификация", "Регрессия", "Ранжирование"],
            answer: 1,
            why: "Регрессия предсказывает непрерывные числа: цену, температуру и т.п."
          },
          {
            q: "Что означает R² = 1?",
            options: ["Модель ничего не объясняет", "Модель полностью объясняет данные", "Модель хуже среднего"],
            answer: 1,
            why: "При R² = 1 остатки равны нулю, и модель полностью объясняет изменчивость цели."
          },
          {
            q: "Какая метрика сильнее наказывает большие ошибки?",
            options: ["MAE", "MSE", "R²"],
            answer: 1,
            why: "MSE возводит ошибку в квадрат, поэтому большие отклонения влияют гораздо сильнее."
          },
          {
            q: "Как интерпретировать коэффициент 2,5 для числа комнат?",
            options: ["При росте числа комнат на 1 цена в среднем растёт на 2,5 единицы", "Цена растёт в 2,5 раза", "Число комнат не влияет на цену"],
            answer: 0,
            why: "При неизменных остальных признаках коэффициент показывает среднее изменение результата на единицу признака."
          },
          {
            q: "Когда используется тестовый набор?",
            options: ["При настройке модели", "Для финальной честной оценки", "Для выбора признаков"],
            answer: 1,
            why: "Тестовый набор предназначен для финальной оценки; использование его для настройки искажает результат."
          }
        ],
        summary: [
          "Регрессия предсказывает число, классификация — класс, ранжирование — порядок.",
          "Линейная модель имеет вид y = β₀ + β₁x₁ + … + ε; коэффициенты описывают связь.",
          "MSE наказывает большие ошибки, RMSE возвращает единицы, MAE понятна, R² показывает долю дисперсии.",
          "Коэффициенты находят градиентным спуском или нормальным уравнением.",
          "Нужно проверять линейность, независимость ошибок и гомоскедастичность."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Distinguish regression from classification and ranking.",
          "Understand the linear regression formula and coefficient interpretation.",
          "Choose MSE, RMSE, MAE and R² correctly.",
          "Compare gradient descent with the normal equation and check assumptions."
        ],
        theory: [
          {
            h: "What is regression?",
            p: [
              "Regression predicts a numeric target value. House price, temperature, salary or sales volume are all regression tasks. The model finds a pattern between features and target and returns a concrete number for a new case.",
              "Classification predicts a class (spam/not spam), ranking predicts order (which result should come first). Regression answers “how much?”, not “which class?”."
            ],
            list: [
              "Classification determines which group an object belongs to.",
              "Regression predicts a continuous number.",
              "Ranking orders objects by importance.",
              "Train teaches the model, validation tunes it, test gives the final honest estimate."
            ],
            note: "Keep the test set until the very end: using it for model selection or tuning makes the estimate dishonest."
          },
          {
            h: "The linear regression model",
            p: [
              "With one feature the model is y = β₀ + β₁x + ε. With several features: y = β₀ + β₁x₁ + … + βₙxₙ + ε. Here β₀ is the intercept, βᵢ are weights and ε is the random error the model does not capture.",
              "A coefficient means: “holding other features fixed, a one-unit increase in xᵢ changes y by βᵢ on average”. Linearity is in the parameters, not the features: you may add x² or log(x), while the coefficients stay first-degree."
            ],
            list: [
              "β₀ is the theoretical value when all x = 0; it is often not interpreted on its own.",
              "A positive coefficient raises the result, a negative one lowers it.",
              "A binary feature (pool = 0/1) shows the average difference between two groups.",
              "An interaction term (x₁·x₂) means one feature's effect depends on another."
            ],
            note: "A coefficient shows association, not causation. Saying “the pool raised the price” is premature."
          },
          {
            h: "Loss functions and metrics",
            p: [
              "Model quality is measured by residuals: the difference between the actual value and the prediction. MSE = (1/n) Σ(yᵢ − ŷᵢ)². Squaring prevents positive and negative errors from cancelling and punishes large errors more heavily.",
              "R² = 1 − SS_res / SS_tot shows what share of the target's variation the model explains. R² = 1 is a perfect fit, 0 is the mean level, and a negative value is worse than the mean."
            ],
            table: {
              head: ["Metric", "Meaning", "Unit", "Property"],
              rows: [
                ["MAE", "Mean absolute error", "Same as target", "Robust to outliers"],
                ["MSE", "Mean squared error", "Squared unit", "Punishes large errors heavily"],
                ["RMSE", "Square root of MSE", "Same as target", "Sensitive to large errors"],
                ["R²", "Share of explained variance", "Unitless", "Closer to 1 is better"]
              ]
            },
            note: "If a large error is expensive for the business, choose MSE/RMSE. If you need a clear “how much do we miss on average?”, MAE fits."
          },
          {
            h: "Finding coefficients and checking assumptions",
            p: [
              "There are two ways to find coefficients. Gradient descent gradually reduces the error and updates parameters each iteration. The normal equation gives the RSS-minimising solution in one step: β = (XᵀX)⁻¹Xᵀy.",
              "The main assumptions of linear regression are linearity, independent errors, homoscedasticity, approximately normal errors and representative data. When they fail, add features, transform data, regularise or use a more complex model."
            ],
            list: [
              "Gradient descent suits large data and requires scaling.",
              "The normal equation suits small/medium data but is expensive for large matrices.",
              "p-values, the t-test and the F-test check coefficient significance.",
              "Polynomial regression models curves; logistic regression predicts classes."
            ],
            note: "Linear regression predicts a number; logistic regression outputs a class probability. The names are similar, the tasks are not."
          }
        ],
        visual: {
          title: "Regression workflow",
          html: `
            <div class="flow" role="img" aria-label="Regression workflow: data, model, loss and evaluation">
              <div class="flow-step"><span>01</span><b>Data</b><small>Features and target</small></div>
              <div class="flow-step"><span>02</span><b>Model</b><small>y = β₀ + β₁x₁ + …</small></div>
              <div class="flow-step"><span>03</span><b>Loss</b><small>Minimise MSE</small></div>
              <div class="flow-step"><span>04</span><b>Evaluate</b><small>MAE, RMSE, R²</small></div>
            </div>`,
          caption: "Training lowers the loss; evaluation shows how accurate the model is on new data."
        },
        code: {
          title: "Linear regression and metrics",
          note: "Penguin body mass is predicted from flipper length and bill length. MAE, RMSE and R² are computed on the test set.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["body_mass_g", "flipper_length_mm", "bill_length_mm"])

X = df[["flipper_length_mm", "bill_length_mm"]]
y = df["body_mass_g"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coef:", model.coef_.round(2))
print("intercept:", round(model.intercept_, 1))
print("MAE:", round(mean_absolute_error(y_test, pred), 1))
print("RMSE:", round(mean_squared_error(y_test, pred) ** 0.5, 1))
print("R2:", round(r2_score(y_test, pred), 3))`
        },
        quiz: [
          {
            q: "Which task predicts a numeric value?",
            options: ["Classification", "Regression", "Ranking"],
            answer: 1,
            why: "Regression predicts continuous numbers such as price or temperature."
          },
          {
            q: "What does R² = 1 mean?",
            options: ["The model explains nothing", "The model explains the data perfectly", "The model is worse than the mean"],
            answer: 1,
            why: "At R² = 1 residuals are zero and the model fully explains the target's variation."
          },
          {
            q: "Which metric punishes large errors most?",
            options: ["MAE", "MSE", "R²"],
            answer: 1,
            why: "MSE squares the error, so large deviations have a much stronger effect."
          },
          {
            q: "How do you interpret a coefficient of 2.5 for room count?",
            options: ["One more room raises the price by 2.5 units on average", "The price rises 2.5 times", "Room count does not affect price"],
            answer: 0,
            why: "Holding other features fixed, the coefficient is the average change in the result per one-unit change in the feature."
          },
          {
            q: "When is the test set used?",
            options: ["While tuning the model", "For the final honest evaluation", "For feature selection"],
            answer: 1,
            why: "The test set is for final evaluation; using it for tuning distorts the result."
          }
        ],
        summary: [
          "Regression predicts a number, classification a class, ranking an order.",
          "The linear model is y = β₀ + β₁x₁ + … + ε; coefficients describe the relationship.",
          "MSE punishes large errors, RMSE restores units, MAE is intuitive, R² shows explained variance.",
          "Coefficients are found by gradient descent or the normal equation.",
          "Check linearity, error independence and homoscedasticity."
        ]
      }
    },
    6: {
      kk: {
        minutes: 100,
        goals: [
          "Бинарлық, көпклассты және көпбелгілі жіктеуді ажырату.",
          "Сигмоида арқылы логистикалық регрессияның ықтималдық шығаруын түсіну.",
          "Log-Loss, градиенттік түсу және регуляризацияны түсіндіру.",
          "Accuracy, precision, recall, F1 және ROC-AUC метрикаларын таңдау."
        ],
        theory: [
          {
            h: "Жіктеу есебі",
            p: [
              "Жіктеу — объектіні алдын ала белгілі класқа жатқызу. Модель белгіленген деректерден заңдылық үйреніп, жаңа объектінің қай санатқа жататынын болжайды. Мысалы: хаттың спам болуы, науқаста аурудың бар-жоғы, суреттегі жануардың түрі.",
              "Бинарлық жіктеуде екі класс болады (спам/спам емес). Көпклассты жіктеуде екіден көп класс бар, бірақ әр объект тек бір класқа жатады (мысық/ит/құс). Көпбелгілі жіктеуде бір объектке бірнеше белгі қатар берілуі мүмкін (фильм — экшн және комедия)."
            ],
            list: [
              "Бинарлық: 0/1, Pass/Fail, науқас/сау.",
              "Көпклассты: 0–9 цифрлар, мысық/ит/құс.",
              "Көпбелгілі: бір фотосуретте адам, көлік және ит қатар.",
              "Train модельді оқытады, validation баптайды, test соңғы баға береді."
            ],
            note: "Класстар теңгерімсіз болса, accuracy алдауы мүмкін: 95% «сау» болса, барлығын сау деп болжаған модель де 95% алады."
          },
          {
            h: "Сигмоида және ықтималдық",
            p: [
              "Логистикалық регрессия алдымен сызықтық болжаушыны есептейді: z = β₀ + β₁x₁ + … + βₙxₙ. z кез келген сан болуы мүмкін, ал ықтималдық 0 мен 1 аралығында болуы керек. Сондықтан z сигмоидаға беріледі: p = σ(z) = 1 / (1 + e⁻ᶻ).",
              "p ≥ 0.5 болса класс 1, әйтпесе класс 0 таңдалады. Шанс (odds) = p / (1 − p), ал логарифмдік шанс log-odds = z. Коэффициент βᵢ бір бірлікке өзгергенде log-odds-ты βᵢ-ге өзгертеді; exp(βᵢ) шанстың қанша есе өзгергенін көрсетеді."
            ],
            list: [
              "σ(0) = 0.5; үлкен оң z 1-ге, үлкен теріс z 0-ге жақындайды.",
              "Шекті мән әрқашан 0.5 бола бермейді; оны бизнес шығынына қарай таңдайды.",
              "Оң коэффициент ықтималдықты арттырады, теріс — төмендетеді.",
              "exp(βᵢ) — бір бірлік өзгеріске сәйкес шанстың мультипликативті өзгерісі."
            ],
            note: "Логистикалық регрессия атауында «регрессия» бар, бірақ ол санды емес, класс ықтималдығын болжайды."
          },
          {
            h: "Log-Loss және оқыту",
            p: [
              "Жіктеуде шығын функциясы ретінде бинарлық кросс-энтропия (Log-Loss) қолданылады: L = −(1/n) Σ[yᵢ log pᵢ + (1 − yᵢ) log(1 − pᵢ)]. Дұрыс әрі сенімді болжам 0-ге жақындайды, ал сенімді қате болжам үлкен айыппұл алады.",
              "Параметрлерді градиенттік түсу арқылы табады: әр қадамда коэффициенттер градиентке қарсы бағытта жаңартылады. Максималды ықтималдық әдісі (MLE) сол шешімді log-likelihood-ты максимизациялау арқылы іздейді."
            ],
            list: [
              "Оқыту жылдамдығы тым үлкен — минимумнан секіру, тым кіші — баяу жинақталу.",
              "L2-регуляризация коэффициенттердің шамадан тыс өсуін тежейді.",
              "Ерте тоқтату overfitting-ті азайтады.",
              "Класстар теңгерімсіз болса, class_weight='balanced' қолдануға болады."
            ],
            note: "Регуляризация train дәлдігін сәл төмендетіп, test дәлдігін тұрақтандыруы мүмкін — бұл қалыпты жағдай."
          },
          {
            h: "Жіктеу метрикалары",
            p: [
              "Confusion matrix төрт жағдайды көрсетеді: TP (дұрыс оң), FP (жалған оң), FN (жалған теріс), TN (дұрыс теріс). Accuracy = (TP + TN) / барлығы. Precision = TP / (TP + FP) — оң деп айтқандардың қаншасы шынымен оң. Recall = TP / (TP + FN) — барлық оңдардың қаншасын таптық. F1 — precision мен recall-дың гармоникалық ортасы.",
              "ROC қисығы TPR мен FPR арасындағы байланысты көрсетеді. AUC = 0.5 кездейсоқ болжам, AUC = 1 идеалды ажырату. Шекті мәнді таңдау қай қатенің қымбат екеніне байланысты."
            ],
            table: {
              head: ["Метрика", "Мағынасы", "Қашан маңызды"],
              rows: [
                ["Accuracy", "Барлық дұрыс болжамдардың үлесі", "Класстар тең болғанда"],
                ["Precision", "Оң деп айтқандардың дәлдігі", "FP қымбат болғанда"],
                ["Recall", "Барлық оңдардың қаншасы табылды", "FN қымбат болғанда"],
                ["F1", "Precision мен recall тепе-теңдігі", "Теңгерімсіз класстарда"],
                ["ROC-AUC", "Ажырату қабілеті", "Шектіден тәуелсіз бағалауда"]
              ]
            },
            note: "Медициналық скринингте ауруды өткізіп жіберу (FN) қымбат — recall басым. Спам-фильтрде қате спам деп белгілеу (FP) қымбат — precision басым."
          }
        ],
        visual: {
          title: "Сигмоида және шешім шекарасы",
          html: `
            <div style="padding:10px 0 0">
              <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Сигмоида қисығы және 0.5 шекті мәні">
                <line x1="62" y1="232" x2="602" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="28" x2="62" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="130" x2="602" y2="130" stroke="var(--line, #c7ced8)" stroke-width="1.2" stroke-dasharray="5 5"/>
                <path d="M 72 226 C 210 222, 245 208, 305 152 S 415 48, 590 38" fill="none" stroke="var(--accent, #2563eb)" stroke-width="4" stroke-linecap="round"/>
                <line x1="305" y1="34" x2="305" y2="232" stroke="var(--danger, #d9534f)" stroke-width="1.5" stroke-dasharray="6 6"/>
                <text x="305" y="254" text-anchor="middle" font-size="13" fill="var(--muted, #667085)">z = 0</text>
                <text x="610" y="254" font-size="13" fill="var(--muted, #667085)">z</text>
                <text x="48" y="36" text-anchor="end" font-size="13" fill="var(--muted, #667085)">1.0</text>
                <text x="48" y="135" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.5</text>
                <text x="48" y="236" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.0</text>
                <text x="318" y="120" font-size="13" fill="var(--danger, #d9534f)">threshold 0.5</text>
                <text x="90" y="62" font-size="13" fill="var(--muted, #667085)">p = σ(z)</text>
              </svg>
            </div>`,
          caption: "Сигмоида кез келген z мәнін 0 мен 1 аралығындағы ықтималдыққа айналдырады; 0.5 шегі екі классты бөледі."
        },
        code: {
          title: "Логистикалық регрессия және метрикалар",
          note: "Пингвиннің жынысы бинарлық класс ретінде болжанады. Модель ықтималдық шығарады, ал шешім 0.5 шегі арқылы қабылданады.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, pred, target_names=["Female", "Male"]))
print("ROC-AUC:", round(roc_auc_score(y_test, proba), 3))`
        },
        quiz: [
          {
            q: "Сигмоида функциясының негізгі қызметі неде?",
            options: ["Санды класс атауына айналдыру", "Кез келген z-ті 0 мен 1 аралығына сығу", "Деректердің өлшемін кішірейту"],
            answer: 1,
            why: "σ(z) әрқашан 0 мен 1 аралығында, сондықтан нәтижені ықтималдық ретінде түсіндіруге болады."
          },
          {
            q: "p = 0.8 және шекті мән 0.5 болса, модель қандай класты таңдайды?",
            options: ["0", "1", "Шешім қабылдамайды"],
            answer: 1,
            why: "0.8 > 0.5 болғандықтан модель оң класты (1) таңдайды."
          },
          {
            q: "Ауруды өткізіп жіберу қымбат болса, қай метрикаға басымдық беру керек?",
            options: ["Precision", "Recall", "Accuracy"],
            answer: 1,
            why: "Recall барлық нақты оңдардың қаншасын тапқанымызды көрсетеді; FN-ді азайтуға бағытталған."
          },
          {
            q: "Модель нақты y = 1 кезінде p = 0.05 деп сенімді қателессе, Log-Loss қандай болады?",
            options: ["Өте үлкен", "Нөлге жақын", "Теріс"],
            answer: 0,
            why: "Сенімді қате болжам үлкен айыппұл алады, сондықтан Log-Loss өте үлкен болады."
          },
          {
            q: "Көпклассты және көпбелгілі жіктеудің айырмасы неде?",
            options: ["Көпкласста бір объект бір класқа, көпбелгіліде бірнеше класқа жатады", "Көпкласста екі класс, көпбелгіліде бір класс", "Айырмасы жоқ"],
            answer: 0,
            why: "Көпкласста әр объект бір класқа, ал көпбелгіліде бірнеше белгі қатар тағайындалады."
          }
        ],
        summary: [
          "Жіктеу класты болжайды: бинарлық, көпклассты және көпбелгілі болып бөлінеді.",
          "Логистикалық регрессия z-ті сигмоида арқылы ықтималдыққа айналдырып, шекті мәнмен класс таңдайды.",
          "Log-Loss дұрыс сенімді болжамды марапаттап, сенімді қатені қатты жазалайды.",
          "Градиенттік түсу, MLE және L2-регуляризация модельді тұрақтандырады.",
          "Accuracy жеткіліксіз: precision, recall, F1 және ROC-AUC есептің мақсатына қарай таңдалады."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Различать бинарную, многоклассовую и многометочную классификацию.",
          "Понимать, как логистическая регрессия выдаёт вероятность через сигмоиду.",
          "Объяснять Log-Loss, градиентный спуск и регуляризацию.",
          "Выбирать accuracy, precision, recall, F1 и ROC-AUC."
        ],
        theory: [
          {
            h: "Задача классификации",
            p: [
              "Классификация относит объект к заранее известному классу. Модель учится на размеченных данных и предсказывает, к какой категории относится новый объект: спам или не спам, есть болезнь или нет, какое животное на фото.",
              "В бинарной классификации два класса (спам/не спам). В многоклассовой классов больше двух, но каждый объект принадлежит только одному (кошка/собака/птица). В многометочной объекту можно присвоить несколько меток одновременно (фильм — боевик и комедия)."
            ],
            list: [
              "Бинарная: 0/1, Pass/Fail, болен/здоров.",
              "Многоклассовая: цифры 0–9, кошка/собака/птица.",
              "Многометочная: на фото человек, машина и собака одновременно.",
              "Train обучает модель, validation настраивает, test даёт финальную оценку."
            ],
            note: "При дисбалансе классов accuracy обманчива: если 95% здоровы, модель, всегда предсказывающая «здоров», тоже получит 95%."
          },
          {
            h: "Сигмоида и вероятность",
            p: [
              "Логистическая регрессия сначала считает линейный предиктор: z = β₀ + β₁x₁ + … + βₙxₙ. z может быть любым числом, а вероятность должна лежать в 0–1. Поэтому z пропускают через сигмоиду: p = σ(z) = 1 / (1 + e⁻ᶻ).",
              "Если p ≥ 0.5, выбирается класс 1, иначе 0. Шанс (odds) = p / (1 − p), а логарифмический шанс log-odds = z. Коэффициент βᵢ меняет log-odds на βᵢ при изменении признака на единицу; exp(βᵢ) показывает, во сколько раз меняется шанс."
            ],
            list: [
              "σ(0) = 0.5; большой положительный z стремится к 1, большой отрицательный — к 0.",
              "Порог не всегда 0.5; его выбирают по стоимости ошибок.",
              "Положительный коэффициент повышает вероятность, отрицательный — понижает.",
              "exp(βᵢ) — мультипликативное изменение шанса на единицу признака."
            ],
            note: "В названии есть «регрессия», но модель предсказывает не число, а вероятность класса."
          },
          {
            h: "Log-Loss и обучение",
            p: [
              "В классификации используют бинарную кросс-энтропию (Log-Loss): L = −(1/n) Σ[yᵢ log pᵢ + (1 − yᵢ) log(1 − pᵢ)]. Правильный и уверенный прогноз приближает loss к нулю, а уверенная ошибка получает большой штраф.",
              "Параметры находят градиентным спуском: на каждом шаге коэффициенты обновляются против градиента. Метод максимального правдоподобия (MLE) ищет то же решение, максимизируя log-likelihood."
            ],
            list: [
              "Слишком большой шаг — перескок минимума, слишком маленький — медленная сходимость.",
              "L2-регуляризация не даёт коэффициентам чрезмерно расти.",
              "Ранняя остановка снижает overfitting.",
              "При дисбалансе классов помогает class_weight='balanced'."
            ],
            note: "Регуляризация может слегка снизить точность на train, но стабилизировать её на test — это нормально."
          },
          {
            h: "Метрики классификации",
            p: [
              "Confusion matrix показывает четыре случая: TP, FP, FN, TN. Accuracy = (TP + TN) / всего. Precision = TP / (TP + FP) — какая доля предсказанных «положительных» действительно положительна. Recall = TP / (TP + FN) — какую долю всех положительных мы нашли. F1 — гармоническое среднее precision и recall.",
              "ROC-кривая показывает связь TPR и FPR. AUC = 0.5 — случайное угадывание, AUC = 1 — идеальное разделение. Порог выбирают исходя из того, какая ошибка дороже."
            ],
            table: {
              head: ["Метрика", "Смысл", "Когда важна"],
              rows: [
                ["Accuracy", "Доля всех верных прогнозов", "При балансе классов"],
                ["Precision", "Точность положительных прогнозов", "Когда FP дорог"],
                ["Recall", "Доля найденных положительных", "Когда FN дорог"],
                ["F1", "Баланс precision и recall", "При дисбалансе классов"],
                ["ROC-AUC", "Способность разделять классы", "Оценка независимо от порога"]
              ]
            },
            note: "В медицинском скрининге пропуск болезни (FN) дорог — важнее recall. В спам-фильтре дорого пометить нормальное письмо (FP) — важнее precision."
          }
        ],
        visual: {
          title: "Сигмоида и граница решения",
          html: `
            <div style="padding:10px 0 0">
              <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Кривая сигмоиды и порог 0.5">
                <line x1="62" y1="232" x2="602" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="28" x2="62" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="130" x2="602" y2="130" stroke="var(--line, #c7ced8)" stroke-width="1.2" stroke-dasharray="5 5"/>
                <path d="M 72 226 C 210 222, 245 208, 305 152 S 415 48, 590 38" fill="none" stroke="var(--accent, #2563eb)" stroke-width="4" stroke-linecap="round"/>
                <line x1="305" y1="34" x2="305" y2="232" stroke="var(--danger, #d9534f)" stroke-width="1.5" stroke-dasharray="6 6"/>
                <text x="305" y="254" text-anchor="middle" font-size="13" fill="var(--muted, #667085)">z = 0</text>
                <text x="610" y="254" font-size="13" fill="var(--muted, #667085)">z</text>
                <text x="48" y="36" text-anchor="end" font-size="13" fill="var(--muted, #667085)">1.0</text>
                <text x="48" y="135" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.5</text>
                <text x="48" y="236" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.0</text>
                <text x="318" y="120" font-size="13" fill="var(--danger, #d9534f)">threshold 0.5</text>
                <text x="90" y="62" font-size="13" fill="var(--muted, #667085)">p = σ(z)</text>
              </svg>
            </div>`,
          caption: "Сигмоида превращает любое z в вероятность от 0 до 1; порог 0.5 разделяет два класса."
        },
        code: {
          title: "Логистическая регрессия и метрики",
          note: "Пол пингвина предсказывается как бинарный класс. Модель выдаёт вероятность, а решение принимается по порогу 0.5.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, pred, target_names=["Female", "Male"]))
print("ROC-AUC:", round(roc_auc_score(y_test, proba), 3))`
        },
        quiz: [
          {
            q: "Какова основная роль сигмоиды?",
            options: ["Превратить число в название класса", "Сжать любое z в диапазон 0–1", "Уменьшить размер данных"],
            answer: 1,
            why: "σ(z) всегда лежит в 0–1, поэтому результат можно интерпретировать как вероятность."
          },
          {
            q: "Если p = 0.8 и порог 0.5, какой класс выберет модель?",
            options: ["0", "1", "Не примет решение"],
            answer: 1,
            why: "0.8 > 0.5, поэтому модель выбирает положительный класс (1)."
          },
          {
            q: "Если пропуск болезни дорог, какой метрике отдать приоритет?",
            options: ["Precision", "Recall", "Accuracy"],
            answer: 1,
            why: "Recall показывает долю найденных положительных случаев и нацелен на снижение FN."
          },
          {
            q: "Если при y = 1 модель уверенно даёт p = 0.05, каким будет Log-Loss?",
            options: ["Очень большим", "Близким к нулю", "Отрицательным"],
            answer: 0,
            why: "Уверенная ошибка получает большой штраф, поэтому Log-Loss будет очень большим."
          },
          {
            q: "Чем многоклассовая классификация отличается от многометочной?",
            options: ["В многоклассовой объект получает один класс, в многометочной — несколько", "В многоклассовой два класса, в многометочной один", "Разницы нет"],
            answer: 0,
            why: "В многоклассовой каждый объект относится к одному классу, в многометочной ему можно присвоить несколько меток."
          }
        ],
        summary: [
          "Классификация предсказывает класс: бинарная, многоклассовая и многометочная.",
          "Логистическая регрессия превращает z в вероятность через сигмоиду и выбирает класс по порогу.",
          "Log-Loss поощряет уверенные правильные прогнозы и сильно штрафует уверенные ошибки.",
          "Градиентный спуск, MLE и L2-регуляризация делают модель устойчивой.",
          "Accuracy недостаточно: precision, recall, F1 и ROC-AUC выбирают под цель задачи."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Distinguish binary, multiclass and multilabel classification.",
          "Understand how logistic regression outputs probabilities through the sigmoid.",
          "Explain Log-Loss, gradient descent and regularisation.",
          "Choose accuracy, precision, recall, F1 and ROC-AUC."
        ],
        theory: [
          {
            h: "The classification task",
            p: [
              "Classification assigns an object to a known class. The model learns from labelled data and predicts which category a new object belongs to: spam or not spam, disease or no disease, which animal is in the photo.",
              "Binary classification has two classes (spam/not spam). Multiclass classification has more than two classes, but each object belongs to exactly one (cat/dog/bird). Multilabel classification assigns several labels to one object (a film can be action and comedy)."
            ],
            list: [
              "Binary: 0/1, Pass/Fail, sick/healthy.",
              "Multiclass: digits 0–9, cat/dog/bird.",
              "Multilabel: a photo with a person, a car and a dog.",
              "Train teaches the model, validation tunes it, test gives the final estimate."
            ],
            note: "With class imbalance, accuracy is misleading: if 95% are healthy, a model that always predicts “healthy” also scores 95%."
          },
          {
            h: "Sigmoid and probability",
            p: [
              "Logistic regression first computes a linear predictor: z = β₀ + β₁x₁ + … + βₙxₙ. z can be any number, while a probability must lie in 0–1. So z goes through the sigmoid: p = σ(z) = 1 / (1 + e⁻ᶻ).",
              "If p ≥ 0.5 the class is 1, otherwise 0. Odds = p / (1 − p), and log-odds = z. A coefficient βᵢ changes log-odds by βᵢ per one-unit change in the feature; exp(βᵢ) shows the multiplicative change in odds."
            ],
            list: [
              "σ(0) = 0.5; large positive z approaches 1, large negative z approaches 0.",
              "The threshold is not always 0.5; choose it from the cost of errors.",
              "A positive coefficient raises probability, a negative one lowers it.",
              "exp(βᵢ) is the multiplicative change in odds per unit of the feature."
            ],
            note: "The name contains “regression”, but the model predicts a class probability, not a number."
          },
          {
            h: "Log-Loss and training",
            p: [
              "Classification uses binary cross-entropy (Log-Loss): L = −(1/n) Σ[yᵢ log pᵢ + (1 − yᵢ) log(1 − pᵢ)]. A correct confident prediction drives loss toward zero, while a confident mistake receives a large penalty.",
              "Parameters are found by gradient descent: each step updates coefficients against the gradient. Maximum likelihood estimation (MLE) finds the same solution by maximising log-likelihood."
            ],
            list: [
              "Too large a step overshoots the minimum; too small a step converges slowly.",
              "L2 regularisation stops coefficients from growing excessively.",
              "Early stopping reduces overfitting.",
              "For class imbalance, class_weight='balanced' helps."
            ],
            note: "Regularisation may slightly lower train accuracy while stabilising test accuracy — that is expected."
          },
          {
            h: "Classification metrics",
            p: [
              "The confusion matrix has four cases: TP, FP, FN, TN. Accuracy = (TP + TN) / total. Precision = TP / (TP + FP) — the share of predicted positives that are truly positive. Recall = TP / (TP + FN) — the share of all positives we found. F1 is the harmonic mean of precision and recall.",
              "The ROC curve plots TPR against FPR. AUC = 0.5 is random guessing, AUC = 1 is perfect separation. The threshold is chosen from which error is more expensive."
            ],
            table: {
              head: ["Metric", "Meaning", "When it matters"],
              rows: [
                ["Accuracy", "Share of all correct predictions", "When classes are balanced"],
                ["Precision", "How precise positive predictions are", "When FP is expensive"],
                ["Recall", "Share of positives found", "When FN is expensive"],
                ["F1", "Balance of precision and recall", "With class imbalance"],
                ["ROC-AUC", "Ability to separate classes", "Threshold-independent evaluation"]
              ]
            },
            note: "In medical screening a missed disease (FN) is costly — recall matters more. In spam filtering a false positive (FP) is costly — precision matters more."
          }
        ],
        visual: {
          title: "Sigmoid and the decision boundary",
          html: `
            <div style="padding:10px 0 0">
              <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Sigmoid curve and the 0.5 threshold">
                <line x1="62" y1="232" x2="602" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="28" x2="62" y2="232" stroke="var(--line, #c7ced8)" stroke-width="1.5"/>
                <line x1="62" y1="130" x2="602" y2="130" stroke="var(--line, #c7ced8)" stroke-width="1.2" stroke-dasharray="5 5"/>
                <path d="M 72 226 C 210 222, 245 208, 305 152 S 415 48, 590 38" fill="none" stroke="var(--accent, #2563eb)" stroke-width="4" stroke-linecap="round"/>
                <line x1="305" y1="34" x2="305" y2="232" stroke="var(--danger, #d9534f)" stroke-width="1.5" stroke-dasharray="6 6"/>
                <text x="305" y="254" text-anchor="middle" font-size="13" fill="var(--muted, #667085)">z = 0</text>
                <text x="610" y="254" font-size="13" fill="var(--muted, #667085)">z</text>
                <text x="48" y="36" text-anchor="end" font-size="13" fill="var(--muted, #667085)">1.0</text>
                <text x="48" y="135" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.5</text>
                <text x="48" y="236" text-anchor="end" font-size="13" fill="var(--muted, #667085)">0.0</text>
                <text x="318" y="120" font-size="13" fill="var(--danger, #d9534f)">threshold 0.5</text>
                <text x="90" y="62" font-size="13" fill="var(--muted, #667085)">p = σ(z)</text>
              </svg>
            </div>`,
          caption: "The sigmoid turns any z into a probability between 0 and 1; the 0.5 threshold separates the two classes."
        },
        code: {
          title: "Logistic regression and metrics",
          note: "Penguin sex is predicted as a binary class. The model outputs a probability, and the decision uses a 0.5 threshold.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, pred, target_names=["Female", "Male"]))
print("ROC-AUC:", round(roc_auc_score(y_test, proba), 3))`
        },
        quiz: [
          {
            q: "What is the main role of the sigmoid?",
            options: ["Turn a number into a class name", "Squash any z into the 0–1 range", "Reduce the data size"],
            answer: 1,
            why: "σ(z) always lies in 0–1, so the result can be interpreted as a probability."
          },
          {
            q: "If p = 0.8 and the threshold is 0.5, which class does the model choose?",
            options: ["0", "1", "It makes no decision"],
            answer: 1,
            why: "0.8 > 0.5, so the model chooses the positive class (1)."
          },
          {
            q: "If missing a disease is costly, which metric should take priority?",
            options: ["Precision", "Recall", "Accuracy"],
            answer: 1,
            why: "Recall measures the share of positives found and targets reducing FN."
          },
          {
            q: "If y = 1 and the model confidently predicts p = 0.05, what is Log-Loss?",
            options: ["Very large", "Close to zero", "Negative"],
            answer: 0,
            why: "A confident mistake receives a large penalty, so Log-Loss is very large."
          },
          {
            q: "How does multiclass differ from multilabel classification?",
            options: ["Multiclass gives one class per object, multilabel gives several", "Multiclass has two classes, multilabel one", "There is no difference"],
            answer: 0,
            why: "In multiclass each object has one class; in multilabel an object can receive several labels."
          }
        ],
        summary: [
          "Classification predicts a class: binary, multiclass and multilabel.",
          "Logistic regression turns z into a probability via the sigmoid and chooses a class by threshold.",
          "Log-Loss rewards confident correct predictions and heavily penalises confident mistakes.",
          "Gradient descent, MLE and L2 regularisation make the model stable.",
          "Accuracy is not enough: precision, recall, F1 and ROC-AUC are chosen for the task."
        ]
      }
    },
    7: {
      kk: {
        minutes: 90,
        goals: [
          "Train, validation және test жиындарының рөлін ажырату.",
          "K-fold және стратификацияланған кросс-валидацияны қолдану.",
          "Есеп түріне сәйкес метрика мен baseline таңдау.",
          "GridSearchCV арқылы гиперпараметрлерді баптап, test-те бір рет бағалау."
        ],
        theory: [
          {
            h: "Неге модельді оқытқан деректерде бағалауға болмайды?",
            p: [
              "Модель оқыту деректерін есте сақтап, оларда өте жоғары нәтиже көрсетуі мүмкін. Бірақ бізге жаңа деректердегі сапа маңызды. Train-дегі жоғары дәлдік модельдің шынымен заңдылық үйренгенін емес, деректерді жаттағанын көрсетуі ықтимал.",
              "Overfitting — модель оқыту деректеріне шамадан тыс бейімделіп, жаңа деректерде нашарлауы. Data leakage — тест немесе болашақ ақпараттың оқытуға кездейсоқ кіруі. Екеуі де бағаны жасанды түрде жақсартады, сондықтан бөлу тәртібін қатаң сақтау керек."
            ],
            list: [
              "Train — модель заңдылық үйренетін деректер.",
              "Validation — модельді салыстыру және гиперпараметр таңдау.",
              "Test — соңғы, бір реттік әділ бағалау.",
              "Preprocessing-ті train-де fit етіп, test-те тек transform қолдану керек."
            ],
            note: "Тест нәтижесін көрген соң модельді қайта баптасаңыз, ол енді тест емес — validation болып қалады."
          },
          {
            h: "Кросс-валидация",
            p: [
              "Деректер аз болғанда бір ғана validation бөлу тұрақсыз баға береді. K-fold кросс-валидация деректерді k тең бөлікке бөліп, әр бөлікті кезекпен validation етеді. Нәтиже — k бағаның орташасы мен стандартты ауытқуы.",
              "Стратификацияланған K-fold әр бөлікте класстардың үлесін сақтайды, сондықтан теңгерімсіз жіктеуде қажет. Уақыттық қатарда кездейсоқ араластыруға болмайды: болашақты өткенмен болжау үшін TimeSeriesSplit қолданылады."
            ],
            table: {
              head: ["Әдіс", "Қалай жұмыс істейді", "Қашан қолданылады"],
              rows: [
                ["Holdout", "Train/validation/test бөлу", "Деректер көп болғанда"],
                ["K-Fold", "k бөлік, әрқайсысы кезекпен validation", "Жалпы жағдай"],
                ["Stratified K-Fold", "Класс үлесін сақтайды", "Теңгерімсіз жіктеу"],
                ["TimeSeriesSplit", "Өткенмен болашақты болжайды", "Уақыттық қатар"],
                ["LOOCV", "Әр жазба кезекпен test", "Өте аз деректер"]
              ]
            },
            note: "k = 5 немесе 10 — жиі таңдалатын мәндер. k үлкейген сайын есептеу қымбаттайды, бірақ баға тұрақтырақ болады."
          },
          {
            h: "Метриканы есепке сай таңдау",
            p: [
              "Регрессияда MAE, MSE, RMSE және R² қолданылады. MAE орташа абсолюттік қатені береді, MSE үлкен қателерді жазалайды, RMSE бастапқы өлшем бірлігіне қайтарады, R² дисперсияның қанша бөлігі түсіндірілгенін көрсетеді.",
              "Жіктеуде accuracy, precision, recall, F1 және ROC-AUC бар. Метрика бизнес мақсатымен байланысты болуы керек: не қымбат — жалған оңдық (FP) әлде жалған терістік (FN)? Baseline-мен салыстыру да міндетті: орташа мәнді болжау немесе көпшілік класты таңдау нақты модельден жақсы болып шығуы мүмкін."
            ],
            list: [
              "Регрессия: MAE — түсінікті, RMSE — үлкен қатеге сезімтал, R² — салыстырмалы.",
              "Жіктеу: precision FP-ті, recall FN-ді бақылайды, F1 теңгерім береді.",
              "Baselineсыз метриканың мағынасы жоқ.",
              "Бір метриканы ғана емес, бірнеше метриканы бірге қарау керек."
            ],
            note: "Метриканы тест жиынында таңдауға болмайды: ол модельді салыстыру құралы емес, соңғы бақылау."
          },
          {
            h: "Модельді таңдау және гиперпараметрлер",
            p: [
              "Гиперпараметр — модель оқымайтын, алдын ала берілетін параметр: LogisticRegression-та C, RandomForest-та n_estimators, KNN-де k. Оларды кросс-валидацияда іздейді: GridSearchCV барлық комбинацияны, RandomizedSearchCV кездейсоқ іріктемені тексереді.",
              "Ең дұрыс тәртіп: train-де кросс-валидациямен гиперпараметр таңдау, содан кейін барлық train-де қайта оқыту және test-те бір рет бағалау. Егер гиперпараметрлерді де, модельді де сол тестте таңдасаңыз, баға оптимистік болады."
            ],
            list: [
              "GridSearchCV — аз комбинация үшін толық іздеу.",
              "RandomizedSearchCV — көп кеңістікте жылдам іздеу.",
              "Nested CV — гиперпараметр таңдау мен бағалауды бөледі.",
              "Learning curve — деректер көлемінің әсерін, validation curve — гиперпараметр әсерін көрсетеді."
            ],
            note: "Соңғы модельді барлық train деректерінде қайта оқытқанда, кросс-валидация нәтижесі шамамен күтілетін сапаны көрсетеді, бірақ ол test бағасын алмастырмайды."
          }
        ],
        visual: {
          title: "5-fold кросс-валидация",
          html: `
            <div style="max-width:600px;margin:0 auto;padding:8px 0">
              <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:11px;text-align:center">
                <div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div>
              </div>
              <p style="text-align:center;margin:12px 0 0;font-size:13px;color:var(--muted,#667085)">5 итерация → 5 баға → орташа және стандартты ауытқу</p>
            </div>`,
          caption: "Әр жол — бір итерация: бір бөлік validation, қалғандары train. Барлық жазба дәл бір рет validation болады."
        },
        code: {
          title: "Кросс-валидация және GridSearchCV",
          note: "Модель 5-fold стратификацияланған кросс-валидациямен бағаланады, гиперпараметр тек train ішінде таңдалады, ал test соңында бір рет қолданылады.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X_train, y_train, cv=cv, scoring="roc_auc")
print("CV AUC:", round(scores.mean(), 3), "+/-", round(scores.std(), 3))

search = GridSearchCV(
    model, {"clf__C": [0.01, 0.1, 1, 10]}, cv=cv, scoring="roc_auc"
)
search.fit(X_train, y_train)
print("Best:", search.best_params_, round(search.best_score_, 3))
print("Test AUC:", round(roc_auc_score(y_test, search.predict_proba(X_test)[:, 1]), 3))`
        },
        quiz: [
          {
            q: "Неге модельді тек train деректерінде бағалау жеткіліксіз?",
            options: ["Train тым кішкентай", "Модель деректерді жаттап, баға оптимистік болуы мүмкін", "Метрикалар train-де есептелмейді"],
            answer: 1,
            why: "Overfitting кезінде train нәтижесі жоғары болады, бірақ жаңа деректердегі сапаны көрсетпейді."
          },
          {
            q: "5-fold кросс-валидация нені білдіреді?",
            options: ["Деректер 5 бөлікке бөлініп, әр бөлік кезекпен validation болады", "Модель 5 рет қайта оқытылады", "Тест 5 бөлікке бөлінеді"],
            answer: 0,
            why: "Әр итерацияда бір бөлік validation, қалған төртеуі train болады; нәтиже 5 бағаның орташасы."
          },
          {
            q: "Теңгерімсіз жіктеуде қай кросс-валидация қолайлы?",
            options: ["K-Fold", "Stratified K-Fold", "TimeSeriesSplit"],
            answer: 1,
            why: "Stratified K-Fold әр бөлікте класстардың үлесін сақтайды."
          },
          {
            q: "Уақыттық қатарда неге кездейсоқ shuffle қауіпті?",
            options: ["Есептеу қымбат", "Болашақ ақпарат өткенге ағып кетеді", "Метрика есептелмейді"],
            answer: 1,
            why: "Кездейсоқ араластыру болашақ деректерді train-ге түсіріп, data leakage жасайды."
          },
          {
            q: "Гиперпараметрлерді қайда таңдау керек?",
            options: ["Тест жиынында", "Train ішіндегі кросс-валидацияда", "Барлық деректерде"],
            answer: 1,
            why: "Тест соңғы бағалауға арналған; гиперпараметрлер train ішіндегі CV-де таңдалады."
          }
        ],
        summary: [
          "Train модельді оқытады, validation баптайды, test соңғы әділ баға береді.",
          "K-fold кросс-валидация тұрақты баға береді; стратификация класс үлесін сақтайды.",
          "Уақыттық қатарда TimeSeriesSplit қолданылады, кездейсоқ shuffle жасалмайды.",
          "Метрика бизнес мақсатымен және baseline-мен салыстырылуы керек.",
          "Гиперпараметрлер CV-де таңдалып, модель барлық train-де қайта оқытылып, test бір рет бағаланады."
        ]
      },
      ru: {
        minutes: 90,
        goals: [
          "Различать роли train, validation и test.",
          "Применять K-fold и стратифицированную кросс-валидацию.",
          "Выбирать метрику и baseline под тип задачи.",
          "Настраивать гиперпараметры через GridSearchCV и один раз оценивать на test."
        ],
        theory: [
          {
            h: "Почему нельзя оценивать модель на обучающих данных?",
            p: [
              "Модель может запомнить обучающие данные и показать на них очень высокий результат. Но нам важна качество на новых данных. Высокая точность на train может означать не выученную закономерность, а запоминание.",
              "Overfitting — модель слишком подстроилась под train и ухудшилась на новых данных. Data leakage — случайное попадание тестовой или будущей информации в обучение. Оба завышают оценку, поэтому порядок разбиения нужно соблюдать строго."
            ],
            list: [
              "Train — данные, на которых модель учится.",
              "Validation — сравнение моделей и выбор гиперпараметров.",
              "Test — финальная однократная честная оценка.",
              "Preprocessing fit только на train, transform — на test."
            ],
            note: "Если после просмотра test вы снова настраиваете модель, этот набор уже не test, а validation."
          },
          {
            h: "Кросс-валидация",
            p: [
              "При малом объёме данных одно разбиение даёт нестабильную оценку. K-fold делит данные на k равных частей и по очереди делает каждую validation. Результат — среднее k оценок и стандартное отклонение.",
              "Стратифицированный K-fold сохраняет долю классов в каждой части, поэтому нужен при дисбалансе. Временные ряды нельзя перемешивать случайно: для прогноза будущего по прошлому используют TimeSeriesSplit."
            ],
            table: {
              head: ["Метод", "Как работает", "Когда применять"],
              rows: [
                ["Holdout", "Разбиение train/validation/test", "Когда данных много"],
                ["K-Fold", "k частей, каждая по очереди validation", "Общий случай"],
                ["Stratified K-Fold", "Сохраняет долю классов", "Дисбаланс классов"],
                ["TimeSeriesSplit", "Прошлое предсказывает будущее", "Временные ряды"],
                ["LOOCV", "Каждая запись по очереди test", "Очень мало данных"]
              ]
            },
            note: "k = 5 или 10 — частые значения. Рост k увеличивает вычисления, но делает оценку стабильнее."
          },
          {
            h: "Выбор метрики под задачу",
            p: [
              "В регрессии используют MAE, MSE, RMSE и R². MAE даёт среднюю абсолютную ошибку, MSE наказывает большие ошибки, RMSE возвращает исходные единицы, R² показывает долю объяснённой дисперсии.",
              "В классификации есть accuracy, precision, recall, F1 и ROC-AUC. Метрика должна быть связана с бизнес-целью: что дороже — ложноположительный (FP) или ложноотрицательный (FN) результат? Сравнение с baseline обязательно: прогноз среднего или выбор мажоритарного класса иногда оказывается лучше реальной модели."
            ],
            list: [
              "Регрессия: MAE понятна, RMSE чувствительна к большим ошибкам, R² относительна.",
              "Классификация: precision контролирует FP, recall — FN, F1 балансирует.",
              "Без baseline метрика ничего не значит.",
              "Смотреть нужно несколько метрик, а не одну."
            ],
            note: "Не выбирайте метрику на test: test — это финальная проверка, а не инструмент сравнения моделей."
          },
          {
            h: "Выбор модели и гиперпараметры",
            p: [
              "Гиперпараметр — параметр, который модель не обучает, а получает заранее: C в LogisticRegression, n_estimators в RandomForest, k в KNN. Их ищут кросс-валидацией: GridSearchCV перебирает все комбинации, RandomizedSearchCV — случайную выборку.",
              "Правильный порядок: выбрать гиперпараметры CV на train, затем обучить на всём train и один раз оценить на test. Если выбирать и модель, и гиперпараметры на одном test, оценка станет оптимистичной."
            ],
            list: [
              "GridSearchCV — полный перебор для небольших сеток.",
              "RandomizedSearchCV — быстрый поиск в большом пространстве.",
              "Nested CV разделяет выбор гиперпараметров и оценку.",
              "Learning curve показывает эффект объёма данных, validation curve — эффект гиперпараметра."
            ],
            note: "После повторного обучения на всём train результат CV примерно показывает ожидаемое качество, но не заменяет test."
          }
        ],
        visual: {
          title: "5-fold кросс-валидация",
          html: `
            <div style="max-width:600px;margin:0 auto;padding:8px 0">
              <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:11px;text-align:center">
                <div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div>
              </div>
              <p style="text-align:center;margin:12px 0 0;font-size:13px;color:var(--muted,#667085)">5 итераций → 5 оценок → среднее и стандартное отклонение</p>
            </div>`,
          caption: "Каждая строка — одна итерация: одна часть validation, остальные train. Каждая запись ровно один раз становится validation."
        },
        code: {
          title: "Кросс-валидация и GridSearchCV",
          note: "Модель оценивается 5-fold стратифицированной кросс-валидацией, гиперпараметр выбирается только внутри train, а test используется один раз в конце.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X_train, y_train, cv=cv, scoring="roc_auc")
print("CV AUC:", round(scores.mean(), 3), "+/-", round(scores.std(), 3))

search = GridSearchCV(
    model, {"clf__C": [0.01, 0.1, 1, 10]}, cv=cv, scoring="roc_auc"
)
search.fit(X_train, y_train)
print("Best:", search.best_params_, round(search.best_score_, 3))
print("Test AUC:", round(roc_auc_score(y_test, search.predict_proba(X_test)[:, 1]), 3))`
        },
        quiz: [
          {
            q: "Почему оценки только на train недостаточно?",
            options: ["Train слишком мал", "Модель может запомнить данные, и оценка будет оптимистичной", "Метрики на train не считаются"],
            answer: 1,
            why: "При overfitting результат на train высокий, но он не показывает качество на новых данных."
          },
          {
            q: "Что означает 5-fold кросс-валидация?",
            options: ["Данные делятся на 5 частей, каждая по очереди становится validation", "Модель обучается 5 раз", "Тест делится на 5 частей"],
            answer: 0,
            why: "На каждой итерации одна часть — validation, остальные четыре — train; результат — среднее пяти оценок."
          },
          {
            q: "Какая кросс-валидация подходит при дисбалансе классов?",
            options: ["K-Fold", "Stratified K-Fold", "TimeSeriesSplit"],
            answer: 1,
            why: "Stratified K-Fold сохраняет долю классов в каждой части."
          },
          {
            q: "Почему случайный shuffle опасен для временных рядов?",
            options: ["Вычисления дороги", "Будущая информация протекает в прошлое", "Метрика не считается"],
            answer: 1,
            why: "Случайное перемешивание отправляет будущие данные в train и создаёт data leakage."
          },
          {
            q: "Где выбирать гиперпараметры?",
            options: ["На тестовом наборе", "В кросс-валидации внутри train", "На всех данных"],
            answer: 1,
            why: "Test предназначен для финальной оценки; гиперпараметры выбирают CV внутри train."
          }
        ],
        summary: [
          "Train обучает модель, validation настраивает, test даёт финальную честную оценку.",
          "K-fold кросс-валидация стабильнее одного разбиения; стратификация сохраняет доли классов.",
          "Для временных рядов используют TimeSeriesSplit, без случайного shuffle.",
          "Метрику сравнивают с baseline и выбирают под бизнес-цель.",
          "Гиперпараметры выбирают в CV, затем обучают на всём train и один раз оценивают на test."
        ]
      },
      en: {
        minutes: 90,
        goals: [
          "Distinguish the roles of train, validation and test.",
          "Apply K-fold and stratified cross-validation.",
          "Choose a metric and baseline for the task type.",
          "Tune hyperparameters with GridSearchCV and evaluate on test once."
        ],
        theory: [
          {
            h: "Why not evaluate on training data?",
            p: [
              "A model can memorise training data and show a very high score on it. But we care about quality on new data. High train accuracy may reflect memorisation rather than a learned pattern.",
              "Overfitting means the model is too tailored to train and degrades on new data. Data leakage means test or future information accidentally enters training. Both inflate the score, so the split order must be strict."
            ],
            list: [
              "Train — data the model learns from.",
              "Validation — comparing models and choosing hyperparameters.",
              "Test — the final one-time honest estimate.",
              "Fit preprocessing on train only; transform test."
            ],
            note: "If you tune again after seeing test, that set is no longer a test set — it has become validation."
          },
          {
            h: "Cross-validation",
            p: [
              "With little data, a single split gives an unstable estimate. K-fold splits data into k equal parts and makes each part validation in turn. The result is the mean of k scores and their standard deviation.",
              "Stratified K-fold preserves the class proportion in each part, which matters under imbalance. Time series must not be shuffled randomly: use TimeSeriesSplit to predict the future from the past."
            ],
            table: {
              head: ["Method", "How it works", "When to use"],
              rows: [
                ["Holdout", "Train/validation/test split", "When data is plentiful"],
                ["K-Fold", "k parts, each validation in turn", "General case"],
                ["Stratified K-Fold", "Preserves class proportions", "Class imbalance"],
                ["TimeSeriesSplit", "Past predicts future", "Time series"],
                ["LOOCV", "Each record is test in turn", "Very small data"]
              ]
            },
            note: "k = 5 or 10 are common. Larger k costs more compute but gives a more stable estimate."
          },
          {
            h: "Choosing a metric for the task",
            p: [
              "Regression uses MAE, MSE, RMSE and R². MAE gives the average absolute error, MSE punishes large errors, RMSE restores the original units, and R² shows the share of explained variance.",
              "Classification uses accuracy, precision, recall, F1 and ROC-AUC. The metric must connect to the business goal: which is more expensive, a false positive (FP) or a false negative (FN)? A baseline comparison is mandatory: predicting the mean or the majority class can beat a real model."
            ],
            list: [
              "Regression: MAE is intuitive, RMSE is sensitive to large errors, R² is relative.",
              "Classification: precision controls FP, recall controls FN, F1 balances them.",
              "Without a baseline, a metric means little.",
              "Look at several metrics, not just one."
            ],
            note: "Do not choose the metric on test: test is the final check, not a model-comparison tool."
          },
          {
            h: "Model selection and hyperparameters",
            p: [
              "A hyperparameter is not learned by the model but supplied in advance: C in LogisticRegression, n_estimators in RandomForest, k in KNN. They are tuned by cross-validation: GridSearchCV tries every combination, RandomizedSearchCV samples randomly.",
              "The correct order: tune hyperparameters with CV on train, refit on all of train, then evaluate once on test. If you choose both model and hyperparameters on the same test, the estimate becomes optimistic."
            ],
            list: [
              "GridSearchCV — exhaustive search for small grids.",
              "RandomizedSearchCV — fast search in large spaces.",
              "Nested CV separates hyperparameter selection from evaluation.",
              "A learning curve shows the effect of data size; a validation curve shows the effect of a hyperparameter."
            ],
            note: "After refitting on all train, the CV score approximates expected quality but does not replace the test result."
          }
        ],
        visual: {
          title: "5-fold cross-validation",
          html: `
            <div style="max-width:600px;margin:0 auto;padding:8px 0">
              <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:11px;text-align:center">
                <div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div>
                <div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#e8edf4;color:#334155;padding:10px 4px;border-radius:4px">Train</div><div style="background:#2563eb;color:#fff;padding:10px 4px;border-radius:4px">Val</div>
              </div>
              <p style="text-align:center;margin:12px 0 0;font-size:13px;color:var(--muted,#667085)">5 iterations → 5 scores → mean and standard deviation</p>
            </div>`,
          caption: "Each row is one iteration: one part is validation, the rest are train. Every record becomes validation exactly once."
        },
        code: {
          title: "Cross-validation and GridSearchCV",
          note: "The model is evaluated with 5-fold stratified cross-validation, the hyperparameter is chosen inside train only, and test is used once at the end.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

df = pd.read_csv("penguins-files/penguins.csv")
df = df.dropna(subset=["sex", "bill_length_mm", "flipper_length_mm", "body_mass_g"])

X = df[["bill_length_mm", "flipper_length_mm", "body_mass_g"]]
y = (df["sex"] == "Male").astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X_train, y_train, cv=cv, scoring="roc_auc")
print("CV AUC:", round(scores.mean(), 3), "+/-", round(scores.std(), 3))

search = GridSearchCV(
    model, {"clf__C": [0.01, 0.1, 1, 10]}, cv=cv, scoring="roc_auc"
)
search.fit(X_train, y_train)
print("Best:", search.best_params_, round(search.best_score_, 3))
print("Test AUC:", round(roc_auc_score(y_test, search.predict_proba(X_test)[:, 1]), 3))`
        },
        quiz: [
          {
            q: "Why is training-set evaluation not enough?",
            options: ["Train is too small", "The model may memorise data, making the score optimistic", "Metrics are not computed on train"],
            answer: 1,
            why: "With overfitting the train score is high but says nothing about quality on new data."
          },
          {
            q: "What does 5-fold cross-validation mean?",
            options: ["Data is split into 5 parts, each becomes validation in turn", "The model is trained 5 times", "The test set is split into 5 parts"],
            answer: 0,
            why: "Each iteration uses one part for validation and the other four for training; the result is the mean of five scores."
          },
          {
            q: "Which cross-validation suits class imbalance?",
            options: ["K-Fold", "Stratified K-Fold", "TimeSeriesSplit"],
            answer: 1,
            why: "Stratified K-Fold preserves class proportions in each part."
          },
          {
            q: "Why is random shuffle dangerous for time series?",
            options: ["It is expensive", "Future information leaks into the past", "Metrics are not computed"],
            answer: 1,
            why: "Random shuffling puts future data into train and creates data leakage."
          },
          {
            q: "Where should hyperparameters be chosen?",
            options: ["On the test set", "In cross-validation inside train", "On all data"],
            answer: 1,
            why: "Test is for the final estimate; hyperparameters are chosen by CV within train."
          }
        ],
        summary: [
          "Train teaches the model, validation tunes it, test gives the final honest estimate.",
          "K-fold cross-validation is more stable than one split; stratification preserves class shares.",
          "Use TimeSeriesSplit for time series, never random shuffle.",
          "Compare a metric with a baseline and choose it for the business goal.",
          "Tune hyperparameters in CV, refit on all train, and evaluate on test once."
        ]
      }
    },
    8: {
      kk: {
        minutes: 100,
        goals: [
          "SVM-нің гипержазықтық, аралық және тірек векторларын түсіну.",
          "Hard margin және soft margin айырмашылығын, C параметрінің рөлін ажырату.",
          "Kernel trick арқылы сызықты емес шекара құруды түсіндіру.",
          "Масштабтаумен SVM pipeline құрып, C мен gamma-ны кросс-валидацияда баптау."
        ],
        theory: [
          {
            h: "SVM идеясы: ең кең аралық",
            p: [
              "Support Vector Machine (SVM) — жіктеу және регрессия үшін қолданылатын бақылау арқылы оқыту алгоритмі. SVM кластарды бөлетін кез келген шекараны емес, олардың арасындағы аралықты (margin) барынша үлкейтетін шекараны іздейді.",
              "Гипержазықтық — белгілер кеңістігіндегі шешім шекарасы. Сызықтық жағдайда ол wᵀx + b = 0 теңдеуімен беріледі: w — бағытты анықтайтын салмақтар, b — шекараны жылжытатын бос мүше. Шекараға ең жақын нүктелер тірек векторлар деп аталады және олар шекараның орнын анықтайды."
            ],
            list: [
              "Hyperplane — кластарды бөлетін шешім шекарасы.",
              "Support vectors — шекараға ең жақын нүктелер.",
              "Margin — шекара мен тірек векторлар арасындағы қашықтық.",
              "SVM максимизациялайтын нәрсе — дәл осы margin."
            ],
            note: "Аралық неғұрлым кең болса, модель жаңа деректерде соғұрлым тұрақты жіктеуге бейім."
          },
          {
            h: "Hard margin, soft margin және C",
            p: [
              "Hard margin модель бірде-бір қатеге рұқсат бермейді: барлық нүкте өз класының жағында болуы керек. Бұл тек деректер таза және сызықтық бөлінетін жағдайда жарайды. Шынайы деректерде шу мен ауытқыма мәндер болады, сондықтан soft margin жиі қолданылады.",
              "Soft margin кейбір нүктелердің аралыққа кіруіне немесе қате жіктелуіне рұқсат береді. C параметрі осы рұқсатты басқарады: үлкен C қателерді қатаң жазалайды, шекара күрделеніп, overfitting қаупі артады; кіші C қателерге төзімдірек, шекара қарапайым әрі аралық кеңірек болады."
            ],
            table: {
              head: ["Параметр", "Кіші мән", "Үлкен мән"],
              rows: [
                ["C", "Кең аралық, қатеге төзімді, ықтимал underfitting", "Тар аралық, қатеге қатаң, overfitting қаупі"],
                ["gamma (RBF)", "Шекара тегіс, әсер ауқымы кең", "Шекара бұралаң, әр нүктеге бейімделеді"]
              ]
            },
            note: "C үлкейткенде модель train-ге жақындайды; C кішірейткенде тұрақтылық артады. Екеуін де кросс-валидациямен тексеру керек."
          },
          {
            h: "Kernel trick",
            p: [
              "Деректерді түзу сызықпен бөлу мүмкін болмаса, SVM ядроны қолданады. Ядро деректерді жасырын түрде жоғары өлшемді кеңістікке түрлендіреді; сол кеңістікте сызықтық шекара оңай табылады, ал бастапқы кеңістікте ол қисық болып көрінеді.",
              "Kernel trick — түрлендіруді тікелей есептемей-ақ, тек нүктелер арасындағы ядролық функция мәнін қолдану. Linear ядро сызықтық бөлінетін деректерге, polynomial ядро доғалы шекараға, RBF ядро жергілікті, икемді шекараға сәйкес келеді."
            ],
            list: [
              "linear — жоғары өлшемді және сызықтық бөлінетін деректерге.",
              "poly — белгілердің өзара әрекеті маңызды болғанда.",
              "rbf — сызықты емес, күрделі шекаралар үшін әдепкі таңдау.",
              "sigmoid — сирек, нейрондық желіге ұқсас нұсқа."
            ],
            note: "RBF-те gamma шекараның «икемділігін» басқарады: үлкен gamma әр нүктені бөлек қарайды, кіші gamma тегіс шекара құрады."
          },
          {
            h: "SVM-ді дұрыс қолдану",
            p: [
              "SVM қашықтыққа негізделген, сондықтан белгілерді масштабтау өте маңызды. Масштабтаусыз үлкен диапазондағы белгі шешімді басып кетеді. StandardScaler-ді Pipeline ішінде қолдану data leakage-ты болдырмайды: scaler тек train-де fit болады.",
              "SVM негізінен бинарлық жіктеуге арналған; көпкласты жағдайда one-vs-one схемасы қолданылады. Ықтималдық қажет болса, SVC(probability=True) қосуға болады, бірақ ол қосымша есептеу талап етеді. Үлкен деректерде SVM оқыту қымбат, сондықтан LinearSVC немесе басқа алгоритм тиімдірек болуы мүмкін."
            ],
            list: [
              "Pipeline(StandardScaler → SVC) — қауіпсіз әдепкі құрылым.",
              "C мен gamma-ны GridSearchCV арқылы таңдау.",
              "Көпкласты есепте decision_function_shape='ovr' немесе one-vs-one қолданылады.",
              "Деректер өте үлкен болса, LinearSVC немесе SGDClassifier қарастыру керек."
            ],
            note: "SVM шешімін түсіндіру қиын: әсер ететін белгілерді білу үшін permutation importance немесе SHAP сияқты қосымша әдістер қажет."
          }
        ],
        visual: {
          title: "Гипержазықтық, аралық және тірек векторлар",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="SVM margin diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="100" y1="250" x2="540" y2="60" stroke="#111827" stroke-width="3"/>
              <line x1="100" y1="228" x2="540" y2="38" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <line x1="100" y1="272" x2="540" y2="82" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <circle cx="140" cy="120" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="90" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="230" cy="140" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="285" cy="105" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="325" cy="75" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="270" cy="160" r="10" fill="#2563eb" stroke="#111827" stroke-width="3"/>
              <circle cx="250" cy="230" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="300" cy="252" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="355" cy="212" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="405" cy="236" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="455" cy="202" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="330" cy="170" r="10" fill="#dc2626" stroke="#111827" stroke-width="3"/>
              <text x="330" y="120" font-size="13" fill="#111827">margin</text>
              <line x1="330" y1="128" x2="360" y2="150" stroke="#111827" stroke-width="1"/>
              <text x="390" y="255" font-size="13" fill="#dc2626">Class −1</text>
              <text x="120" y="60" font-size="13" fill="#2563eb">Class +1</text>
              <text x="430" y="105" font-size="12" fill="#475569">support vectors</text>
            </svg>`,
          caption: "Қара сызық — гипержазықтық, пунктир — аралық шекаралары, қалың жиекті нүктелер — тірек векторлар."
        },
        code: {
          title: "SVM pipeline және гиперпараметр іздеу",
          note: "Белгілер Pipeline ішінде масштабталады, C мен gamma кросс-валидацияда таңдалады, test соңында бір рет бағаланады.",
          source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("svm", SVC(kernel="rbf"))
])

grid = {
    "svm__C": [0.1, 1, 10],
    "svm__gamma": ["scale", 0.01, 0.1]
}
search = GridSearchCV(model, grid, cv=5, scoring="f1", n_jobs=-1)
search.fit(X_train, y_train)

print("Best:", search.best_params_)
print(classification_report(y_test, search.predict(X_test), digits=3))`
        },
        quiz: [
          {
            q: "SVM негізгі мақсаты қандай?",
            options: ["Барлық нүктені дәл жіктеу", "Кластар арасындағы аралықты максимизациялау", "Белгілер санын азайту"],
            answer: 1,
            why: "SVM ең кең аралықты беретін гипержазықтықты іздейді."
          },
          {
            q: "Тірек векторлар дегеніміз не?",
            options: ["Барлық оқыту нүктелері", "Шекараға ең жақын нүктелер", "Тек қате жіктелген нүктелер"],
            answer: 1,
            why: "Шекараның орнын анықтайтын ең жақын нүктелер тірек векторлар деп аталады."
          },
          {
            q: "C параметрі өте үлкен болса не болады?",
            options: ["Модель қателерге төзімдірек болады", "Модель қателерді қатаң жазалап, overfitting қаупі артады", "Аралық автоматты түрде кеңейеді"],
            answer: 1,
            why: "Үлкен C шекараны деректерге бейімдейді, нәтижесінде overfitting қаупі артады."
          },
          {
            q: "Сызықтық емес шекара үшін қай ядро жиі қолданылады?",
            options: ["linear", "rbf", "sigmoid"],
            answer: 1,
            why: "RBF ядро икемді, сызықты емес шекара құруға мүмкіндік береді."
          },
          {
            q: "SVM алдында не міндетті түрде жасалуы керек?",
            options: ["Белгілерді масштабтау", "Барлық белгілерді өшіру", "Деректерді азайту"],
            answer: 0,
            why: "SVM қашықтыққа сезімтал, сондықтан StandardScaler қажет."
          }
        ],
        summary: [
          "SVM кластарды ең кең аралықпен бөлетін гипержазықтықты іздейді.",
          "Шекараны тірек векторлар анықтайды; hard margin қатаң, soft margin шуға төзімді.",
          "C қатеге қатаңдықты, gamma RBF шекарасының икемділігін басқарады.",
          "Kernel trick сызықты емес шекараны жоғары өлшемді кеңістікте табуға мүмкіндік береді.",
          "SVM-де масштабтау міндетті, ал гиперпараметрлер кросс-валидацияда таңдалады."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Понимать гиперплоскость, отступ и опорные векторы SVM.",
          "Различать hard margin и soft margin, объяснять роль параметра C.",
          "Объяснять построение нелинейной границы через kernel trick.",
          "Строить SVM pipeline с масштабированием и настраивать C и gamma в кросс-валидации."
        ],
        theory: [
          {
            h: "Идея SVM: максимальный отступ",
            p: [
              "Support Vector Machine (SVM) — алгоритм обучения с учителем для классификации и регрессии. SVM ищет не любую границу между классами, а ту, которая максимизирует отступ (margin) между ними.",
              "Гиперплоскость — граница решения в пространстве признаков. В линейном случае она задаётся уравнением wᵀx + b = 0: w — вектор весов, задающий направление, b — смещение. Точки, ближайшие к границе, называются опорными векторами и определяют её положение."
            ],
            list: [
              "Hyperplane — граница решения, разделяющая классы.",
              "Support vectors — точки, ближайшие к границе.",
              "Margin — расстояние между границей и опорными векторами.",
              "SVM максимизирует именно этот отступ."
            ],
            note: "Чем шире отступ, тем устойчивее модель обычно классифицирует новые данные."
          },
          {
            h: "Hard margin, soft margin и C",
            p: [
              "Hard margin не допускает ни одной ошибки: каждая точка должна находиться на своей стороне. Это работает только на чистых линейно разделимых данных. В реальных данных есть шум и выбросы, поэтому чаще используют soft margin.",
              "Soft margin разрешает части точек попадать в отступ или классифицироваться неверно. Параметр C управляет этим допуском: большой C строго штрафует ошибки, граница усложняется и растёт риск overfitting; малый C терпимее к ошибкам, граница проще, а отступ шире."
            ],
            table: {
              head: ["Параметр", "Малое значение", "Большое значение"],
              rows: [
                ["C", "Широкий отступ, терпимость к ошибкам, риск underfitting", "Узкий отступ, строгий штраф, риск overfitting"],
                ["gamma (RBF)", "Гладкая граница, широкое влияние точки", "Извилистая граница, подстройка под каждую точку"]
              ]
            },
            note: "При росте C модель ближе к train; при уменьшении C растёт устойчивость. Оба значения проверяют кросс-валидацией."
          },
          {
            h: "Kernel trick",
            p: [
              "Если данные нельзя разделить прямой, SVM использует ядро. Ядро неявно переводит данные в пространство большей размерности; там линейная граница находится проще, а в исходном пространстве она выглядит кривой.",
              "Kernel trick — вычисление только значений ядровой функции между точками без явного преобразования. Linear подходит для линейно разделимых данных, polynomial даёт дуговую границу, RBF строит гибкую локальную границу."
            ],
            list: [
              "linear — для высокоразмерных и линейно разделимых данных.",
              "poly — когда важны взаимодействия признаков.",
              "rbf — стандартный выбор для сложных нелинейных границ.",
              "sigmoid — редкий вариант, похожий на нейросетевой."
            ],
            note: "В RBF параметр gamma управляет гибкостью: большая gamma рассматривает каждую точку отдельно, малая даёт гладкую границу."
          },
          {
            h: "Как применять SVM правильно",
            p: [
              "SVM основан на расстояниях, поэтому масштабирование признаков критично. Без масштабирования признак с большим диапазоном подавляет решение. StandardScaler внутри Pipeline предотвращает data leakage: scaler обучается только на train.",
              "SVM в основном предназначен для бинарной классификации; для нескольких классов используется схема one-vs-one. Если нужны вероятности, можно включить SVC(probability=True), но это требует дополнительных вычислений. На больших данных обучение SVM дорого, поэтому LinearSVC или другой алгоритм может быть выгоднее."
            ],
            list: [
              "Pipeline(StandardScaler → SVC) — безопасная базовая схема.",
              "C и gamma выбирают через GridSearchCV.",
              "В мультиклассе используют decision_function_shape='ovr' или one-vs-one.",
              "При очень больших данных рассматривают LinearSVC или SGDClassifier."
            ],
            note: "Решение SVM трудно интерпретировать: для важности признаков нужны permutation importance или SHAP."
          }
        ],
        visual: {
          title: "Гиперплоскость, отступ и опорные векторы",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="SVM margin diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="100" y1="250" x2="540" y2="60" stroke="#111827" stroke-width="3"/>
              <line x1="100" y1="228" x2="540" y2="38" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <line x1="100" y1="272" x2="540" y2="82" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <circle cx="140" cy="120" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="90" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="230" cy="140" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="285" cy="105" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="325" cy="75" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="270" cy="160" r="10" fill="#2563eb" stroke="#111827" stroke-width="3"/>
              <circle cx="250" cy="230" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="300" cy="252" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="355" cy="212" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="405" cy="236" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="455" cy="202" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="330" cy="170" r="10" fill="#dc2626" stroke="#111827" stroke-width="3"/>
              <text x="330" y="120" font-size="13" fill="#111827">margin</text>
              <line x1="330" y1="128" x2="360" y2="150" stroke="#111827" stroke-width="1"/>
              <text x="390" y="255" font-size="13" fill="#dc2626">Class −1</text>
              <text x="120" y="60" font-size="13" fill="#2563eb">Class +1</text>
              <text x="430" y="105" font-size="12" fill="#475569">support vectors</text>
            </svg>`,
          caption: "Чёрная линия — гиперплоскость, пунктир — границы отступа, точки с толстой обводкой — опорные векторы."
        },
        code: {
          title: "SVM pipeline и поиск гиперпараметров",
          note: "Признаки масштабируются внутри Pipeline, C и gamma выбираются кросс-валидацией, test оценивается один раз в конце.",
          source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("svm", SVC(kernel="rbf"))
])

grid = {
    "svm__C": [0.1, 1, 10],
    "svm__gamma": ["scale", 0.01, 0.1]
}
search = GridSearchCV(model, grid, cv=5, scoring="f1", n_jobs=-1)
search.fit(X_train, y_train)

print("Best:", search.best_params_)
print(classification_report(y_test, search.predict(X_test), digits=3))`
        },
        quiz: [
          {
            q: "Какова основная цель SVM?",
            options: ["Точно классифицировать все точки", "Максимизировать отступ между классами", "Уменьшить число признаков"],
            answer: 1,
            why: "SVM ищет гиперплоскость с максимально широким отступом."
          },
          {
            q: "Что такое опорные векторы?",
            options: ["Все обучающие точки", "Точки, ближайшие к границе", "Только неверно классифицированные точки"],
            answer: 1,
            why: "Ближайшие к границе точки определяют её положение и называются опорными векторами."
          },
          {
            q: "Что происходит при очень большом C?",
            options: ["Модель терпимее к ошибкам", "Модель строго штрафует ошибки, растёт риск overfitting", "Отступ автоматически расширяется"],
            answer: 1,
            why: "Большой C подстраивает границу под данные, повышая риск overfitting."
          },
          {
            q: "Какое ядро часто используют для нелинейной границы?",
            options: ["linear", "rbf", "sigmoid"],
            answer: 1,
            why: "RBF создаёт гибкую нелинейную границу."
          },
          {
            q: "Что обязательно сделать перед SVM?",
            options: ["Масштабировать признаки", "Удалить все признаки", "Уменьшить данные"],
            answer: 0,
            why: "SVM чувствителен к расстояниям, поэтому нужен StandardScaler."
          }
        ],
        summary: [
          "SVM ищет гиперплоскость с максимальным отступом между классами.",
          "Границу определяют опорные векторы; hard margin строгий, soft margin устойчив к шуму.",
          "C управляет строгостью к ошибкам, gamma — гибкостью RBF-границы.",
          "Kernel trick позволяет находить нелинейную границу в пространстве большей размерности.",
          "Масштабирование обязательно, а гиперпараметры выбирают кросс-валидацией."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Understand the SVM hyperplane, margin and support vectors.",
          "Distinguish hard margin from soft margin and explain the role of C.",
          "Explain nonlinear boundaries through the kernel trick.",
          "Build a scaled SVM pipeline and tune C and gamma with cross-validation."
        ],
        theory: [
          {
            h: "The SVM idea: the widest margin",
            p: [
              "Support Vector Machine (SVM) is a supervised learning algorithm for classification and regression. SVM does not settle for any boundary between classes; it seeks the one that maximises the margin between them.",
              "A hyperplane is the decision boundary in feature space. In the linear case it is wᵀx + b = 0: w is the weight vector defining direction, b is the bias. The points closest to the boundary are support vectors, and they determine its position."
            ],
            list: [
              "Hyperplane — the decision boundary separating classes.",
              "Support vectors — the points closest to the boundary.",
              "Margin — the distance between the boundary and support vectors.",
              "SVM maximises exactly this margin."
            ],
            note: "A wider margin usually gives more stable classification on new data."
          },
          {
            h: "Hard margin, soft margin and C",
            p: [
              "A hard margin allows no errors: every point must lie on its own side. It only works on clean, linearly separable data. Real data contains noise and outliers, so soft margin is more common.",
              "A soft margin lets some points enter the margin or be misclassified. C controls this tolerance: a large C punishes errors strictly, complicates the boundary and raises overfitting risk; a small C is more tolerant, with a simpler boundary and a wider margin."
            ],
            table: {
              head: ["Parameter", "Small value", "Large value"],
              rows: [
                ["C", "Wide margin, tolerant of errors, underfitting risk", "Narrow margin, strict penalty, overfitting risk"],
                ["gamma (RBF)", "Smooth boundary, broad point influence", "Wiggly boundary, fits each point"]
              ]
            },
            note: "Raising C moves the model closer to train; lowering C improves stability. Tune both with cross-validation."
          },
          {
            h: "Kernel trick",
            p: [
              "When data cannot be separated by a straight line, SVM uses a kernel. A kernel implicitly maps data into a higher-dimensional space; there a linear boundary is easier to find, while in the original space it looks curved.",
              "The kernel trick computes only kernel values between points without an explicit transformation. Linear suits linearly separable data, polynomial gives a curved boundary, and RBF builds a flexible local boundary."
            ],
            list: [
              "linear — for high-dimensional, linearly separable data.",
              "poly — when feature interactions matter.",
              "rbf — the default for complex nonlinear boundaries.",
              "sigmoid — a rare neural-network-like option."
            ],
            note: "In RBF, gamma controls flexibility: a large gamma treats each point separately, a small one gives a smooth boundary."
          },
          {
            h: "Using SVM correctly",
            p: [
              "SVM is distance-based, so feature scaling is critical. Without scaling, a feature with a large range dominates the decision. Using StandardScaler inside a Pipeline prevents data leakage: the scaler fits on train only.",
              "SVM is mainly designed for binary classification; for multiple classes it uses a one-vs-one scheme. If probabilities are needed, set SVC(probability=True), which costs extra computation. On large data, training is expensive, so LinearSVC or another algorithm may be better."
            ],
            list: [
              "Pipeline(StandardScaler → SVC) is a safe baseline.",
              "Choose C and gamma with GridSearchCV.",
              "For multiclass, use decision_function_shape='ovr' or one-vs-one.",
              "For very large data, consider LinearSVC or SGDClassifier."
            ],
            note: "SVM decisions are hard to interpret: use permutation importance or SHAP to understand feature effects."
          }
        ],
        visual: {
          title: "Hyperplane, margin and support vectors",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="SVM margin diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="100" y1="250" x2="540" y2="60" stroke="#111827" stroke-width="3"/>
              <line x1="100" y1="228" x2="540" y2="38" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <line x1="100" y1="272" x2="540" y2="82" stroke="#64748b" stroke-width="1.5" stroke-dasharray="7 5"/>
              <circle cx="140" cy="120" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="90" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="230" cy="140" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="285" cy="105" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="325" cy="75" r="8" fill="#2563eb" opacity=".85"/>
              <circle cx="270" cy="160" r="10" fill="#2563eb" stroke="#111827" stroke-width="3"/>
              <circle cx="250" cy="230" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="300" cy="252" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="355" cy="212" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="405" cy="236" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="455" cy="202" r="8" fill="#dc2626" opacity=".85"/>
              <circle cx="330" cy="170" r="10" fill="#dc2626" stroke="#111827" stroke-width="3"/>
              <text x="330" y="120" font-size="13" fill="#111827">margin</text>
              <line x1="330" y1="128" x2="360" y2="150" stroke="#111827" stroke-width="1"/>
              <text x="390" y="255" font-size="13" fill="#dc2626">Class −1</text>
              <text x="120" y="60" font-size="13" fill="#2563eb">Class +1</text>
              <text x="430" y="105" font-size="12" fill="#475569">support vectors</text>
            </svg>`,
          caption: "The black line is the hyperplane, dashed lines are margin boundaries, and thick-outlined points are support vectors."
        },
        code: {
          title: "SVM pipeline and hyperparameter search",
          note: "Features are scaled inside a Pipeline, C and gamma are chosen by cross-validation, and test is evaluated once at the end.",
          source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("svm", SVC(kernel="rbf"))
])

grid = {
    "svm__C": [0.1, 1, 10],
    "svm__gamma": ["scale", 0.01, 0.1]
}
search = GridSearchCV(model, grid, cv=5, scoring="f1", n_jobs=-1)
search.fit(X_train, y_train)

print("Best:", search.best_params_)
print(classification_report(y_test, search.predict(X_test), digits=3))`
        },
        quiz: [
          {
            q: "What is the main goal of SVM?",
            options: ["Classify every point exactly", "Maximise the margin between classes", "Reduce the number of features"],
            answer: 1,
            why: "SVM finds the hyperplane with the widest margin."
          },
          {
            q: "What are support vectors?",
            options: ["All training points", "The points closest to the boundary", "Only misclassified points"],
            answer: 1,
            why: "The closest points determine the boundary and are called support vectors."
          },
          {
            q: "What happens with a very large C?",
            options: ["The model tolerates errors more", "It penalises errors strictly and raises overfitting risk", "The margin widens automatically"],
            answer: 1,
            why: "A large C fits the boundary to the data and increases overfitting risk."
          },
          {
            q: "Which kernel is often used for a nonlinear boundary?",
            options: ["linear", "rbf", "sigmoid"],
            answer: 1,
            why: "RBF creates a flexible nonlinear boundary."
          },
          {
            q: "What must be done before SVM?",
            options: ["Scale the features", "Remove all features", "Reduce the data"],
            answer: 0,
            why: "SVM is distance-sensitive, so StandardScaler is required."
          }
        ],
        summary: [
          "SVM finds the hyperplane with the widest margin between classes.",
          "Support vectors determine the boundary; hard margin is strict, soft margin tolerates noise.",
          "C controls error strictness, gamma controls RBF boundary flexibility.",
          "The kernel trick finds nonlinear boundaries in a higher-dimensional space.",
          "Scaling is mandatory, and hyperparameters are tuned by cross-validation."
        ]
      }
    },
    9: {
      kk: {
        minutes: 100,
        goals: [
          "Decision Tree құрылымын, бөлу критерийлерін және негізгі гиперпараметрлерін түсіну.",
          "Random Forest-тың bagging арқылы дисперсияны азайтуын түсіндіру.",
          "Gradient Boosting-тің қалдықтарды бірізді түзетуін түсіну.",
          "Ағаш негізіндегі модельдерді баптап, feature importance арқылы түсіндіру."
        ],
        theory: [
          {
            h: "Decision Tree: ағаш құрылымы және бөлу",
            p: [
              "Decision Tree — деректерді шарттар бойынша иерархиялық топтарға бөлетін бақылау арқылы оқыту алгоритмі. Түбір түйіннен бастап әр ішкі түйінде бір белгіге шарт тексеріледі, тармақтар нәтиже бағытын көрсетеді, ал жапырақ түйінде соңғы болжам болады.",
              "Жіктеуде ағаш топтарды мүмкіндігінше «таза» ететін бөлуді таңдайды. Gini impurity 0-ге жақын болса, түйінде бір класс басым; мән үлкейген сайын кластар араласады. Энтропия да осы тазалықсыздықты өлшейді, бірақ логарифм қолданады. Регрессияда бөлу критерийі ретінде MSE немесе MAE қолданылады, ал жапырақта сол топтағы мәндердің орташасы қайтарылады."
            ],
            list: [
              "Ішкі түйін — белгі бойынша шарт.",
              "Тармақ — шарттың нәтижесі.",
              "Жапырақ — соңғы класс немесе сандық болжам.",
              "Терең ағаш train-ді жаттап, overfitting-ке бейім."
            ],
            note: "max_depth, min_samples_split, min_samples_leaf және ccp_alpha ағаштың күрделілігін шектеп, overfitting-ті азайтады."
          },
          {
            h: "Random Forest: bagging",
            p: [
              "Random Forest — көптеген шешім ағаштарының ансамблі. Әр ағаш bootstrap үлгісінде (қайтарумен кездейсоқ іріктеу) оқытылады және әр бөлуде белгілердің кездейсоқ бөлігін ғана қарастырады. Бұл ағаштардың корреляциясын азайтады.",
              "Жеке ағаштың дисперсиясы жоғары, бірақ көп ағаштың орташа дауысы тұрақтырақ болады. Random Forest негізінен variance-ты азайтады, ал bias-ты тым төмендетпейді. OOB (out-of-bag) бағасы қосымша validation ретінде қолданылады."
            ],
            list: [
              "Bootstrap — әр ағашқа әртүрлі іріктеме.",
              "max_features — әр бөлуде қаралатын белгілер саны.",
              "n_estimators — ағаштар саны; көбейткенде тұрақтылық артады.",
              "OOB score — қосымша тестсіз бағалау мүмкіндігі."
            ],
            note: "Random Forest scaling қажет етпейді және шуға Decision Tree-ге қарағанда төзімдірек, бірақ интерпретациясы қиынырақ."
          },
          {
            h: "Gradient Boosting және XGBoost",
            p: [
              "Gradient Boosting ағаштарды бірізді оқытады: әр жаңа ағаш алдыңғы ансамбльдің қалдық қатесін түзетуге тырысады. Бірінші ағаш бастапқы болжам жасайды, келесі ағаштар қалдықты болжайды, ал олардың түзетулері learning_rate-ке көбейтіліп, жалпы болжамға қосылады.",
              "learning_rate кіші болса, әр ағаштың үлесі аз, модель баяу үйренеді және көбірек ағаш қажет; үлкен болса, жылдам үйренеді, бірақ overfitting қаупі артады. XGBoost — Gradient Boosting-тің реттеу, early stopping және жылдамдық жағынан жақсартылған іске асырылуы."
            ],
            table: {
              head: ["Модель", "Күшті жағы", "Әлсіз жағы"],
              rows: [
                ["Decision Tree", "Түсіндіру оңай, дайындық аз", "Overfitting-ке бейім, дисперсия жоғары"],
                ["Random Forest", "Тұрақты, шуға төзімді, баптау қарапайым", "Интерпретация қиын, үлкен модель"],
                ["Gradient Boosting", "Көбіне ең жоғары дәлдік", "Баптауға сезімтал, баяу оқиды"]
              ]
            },
            note: "Boosting-та learning_rate мен n_estimators бірге бапталады: кіші rate әдетте көбірек ағаш талап етеді."
          },
          {
            h: "Тәжірибеде қалай таңдау керек?",
            p: [
              "Ағаш негізіндегі модельдер масштабтауды қажет етпейді және кестелік деректерде күшті. Decision Tree — ережелерді түсіндіру керек болғанда, Random Forest — аз баптаумен тұрақты baseline керек болғанда, Gradient Boosting/XGBoost — максималды дәлдік маңызды болғанда қолайлы.",
              "Түсіндіру үшін feature_importances_ пайдалы, бірақ ол корреляцияланған белгілерде адастыруы мүмкін; сенімдірек әдіс — permutation importance немесе SHAP. Кросс-валидация, early stopping және қарапайым модельмен салыстыру әрдайым керек."
            ],
            list: [
              "Кестелік деректерде ағаш ансамбльдері жиі мықты.",
              "Random Forest — сенімді әдепкі таңдау.",
              "XGBoost — реттеу мен early stopping арқылы дәлдікті арттырады.",
              "Feature importance модельдің себеп-салдарын дәлелдемейді."
            ],
            note: "Деректер өте үлкен болса, гистограммаға негізделген HistGradientBoostingClassifier жылдамырақ балама бола алады."
          }
        ],
        visual: {
          title: "Шешім ағашының құрылымы",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="Decision tree diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="300" y1="70" x2="180" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="300" y1="70" x2="420" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="110" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="250" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="350" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="490" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <rect x="210" y="35" width="180" height="46" rx="8" fill="#2563eb"/>
              <text x="300" y="63" text-anchor="middle" font-size="13" fill="#fff">Жас &lt; 30?</text>
              <rect x="105" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="180" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Табыс &gt; 50k?</text>
              <rect x="345" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="420" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Несие тарихы?</text>
              <rect x="55" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="110" y="260" text-anchor="middle" font-size="12" fill="#166534">Иә → беру</text>
              <rect x="195" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="250" y="260" text-anchor="middle" font-size="12" fill="#991b1b">Жоқ → бермеу</text>
              <rect x="295" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="350" y="260" text-anchor="middle" font-size="12" fill="#166534">Жақсы → беру</text>
              <rect x="435" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="490" y="260" text-anchor="middle" font-size="12" fill="#991b1b">Нашар → бермеу</text>
            </svg>`,
          caption: "Ішкі түйіндер сұрақ қояды, тармақтар жауапты бөледі, жапырақтар соңғы шешімді береді."
        },
        code: {
          title: "Random Forest және Gradient Boosting",
          note: "Екі ансамбль бір деректерде салыстырылады; ағаштар масштабтауды қажет етпейді, ал feature importance ең әсерлі белгілерді көрсетеді.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

df = pd.read_csv("penguins-files/penguins.csv").dropna()
X = df[["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]]
y = df["species"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=300, max_depth=5, random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        n_estimators=200, learning_rate=0.05, max_depth=3, random_state=42
    )
}

for name, model in models.items():
    cv = cross_val_score(model, X_train, y_train, cv=5, scoring="accuracy")
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    print(name, "CV:", round(cv.mean(), 3), "Test:", round(accuracy_score(y_test, pred), 3))

rf = models["Random Forest"]
print(pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False))`
        },
        quiz: [
          {
            q: "Gini impurity 0 болса, түйін қандай?",
            options: ["Толық аралас", "Толық таза", "Бос"],
            answer: 1,
            why: "Gini 0 — түйіндегі барлық нысан бір класқа жатады."
          },
          {
            q: "Random Forest дисперсияны қалай азайтады?",
            options: ["Бір терең ағаш құру арқылы", "Bootstrap және кездейсоқ белгі іріктеу арқылы", "Барлық белгілерді өшіру арқылы"],
            answer: 1,
            why: "Әртүрлі ағаштардың қателері орташаланып, дисперсия төмендейді."
          },
          {
            q: "Gradient Boosting-те әр жаңа ағаш нені түзетеді?",
            options: ["Алдыңғы ансамбльдің қалдық қатесін", "Тек бірінші белгіні", "Деректердің өлшемін"],
            answer: 0,
            why: "Әр ағаш алдыңғы модельдердің қалдықтарын болжауға оқытылады."
          },
          {
            q: "learning_rate кішірейсе, әдетте не қажет?",
            options: ["Аз ағаш", "Көбірек ағаш", "Масштабтау"],
            answer: 1,
            why: "Кіші rate әр ағаштың үлесін азайтады, сондықтан көбірек ағаш керек."
          },
          {
            q: "Терең Decision Tree-дің негізгі қаупі қандай?",
            options: ["Overfitting", "Деректер жоғалуы", "Масштабтау қажеттілігі"],
            answer: 0,
            why: "Терең ағаш шуды жаттап, жаңа деректерде нашарлайды."
          }
        ],
        summary: [
          "Decision Tree шарттар арқылы деректерді бөліп, Gini немесе MSE критерийін қолданады.",
          "Терең ағаш overfitting-ке бейім; max_depth және min_samples_leaf оны шектейді.",
          "Random Forest bootstrap және кездейсоқ белгілер арқылы дисперсияны азайтады.",
          "Gradient Boosting қалдықтарды бірізді түзетеді; learning_rate мен n_estimators бірге бапталады.",
          "Feature importance пайдалы, бірақ себеп-салдарды дәлелдемейді; SHAP сенімдірек."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Понимать структуру Decision Tree, критерии разбиения и основные гиперпараметры.",
          "Объяснять, как Random Forest снижает дисперсию через bagging.",
          "Понимать последовательное исправление остатков в Gradient Boosting.",
          "Настраивать древовидные модели и интерпретировать их через feature importance."
        ],
        theory: [
          {
            h: "Decision Tree: структура и разбиение",
            p: [
              "Decision Tree — алгоритм обучения с учителем, который иерархически делит данные по условиям. От корневого узла каждый внутренний узел проверяет условие по признаку, ветви показывают направление, а лист содержит итоговый прогноз.",
              "В классификации дерево выбирает разбиение, делающее группы максимально «чистыми». Gini impurity близка к 0, если в узле преобладает один класс; чем выше значение, тем сильнее перемешаны классы. Энтропия измеряет ту же нечистоту, но использует логарифм. В регрессии критерием служит MSE или MAE, а лист возвращает среднее значение группы."
            ],
            list: [
              "Внутренний узел — условие по признаку.",
              "Ветвь — результат условия.",
              "Лист — итоговый класс или числовой прогноз.",
              "Глубокое дерево запоминает train и склонно к overfitting."
            ],
            note: "max_depth, min_samples_split, min_samples_leaf и ccp_alpha ограничивают сложность и снижают overfitting."
          },
          {
            h: "Random Forest: bagging",
            p: [
              "Random Forest — ансамбль множества решающих деревьев. Каждое дерево обучается на bootstrap-выборке (случайная выборка с возвращением) и на каждом разбиении рассматривает только случайную часть признаков. Это снижает корреляцию деревьев.",
              "Дисперсия отдельного дерева высока, но усреднение голосов многих деревьев даёт более устойчивый результат. Random Forest в основном снижает variance, а не bias. OOB (out-of-bag) оценка используется как дополнительная валидация."
            ],
            list: [
              "Bootstrap — у каждого дерева своя выборка.",
              "max_features — число признаков, рассматриваемых при разбиении.",
              "n_estimators — число деревьев; больше деревьев даёт стабильность.",
              "OOB score — дополнительная оценка без отдельного теста."
            ],
            note: "Random Forest не требует масштабирования и устойчивее к шуму, чем одно дерево, но интерпретировать его сложнее."
          },
          {
            h: "Gradient Boosting и XGBoost",
            p: [
              "Gradient Boosting обучает деревья последовательно: каждое новое дерево пытается исправить остаточную ошибку предыдущего ансамбля. Первое дерево даёт базовый прогноз, следующие предсказывают остаток, а их поправки умножаются на learning_rate и добавляются к общему прогнозу.",
              "При малом learning_rate вклад каждого дерева невелик, модель учится медленно и требует больше деревьев; при большом — учится быстрее, но растёт риск overfitting. XGBoost — улучшенная реализация Gradient Boosting с регуляризацией, early stopping и оптимизацией скорости."
            ],
            table: {
              head: ["Модель", "Сильная сторона", "Слабая сторона"],
              rows: [
                ["Decision Tree", "Легко интерпретировать, мало подготовки", "Склонно к overfitting, высокая дисперсия"],
                ["Random Forest", "Устойчиво, терпимо к шуму, просто настраивать", "Сложно интерпретировать, большая модель"],
                ["Gradient Boosting", "Часто максимальная точность", "Чувствительно к настройке, медленно обучается"]
              ]
            },
            note: "В boosting learning_rate и n_estimators настраивают вместе: малый rate обычно требует больше деревьев."
          },
          {
            h: "Как выбирать на практике",
            p: [
              "Древовидные модели не требуют масштабирования и сильны на табличных данных. Decision Tree подходит, когда нужно объяснить правила; Random Forest — когда нужен устойчивый baseline с минимумом настройки; Gradient Boosting/XGBoost — когда важна максимальная точность.",
              "Для интерпретации полезна feature_importances_, но при коррелированных признаках она может вводить в заблуждение; надёжнее permutation importance или SHAP. Кросс-валидация, early stopping и сравнение с простой моделью нужны всегда."
            ],
            list: [
              "На табличных данных ансамбли деревьев часто сильны.",
              "Random Forest — надёжный выбор по умолчанию.",
              "XGBoost повышает точность за счёт регуляризации и early stopping.",
              "Feature importance не доказывает причинно-следственную связь."
            ],
            note: "На очень больших данных HistGradientBoostingClassifier может быть более быстрой альтернативой."
          }
        ],
        visual: {
          title: "Структура решающего дерева",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="Decision tree diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="300" y1="70" x2="180" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="300" y1="70" x2="420" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="110" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="250" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="350" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="490" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <rect x="210" y="35" width="180" height="46" rx="8" fill="#2563eb"/>
              <text x="300" y="63" text-anchor="middle" font-size="13" fill="#fff">Возраст &lt; 30?</text>
              <rect x="105" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="180" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Доход &gt; 50k?</text>
              <rect x="345" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="420" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Кредитная история?</text>
              <rect x="55" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="110" y="260" text-anchor="middle" font-size="12" fill="#166534">Да → выдать</text>
              <rect x="195" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="250" y="260" text-anchor="middle" font-size="12" fill="#991b1b">Нет → отказ</text>
              <rect x="295" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="350" y="260" text-anchor="middle" font-size="12" fill="#166534">Хорошая → выдать</text>
              <rect x="435" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="490" y="260" text-anchor="middle" font-size="12" fill="#991b1b">Плохая → отказ</text>
            </svg>`,
          caption: "Внутренние узлы задают вопросы, ветви делят по ответам, листья дают итоговое решение."
        },
        code: {
          title: "Random Forest и Gradient Boosting",
          note: "Два ансамбля сравниваются на одних данных; деревья не требуют масштабирования, а feature importance показывает самые влиятельные признаки.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

df = pd.read_csv("penguins-files/penguins.csv").dropna()
X = df[["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]]
y = df["species"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=300, max_depth=5, random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        n_estimators=200, learning_rate=0.05, max_depth=3, random_state=42
    )
}

for name, model in models.items():
    cv = cross_val_score(model, X_train, y_train, cv=5, scoring="accuracy")
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    print(name, "CV:", round(cv.mean(), 3), "Test:", round(accuracy_score(y_test, pred), 3))

rf = models["Random Forest"]
print(pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False))`
        },
        quiz: [
          {
            q: "Если Gini impurity равна 0, узел какой?",
            options: ["Полностью смешанный", "Полностью чистый", "Пустой"],
            answer: 1,
            why: "Gini 0 означает, что все объекты узла относятся к одному классу."
          },
          {
            q: "Как Random Forest снижает дисперсию?",
            options: ["Строит одно глубокое дерево", "Через bootstrap и случайный выбор признаков", "Удаляет все признаки"],
            answer: 1,
            why: "Ошибки разных деревьев усредняются, и дисперсия снижается."
          },
          {
            q: "Что исправляет каждое новое дерево в Gradient Boosting?",
            options: ["Остаточную ошибку предыдущего ансамбля", "Только первый признак", "Размер данных"],
            answer: 0,
            why: "Каждое дерево обучается предсказывать остатки предыдущих моделей."
          },
          {
            q: "Что обычно нужно при уменьшении learning_rate?",
            options: ["Меньше деревьев", "Больше деревьев", "Масштабирование"],
            answer: 1,
            why: "Малый rate уменьшает вклад каждого дерева, поэтому нужно больше деревьев."
          },
          {
            q: "Главный риск очень глубокого Decision Tree?",
            options: ["Overfitting", "Потеря данных", "Необходимость масштабирования"],
            answer: 0,
            why: "Глубокое дерево запоминает шум и хуже работает на новых данных."
          }
        ],
        summary: [
          "Decision Tree делит данные условиями и использует Gini или MSE.",
          "Глубокое дерево склонно к overfitting; max_depth и min_samples_leaf ограничивают его.",
          "Random Forest снижает дисперсию через bootstrap и случайные признаки.",
          "Gradient Boosting последовательно исправляет остатки; learning_rate и n_estimators настраивают вместе.",
          "Feature importance полезна, но не доказывает причинность; SHAP надёжнее."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Understand Decision Tree structure, split criteria and key hyperparameters.",
          "Explain how Random Forest reduces variance through bagging.",
          "Understand sequential residual correction in Gradient Boosting.",
          "Tune tree-based models and interpret them with feature importance."
        ],
        theory: [
          {
            h: "Decision Tree: structure and splits",
            p: [
              "A Decision Tree is a supervised algorithm that hierarchically partitions data by conditions. Starting at the root, each internal node tests a feature condition, branches show the outcome, and leaves hold the final prediction.",
              "For classification, the tree chooses splits that make groups as pure as possible. Gini impurity is near 0 when one class dominates a node; higher values mean classes are mixed. Entropy measures the same impurity but uses logarithms. For regression, the criterion is MSE or MAE, and a leaf returns the group mean."
            ],
            list: [
              "Internal node — a condition on a feature.",
              "Branch — the outcome of the condition.",
              "Leaf — the final class or numeric prediction.",
              "A deep tree memorises train and is prone to overfitting."
            ],
            note: "max_depth, min_samples_split, min_samples_leaf and ccp_alpha limit complexity and reduce overfitting."
          },
          {
            h: "Random Forest: bagging",
            p: [
              "Random Forest is an ensemble of many decision trees. Each tree is trained on a bootstrap sample (random sampling with replacement) and considers only a random subset of features at each split. This reduces correlation between trees.",
              "A single tree has high variance, but averaging many tree votes is more stable. Random Forest mainly reduces variance rather than bias. The out-of-bag (OOB) score provides an extra validation estimate."
            ],
            list: [
              "Bootstrap — each tree gets a different sample.",
              "max_features — number of features considered at a split.",
              "n_estimators — number of trees; more trees improve stability.",
              "OOB score — extra evaluation without a separate test set."
            ],
            note: "Random Forest needs no scaling and is more noise-tolerant than a single tree, but it is harder to interpret."
          },
          {
            h: "Gradient Boosting and XGBoost",
            p: [
              "Gradient Boosting trains trees sequentially: each new tree tries to correct the residual error of the previous ensemble. The first tree makes a baseline prediction, later trees predict the residual, and their corrections are multiplied by learning_rate and added to the total.",
              "A small learning_rate gives each tree little weight, so the model learns slowly and needs more trees; a large one learns faster but raises overfitting risk. XGBoost is an improved Gradient Boosting implementation with regularisation, early stopping and speed optimisations."
            ],
            table: {
              head: ["Model", "Strength", "Weakness"],
              rows: [
                ["Decision Tree", "Easy to interpret, little preparation", "Prone to overfitting, high variance"],
                ["Random Forest", "Stable, noise-tolerant, simple to tune", "Hard to interpret, large model"],
                ["Gradient Boosting", "Often the highest accuracy", "Sensitive to tuning, slow to train"]
              ]
            },
            note: "In boosting, learning_rate and n_estimators are tuned together: a small rate usually needs more trees."
          },
          {
            h: "How to choose in practice",
            p: [
              "Tree-based models need no scaling and are strong on tabular data. Decision Tree fits when rules must be explained; Random Forest when a stable baseline with little tuning is needed; Gradient Boosting/XGBoost when maximum accuracy matters.",
              "feature_importances_ helps interpretation, but can mislead with correlated features; permutation importance or SHAP is more reliable. Cross-validation, early stopping and comparison with a simple model are always necessary."
            ],
            list: [
              "Tree ensembles are often strong on tabular data.",
              "Random Forest is a reliable default.",
              "XGBoost improves accuracy with regularisation and early stopping.",
              "Feature importance does not prove causality."
            ],
            note: "On very large data, HistGradientBoostingClassifier can be a faster alternative."
          }
        ],
        visual: {
          title: "Decision tree structure",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="Decision tree diagram" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <line x1="300" y1="70" x2="180" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="300" y1="70" x2="420" y2="140" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="110" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="180" y1="170" x2="250" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="350" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <line x1="420" y1="170" x2="490" y2="235" stroke="#94a3b8" stroke-width="2"/>
              <rect x="210" y="35" width="180" height="46" rx="8" fill="#2563eb"/>
              <text x="300" y="63" text-anchor="middle" font-size="13" fill="#fff">Age &lt; 30?</text>
              <rect x="105" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="180" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Income &gt; 50k?</text>
              <rect x="345" y="140" width="150" height="42" rx="8" fill="#dbeafe" stroke="#2563eb"/>
              <text x="420" y="166" text-anchor="middle" font-size="12" fill="#1e3a8a">Credit history?</text>
              <rect x="55" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="110" y="260" text-anchor="middle" font-size="12" fill="#166534">Yes → approve</text>
              <rect x="195" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="250" y="260" text-anchor="middle" font-size="12" fill="#991b1b">No → reject</text>
              <rect x="295" y="235" width="110" height="40" rx="8" fill="#dcfce7" stroke="#16a34a"/>
              <text x="350" y="260" text-anchor="middle" font-size="12" fill="#166534">Good → approve</text>
              <rect x="435" y="235" width="110" height="40" rx="8" fill="#fee2e2" stroke="#dc2626"/>
              <text x="490" y="260" text-anchor="middle" font-size="12" fill="#991b1b">Bad → reject</text>
            </svg>`,
          caption: "Internal nodes ask questions, branches split by answers, and leaves give the final decision."
        },
        code: {
          title: "Random Forest and Gradient Boosting",
          note: "Two ensembles are compared on the same data; trees need no scaling, and feature importance shows the most influential features.",
          source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

df = pd.read_csv("penguins-files/penguins.csv").dropna()
X = df[["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]]
y = df["species"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=300, max_depth=5, random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        n_estimators=200, learning_rate=0.05, max_depth=3, random_state=42
    )
}

for name, model in models.items():
    cv = cross_val_score(model, X_train, y_train, cv=5, scoring="accuracy")
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    print(name, "CV:", round(cv.mean(), 3), "Test:", round(accuracy_score(y_test, pred), 3))

rf = models["Random Forest"]
print(pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False))`
        },
        quiz: [
          {
            q: "If Gini impurity is 0, what is the node?",
            options: ["Fully mixed", "Fully pure", "Empty"],
            answer: 1,
            why: "Gini 0 means every object in the node belongs to one class."
          },
          {
            q: "How does Random Forest reduce variance?",
            options: ["By building one deep tree", "Through bootstrap and random feature selection", "By removing all features"],
            answer: 1,
            why: "Errors from different trees are averaged, reducing variance."
          },
          {
            q: "What does each new tree correct in Gradient Boosting?",
            options: ["The residual error of the previous ensemble", "Only the first feature", "The data size"],
            answer: 0,
            why: "Each tree is trained to predict the residuals of previous models."
          },
          {
            q: "What is usually needed when learning_rate decreases?",
            options: ["Fewer trees", "More trees", "Scaling"],
            answer: 1,
            why: "A small rate reduces each tree's contribution, so more trees are needed."
          },
          {
            q: "Main risk of a very deep Decision Tree?",
            options: ["Overfitting", "Data loss", "Need for scaling"],
            answer: 0,
            why: "A deep tree memorises noise and performs worse on new data."
          }
        ],
        summary: [
          "Decision Tree splits data with conditions and uses Gini or MSE.",
          "Deep trees overfit; max_depth and min_samples_leaf constrain them.",
          "Random Forest reduces variance through bootstrap and random features.",
          "Gradient Boosting sequentially corrects residuals; learning_rate and n_estimators are tuned together.",
          "Feature importance is useful but does not prove causality; SHAP is more reliable."
        ]
      }
    },
    10: {
      kk: {
        minutes: 100,
        goals: [
          "Бақылаусыз оқытудың бақылау арқылы оқытудан айырмашылығын түсіну.",
          "K-Means қадамдарын, K таңдауды және шектеулерін түсіндіру.",
          "Иерархиялық кластерлеу мен DBSCAN-ды салыстыру.",
          "PCA және t-SNE арқылы өлшемді азайтуды, теңгерімсіз деректерді өңдеуді қолдану."
        ],
        theory: [
          {
            h: "Бақылаусыз оқыту және k-Means",
            p: [
              "Бақылаусыз оқытуда деректерде дайын жауап немесе класс белгісі болмайды. Модель ұқсастықтарды, жасырын құрылымды және топтарды өзі табады. Негізгі міндеттер — кластерлеу, өлшемді азайту, ассоциациялық ережелер және аномалияларды анықтау.",
              "K-Means деректерді K кластерге бөледі. Алгоритм K центроидты кездейсоқ орналастырады, әр нүктені ең жақын центроидқа тағайындайды, центроидтарды кластер мүшелерінің орташасына жылжытады және тұрақтанғанша қайталайды. Мақсат — кластер ішіндегі қашықтықтардың квадрат қосындысын азайту."
            ],
            list: [
              "K — кластер саны, оны алдын ала беру керек.",
              "Assign — нүктені ең жақын центроидқа беру.",
              "Update — центроидты кластер ортасына жылжыту.",
              "Repeat — центроидтар өзгермейінше қайталау."
            ],
            note: "K таңдау үшін elbow әдісі мен silhouette score қолданылады; K-Means шар тәрізді, тең өлшемді кластерлерге бейім."
          },
          {
            h: "Иерархиялық кластерлеу және DBSCAN",
            p: [
              "Иерархиялық кластерлеу кластерлердің ағаш тәрізді құрылымын — дендрограмманы — құрады. Агломеративті нұсқада әр нүкте жеке кластерден басталып, ең жақын кластерлер біртіндеп бірігеді. Ward әдісі бірігу кезінде кластер ішіндегі квадраттық ауытқу өсімін азайтуға тырысады. Кластер санын кейін дендрограмманы кесу арқылы таңдауға болады.",
              "DBSCAN кластерлерді тығыздық бойынша табады. Core point — eps қашықтығында кемінде min_samples көршісі бар нүкте; border point — core нүктеге жақын, бірақ өзі core емес; noise — ешбір кластерге кірмейтін жеке нүкте. DBSCAN кластер санын алдын ала білуді талап етпейді және кез келген пішінді кластерлерді таба алады."
            ],
            list: [
              "Hierarchical — дендрограмма, кластер санын кейін таңдау.",
              "Ward — ықшам кластерлерге бейім.",
              "DBSCAN — тығыздық негізінде, шуды бөлек белгілейді.",
              "DBSCAN eps пен min_samples-қа сезімтал."
            ],
            table: {
              head: ["Әдіс", "Кластер саны", "Пішін", "Шу"],
              rows: [
                ["K-Means", "K алдын ала", "Шар тәрізді, ықшам", "Сезімтал"],
                ["Hierarchical", "Кейін таңдалады", "Дендрограмма", "Әлсіз"],
                ["DBSCAN", "Автоматты", "Кез келген", "Бөлек белгілейді"]
              ]
            },
            note: "Үлкен деректерде иерархиялық кластерлеу қымбат; DBSCAN тығыздығы әртүрлі кластерлерде нашарлауы мүмкін."
          },
          {
            h: "PCA: өлшемділікті азайту",
            p: [
              "PCA деректердің дисперсиясы ең жоғары бағыттарды — негізгі компоненттерді — табады. Алдымен белгілер стандартталады, ковариация матрицасы есептеледі, меншікті векторлар мен мәндер табылады, олар үлкеннен кішіге сұрыпталады, содан кейін алғашқы компоненттер таңдалады.",
              "Бірінші компонент дисперсияның ең үлкен бөлігін, екіншісі оған перпендикуляр келесі бөлігін ұстайды. explained_variance_ratio_ әр компоненттің ақпарат үлесін көрсетеді. PCA сызықтық әдіс, сондықтан сызықтық емес құрылымды толық сақтамайды, бірақ визуализация мен модель алдындағы өлшемді азайтуға тиімді."
            ],
            list: [
              "Стандарттау — PCA алдында міндетті дерлік.",
              "PC1 — дисперсиясы ең жоғары бағыт.",
              "n_components — сақталатын компонент саны.",
              "explained_variance_ratio_ — ақпарат үлесі."
            ],
            note: "PCA компоненттері бастапқы белгілердің сызықтық комбинациясы; оларды түсіндіру әрдайым оңай емес."
          },
          {
            h: "t-SNE және теңгерімсіз деректер",
            p: [
              "t-SNE көпөлшемді деректерді 2D немесе 3D кеңістікке түрлендіріп, жергілікті көршілік байланыстарды сақтауға тырысады. Ол кластерлерді визуализациялауға тамаша, бірақ глобалды қашықтықтарды дәл сақтамайды, стохастикалық және жаңа нүктелерді түрлендіруге нашар. Сондықтан t-SNE-ні модельдің алдын ала өңдеуі ретінде емес, негізінен визуализация үшін қолданады.",
              "Теңгерімсіз деректерде бір класс екіншісінен әлдеқайда көп болады. Бұл жағдайда accuracy алдауы мүмкін: көпшілік класты болжау жоғары accuracy бергенімен, аз класс толық жіберіп алынуы мүмкін. Resampling тек train-де жасалады, ал бағалауда precision, recall, F1 және PR-AUC қолданылады; class_weight теңгерімді жақсартады."
            ],
            list: [
              "t-SNE — визуализация, PCA — түсіндіру және алдын ала өңдеу.",
              "t-SNE қашықтықтарды дәл сақтамайды.",
              "Теңгерімсіздікте accuracy жеткіліксіз.",
              "Resampling тек train-де, test-ке тимейді."
            ],
            note: "Кластерлеу мен өлшемді азайту нәтижесін деректердің мағынасымен және бизнес мақсатымен бірге түсіндіру керек."
          }
        ],
        visual: {
          title: "K-Means: үш кластер және центроидтар",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="K-Means clusters" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <circle cx="120" cy="90" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="160" cy="70" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="145" cy="120" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="110" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="100" cy="130" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="330" cy="80" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="370" cy="110" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="350" cy="60" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="400" cy="70" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="310" cy="120" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="220" cy="220" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="260" cy="240" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="300" cy="210" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="240" cy="190" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="320" cy="235" r="7" fill="#16a34a" opacity=".85"/>
              <path d="M132 93 L154 115 M154 93 L132 115" stroke="#1e3a8a" stroke-width="3"/>
              <path d="M341 77 L363 99 M363 77 L341 99" stroke="#92400e" stroke-width="3"/>
              <path d="M257 208 L279 230 M279 208 L257 230" stroke="#166534" stroke-width="3"/>
              <text x="80" y="155" font-size="12" fill="#1e3a8a">Centroid 1</text>
              <text x="365" y="145" font-size="12" fill="#92400e">Centroid 2</text>
              <text x="285" y="270" font-size="12" fill="#166534">Centroid 3</text>
              <text x="35" y="35" font-size="13" fill="#334155">Assign → Update → Repeat</text>
            </svg>`,
          caption: "Нүктелер ең жақын центроидқа тағайындалады; кресттер — әр кластердің орталықтары."
        },
        code: {
          title: "K-Means, PCA және DBSCAN",
          note: "Деректер стандартталады, K-Means үшін K таңдалады, PCA ақпарат үлесі көрсетіледі, DBSCAN тығыздық бойынша кластерлейді.",
          source: `from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score

X, y = load_iris(return_X_y=True)
X = StandardScaler().fit_transform(X)

inertias = []
for k in range(1, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    inertias.append(round(km.inertia_, 2))
print("Inertia:", inertias)

kmeans = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = kmeans.fit_predict(X)
print("Silhouette:", round(silhouette_score(X, labels), 3))

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
print("Explained variance:", pca.explained_variance_ratio_.round(3))

db = DBSCAN(eps=0.8, min_samples=5).fit(X)
print("DBSCAN clusters:", set(db.labels_))`
        },
        quiz: [
          {
            q: "Бақылаусыз оқытудың негізгі ерекшелігі қандай?",
            options: ["Деректерде дайын жауап жоқ", "Барлық деректер белгіленген", "Тек регрессия қолданылады"],
            answer: 0,
            why: "Бақылаусыз оқытуда мақсатты класс берілмейді, модель құрылымды өзі табады."
          },
          {
            q: "K-Means-те K нені білдіреді?",
            options: ["Кластер санын", "Қашықтық өлшемін", "Итерация санын"],
            answer: 0,
            why: "K — алдын ала берілетін кластерлер саны."
          },
          {
            q: "DBSCAN-ның K-Means-тен басты айырмашылығы?",
            options: ["Кластер санын алдын ала талап етпейді және шуды бөледі", "Тек сызықтық кластерлер табады", "Масштабтауды талап етеді"],
            answer: 0,
            why: "DBSCAN тығыздық бойынша кластерлейді, K қажет емес және noise нүктелерін белгілейді."
          },
          {
            q: "PCA алдында не істеу керек?",
            options: ["Белгілерді стандарттау", "Барлық белгілерді өшіру", "Кластер санын беру"],
            answer: 0,
            why: "Әртүрлі масштабтағы белгілерде PCA бұрмалануы мүмкін, сондықтан StandardScaler қолданылады."
          },
          {
            q: "Теңгерімсіз жіктеуде қай метрика жиі қолайлы?",
            options: ["Accuracy", "Precision, recall, F1 немесе PR-AUC", "Тек MSE"],
            answer: 1,
            why: "Accuracy көпшілік класты болжаумен жоғары болуы мүмкін; precision/recall/F1/PR-AUC аз класты бағалайды."
          }
        ],
        summary: [
          "Бақылаусыз оқыту белгіленбеген деректерден құрылым мен топтарды табады.",
          "K-Means центроидтарды жаңартып, кластер ішіндегі қашықтықты азайтады; K алдын ала беріледі.",
          "Иерархиялық кластерлеу дендрограмма құрады, DBSCAN тығыздық бойынша кластерлеп, шуды бөледі.",
          "PCA дисперсияны максимизациялайтын компоненттерге проекциялайды; стандарттау маңызды.",
          "t-SNE визуализацияға арналған, ал теңгерімсіздікте accuracy емес, precision/recall/F1/PR-AUC қолданылады."
        ]
      },
      ru: {
        minutes: 100,
        goals: [
          "Понимать отличие обучения без учителя от обучения с учителем.",
          "Объяснять шаги K-Means, выбор K и ограничения.",
          "Сравнивать иерархическую кластеризацию и DBSCAN.",
          "Применять PCA и t-SNE для снижения размерности и обрабатывать дисбаланс классов."
        ],
        theory: [
          {
            h: "Обучение без учителя и k-Means",
            p: [
              "В обучении без учителя в данных нет готовых ответов или меток классов. Модель сама находит сходства, скрытую структуру и группы. Основные задачи — кластеризация, снижение размерности, ассоциативные правила и обнаружение аномалий.",
              "K-Means делит данные на K кластеров. Алгоритм случайно размещает K центроидов, назначает каждую точку ближайшему центроиду, сдвигает центроиды в среднее своих кластеров и повторяет до стабилизации. Цель — минимизировать сумму квадратов расстояний внутри кластеров."
            ],
            list: [
              "K — число кластеров, задаётся заранее.",
              "Assign — назначить точку ближайшему центроиду.",
              "Update — сдвинуть центроид в центр кластера.",
              "Repeat — повторять, пока центроиды не перестанут меняться."
            ],
            note: "Для выбора K используют метод локтя и silhouette score; K-Means тяготеет к сферическим кластерам сопоставимого размера."
          },
          {
            h: "Иерархическая кластеризация и DBSCAN",
            p: [
              "Иерархическая кластеризация строит древовидную структуру — дендрограмму. В агломеративном варианте каждая точка начинает отдельным кластером, затем ближайшие кластеры постепенно объединяются. Метод Ward минимизирует рост внутрикластерной квадратичной ошибки. Число кластеров можно выбрать, разрезав дендрограмму.",
              "DBSCAN находит кластеры по плотности. Core point — точка, у которой в радиусе eps не меньше min_samples соседей; border point — близка к core, но сама не core; noise — одиночная точка вне кластеров. DBSCAN не требует заранее знать число кластеров и находит кластеры любой формы."
            ],
            list: [
              "Hierarchical — дендрограмма, число кластеров выбирают позже.",
              "Ward — тяготеет к компактным кластерам.",
              "DBSCAN — по плотности, шум помечает отдельно.",
              "DBSCAN чувствителен к eps и min_samples."
            ],
            table: {
              head: ["Метод", "Число кластеров", "Форма", "Шум"],
              rows: [
                ["K-Means", "K задаётся заранее", "Сферическая, компактная", "Чувствителен"],
                ["Hierarchical", "Выбирается позже", "Дендрограмма", "Слабый"],
                ["DBSCAN", "Автоматически", "Любая", "Выделяет отдельно"]
              ]
            },
            note: "На больших данных иерархическая кластеризация дорога; DBSCAN может плохо работать при разной плотности кластеров."
          },
          {
            h: "PCA: снижение размерности",
            p: [
              "PCA находит направления с максимальной дисперсией — главные компоненты. Сначала признаки стандартизуют, затем считают ковариационную матрицу, находят собственные векторы и значения, сортируют их по убыванию и выбирают первые компоненты.",
              "Первая компонента содержит наибольшую долю дисперсии, вторая — следующую долю и перпендикулярна первой. explained_variance_ratio_ показывает вклад каждой компоненты. PCA — линейный метод, поэтому не сохраняет нелинейную структуру полностью, но полезен для визуализации и снижения размерности перед моделью."
            ],
            list: [
              "Стандартизация перед PCA почти обязательна.",
              "PC1 — направление максимальной дисперсии.",
              "n_components — число сохраняемых компонент.",
              "explained_variance_ratio_ — доля информации."
            ],
            note: "Компоненты PCA — линейные комбинации исходных признаков; интерпретировать их не всегда просто."
          },
          {
            h: "t-SNE и дисбаланс классов",
            p: [
              "t-SNE переводит многомерные данные в 2D или 3D, стараясь сохранить локальные соседства. Он отлично визуализирует кластеры, но не сохраняет глобальные расстояния точно, стохастичен и плохо преобразует новые точки. Поэтому t-SNE используют в основном для визуализации, а не как обязательную предобработку.",
              "При дисбалансе один класс намного многочисленнее другого. Accuracy может обманывать: предсказание мажоритарного класса даёт высокую accuracy, но меньшинство теряется. Resampling делают только на train, а для оценки используют precision, recall, F1 и PR-AUC; class_weight также помогает сбалансировать обучение."
            ],
            list: [
              "t-SNE — визуализация, PCA — интерпретация и предобработка.",
              "t-SNE не сохраняет расстояния точно.",
              "При дисбалансе accuracy недостаточна.",
              "Resampling только на train, не на test."
            ],
            note: "Результаты кластеризации и снижения размерности нужно объяснять вместе со смыслом данных и бизнес-целью."
          }
        ],
        visual: {
          title: "K-Means: три кластера и центроиды",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="K-Means clusters" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <circle cx="120" cy="90" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="160" cy="70" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="145" cy="120" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="110" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="100" cy="130" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="330" cy="80" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="370" cy="110" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="350" cy="60" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="400" cy="70" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="310" cy="120" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="220" cy="220" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="260" cy="240" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="300" cy="210" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="240" cy="190" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="320" cy="235" r="7" fill="#16a34a" opacity=".85"/>
              <path d="M132 93 L154 115 M154 93 L132 115" stroke="#1e3a8a" stroke-width="3"/>
              <path d="M341 77 L363 99 M363 77 L341 99" stroke="#92400e" stroke-width="3"/>
              <path d="M257 208 L279 230 M279 208 L257 230" stroke="#166534" stroke-width="3"/>
              <text x="80" y="155" font-size="12" fill="#1e3a8a">Centroid 1</text>
              <text x="365" y="145" font-size="12" fill="#92400e">Centroid 2</text>
              <text x="285" y="270" font-size="12" fill="#166534">Centroid 3</text>
              <text x="35" y="35" font-size="13" fill="#334155">Assign → Update → Repeat</text>
            </svg>`,
          caption: "Точки назначаются ближайшему центроиду; крестики — центры кластеров."
        },
        code: {
          title: "K-Means, PCA и DBSCAN",
          note: "Данные стандартизуются, для K-Means выбирается K, PCA показывает долю информации, DBSCAN кластеризует по плотности.",
          source: `from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score

X, y = load_iris(return_X_y=True)
X = StandardScaler().fit_transform(X)

inertias = []
for k in range(1, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    inertias.append(round(km.inertia_, 2))
print("Inertia:", inertias)

kmeans = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = kmeans.fit_predict(X)
print("Silhouette:", round(silhouette_score(X, labels), 3))

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
print("Explained variance:", pca.explained_variance_ratio_.round(3))

db = DBSCAN(eps=0.8, min_samples=5).fit(X)
print("DBSCAN clusters:", set(db.labels_))`
        },
        quiz: [
          {
            q: "Главная особенность обучения без учителя?",
            options: ["В данных нет готовых ответов", "Все данные размечены", "Используется только регрессия"],
            answer: 0,
            why: "В обучении без учителя целевой класс не задан, модель сама находит структуру."
          },
          {
            q: "Что означает K в K-Means?",
            options: ["Число кластеров", "Метрику расстояния", "Число итераций"],
            answer: 0,
            why: "K — заранее заданное число кластеров."
          },
          {
            q: "Главное отличие DBSCAN от K-Means?",
            options: ["Не требует заранее числа кластеров и выделяет шум", "Находит только линейные кластеры", "Требует масштабирования"],
            answer: 0,
            why: "DBSCAN кластеризует по плотности, K не нужен, а noise помечается отдельно."
          },
          {
            q: "Что нужно сделать перед PCA?",
            options: ["Стандартизировать признаки", "Удалить все признаки", "Задать число кластеров"],
            answer: 0,
            why: "При разных масштабах PCA искажается, поэтому используют StandardScaler."
          },
          {
            q: "Какая метрика часто уместна при дисбалансе классов?",
            options: ["Accuracy", "Precision, recall, F1 или PR-AUC", "Только MSE"],
            answer: 1,
            why: "Accuracy может быть высокой за счёт мажоритарного класса; precision/recall/F1/PR-AUC оценивают меньшинство."
          }
        ],
        summary: [
          "Обучение без учителя находит структуру и группы в неразмеченных данных.",
          "K-Means обновляет центроиды и минимизирует внутрикластерные расстояния; K задаётся заранее.",
          "Иерархическая кластеризация строит дендрограмму, DBSCAN кластеризует по плотности и выделяет шум.",
          "PCA проецирует данные на компоненты максимальной дисперсии; стандартизация важна.",
          "t-SNE предназначен для визуализации, а при дисбалансе используют precision/recall/F1/PR-AUC вместо accuracy."
        ]
      },
      en: {
        minutes: 100,
        goals: [
          "Understand how unsupervised learning differs from supervised learning.",
          "Explain K-Means steps, choosing K and its limitations.",
          "Compare hierarchical clustering and DBSCAN.",
          "Apply PCA and t-SNE for dimensionality reduction and handle class imbalance."
        ],
        theory: [
          {
            h: "Unsupervised learning and k-Means",
            p: [
              "In unsupervised learning, data has no ready answers or class labels. The model finds similarities, hidden structure and groups on its own. Core tasks include clustering, dimensionality reduction, association rules and anomaly detection.",
              "K-Means splits data into K clusters. It randomly places K centroids, assigns each point to the nearest centroid, moves centroids to the mean of their clusters, and repeats until stable. The objective is to minimise the sum of squared distances within clusters."
            ],
            list: [
              "K — the number of clusters, set in advance.",
              "Assign — give each point to its nearest centroid.",
              "Update — move each centroid to its cluster centre.",
              "Repeat — iterate until centroids stop changing."
            ],
            note: "Choose K with the elbow method and silhouette score; K-Means favours spherical clusters of similar size."
          },
          {
            h: "Hierarchical clustering and DBSCAN",
            p: [
              "Hierarchical clustering builds a tree-like structure called a dendrogram. In the agglomerative version, each point starts as its own cluster, and the closest clusters are merged step by step. Ward's method minimises the increase in within-cluster squared error. The number of clusters can be chosen by cutting the dendrogram.",
              "DBSCAN finds clusters by density. A core point has at least min_samples neighbours within eps; a border point is close to a core point but is not core itself; noise is an isolated point outside clusters. DBSCAN does not require the number of clusters in advance and can find clusters of any shape."
            ],
            list: [
              "Hierarchical — dendrogram, choose the cluster count later.",
              "Ward — favours compact clusters.",
              "DBSCAN — density-based, labels noise separately.",
              "DBSCAN is sensitive to eps and min_samples."
            ],
            table: {
              head: ["Method", "Cluster count", "Shape", "Noise"],
              rows: [
                ["K-Means", "K preset", "Spherical, compact", "Sensitive"],
                ["Hierarchical", "Chosen later", "Dendrogram", "Weak"],
                ["DBSCAN", "Automatic", "Any shape", "Labeled separately"]
              ]
            },
            note: "Hierarchical clustering is expensive on large data; DBSCAN may struggle when cluster densities differ."
          },
          {
            h: "PCA: dimensionality reduction",
            p: [
              "PCA finds directions of maximum variance — the principal components. First standardise features, compute the covariance matrix, find eigenvectors and eigenvalues, sort them descending, then keep the first components.",
              "The first component captures the largest share of variance, the second captures the next share and is perpendicular to the first. explained_variance_ratio_ shows each component's share. PCA is linear, so it does not fully preserve nonlinear structure, but it is useful for visualisation and reducing dimensions before a model."
            ],
            list: [
              "Standardisation before PCA is almost mandatory.",
              "PC1 — the direction of maximum variance.",
              "n_components — number of components to keep.",
              "explained_variance_ratio_ — share of information."
            ],
            note: "PCA components are linear combinations of original features; they are not always easy to interpret."
          },
          {
            h: "t-SNE and class imbalance",
            p: [
              "t-SNE maps high-dimensional data to 2D or 3D while trying to preserve local neighbourhoods. It is excellent for visualising clusters, but it does not preserve global distances exactly, is stochastic and transforms new points poorly. It is therefore used mainly for visualisation, not as mandatory preprocessing.",
              "With class imbalance, one class is much larger than another. Accuracy can mislead: predicting the majority class gives high accuracy while the minority is missed. Resample only on train, and evaluate with precision, recall, F1 and PR-AUC; class_weight also helps balance training."
            ],
            list: [
              "t-SNE is for visualisation; PCA for interpretation and preprocessing.",
              "t-SNE does not preserve distances exactly.",
              "Accuracy is insufficient under imbalance.",
              "Resample only on train, never on test."
            ],
            note: "Explain clustering and dimensionality reduction together with the meaning of the data and the business goal."
          }
        ],
        visual: {
          title: "K-Means: three clusters and centroids",
          html: `
            <svg viewBox="0 0 600 300" role="img" aria-label="K-Means clusters" style="width:100%;height:auto">
              <rect x="0" y="0" width="600" height="300" fill="#f8fafc" rx="8"/>
              <circle cx="120" cy="90" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="160" cy="70" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="145" cy="120" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="190" cy="110" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="100" cy="130" r="7" fill="#2563eb" opacity=".85"/>
              <circle cx="330" cy="80" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="370" cy="110" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="350" cy="60" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="400" cy="70" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="310" cy="120" r="7" fill="#f59e0b" opacity=".9"/>
              <circle cx="220" cy="220" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="260" cy="240" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="300" cy="210" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="240" cy="190" r="7" fill="#16a34a" opacity=".85"/>
              <circle cx="320" cy="235" r="7" fill="#16a34a" opacity=".85"/>
              <path d="M132 93 L154 115 M154 93 L132 115" stroke="#1e3a8a" stroke-width="3"/>
              <path d="M341 77 L363 99 M363 77 L341 99" stroke="#92400e" stroke-width="3"/>
              <path d="M257 208 L279 230 M279 208 L257 230" stroke="#166534" stroke-width="3"/>
              <text x="80" y="155" font-size="12" fill="#1e3a8a">Centroid 1</text>
              <text x="365" y="145" font-size="12" fill="#92400e">Centroid 2</text>
              <text x="285" y="270" font-size="12" fill="#166534">Centroid 3</text>
              <text x="35" y="35" font-size="13" fill="#334155">Assign → Update → Repeat</text>
            </svg>`,
          caption: "Points are assigned to the nearest centroid; crosses mark cluster centres."
        },
        code: {
          title: "K-Means, PCA and DBSCAN",
          note: "Data is standardised, K is chosen for K-Means, PCA reports the information share, and DBSCAN clusters by density.",
          source: `from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score

X, y = load_iris(return_X_y=True)
X = StandardScaler().fit_transform(X)

inertias = []
for k in range(1, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    inertias.append(round(km.inertia_, 2))
print("Inertia:", inertias)

kmeans = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = kmeans.fit_predict(X)
print("Silhouette:", round(silhouette_score(X, labels), 3))

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
print("Explained variance:", pca.explained_variance_ratio_.round(3))

db = DBSCAN(eps=0.8, min_samples=5).fit(X)
print("DBSCAN clusters:", set(db.labels_))`
        },
        quiz: [
          {
            q: "Main feature of unsupervised learning?",
            options: ["Data has no ready answers", "All data is labelled", "Only regression is used"],
            answer: 0,
            why: "In unsupervised learning the target class is not given; the model finds structure itself."
          },
          {
            q: "What does K mean in K-Means?",
            options: ["The number of clusters", "The distance metric", "The number of iterations"],
            answer: 0,
            why: "K is the number of clusters set in advance."
          },
          {
            q: "Main difference of DBSCAN from K-Means?",
            options: ["It needs no preset cluster count and labels noise", "It finds only linear clusters", "It requires scaling"],
            answer: 0,
            why: "DBSCAN clusters by density, needs no K, and marks noise separately."
          },
          {
            q: "What should be done before PCA?",
            options: ["Standardise the features", "Remove all features", "Set the number of clusters"],
            answer: 0,
            why: "PCA is distorted by different scales, so StandardScaler is used."
          },
          {
            q: "Which metric is often appropriate under class imbalance?",
            options: ["Accuracy", "Precision, recall, F1 or PR-AUC", "MSE only"],
            answer: 1,
            why: "Accuracy can be high from the majority class; precision/recall/F1/PR-AUC assess the minority."
          }
        ],
        summary: [
          "Unsupervised learning finds structure and groups in unlabeled data.",
          "K-Means updates centroids and minimises within-cluster distances; K is preset.",
          "Hierarchical clustering builds a dendrogram; DBSCAN clusters by density and isolates noise.",
          "PCA projects data onto maximum-variance components; standardisation matters.",
          "t-SNE is for visualisation, and imbalance calls for precision/recall/F1/PR-AUC instead of accuracy."
        ]
      }
    }
  };
})();
