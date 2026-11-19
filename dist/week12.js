(() => {
  'use strict';
  const lang=document.documentElement.lang;
  const t=(...copy)=>copy[{kk:0,ru:1,en:2}[lang]];
  const suffix=lang==='kk'?'':'.'+lang;
  const pages=window.CNN_CONTENT,core=window.CNN_LAB;
  const $=id=>document.getElementById(id);
  const main=$('cnnMain'),back=`index${suffix}.html#topic-group-12`;
  const fmt=v=>new Intl.NumberFormat(lang==='en'?'en-US':'ru-RU',{maximumFractionDigits:2}).format(v);
  const pct=v=>fmt(v*100)+'%';
  const labels={
    explanation:t('Түсіндірме','Объяснение','Explanation'),formulas:t('Формулалар','Формулы','Formulas'),
    code:t('Осы беттің коды','Код этой страницы','Page code'),full:t('Толық код','Полный код','Full code'),
    play:t('Анимацияны қарау','Смотреть анимацию','Play animation'),step:t('Бір қадам','Один шаг','One step'),
    reset:t('Басынан','Сначала','Reset'),input:t('Кіріс','Вход','Input'),output:t('Шығыс','Выход','Output'),
    filter:t('Сүзгі','Фильтр','Filter'),epoch:t('Эпоха','Эпоха','Epoch'),next:t('Келесі бет','Следующая страница','Next page')
  };
  const colors=['#78d5b0','#b193df','#e4b16d','#78aee0','#d58da5','#add478','#9acbc5','#ccab7d','#c3b4e1','#d69777'];
  const state={filter:'vertical',flip:false,padding:0,window:0,relu:false,inverse:false,poolStep:0,model:0,sample:0,epoch:0,channel:0};
  let active=0,timer,measured,sourceRequest;
  const sourceFile='week12-files/cnn-study.py';
  const panel=(title,body)=>`<section class="week11-panel"><h3>${title}</h3>${body}</section>`;
  const metrics=items=>`<div class="week11-metrics">${items.map(([v,label])=>`<div><strong>${v}</strong><small>${label}</small></div>`).join('')}</div>`;
  const select=(id,label,items,value)=>`<label>${label}<select id="${id}">${items.map(([v,name])=>`<option value="${v}" ${String(v)===String(value)?'selected':''}>${name}</option>`).join('')}</select></label>`;
  const range=(id,label,max,value)=>`<label>${label} <output id="${id}Value">${value}</output><input id="${id}" type="range" min="0" max="${max}" value="${value}"></label>`;
  const toggle=(id,label,checked)=>`<label class="cnn-check"><input id="${id}" type="checkbox" ${checked?'checked':''}> ${label}</label>`;
  const downloads=()=>`<div class="topic-lab-actions"><a class="topic-lab-button" href="week12-files/cnn-akylbek-almas.ipynb" download>↓ Colab notebook</a><a class="topic-lab-button" href="${sourceFile}" download>↓ Python</a><a class="topic-lab-button" href="week12-files/original-cnn.ipynb" download>↓ ${t('Бастапқы тапсырма','Исходное задание','Original assignment')}</a></div>`;
  const toolbar=()=>`<div class="topic-lab-actions topic-lab-reference"><button type="button" class="topic-lab-button" data-dialog="code">&lt;/&gt; ${labels.code}</button><button type="button" class="topic-lab-button" data-dialog="formulas">ƒ ${labels.formulas}</button><button type="button" class="topic-lab-button" data-dialog="explanation">${labels.explanation} ↗</button>${active===8?'':`<a class="topic-lab-button" href="#code">${labels.full} →</a>`}</div>`;
  const buttons=()=>`<div class="topic-lab-actions"><button type="button" class="topic-lab-button primary" id="cnnPlay">▶ ${labels.play}</button><button type="button" class="topic-lab-button" id="cnnStep">${labels.step} →</button><button type="button" class="topic-lab-button" id="cnnReset">${labels.reset}</button></div>`;
  function grid(matrix,{active:highlight=()=>false,visible:show=()=>true,heat=false}={}){
    const max=Math.max(1,...matrix.flat().map(Math.abs));
    return `<div class="cnn-grid" style="--columns:${matrix[0].length}" role="table">${matrix.map((row,r)=>row.map((v,c)=>`<span role="cell" class="${highlight(r,c)?'selected':''} ${show(r,c)?'':'unseen'}" ${heat?`style="--value:${Math.abs(v)/max};--cell:${v<0?'168,132,218':'98,194,155'}"`:''}>${show(r,c)?fmt(v):'·'}</span>`).join('')).join('')}</div>`;
  }
  function paint(canvas,pixels,signed=false){
    const rows=Array.isArray(pixels[0])?pixels:[],values=rows.length?pixels.flat():pixels;
    const width=rows.length?rows[0].length:Math.sqrt(values.length),height=rows.length?rows.length:width;
    canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d'),data=ctx.createImageData(width,height);
    const max=signed?Math.max(1e-8,...values.map(Math.abs)):255;
    values.forEach((v,i)=>{
      const n=Math.min(1,Math.abs(v)/max),rgb=signed&&v<0?[174,139,222]:[128,226,187];
      data.data.set([Math.round(14+(rgb[0]-14)*n),Math.round(27+(rgb[1]-27)*n),Math.round(22+(rgb[2]-22)*n),255],i*4);
    });
    ctx.putImageData(data,0,0);
  }
  function overview(){
    return `<div class="topic-lab-hero"><div><p class="topic-lab-kicker">12 / CONVOLUTIONAL NEURAL NETWORKS</p><h1>CNN.<br>${t('Суретті түсінетін желі.','Сеть, которая видит.','A network that sees.')}</h1><p class="topic-lab-question">${pages[0].title}.</p><p class="week11-lead">${pages[0].lead}</p><a class="topic-lab-button primary" href="#convolution">${t('Зертхананы бастау','Начать лабораторную','Start the lab')} ↗</a>${toolbar()}${downloads()}</div><figure class="topic-lab-preview"><figcaption>3 × 3 → FEATURE MAP</figcaption><div id="cnnHero"></div><p>${t('Ақылбек: сүзгі · Алмас: CNN болжамы','Акылбек: фильтры · Алмас: прогноз CNN','Akylbek: filters · Almas: CNN predictions')}</p></figure></div>`;
  }
  function convControls(){
    if(active===3)return select('edgeDirection',labels.filter,[['sobelX','Sobel X'],['sobelY','Sobel Y']],state.filter==='sobelY'?'sobelY':'sobelX')+toggle('inverse',t('Суретті аудару','Отразить изображение','Flip image'),state.inverse)+toggle('relu','ReLU',state.relu);
    if(active===2)return select('padding','Padding',[[0,'valid'],[1,'full']],state.padding);
    return select('operation',t('Амал','Операция','Operation'),[['false','Cross-correlation'],['true','Convolution · flip 180°']],state.flip);
  }
  function drawConv(){
    let input=core.image,filter=core.kernels.vertical;
    if(active===2){
      input=[[0,1,2],[3,4,5],[6,7,8]];
      filter=[[0,1],[2,3]];
    }
    if(active===3){
      input=Array.from({length:6},()=>[255,255,255,120,120,120]);
      if(state.inverse)input=input.map(row=>[...row].reverse());
      filter=core.kernels[state.filter==='sobelY'?'sobelY':'sobelX'];
    }
    const padding=active===2?state.padding:0;
    const result=core.scan(input,filter,padding,1,active===1&&state.flip);
    state.window=Math.min(state.window,result.windows.length-1);
    const w=result.windows[state.window],output=active===3&&state.relu?result.result.map(row=>row.map(v=>Math.max(0,v))):result.result;
    $('cnnCalculation').innerHTML=metrics([[`${result.padded.length} × ${result.padded.length}`,labels.input],[`${output.length} × ${output[0].length}`,labels.output],[fmt(output[w.row][w.col]),`Y[${w.row}, ${w.col}]`]])
      +`<div class="cnn-calculation">${panel(labels.input+` · ${state.window+1}/${result.windows.length}`,grid(result.padded,{active:(r,c)=>r>=w.top&&r<w.top+filter.length&&c>=w.left&&c<w.left+filter[0].length}))}${panel(labels.filter,grid(result.filter,{heat:true}))}${panel(labels.output,grid(output,{active:(r,c)=>r===w.row&&c===w.col,visible:(r,c)=>r*output[0].length+c<=state.window,heat:true}))}</div>
      <section class="week11-panel"><h3>${t('Көбейтеміз → қосамыз','Умножаем → складываем','Multiply → sum')}</h3><p class="cnn-equation">${w.products.flat().map(v=>v<0?'('+fmt(v)+')':fmt(v)).join(' + ')} = <strong>${fmt(w.value)}</strong>${active===3&&state.relu?' → ReLU = '+fmt(output[w.row][w.col]):''}</p><p class="week11-insight">${active===2?`3 + 2·${padding} − 2 + 1 = ${output.length}`:pages[active].show}</p></section>`;
    if(active===3 && measured?.photo){
      const box=document.createElement('div');box.className='cnn-map-grid cnn-photo';
      box.innerHTML=panel('RGB · 3 channels','<canvas id="photoRGB"></canvas>')+panel('Gray · 1 channel','<canvas id="photoGray"></canvas>')+panel('Sobel · signed','<canvas id="photoSobel"></canvas>')+panel('ReLU','<canvas id="photoRelu"></canvas>');
      $('cnnCalculation').append(box);
      const photo=measured.photo;
      const sourceResponse=state.filter==='sobelY'?photo.gy:photo.gx;
      const response=state.inverse?sourceResponse.map(row=>[...row].reverse().map(v=>state.filter==='sobelY'?v:-v)):sourceResponse;
      const sourceRGB=state.inverse?photo.rgb.map(row=>[...row].reverse()):photo.rgb;
      const sourceGray=state.inverse?photo.gray.map(row=>[...row].reverse()):photo.gray;
      const rgb=$('photoRGB');rgb.width=rgb.height=64;const ctx=rgb.getContext('2d'),pixels=ctx.createImageData(64,64);
      sourceRGB.flat().forEach((pixel,i)=>pixels.data.set([...pixel,255],i*4));ctx.putImageData(pixels,0,0);
      paint($('photoGray'),sourceGray);paint($('photoSobel'),response,true);paint($('photoRelu'),response.map(row=>row.map(v=>Math.max(0,v))),true);
    }
    return result.windows.length;
  }
  function drawPool(){
    const r=Math.floor(state.poolStep/2)*2,c=state.poolStep%2*2,result=core.pool(core.pooling);
    $('cnnCalculation').innerHTML=`<div class="cnn-pool-layout">${panel(labels.input,grid(core.pooling,{active:(row,col)=>row>=r&&row<r+2&&col>=c&&col<c+2}))}<div class="cnn-pool-arrow">→</div>${panel(labels.output,grid(result,{active:(row,col)=>row*2+col===state.poolStep,visible:(row,col)=>row*2+col<=state.poolStep}))}</div><p class="week11-insight">Max (${[core.pooling[r][c],core.pooling[r][c+1],core.pooling[r+1][c],core.pooling[r+1][c+1]].join(', ')}) = ${fmt(result[Math.floor(state.poolStep/2)][state.poolStep%2])}</p>`;
  }
  function mapsPage(){
    return `<p class="week11-insight">${pages[5].explain}</p><div class="week11-controls">${range('channel',t('Сүзгі арнасы','Канал фильтра','Filter channel'),7,state.channel)}</div><div class="cnn-map-grid">${panel(labels.input,'<canvas id="mapInput"></canvas><small>28 × 28 · test #0</small>')}${panel('Kernel','<canvas id="mapKernel"></canvas><small>3 × 3 · learned</small>')}${panel('Conv2D + ReLU','<canvas id="mapConv"></canvas><small>26 × 26</small>')}${panel('MaxPool','<canvas id="mapPool"></canvas><small>13 × 13</small>')}</div><div class="week11-flow cnn-flow"><span>28×28×1</span> → <span>Conv 3×3 · 8</span> → <span>26×26×8</span> → <span>Pool 2×2</span> → <span>13×13×8</span> → <span>Flatten 1352</span> → <span>Dense 10</span></div>`;
  }
  function drawMaps(){
    const m=measured.models[0];paint($('mapInput'),m.samples[0].pixels);paint($('mapKernel'),m.filters[state.channel],true);paint($('mapConv'),m.maps[state.channel],true);paint($('mapPool'),m.pooled[state.channel],true);$('channelValue').value=state.channel+1;
  }
  const fashionNames=[
    t('Футболка','Футболка','T-shirt'),t('Шалбар','Брюки','Trouser'),t('Пуловер','Пуловер','Pullover'),t('Көйлек','Платье','Dress'),t('Пальто','Пальто','Coat'),t('Сандал','Сандалии','Sandal'),t('Жейде','Рубашка','Shirt'),t('Кроссовка','Кроссовки','Sneaker'),t('Сөмке','Сумка','Bag'),t('Бәтеңке','Ботинок','Ankle boot')];
  const className=n=>state.model===2?fashionNames[n]:String(n);
  function historyChart(sample,epochs){
    const lines=Array.from({length:10},(_,cls)=>{
      const points=sample.probabilities.slice(0,state.epoch+1).map((p,e)=>`${50+e/epochs*470},${200-p[cls]*165}`).join(' ');
      return `<polyline points="${points}" stroke="${colors[cls]}" stroke-width="${cls===sample.actual?3:1.5}" fill="none" opacity="${cls===sample.actual?1:.65}"/>`;
    }).join('');
    const grid=[0,.5,1].map(p=>`<path class="grid" d="M50 ${200-p*165}H520"/><text x="40" y="${204-p*165}" text-anchor="end">${p*100}%</text>`).join('');
    return `<svg class="week11-plot" viewBox="0 0 540 238" role="img" aria-label="${labels.epoch}: ${state.epoch}">${grid}${lines}<path d="M${50+state.epoch/epochs*470} 35V200" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="50" y="223">0</text><text x="520" y="223" text-anchor="end">${epochs}</text></svg>`;
  }
  function trainingPage(){
    const m=measured.models[state.model];
    return `<div class="week11-controls">${select('model',t('Модель','Модель','Model'),measured.models.map((m,i)=>[i,m.name]),state.model)}${select('sample',t('Тест кескіні','Тестовое изображение','Test image'),m.samples.map((s,i)=>[i,`#${s.index} · ${className(s.actual)} ${s.prediction!==s.actual?'×':''}`]),state.sample)}${range('epoch',labels.epoch,m.epochs,state.epoch)}</div>${buttons()}<div id="cnnPredictions"></div>`;
  }
  function drawTraining(){
    const m=measured.models[state.model],s=m.samples[state.sample],p=s.probabilities[state.epoch],winner=p.indexOf(Math.max(...p));
    $('epochValue').value=state.epoch;
    $('cnnPredictions').innerHTML=metrics([[pct(m.accuracy),t('Соңғы тест дәлдігі','Итоговая точность теста','Final test accuracy')],[fmt(m.errors),t('Тест қатесі','Ошибок на тесте','Test errors')],[fmt(m.parameters),t('Параметр','Параметры','Parameters')]])
      +`<div class="week11-grid">${panel(t('Бір кескін · он ықтималдық','Один пример · десять вероятностей','One image · ten probabilities'),historyChart(s,m.epochs)+`<div class="cnn-legend">${p.map((_,i)=>`<span><i style="background:${colors[i]}"></i>${className(i)}</span>`).join('')}</div>`)}
      ${panel(t('Модельдің болжамы','Прогноз модели','Model prediction'),`<div class="week11-detail"><canvas id="predictionImage"></canvas><div><p>${t('Болжам','Прогноз','Prediction')}: <strong>${className(winner)}</strong> ${winner===s.actual?'✓':'×'}</p><p>${t('Нақты','Факт','Actual')}: ${className(s.actual)}</p><p>${labels.epoch} ${state.epoch}/${m.epochs}</p></div></div><div class="week11-bars">${p.map((v,i)=>`<label>${className(i)}<meter min="0" max="1" value="${v}" aria-label="${className(i)} ${pct(v)}"></meter><span>${pct(v)}</span></label>`).join('')}</div>`)}</div><p class="week11-insight">${pages[6].explain}</p>
      <details class="cnn-matrix-details"><summary>${t('Барлық тест дерегінің қателер матрицасы','Матрица ошибок на всём тесте','Confusion matrix for the full test set')}</summary>
      <p>${t('Жол — нақты класс, баған — болжам. Диагональ — дұрыс жауаптар. Матрица соңғы эпоханың моделіне тиесілі.','Строка — истинный класс, столбец — прогноз. Диагональ — правильные ответы. Матрица относится к последней эпохе.','Rows are actual classes and columns are predictions. The diagonal contains correct answers. The matrix belongs to the final-epoch model.')}</p>
      <div class="week11-table-wrap"><table class="week11-table"><thead><tr><th>↓ / →</th>${Array.from({length:10},(_,i)=>`<th>${i}</th>`).join('')}</tr></thead><tbody>${m.matrix.map((row,i)=>`<tr><th scope="row">${i} · ${className(i)}</th>${row.map((n,j)=>`<td class="${i===j?'cnn-diagonal':''}">${n}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p>${t('Жиі қателер','Частые ошибки','Frequent mistakes')}: ${m.top.slice(0,3).map(row=>className(row.actual)+' → '+className(row.prediction)+' ('+row.count+')').join(', ')}</p></details>`;
    paint($('predictionImage'),s.pixels);
  }
  function comparison(){
    return `<div class="week11-table-wrap"><table class="week11-table"><thead><tr><th>${t('Модель','Модель','Model')}</th><th>${labels.epoch}</th><th>Test accuracy</th><th>Loss</th><th>${t('Параметр','Параметры','Parameters')}</th></tr></thead><tbody>${measured.models.map(m=>`<tr><td>${m.name}</td><td>${m.epochs}</td><td>${pct(m.accuracy)}</td><td>${m.loss.toFixed(4)}</td><td>${fmt(m.parameters)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function defense(){
    return `<div class="topic-lab-defense"><section><h3>Ақылбек · 1–5</h3><p>${pages[1].show}</p><p>${pages[2].show}</p><p>${pages[4].show}</p></section><section><h3>Алмас · 6–7</h3><p>${pages[5].show}</p><p>${pages[6].show}</p></section><details><summary>Conv2D ≠ Dense?</summary><p>${t('Conv2D бір шағын сүзгіні бүкіл суретке ортақ қолданады. Dense әр кіріске жеке салмақ береді.','Conv2D использует общий фильтр по всему изображению, Dense — отдельные веса для входов.','Conv2D shares a small filter across the image; Dense uses separate input weights.')}</p></details><details><summary>Pooling?</summary><p>${pages[4].explain}</p></details><details><summary>Train / Validation / Test?</summary><p>${t('Train үйретеді, validation салыстырады, test тәуелсіз баға береді.','Train обучает, validation сравнивает, test даёт независимую оценку.','Train learns, validation compares, test gives a held-out evaluation.')}</p></details></div>${comparison()}<p class="week11-insight">${t('MNIST модельдері бірдей бөлініспен, бірақ әртүрлі эпоха санымен оқытылды.','Модели MNIST используют одно разбиение, но разное число эпох.','The MNIST models use the same split but different numbers of epochs.')}</p>`;
  }
  async function codeInto(target,full=false){
    target.innerHTML=`<p class="week11-lead">${t('Үзінді notebook-та алдыңғы ұяшықтардан кейін орындалады.','Фрагмент выполняется после предыдущих ячеек notebook.','Run excerpts after preceding notebook cells.')}</p>${downloads()}<button type="button" class="topic-lab-button" disabled>${t('Көшіру','Копировать','Copy')}</button><span role="status"></span><pre class="topic-code"><code></code></pre>`;
    const code=target.querySelector('code'),button=target.querySelector('button'),status=target.querySelector('[role=status]'),sections=[...pages[active].sections];
    sourceRequest ||= fetch(sourceFile).then(r=>{if(!r.ok)throw Error();return r.text();}).catch(e=>{sourceRequest=undefined;throw e;});
    try{
      const source=await sourceRequest,parts=source.split(/^# %% ([a-z]+)[ \t]*\r?$/gm);
      code.textContent=full||!sections.length?source:sections.map(key=>'# %% '+key+parts[parts.indexOf(key)+1]).join('\n');
      button.disabled=false;button.onclick=async()=>{
        try{await navigator.clipboard.writeText(code.textContent);status.textContent=t('Көшірілді','Скопировано','Copied');}
        catch{const range=document.createRange();range.selectNodeContents(code);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Ctrl+C';}
      };
    }catch{status.textContent=t('Код жүктелмеді','Код не загрузился','Code failed to load');}
  }
  function showDialog(kind){
    stop();const page=pages[active],body=$('cnnDialogBody');
    $('cnnDialogTitle').textContent=labels[kind]+' · '+page.title;
    if(kind==='code')codeInto(body);
    else if(kind==='formulas')body.innerHTML=`<dl class="topic-lab-formulas"><div><dt>${page.formula}</dt><dd>${page.explain}</dd></div></dl>`;
    else body.innerHTML=`<div class="week11-explanation">${[page.lead,page.explain,page.show].map((p,i)=>panel([t('Не көріп тұрмыз?','Что показано?','What is shown?'),t('Неге осылай?','Почему так?','Why does it work?'),t('Қорғауда көрсет','Покажи на защите','Show during presentation')][i],'<p>'+p+'</p>')).join('')}</div>`;
    $('cnnDialog').showModal();
  }
  function stop(){clearInterval(timer);timer=undefined;if($('cnnPlay'))$('cnnPlay').textContent='▶ '+labels.play;}
  function nextFrame(reset=false){
    if([1,2,3].includes(active)){const count=drawConv();state.window=reset?0:(state.window+1)%count;drawConv();return state.window===count-1;}
    if(active===4){state.poolStep=reset?0:(state.poolStep+1)%4;drawPool();return state.poolStep===3;}
    if(active===6){const last=measured.models[state.model].epochs;state.epoch=reset?0:(state.epoch+1)%(last+1);$('epoch').value=state.epoch;drawTraining();return state.epoch===last;}
  }
  main.addEventListener('input',event=>{
    const id=event.target.id;stop();
    if(id==='edgeDirection')state.filter=event.target.value;
    if(id==='operation')state.flip=event.target.value==='true';
    if(id==='padding')state.padding=Number(event.target.value);
    if(id==='relu'||id==='inverse')state[id]=event.target.checked;
    if(id==='channel'){state.channel=Number(event.target.value);drawMaps();return;}
    if(id==='model'){state.model=Number(event.target.value);state.sample=0;state.epoch=0;render();return;}
    if(id==='sample')state.sample=Number(event.target.value);
    if(id==='epoch')state.epoch=Number(event.target.value);
    if([1,2,3].includes(active)){state.window=0;drawConv();}
    if(active===4)drawPool();if(active===6)drawTraining();
  });
  main.addEventListener('click',event=>{
    const reference=event.target.closest('[data-dialog]');if(reference){showDialog(reference.dataset.dialog);return;}
    if(event.target.id==='cnnStep'){stop();nextFrame();}
    if(event.target.id==='cnnReset'){stop();nextFrame(true);}
    if(event.target.id==='cnnPlay'){
      if(timer){stop();return;}nextFrame(true);$('cnnPlay').textContent='Ⅱ '+t('Кідірту','Пауза','Pause');
      timer=setInterval(()=>{if(nextFrame())stop();},active===6?800:420);
    }
  });
  const loading=()=>`<p role="status">${t('Модель нәтижелері жүктелуде…','Загружаются результаты моделей…','Loading model results…')}</p>`;
  function render(){
    stop();active=Math.max(0,pages.findIndex(p=>'#'+p.id===location.hash));
    const page=pages[active],head=`<div class="topic-lab-heading"><div><p class="topic-lab-kicker">12 / ${String(active+1).padStart(2,'0')}</p><h1 tabindex="-1">${page.title}</h1><p class="week11-lead">${page.lead}</p></div></div>${toolbar()}`;
    let body;
    if(active===0)body=overview();
    if([1,2,3].includes(active))body=head+`<div class="week11-controls">${convControls()}</div>${buttons()}<div id="cnnCalculation"></div>`;
    if(active===4)body=head+`${buttons()}<div id="cnnCalculation"></div>`;
    if(active===5)body=head+(measured?mapsPage():loading());
    if(active===6)body=head+(measured?trainingPage():loading());
    if(active===7)body=head+(measured?defense():loading());
    if(active===8)body=head+`<p class="week11-insight">${page.explain}</p><div id="cnnFullCode"></div>`;
    main.innerHTML=body;
    if(active===0)$('cnnHero').innerHTML=grid(core.image,{active:(r,c)=>r<3&&c<3,heat:true});
    if([1,2,3].includes(active))drawConv();if(active===4)drawPool();if(active===5&&measured)drawMaps();if(active===6&&measured)drawTraining();if(active===8)codeInto($('cnnFullCode'),true);
    document.querySelectorAll('#cnnRail nav a').forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
    $('cnnCrumb').textContent=page.title;$('cnnProgress').textContent=String(active+1).padStart(2,'0')+' / '+pages.length;
    $('cnnPrev').hidden=active===0;$('cnnPrev').href='#'+pages[Math.max(0,active-1)].id;
    $('cnnNext').href=active===pages.length-1?back:'#'+pages[active+1].id;$('cnnNext').textContent=(active===pages.length-1?t('Тақырыптар','Темы','Topics'):labels.next)+' →';
    window.scrollTo({top:0,behavior:'instant'});
  }
  $('cnnRail').innerHTML=`<a class="topic-lab-brand" href="${back}">ML<span>LAB</span></a><p class="topic-lab-topic">12 · CNN LAB</p><nav aria-label="CNN">${pages.map((p,i)=>`<a href="#${p.id}"><span>${String(i+1).padStart(2,'0')}</span>${p.title}</a>`).join('')}</nav><a class="topic-lab-return" href="week12-files/cnn-akylbek-almas.ipynb" download>↓ Colab notebook</a>`;
  $('cnnHeader').innerHTML=`<span class="topic-lab-crumb" id="cnnCrumb"></span><button type="button" class="topic-lab-button" id="labNotes">${labels.explanation} ↗</button>`;
  $('cnnFooter').innerHTML=`<div class="topic-lab-progress" id="cnnProgress"></div><div class="topic-lab-actions"><a class="topic-lab-button" id="cnnPrev">← ${t('Артқа','Назад','Back')}</a><a class="topic-lab-button primary" id="cnnNext"></a></div>`;
  $('cnnDialog').innerHTML=`<div class="topic-lab-heading"><h2 id="cnnDialogTitle"></h2><form method="dialog"><button class="topic-lab-button">${t('Жабу','Закрыть','Close')}</button></form></div><div id="cnnDialogBody"></div>`;
  $('labNotes').onclick=()=>showDialog('explanation');window.addEventListener('hashchange',render);render();
  fetch('week12-files/cnn-results.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{measured=data;if([3,5,6,7].includes(active))render();}).catch(()=>{if([5,6,7].includes(active))main.innerHTML+=`<p role="alert">${t('Нәтиже жүктелмеді. Бетті жаңарт.','Результаты не загрузились. Обнови страницу.','Results could not load. Refresh the page.')}</p>`;});
})();
