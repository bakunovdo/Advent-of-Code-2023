import { hasProp } from "./object";

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
