/**
 * --- Advent of Code 2023 ---
 *
 * Day 5: If You Give A Seed A Fertilizer
 * (Part 1)
 *
 * https://adventofcode.com/2023/day/5
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
  const seeds = input
    .match(/seeds: [\d ]+/gi)[0]
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  const [_seedLine, ...mapLines] = input.split("\r\n").filter(Boolean);

  const maps = {};

  let i = -1;
  for (const line of mapLines) {
    if (line.includes("map")) {
      i++;
      maps[i] = [];
    } else {
      maps[i].push(line);
    }
  }

  const locations = [];

  for (const seed of seeds) {
    let target = seed;

    for (let i = 0; i < Object.keys(maps).length; i++) {
      const variants = maps[i];
      let isChanged = false;

      for (let j = 0; j < variants.length; j++) {
        const [dest, source, range] = variants[j].split(" ").map(Number);
        if (target >= source && target < source + range && !isChanged) {
          const newTarget = target - source + dest;
          target = newTarget;
          isChanged = true;
        }
      }
    }

    locations.push(target);
  }

  return Math.min(...locations);
}

console.log(main(taskInput));
