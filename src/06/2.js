/**
 * --- Advent of Code 2023 ---
 *
 * Day 6: Wait For It
 * (Part 2)
 *
 * https://adventofcode.com/2023/day/6
 */

import fs from "fs";
import { zip } from "lodash-es";

function readFile(name) {
  return fs.readFileSync(new URL(name, import.meta.url), { encoding: "utf-8" });
}

const taskInput = readFile("input.txt");
const exampleInput = readFile("example.txt");

/**
 * One long race
 * @param {String} input
 */
function main(input) {
  const lines = input.split("\r\n");

  const allTimes = +lines[0].match(/\d+/g).join("");
  const allDistances = +lines[1].match(/\d+/g).join("");

  let product = 1;
  let counts = 0;

  for (let i = 0; i <= allTimes; i++) {
    const held = i;
    const speed = held;
    const way = (allTimes - held) * speed;
    if (way > allDistances) {
      counts++;
    }
  }
  product *= counts;

  return product;
}

console.log(main(taskInput));
