/**
 * --- Advent of Code 2023 ---
 *
 * Day 4: Scratchcards
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/4
 */

const fs = require("fs");
const path = require("path");
const lodash = require("lodash-es");

const taskInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
const exampleInput = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

function main(input) {
  const lines = input.split("\r\n");

  let total = 0;
  for (const line of lines) {
    const [winner, hand] = line
      .replace(/Card\s+\d+:/, "")
      .split("|")
      .map(lodash.trim);

    const set = new Set(winner.split(" ").filter(Boolean).map(lodash.trim));

    let acc = 0;
    for (const n of hand.split(" ")) {
      if (set.has(n)) {
        acc = acc === 0 ? 1 : acc * 2;
      }
    }
    total += acc;
  }

  return total;
}

console.log(main(taskInput));
