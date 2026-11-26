(() => {
 'use strict';
 const lang=document.documentElement.lang,li={kk:0,ru:1,en:2}[lang],t=(...values)=>values[li];
 const suffix=lang==='kk'?'':'.'+lang,back=`index${suffix}.html#topic-group-13`;
 const $=id=>document.getElementById(id),main=$('archMain'),core=window.CNN13,pages=window.CNN13_CONTENT;
 const keys=Object.keys(core.models),steps=Object.fromEntries(keys.map(key=>[key,0]));
 const labels={explanation:t('Түсіндірме','Объяснение','Explanation'),formulas:t('Формулалар','Формулы','Formulas'),code:t('Осы беттің коды','Код страницы','Page code'),full:t('Толық код','Полный код','Full code'),play:t('Анимацияны қарау','Смотреть анимацию','Play animation'),pause:t('Кідірту','Пауза','Pause'),step:t('Бір қадам','Один шаг','One step'),reset:t('Басынан','Сначала','Reset'),input:t('Кіріс','Вход','Input'),output:t('Шығыс','Выход','Output'),next:t('Келесі бет','Следующая страница','Next page'),layer:t('Қабат / блок','Слой / блок','Layer / block')};
 const fmt=n=>new Intl.NumberFormat(lang==='en'?'en-US':'ru-RU',{maximumFractionDigits:1}).format(n);
 const shape=s=>s.join(' × ');
 const state={channels:64,bottleneck:true,residualX:3,residualF:-1,shortcut:true,compareA:'vgg',compareB:'resnet',sample:0,epoch:5,errorsOnly:false,sourceChoice:'week13-files/cnn-architectures.py'};
 let active=0,timer,comparisonTimer,comparisonData,comparisonError=false;
 const sourceRequests=new Map();
 const sourceFile='week13-files/cnn-architectures.py';
 const trainingFile='week13-files/mnist-compare.py';
 const panel=(title,body)=>`<section class="week11-panel"><h3>${title}</h3>${body}</section>`;
 const metrics=items=>`<div class="week11-metrics">${items.map(([value,label])=>`<div><strong>${value}</strong><small>${label}</small></div>`).join('')}</div>`;
 const select=(id,label,options,value)=>`<label>${label}<select id="${id}">${options.map(([v,name])=>`<option value="${v}" ${v===value?'selected':''}>${name}</option>`).join('')}</select></label>`;
 const range=(id,label,min,max,value)=>`<label for="${id}">${label} <output id="${id}Value">${value}</output><input id="${id}" type="range" min="${min}" max="${max}" value="${value}"></label>`;
 const check=(id,label,value)=>`<label><span><input type="checkbox" id="${id}" ${value?'checked':''}> ${label}</span></label>`;
 const stack=()=>'<div class="arch-stack" aria-hidden="true"><i></i><i></i><i></i></div>';
 const downloads=(file=sourceFile)=>`<div class="topic-lab-actions"><a class="topic-lab-button" href="${file.replace(/\.py$/,'.ipynb')}" download>↓ Colab notebook</a><a class="topic-lab-button" href="${file}" download>↓ Python</a></div>`;
 const toolbar=()=>`<div class="topic-lab-actions topic-lab-reference"><button class="topic-lab-button" data-dialog="code">&lt;/&gt; ${labels.code}</button><button class="topic-lab-button" data-dialog="formulas">ƒ ${labels.formulas}</button><button class="topic-lab-button" data-dialog="explanation">${labels.explanation}</button>${active===8?'':`<a class="topic-lab-button" href="#code">${labels.full}</a>`}</div>`;
 const idea=key=>({
   lenet:t('Қарапайым тізбек: сүзгі, кішірейту, тану.','Простая цепочка: фильтр, уменьшение, распознавание.','A simple chain: filter, reduce, classify.'),
   alexnet:t('ReLU және тереңірек CNN; оқытуда Dropout.','ReLU и более глубокая CNN; Dropout при обучении.','ReLU and a deeper CNN; dropout during training.'),
   vgg:t('Бірнеше шағын 3×3 сүзгі бірінен кейін бірі.','Несколько маленьких фильтров 3×3 подряд.','Several small 3×3 filters in sequence.'),
   inception:t('Бір кірісті бірнеше тармақ қатар өңдейді.','Несколько ветвей обрабатывают один вход параллельно.','Several branches process the same input in parallel.'),
   resnet:t('Блок нәтижесіне кірісті қосатын shortcut.','Shortcut прибавляет вход к результату блока.','A shortcut adds the input to the block result.')
 }[key]);
 function overview(){
   return `<div class="topic-lab-hero"><div><p class="topic-lab-kicker">13 / ${t('СӨЖ · CNN АРХИТЕКТУРАЛАРЫ','СРС · АРХИТЕКТУРЫ CNN','ASSIGNMENT · CNN ARCHITECTURES')}</p><h1>${t('Бір сурет.<br>Бес архитектура.','Одно изображение.<br>Пять архитектур.','One image.<br>Five architectures.')}</h1><p class="topic-lab-question">${t('Желі қалай құрылады?','Как устроена сеть?','How is a network built?')}</p><p class="week11-lead">${pages[0].lead}</p><a href="#lenet" class="topic-lab-button primary">${t('Зертхананы бастау','Начать лабораторную','Start the lab')}</a>${toolbar()}${downloads()}</div><div class="arch-intro"><p>${t('Қабаттарды бақыла · Өзгерт · Түсіндір','Наблюдай слои · Изменяй · Объясняй','Follow the layers · Change · Explain')}</p><div class="arch-timeline">${keys.map(key=>`<a href="#${key}"><em>${core.models[key].year}</em><b>${core.models[key].name}</b><span>${key==='lenet'?'Conv + Pool':key==='alexnet'?'ReLU':key==='vgg'?'3×3':key==='inception'?'Parallel':'F(x) + x'}</span></a>`).join('')}</div></div></div><p class="arch-insight">${pages[0].show}</p>`;
 }
 function stageLabel(stage){return stage.name.replace(/^Input$/,labels.input).replace(/^Output/,labels.output);}
 function stageDescription(stage,key){
   if(stage.kind==='input')return t('Алғашқы екі сан — биіктік пен ен. Соңғы сан — арналар: 1 қара-ақ, 3 RGB. Бұл сызба өлшемдерді көрсетеді.','Первые два числа — высота и ширина. Последнее — каналы: 1 для серого, 3 для RGB. Схема показывает размеры.','The first two numbers are height and width. The last is channels: 1 for grayscale, 3 for RGB. The diagram shows shapes.');
   if(stage.kind==='flatten')return t('Flatten барлық мәнді бір қатарға орналастырады. Сандар саны сақталады: биіктік × ен × арна.','Flatten раскладывает все значения в один вектор. Число значений сохраняется: высота × ширина × каналы.','Flatten places every value into one vector. The value count is preserved: height × width × channels.');
   if(stage.kind==='output')return key==='lenet'?t('10 шығыс — цифрлардың 10 класы. Оқу кодындағы Softmax — жеңілдетілген нұсқа; түпнұсқа LeNet-5 басқа шығыс функциясын қолданды.','10 выходов соответствуют цифрам. Softmax в учебном коде — упрощение; оригинальная LeNet-5 использовала другой выходной механизм.','Ten outputs correspond to digits. Softmax in the teaching code is a simplification; original LeNet-5 used a different output mechanism.'):t('1000 шығыс — бастапқы ImageNet тапсырмасының кластары. Softmax ықтималдықтардың қосындысын 1 етеді. Бұл сызбада болжам есептелмейді.','1000 выходов — классы исходной задачи ImageNet. Softmax даёт вероятности с суммой 1. Эта схема не вычисляет прогноз.','The 1,000 outputs are classes in the original ImageNet task. Softmax yields probabilities summing to 1. This diagram does not compute predictions.');
   if(stage.kind==='pool')return stage.shape.length===1?t('Global average pooling әр арнаның кеңістіктегі мәндерін орташалайды. Әр арнадан бір сан қалады.','Global average pooling усредняет пространственные значения каждого канала. От канала остаётся одно число.','Global average pooling averages spatial values within each channel, leaving one number per channel.'):key==='lenet'?t('LeNet-5-та subsampling картаны кішірейтеді. Оқу нұсқасында AveragePooling қолданылады; түпнұсқада үйренілетін коэффициенттер болды.','Subsampling уменьшает карту. Учебная версия использует AveragePooling; в оригинале были обучаемые коэффициенты.','Subsampling reduces the map. The teaching version uses AveragePooling; the original had learned coefficients.'):t('MaxPool жергілікті терезеден максимумды алады. Биіктік пен ен кішірейеді, арналар саны сақталады.','MaxPool выбирает максимум локального окна. Высота и ширина уменьшаются, число каналов сохраняется.','MaxPool selects the maximum of a local window. Height and width decrease; channel count stays the same.');
   if(stage.kind==='concat')return t('Тармақтардың биіктігі мен ені бірдей. Concatenate олардың арналарын қатар біріктіреді, мәндерді бір-біріне қоспайды.','Высота и ширина ветвей совпадают. Concatenate объединяет каналы рядом, а не складывает значения.','Branches have matching height and width. Concatenate joins their channels side by side rather than adding values.');
   if(stage.kind==='add')return t('ResNet-50 блогында 1×1, 3×3, 1×1 сүзгілер бар. F(x) нәтижесіне shortcut қосылады. Өлшем өзгергенде shortcut-та 1×1 projection керек.','Блок ResNet-50 содержит свёртки 1×1, 3×3, 1×1. К F(x) прибавляется shortcut. При изменении формы нужен shortcut с проекцией 1×1.','A ResNet-50 block contains 1×1, 3×3, 1×1 convolutions. Its F(x) is added to a shortcut. A 1×1 projection is needed when shapes change.');
   if(stage.kind==='dense')return t('Dense алдыңғы белгілерді біріктіреді. Әр нейрон кірістердің салмақталған қосындысын есептейді.','Dense объединяет предыдущие признаки. Каждый нейрон вычисляет взвешенную сумму входов.','Dense combines preceding features. Each neuron computes a weighted sum of its inputs.');
   return t('Сүзгілер кірістің шағын аймақтарын өңдейді. Соңғы өлшем — шығыс карталарының саны. 2× немесе 3× белгісі осындай бірнеше қабатты білдіреді.','Фильтры обрабатывают небольшие области входа. Последний размер — число выходных карт. 2× или 3× обозначает несколько последовательных слоёв.','Filters process local regions of the input. The last dimension is the number of output maps. 2× or 3× means several consecutive layers.');
 }
 function flow(key){
   const model=core.models[key];
   return `<p class="arch-lab-notice">${t('Сызба қабаттардың ретін және өлшемдерін көрсетеді. Түстер — нақты оқытылған белгілер картасы емес.','Схема показывает порядок слоёв и размеры. Цвета не являются картами обученной модели.','This diagram shows layer order and shapes. Its colors are not feature maps from a trained model.')}</p><section class="arch-simulator"><div class="arch-controls"><button class="topic-lab-button primary" id="archPlay">▶ ${labels.play}</button><button class="topic-lab-button" id="archStep">${labels.step}</button><button class="topic-lab-button" id="archReset">${labels.reset}</button>${range('archLayer',labels.layer,0,model.stages.length-1,steps[key])}</div><div class="arch-stages" id="archStages" aria-label="${labels.layer}">${model.stages.map((stage,i)=>`<button class="arch-stage" data-stage="${i}" data-kind="${stage.kind}" aria-current="${i===steps[key]}">${stack()}<b>${stageLabel(stage)}</b><small>${shape(stage.shape)}</small></button>`).join('')}</div><div id="archDetail" class="arch-details" aria-live="polite"></div></section>`;
 }
 function drawStage(scroll=false){
   const key=pages[active].id,model=core.models[key];if(!model)return;
   const index=steps[key],stage=model.stages[index],previous=model.stages[Math.max(0,index-1)];
   $('archLayer').value=index;$('archLayerValue').value=`${index+1} / ${model.stages.length}`;
   $('archDetail').innerHTML=`<div><small>${labels.output}</small><div class="arch-dim">${shape(stage.shape)}</div><small>${index?labels.input+': '+shape(previous.shape):model.name}</small></div><div><h3>${stageLabel(stage)}</h3><p>${stageDescription(stage,key)}</p></div>`;
   document.querySelectorAll('[data-stage]').forEach((button,i)=>{button.setAttribute('aria-current',String(i===index));button.classList.toggle('passed',i<index);if(i===index&&scroll)button.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'});});
   $('archStep').disabled=index===model.stages.length-1;
 }
 function vggDemo(){
   return `<section class="arch-experiment"><h2>${t('Неге бірнеше 3×3 сүзгі?','Почему несколько фильтров 3×3?','Why stack 3×3 filters?')}</h2><p>${t('Бір 7×7 сүзгі мен үш 3×3 сүзгінің көру аймағы 7×7 болады. Арналар саны бірдей C, қадам 1, bias есептелмейді. Арадағы активациялар олардың қызметін бірдей етпейді.','Одна свёртка 7×7 и три 3×3 охватывают область 7×7. Число каналов везде C, шаг 1, bias не учитываем. Промежуточные активации делают функции разными.','One 7×7 convolution and three 3×3 convolutions cover a 7×7 receptive field. All channel counts are C, stride is 1 and biases are excluded. Intermediate activations make their functions different.')}</p><div class="arch-controls">${select('channels',t('Арналар саны C','Число каналов C','Channels C'),['16','32','64','128'].map(n=>[n,n]),String(state.channels))}</div><div id="vggResult"></div></section>`;
 }
 function drawVgg(){
   const counts=core.vggWeights(state.channels);
   $('vggResult').innerHTML=metrics([[fmt(counts.wide),'7×7 · 49C²'],[fmt(counts.small),'3 × 3×3 · 27C²'],[fmt((1-counts.small/counts.wide)*100)+'%',t('Салмақ саны аз','Меньше весов','Fewer weights')]])
     +`<small>7×7</small><div class="arch-bar gold"><i style="width:100%"></i></div><small>3 × 3×3</small><div class="arch-bar"><i style="width:${counts.small/counts.wide*100}%"></i></div>`;
 }
 function inceptionDemo(){
   return `<section class="arch-experiment"><h2>${t('Inception 3a: төрт тармақ','Inception 3a: четыре ветви','Inception 3a: four branches')}</h2><p>${t('Барлық тармақ бір 28×28×192 кірісті алады. 1×1 сүзгілер 3×3 және 5×5 алдында арналар санын азайтады.','Все ветви получают один вход 28×28×192. Фильтры 1×1 уменьшают число каналов перед 3×3 и 5×5.','Every branch receives the same 28×28×192 input. The 1×1 filters reduce channels before the 3×3 and 5×5 filters.')}</p><div class="arch-controls">${check('bottleneck',t('1×1 арқылы арналарды азайту','Уменьшить каналы через 1×1','Reduce channels using 1×1'),state.bottleneck)}</div><div id="inceptionResult"></div></section>`;
 }
 function drawInception(){
   const r=core.inceptionWeights(state.bottleneck),without=core.inceptionWeights(false);
   const branches=[['1×1 · 64'],state.bottleneck?['1×1 · 96','3×3 · 128']:['3×3 · 128'],state.bottleneck?['1×1 · 16','5×5 · 32']:['5×5 · 32'],['MaxPool · 3×3','1×1 · 32']];
   $('inceptionResult').innerHTML=`<div class="arch-branches">${branches.map((branch,i)=>`<div class="arch-branch"><small>${t('Тармақ','Ветвь','Branch')} ${i+1}</small>${branch.map(name=>`<span>${name}</span>`).join('')}<b>${fmt(r.branch[i])}</b><small> ${t('салмақ','весов','weights')}</small></div>`).join('')}</div><div class="arch-concat">Concatenate · 64 + 128 + 32 + 32 = 256<br><small>28 × 28 × 256</small></div>`+metrics([[fmt(r.total),t('Conv салмақтары, bias жоқ','Веса Conv без bias','Conv weights, no biases')],[fmt(without.total-r.total),t('Үнемделген салмақ','Сэкономленные веса','Weights saved')],[r.channels,t('Шығыс арналары','Выходные каналы','Output channels')]])+`<p class="arch-lab-notice">${t('Бұл — GoogLeNet 3a блогының өлшемдері. Толық желінің параметр саны емес. Барлық тармақта қадам 1 және өлшемді сақтайтын padding қолданылады.','Это размеры блока GoogLeNet 3a, не число параметров всей сети. Ветви используют шаг 1 и padding, сохраняющий размер.','These are shapes of the GoogLeNet 3a block, not the full network parameter count. Branches use stride 1 and shape-preserving padding.')}</p>`;
 }
 function residualDemo(){
   return `<section class="arch-experiment arch-residual"><h2>${t('Блок нені қосады?','Что прибавляет блок?','What does the block add?')}</h2><p>${t('Бір ұяшық арқылы есептейік. x — кіріс, F(x) — блок есептеген түзету. Нақты желіде бұл амал бірдей өлшемді карталарға элемент бойынша жасалады.','Посчитаем на одной ячейке. x — вход, F(x) — поправка блока. В сети операция выполняется поэлементно над картами одинаковой формы.','Calculate one cell: x is the input and F(x) is the block correction. In the network, this is elementwise over maps with matching shapes.')}</p><div class="arch-controls">${range('residualX','x',-5,5,state.residualX)}${range('residualF','F(x)',-5,5,state.residualF)}${check('shortcut','Shortcut',state.shortcut)}</div><div id="residualResult"></div></section>`;
 }
 function drawResidual(){
   const r=core.residual(state.residualX,state.residualF,state.shortcut);
   $('residualResult').innerHTML=`<svg viewBox="0 0 620 210" role="img" aria-label="${t('Кірісті блок нәтижесіне қосу','Прибавление входа к результату блока','Adding the input to the block result')}"><rect x="10" y="115" width="100" height="55" rx="9"/><text x="60" y="148" text-anchor="middle">x = ${state.residualX}</text><path d="M110 142H180"/><rect x="180" y="115" width="145" height="55" rx="9"/><text x="252" y="148" text-anchor="middle">F(x) = ${state.residualF}</text><path d="M325 142H410"/><path class="skip ${state.shortcut?'':'off'}" d="M135 142V48H435V117"/><text x="290" y="34" text-anchor="middle">${state.shortcut?'shortcut · x':t('Shortcut өшірулі','Shortcut выключен','Shortcut off')}</text><circle cx="435" cy="142" r="25"/><text x="435" y="148" text-anchor="middle">+</text><path d="M460 142H485"/><rect x="485" y="115" width="125" height="55" rx="9"/><text x="547" y="148" text-anchor="middle">ReLU · ${r.output}</text></svg><p class="arch-equation">${state.residualF} + ${state.shortcut?state.residualX:0} = ${r.sum} → ReLU = ${r.output}</p><p class="arch-insight">${t('F(x)=0 қой. Shortcut қосулы болса, блоктың ReLU алдындағы нәтижесі x болып қалады.','Поставь F(x)=0. При включённом shortcut результат до ReLU равен x.','Set F(x)=0. With the shortcut on, the pre-ReLU result remains x.')}</p>`;
 }
 function architecturePage(key,head){
   return head+`<p class="arch-insight">${idea(key)}</p>`+flow(key)+(key==='vgg'?vggDemo():key==='inception'?inceptionDemo():key==='resnet'?residualDemo():'')+`<p class="arch-insight">${pages[active].show}</p>`;
 }
 const modelOptions=keys.map(key=>[key,core.models[key].name]);
 function comparisonCard(id,key){
   const m=core.models[key];return `<section>${select(id,t('Архитектура','Архитектура','Architecture'),modelOptions,key)}<h3>${m.name}</h3><p>${idea(key)}</p><p>${labels.input}: <strong>${m.input}</strong></p><p>${t('Жарияланған тереңдік','Заявленная глубина','Reported depth')}: <strong>${m.depth}</strong></p><p>${t('Қарастырылатын жыл','Год работы','Paper year')}: ${m.year}</p><a class="topic-lab-button" href="#${key}">${t('Құрылымын ашу','Открыть структуру','Explore structure')}</a></section>`;
 }
 function structuralComparison(){
   return `<div class="arch-compare">${comparisonCard('compareA',state.compareA)}${comparisonCard('compareB',state.compareB)}</div><p class="arch-lab-notice">${t('Тереңдік — бастапқы архитектураның белгіленуі, сызбадағы карточка саны емес. LeNet-5 санағына үйренілетін subsampling қабаттары кіреді; VGG16 — 13 Conv + 3 Dense, ResNet-50 — 49 Conv + 1 Dense. ResNet жылы — 2015 препринті (CVPR 2016).','Глубина относится к исходной архитектуре, а не числу карточек. LeNet-5 учитывает обучаемый subsampling; VGG16 — 13 Conv + 3 Dense, ResNet-50 — 49 Conv + 1 Dense. ResNet: препринт 2015, CVPR 2016.','Depth describes the original architecture, not the number of diagram cards. LeNet-5 includes learned subsampling; VGG16 has 13 Conv + 3 Dense, ResNet-50 has 49 Conv + 1 Dense. ResNet year is the 2015 preprint (CVPR 2016).')}</p><p class="arch-insight">${pages[6].show}</p>`;
 }
 function variantName(id){
   const name={lenet:'LeNet',alexnet:'AlexNet',vgg:'VGG',inception:'Inception',resnet:'ResNet'}[id];
   return name+' · '+t('шағын','мини','mini');
 }
 function trainingDownloads(){
   return `<div class="topic-lab-actions"><a class="topic-lab-button" href="week13-files/mnist-compare.ipynb" download>↓ MNIST · Colab notebook</a><a class="topic-lab-button" href="${trainingFile}" download>↓ MNIST · Python</a></div><p class="arch-lab-notice">MNIST © Yann LeCun & Corinna Cortes · <a href="https://keras.io/api/datasets/mnist/">${t('Дереккөз','Источник','Dataset source')}</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> · ${t('Сурет пиксельдері өзгертілмеген.','Пиксели изображений не изменены.','Image pixels are unmodified.')}</p>`;
 }
 function allowedSamples(){
   if(!comparisonData)return [];
   return comparisonData.samples.flatMap((sample,i)=>!state.errorsOnly||comparisonData.models.some(model=>{
     const p=model.probabilities[comparisonData.dataset.epochs][i];
     return p.indexOf(Math.max(...p))!==sample.label;
   })?[i]:[]);
 }
 function mnistTable(){
   const d=comparisonData,ds=d.dataset;
   return `<h2>${t('Бірдей тест · бес нәтиже','Один тест · пять результатов','Same test · five results')}</h2><p>${t('Соңғы эпохадан кейінгі барлық 2 000 тест суреті. Бұл кесте сурет немесе эпоха таңдағанда өзгермейді.','Все 2 000 тестовых изображений после последней эпохи. Эта таблица не меняется при выборе изображения или эпохи.','All 2,000 test images after the final epoch. This table does not change with the selected image or epoch.')}</p><div class="mnist-table-wrap"><table id="mnistTable"><thead><tr><th>${t('Оқу нұсқасы','Учебный вариант','Teaching variant')}</th><th>${t('Тест дәлдігі','Точность теста','Test accuracy')}</th><th>${t('Дұрыс жауап','Верных ответов','Correct answers')}</th><th>${t('Параметр саны','Параметры','Parameters')}</th></tr></thead><tbody>${d.models.map(m=>`<tr data-model="${m.id}"><th scope="row">${variantName(m.id)}</th><td>${(m.accuracy*100).toFixed(2)}%</td><td>${fmt(m.correct)} / ${fmt(ds.test)}</td><td>${fmt(m.parameters)}</td></tr>`).join('')}</tbody></table></div><p class="arch-insight">${t('Бұл — бір шағын MNIST тәжірибесінің нәтижесі. Модельдер бастапқы LeNet-5, AlexNet, VGG16, GoogLeNet немесе ResNet-50 желілерінің дәл көшірмесі емес. Кесте олардың барлық тапсырмадағы үздігін анықтамайды.','Это один небольшой опыт на MNIST. Модели не являются точными копиями LeNet-5, AlexNet, VGG16, GoogLeNet или ResNet-50. Таблица не определяет лучшую архитектуру для всех задач.','This is one small MNIST experiment. The models are not exact LeNet-5, AlexNet, VGG16, GoogLeNet or ResNet-50 networks. This table does not establish the best architecture for every task.')}</p>`;
 }
 function comparison(){
   const structure=`<details class="mnist-details"><summary>${t('Түпнұсқа архитектуралардың құрылымын салыстыру','Сравнить структуры исходных архитектур','Compare the original architecture structures')}</summary>${structuralComparison()}</details>`;
   if(!comparisonData)return `<p role="${comparisonError?'alert':'status'}">${comparisonError?t('Деректер жүктелмеді. Бетті жаңартып көр.','Данные не загрузились. Обнови страницу.','Data could not load. Refresh the page.'):t('MNIST нәтижелері жүктелуде…','Загружаются результаты MNIST…','Loading MNIST results…')}</p>${structure}`;
   const d=comparisonData,ds=d.dataset,allowed=allowedSamples();
   if(!allowed.includes(state.sample)&&allowed.length)state.sample=allowed[0];
   return `<section class="mnist-demo"><p class="arch-insight">${t('MNIST — қолмен жазылған 0–9 цифрлары. Әр сурет 28×28 пиксель, бір қара-ақ арна. Бір суретті бес шағын CNN-ге беріп, жауаптарын салыстырамыз.','MNIST — рукописные цифры 0–9. Каждое изображение: 28×28 пикселей, один серый канал. Подадим одно изображение пяти небольшим CNN и сравним ответы.','MNIST contains handwritten digits 0–9. Each image is 28×28 pixels with one grayscale channel. Compare how five small CNNs classify the same image.')}</p>${metrics([[fmt(ds.train),t('Оқыту суреті','Обучающих изображений','Training images')],[fmt(ds.validation),t('Тексеру · validation','Проверка · validation','Validation images')],[fmt(ds.test),t('Тест суреті','Тестовых изображений','Test images')]])}<p class="arch-lab-notice">${t('Барлығына бірдей: 5 эпоха · batch 64 · Adam 0,001 · seed 13 · пиксель / 255. Әр кластан бірдей сурет саны алынды.','Одинаково для всех: 5 эпох · batch 64 · Adam 0,001 · seed 13 · пиксель / 255. Число изображений каждого класса одинаково.','Same for all: 5 epochs · batch 64 · Adam 0.001 · seed 13 · pixel / 255. Each class has the same number of images.')}</p><div class="arch-controls">${check('mnistErrors',t('Кемінде бір модель қателескен мысалдар','Примеры с ошибкой хотя бы одной модели','Examples where at least one model was wrong'),state.errorsOnly)}</div>${allowed.length?`<div class="mnist-input"><figure><canvas id="mnistImage" width="28" height="28"></canvas><figcaption id="mnistActual"></figcaption></figure><div><h2>${t('Бір цифр · бес болжам','Одна цифра · пять прогнозов','One digit · five predictions')}</h2><p>${t('Төменнен цифрды таңда немесе тізімнен басқа жазылуын аш. Барлық модельге бір сурет беріледі.','Выбери цифру ниже или другое написание из списка. Все модели получают одно изображение.','Choose a digit below or another handwriting sample from the list. Every model receives the same image.')}</p><div class="mnist-digits" id="mnistDigits">${Array.from({length:10},(_,digit)=>{const index=allowed.find(i=>d.samples[i].label===digit);return index===undefined?'':`<button data-mnist-sample="${index}" aria-pressed="false" aria-label="${t('Цифр','Цифра','Digit')} ${digit}">${digit}</button>`;}).join('')}</div>${select('mnistSample',t('Тест суретін таңда','Выбери тестовое изображение','Choose a test image'),allowed.map(i=>[String(i),`#${d.samples[i].index} · ${t('нақты','истинная','actual')} ${d.samples[i].label}`]),String(state.sample))}</div></div><div class="arch-controls"><button class="topic-lab-button primary" id="mnistPlay">▶ ${labels.play}</button><button class="topic-lab-button" id="mnistStep">${labels.step}</button><button class="topic-lab-button" id="mnistReset">${labels.reset}</button>${range('mnistEpoch',t('Эпоха','Эпоха','Epoch'),0,ds.epochs,state.epoch)}</div><p class="mnist-epoch-label">${t('0 — оқытылмаған модель. Анимация бұрын орындалған оқытудың сақталған болжамдарын көрсетеді.','0 — необученная модель. Анимация показывает сохранённые прогнозы уже выполненного обучения.','0 is the untrained model. Animation replays saved predictions from completed training.')}</p><div id="mnistResults" class="mnist-predictions" aria-live="polite"></div><p class="arch-lab-notice">${t('Карточкадағы пайыз — осы суретке болжанған цифрдың ықтималдығы. Жалпы тест дәлдігі төмендегі кестеде көрсетілген.','Процент в карточке — вероятность предсказанной цифры для этого изображения. Общая точность теста показана в таблице ниже.','Each card’s percentage is the probability of its predicted digit for this image. Overall test accuracy appears in the table below.')}</p>`:`<p class="mnist-empty">${t('Көрсетілетін 60 мысал арасында соңғы эпохада қате табылмады. Барлық суретті көру үшін сүзгіні өшір.','Среди 60 примеров нет ошибок последней эпохи. Отключи фильтр, чтобы увидеть все изображения.','None of the 60 shown examples has a final-epoch error. Disable the filter to see all images.')}</p>`}${mnistTable()}${trainingDownloads()}</section>${structure}`;
 }
 function drawMnist(){
   if(!comparisonData||!$('mnistImage'))return;
   const d=comparisonData,sample=d.samples[state.sample],canvas=$('mnistImage'),ctx=canvas.getContext('2d'),image=ctx.createImageData(28,28);
   sample.pixels.forEach((v,i)=>image.data.set([v,v,v,255],i*4));ctx.putImageData(image,0,0);
   canvas.setAttribute('aria-label',t('Қолжазба цифры','Рукописная цифра','Handwritten digit')+' '+sample.label);
   $('mnistActual').textContent=t('Нақты цифр','Истинная цифра','Actual digit')+': '+sample.label;
   $('mnistSample').value=state.sample;$('mnistEpoch').value=state.epoch;$('mnistEpochValue').value=state.epoch+' / '+d.dataset.epochs;
   $('mnistStep').disabled=state.epoch===d.dataset.epochs;
   document.querySelectorAll('[data-mnist-sample]').forEach(button=>button.setAttribute('aria-pressed',String(d.samples[Number(button.dataset.mnistSample)].label===sample.label)));
   $('mnistResults').innerHTML=d.models.map(model=>{
     const p=model.probabilities[state.epoch][state.sample],predicted=p.indexOf(Math.max(...p)),correct=predicted===sample.label;
     return `<article class="mnist-prediction ${correct?'correct':'wrong'}" data-model="${model.id}"><h3>${variantName(model.id)}</h3><span class="mnist-variant">${t('Оқу нұсқасы','Учебный вариант','Teaching variant')}</span><small>${t('Болжам','Прогноз','Prediction')}</small><strong class="mnist-answer">${predicted}</strong><meter min="0" max="1" value="${p[predicted]}" aria-label="${(p[predicted]*100).toFixed(1)}%"></meter><p>${(p[predicted]*100).toFixed(1)}%</p><p class="mnist-status">${correct?'✓ '+t('Дұрыс','Верно','Correct'):'× '+t('Қате','Ошибка','Wrong')}</p></article>`;
   }).join('');
 }
 function nextMnist(){
   state.epoch=Math.min(comparisonData.dataset.epochs,state.epoch+1);drawMnist();
   if(state.epoch===comparisonData.dataset.epochs)stop();
 }
 function defense(){
   return `<div class="topic-lab-defense"><section><h3>${t('Ақылбек','Акылбек','Akylbek')} · LeNet / AlexNet / VGG</h3><p>${t('Алдымен архитектураның не екенін айтамын. LeNet арқылы қабат пен өлшемді көрсетемін. AlexNet-тегі ReLU мен Dropout-ты, VGG-дегі шағын сүзгілерді түсіндіремін.','Сначала объясню архитектуру. На LeNet покажу слои и размеры. Затем ReLU и Dropout в AlexNet и маленькие фильтры VGG.','I will define architecture and show layers and shapes using LeNet. Then I will explain AlexNet’s ReLU and dropout and VGG’s small filters.')}</p></section><section><h3>${t('Алмас','Алмас','Almas')} · Inception / ResNet</h3><p>${t('Inception-да төрт тармақты және 1×1 сүзгінің үнемін көрсетемін. ResNet-те x пен F(x)-ті өзгертіп, қосу амалын түсіндіремін.','Покажу четыре ветви Inception и экономию от 1×1. В ResNet изменю x и F(x) и объясню сложение.','I will show Inception’s four branches and 1×1 savings. In ResNet I will change x and F(x) and explain addition.')}</p></section><section><h3>${t('Нұрдаулет · MNIST / Код','Нурдаулет · MNIST / Код','Nurdaulet · MNIST / Code')}</h3><p>${t('MNIST-тегі бір цифрды бес шағын модельге беріп, болжамдары мен тест дәлдігін салыстырамын. Python кодын және параметрлер санын түсіндіріп, жұмысымызды қорытындылаймын.','Покажу одну цифру MNIST пяти небольшим моделям, сравню прогнозы и точность теста. Объясню Python-код и число параметров, затем подведу итоги.','I will show one MNIST digit to five small models and compare predictions and test accuracy. I will explain the Python code and parameter counts, then present our conclusions.')}</p></section></div>`+
   [
     [t('Архитектура деген не?','Что такое архитектура?','What is an architecture?'),t('Қабаттардың түрі, саны, реті және байланыстары.','Типы, число, порядок и связи слоёв.','The types, count, order and connections of layers.')],
     [t('VGG16-дағы 16 нені білдіреді?','Что означает 16 в VGG16?','What does 16 in VGG16 mean?'),t('13 конволюциялық және 3 толық байланысқан қабат. Pooling бұл санға кірмейді.','13 свёрточных и 3 полносвязных слоя. Pooling в это число не входит.','13 convolutional and 3 fully connected layers; pooling is not counted.')],
     [t('Inception мен ResNet қалай біріктіреді?','Как объединяют Inception и ResNet?','How do Inception and ResNet merge?'),t('Inception арналарды concatenate арқылы қатар жинайды. ResNet мәндерді элемент бойынша қосады.','Inception соединяет каналы через concatenate. ResNet складывает значения поэлементно.','Inception concatenates channels. ResNet adds values elementwise.')],
     [t('1×1 сүзгі не үшін?','Зачем фильтр 1×1?','Why a 1×1 filter?'),t('Әр пиксель орнында арналарды араластырып, олардың санын өзгертуге болады. Аз арнамен келесі үлкен сүзгіге аз салмақ керек.','Он смешивает каналы в каждой позиции и меняет их число. Меньше каналов — меньше весов у следующего большого фильтра.','It mixes channels at each spatial position and changes their count. Fewer channels need fewer weights in the next large filter.')],
     [t('Екі код файлының айырмасы қандай?','Чем отличаются два файла кода?','How do the two code files differ?'),t('cnn-architectures.py архитектураны құрып, өлшемдерін тексереді. mnist-compare.py бес шағын CNN-ді нақты MNIST дерегімен оқытып, бөлек тестте салыстырады.','cnn-architectures.py строит архитектуру и проверяет формы. mnist-compare.py обучает пять небольших CNN на реальных данных MNIST и сравнивает их на отдельном тесте.','cnn-architectures.py builds structures and checks shapes. mnist-compare.py trains five small CNNs on real MNIST data and compares them on a separate test set.')]
   ].map(([q,a])=>`<details class="arch-q"><summary>${q}</summary><p>${a}</p></details>`).join('');
 }
 function sources(){
   return `<div class="arch-sources"><h3>${t('Бастапқы мақалалар мен құжаттама','Оригинальные статьи и документация','Original papers and documentation')}</h3>${window.CNN13_SOURCES.map(s=>`<a href="${s.url}">${s.title}</a>`).join('')}</div>`;
 }
 async function codeInto(target,full=false){
   const file=full||active===8?state.sourceChoice:(pages[active].codeFile||sourceFile);
   target.innerHTML=`<p>${file===trainingFile?t('Бұл толық код бес шағын CNN-ді бірдей MNIST бөлігінде оқытып, тест нәтижелері мен анимация деректерін сақтайды.','Этот полный код обучает пять небольших CNN на одной части MNIST и сохраняет тестовые результаты и данные анимации.','This complete script trains five small CNNs on the same MNIST subset and saves test results and animation data.'):t('Үзіндіні notebook-тағы алдыңғы ұяшықтардан кейін орында: кітапханалар мен модель құру функциялары қажет. Бұл құрылым коды модельді оқытпайды.','Выполни фрагмент после предыдущих ячеек notebook: нужны библиотеки и функции создания моделей. Этот структурный код не обучает модель.','Run the excerpt after preceding notebook cells: imports and model builders must be defined. This structural script does not train a model.')}</p>${downloads(file)}<p><button class="topic-lab-button" disabled>${t('Көшіру','Копировать','Copy')}</button> <span role="status"></span></p><pre class="topic-code"><code></code></pre>`;
   const code=target.querySelector('code'),button=target.querySelector('button'),status=target.querySelector('[role=status]'),sections=[...pages[active].sections];
   if(!sourceRequests.has(file))sourceRequests.set(file,fetch(file).then(r=>{if(!r.ok)throw Error();return r.text();}).catch(e=>{sourceRequests.delete(file);throw e;}));
   try{
     const source=await sourceRequests.get(file),parts=source.split(/^# %% ([a-z]+)[ \t]*\r?$/gm);
     code.textContent=full||!sections.length?source:sections.map(key=>{const i=parts.indexOf(key);return i<0?'# '+key:`# %% ${key}${parts[i+1]}`;}).join('\n');
     button.disabled=false;button.onclick=async()=>{try{await navigator.clipboard.writeText(code.textContent);status.textContent=t('Көшірілді','Скопировано','Copied');}catch{const range=document.createRange();range.selectNodeContents(code);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Ctrl+C';}};
   }catch{status.textContent=t('Код жүктелмеді. Python файлын жүктеп ал.','Код не загрузился. Скачай Python-файл.','Code could not load. Download the Python file.');}
 }
 function showDialog(kind){
   stop();const p=pages[active],body=$('archDialogBody');
   $('archDialogTitle').textContent=labels[kind]+' · '+p.title;
   if(kind==='code')codeInto(body);
   else if(kind==='formulas')body.innerHTML=panel(p.formula,`<p>${p.explain[0]}</p>`);
   else body.innerHTML=`<p class="week11-lead">${p.lead}</p>${p.explain.map(text=>`<p>${text}</p>`).join('')}<p class="arch-insight">${p.show}</p>`;
   $('archDialog').showModal();
 }
 function stop(){clearInterval(timer);clearInterval(comparisonTimer);timer=undefined;comparisonTimer=undefined;document.body.classList.remove('is-playing');if($('archPlay'))$('archPlay').textContent='▶ '+labels.play;if($('mnistPlay'))$('mnistPlay').textContent='▶ '+labels.play;}
 function advance(){
   const key=pages[active].id,last=core.models[key].stages.length-1;
   steps[key]=Math.min(last,steps[key]+1);drawStage(true);if(steps[key]===last)stop();
 }
 function render(){
   stop();active=Math.max(0,pages.findIndex(p=>'#'+p.id===location.hash));
   const p=pages[active],head=`<div class="topic-lab-heading"><div><p class="topic-lab-kicker">13 / ${t('СӨЖ','СРС','ASSIGNMENT')} · ${String(active+1).padStart(2,'0')}</p><h1 tabindex="-1">${p.title}</h1><p class="week11-lead">${p.lead}</p></div></div>${toolbar()}`;
   if(core.models[p.id])state.sourceChoice=sourceFile;if(active===6)state.sourceChoice=trainingFile;
   main.innerHTML=active===0?overview():core.models[p.id]?architecturePage(p.id,head):active===6?head+comparison():active===7?head+defense():head+`<p class="arch-insight">${p.show}</p><div class="arch-controls">${select('archSource',t('Код түрі','Вид кода','Code type'),[[sourceFile,t('Архитектура құрылымы','Структура архитектур','Architecture structure')],[trainingFile,t('MNIST · бес модельді оқыту','MNIST · обучение пяти моделей','MNIST · train five models')]],state.sourceChoice)}</div><div id="archFullCode"></div>${sources()}`;
   if(core.models[p.id])drawStage();if(p.id==='vgg')drawVgg();if(p.id==='inception')drawInception();if(p.id==='resnet')drawResidual();if(active===6)drawMnist();if(active===8)codeInto($('archFullCode'),true);
   const download=$('archRail').querySelector('.topic-lab-return');download.href=(active===6?trainingFile:state.sourceChoice).replace(/\.py$/,'.ipynb');
   document.querySelectorAll('#archRail nav a').forEach((link,i)=>{if(i===active)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
   $('archCrumb').textContent=p.title;$('archProgress').textContent=`${String(active+1).padStart(2,'0')} / ${pages.length}`;
   $('archPrev').hidden=active===0;$('archPrev').href='#'+pages[Math.max(0,active-1)].id;
   $('archNext').href=active===pages.length-1?back:'#'+pages[active+1].id;$('archNext').textContent=active===pages.length-1?t('Тақырыптар','Темы','Topics'):labels.next;
 }
 main.addEventListener('input',event=>{
   const id=event.target.id,key=pages[active].id;stop();
   if(id==='archLayer'){steps[key]=Number(event.target.value);drawStage(true);}
   if(id==='channels'){state.channels=Number(event.target.value);drawVgg();}
   if(id==='bottleneck'){state.bottleneck=event.target.checked;drawInception();}
   if(id==='residualX'||id==='residualF'){state[id]=Number(event.target.value);$(id+'Value').value=state[id];drawResidual();}
   if(id==='shortcut'){state.shortcut=event.target.checked;drawResidual();}
   if(id==='compareA'||id==='compareB'){state[id]=event.target.value;const focus=id;render();$(focus).focus();}
   if(id==='mnistSample'){state.sample=Number(event.target.value);drawMnist();}
   if(id==='mnistEpoch'){state.epoch=Number(event.target.value);drawMnist();}
   if(id==='mnistErrors'){state.errorsOnly=event.target.checked;render();$('mnistErrors').focus();}
   if(id==='archSource'){state.sourceChoice=event.target.value;codeInto($('archFullCode'),true);$('archRail').querySelector('.topic-lab-return').href=state.sourceChoice.replace(/\.py$/,'.ipynb');}
 });
 main.addEventListener('click',event=>{
   const button=event.target.closest('button');if(!button)return;
   if(button.dataset.dialog){showDialog(button.dataset.dialog);return;}
   const key=pages[active].id;
   if(button.dataset.mnistSample!==undefined){stop();state.sample=Number(button.dataset.mnistSample);drawMnist();return;}
   if(button.id==='mnistStep'){stop();nextMnist();return;}
   if(button.id==='mnistReset'){stop();state.epoch=0;drawMnist();return;}
   if(button.id==='mnistPlay'){
     if(comparisonTimer){stop();return;}stop();state.epoch=0;drawMnist();button.textContent='Ⅱ '+labels.pause;
     comparisonTimer=setInterval(nextMnist,850);return;
   }
   if(button.dataset.stage!==undefined){stop();steps[key]=Number(button.dataset.stage);drawStage();return;}
   if(button.id==='archStep'){stop();advance();}
   if(button.id==='archReset'){stop();steps[key]=0;drawStage(true);}
   if(button.id==='archPlay'){
     if(timer){stop();return;}if(steps[key]===core.models[key].stages.length-1)steps[key]=0;
     drawStage(true);button.textContent='Ⅱ '+labels.pause;document.body.classList.add('is-playing');timer=setInterval(advance,1000);
   }
 });
 $('archRail').innerHTML=`<a class="topic-lab-brand" href="${back}">ML<span>LAB</span></a><p class="topic-lab-topic">13 · ${t('СӨЖ','СРС','ASSIGNMENT')}<br>CNN ARCHITECTURES</p><nav aria-label="CNN">${pages.map((p,i)=>`<a href="#${p.id}"><span>${String(i+1).padStart(2,'0')}</span>${p.title}</a>`).join('')}</nav><a class="topic-lab-return" href="week13-files/cnn-architectures.ipynb" download>↓ Colab notebook</a>`;
 $('archHeader').innerHTML=`<span class="topic-lab-crumb" id="archCrumb"></span><button class="topic-lab-button" id="labNotes">${labels.explanation}</button>`;
 $('archFooter').innerHTML=`<div class="topic-lab-progress" id="archProgress"></div><div class="topic-lab-actions"><a class="topic-lab-button" id="archPrev">${t('Артқа','Назад','Back')}</a><a class="topic-lab-button primary" id="archNext"></a></div>`;
 $('archDialog').innerHTML=`<div class="topic-lab-heading"><h2 id="archDialogTitle"></h2><form method="dialog"><button class="topic-lab-button">${t('Жабу','Закрыть','Close')}</button></form></div><div id="archDialogBody"></div>`;
 $('labNotes').onclick=()=>showDialog('explanation');
 window.addEventListener('hashchange',()=>{render();scrollTo({top:0,behavior:'instant'});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 render();
 fetch('week13-files/mnist-comparison.json?v=mnist13').then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{comparisonData=data;state.epoch=data.dataset.epochs;if(active===6)render();}).catch(()=>{comparisonError=true;if(active===6)render();});
})();

