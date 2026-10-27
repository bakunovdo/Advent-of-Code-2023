/**
 * --- Advent of Code 2024 ---
 *
 * Day 1: Historian Hysteria
 * (Part 2)
 *
 * https://adventofcode.com/2024/day/1#part2
 */

import fs from "fs";

function readFile(name) {
  return fs.readFileSync(new URL(name, import.meta.url), { encoding: "utf-8" });
}

const taskInput = readFile("input.txt");
const exampleInput = readFile("example.txt");

/**
 * @param {String} input
 */
function main(input) {
  const left = [];
  const counts = new Map();

  for (const line of input.trim().split("\n")) {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    left.push(a);
    counts.set(b, (counts.get(b) ?? 0) + 1);
  }

  return left.reduce((sum, value) => sum + value * (counts.get(value) ?? 0), 0);
}

console.log(main(taskInput));
