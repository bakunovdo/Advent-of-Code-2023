import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync, readFileSync } from "fs";
import { relative, resolve } from "path";
import { Command, InvalidArgumentError } from "commander";

import { dateToTz } from "../internal/date.js";
import { safeWriteFile } from "../internal/files.js";
import { assertPuzzle, resolvePuzzle } from "../internal/args.js";
import { fail, muted, ok, path as paintPath, title } from "../internal/color.js";
import { getInputDay } from "../internal/fetch-input.js";
import { getPuzzlePage } from "../internal/fetch-example.js";

const HEADER_PATH = "./templates/header.js";
const STUB_PATH = "./templates/stub.js";

const hydrateTemplate = (template, props = {}) => {
  const propNames = (template.match(/\{\{[A-Z_]+?}}/g) ?? []).map((match) => match.slice(2, -2));
  const passedProps = Object.fromEntries(
    Object.entries(props).map(([key, val]) => [key.toUpperCase(), val])
  );

  let hydrated = template;

  for (const name of new Set(propNames)) {
    hydrated = hydrated.replaceAll(`{{${name}}}`, passedProps[name] ?? "");
  }

  return hydrated;
};

const currentAocYear = () => {
  const now = dateToTz("America/New_York");
  const seasonStarted = now.month === 12 || (now.month === 11 && now.day > 23);
  return seasonStarted ? now.year : now.year - 1;
};

const currentAocDay = () => {
  const now = dateToTz("America/New_York");
  if (now.month !== 12 || now.day < 1 || now.day > 25) return null;
  return now.day;
};

const integer = (raw) => {
  if (!/^\d+$/.test(raw)) throw new InvalidArgumentError(`expected a number, got "${raw}"`);
  return Number(raw);
};

const program = new Command();

program
  .name("generate")
  .description("Create a day folder with part stubs, the example, and your input.")
  .argument("[day]", "day 1-25, or a 4-digit year when it comes first", integer)
  .argument("[year]", "puzzle year", integer)
  .option("-d, --day <day>", "puzzle day", integer)
  .option("-y, --year <year>", "puzzle year; defaults to the current Advent season", integer)
  .option("-f, --force", "refresh input.txt and example.txt")
  .addHelpText(
    "after",
    `
Examples:
  npm run generate -- 9
  npm run generate -- 1 2024
  npm run generate -- 2024 1

During December, omitting the day uses today's puzzle.
Existing solution files are kept. An empty download is an error and is not written.
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
    positionals: program.processedArgs,
  });
} catch (error) {
  console.error(fail(error.message));
  process.exit(1);
}
const year = puzzle.year ?? currentAocYear();
const day = puzzle.day === undefined ? currentAocDay() : puzzle.day;

if (puzzle.day === undefined && day === null) {
  program.help({ error: true });
}

const isBlank = (file) => !existsSync(file) || readFileSync(file, "utf8").trim() === "";

const show = (file) => paintPath(relative(process.cwd(), file));

const reportFile = (verb, file) => {
  const label = verb === "write" ? ok("write") : muted("skip ");
  console.log(`${label}  ${show(file)}`);
};

const writeText = async (file, content) => {
  await writeFile(file, content);
  reportFile("write", file);
};

try {
  assertPuzzle(day, year);

  const dir = resolve(process.cwd(), "src", String(year), String(day).padStart(2, "0"));
  await mkdir(dir, { recursive: true });

  const part1Path = resolve(dir, "1.js");
  const part2Path = resolve(dir, "2.js");
  const inputPath = resolve(dir, "input.txt");
  const examplePath = resolve(dir, "example.txt");

  const needParts = !existsSync(part1Path) || !existsSync(part2Path);
  const needExample = options.force || isBlank(examplePath);
  const needInput = options.force || isBlank(inputPath);

  const page = needParts || needExample ? await getPuzzlePage(day, year) : null;

  let input;
  let inputError;
  if (needInput) {
    try {
      input = await getInputDay(day, year);
    } catch (error) {
      inputError = error;
    }
  }

  const [header, stub] = await Promise.all([
    readFile(resolve(process.cwd(), HEADER_PATH), "utf8"),
    readFile(resolve(process.cwd(), STUB_PATH), "utf8"),
  ]);

  const partSource = (subtitle, suffix = "") =>
    `${hydrateTemplate(header, {
      day,
      year,
      name: page?.name ?? "TBD",
      subtitle,
      suffix,
    })}\n${stub}`;

  const createdPart1 = await safeWriteFile(part1Path, partSource("(Part 1)"));
  const createdPart2 = await safeWriteFile(part2Path, partSource("(Part 2)", "#part2"));
  reportFile(createdPart1 ? "write" : "skip", part1Path);
  reportFile(createdPart2 ? "write" : "skip", part2Path);

  if (needExample) await writeText(examplePath, `${page.example}\n`);
  else reportFile("skip", examplePath);

  if (needInput && !inputError) await writeText(inputPath, input);
  else if (!needInput) reportFile("skip", inputPath);

  if (inputError) throw inputError;

  console.log(title(`ready src/${year}/${String(day).padStart(2, "0")}`));
} catch (error) {
  console.error(fail(error.message));
  process.exit(1);
}
