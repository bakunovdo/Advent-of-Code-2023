const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
// const file = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

const numberMapping = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

/**
 * @param {String} str
 */
function convertStringToNumbers(s) {
  const numberMapping = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return s.replace(
    /one|two|three|four|five|six|seven|eight|nine/g,
    (match) => numberMapping[match] || match
  );
}

/**
 * @param {String} str
 */
const convert2 = (s) => {
  return s
    .replaceAll("one", "o1e")
    .replaceAll("two", "t2o")
    .replaceAll("three", "t3e")
    .replaceAll("four", "f4r")
    .replaceAll("five", "f5e")
    .replaceAll("six", "s6x")
    .replaceAll("seven", "s7n")
    .replaceAll("eight", "e8t")
    .replaceAll("nine", "n9e");
};

// replaceStringNumberToRealNumbers("eightwothree");

/**
 * @param {String} str
 */
const getNumbers = (str) => {
  const splited = str.match(/\d/g) ?? [];
  const start = splited[0];
  const end = splited[splited.length - 1];
  return parseInt(start + end);
};

const values = file.split("\r\n");
// const values = ["8sixthreetwonez"];
let sum = 0;
for (let line of values) {
  const r = convertStringToNumbers(line);
  const n = getNumbers(r);
  const r2 = convert2(line);
  const n2 = getNumbers(r2);

  console.log(n, n2);

  if (n !== n2) {
    console.log(line, r, r2);
  }

  console.log(line, r, n);
  sum = n2 + sum;
}

// const sum = file.split("\r\n").map(replaceStringNumberToRealNumbers).map(getNumbers);
// const txt = file.split("\r\n").map(replaceStringNumberToRealNumbers);
// .reduce((acc, v) => acc + v);

// getNumbers("ckd3fourtwo5vzv");
// getNumbers("asd1aasd");
// console.log(txt);
console.log(sum);
