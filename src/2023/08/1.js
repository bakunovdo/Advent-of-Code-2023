/**
 * --- Advent of Code 2023 ---
 *
 * Day 8: Haunted Wasteland
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/8
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
  const [seq, _, ...maps] = input.split("\n");

  const omap = maps.filter(Boolean).reduce(
    (acc, line) => {
      const [_, key, l, r] = line.match(/(\w+) = \((\w+), (\w+)\)/);
      acc.L[key] = l;
      acc.R[key] = r;
      return acc;
    },
    { L: {}, R: {} }
  );

  let step = 0;
  let dir = seq[0];
  let cur = "AAA";

  while (cur !== "ZZZ") {
    cur = omap[dir][cur];
    step += 1;
    dir = seq[step % seq.length];
  }

  return step;
}

console.log(main(taskInput));
