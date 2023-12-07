/**
 * --- Advent of Code 2023 ---
 *
 * Day 4: Scratchcards
 * (Part 2)
 *
 * https://adventofcode.com/2023/day/4#part2
 */

const fs = require("fs");
const path = require("path");
const lodash = require("lodash-es");

const taskInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
const exampleInput = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

/**
 * @param {String} input
 */
function main(input) {
  const lines = input.split("\r\n");
  const copies = {};

  for (const line of lines) {
    const card = Number(line.match(/Card\s+(\d+):/)[1]);

    const [winner, hand] = line
      .replace(/Card\s+\d+:/, "")
      .split("|")
      .map(lodash.trim);

    const set = new Set(winner.split(" ").filter(Boolean).map(lodash.trim));

    let matches = 0;
    for (const n of hand.split(" ")) {
      matches += set.has(n) ? 1 : 0;
    }

    for (let i = card + 1; i <= card + matches; i++) {
      copies[i] = (copies[i] || 0) + 1 * copies[card];
      copies[i] = (copies[i] || 0) + 1;
    }
  }

  const sum = Object.values(copies).reduce((acc, s) => acc + s);
  return sum + lines.length;
}

console.log(main(exampleInput));
