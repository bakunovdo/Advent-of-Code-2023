/** Drop a trailing newline and accept both LF and CRLF. */
export const lines = (input) => {
  const normalized = input.replace(/\r\n/g, "\n").replace(/\n$/, "");
  if (normalized === "") return [];
  return normalized.split("\n");
};

/** Every integer in the text, including negatives. */
export const ints = (text) => [...text.matchAll(/-?\d+/g)].map((match) => Number(match[0]));

/** Split a puzzle into blank-line groups. Each group is its own list of lines. */
export const blocks = (input) => {
  const normalized = input.replace(/\r\n/g, "\n").trim();
  if (normalized === "") return [];
  return normalized.split(/\n\n+/).map((block) => block.split("\n"));
};

/** Character matrix. Rows may differ in length. */
export const grid = (input) => lines(input).map((line) => [...line]);

/** Transpose a rectangular list of rows. Rows may be arrays or strings. */
export const columns = (rows) => {
  if (rows.length === 0) return [];
  return [...rows[0]].map((_, index) => rows.map((row) => row[index]));
};

export const zip = (...arrays) => {
  const length = Math.min(...arrays.map((array) => array.length));
  return Array.from({ length }, (_, index) => arrays.map((array) => array[index]));
};

/** Counts keyed by the original value, so numbers stay numbers. */
export const frequency = (values) => {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
};

export const sum = (values) => values.reduce((total, value) => total + value, 0);

export const sortAsc = (a, b) => a - b;
export const sortDesc = (a, b) => b - a;
