/* Exact inference from exported sklearn SVC parameters. */
(() => {
  function kernel(a,b,m) {
    if(m.kernel==='rbf'){let q=0;for(let i=0;i<a.length;i++)q+=(a[i]-b[i])**2;return Math.exp(-m.gamma*q);}
    let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];
    return m.kernel==='poly' ? (m.gamma*s+m.coef0)**m.degree : s;
  }
  function decision(m,x){let s=m.intercept[0];for(let i=0;i<m.sv.length;i++)s+=m.dual[0][i]*kernel(x,m.sv[i],m);return s;}
  function predict(m,x){
    const size=m.classes.length;
    if(size===2){const s=decision(m,x),label=s>0?1:0;return {label,votes:label?[0,1]:[1,0],scores:[s]};}
    const kval=m.sv.map(v=>kernel(x,v,m)),start=[0],votes=Array(size).fill(0),scores=[];
    for(let i=1;i<size;i++)start.push(start[i-1]+m.n[i-1]);
    let p=0;
    for(let i=0;i<size;i++)for(let j=i+1;j<size;j++){
      let s=m.intercept[p++];
      for(let k=0;k<m.n[i];k++)s+=m.dual[j-1][start[i]+k]*kval[start[i]+k];
      for(let k=0;k<m.n[j];k++)s+=m.dual[i][start[j]+k]*kval[start[j]+k];
      votes[s>0?i:j]++;scores.push(s);
    }
    return {label:votes.indexOf(Math.max(...votes)),votes,scores};
  }
  function predictIris(iris,raw){
    return predict(iris.model,raw.map((v,i)=>(v-iris.mean[i])/iris.scale[i]));
  }
  globalThis.SVM={kernel,decision,predict,predictIris};
  if(typeof module!=='undefined')module.exports=globalThis.SVM;
})();
