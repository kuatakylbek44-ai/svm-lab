(() => {
  'use strict';
  const round = value => Number(value.toFixed(3));
  const arc = Array.from({ length: 14 }, (_, i) => {
    const angle = Math.PI * i / 13;
    return [Math.cos(angle), Math.sin(angle)];
  });
  const points = [
    ...arc, ...arc.map(([x, y]) => [1 - x, .5 - y]),
    [-1.3, -.8], [2.4, 1.05], [.5, 1.55]
  ].map(point => point.map(round));
  const distances = points.map(([x, y]) => points.map(([a, b]) => Math.hypot(x - a, y - b)));
  const leaf = id => ({ id, members: [id], height: 0 });

  function hierarchy(linkage, groups) {
    const active = points.map((_, i) => leaf(i));
    const distance = (left, right) => {
      const values = left.members.flatMap(i => right.members.map(j => distances[i][j]));
      if (linkage === 'single') return Math.min(...values);
      if (linkage === 'complete') return Math.max(...values);
      return values.reduce((sum, value) => sum + value, 0) / values.length;
    };
    let cut;
    let last;
    while (active.length > 1) {
      if (active.length === groups) cut = [...active];
      let a = 0, b = 1, best = Infinity;
      active.forEach((left, i) => {
        for (let j = i + 1; j < active.length; j++) {
          const value = distance(left, active[j]);
          if (value < best) { a = i; b = j; best = value; }
        }
      });
      const left = active[a], right = active[b];
      last = { members: [...left.members, ...right.members], left, right, height: best };
      active.splice(b, 1);
      active.splice(a, 1, last);
    }
    const labels = [];
    (cut || active).forEach((node, group) => node.members.forEach(id => { labels[id] = group; }));
    return { tree: last, labels, cut: cut || active };
  }

  function density(eps, minPts) {
    const neighbors = distances.map(row => row.flatMap((distance, j) => distance <= eps + 1e-10 ? [j] : []));
    const core = neighbors.map(ids => ids.length >= minPts);
    const labels = points.map(() => -1);
    let clusters = 0;
    core.forEach((isCore, i) => {
      if (!isCore || labels[i] >= 0) return;
      const queue = [i];
      labels[i] = clusters;
      for (let next = 0; next < queue.length; next++) {
        for (const j of neighbors[queue[next]]) {
          if (labels[j] >= 0) continue;
          labels[j] = clusters;
          if (core[j]) queue.push(j);
        }
      }
      clusters++;
    });
    return { labels, neighbors, core, clusters, noise: labels.filter(label => label === -1).length };
  }

  window.SROJ11 = { points, hierarchy, density };
})();
