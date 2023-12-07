/**
 * --- Advent of Code 2023 ---
 *
 * Day 6: TBD
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/6
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
function main(input) {}

console.log(main(exampleInput));
