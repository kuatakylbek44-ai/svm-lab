/* Exact inference from exported sklearn SVC parameters. */
(() => {
  function kernel(a,b,m) {
    if(m.kernel==='rbf'){let q=0;for(let i=0;i<a.length;i++)q+=(a[i]-b[i])**2;return Math.exp(-m.gamma*q);}
    let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];
    return m.kernel==='poly' ? (m.gamma*s+m.coef0)**m.degree : s;
  }
  function decision(m,x){let s=m.intercept[0];for(let i=0;i<m.sv.length;i++)s+=m.dual[0][i]*kernel(x,m.sv[i],m);return s;}
  function predictIris(iris,raw){
    const m=iris.model,x=raw.map((v,i)=>(v-iris.mean[i])/iris.scale[i]);
    const kval=m.sv.map(v=>kernel(x,v,m)),start=[0,m.n[0],m.n[0]+m.n[1]],votes=[0,0,0],scores=[];
    let p=0;
    for(let i=0;i<3;i++)for(let j=i+1;j<3;j++){
      let s=m.intercept[p++];
      for(let k=0;k<m.n[i];k++)s+=m.dual[j-1][start[i]+k]*kval[start[i]+k];
      for(let k=0;k<m.n[j];k++)s+=m.dual[i][start[j]+k]*kval[start[j]+k];
      votes[s>0?i:j]++;scores.push(s);
    }
    return {label:votes.indexOf(Math.max(...votes)),votes,scores};
  }
  globalThis.SVM={kernel,decision,predictIris};
  if(typeof module!=='undefined')module.exports=globalThis.SVM;
})();
