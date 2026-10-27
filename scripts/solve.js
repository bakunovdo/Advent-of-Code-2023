import { existsSync } from "fs";
import { performance } from "node:perf_hooks";
import { relative, resolve } from "path";
import { pathToFileURL } from "node:url";
import { Command, InvalidArgumentError } from "commander";

import { dateToTz } from "../internal/date.js";
import { assertPart, assertPuzzle, resolvePuzzle } from "../internal/args.js";
import { fail, muted, path as paintPath, title } from "../internal/color.js";
import { load } from "../tools/load.js";
import { printExample, printInput, printInputEmpty } from "../internal/report.js";

const currentAocYear = () => {
  const now = dateToTz("America/New_York");
  const seasonStarted = now.month === 12 || (now.month === 11 && now.day > 23);
  return seasonStarted ? now.year : now.year - 1;
};

const integer = (raw) => {
  if (!/^\d+$/.test(raw)) throw new InvalidArgumentError(`expected a number, got "${raw}"`);
  return Number(raw);
};

const program = new Command();

program
  .name("solve")
  .description("Run one day and check the example when exampleAnswer is exported.")
  .argument("[day]", "day 1-25, or a 4-digit year when it comes first", integer)
  .argument("[year]", "year, or part 1/2 when the year is omitted", integer)
  .argument("[part]", "part 1 or 2", integer)
  .option("-d, --day <day>", "puzzle day", integer)
  .option("-y, --year <year>", "puzzle year; defaults to the current Advent season", integer)
  .option("-p, --part <part>", "run only this part", integer)
  .addHelpText(
    "after",
    `
Examples:
  npm run solve -- 2
  npm run solve -- 2 2024
  npm run solve -- 2024 2 1

Set export const exampleAnswer in the solution to check the example.
Older scripts that print on import still run.
`
  )
  .configureOutput({
    outputError: (message, write) => write(fail(message)),
  })
  .showHelpAfterError()
  .parse();

const options = program.opts();

let puzzle;
try {
  puzzle = resolvePuzzle({
    day: options.day,
    year: options.year,
    part: options.part,
    positionals: program.processedArgs,
    allowPart: true,
  });
} catch (error) {
  console.error(fail(error.message));
  process.exit(1);
}
const year = puzzle.year ?? currentAocYear();
const day = puzzle.day;

if (day === undefined) {
  program.help({ error: true });
}

try {
  assertPuzzle(day, year);
  assertPart(puzzle.part);
} catch (error) {
  console.error(fail(error.message));
  process.exit(1);
}

const dir = resolve(process.cwd(), "src", String(year), String(day).padStart(2, "0"));
const parts = puzzle.part === undefined ? [1, 2] : [puzzle.part];
let ok = true;

const runModule = async (file) => {
  const href = pathToFileURL(file).href;
  const mod = await import(href);

  if (typeof mod.main !== "function") {
    console.log(muted("  legacy script, printed on import"));
    return true;
  }

  const { example, input } = load(href);
  const matched = printExample(mod.main(example), mod.exampleAnswer);

  if (!input.trim()) {
    printInputEmpty();
    return matched;
  }

  const started = performance.now();
  const answer = mod.main(input);
  const elapsed = (performance.now() - started).toFixed(1);
  printInput(answer, elapsed);
  return matched;
};

for (const part of parts) {
  const file = resolve(dir, `${part}.js`);
  console.log(title(`${year}/${String(day).padStart(2, "0")} part ${part}`));

  if (!existsSync(file)) {
    console.log(`  ${fail("missing")}  ${paintPath(relative(process.cwd(), file))}`);
    ok = false;
    continue;
  }

  try {
    const partOk = await runModule(file);
    ok &&= partOk;
  } catch (error) {
    console.error(`  ${fail(error.message)}`);
    ok = false;
  }
}

process.exit(ok ? 0 : 1);
