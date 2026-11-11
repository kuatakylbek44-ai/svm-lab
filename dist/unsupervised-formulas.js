/* Mathematical notes for week 10. Native MathML keeps every equation offline-ready. */
(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const row = (...parts) => `<mrow>${parts.join('')}</mrow>`;
  const i = x => `<mi>${escape(x)}</mi>`;
  const n = x => `<mn>${escape(x)}</mn>`;
  const o = x => `<mo>${escape(x)}</mo>`;
  const text = x => `<mtext>${escape(x)}</mtext>`;
  const sub = (a,b) => `<msub>${a}${row(b)}</msub>`;
  const sup = (a,b) => `<msup>${row(a)}${row(b)}</msup>`;
  const frac = (a,b) => `<mfrac>${row(a)}${row(b)}</mfrac>`;
  const sum = (lo,hi='') => hi ? `<munderover>${o('∑')}${row(lo)}${row(hi)}</munderover>` : `<munder>${o('∑')}${row(lo)}</munder>`;
  const par = a => row(o('('),a,o(')'));
  const abs = a => row(o('|'),a,o('|'));
  const norm2 = a => sup(row(o('‖'),a,o('‖')),n(2));
  const fn = (name,a) => row(`<mi mathvariant="normal">${escape(name)}</mi>`,par(a));
  const eq = o('='), plus = o('+'), minus = o('−');
  const x = index => sub(i('x'),i(index));
  const y = index => sub(i('y'),i(index));
  const mu = index => sub(i('μ'),i(index));
  const c = index => sub(i('C'),i(index));
  const pij = sub(i('p'),i('ij')), qij = sub(i('q'),i('ij'));
  const inertia = row(i('J'),eq,sum(row(i('k'),eq,n(1)),i('K')),sum(row(i('i'),o('∈'),c('k'))),norm2(row(x('i'),minus,mu('k'))));

  window.renderLessonFormulas = (page, lang, displayPage=page) => {
    if (page < 1 || page > 8) return '';
    const locale = {kk:0,ru:1,en:2}[lang] ?? 0;
    const t = (...a) => a[locale];
    const math = (body,label) => `<div class="formula-equation" tabindex="0"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="${escape(label)}">${row(body)}</math></div>`;
    const card = (title,equations,meaning,terms='',wide=false) => `<article class="method-formula-card${wide?' formula-wide':''}"><h3>${escape(title)}</h3>${equations}<p>${meaning}</p>${terms?`<p class="formula-symbols">${terms}</p>`:''}</article>`;
    const note = (symbol,meaning) => `<b>${symbol}</b> — ${meaning}`;
    const join = (...items) => items.join('; ') + '.';
    let cards = '';

    if (page === 1) {
      cards = card(t('Жалпы шығын','Общие траты','Total spending'),
        math(row(sub(text('Spending'),i('i')),eq,sum(row(i('r'),eq,n(1)),n(6)),sub(i('M'),row(i('i'),o(','),i('r')))), 'Spending_i = sum from r=1 to 6 of M_i,r'),
        t('Клиенттің алты өнім санатына жұмсаған сомасын қосамыз. Осылайша бір Spending белгісі шығады.','Складываем траты клиента по шести категориям товаров и получаем один признак Spending.','Add a customer’s spending across six product categories to create one Spending feature.'),
        join(note('i',t('клиент нөмірі','номер клиента','customer index')),note('Mᵢᵣ',t('r санатындағы шығын','траты в категории r','spending in category r')))) +
      card('StandardScaler',
        math(row(sub(i('z'),i('ij')),eq,frac(row(sub(i('x'),i('ij')),minus,mu('j')),sub(i('σ'),i('j')))), 'z_ij = (x_ij − μ_j) / σ_j'),
        t('Әр мәннен бағанның орташа мәнін алып, стандарттық ауытқуына бөлеміз. Бұл табыс сияқты үлкен сандардың қашықтыққа басым әсерін азайтады. Формула масштабтау қосылғанда қолданылады; жоғарыдағы кесте бастапқы мәндерді көрсетеді.','Вычитаем среднее столбца и делим на его стандартное отклонение. Так большие числа, например доход, меньше доминируют в расстоянии. Формула применяется при включённом масштабировании; таблица выше показывает исходные значения.','Subtract the feature mean and divide by its standard deviation. This reduces the dominance of large values such as income in distances. This applies when scaling is enabled; the table above shows raw values.'),
        join(note('xᵢⱼ',t('i клиентінің j белгісі','признак j клиента i','feature j of customer i')),note('μⱼ, σⱼ',t('бағанның орташа мәні мен стандарттық ауытқуы (ddof=0)','среднее и стандартное отклонение столбца (ddof=0)','feature mean and standard deviation (ddof=0)'))));
    }

    if (page === 2) {
      cards = card(t('K-Means мақсаты: J → min','Цель K-Means: J → min','K-Means objective: J → min'),
        math(inertia, 'J = sum over clusters k and points i in C_k of squared distance from x_i to μ_k'),
        t('Әр нүкте мен өз орталығы арасындағы қашықтықты квадраттап, бәрін қосамыз. K-Means осы қосындыны азайтуға тырысады.','Складываем квадраты расстояний от точек до своих центров. K-Means старается уменьшить эту сумму.','Sum the squared distances from points to their own centres. K-Means tries to reduce this total.'),
        join(note('K',t('топ саны','число групп','number of groups')),note('Cₖ',t('k тобының нүктелері','точки группы k','points in group k')),note('μₖ',t('топ орталығы','центр группы','group centre')),note('‖xᵢ − μₖ‖²',t('евклидтік қашықтықтың квадраты','квадрат евклидова расстояния','squared Euclidean distance'))),true) +
      card(t('1. Топқа бекіту','1. Назначение группы','1. Assign a group'),
        math(row(sub(i('c'),i('i')),eq,`<munder>${text('arg min')}${i('k')}</munder>`,norm2(row(x('i'),minus,mu('k')))), 'c_i = argmin over k of squared distance from x_i to μ_k'),
        t('Нүкте ең жақын орталығы бар топқа өтеді. cᵢ — сол топтың нөмірі.','Точка переходит в группу с ближайшим центром. cᵢ — номер этой группы.','Assign a point to the group with the nearest centre. cᵢ is that group’s index.')) +
      card(t('2. Орталықты жаңарту','2. Обновление центра','2. Update the centre'),
        math(row(mu('k'),eq,frac(n(1),abs(c('k'))),sum(row(i('i'),o('∈'),c('k'))),x('i')), 'μ_k = sum of points in C_k divided by the number of points in C_k'),
        t('Топтағы нүктелердің координаталарын орташа есептейміз. Анимациядағы орталық сол орынға жылжиды.','Усредняем координаты точек группы. Центр в анимации перемещается в эту позицию.','Average the coordinates of the group’s points. The animated centre moves to that position.'),
        note('|Cₖ|',t('топтағы нүктелер саны. Бос топтың орталығы бұл анимацияда өзгермейді.','число точек группы. Центр пустой группы в этой анимации не меняется.','number of points in the group. This animation keeps an empty group’s centre unchanged.')));
    }

    if (page === 3) {
      const si = sub(i('s'),i('i')), ai = sub(i('a'),i('i')), bi = sub(i('b'),i('i'));
      cards = card('Inertia / SSE',math(inertia,'Inertia = sum of within-cluster squared distances'),
        t('Қисықтағы әр мән — таңдалған K үшін осы қосынды. Elbow — төмендеу баяулайтын иілім; оны анықтайтын бір ғана міндетті формула жоқ.','Каждая точка кривой — эта сумма для выбранного K. Elbow — изгиб, где снижение замедляется; единственной обязательной формулы выбора локтя нет.','Each point on the curve is this sum for a chosen K. The elbow is where improvement slows; there is no single required formula for selecting it.'),
        join(note('xᵢ',t('клиенттің алты масштабталған белгісі','шесть стандартизированных признаков клиента','six standardized customer features')),note('μₖ',t('k тобының орталығы','центр группы k','centre of group k')))) +
      card('Silhouette',
        math(row(si,eq,frac(row(bi,minus,ai),fn('max',row(ai,o(','),bi)))), 's_i = (b_i − a_i) / max(a_i, b_i)') +
        math(row(i('S'),eq,frac(n(1),i('m')),sum(row(i('i'),eq,n(1)),i('m')),si), 'S = mean silhouette over m sampled points'),
        t('Нүктенің өз тобына қаншалықты жақын, басқа топтан қаншалықты алыс екенін салыстырамыз. Орташа S −1 мен 1 арасында; жоғарысы — жақсырақ бөліну. Бұл бетте m = 500 бірдей таңдалған клиент.','Сравниваем близость точки к своей группе и удалённость от другой. Среднее S лежит от −1 до 1; выше — лучшее разделение. Здесь m = 500 одних и тех же выбранных клиентов.','Compare closeness to the point’s own group with separation from another group. Mean S ranges from −1 to 1; higher means better separation. Here m = 500 customers in the same fixed sample.'),
        join(note('aᵢ',t('өз тобындағы басқа нүктелерге орташа қашықтық','среднее расстояние до остальных точек своей группы','mean distance to other points in the same group')),note('bᵢ',t('басқа топтарға орташа қашықтықтардың ең кішісі','наименьшее из средних расстояний до других групп','smallest mean distance to another group'))));
    }

    if (page === 4) {
      const Xc = sub(i('X'),i('c')), Wm = sub(i('W'),i('m'));
      cards = card(t('1. Негізгі бағыттарды табу','1. Поиск главных направлений','1. Find principal directions'),
        math(row(i('S'),eq,frac(row(sup(Xc,i('T')),Xc),row(i('n'),minus,n(1)))), 'S = X_c transpose times X_c divided by n − 1') +
        math(row(i('S'),sub(i('v'),i('j')),eq,sub(i('λ'),i('j')),sub(i('v'),i('j'))), 'S v_j = λ_j v_j'),
        t('PCA дерек ең көп өзгеретін бағыттарды табады. Үлкен λ мәніне сәйкес бағыт көбірек дисперсияны сақтайды.','PCA находит направления наибольшего изменения данных. Направление с большей λ сохраняет больше дисперсии.','PCA finds directions in which data varies most. A direction with a larger λ retains more variance.'),
        join(note('X꜀',t('әр бағанынан орташа мәні алынған деректер','данные после вычитания среднего каждого столбца','data with each feature mean subtracted')),note('S',t('ковариация матрицасы','ковариационная матрица','covariance matrix')),note('vⱼ, λⱼ',t('меншікті вектор және оның меншікті мәні','собственный вектор и его собственное значение','eigenvector and its eigenvalue')),note('n',t('2240 клиент','2240 клиентов','2,240 customers')))) +
      card(t('2. Жаңа координаталар','2. Новые координаты','2. New coordinates'),
        math(row(i('Z'),eq,Xc,Wm),'Z = X_c W_m'),
        t('Клиенттердің алты белгісін таңдалған m негізгі бағытқа проекциялаймыз. Бұл жаңа PC координаталарын береді.','Проецируем шесть признаков клиентов на m выбранных главных направлений и получаем координаты PC.','Project the six customer features onto m selected principal directions to obtain PC coordinates.'),
        join(note('Wₘ',t('ең үлкен λ-ларға сәйкес алғашқы m бағыт','первые m направлений с наибольшими λ','first m directions with the largest λ')),note('Z',t('өлшемі 2240 × m болатын нәтиже','результат размера 2240 × m','result with shape 2,240 × m')),note('m',t('жүгірткіде таңдалған 1–6 компонент','1–6 компонент, выбранных ползунком','1–6 components selected by the slider')))) +
      card(t('Сақталған дисперсия','Сохранённая дисперсия','Retained variance'),
        math(row(sub(i('R'),i('m')),eq,frac(row(sum(row(i('j'),eq,n(1)),i('m')),sub(i('λ'),i('j'))),row(sum(row(i('j'),eq,n(1)),n(6)),sub(i('λ'),i('j')))),o('×'),n(100),o('%')), 'R_m = sum of the first m eigenvalues divided by the sum of all 6 eigenvalues, times 100 percent'),
        t('Алынған компоненттер жалпы өзгергіштіктің қанша пайызын сақтағанын көрсетеді. Масштабтау қосулы, m = 2 болса ≈ 70,70%. Бұл accuracy емес.','Показывает, какой процент общей изменчивости сохранили компоненты. При масштабировании и m = 2 это ≈ 70,70%. Это не accuracy.','Shows what percentage of total variation the selected components retain. With scaling and m = 2, this is ≈ 70.70%. It is not accuracy.'),'',true);
    }

    if (page === 5) {
      cards = card(t('Клиенттерді топтау','Группировка клиентов','Grouping customers'),math(inertia,'J = sum of within-cluster squared distances in six features'),
        t('Топтар осы K-Means мақсаты бойынша алты белгі кеңістігінде есептеледі. Графиктегі екі PCA координатасы тек көрсету үшін қолданылады.','Группы рассчитываются по этой цели K-Means в пространстве шести признаков. Две координаты PCA на графике нужны только для отображения.','Groups use this K-Means objective in six-feature space. The two PCA coordinates on the plot are only for display.'),
        join(note('xᵢ',t('масштабтауға байланысты бастапқы не стандартталған алты белгі','шесть исходных или стандартизированных признаков, в зависимости от переключателя','six raw or standardized features, depending on the toggle')),note('μₖ',t('сол кеңістіктегі топ орталығы','центр группы в этом пространстве','group centre in that space')))) +
      card(t('Клиент тобының карточкасы','Карточка группы клиентов','Customer group card'),
        math(row(sub(i('n'),i('k')),eq,abs(c('k'))),'n_k = number of customers in cluster C_k') +
        math(row(sub(`<mover>${i('x')}${o('¯')}</mover>`,row(i('k'),o(','),i('j'))),eq,frac(row(sum(row(i('i'),o('∈'),c('k'))),sub(i('x'),i('ij'))),sub(i('n'),i('k')))), 'Mean feature j in cluster k = sum of raw feature values divided by cluster size n_k'),
        t('C1 · 177 дегендегі 177 — топтағы клиент саны. Income, Spending, Recency және сатып алу сандары — сол топтағы бастапқы мәндердің орташа көрсеткіші.','В записи C1 · 177 число 177 — размер группы. Income, Spending, Recency и количества покупок — средние исходных значений клиентов этой группы.','In C1 · 177, 177 is the number of customers. Income, Spending, Recency and purchase counts are the group’s means in the original units.'),
        join(note('nₖ',t('клиент саны','число клиентов','customer count')),note('xᵢⱼ',t('i клиентінің j белгісінің бастапқы мәні','исходное значение признака j клиента i','raw feature j of customer i'))));
    }

    if (page === 6) {
      const Neps = fn('Nε',x('i'));
      const distance = row(i('d'),par(row(x('i'),o(','),x('j'))));
      const ward = row(i('Δ'),par(row(i('A'),o(','),i('B'))),eq,frac(row(abs(i('A')),abs(i('B'))),row(abs(i('A')),plus,abs(i('B')))),norm2(row(mu('A'),minus,mu('B'))));
      cards = card(t('DBSCAN: көршілік және тірек нүкте','DBSCAN: соседи и ядро','DBSCAN: neighbourhood and core point'),
        math(row(Neps,eq,o('{'),x('j'),o(':'),distance,o('≤'),i('ε'),o('}')), 'Nε(x_i) = points x_j whose distance to x_i is at most ε') +
        math(row(abs(Neps),o('≥'),text('min_samples')), 'A core point has at least min_samples points in its ε-neighbourhood, including itself'),
        t('ε радиусындағы нүктелерді санаймыз. Саны min_samples-тан кем болмаса, бұл — тірек нүкте. Нүктенің өзі де саналады. Тірек емес нүкте топтың шетіне кіруі мүмкін; әр тірек емес нүкте шу бола бермейді.','Считаем точки в радиусе ε, включая саму точку. Если их не меньше min_samples, точка является ядром. Неядерная точка может быть граничной; не каждая такая точка — шум.','Count points within ε, including the point itself. At least min_samples makes it a core point. A non-core point may be a border point; not every non-core point is noise.'),
        join(note('d',t('евклидтік қашықтық','евклидово расстояние','Euclidean distance')),note('ε',t('eps жүгірткісінің радиусы','радиус ползунка eps','radius set by the eps slider'))));
      cards += card('Hierarchy: single / complete',
        math(row(sub(i('d'),text('single')),par(row(i('A'),o(','),i('B'))),eq,`<munder>${text('min')}${row(i('a'),o('∈'),i('A'),o(','),i('b'),o('∈'),i('B'))}</munder>`,fn('d',row(i('a'),o(','),i('b')))), 'Single linkage = minimum distance between a point in A and a point in B') +
        math(row(sub(i('d'),text('complete')),par(row(i('A'),o(','),i('B'))),eq,`<munder>${text('max')}${row(i('a'),o('∈'),i('A'),o(','),i('b'),o('∈'),i('B'))}</munder>`,fn('d',row(i('a'),o(','),i('b')))), 'Complete linkage = maximum distance between a point in A and a point in B'),
        t('A мен B — екі топ. Single ең жақын екі нүктеге, complete ең алыс екі нүктеге қарайды. Әр қадамда таңдалған өлшемі ең кіші екі топ бірігеді.','A и B — две группы. Single смотрит на ближайшую пару точек, complete — на самую далёкую. На каждом шаге объединяется пара групп с наименьшей выбранной мерой.','A and B are two groups. Single uses the closest pair of points; complete uses the furthest pair. At each step, merge the two groups with the smallest selected linkage value.')) +
      card('Hierarchy: Ward',math(ward,'Ward increase in SSE = |A| |B| / (|A| + |B|) times squared distance between the group means'),
        t('Ward екі топты қосқанда ішкі квадраттық қателік қанша өсетінін есептейді. Өсуі ең аз жұп біріктіріледі.','Ward вычисляет прирост внутригрупповой суммы квадратов при слиянии. Объединяется пара с наименьшим приростом.','Ward measures the increase in within-cluster sum of squares caused by a merge. Merge the pair with the smallest increase.'),
        join(note('|A|, |B|',t('топтардағы нүкте саны','число точек в группах','group sizes')),note('μA, μB',t('топтардың орташа координаталары','средние координаты групп','group means'))),true);
    }

    if (page === 7) {
      const conditional = (j,k) => sub(i('p'),row(i(j),o('|'),i(k)));
      const gaussian = j => fn('exp',row(minus,frac(norm2(row(x('i'),minus,x(j))),row(n(2),sup(sub(i('σ'),i('i')),n(2))))));
      const student = (a,b) => sup(par(row(n(1),plus,norm2(row(y(a),minus,y(b))))),row(minus,n(1)));
      cards = card(t('Негізгі мақсат: KL айырмасын азайту','Главная цель: уменьшить KL-расхождение','Main objective: minimize KL divergence'),
        math(row(i('C'),eq,fn('KL',row(i('P'),o('‖'),i('Q'))),eq,sum(row(i('i'),o('≠'),i('j'))),pij,fn('log',frac(pij,qij)),o('→'),text('min')), 'C = KL(P || Q) = sum over i ≠ j of p_ij log(p_ij / q_ij), minimized'),
        t('Бастапқы деректегі ұқсастық пен 2D картадағы ұқсастықты салыстырады. t-SNE нүктелердің орнын жылжытып, осы айырманы азайтуға тырысады.','Сравнивает сходство в исходных данных со сходством на 2D-карте. t-SNE перемещает точки, стараясь уменьшить это расхождение.','Compare similarities in the original data with similarities on the 2D map. t-SNE moves the map points to reduce this mismatch.'),
        join(note('pᵢⱼ',t('алты белгі бойынша ұқсастық ықтималдығы','вероятность сходства по шести признакам','similarity probability in six-feature space')),note('qᵢⱼ',t('картадағы ұқсастық ықтималдығы','вероятность сходства на карте','similarity probability on the map')),note('C',t('азайтылатын қате, accuracy емес','минимизируемая ошибка, не accuracy','loss to minimize, not accuracy'))),true) +
      card(t('1. Бастапқы кеңістіктегі ұқсастық','1. Сходство в исходном пространстве','1. Similarity in the original space'),
        math(row(conditional('j','i'),eq,frac(gaussian('j'),row(sum(row(i('k'),o('≠'),i('i'))),gaussian('k')))), 'p_j|i = exp(−||x_i − x_j||² / (2σ_i²)) divided by the sum of these values over k ≠ i') +
        math(row(pij,eq,frac(row(conditional('j','i'),plus,conditional('i','j')),row(n(2),i('n')))), 'p_ij = (p_j|i + p_i|j) / (2n)'),
        t('Жақын клиенттерге үлкенірек ықтималдық беріледі. Екі бағыттағы ықтималдықты біріктіріп, pᵢⱼ аламыз.','Близким клиентам назначается большая вероятность. Объединяем вероятности в двух направлениях и получаем pᵢⱼ.','Nearby customers receive higher probabilities. Combine both directions to obtain pᵢⱼ.'),
        join(note('xᵢ, xⱼ',t('клиенттердің алты масштабталған белгісі','шесть стандартизированных признаков клиентов','customers’ six standardized features')),note('n',t('2240 клиент','2240 клиентов','2,240 customers')),note('σᵢ',t('perplexity мәніне сай таңдалатын көршілік ені','ширина соседства, подбираемая под perplexity','neighbourhood width fitted to the selected perplexity')))) +
      card(t('2. 2D картадағы ұқсастық','2. Сходство на 2D-карте','2. Similarity on the 2D map'),
        math(row(qij,eq,frac(student('i','j'),row(sum(row(i('k'),o('≠'),i('l'))),student('k','l')))), 'q_ij = (1 + ||y_i − y_j||²)^(−1) divided by the sum over k ≠ l of (1 + ||y_k − y_l||²)^(−1)'),
        t('Картадағы жақындық Student t үлестірімі арқылы есептеледі. Ол алыс нүктелерді картада бөлуге көбірек орын қалдырады.','Сходство на карте рассчитывается через распределение Стьюдента. Оно оставляет больше места для разделения далёких точек.','Map similarities use a Student t distribution, leaving more room to separate distant points.'),
        join(note('yᵢ, yⱼ',t('картадағы екі координата','две координаты на карте','two-dimensional map coordinates')),note('i ≠ j, k ≠ l',t('нүкте өзімен салыстырылмайды; pᵢᵢ = qᵢᵢ = 0','точка не сравнивается с собой; pᵢᵢ = qᵢᵢ = 0','exclude self-pairs; pᵢᵢ = qᵢᵢ = 0'))));
    }

    if (page === 8) {
      const TP = text('TP'), TN = text('TN'), FP = text('FP'), FN = text('FN');
      cards = card(t('Дәлдік және сирек класты табу','Точность и поиск редкого класса','Accuracy and finding the rare class'),
        math(row(text('Accuracy'),eq,frac(row(TP,plus,TN),row(TP,plus,TN,plus,FP,plus,FN))), 'Accuracy = (TP + TN) / (TP + TN + FP + FN)') +
        math(row(text('Precision'),eq,frac(TP,row(TP,plus,FP))), 'Precision = TP / (TP + FP)') +
        math(row(text('Recall'),eq,frac(TP,row(TP,plus,FN))), 'Recall = TP / (TP + FN)') +
        math(row(sub(i('F'),n(1)),eq,frac(row(n(2),TP),row(n(2),TP,plus,FP,plus,FN))), 'F1 = 2TP / (2TP + FP + FN)'),
        t('Оң класс — сирек класс 1. Precision: «1» деген болжамның қаншасы дұрыс? Recall: шын «1»-лердің қаншасын таптық? F1 екеуін бірге бағалайды. Бөлім нөл болса, осы код көрсеткішті 0 деп алады.','Положительный класс — редкий класс 1. Precision: сколько предсказаний «1» верны? Recall: сколько реальных «1» найдено? F1 объединяет оба показателя. При нулевом знаменателе этот код возвращает 0.','The positive class is rare class 1. Precision asks how many predicted positives are correct; recall asks how many actual positives were found. F1 combines both. This code returns 0 for a zero denominator.'),
        join(note('TP, TN',t('дұрыс табылған 1 және 0','верно найденные 1 и 0','correctly predicted 1 and 0')),note('FP',t('шын 0-ге қате 1 деу','ошибочно сказать 1 для настоящего 0','predicting 1 for an actual 0')),note('FN',t('шын 1-ге қате 0 деу','ошибочно сказать 0 для настоящего 1','predicting 0 for an actual 1')))) +
      card('SMOTE',
        math(row(sub(i('x'),text('new')),eq,x('i'),plus,i('α'),par(row(sub(i('x'),text('neighbor')),minus,x('i')))), 'x_new = x_i + α (x_neighbor − x_i)') +
        math(row(n(0),o('≤'),i('α'),o('<'),n(1)), '0 ≤ α < 1'),
        t('Сирек кластағы нүкте мен сол кластағы жақын көршісінің арасынан жаңа нүкте аламыз. α — кездейсоқ үлес. Тек train жиынында қолданылады.','Создаём новую точку между редким примером и его близким соседом того же класса. α — случайная доля. Применяется только к train.','Create a point between a minority example and a nearby example from the same class. α is a random fraction. Apply this only to the training set.'),
        t('Oversampling бар мысалдарды қайталайды; undersampling көп кластың мысалдарын азайтады. Олар жаңа мәндерді осы SMOTE формуласымен жасамайды.','Oversampling повторяет существующие примеры; undersampling удаляет часть частого класса. Они не создают значения по формуле SMOTE.','Oversampling repeats existing examples; undersampling removes some majority examples. They do not create values with the SMOTE formula.')) +
      card('Class weight: balanced',
        math(row(sub(i('w'),i('c')),eq,frac(i('N'),row(i('L'),sub(i('n'),i('c'))))), 'w_c = N / (L × n_c)'),
        t('Сирек класқа үлкенірек салмақ береміз. Мұндағы N — train мысалдарының саны, L = 2 — класс саны, n꜀ — train ішіндегі c класының саны.','Редкому классу даём больший вес. N — число примеров train, L = 2 — число классов, n꜀ — число примеров класса c в train.','Give the rare class a larger weight. N is the training-set size, L = 2 is the number of classes, and n꜀ is the training count of class c.')) +
      card(t('Болжам шегі','Порог предсказания','Prediction threshold'),
        math(row(`<mover>${i('y')}${o('^')}</mover>`,eq,n(1),o('⇔'),fn('p',row(i('y'),eq,n(1),o('|'),i('x'))),o('≥'),i('τ')), 'Predict class 1 if and only if p(y = 1 | x) ≥ τ; otherwise predict class 0'),
        t('Ықтималдық τ шегіне тең не одан жоғары болса — 1, әйтпесе — 0. Жүгірткі τ-ды өзгертеді, сондықтан қателер матрицасы мен көрсеткіштер де өзгереді.','Если вероятность не меньше порога τ, ответ — 1, иначе — 0. Ползунок меняет τ, поэтому меняются матрица ошибок и метрики.','Predict 1 when the probability is at least τ; otherwise predict 0. The slider changes τ, so the confusion matrix and metrics change.'));
    }

    const source = page === 7 ? `<p class="small-note"><a href="https://www.jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf">${t('t-SNE: бастапқы ғылыми мақала','t-SNE: оригинальная научная статья','t-SNE: original research paper')} ↗</a></p>` : '';
    return `<section class="formula-section" id="formulas" aria-labelledby="formula-title"><header class="formula-heading"><span class="formula-mark" aria-hidden="true">ƒ</span><div><h2 id="formula-title">${t('Әдістің формулалары','Формулы метода','Method formulas')}</h2><p>${t('Формула → белгілер → мағынасы','Формула → обозначения → смысл','Equation → symbols → meaning')}</p></div><span class="formula-page">${String(displayPage).padStart(2,'0')}</span></header><div class="formula-grid">${cards}</div>${source}</section>`;
  };
})();
