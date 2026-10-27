const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
// const file = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

const matrix = file.split("\r\n");

const sum = (acc, s) => acc + s;
const isDigit = (char) => /[0-9]/.test(char);
const isGear = (char) => char === "*";

const dirs = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const extractPartNumber = (schematics, [x, y]) => {
  let number = "";
  let pos = x;

  while (isDigit(schematics[y][pos])) {
    pos -= 1;
  }

  // pos will end up one too small
  pos += 1;

  while (isDigit(schematics[y][pos])) {
    number += schematics[y][pos];
    const line = schematics[y];
    // Prevent counting numbers twice
    schematics[y] = setCharAt(line, pos, "X");
    pos += 1;
  }

  return Number(number);
};

let ratio = 0;
for (let i = 0; i < matrix.length; i++) {
  const line = matrix[i].split("");
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (isGear(char)) {
      const parts = [];

      dirs.forEach(([dx, dy]) => {
        const x = j + dx;
        const y = i + dy;

        if (x < line.length && x >= 0 && y < matrix.length && y >= 0) {
          if (isDigit(matrix[y][x])) {
            parts.push(extractPartNumber(matrix, [x, y]));
          }
        }
      });

      if (parts.length === 2) {
        ratio = ratio + parts[0] * parts[1];
      }
    }
  }
}

console.log(ratio);
// 3166049
// 1500782
