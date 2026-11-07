'use strict';
window.AUTO_COPY = {
  kk: {
    chapters: [
      {
        title: 'Датасет',
        kicker: '01 / КӨЛІКТЕН — ДЕРЕККЕ',
        heading: 'Көлік қаншалықты үнемді?',
        intro: 'Auto MPG — 398 көлік туралы деректер. Жеті белгі арқылы MPG мәнін болжаймыз: көлік бір галлон отынмен қанша миль жүреді? MPG жоғары болса, көлік үнемдірек.',
        steps: [
          'Бастапқы кестеде 9 баған бар: 7 кіріс белгісі, mpg жауабы және көлік атауы. Атауы — анықтауыш, оны модельге бермейміз.',
          '398 жолдың бәрін сақтаймыз: 318 көлік — train, 80 көлік — test. horsepower бағанындағы 6 бос мән оқыту деректерінің медианасымен толтырылады.',
          'Pipeline медиананы әр CV бөлігінің оқыту жолдарынан ғана есептейді. origin санаттары one-hot арқылы беріледі. Ағаш модельдерге StandardScaler қажет емес.'
        ],
        takeaway: 'MPG — жанармайдың литрмен шығыны емес. Бұл бір галлонмен жүретін миль саны, сондықтан жоғары мән жақсырақ.',
        oral: 'Бұл жұмыста Auto MPG датасетін қолдандым. Онда 398 көлік бар. Жеті белгі арқылы бір галлонмен қанша миль жүретінін болжаймыз. 318 көлікпен оқытып, бөлек 80 көлікпен тексереміз. Қуат бағанындағы алты бос мәнді тек оқыту деректерінен есептелген медианамен толтырдық. Модельді таңдауға test деректерін пайдаланбаймыз.'
      },
      {
        title: 'Decision Tree',
        kicker: '02 / ШАРТТАР АРҚЫЛЫ ШЕШУ',
        heading: 'Ағаш санды қалай болжайды?',
        intro: 'Decision Tree Regressor көліктің белгілерін шарттармен тексереді. Әр жауап оны келесі тармаққа өткізеді. Соңғы жапыраққа түскен оқыту көліктерінің орташа MPG мәні болжам болады.',
        steps: [
          'Бір test көлігін таңда. Анимация сол көліктің нақты оқытылған ағаштан өткен жолын көрсетеді. Шарт орындалса — солға, орындалмаса — оңға өтеді.',
          'max_depth ағаштың тереңдігін, min_samples_leaf жапырақтағы ең аз үлгі санын шектейді. Параметрлер train ішіндегі кросс-валидациямен таңдалады.',
          'Тым терең ағаш оқыту мысалдарын жаттап алуы мүмкін. Сондықтан train қатесін ғана емес, CV және бөлек test нәтижесін де қараймыз.'
        ],
        takeaway: 'Регрессия ағашының жауабы — MPG саны. Жапырақтағы орташа мән осы жапыраққа түскен оқыту деректерінен есептеледі.',
        oral: 'Шешім ағашы көлік туралы бірнеше шартты кезекпен тексереді. Мысалы, салмағын немесе шығарылған жылын қарайды. Соңында бір жапыраққа келеді. Сол жапырақтағы оқыту көліктерінің орташа MPG мәнін жауап ретінде береді. Ағаштың параметрлерін кросс-валидациямен таңдадық, ал соңғы қатесін бөлек test арқылы бағаладық.'
      },
      {
        title: 'Random Forest',
        kicker: '03 / БІРНЕШЕ АҒАШТЫҢ ОРТАҚ ЖАУАБЫ',
        heading: 'Көп ағашты біріктіріп көр.',
        intro: 'Random Forest Regressor көптеген ағашты оқытады. Ағаштар деректердің қайта іріктелген нұсқаларымен оқытылады. Әр ағаш MPG санын береді, орман сол болжамдарды орташалайды.',
        steps: [
          'Көріністегі ағаштар бір көлікке әртүрлі MPG болжай алады. Бұл орман ішіндегі жеке болжамдардың қалай ерекшеленетінін көрсетеді.',
          'Экранда ағаштардың бір бөлігі ғана көрсетіледі. Қорытынды болжам модельдегі барлық ағаштың жауабынан есептелген.',
          'n_estimators ағаш санын анықтайды. Тереңдік пен жапырақ өлшемі де тексеріледі. Таңдау ережесі өзгермейді: train ішіндегі орташа CV RMSE аз болғаны жақсы.'
        ],
        takeaway: 'Random Forest регрессиясында жауап дауыс берумен емес, барлық ағаштың сандық болжамдарын орташалау арқылы табылады.',
        oral: 'Random Forest бір ғана ағашқа сүйенбейді. Бірнеше ағаш көліктің MPG мәнін бөлек болжайды. Кейбірі жоғары, кейбірі төмен сан береді. Модель барлық ағаштың болжамын орташалап, соңғы жауапты шығарады. Экранда ағаштардың бір бөлігі көрсетілгенімен, қорытындыға олардың бәрі қатысады.'
      },
      {
        title: 'Gradient Boosting',
        kicker: '04 / ҚАТЕНІ ҚАДАММЕН ТҮЗЕТУ',
        heading: 'Әр ағаш алдыңғысын толықтырады.',
        intro: 'Gradient Boosting Regressor алдымен train жиынындағы орташа MPG мәнінен бастайды. Содан кейін жаңа ағаштар алдыңғы болжамның қалдық қатесін үйреніп, жалпы жауапқа шағын түзетулер қосады.',
        steps: [
          'Бастапқы болжам барлық көлікке бірдей орташа сан береді. Квадраттық қате қолданылғанда, жаңа ағаштар нақты MPG мен ағымдағы болжамның айырмасын үйренеді.',
          'learning_rate әр жаңа ағаштың үлесін азайтады. n_estimators түзету қадамдарының санын анықтайды. Бұл параметрлер CV арқылы таңдалады.',
          'Слайдер нақты оқытылған модельдің әр кезеңдегі болжамын көрсетеді. Бір көліктің қатесі әр қадамда міндетті түрде азаймайды.'
        ],
        takeaway: 'Random Forest ағаштардың жауаптарын орташалайды. Gradient Boosting жаңа ағаштардың түзетулерін алдыңғы болжамға біртіндеп қосады.',
        oral: 'Gradient Boosting орташа MPG мәнінен бастайды. Содан кейін алғашқы болжамның қатесін есептейді. Жаңа ағаш сол қатені түзетуге үйренеді, келесі ағаш тағы бір түзету қосады. Осылай модель біртіндеп құралады. Бірақ әр қадамда әр көліктің болжамы міндетті түрде жақсарады деп айта алмаймыз.'
      },
      {
        title: 'XGBoost',
        kicker: '05 / РЕТТЕЛГЕН БУСТИНГ',
        heading: 'Қатені азайт, күрделілікті бақыла.',
        intro: 'XGBoost Regressor да ағаштарды бірінен кейін бірін қосады. Ол қатені азайтумен бірге ағаштардың күрделілігін реттейді. Бұл жұмыста модель MPG санын квадраттық қате арқылы үйренеді.',
        steps: [
          'XGBoost жаңа ағашты құруда қатенің градиентін және екінші туындысын пайдаланады. Қарапайым айтқанда, болжамды қай бағытқа және қаншалықты түзету керегін бағалайды.',
          'Тереңдік, қадам саны және learning_rate үшін параметр нұсқалары тексеріледі. Үздік нұсқа бес CV бөлігінің орташа RMSE мәнімен таңдалады.',
          'Анимация браузерде модельді қайта оқытпайды. Ол Python-да есептелген кезеңдік болжамдарды көрсетеді. Соңғы болжам барлық таңдалған қадамның нәтижесі.'
        ],
        takeaway: 'XGBoost автоматты түрде ең жақсы модель болмайды. Оны да сол train/test бөлінісінде басқа модельдермен салыстырамыз.',
        oral: 'XGBoost та болжамды бірнеше қадаммен түзетеді. Ол қатені азайтып қана қоймай, ағаштың артық күрделенуін де шектейді. Параметрлерді train ішіндегі кросс-валидациямен таңдадық. Қай модель жақсы шыққанын атына қарап емес, бірдей test деректеріндегі RMSE, MAE және R² арқылы салыстырамыз.'
      },
      {
        title: 'Салыстыру',
        kicker: '06 / НӘТИЖЕНІ САНМЕН ДӘЛЕЛДЕ',
        heading: 'Қай модель азырақ қателесті?',
        intro: 'Төрт модель бірдей 80 test көлігіне MPG болжады. MAE орташа абсолют қатені, RMSE үлкен қателерге көбірек мән беретін қатені көрсетеді. R² болжамның сапасын тұрақты орташа жауаппен салыстырып бағалайды.',
        steps: [
          'Әр модельдің 8 параметр нұсқасын бірдей бес CV бөлігімен тексердік. Барлық толтыру мен кодтау Pipeline ішінде орындалды. Test соңғы бағалау үшін бөлек сақталды.',
          'MAE мен RMSE бірлігі — MPG, аз болғаны жақсы. R² өлшемсіз: жоғары болғаны жақсы, тіпті теріс те болуы мүмкін. Оны пайыздық дәлдік демейміз.',
          'MPG үздіксіз сан болғандықтан, бұрынғы Decision Tree Classifier орнына Gradient Boosting Regressor алдық. Енді төрт модельдің бәрі бірдей регрессия міндетін орындайды.'
        ],
        takeaway: 'CV бойынша таңдалған модель мен test-та ең аз қате берген модельді бөлек көрсетеміз. Бір шағын test нәтижесі барлық болашақ көлікке кепілдік бермейді.',
        oral: 'Барлық модельге бірдей деректер бердік. Алдымен параметрлерді train ішіндегі бес бөлікті кросс-валидациямен таңдадық. Кейін бөлек 80 көлікке болжам жасадық. MAE мен RMSE аз болғаны, ал R² жоғары болғаны жақсы. Қорытындыны осы көрсеткіштермен айтамыз. Бұл нәтиже нақты осы деректер мен бөлініске қатысты.'
      }
    ]
  },
  ru: {
    chapters: [
      {
        title: 'Датасет',
        kicker: '01 / ОТ АВТОМОБИЛЯ К ДАННЫМ',
        heading: 'Насколько экономичен автомобиль?',
        intro: 'Auto MPG содержит данные о 398 автомобилях. По семи признакам предсказываем MPG: сколько миль автомобиль проедет на одном галлоне топлива. Чем выше MPG, тем экономичнее автомобиль.',
        steps: [
          'В исходной таблице 9 столбцов: 7 входных признаков, целевой mpg и название автомобиля. Название служит идентификатором и не передаётся модели.',
          'Сохраняем все 398 строк: 318 автомобилей для train, 80 для test. Шесть пропусков horsepower заполняются медианой обучающих данных.',
          'Pipeline вычисляет медиану только по обучающей части каждого CV-блока. Категории origin кодируются через one-hot. Масштабирование StandardScaler этим деревьям не требуется.'
        ],
        takeaway: 'MPG — не расход топлива в литрах. Это расстояние в милях на одном галлоне, поэтому большее значение означает лучшую экономичность.',
        oral: 'Я использовал Auto MPG с данными о 398 автомобилях. По семи признакам предсказываем, сколько миль машина проедет на одном галлоне. На 318 автомобилях обучаемся, на отдельных 80 проверяем результат. Шесть пропусков мощности заполняем медианой только обучающих данных. Test не участвует в подборе модели.'
      },
      {
        title: 'Decision Tree',
        kicker: '02 / РЕШЕНИЕ ЧЕРЕЗ УСЛОВИЯ',
        heading: 'Как дерево предсказывает число?',
        intro: 'Decision Tree Regressor проверяет признаки автомобиля с помощью условий. Каждый ответ направляет его в следующую ветвь. Прогнозом становится среднее MPG обучающих автомобилей, попавших в конечный лист.',
        steps: [
          'Выберите автомобиль из test. Анимация покажет его путь по действительно обученному дереву. Условие выполнено — идём влево, не выполнено — вправо.',
          'max_depth ограничивает глубину дерева, min_samples_leaf — минимальное число примеров в листе. Параметры выбираются кросс-валидацией внутри train.',
          'Слишком глубокое дерево может запомнить обучающие примеры. Поэтому смотрим не только на ошибку train, но и на результаты CV и отдельного test.'
        ],
        takeaway: 'Ответ дерева регрессии — число MPG. Среднее в листе вычисляется по обучающим примерам, которые попали именно в этот лист.',
        oral: 'Дерево последовательно проверяет условия о машине, например её вес или год выпуска. В конце машина попадает в один лист. Среднее MPG обучающих автомобилей этого листа становится прогнозом. Параметры дерева мы выбрали кросс-валидацией, а окончательную ошибку измерили на отдельной тестовой выборке.'
      },
      {
        title: 'Random Forest',
        kicker: '03 / ОБЩИЙ ОТВЕТ МНОГИХ ДЕРЕВЬЕВ',
        heading: 'Соберём деревья в один лес.',
        intro: 'Random Forest Regressor обучает множество деревьев. Они обучаются на повторных выборках исходных данных. Каждое дерево предсказывает число MPG, а лес усредняет эти прогнозы.',
        steps: [
          'Деревья на экране могут предсказать разное MPG для одной машины. Так видны различия отдельных прогнозов внутри ансамбля.',
          'На экране показана только часть деревьев. Итоговый прогноз вычислен по ответам всех деревьев обученной модели.',
          'n_estimators задаёт число деревьев. Проверяем также глубину и размер листа. Правило выбора прежнее: меньше средний CV RMSE внутри train — лучше.'
        ],
        takeaway: 'В регрессии Random Forest усредняет числовые прогнозы всех деревьев. Итог не определяется голосованием за класс.',
        oral: 'Random Forest опирается не на одно дерево. Несколько деревьев отдельно предсказывают MPG автомобиля: одни дают число выше, другие ниже. Модель усредняет все эти ответы и получает итоговый прогноз. На экране показана только часть деревьев, но в итоговом числе участвуют все.'
      },
      {
        title: 'Gradient Boosting',
        kicker: '04 / ИСПРАВЛЯЕМ ОШИБКУ ПО ШАГАМ',
        heading: 'Каждое дерево дополняет предыдущее.',
        intro: 'Gradient Boosting Regressor начинает со среднего MPG в train. Затем новые деревья обучаются на остаточных ошибках текущего прогноза и добавляют небольшие поправки к общему ответу.',
        steps: [
          'Начальный прогноз одинаков для всех машин. При квадратичной ошибке новые деревья учатся предсказывать разницу между настоящим MPG и текущим прогнозом.',
          'learning_rate уменьшает вклад каждого нового дерева. n_estimators задаёт число шагов исправления. Эти параметры выбираются через CV.',
          'Слайдер показывает реальные прогнозы обученной модели на разных этапах. Ошибка отдельной машины не обязана уменьшаться на каждом шаге.'
        ],
        takeaway: 'Random Forest усредняет ответы деревьев. Gradient Boosting последовательно добавляет поправки новых деревьев к текущему прогнозу.',
        oral: 'Gradient Boosting начинает со среднего MPG. Потом считает, насколько ошибся первый прогноз. Новое дерево учится исправлять эту ошибку, следующее добавляет ещё одну поправку. Так модель собирается постепенно. Но это не означает, что прогноз каждой конкретной машины обязательно становится лучше после каждого шага.'
      },
      {
        title: 'XGBoost',
        kicker: '05 / БУСТИНГ С РЕГУЛЯРИЗАЦИЕЙ',
        heading: 'Уменьшаем ошибку, контролируем сложность.',
        intro: 'XGBoost Regressor тоже добавляет деревья последовательно. Вместе с уменьшением ошибки он регулирует сложность деревьев. В этой работе модель учится предсказывать числовое MPG с помощью квадратичной функции потерь.',
        steps: [
          'Для нового дерева XGBoost использует градиенты и вторые производные ошибки. Проще говоря, оценивает направление и величину полезной поправки к прогнозу.',
          'Проверяем варианты глубины, числа шагов и learning_rate. Лучший вариант выбирается по среднему RMSE на пяти CV-блоках.',
          'Анимация не переобучает модель в браузере. Она показывает этапные прогнозы, вычисленные в Python. Конечный прогноз использует все выбранные шаги.'
        ],
        takeaway: 'XGBoost не становится лучшим автоматически. Его нужно сравнить с остальными моделями на том же разбиении train/test.',
        oral: 'XGBoost тоже исправляет прогноз за несколько шагов. Он не только уменьшает ошибку, но и ограничивает лишнюю сложность деревьев. Параметры выбраны кросс-валидацией внутри train. Лучшую модель определяем не по названию, а по RMSE, MAE и R² на одинаковых тестовых данных.'
      },
      {
        title: 'Сравнение',
        kicker: '06 / ПОДТВЕРЖДАЕМ ВЫВОД ЧИСЛАМИ',
        heading: 'Какая модель ошиблась меньше?',
        intro: 'Четыре модели предсказали MPG для одинаковых 80 test-автомобилей. MAE показывает среднюю абсолютную ошибку, RMSE сильнее учитывает большие ошибки. R² оценивает качество относительно постоянного прогноза среднего значения.',
        steps: [
          'Для каждой модели проверили 8 комбинаций параметров на одинаковых пяти CV-блоках. Заполнение пропусков и кодирование выполнялись внутри Pipeline. Test сохранили для итоговой оценки.',
          'MAE и RMSE измеряются в MPG: меньше — лучше. R² не имеет единиц: больше — лучше, возможны отрицательные значения. Это не процент точности.',
          'MPG — непрерывное число, поэтому прежний Decision Tree Classifier заменён на Gradient Boosting Regressor. Все четыре модели теперь решают одну регрессионную задачу.'
        ],
        takeaway: 'Модель, выбранную по CV, и лучший наблюдаемый результат test показываем отдельно. Один небольшой test не гарантирует такой же результат на всех будущих автомобилях.',
        oral: 'Все модели получили одинаковые данные. Сначала параметры подобрали кросс-валидацией по пяти частям train. Потом сделали прогноз для отдельных 80 машин. Меньшие MAE и RMSE лучше, а R² лучше выше. По этим показателям делаем вывод. Он относится именно к этим данным и этому разбиению.'
      }
    ]
  },
  en: {
    chapters: [
      {
        title: 'Dataset',
        kicker: '01 / FROM CARS TO DATA',
        heading: 'How fuel-efficient is this car?',
        intro: 'Auto MPG contains data on 398 cars. Seven features help predict MPG: how many miles a car travels on one gallon of fuel. Higher MPG means better fuel economy.',
        steps: [
          'The original table has 9 columns: 7 input features, the mpg target and the car name. The name is an identifier and is excluded from model inputs.',
          'We keep all 398 rows: 318 cars for training and 80 for testing. Six missing horsepower values are filled using a median learned from training data.',
          'The Pipeline learns each median only from that CV fold’s training rows. Origin categories use one-hot encoding. These tree models do not require StandardScaler.'
        ],
        takeaway: 'MPG measures distance in miles per gallon, not fuel consumed in litres. A higher value means the car travels farther on the same fuel.',
        oral: 'I used Auto MPG, a dataset of 398 cars. Seven features predict how many miles a car travels per gallon. We train on 318 cars and test on 80 separate cars. Six missing horsepower values are filled with training-data medians. The test set is not used for model selection.'
      },
      {
        title: 'Decision Tree',
        kicker: '02 / A PATH OF SIMPLE CONDITIONS',
        heading: 'How does a tree predict a number?',
        intro: 'A Decision Tree Regressor checks conditions on a car’s features. Each answer follows another branch. The prediction is the average MPG of the training cars that reached the final leaf.',
        steps: [
          'Choose a test car. The animation follows its actual path through the fitted tree. A true condition goes left; a false condition goes right.',
          'max_depth limits tree depth; min_samples_leaf sets the minimum number of examples in a leaf. Cross-validation within train selects these parameters.',
          'A very deep tree can memorise training examples. We therefore examine CV and held-out test performance as well as training error.'
        ],
        takeaway: 'A regression tree predicts an MPG number. Its leaf average comes from the training examples assigned to that particular leaf.',
        oral: 'The tree checks conditions about a car, such as its weight or model year. The car eventually reaches a leaf. The average training MPG in that leaf becomes the prediction. We selected the tree’s parameters using cross-validation and measured its final error on a separate test set.'
      },
      {
        title: 'Random Forest',
        kicker: '03 / MANY TREES, ONE PREDICTION',
        heading: 'Bring many trees together.',
        intro: 'A Random Forest Regressor trains many trees using resampled training data. Each tree predicts an MPG number. The forest averages these predictions to produce its final answer.',
        steps: [
          'The displayed trees can predict different MPG values for the same car. This shows how individual predictions vary within the ensemble.',
          'Only some trees are displayed. The final prediction is calculated from every tree in the fitted model.',
          'n_estimators controls the tree count. Depth and leaf size are also tested. The selection rule stays the same: lower mean training-CV RMSE is better.'
        ],
        takeaway: 'Random Forest regression averages all trees’ numeric predictions. It does not choose the result by voting for a class.',
        oral: 'Random Forest does not rely on a single tree. Many trees predict the car’s MPG independently: some predict higher values and others lower ones. The model averages all their answers. The display shows only some trees, but the final value includes every tree in the model.'
      },
      {
        title: 'Gradient Boosting',
        kicker: '04 / CORRECT THE ERROR STEP BY STEP',
        heading: 'Each tree adds a correction.',
        intro: 'A Gradient Boosting Regressor starts with the mean training MPG. New trees then learn the current prediction’s residual errors and add small corrections to the overall answer.',
        steps: [
          'The initial prediction is the same for every car. With squared-error loss, new trees learn the difference between actual MPG and the current prediction.',
          'learning_rate reduces each new tree’s contribution. n_estimators determines the number of correction steps. Cross-validation selects these settings.',
          'The slider shows actual predictions from different stages of the fitted model. An individual car’s error does not necessarily decrease at every step.'
        ],
        takeaway: 'Random Forest averages tree predictions. Gradient Boosting adds new trees’ corrections to the current prediction sequentially.',
        oral: 'Gradient Boosting starts with the mean MPG. It calculates the error in that prediction. A new tree learns to correct the error, and the next tree adds another correction. The model grows step by step. This does not mean every individual car’s prediction improves after every step.'
      },
      {
        title: 'XGBoost',
        kicker: '05 / BOOSTING WITH REGULARISATION',
        heading: 'Reduce error. Control complexity.',
        intro: 'XGBoost Regressor also adds trees sequentially. It regulates tree complexity while reducing prediction error. In this experiment, it learns to predict numeric MPG using a squared-error objective.',
        steps: [
          'XGBoost uses gradients and second derivatives of the loss to build new trees. These help estimate the direction and size of useful prediction corrections.',
          'We test depth, boosting-round count and learning_rate settings. The best combination has the lowest mean RMSE across five CV folds.',
          'The animation does not retrain the model in your browser. It replays stage predictions computed in Python. The final prediction uses all selected boosting rounds.'
        ],
        takeaway: 'XGBoost is not automatically the best model. We compare it with the other models using the same train/test split.',
        oral: 'XGBoost also corrects predictions over several steps. It reduces prediction error while limiting unnecessary tree complexity. We selected its parameters using cross-validation within the training set. We decide which model performed better using RMSE, MAE and R² on the same test data, not the model’s name.'
      },
      {
        title: 'Comparison',
        kicker: '06 / LET THE RESULTS SUPPORT THE CLAIM',
        heading: 'Which model made smaller errors?',
        intro: 'Four models predicted MPG for the same 80 test cars. MAE measures average absolute error; RMSE gives larger errors more weight. R² assesses performance relative to a constant mean prediction.',
        steps: [
          'Each model’s 8 parameter combinations used the same five CV folds. Imputation and encoding stayed inside the Pipeline. The test set was reserved for final evaluation.',
          'MAE and RMSE use MPG units: lower is better. R² is unitless: higher is better, and negative values are possible. It is not percentage accuracy.',
          'MPG is continuous, so Gradient Boosting Regressor replaces the previous Decision Tree Classifier. All four models now solve the same regression task.'
        ],
        takeaway: 'We distinguish the CV-selected model from the best observed test result. One small test set does not guarantee the same performance on every future car.',
        oral: 'Every model received the same data. We first selected parameters using five-fold cross-validation within train, then predicted MPG for 80 held-out cars. Lower MAE and RMSE are better; higher R² is better. Our conclusion follows those measures and applies to this particular dataset and split.'
      }
    ]
  }
};
