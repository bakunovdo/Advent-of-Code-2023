/**
 * --- Advent of Code 2023 ---
 *
 * Day 7: Camel Cards
 * (Part 2)
 *
 * https://adventofcode.com/2023/day/7
 */

import fs from "fs";
import { frequency, sortDesc } from "../../lib/array.js";

function readFile(name) {
  return fs.readFileSync(new URL(name, import.meta.url), { encoding: "utf-8" });
}

const taskInput = readFile("input.txt");
const exampleInput = readFile("example.txt");

function cleverSort(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return b[i] - a[i];
    }
  }
  return 0;
}

/**
 * @param {String} input
 */
function main(input) {
  return input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([hand, bid]) => ({ sort: getHash(hand), bid: Number(bid) }))
    .sort((a, b) => cleverSort(b.sort, a.sort))
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((acc, v) => acc + v, 0);
}

function getHash(cardsString) {
  const STRENGTH = "J23456789TQKA";
  const cards = cardsString.split("").map((card) => STRENGTH.indexOf(card));
  const frequencies = frequency(cards);

  const jokers = frequencies["0"];
  delete frequencies["0"];

  const handHash = Object.values(frequencies).sort(sortDesc);

  if (jokers) {
    handHash[0] ??= 0;
    handHash[0] += jokers;
  }

  return handHash.concat(cards);
}

console.log(main(taskInput));
