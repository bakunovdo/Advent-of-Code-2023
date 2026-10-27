const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
// const file = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

const values = file.split("\r\n");

const sum = (acc, v) => acc + v;

const maxMap = {
  r: 12,
  g: 13,
  b: 14,
};

/**
 * @param {String} round
 */
const validateRound = (round) => {
  for (let take of round.trim().split(",")) {
    const [count, color] = take.trim().split(" ");
    if (count > maxMap[color[0]]) {
      return false;
    }
  }
  return true;
};

/**
 * @param {String} line
 */
const mapPower = (line) => {
  const poss = {};
  const rounds = line
    .replace(/Game \d+:/, "")
    .trim()
    .split(";");

  for (let round of rounds) {
    const r = round.split(",");
    for (let take of round.split(",")) {
      const [count, color] = take.trim().replace(";", "").split(" ");
      console.log(count, color);
      poss[color] = Math.max(poss[color] ?? 0, count);
    }
  }

  return Object.values(poss).reduce((acc, v) => acc * v, 1);
};

console.log(mapPower(values[9]));

// 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
/**
 * @param {String} line
 */
const validate = (line) => {
  const [_, total] = line.split(":");
  // return validateRound(total);
  return total.split(";").every(validateRound);
};

const getGameId = (line) => {
  return Number(line.match(/Game (\d+):/i)[1]);
};

// const validLines = values.filter(validate);
// const ids = validLines.map(getGameId);
// const sumIds = ids.reduce(sum);
// console.log(validLines);
// console.log(ids);
// console.log(sumIds);

console.log(values.map(mapPower).reduce(sum));

// validate(values[1]);
// console.log(Array.from({length: 100}, (_, id) => id + 1).reduce(sum))
