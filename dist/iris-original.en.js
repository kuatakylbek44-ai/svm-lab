'use strict';
const $ = id => document.getElementById(id);
const colors = ['#167d64','#8060c6','#eaa044'];
const titles = ["Aim and objectives","Data Lab","How the model works","Training and prediction","Analyzing the results","The best k"];
const state = {page:1,pct:20,color:'class',selected:0,step:0,knn:3,softmax:false};
let data,trainTimer,scanTimer,sweepFrame,toastTimer,currentCode='';
const fmt = (n,d=1) => Number(n).toFixed(d);
const cfg = () => data.splits[state.pct];
const svgText = (x,y,t,extra='') => `<text x="${x}" y="${y}" ${extra}>${t}</text>`;
const line = (x1,y1,x2,y2,extra='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2500);}

const notes = [
  {script:"The purpose of our work is to determine the type of flower using Logistic Regression. Iris data contains 150 flowers, four numerical characters and three classes. The model learns patterns from the size of the flower and predicts whether it is a setosa, versicolor, or virginica. First, I explain the data and how the model works, then Almas shows the practical steps and results.",demo:"Demonstration: Show the three colors on the graph and explain that each point is a flower.",qa:[["What is classification?","Look at the features of the object and determine which class it belongs to."],["Is it regression or classification?","Although it has \"regression\" in the name, Logistic Regression is a classification model that predicts class at work."],["What are the three classes?",'0 — setosa, 1 — versicolor, 2 — virginica.']]},
  {script:"X is the four dimensions that describe the flower, and y is its actual type. We divide the data into training and test parts. In the default version, 80 percent, i.e. 120 flowers are given to training, 20 percent, i.e. 30 flowers are given to test. The test data are not seen by the model during training, so we use them to test the performance of the model on new data.",demo:"Display: press the \"Train / Test\" button, move the test share to 30%, show the changed number. Then 20% back.",qa:[["Call the dataset.",'X, y = load_iris(return_X_y=True)'],["How do we divide into train/test?","train_test_split(X, y, test_size=0.2, random_state=42). Order of results: X_train, X_test, y_train, y_test."],["random_state=42 why?","So that when you do the split again, the exact same patterns come up. 42 is a seed for repeatability, not a magic number that increases accuracy."],["What is the difference between multiclass and multilabel?","Multiclass: one object is one class. Multilabel: one object can belong to several categories. Iris is multiclass."]]},
  {script:"The logistic model calculates a weighted sum of symptoms. In the two-class case, the sigmoid transforms that number into a probability between 0 and 1. In the graph, we can see how the probability changes as the weight, bias, and input value change. And our three-class Iris model calculates three probabilities using softmax and selects the class with the highest probability.",demo:"Display: Change the w slider and explain the slope of the curve. Then increase the virginica score in the Softmax tab. Say \"Almas will show you the practice\".",qa:[["What does a sigmoid do?","Converts any real number to a value between 0 and 1."],["Why do you need weight?","Determines the influence of each feature on the score calculated by the model. During training, the model finds these coefficients."],["Do we use a threshold of 0.5 in three classes?","This multiclass model selects the class with the highest probability. Individual 0.5 thresholds do not apply to all classes."]]},
  {script:"I will show the steps to train the model and make predictions. First, we create a LogisticRegression(max_iter=1000) model. Using fit(X_train, y_train) we train the relationship between features and responses in the training data. Then we use predict(X_test) to predict the type of flowers we have not seen before. On this page, you can change the flower sizes and see how the probabilities and response of the trained model change.",demo:"Show: Click the \"Show steps\" button. Then change the \"Culture Length\" and \"Culture Width\" sliders to show the prediction.",qa:[["Train the model.",'model.fit(X_train, y_train)'],["Make a Prediction.",'pred = model.predict(X_test)'],["Why don't we pass y_test to predict()?","The model should guess the answer itself from the X_test labels. y_test only needs to be compared later."],["What does max_iter=1000 mean?","Allows a maximum of 1000 iterations for the training algorithm. This does not necessarily mean that 1000 iterations are performed."]]},
  {script:"We compare the predictions of the model with the actual y_test answers. Accuracy is the ratio of the number of correct predictions to all test samples. In the default 20 percent test, all 30 flowers were correctly identified, so the accuracy was 100 percent. The diagonal of the error matrix contains 10, 9, and 11 correct predictions. But this result only applies to this part of the test, accuracy may vary in other data.",demo:"Display: click on the cell on the diagonal of the matrix. Change the test proportion to 40% and compare the results. In protection, name the numbers with the current value on the screen.",qa:[["How is Accuracy calculated?","accuracy_score(y_test, pred). Divides correct guesses by the number of all guesses."],["What are row and column in matrix?","The row is the actual class, the column is the class predicted by the model. Diagonal - correct guesses."],["If 100%, is the model perfect?","Nope. This is the result of a small test section. There may be an error in other data."],["What is precision and recall?","Precision: the correct proportion of those predicted to be a particular class. Recall: the proportion found of specific samples in that class."]]},
  {script:"The question about the best k is related to the KNN model. k is the number of nearest neighbors considered when classifying a new object. Logistic Regression has no such number of neighbors parameter. We compared k values ​​from 1 to 20 for KNN with five-part cross-validation within train. The best_k value chosen by GridSearchCV in the default distribution was 3. We do not use the last test for parameter selection, we save it for evaluating the finished model.",demo:"Rendering: Add \"compare k values\" animation. Show best point and CV accuracy. Open best_params_ with \"full code\".",qa:[["How do you write the best k?",'best_k = search.best_params_["n_neighbors"]'],["Is best_k a ready team?","Nope. This is the name of a variable that holds the number of best neighbors found."],["Is cv=5 and k the same thing?","Nope. cv=5 is the number of parts in cross-validation. k is the number of neighbors considered by the KNN."],["Why don't we choose k by test?","If we choose a parameter based on the test, the final assessment will not be fair. We make the selection using CV in train."]]}
];

function stopAnimations(){clearInterval(trainTimer);clearInterval(scanTimer);cancelAnimationFrame(sweepFrame);trainTimer=null;scanTimer=null;sweepFrame=null;$('trainPlay').textContent="▶ Show steps";$('scanK').textContent="▶ Comparison of k values";$('sweepBtn').textContent="▶ Driving along a curve";}
function goTo(n,updateHash=true){
  n=Math.max(1,Math.min(6,Number(n === 'knn' ? 6 : n)||1));stopAnimations();state.page=n;
  document.querySelectorAll('.page').forEach((p,i)=>{p.hidden=i+1!==n;p.classList.toggle('active',i+1===n);});
  document.querySelectorAll('.nav-link').forEach(b=>{const active=Number(b.dataset.page)===n;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  $('crumb').textContent=titles[n-1];$('speakerTag').textContent=`${n<=3?"Akylbek":"Almas"} · ${n}/6`;$('pageCount').textContent=`0${n} / 06`;$('pageProgress').style.width=`${n/6*100}%`;$('prevBtn').disabled=n===1;$('nextBtn').textContent=n===6?"Return to beginning ↺":"Next page →";
  document.title=`${n}. ${titles[n-1]} · IRIS LAB`;
  if(updateHash)history.replaceState(null,'',`#${n}`);
  window.scrollTo({top:0,behavior:'instant'});
}
function openNotes(){const n=notes[state.page-1];$('notesOwner').textContent=`${state.page<=3?"AKYLBEK":"ALMAS"} · ${state.page} · PAGE`;$('speakerScript').textContent=n.script;$('demoCue').textContent=n.demo;$('qaList').innerHTML=n.qa.map(([q,a])=>`<div class="qa-item"><b>${escapeHtml(q)}</b><p>${escapeHtml(a)}</p></div>`).join('');$('notesDialog').showModal();}

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
  const c=chartFrame({w,h,xMin:xmin,xMax:xmax,yMin:ymin,yMax:ymax,xTitle:data.features[xIdx]+" (cm)",yTitle:data.features[yIdx]+" (cm)",xTicks:5,yTicks:4});
  const test=new Set(cfg().test);let html=c.html;
  data.X.forEach((row,i)=>{const color=hero||state.color==='class'?colors[data.y[i]]:test.has(i)?colors[2]:colors[0];const selected=!hero&&i===state.selected;html+=`<circle class="${hero?'hero-point':'point'}" cx="${c.sx(row[xIdx])}" cy="${c.sy(row[yIdx])}" r="${selected?7:hero?4.5:4.8}" fill="${color}" opacity="${selected?1:.78}" ${selected?'stroke="#172b2c" stroke-width="2"':''} ${hero?`style="animation-delay:${i%50*9}ms"`:`data-point="${i}"`}><title>№${i+1}: ${data.names[data.y[i]]} · ${row[xIdx]} cm, ${row[yIdx]} cm</title></circle>`;});
  $(target).innerHTML=html;
}
function renderData(){
  drawScatter('dataPlot',+$('xAxis').value,+$('yAxis').value);
  $('dataLegend').innerHTML=state.color==='class'?data.names.map((n,i)=>`<span><i class="dot" style="background:${colors[i]}"></i>${n}</span>`).join(''):'<span><i class="dot c0"></i>Train</span><span><i class="dot c2"></i>Test</span>';
  const row=data.X[state.selected],split=cfg().test.includes(state.selected)?'Test':'Train';
  $('pointInfo').textContent=`№${state.selected+1} · ${data.names[data.y[state.selected]]} · ${split} dimensions: ${row.map(v=>fmt(v)).join(' / ')} cm`;
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
  const c=chartFrame({h:410,xMin:-5,xMax:5,yMin:0,yMax:1,xTitle:"The input value is x",yTitle:"Class 1 probability p",xTicks:5,yTicks:5});
  let path='';for(let i=0;i<=200;i++){const xx=-5+i*.05;path+=`${i?'L':'M'}${c.sx(xx).toFixed(2)},${c.sy(IrisMath.sigmoid(w*xx+b)).toFixed(2)} `;}
  let html='<defs><linearGradient id="sigGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#167d64" stop-opacity=".2"/><stop offset="100%" stop-color="#167d64" stop-opacity=".015"/></linearGradient></defs>'+c.html;
  html+=`<path class="area" d="${path}L${c.right},${c.bottom} L${c.left},${c.bottom} Z"/>`;
  html+=line(c.left,c.sy(.5),c.right,c.sy(.5),'stroke="#8060c6" stroke-dasharray="7 5" stroke-width="1.5"')+svgText(c.right-5,c.sy(.5)-9,'p = 0.5','text-anchor="end"');
  html+=`<path class="sig-path" d="${path}"/>`+line(c.sx(x),c.bottom,c.sx(x),c.sy(p),'stroke="#167d64" stroke-dasharray="4 4"')+`<circle cx="${c.sx(x)}" cy="${c.sy(p)}" r="8" fill="#167d64" stroke="white" stroke-width="3"/>`;
  const tx=Math.max(c.left+36,Math.min(c.right-36,c.sx(x)));html+=svgText(tx,Math.max(c.top+13,c.sy(p)-17),fmt(p*100)+'%','text-anchor="middle" style="font-size:14px;fill:#167d64;font-weight:bold"');
  $('sigmoidPlot').innerHTML=html;$('sigProb').innerHTML=`${fmt(p*100)}<small>%</small>`;$('sigDecision').textContent=`Prediction: class ${p>=.5?1:0}`;$('zEquation').textContent=`z = ${fmt(w)} × ${fmt(x)} + (${fmt(b)}) = ${fmt(z)}`;
}
function bars(probs){return probs.map((p,i)=>`<div class="prob-row"><div class="prob-row-head"><span><i class="dot" style="background:${colors[i]}"></i> ${data.names[i]}</span><b>${fmt(p*100)}%</b></div><div class="prob-track"><div class="prob-fill" style="width:${p*100}%;background:${colors[i]}"></div></div></div>`).join('');}
function renderSoftmax(){const logits=[0,1,2].map(i=>+$('logit'+i).value);logits.forEach((v,i)=>$('logit'+i+'Val').textContent=fmt(v));const probs=IrisMath.softmax(logits),best=probs.indexOf(Math.max(...probs));$('softmaxBars').innerHTML=bars(probs);$('softmaxResult').innerHTML=`Prediction: <b style="color:${colors[best]}">${data.names[best]}</b>`;}
function setMode(soft){cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Driving along a curve";state.softmax=soft;$('sigmoidView').hidden=soft;$('softmaxView').hidden=!soft;$('sigmoidTab').classList.toggle('active',!soft);$('softmaxTab').classList.toggle('active',soft);$('sigmoidTab').setAttribute('aria-selected',String(!soft));$('softmaxTab').setAttribute('aria-selected',String(soft));}
function sweep(){if(sweepFrame){cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Driving along a curve";return;}$('sweepBtn').textContent="Ⅱ Termination";const start=performance.now();function tick(now){const progress=Math.min(1,(now-start)/6000);$('sampleX').value=(-5+10*progress).toFixed(1);renderSigmoid();if(progress<1)sweepFrame=requestAnimationFrame(tick);else{sweepFrame=null;$('sweepBtn').textContent="▶ Driving along a curve";}}sweepFrame=requestAnimationFrame(tick);}

function setStage(i){state.step=i;document.querySelectorAll('.train-step').forEach((b,j)=>b.classList.toggle('active',i===j));const stages=[['X, y = load_iris(return_X_y=True)',"We download 150 flowers in four sizes and real classes."],[`train_test_split(X, y, test_size=${state.pct/100}, random_state=42)`,`${cfg().train.length} to teach flowers, ${cfg().test.length} divide the flower into a test.`],['model.fit(X_train, y_train)',"The model learns coefficients from train labels and actual responses."],['pred = model.predict(X_test)',"The model predicts the class from the X_test labels. y_test is only needed for evaluation."]];$('stageCode').textContent=stages[i][0];$('stageExplain').textContent=stages[i][1];$('stepProgress').style.width=(i+1)*25+'%';}
function playTrain(){if(trainTimer){clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="▶ Show steps";return;}setStage(0);$('trainPlay').textContent="Ⅱ Termination";trainTimer=setInterval(()=>{if(state.step<3)setStage(state.step+1);else{clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="↻ Replay";}},1400);}
function initFlower(){const ranges=[[4,8,.1],[2,4.5,.1],[1,7,.1],[.1,2.5,.1]];const defaults=[5.1,3.5,1.4,.2];$('flowerSliders').innerHTML=data.features.map((name,i)=>`<label class="range-label" for="flower${i}">${name}<strong id="flower${i}Val">${fmt(defaults[i])} cm</strong></label><input id="flower${i}" type="range" min="${ranges[i][0]}" max="${ranges[i][1]}" step="${ranges[i][2]}" value="${defaults[i]}">`).join('');[0,1,2,3].forEach(i=>$('flower'+i).addEventListener('input',renderPrediction));}
function renderPrediction(){const row=[0,1,2,3].map(i=>+$('flower'+i).value);row.forEach((v,i)=>$('flower'+i+'Val').textContent=fmt(v)+" cm");const result=IrisMath.predict(cfg(),row);$('predName').textContent=data.names[result.label];$('predName').style.color=colors[result.label];$('flowerEmblem').style.color=colors[result.label];$('flowerEmblem').style.transform=`rotate(${result.label*40}deg)`;$('predictionBars').innerHTML=bars(result.probabilities);$('predInputNote').textContent=`${cfg().train.length} model trained with sample · test_size=${state.pct/100}`;}
let presetIndex=0;
function samplePreset(){const idx=cfg().test[presetIndex%cfg().test.length];presetIndex++;data.X[idx].forEach((v,i)=>$('flower'+i).value=v);renderPrediction();toast(`Test no${idx+1} flower received · exact type: ${data.names[data.y[idx]]}`);}

function renderResults(){const m=cfg(),correct=m.pred.reduce((s,p,i)=>s+(p===data.y[m.test[i]]),0),errors=m.test.length-correct;$('accuracyBig').innerHTML=`${fmt(m.accuracy*100,m.accuracy===1?0:1)}<small>%</small>`;$('accuracyFraction').textContent=`${m.test.length} of the flower ${correct}- is correctly identified.`;$('errorCount').textContent=errors+" wrong";
  let grid='<div class="matrix-grid"><span></span>'+data.names.map(n=>`<span class="matrix-label">${n}</span>`).join('');
  m.confusion.forEach((row,i)=>{grid+=`<span class="matrix-label">${data.names[i]}</span>`;row.forEach((v,j)=>{grid+=`<button class="matrix-cell ${i===j?'diag':v?'error':''}" data-row="${i}" data-col="${j}" aria-label="Actual ${data.names[i]}, prediction ${data.names[j]}: ${v} flower">${v}</button>`;});});
  $('matrix').innerHTML=grid+'</div>';$('matrixDetail').textContent="Values ​​on the diagonal are correct guesses.";
  $('metricsTable').querySelector('tbody').innerHTML=data.names.map((n,i)=>{const r=m.report[i];return `<tr><td><i class="dot" style="background:${colors[i]}"></i> ${n}</td><td>${fmt(r.precision,2)}</td><td>${fmt(r.recall,2)}</td><td>${fmt(r['f1-score'],2)}</td></tr>`;}).join('');
  $('testSample').innerHTML=m.test.map((id,i)=>`<option value="${i}">№${id+1} flower · ${data.names[data.y[id]]}</option>`).join('');renderSample();
}
function renderSample(){const m=cfg(),i=+$('testSample').value,id=m.test[i],actual=data.y[id],pred=m.pred[i];$('testCompare').innerHTML=`<div class="compare-result ${actual!==pred?'wrong':''}"><div>Actual class<b>${data.names[actual]}</b></div><div>Prediction<b>${data.names[pred]} ${actual===pred?'✓':'×'}</b></div></div>`;}
function inspectCell(r,c,button){document.querySelectorAll('.matrix-cell').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const ids=cfg().test.filter((id,i)=>data.y[id]===r&&cfg().pred[i]===c);$('matrixDetail').textContent=ids.length?`${data.names[r]} → ${data.names[c]}: ${ids.length} flower Numbers: ${ids.map(v=>v+1).join(', ')}.`:"There is no flower in this cell — no such assumption was made.";}

function renderKNN(){const m=cfg(),values=m.cv.map(x=>x*100),min=Math.floor(Math.min(...values)-1),max=Math.min(100,Math.ceil(Math.max(...values)+1));const c=chartFrame({h:410,xMin:1,xMax:20,yMin:min,yMax:max,xTitle:"The number of neighbors is k",yTitle:"Average CV Accuracy (%)",xTicks:0,yTicks:4});
  let html=c.html;
  [1,3,5,10,15,20].forEach(k=>{html+=line(c.sx(k),c.top,c.sx(k),c.bottom,'class="gridline"')+svgText(c.sx(k),c.bottom+19,k,'text-anchor="middle"');});
  const path=values.map((v,i)=>`${i?'L':'M'}${c.sx(i+1)},${c.sy(v)}`).join(' ');html+=`<path class="knn-path" d="${path}"/>`;
  const selected=state.knn;html+=line(c.sx(selected),c.top,c.sx(selected),c.bottom,'stroke="#167d64" stroke-dasharray="5 4" stroke-width="1"');
  values.forEach((v,i)=>{const k=i+1;html+=`<circle cx="${c.sx(k)}" cy="${c.sy(v)}" r="${selected===k?7:4}" fill="${selected===k?'#167d64':'#8060c6'}" stroke="white" stroke-width="2" class="point" data-k="${k}"><title>k=${k}, CV=${fmt(v,2)}%</title></circle>`;});
  html+=svgText(c.sx(m.bestK),Math.max(13,c.sy(values[m.bestK-1])-18),'★ best k = '+m.bestK,'text-anchor="middle" style="fill:#167d64;font-weight:bold;font-size:12px"');
  $('knnPlot').innerHTML=html;$('knnKValue').textContent=selected;$('knnK').value=selected;$('knnCV').textContent=fmt(values[selected-1],2)+'%';$('bestK').textContent=m.bestK;$('bestSummary').innerHTML=`Final test accuracy of the best model: <b>${fmt(m.knnTest[m.bestK-1]*100,1)}%</b><br>Train: ${m.train.length} · Test: ${m.test.length}`;
}
function scanK(){if(scanTimer){clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ Comparison of k values";return;}state.knn=1;renderKNN();$('scanK').textContent="Ⅱ Termination";scanTimer=setInterval(()=>{if(state.knn<20){state.knn++;renderKNN();}else{clearInterval(scanTimer);scanTimer=null;state.knn=cfg().bestK;renderKNN();$('scanK').textContent="↻ Recompare";toast(`Selected best k = ${cfg().bestK}`);}},240);}

function pythonCode(kind){
const dataCode=`from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=${state.pct/100}, random_state=42\n)\nprint(X_train.shape, X_test.shape)\nprint(y_train.shape, y_test.shape)`;
const trainCode=`from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\npred = model.predict(X_test)\nprint("Болжам:", pred)\nprint("Нақты:", y_test)`;
const metricsCode=`from sklearn.metrics import accuracy_score, confusion_matrix\nfrom sklearn.metrics import classification_report\n\nprint("Accuracy:", accuracy_score(y_test, pred))\nprint(confusion_matrix(y_test, pred))\nprint(classification_report(y_test, pred))`;
const knnCode=`from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.model_selection import GridSearchCV\n\nsearch = GridSearchCV(\n    KNeighborsClassifier(),\n    {"n_neighbors": range(1, 21)},\n    cv=5, scoring="accuracy"\n)\nsearch.fit(X_train, y_train)\nbest_k = search.best_params_["n_neighbors"]\nprint("Ең жақсы k:", best_k)\nprint("CV дәлдігі:", search.best_score_)\nprint("KNN тест дәлдігі:", search.score(X_test, y_test))`;
const pieces={data:dataCode,train:trainCode,metrics:metricsCode,knn:knnCode};
if(kind==='all')return `# IRIS LAB — Ақылбек және Алмас\n# 1. Деректерді жүктеу және бөлу\n${dataCode}\n\n# 2. Logistic Regression: оқыту және болжам\n${trainCode}\n\n# 3. Нәтижелерді бағалау\n${metricsCode}\n\n# 4. Қосымша: KNN үшін ең жақсы k\n${knnCode}\n`;
return pieces[kind];
}
function openCode(kind){currentCode=pythonCode(kind);$('codeTitle').textContent=kind==='all'?"Full practical code":"Python code";$('codeText').textContent=currentCode;$('codeDescription').textContent=kind==='all'?`Selected test_size=${state.pct/100}. You can execute the code in a single cell in Colab.`:kind==='data'?"Do this block first. The following blocks use the variables X_train, X_test, y_train, y_test.":"This block is a continuation of the main code. Do the data allocation block first. The full version is available on page 6.";$('codeDialog').showModal();}

document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.page)));
$('prevBtn').addEventListener('click',()=>goTo(state.page-1));$('nextBtn').addEventListener('click',()=>goTo(state.page===6?1:state.page+1));
window.addEventListener('hashchange',()=>goTo(location.hash.slice(1),false));
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input,select,textarea,[contenteditable]'))return;if(e.key==='ArrowRight'){e.preventDefault();goTo(state.page===6?1:state.page+1);}if(e.key==='ArrowLeft'){e.preventDefault();goTo(state.page-1);}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('notesBtn').addEventListener('click',openNotes);$('sourcesBtn').addEventListener('click',()=>$('sourcesDialog').showModal());
$('copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentCode);toast("Code copied ✓");}catch{const range=document.createRange();range.selectNodeContents($('codeText'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);toast("The code is set. Copy with Ctrl+C.");}});
$('downloadCode').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([currentCode],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='iris_lab.py';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.querySelectorAll('.code-toggle').forEach(b=>b.addEventListener('click',()=>openCode(b.dataset.code)));$('allCodeBtn').addEventListener('click',()=>openCode('all'));
goTo(location.hash.slice(1)||1,false);

async function init(){
  try{const response=await fetch('iris-original-data.json');if(!response.ok)throw Error('Data request failed');data=await response.json();data.features=["Sepal length","Sepal width","Petal length","Petal width"];
    $('versionInfo').textContent=`Calculations used scikit-learn ${data.version} .`;
    $('dataPoint').innerHTML=data.X.map((_,i)=>`<option value="${i}">№${i+1} · ${data.names[data.y[i]]}</option>`).join('');
    initFlower();drawScatter('heroPlot',2,3,true);renderSigmoid();renderSoftmax();updateSplit(20);
    $('xAxis').addEventListener('change',renderData);$('yAxis').addEventListener('change',renderData);
    $('colorClass').addEventListener('click',()=>{state.color='class';$('colorClass').classList.add('selected');$('colorSplit').classList.remove('selected');renderData();});
    $('colorSplit').addEventListener('click',()=>{state.color='split';$('colorSplit').classList.add('selected');$('colorClass').classList.remove('selected');renderData();});
    $('dataPlot').addEventListener('click',e=>{const point=e.target.closest('[data-point]');if(point){state.selected=+point.dataset.point;renderData();}});
    $('dataPoint').addEventListener('change',e=>{state.selected=+e.target.value;renderData();});
    $('testRatio').addEventListener('input',e=>updateSplit(e.target.value));$('resultSplit').addEventListener('change',e=>updateSplit(e.target.value));
    ['weight','bias','sampleX'].forEach(id=>$(id).addEventListener('input',()=>{cancelAnimationFrame(sweepFrame);sweepFrame=null;$('sweepBtn').textContent="▶ Driving along a curve";renderSigmoid();}));
    [0,1,2].forEach(i=>$('logit'+i).addEventListener('input',renderSoftmax));
    $('sigmoidTab').addEventListener('click',()=>setMode(false));$('softmaxTab').addEventListener('click',()=>setMode(true));$('sweepBtn').addEventListener('click',sweep);
    $('trainPlay').addEventListener('click',playTrain);document.querySelectorAll('.train-step').forEach(b=>b.addEventListener('click',()=>{clearInterval(trainTimer);trainTimer=null;$('trainPlay').textContent="▶ Show steps";setStage(+b.dataset.step);}));
    $('samplePreset').addEventListener('click',samplePreset);$('testSample').addEventListener('change',renderSample);
    $('matrix').addEventListener('click',e=>{const b=e.target.closest('[data-row]');if(b)inspectCell(+b.dataset.row,+b.dataset.col,b);});
    $('knnK').addEventListener('input',e=>{clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ Comparison of k values";state.knn=+e.target.value;renderKNN();});
    $('knnPlot').addEventListener('click',e=>{const p=e.target.closest('[data-k]');if(p){clearInterval(scanTimer);scanTimer=null;$('scanK').textContent="▶ Comparison of k values";state.knn=+p.dataset.k;renderKNN();}});$('scanK').addEventListener('click',scanK);
    document.body.dataset.ready='true';
  }catch(error){$('loadError').hidden=false;console.error(error);}
}
init();
