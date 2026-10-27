/**
 * Breadth-first search over whatever node type `start` uses.
 * `neighbors` returns the nodes one step away. The first visit is the shortest path.
 *
 * @template T
 * @param {T} start
 * @param {(node: T) => Iterable<T>} neighbors
 */
export const bfs = (start, neighbors) => {
  const distance = new Map([[start, 0]]);
  const parent = new Map([[start, null]]);
  const queue = [start];

  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];

    for (const next of neighbors(current)) {
      if (distance.has(next)) continue;
      distance.set(next, distance.get(current) + 1);
      parent.set(next, current);
      queue.push(next);
    }
  }

  const path = (goal) => {
    if (!parent.has(goal)) return null;

    const steps = [];
    for (let node = goal; node != null; node = parent.get(node)) steps.push(node);
    steps.reverse();
    return steps;
  };

  return { distance, parent, path };
};
