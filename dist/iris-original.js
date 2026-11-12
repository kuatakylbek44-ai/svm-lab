'use strict';
const $ = id => document.getElementById(id);
const colors = ['#167d64','#8060c6','#eaa044'];
const titles = ["Мақсат пен міндет","Деректер зертханасы","Модельдің логикасы","Оқыту және болжам","Нәтижелерді талдау","Ең жақсы k"];
const state = {page:1,pct:20,color:'class',selected:0,step:0,knn:3,softmax:false};
let data,trainTimer,scanTimer,sweepFrame,toastTimer,currentCode='';
const fmt = (n,d=1) => Number(n).toFixed(d);
const cfg = () => data.splits[state.pct];
const svgText = (x,y,t,extra='') => `<text x="${x}" y="${y}" ${extra}>${t}</text>`;
const line = (x1,y1,x2,y2,extra='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2500);}

const notes = [
  {script:"Біздің жұмысымыздың мақсаты — Logistic Regression көмегімен гүлдің түрін анықтау. Iris деректерінде 150 гүл, төрт сандық белгі және үш класс бар. Модель гүлдің өлшемдерінен заңдылық үйреніп, оның setosa, versicolor немесе virginica екенін болжайды. Алдымен мен деректер мен модельдің жұмысын түсіндіремін, кейін Алмас практикалық қадамдар мен нәтижелерді көрсетеді.",demo:"Көрсету: графиктегі үш түсті көрсетіп, әр нүктенің бір гүл екенін түсіндір.",qa:[["Классификация деген не?","Объектінің белгілеріне қарап, оның қай класқа жататынын анықтау."],["Бұл регрессия ма, классификация ма?","Атауында «регрессия» болғанымен, Logistic Regression бұл жұмыста класты болжайтын классификация моделі."],["Қандай үш класс бар?",'0 — setosa, 1 — versicolor, 2 — virginica.']]},
  {script:"X — гүлді сипаттайтын төрт өлшем, ал y — оның нақты түрі. Деректерді оқыту және тест бөліктеріне бөлеміз. Әдепкі нұсқада 80 пайыз, яғни 120 гүл оқытуға, 20 пайыз, яғни 30 гүл тестке беріледі. Тест деректерін модель оқыту кезінде көрмейді, сондықтан олармен модельдің жаңа деректердегі жұмысын тексереміз.",demo:"Көрсету: «Train / Test» батырмасын бас, тест үлесін 30%-ға жылжыт, санның өзгергенін көрсет. Содан кейін 20%-ға қайтар.",qa:[["Датасетті шақырыңыз.",'X, y = load_iris(return_X_y=True)'],["Train/test-ке қалай бөлеміз?","train_test_split(X, y, test_size=0.2, random_state=42). Нәтижелер реті: X_train, X_test, y_train, y_test."],["random_state=42 не үшін?","Бөлуді қайта орындағанда дәл сол үлгілердің түсуі үшін. 42 — қайталанымдылыққа арналған seed, дәлдікті арттыратын сиқырлы сан емес."],["Multiclass пен multilabel айырмасы қандай?","Multiclass: бір объект — бір класс. Multilabel: бір объект бірнеше санатқа қатар жата алады. Iris — multiclass."]]},
  {script:"Логистикалық модель белгілердің салмақталған қосындысын есептейді. Екі класты жағдайда сигмоида сол санды 0 мен 1 аралығындағы ықтималдыққа айналдырады. Графикте салмақ, ығысу және кіріс мәні өзгергенде ықтималдықтың қалай өзгеретінін көре аламыз. Ал біздің үш класты Iris моделіміз softmax арқылы үш ықтималдық есептеп, ең үлкен ықтималдыққа ие класты таңдайды.",demo:"Көрсету: w жүгірткісін өзгертіп, қисықтың көлбеулігін түсіндір. Содан кейін Softmax қойындысында virginica ұпайын арттыр. «Енді практиканы Алмас көрсетеді» деп сөз бер.",qa:[["Сигмоида не істейді?","Кез келген нақты санды 0 мен 1 аралығындағы мәнге айналдырады."],["Салмақ не үшін керек?","Әр белгінің модель есептейтін ұпайға ықпалын анықтайды. Оқыту кезінде модель осы коэффициенттерді табады."],["Үш класта 0.5 шегін қолданамыз ба?","Осы көпклассты модель ең жоғары ықтималдықты класты таңдайды. Барлық кластарға жеке 0.5 шегін қою қолданылмайды."]]},
  {script:"Мен модельді оқыту және болжам жасау қадамдарын көрсетемін. Алдымен LogisticRegression(max_iter=1000) моделін құрамыз. fit(X_train, y_train) арқылы оқыту деректеріндегі белгілер мен жауаптардың байланысын үйретеміз. Содан кейін predict(X_test) көмегімен бұрын көрмеген гүлдердің түрін болжаймыз. Бұл бетте гүл өлшемдерін өзгертіп, оқытылған модельдің ықтималдықтары мен жауабы қалай өзгеретінін көруге болады.",demo:"Көрсету: «Қадамдарды көрсету» батырмасын бас. Кейін «Күлте ұзындығы» мен «Күлте ені» жүгірткілерін өзгертіп, болжамды көрсет.",qa:[["Модельді оқытыңыз.",'model.fit(X_train, y_train)'],["Prediction жасаңыз.",'pred = model.predict(X_test)'],["Неге predict() ішіне y_test бермейміз?","Модель жауапты X_test белгілерінен өзі болжауы керек. y_test тек кейін салыстыруға қажет."],["max_iter=1000 нені білдіреді?","Оқыту алгоритміне ең көбі 1000 итерацияға рұқсат береді. Бұл міндетті түрде 1000 итерация орындалады деген сөз емес."]]},
  {script:"Модельдің болжамын нақты y_test жауаптарымен салыстырамыз. Accuracy — дұрыс болжамдар санының барлық тест үлгілеріне қатынасы. Әдепкі 20 пайыздық тестте 30 гүлдің барлығы дұрыс анықталды, сондықтан accuracy 100 пайыз болды. Қателер матрицасының диагоналінде 10, 9 және 11 дұрыс болжам бар. Бірақ бұл нәтиже осы тест бөлігіне ғана қатысты, басқа деректерде дәлдік өзгеруі мүмкін.",demo:"Көрсету: матрицаның диагоналіндегі ұяшықты бас. Тест үлесін 40%-ға өзгертіп, нәтижелерді салыстыр. Қорғауда сандарды экрандағы ағымдағы мәнмен ата.",qa:[["Accuracy қалай есептеледі?","accuracy_score(y_test, pred). Дұрыс болжамдарды барлық болжамдар санына бөледі."],["Матрицадағы жол мен баған не?","Жол — нақты класс, баған — модель болжаған класс. Диагональ — дұрыс болжамдар."],["100% болса, модель мінсіз бе?","Жоқ. Бұл шағын тест бөлігіндегі нәтиже. Басқа деректе қате болуы мүмкін."],["Precision және recall не?","Precision: белгілі бір класс деп болжанғандардың дұрыс үлесі. Recall: сол кластағы нақты үлгілердің табылған үлесі."]]},
  {script:"Ең жақсы k туралы сұрақ KNN моделіне қатысты. k — жаңа объектіні жіктегенде қаралатын ең жақын көршілер саны. Logistic Regression-де мұндай көршілер саны параметрі жоқ. Біз KNN үшін 1-ден 20-ға дейінгі k мәндерін train ішінде бес бөліктік кросс-валидациямен салыстырдық. Әдепкі бөлуде GridSearchCV таңдаған best_k мәні 3 болды. Соңғы тестті параметр таңдауға қолданбаймыз, оны дайын модельді бағалауға сақтаймыз.",demo:"Көрсету: «k мәндерін салыстыру» анимациясын қос. Ең жақсы нүкте мен CV дәлдігін көрсет. «Толық код» арқылы best_params_ жолын аш.",qa:[["Ең жақсы k қалай жазылады?",'best_k = search.best_params_["n_neighbors"]'],["best_k дайын команда ма?","Жоқ. Бұл — табылған ең жақсы көршілер санын сақтайтын айнымалының атауы."],["cv=5 пен k бір нәрсе ме?","Жоқ. cv=5 — кросс-валидациядағы бөліктер саны. k — KNN қарастыратын көршілер саны."],["Неге k-ны test арқылы таңдамаймыз?","Тестке қарап параметр таңдасақ, соңғы бағалау әділ болмайды. Таңдауды train ішіндегі CV арқылы жасаймыз."]]}
];

function stopAnimations(){clearInterval(trainTimer);clearInterval(scanTimer);cancelAnimationFrame(sweepFrame);trainTimer=null;scanTimer=null;sweepFrame=null;$('trainPlay').textContent="▶ Қадамдарды көрсету";$('scanK').textContent="▶ k мәндерін салыстыру";$('sweepBtn').textContent="▶ Қисық бойымен жүргізу";}
function goTo(n,updateHash=true){
  n=Math.max(1,Math.min(6,Number(n === 'knn' ? 6 : n)||1));stopAnimations();state.page=n;
  document.querySelectorAll('.page').forEach((p,i)=>{p.hidden=i+1!==n;p.classList.toggle('active',i+1===n);});
  document.querySelectorAll('.nav-link').forEach(b=>{const active=Number(b.dataset.page)===n;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  $('crumb').textContent=titles[n-1];$('speakerTag').textContent=`${n<=3?"Ақылбек":"Алмас"} · ${n}/6`;$('pageCount').textContent=`0${n} / 06`;$('pageProgress').style.width=`${n/6*100}%`;$('prevBtn').disabled=n===1;$('nextBtn').textContent=n===6?"Басына оралу ↺":"Келесі бет →";
  document.title=`${n}. ${titles[n-1]} · IRIS LAB`;
  if(updateHash)history.replaceState(null,'',`#${n}`);
  window.scrollTo({top:0,behavior:'instant'});
}
function openNotes(){const n=notes[state.page-1];$('notesOwner').textContent=`${state.page<=3?"АҚЫЛБЕК":"АЛМАС"} · ${state.page}-БЕТ`;$('speakerScript').textContent=n.script;$('demoCue').textContent=n.demo;$('qaList').innerHTML=n.qa.map(([q,a])=>`<div class="qa-item"><b>${escapeHtml(q)}</b><p>${escapeHtml(a)}</p></div>`).join('');$('notesDialog').showModal();}

function chartFrame({w=640,h=430,xMin,xMax,yMin,yMax,xTitle,yTitle,xTicks=5,yTicks=5}){
  const left=58,right=w-22,top=20,bottom=h-52;
  const sx=x=>left+(x-xMin)/(xMax-xMin)*(right-left),sy=y=>bottom-(y-yMin)/(yMax-yMin)*(bottom-top);
  let html='';
  for(let i=0;xTicks>0&&i<=xTicks;i++){const v=xMin+(xMax-xMin)*i/xTicks,x=sx(v);html+=line(x,top,x,bottom,'class="gridline"');html+=svgText(x,bottom+19,fmt(v,1),'text-anchor="middle"');}
  for(let i=0;i<=yTicks;i++){const v=yMin+(yMax-yMin)*i/yTicks,y=sy(v);html+=line(left,y,right,y,'class="gridline"');html+=svgText(left-10,y+4,fmt(v,1),'text-anchor="end"');}
  html+=line(left,bottom,right,bottom,'class="axis"')+line(left,top,left,bottom,'class="axis"');
  html+=svgText((left+right)/2,h-8,xTitle,'class="axis-title" text-anchor="middle"');
  html+=svgText(14,(top+bottom)/2,yTitle,`class="axis-title" text-anchor="middle" transform="rotate(-90,14,${(top+bottom)/2})"`);
  return{html,sx,sy,left,right,top,bottom};
}
function drawScatter(target,xIdx,yIdx,hero=false){
  const w=hero?540:640,h=hero?440:430;
  const xv=data.X.map(x=>x[xIdx]),yv=data.X.map(x=>x[yIdx]);
  const xmin=Math.floor((Math.min(...xv)-.15)*10)/10,xmax=Math.ceil((Math.max(...xv)+.15)*10)/10,ymin=Math.floor((Math.min(...yv)-.1)*10)/10,ymax=Math.ceil((Math.max(...yv)+.1)*10)/10;
  const c=chartFrame({w,h,xMin:xmin,xMax:xmax,yMin:ymin,yMax:ymax,xTitle:data.features[xIdx]+" (см)",yTitle:data.features[yIdx]+" (см)",xTicks:5,yTicks:4});
  const test=new Set(cfg().test);let html=c.html;
  data.X.forEach((row,i)=>{const color=hero||state.color==='class'?colors[data.y[i]]:test.has(i)?colors[2]:colors[0];const selected=!hero&&i===state.selected;html+=`<circle class="${hero?'hero-point':'point'}" cx="${c.sx(row[xIdx])}" cy="${c.sy(row[yIdx])}" r="${selected?7:hero?4.5:4.8}" fill="${color}" opacity="${selected?1:.78}" ${selected?'stroke="#172b2c" stroke-width="2"':''} ${hero?`style="animation-delay:${i%50*9}ms"`:`data-point="${i}"`}><title>№${i+1}: ${data.names[data.y[i]]} · ${row[xIdx]} см, ${row[yIdx]} см</title></circle>`;});
  $(target).innerHTML=html;
}
function renderData(){
  drawScatter('dataPlot',+$('xAxis').value,+$('yAxis').value);
  $('dataLegend').innerHTML=state.color==='class'?data.names.map((n,i)=>`<span><i class="dot" style="background:${colors[i]}"></i>${n}</span>`).join(''):'<span><i class="dot c0"></i>Train</span><span><i class="dot c2"></i>Test</span>';
  const row=data.X[state.selected],split=cfg().test.includes(state.selected)?'Test':'Train';
  $('pointInfo').textContent=`№${state.selected+1} · ${data.names[data.y[state.selected]]} · ${split} · өлшемдер: ${row.map(v=>fmt(v)).join(' / ')} см`;
  $('dataPoint').value=state.selected;
}
function updateSplit(value){
  stopAnimations();state.pct=Number(value);state.knn=cfg().bestK;
  $('testRatio').value=state.pct;$('resultSplit').value=state.pct;$('testRatioValue').textContent=state.pct+'%';$('trainBar').style.width=(100-state.pct)+'%';$('testBar').style.width=state.pct+'%';$('trainCount').textContent=cfg().train.length;$('testCount').textContent=cfg().test.length;
  $('knnK').value=state.knn;renderData();renderPrediction();renderResults();renderKNN();setStage(state.step);
}

function renderSigmoid(){
  const w=+$('weight').value,b=+$('bias').value,x=+$('sampleX').value,z=w*x+b,p=IrisMath.sigmoid(z);
  $('weightVal').textContent=fmt(w);$('biasVal').textContent=fmt(b);$('sampleXVal').textContent=fmt(x);
  const c=chartFrame({h:410,xMin:-5,xMax:5,yMin:0,yMax:1,xTitle:"Кіріс мәні x",yTitle:"Класс 1 ықтималдығы p",xTicks:5,yTicks:5});
  let path='';for(let i=0;i<=200;i++){const xx=-5+i*.05;path+=`${i?'L':'M'}${c.sx(xx).toFixed(2)},${c.sy(IrisMath.sigmoid(w*xx+b)).toFixed(2)} `;}
  let html='<defs><linearGradient id="sigGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#167d64" stop-opacity=".2"/><stop offset="100%" stop-color="#167d64" stop-opacity=".015"/></linearGradient></defs>'+c.html;
  html+=`<path class="area" d="${path}L${c.right},${c.bottom} L${c.left},${c.bottom} Z"/>`;
  html+=line(c.left,c.sy(.5),c.right,c.sy(.5),'stroke="#8060c6" stroke-dasharray="7 5" stroke-width="1.5"')+svgText(c.right-5,c.sy(.5)-9,'p = 0.5','text-anchor="end"');
  html+=`<path class="sig-path" d="${path}"/>`+line(c.sx(x),c.bottom,c.sx(x),c.sy(p),'stroke="#167d64" stroke-dasharray="4 4"')+`<circle cx="${c.sx(x)}" cy="${c.sy(p)}" r="8" fill="#167d64" stroke="white" stroke-width="3"/>`;
  const tx=Math.max(c.left+36,Math.min(c.right-36,c.sx(x)));html+=svgText(tx,Math.max(c.top+13,c.sy(p)-17),fmt(p*100)+'%','text-anchor="middle" style="font-size:14px;fill:#167d64;font-weight:bold"');
  $('sigmoidPlot').innerHTML=html;$('sigProb').innerHTML=`${fmt(p*100)}<small>%</small>`;$('sigDecision').textContent=`Болжам: класс ${p>=.5?1:0}`;$('zEquation').textContent=`z = ${fmt(w)} × ${fmt(x)} + (${fmt(b)}) = ${fmt(z)}`;
}
function bars(probs){return probs.map((p,i)=>`<div class="prob-row"><div class="prob-row-head"><span><i class="dot" style="background:${colors[i]}"></i> ${data.names[i]}</span><b>${fmt(p*100)}%</b></div><div class="prob-track"><div class="prob-fill" style="width:${p*100}%;background:${colors[i]}"></div></div></div>`).join('');}
function renderSoftmax(){const logits=[0,1,2].map(i=>+$('logit'+i).value);logits.forEach((v,i)=>$('logit'+i+'Val').textContent=fmt(v));const probs=IrisMath.softmax(logits),best=probs.indexOf(Math.max(...probs));$('softmaxBars').innerHTML=bars(probs);$('softmaxResult').innerHTML=`Болжам: <b style="color:${colors[best]}">${data.names[best]}</b>`;}
function setMode(soft){cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Қисық бойымен жүргізу";state.softmax=soft;$('sigmoidView').hidden=soft;$('softmaxView').hidden=!soft;$('sigmoidTab').classList.toggle('active',!soft);$('softmaxTab').classList.toggle('active',soft);$('sigmoidTab').setAttribute('aria-selected',String(!soft));$('softmaxTab').setAttribute('aria-selected',String(soft));}
function sweep(){if(sweepFrame){cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Қисық бойымен жүргізу";return;}$('sweepBtn').textContent="Ⅱ Тоқтату";const start=performance.now();function tick(now){const progress=Math.min(1,(now-start)/6000);$('sampleX').value=(-5+10*progress).toFixed(1);renderSigmoid();if(progress<1)sweepFrame=requestAnimationFrame(tick);else{sweepFrame=null;$('sweepBtn').textContent="▶ Қисық бойымен жүргізу";}}sweepFrame=requestAnimationFrame(tick);}

function setStage(i){state.step=i;document.querySelectorAll('.train-step').forEach((b,j)=>b.classList.toggle('active',i===j));const stages=[['X, y = load_iris(return_X_y=True)',"150 гүлдің төрт өлшемі мен нақты кластарын жүктейміз."],[`train_test_split(X, y, test_size=${state.pct/100}, random_state=42)`,`${cfg().train.length} гүлді оқытуға, ${cfg().test.length} гүлді тестке бөлеміз.`],['model.fit(X_train, y_train)',"Модель train белгілері мен нақты жауаптарынан коэффициенттерді үйренеді."],['pred = model.predict(X_test)',"Модель X_test белгілерінен класты болжайды. y_test тек бағалауға қажет."]];$('stageCode').textContent=stages[i][0];$('stageExplain').textContent=stages[i][1];$('stepProgress').style.width=(i+1)*25+'%';}
function playTrain(){if(trainTimer){clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="▶ Қадамдарды көрсету";return;}setStage(0);$('trainPlay').textContent="Ⅱ Тоқтату";trainTimer=setInterval(()=>{if(state.step<3)setStage(state.step+1);else{clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="↻ Қайта көрсету";}},1400);}
function initFlower(){const ranges=[[4,8,.1],[2,4.5,.1],[1,7,.1],[.1,2.5,.1]];const defaults=[5.1,3.5,1.4,.2];$('flowerSliders').innerHTML=data.features.map((name,i)=>`<label class="range-label" for="flower${i}">${name}<strong id="flower${i}Val">${fmt(defaults[i])} см</strong></label><input id="flower${i}" type="range" min="${ranges[i][0]}" max="${ranges[i][1]}" step="${ranges[i][2]}" value="${defaults[i]}">`).join('');[0,1,2,3].forEach(i=>$('flower'+i).addEventListener('input',renderPrediction));}
function renderPrediction(){const row=[0,1,2,3].map(i=>+$('flower'+i).value);row.forEach((v,i)=>$('flower'+i+'Val').textContent=fmt(v)+" см");const result=IrisMath.predict(cfg(),row);$('predName').textContent=data.names[result.label];$('predName').style.color=colors[result.label];$('flowerEmblem').style.color=colors[result.label];$('flowerEmblem').style.transform=`rotate(${result.label*40}deg)`;$('predictionBars').innerHTML=bars(result.probabilities);$('predInputNote').textContent=`${cfg().train.length} үлгімен оқытылған модель · test_size=${state.pct/100}`;}
let presetIndex=0;
function samplePreset(){const idx=cfg().test[presetIndex%cfg().test.length];presetIndex++;data.X[idx].forEach((v,i)=>$('flower'+i).value=v);renderPrediction();toast(`Тесттегі №${idx+1} гүл алынды · нақты түрі: ${data.names[data.y[idx]]}`);}

function renderResults(){const m=cfg(),correct=m.pred.reduce((s,p,i)=>s+(p===data.y[m.test[i]]),0),errors=m.test.length-correct;$('accuracyBig').innerHTML=`${fmt(m.accuracy*100,m.accuracy===1?0:1)}<small>%</small>`;$('accuracyFraction').textContent=`${m.test.length} гүлдің ${correct}-і дұрыс анықталды.`;$('errorCount').textContent=errors+" қате";
  let grid='<div class="matrix-grid"><span></span>'+data.names.map(n=>`<span class="matrix-label">${n}</span>`).join('');
  m.confusion.forEach((row,i)=>{grid+=`<span class="matrix-label">${data.names[i]}</span>`;row.forEach((v,j)=>{grid+=`<button class="matrix-cell ${i===j?'diag':v?'error':''}" data-row="${i}" data-col="${j}" aria-label="Нақты ${data.names[i]}, болжам ${data.names[j]}: ${v} гүл">${v}</button>`;});});
  $('matrix').innerHTML=grid+'</div>';$('matrixDetail').textContent="Диагональдағы мәндер — дұрыс болжамдар.";
  $('metricsTable').querySelector('tbody').innerHTML=data.names.map((n,i)=>{const r=m.report[i];return `<tr><td><i class="dot" style="background:${colors[i]}"></i> ${n}</td><td>${fmt(r.precision,2)}</td><td>${fmt(r.recall,2)}</td><td>${fmt(r['f1-score'],2)}</td></tr>`;}).join('');
  $('testSample').innerHTML=m.test.map((id,i)=>`<option value="${i}">№${id+1} гүл · ${data.names[data.y[id]]}</option>`).join('');renderSample();
}
function renderSample(){const m=cfg(),i=+$('testSample').value,id=m.test[i],actual=data.y[id],pred=m.pred[i];$('testCompare').innerHTML=`<div class="compare-result ${actual!==pred?'wrong':''}"><div>Нақты класс<b>${data.names[actual]}</b></div><div>Болжам<b>${data.names[pred]} ${actual===pred?'✓':'×'}</b></div></div>`;}
function inspectCell(r,c,button){document.querySelectorAll('.matrix-cell').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const ids=cfg().test.filter((id,i)=>data.y[id]===r&&cfg().pred[i]===c);$('matrixDetail').textContent=ids.length?`${data.names[r]} → ${data.names[c]}: ${ids.length} гүл. Нөмірлері: ${ids.map(v=>v+1).join(', ')}.`:"Бұл ұяшықта гүл жоқ — мұндай болжам жасалмаған.";}

function renderKNN(){const m=cfg(),values=m.cv.map(x=>x*100),min=Math.floor(Math.min(...values)-1),max=Math.min(100,Math.ceil(Math.max(...values)+1));const c=chartFrame({h:410,xMin:1,xMax:20,yMin:min,yMax:max,xTitle:"Көршілер саны k",yTitle:"Орташа CV дәлдігі (%)",xTicks:0,yTicks:4});
  let html=c.html;
  [1,3,5,10,15,20].forEach(k=>{html+=line(c.sx(k),c.top,c.sx(k),c.bottom,'class="gridline"')+svgText(c.sx(k),c.bottom+19,k,'text-anchor="middle"');});
  const path=values.map((v,i)=>`${i?'L':'M'}${c.sx(i+1)},${c.sy(v)}`).join(' ');html+=`<path class="knn-path" d="${path}"/>`;
  const selected=state.knn;html+=line(c.sx(selected),c.top,c.sx(selected),c.bottom,'stroke="#167d64" stroke-dasharray="5 4" stroke-width="1"');
  values.forEach((v,i)=>{const k=i+1;html+=`<circle cx="${c.sx(k)}" cy="${c.sy(v)}" r="${selected===k?7:4}" fill="${selected===k?'#167d64':'#8060c6'}" stroke="white" stroke-width="2" class="point" data-k="${k}"><title>k=${k}, CV=${fmt(v,2)}%</title></circle>`;});
  html+=svgText(c.sx(m.bestK),Math.max(13,c.sy(values[m.bestK-1])-18),'★ best k = '+m.bestK,'text-anchor="middle" style="fill:#167d64;font-weight:bold;font-size:12px"');
  $('knnPlot').innerHTML=html;$('knnKValue').textContent=selected;$('knnK').value=selected;$('knnCV').textContent=fmt(values[selected-1],2)+'%';$('bestK').textContent=m.bestK;$('bestSummary').innerHTML=`Үздік модельдің соңғы test дәлдігі: <b>${fmt(m.knnTest[m.bestK-1]*100,1)}%</b><br>Train: ${m.train.length} · Test: ${m.test.length}`;
}
function scanK(){if(scanTimer){clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ k мәндерін салыстыру";return;}state.knn=1;renderKNN();$('scanK').textContent="Ⅱ Тоқтату";scanTimer=setInterval(()=>{if(state.knn<20){state.knn++;renderKNN();}else{clearInterval(scanTimer);scanTimer=null;state.knn=cfg().bestK;renderKNN();$('scanK').textContent="↻ Қайта салыстыру";toast(`Таңдалған ең жақсы k = ${cfg().bestK}`);}},240);}

function pythonCode(kind){
const dataCode=`from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=${state.pct/100}, random_state=42\n)\nprint(X_train.shape, X_test.shape)\nprint(y_train.shape, y_test.shape)`;
const trainCode=`from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\npred = model.predict(X_test)\nprint("Болжам:", pred)\nprint("Нақты:", y_test)`;
const metricsCode=`from sklearn.metrics import accuracy_score, confusion_matrix\nfrom sklearn.metrics import classification_report\n\nprint("Accuracy:", accuracy_score(y_test, pred))\nprint(confusion_matrix(y_test, pred))\nprint(classification_report(y_test, pred))`;
const knnCode=`from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.model_selection import GridSearchCV\n\nsearch = GridSearchCV(\n    KNeighborsClassifier(),\n    {"n_neighbors": range(1, 21)},\n    cv=5, scoring="accuracy"\n)\nsearch.fit(X_train, y_train)\nbest_k = search.best_params_["n_neighbors"]\nprint("Ең жақсы k:", best_k)\nprint("CV дәлдігі:", search.best_score_)\nprint("KNN тест дәлдігі:", search.score(X_test, y_test))`;
const pieces={data:dataCode,train:trainCode,metrics:metricsCode,knn:knnCode};
if(kind==='all')return `# IRIS LAB — Ақылбек және Алмас\n# 1. Деректерді жүктеу және бөлу\n${dataCode}\n\n# 2. Logistic Regression: оқыту және болжам\n${trainCode}\n\n# 3. Нәтижелерді бағалау\n${metricsCode}\n\n# 4. Қосымша: KNN үшін ең жақсы k\n${knnCode}\n`;
return pieces[kind];
}
function openCode(kind){currentCode=pythonCode(kind);$('codeTitle').textContent=kind==='all'?"Толық практикалық код":"Python коды";$('codeText').textContent=currentCode;$('codeDescription').textContent=kind==='all'?`Таңдалған test_size=${state.pct/100}. Кодты Colab-та бір ұяшықта орындауға болады.`:kind==='data'?"Алдымен осы блокты орында. Келесі блоктар X_train, X_test, y_train, y_test айнымалыларын пайдаланады.":"Бұл блок негізгі кодтың жалғасы. Деректерді бөлу блогын алдымен орында. Толық нұсқа 6-бетте қолжетімді.";$('codeDialog').showModal();}

document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.page)));
$('prevBtn').addEventListener('click',()=>goTo(state.page-1));$('nextBtn').addEventListener('click',()=>goTo(state.page===6?1:state.page+1));
window.addEventListener('hashchange',()=>goTo(location.hash.slice(1),false));
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input,select,textarea,[contenteditable]'))return;if(e.key==='ArrowRight'){e.preventDefault();goTo(state.page===6?1:state.page+1);}if(e.key==='ArrowLeft'){e.preventDefault();goTo(state.page-1);}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('notesBtn').addEventListener('click',openNotes);$('sourcesBtn').addEventListener('click',()=>$('sourcesDialog').showModal());
$('copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentCode);toast("Код көшірілді ✓");}catch{const range=document.createRange();range.selectNodeContents($('codeText'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);toast("Код белгіленді. Ctrl+C арқылы көшір.");}});
$('downloadCode').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([currentCode],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='iris_lab.py';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.querySelectorAll('.code-toggle').forEach(b=>b.addEventListener('click',()=>openCode(b.dataset.code)));$('allCodeBtn').addEventListener('click',()=>openCode('all'));
goTo(location.hash.slice(1)||1,false);

async function init(){
  try{const response=await fetch('iris-original-data.json');if(!response.ok)throw Error('Data request failed');data=await response.json();
    $('versionInfo').textContent=`Есептеулер scikit-learn ${data.version} нұсқасында жасалды.`;
    $('dataPoint').innerHTML=data.X.map((_,i)=>`<option value="${i}">№${i+1} · ${data.names[data.y[i]]}</option>`).join('');
    initFlower();drawScatter('heroPlot',2,3,true);renderSigmoid();renderSoftmax();updateSplit(20);
    $('xAxis').addEventListener('change',renderData);$('yAxis').addEventListener('change',renderData);
    $('colorClass').addEventListener('click',()=>{state.color='class';$('colorClass').classList.add('selected');$('colorSplit').classList.remove('selected');renderData();});
    $('colorSplit').addEventListener('click',()=>{state.color='split';$('colorSplit').classList.add('selected');$('colorClass').classList.remove('selected');renderData();});
    $('dataPlot').addEventListener('click',e=>{const point=e.target.closest('[data-point]');if(point){state.selected=+point.dataset.point;renderData();}});
    $('dataPoint').addEventListener('change',e=>{state.selected=+e.target.value;renderData();});
    $('testRatio').addEventListener('input',e=>updateSplit(e.target.value));$('resultSplit').addEventListener('change',e=>updateSplit(e.target.value));
    ['weight','bias','sampleX'].forEach(id=>$(id).addEventListener('input',()=>{cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Қисық бойымен жүргізу";renderSigmoid();}));
    [0,1,2].forEach(i=>$('logit'+i).addEventListener('input',renderSoftmax));
    $('sigmoidTab').addEventListener('click',()=>setMode(false));$('softmaxTab').addEventListener('click',()=>setMode(true));$('sweepBtn').addEventListener('click',sweep);
    $('trainPlay').addEventListener('click',playTrain);document.querySelectorAll('.train-step').forEach(b=>b.addEventListener('click',()=>{clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="▶ Қадамдарды көрсету";setStage(+b.dataset.step);}));
    $('samplePreset').addEventListener('click',samplePreset);$('testSample').addEventListener('change',renderSample);
    $('matrix').addEventListener('click',e=>{const b=e.target.closest('[data-row]');if(b)inspectCell(+b.dataset.row,+b.dataset.col,b);});
    $('knnK').addEventListener('input',e=>{clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ k мәндерін салыстыру";state.knn=+e.target.value;renderKNN();});
    $('knnPlot').addEventListener('click',e=>{const p=e.target.closest('[data-k]');if(p){clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ k мәндерін салыстыру";state.knn=+p.dataset.k;renderKNN();}});$('scanK').addEventListener('click',scanK);
    document.body.dataset.ready='true';
  }catch(error){$('loadError').hidden=false;console.error(error);}
}
init();
