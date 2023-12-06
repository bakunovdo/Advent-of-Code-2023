const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
// const file = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

const convertToAbbreviation = (s) => {
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

const getNumbers = (str) => {
  const splited = str.match(/\d/g) ?? [];
  const start = splited[0];
  const end = splited[splited.length - 1];
  return parseInt(start + end);
};

const values = file.split("\r\n");
let sum = 0;

for (let line of values) {
  const abbreviatedLine = convertToAbbreviation(line);
  const extractedAbbreviatedNumber = getNumbers(abbreviatedLine);

  sum += extractedAbbreviatedNumber;
}

console.log(sum);
