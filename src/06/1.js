/**
 * --- Advent of Code 2023 ---
 *
 * Day 6: Wait For It
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/6
 */

import fs from "fs";
import { zip, reduce, multiply } from "lodash-es";

function readFile(name) {
  return fs.readFileSync(new URL(name, import.meta.url), { encoding: "utf-8" });
}

const taskInput = readFile("input.txt");
const exampleInput = readFile("example.txt");

/**
 * @param {String} input
 */
function main(input) {
  const lines = input.split("\r\n");

  const allTimes = lines[0].match(/\d+/g).map(Number);
  const allDistances = lines[1].match(/\d+/g).map(Number);

  const races = zip(allTimes, allDistances);

  const wins = races.map(([time, distance]) => {
    let count = 0;

    for (let hold = 0; hold < time; hold += 1) {
      const reached = (time - hold) * hold;
      if (reached > distance) count += 1;
    }

    return count;
  });

  return reduce(wins, multiply);
}

console.log(main(taskInput));
