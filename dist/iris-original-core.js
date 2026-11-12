(function(root) {
  'use strict';
  function softmax(values) {
    const max = Math.max(...values);
    const exps = values.map(v => Math.exp(v - max));
    const sum = exps.reduce((a,b) => a+b,0);
    return exps.map(v => v / sum);
  }
  function sigmoid(z) { return z >= 0 ? 1/(1+Math.exp(-z)) : Math.exp(z)/(1+Math.exp(z)); }
  function predict(model, row) {
    const logits = model.coef.map((weights,k) => weights.reduce((sum,w,i)=>sum+w*row[i],model.intercept[k]));
    const probabilities = softmax(logits);
    return {probabilities,label:probabilities.indexOf(Math.max(...probabilities))};
  }
  function confusion(actual, predicted, classes=3) {
    const result = Array.from({length:classes},()=>Array(classes).fill(0));
    actual.forEach((v,i)=>result[v][predicted[i]]++);
    return result;
  }
  root.IrisMath = {softmax,sigmoid,predict,confusion};
})(globalThis);
