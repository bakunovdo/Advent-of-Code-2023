/**
 * --- Advent of Code 2024 ---
 *
 * Day 1: Historian Hysteria
 * (Part 1)
 *
 * https://adventofcode.com/2024/day/1
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
  const right = [];

  for (const line of input.trim().split("\n")) {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    left.push(a);
    right.push(b);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return left.reduce((sum, value, i) => sum + Math.abs(value - right[i]), 0);
}

console.log(main(taskInput));
