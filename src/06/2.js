/**
 * --- Advent of Code 2023 ---
 *
 * Day 6: Wait For It
 * (Part 2)
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
 * One long race
 * @param {String} input
 */
function main(input) {
  const lines = input.split("\r\n");

  const time = +lines[0].match(/\d+/g).join("");
  const distance = +lines[1].match(/\d+/g).join("");

  let counts = 0;

  for (let hold = 0; hold < time; hold += 1) {
    const reached = (time - hold) * hold;
    if (reached > distance) counts += 1;
  }

  return counts;
}

console.log(main(taskInput));
