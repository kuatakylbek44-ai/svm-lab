(() => {
  'use strict';
  const index = {kk:0,ru:1,en:2}[document.documentElement.lang];
  const t = (...copy) => copy[index];
  window.CNN_CONTENT = [
    {
      id:'overview', title:t('Пиксельден түсінікке','От пикселя к пониманию','From pixels to understanding'), sections:['setup','datasets'],
      lead:t('CNN суретті тұтас жаттамай, шағын сүзгілер арқылы жергілікті белгілерді үйренеді. Мысалдар: цифрлар мен киім суреттері.','CNN учится находить локальные признаки маленькими фильтрами. Примеры: цифры и изображения одежды.','A CNN learns local features through small filters. Our examples are digits and clothing images.'),
      explain:t('Алдымен сүзгінің 3×3 терезесі қалай жылжитынын көр. Кейін ReLU мен pooling нәтижесін, соңында нақты оқытылған үш модельді салыстыр. Сайттағы эпоха анимациясы сақталған оқыту нәтижелерін көрсетеді.','Сначала посмотри движение окна 3×3. Затем изучи ReLU и pooling, после — три обученные модели. Анимация эпох воспроизводит сохранённые результаты обучения.','Start with the moving 3×3 window, then explore ReLU and pooling. Finally compare three trained models. Epoch animations replay recorded training results.'),
      show:t('Ақылбек: «Мен сүзгі мен картаны көрсетемін». Алмас: «Мен оқытылған CNN-нің ықтималдығын және тест нәтижесін түсіндіремін».','Акылбек: «Покажу фильтр и карту признаков». Алмас: «Объясню вероятности и тестовые результаты CNN».','Akylbek: “I will show filters and feature maps.” Almas: “I will explain predictions and test results.”'),
      formula:'Image → Conv2D → ReLU → MaxPool → Flatten → Dense → Softmax'
    },
    {
      id:'convolution', title:t('Сүзгі қалай есептейді?','Как считает фильтр?','How does a filter compute?'),sections:['convolution'],
      lead:t('6×6 кірістен 3×3 терезені алып, сүзгімен элемент бойынша көбейтеміз. Көбейтінділердің қосындысы — шығыс картасының бір ұяшығы.','Берём окно 3×3 из входа 6×6. Поэлементно умножаем на фильтр и складываем. Сумма — одна ячейка выходной карты.','Take a 3×3 patch from the 6×6 input. Multiply it element by element by the filter and sum. The sum fills one output cell.'),
      explain:t('Алғашқы терезеде 3·1 + 0·0 + 1·(−1) + 1·1 + 5·0 + 8·(−1) + 2·1 + 7·0 + 2·(−1) = −5. CNN Conv2D әдетте cross-correlation орындайды. Convolution режимі сүзгіні 180° аударады, сондықтан бұл сүзгіде таңба өзгереді.','Первое окно: 3·1 + 0·0 + 1·(−1) + 1·1 + 5·0 + 8·(−1) + 2·1 + 7·0 + 2·(−1) = −5. Conv2D обычно выполняет cross-correlation. Режим convolution переворачивает фильтр на 180°, меняя здесь знак.','The first patch gives 3·1 + 0·0 + 1·(−1) + 1·1 + 5·0 + 8·(−1) + 2·1 + 7·0 + 2·(−1) = −5. Conv2D normally uses cross-correlation. Convolution flips the filter 180°, reversing the sign for this filter.'),
      show:t('«Бір қадам» батырмасын бас. Боялған терезе оңға жылжығанда шығыс картасында жаңа сан пайда болады.','Нажми «Один шаг». Пока выделенное окно движется вправо, в выходной карте появляется новое число.','Press “One step.” As the highlighted patch moves right, another output cell is revealed.'),
      formula:'Y[i,j] = Σᵤ Σᵥ X[i+u,j+v] · K[u,v]'
    },
    {
      id:'padding', title:'Padding & Stride',sections:['convolution'],
      lead:t('Padding — шетке қосылатын нөлдер. Stride — терезенің жылжу қадамы. Екеуі шығыс өлшеміне әсер етеді.','Padding — нули вокруг изображения. Stride — шаг движения окна. Оба меняют размер выхода.','Padding adds zeros around the image. Stride is the step between window positions. Both change output size.'),
      explain:t('N=6, F=3, P=0, S=1 болса шығыс 4×4. P=1 → 6×6, P=2 → 8×8. P=0, S=2 болса 2×2. Жұп сүзгіде same padding екі жаққа тең түспеуі мүмкін. Мұнда тек 3×3 сүзгі қолданылады.','При N=6, F=3, P=0, S=1 получаем 4×4. P=1 даёт 6×6, P=2 — 8×8. P=0, S=2 даёт 2×2. Для чётных фильтров same-padding бывает асимметричным; здесь фильтр 3×3.','For N=6, F=3, P=0, S=1 the output is 4×4. P=1 gives 6×6 and P=2 gives 8×8. P=0, S=2 gives 2×2. Same-padding can be asymmetric for even filters; this lab uses 3×3 filters.'),
      show:t('Padding мәнін 0-ден 1-ге ауыстыр. Қосылған нөлдерді және шығыс өлшемін көрсет. Сосын stride=2 таңда.','Поменяй padding с 0 на 1. Покажи добавленные нули и размер выхода, затем выбери stride=2.','Switch padding from 0 to 1 and point out the zero border and output size. Then choose stride=2.'),
      formula:'Nout = floor((N + 2P − F) / S) + 1'
    },
    {
      id:'edges', title:t('Sobel және ReLU','Sobel и ReLU','Sobel and ReLU'),sections:['edges'],
      lead:t('Сүзгі жарық пен қараңғы аймақтың шекарасын табады. ReLU теріс жауапты 0-ге ауыстырады.','Фильтр выделяет переход от светлого к тёмному. ReLU заменяет отрицательный ответ нулём.','The filter detects a transition between light and dark. ReLU replaces negative responses with zero.'),
      explain:t('255 пен 120 арасындағы тік шекараға Sobel X оң жауап береді. Суретті аударғанда жауап теріс болады. ReLU осы теріс мәндерді жояды. Sobel Y көлденең шекараны қарайды. Мұндағы Sobel — дайын сүзгі, оқытылған CNN сүзгісі деректен үйреніледі.','На вертикальной границе 255 и 120 Sobel X даёт положительный ответ. После отражения он отрицательный. ReLU обнуляет его. Sobel Y выделяет горизонтальные переходы. Sobel задан вручную, а CNN учит свои фильтры по данным.','Sobel X responds positively to the vertical 255-to-120 boundary. Flipping the image reverses the sign, and ReLU removes negative values. Sobel Y detects horizontal transitions. Sobel is fixed; trained CNN filters are learned from data.'),
      show:t('Суретті аудар да, ReLU-ді қосып-өшір. Таңба мен карта түсінің өзгерісін түсіндір.','Отрази изображение и включи/выключи ReLU. Объясни изменение знака и цвета карты.','Flip the image and toggle ReLU. Explain the change in sign and map color.'),
      formula:'Gx = X ⋆ Kx · Gy = X ⋆ Ky · |G| = √(Gx² + Gy²) · ReLU(z) = max(0,z)'
    },
    {
      id:'pooling', title:t('Pooling: маңызды мәнді сақтау','Pooling: сохранить сильный сигнал','Pooling: keep the strongest response'),sections:['edges'],
      lead:t('Әр 2×2 терезеден ең үлкен мәнді алып, картаны 2 есе кішірейтеміз. Pooling-де үйренілетін салмақ жоқ.','Берём максимум каждого окна 2×2 и уменьшаем карту вдвое. У pooling нет обучаемых весов.','Take the maximum from every 2×2 block, halving the map width and height. Pooling has no trainable weights.'),
      explain:t('Бірінші терезе [1,4;3,2]: Max=4, Average=2,5. MaxPool үшін толық нәтиже [4,8;6,9]. Бұл амал орналасудың шағын өзгерістеріне сезімталдықты азайтады, бірақ кейбір ақпарат жоғалады.','Первое окно [1,4;3,2]: Max=4, Average=2,5. Полный MaxPool даёт [4,8;6,9]. Операция уменьшает чувствительность к небольшим смещениям, но часть информации теряется.','The first patch [1,4;3,2] gives Max=4 and Average=2.5. Full MaxPool is [4,8;6,9]. It reduces sensitivity to small shifts while discarding some information.'),
      show:t('Терезені қадаммен ауыстыр. MaxPool мен AveragePool нәтижелерін салыстыр.','Перемещай окно по шагам. Сравни MaxPool с AveragePool.','Step through the blocks and compare MaxPool with AveragePool.'),
      formula:'MaxPool(B) = max(B) · AveragePool(B) = ΣB / 4'
    },
    {
      id:'architecture', title:t('CNN ішіндегі карталар','Карты внутри CNN','Feature maps inside a CNN'),sections:['datasets'],
      lead:t('Алғашқы тест цифры үшін оқытылған сүзгіні, Conv2D картасын және pooling нәтижесін көр.','Посмотри обученный фильтр, карту Conv2D и результат pooling для первой тестовой цифры.','Inspect a learned filter, its Conv2D feature map, and the pooled map for the first test digit.'),
      explain:t('Базалық желі: 28×28×1 → 26×26×8 → 13×13×8 → 1352 → 10. 8 сүзгінің әрқайсысы басқа карта береді. Сүзгі саны — шығыс арна саны. Карта бір цифрға есептелген, соңғы класс ықтималдығы барлық карталардан бірге табылады.','Базовая сеть: 28×28×1 → 26×26×8 → 13×13×8 → 1352 → 10. Восемь фильтров дают восемь карт. Число фильтров равно числу выходных каналов. Вероятность класса вычисляется по всем картам вместе.','Baseline: 28×28×1 → 26×26×8 → 13×13×8 → 1352 → 10. Eight filters produce eight output channels. Class probabilities use all maps together.'),
      show:t('Арна жүгірткісін жылжыт. Сүзгі салмақтары мен сол арнадағы белсенді аймақтарды көрсет.','Передвигай канал. Покажи веса фильтра и активные области соответствующей карты.','Move the channel slider and point out the learned weights and the active areas of its map.'),
      formula:'Conv parameters = (Fh · Fw · Cin + bias) · Cout'
    },
    {
      id:'training', title:t('Оқыту және болжам','Обучение и прогноз','Training and predictions'),sections:['mnist','fashion','export'],
      lead:t('Модель мен тест суретін таңда. Эпоха жүгірткісі сол кескіннің 10 ықтималдығын өзгертеді.','Выбери модель и тестовое изображение. Ползунок эпох меняет десять вероятностей выбранного примера.','Choose a model and a test image. The epoch slider replays its ten class probabilities.'),
      explain:t('Бұл — нақты оқытудың сақталған нәтижесі. Эпоха 0 оқытылмаған модельді білдіреді. Бір суреттің ықтималдығы әр қадамда өсуге міндетті емес. Жалпы test accuracy соңғы модельмен барлық 10 000 тест суреттен есептеледі.','Это сохранённые результаты реального обучения. Эпоха 0 — исходная необученная сеть. Вероятность отдельного примера может падать. Общая test accuracy посчитана финальной моделью на 10 000 изображениях.','These are recorded results from actual training. Epoch 0 is the untrained network. A single image’s probability can fall. Final test accuracy is measured on all 10,000 test images.'),
      show:t('Алмас модельді және қате мысалды таңдайды. Эпоханы 0-ден соңына жылжытып, болжам қалай өзгергенін түсіндіреді.','Алмас выбирает модель и ошибочный пример. Проводит ползунок от 0 до конца и объясняет изменение прогноза.','Almas selects a model and a mistaken example, then moves from epoch 0 to the end to explain the changing prediction.'),
      formula:'pⱼ = exp(zⱼ)/Σ exp(zₖ) · ŷ = argmax p · Accuracy = correct/total'
    },
    {
      id:'defense', title:t('Екеуміз қорғаймыз','Защищаем вдвоём','Presenting together'),sections:['export'],
      lead:t('Ақылбек: 1–5 беттер. Алмас: архитектура, оқыту және нәтижені салыстыру.','Акылбек: страницы 1–5. Алмас: архитектура, обучение и сравнение результатов.','Akylbek presents pages 1–5. Almas presents architecture, training, and results.'),
      explain:t('Көрсетілімді сүзгінің бірінші ұяшығынан баста. Кейін pooling терезесін көрсет. Алмас нақты модельге өтіп, бір цифрдың ықтималдық тарихын ашады. Қате мысалды жасырмай, неліктен шатасуы мүмкін екенін талқыла.','Начни с первой ячейки фильтра и окна pooling. Алмас переходит к обученной сети и открывает историю вероятностей одного примера. Покажите ошибку и обсудите возможную причину.','Start with the first filter output and a pooling window. Almas opens the trained model and its probability history. Show an error and discuss a possible reason.'),
      show:t('Негізгі сұрақтар: padding не үшін? ReLU не өзгертеді? Pooling салмағы бар ма? Ықтималдық пен accuracy айырмасы қандай?','Вопросы: зачем padding? Что меняет ReLU? Есть ли веса у pooling? Чем вероятность отличается от accuracy?','Questions: Why padding? What does ReLU change? Does pooling have weights? How do probability and accuracy differ?'),
      formula:'Train learns weights · Validation compares choices · Test measures held-out performance'
    },
    {
      id:'code', title:t('Толық код және файлдар','Полный код и файлы','Full code and files'),sections:[],
      lead:t('Python скрипті, нәтижелері сақталған notebook және бастапқы тапсырма.','Python-скрипт, notebook с сохранёнными результатами и исходное задание.','Python script, notebook with recorded outputs, and the original assignment.'),
      explain:t('Notebook ұяшықтарын ретімен орында. Негізгі файл MNIST пен Fashion-MNIST-ті оқытады. --cifar параметрі қосымша CIFAR-10 архитектурасын іске қосады; сайтта оған өлшенген дәлдік берілмейді.','Выполняй ячейки по порядку. Основной файл обучает MNIST и Fashion-MNIST. --cifar запускает дополнительную архитектуру CIFAR-10; её измеренная точность на сайте не заявлена.','Run the notebook cells in order. The main file trains MNIST and Fashion-MNIST. --cifar runs the additional CIFAR-10 architecture; the site does not claim a measured CIFAR score.'),
      show:t('Толық кодтағы convolution, train және architecture функцияларын көрсет.','Покажи раздел convolution и функции train и architecture.','Point out the convolution section and the train and architecture functions.'),
      formula:'python cnn-study.py · python cnn-study.py --cifar'
    }
  ];
})();
