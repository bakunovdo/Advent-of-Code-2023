export const DIRS4 = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export const DIRS8 = [
  ...DIRS4,
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
];

export const pointKey = (x, y) => `${x},${y}`;

export const inBounds = (matrix, x, y) =>
  y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;

export const neighbors = (matrix, x, y, dirs = DIRS4) => {
  const cells = [];

  for (const [dx, dy] of dirs) {
    const nextX = x + dx;
    const nextY = y + dy;
    if (inBounds(matrix, nextX, nextY)) cells.push([nextX, nextY]);
  }

  return cells;
};

export const neighbors4 = (matrix, x, y) => neighbors(matrix, x, y, DIRS4);
export const neighbors8 = (matrix, x, y) => neighbors(matrix, x, y, DIRS8);
