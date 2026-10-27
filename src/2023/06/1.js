/**
 * --- Advent of Code 2023 ---
 *
 * Day 6: Wait For It
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/6
 */

import fs from "fs";
import { ints, lines, zip } from "#tools";

function readFile(name) {
  return fs.readFileSync(new URL(name, import.meta.url), { encoding: "utf-8" });
}

const taskInput = readFile("input.txt");
const exampleInput = readFile("example.txt");

/**
 * @param {String} input
 */
function main(input) {
  const rows = lines(input);
  const races = zip(ints(rows[0]), ints(rows[1]));

  const wins = races.map(([time, distance]) => {
    let count = 0;

    for (let hold = 0; hold < time; hold += 1) {
      const reached = (time - hold) * hold;
      if (reached > distance) count += 1;
    }

    return count;
  });

  return wins.reduce((product, count) => product * count, 1);
}

console.log(main(taskInput));
