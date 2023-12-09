/**
 * Iterates over a 2D array, calling an iteratee function on each item.
 *
 * This eachFn will be called with three parameters:
 *   - each item
 *   - that item's X/Y coordinates
 *   - the matrix itself
 *
 * @param {Array<Array>} matrix - the 2D array to iterate over
 * @param {function} eachFn - the iteratee function
 */
export const eachMatrix = (matrix, eachFn) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      eachFn(matrix[y][x], [x, y], matrix);
    }
  }
};

/**
 * Create frequency by element in array.
 *
 * @param {Array} array
 */
export const frequency = (array) => {
  const freq = {};

  array.forEach((card) => {
    freq[card] = (freq[card] || 0) + 1;
  });

  return freq;
};

export const sortDesc = (a, b) => b - a;
export const sortAsc = (a, b) => a - b;
export const rSum = (acc, value) => acc + value;
export const rProduct = (acc, value) => acc * value;
