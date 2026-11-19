(() => {
  'use strict';
  const image = [[3,0,1,2,7,4],[1,5,8,9,3,1],[2,7,2,5,1,3],[0,1,3,1,7,8],[4,2,1,6,2,8],[2,4,5,2,3,9]];
  const kernels = {
    vertical: [[1,0,-1],[1,0,-1],[1,0,-1]],
    sobelX: [[1,0,-1],[2,0,-2],[1,0,-1]],
    sobelY: [[1,2,1],[0,0,0],[-1,-2,-1]]
  };
  const pooling = [[1,4,2,3],[3,2,8,1],[0,5,7,2],[6,1,4,9]];
  function scan(input, kernel, padding = 0, stride = 1, flip = false) {
    const size = input.length + 2 * padding;
    const padded = Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => input[r-padding]?.[c-padding] ?? 0));
    const filter = flip ? kernel.map(row => [...row].reverse()).reverse() : kernel;
    const count = Math.floor((size-filter.length)/stride)+1;
    const windows = [];
    const result = Array.from({ length: count }, (_, r) => Array.from({ length: count }, (_, c) => {
      const products = filter.map((row, u) => row.map((weight,v) => padded[r*stride+u][c*stride+v] * weight));
      const value = products.flat().reduce((sum, n) => sum+n,0);
      windows.push({ row:r, col:c, top:r*stride, left:c*stride, products, value });
      return value;
    }));
    return { padded, filter, result, windows };
  }
  function pool(input) {
    return Array.from({length:Math.floor(input.length/2)},(_,r) => Array.from({length:Math.floor(input[0].length/2)},(_,c) => {
      const values=[input[r*2][c*2],input[r*2][c*2+1],input[r*2+1][c*2],input[r*2+1][c*2+1]];
      return Math.max(...values);
    }));
  }
  window.CNN_LAB = { image, kernels, pooling, scan, pool };
})();
