const path = require("path");

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" });
// const file = fs.readFileSync(path.resolve(__dirname, "example.txt"), { encoding: "utf-8" });

const values = file.split("\r\n");

const sum = (acc, s) => acc + s;

const dirs = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const mapNByLine = {};

values.forEach((_, id) => (mapNByLine[id] = {}));

const numbers = [];
for (let i = 0; i < values.length; i++) {
  const line = values[i].split("");

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char.match(/[^.^\d^\s]/)) {
      // Get siblings number
      console.log(char);

      dirs.forEach(([dx, dy]) => {
        const x = j + dx;
        const y = i + dy;

        if (x < line.length && x >= 0 && y < values.length && y >= 0) {
          const sibl = values[y][x];
          console.log(sibl);
          if (Number.isFinite(parseInt(sibl))) {
            let start = [];
            let end = [];

            //Go to start
            let tx = x - 1;
            let inspected = values[y][tx];
            while (Number.isFinite(parseInt(inspected))) {
              start.unshift(inspected);
              tx--;
              inspected = values[y][tx];
            }

            //Go to end
            tx = x + 1;
            inspected = values[y][tx];
            while (Number.isFinite(parseInt(inspected))) {
              end.push(inspected);
              tx++;
              inspected = values[y][tx];
            }

            let number = Number([...start, values[y][x], ...end].join(""));
            if (!mapNByLine[y][tx - 1]) {
              mapNByLine[y][tx - 1] = true;
              numbers.push(number);
            }
          }
        }
      });
    }
  }
}
console.log(mapNByLine);
console.log(numbers);

console.log(numbers.reduce(sum, 0));
