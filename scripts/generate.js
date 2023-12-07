import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync, lstatSync } from "fs";
import { uniq } from "lodash-es";
import { resolve } from "path";

import { dateToTz } from "../lib/date.js";

const HEADER_PATH = "./templates/header.js";
const STUB_PATH = "./templates/stub.js";
const PART_1_NAME = "1.js";
const PART_2_NAME = "2.js";
const INPUT_NAME = "input.txt";
const EXAMPLE_NAME = "example.txt";

const hydrateTemplate = (template, props = {}) => {
  const propNames = template.match(/\{\{[A-Z]+?}}/g).map((match) => match.slice(2, -2));
  const passedProps = Object.fromEntries(
    Object.entries(props).map(([key, val]) => [key.toUpperCase(), val])
  );

  let hydrated = template;

  for (const name of uniq(propNames)) {
    hydrated = hydrated.replaceAll(`{{${name}}}`, passedProps[name] ?? "");
  }

  return hydrated;
};

const safeWriteFile = (path, content) => {
  try {
    if (!existsSync(path) && !existsSync(path)) {
      writeFile(path, content);
    }
  } catch (error) {
    console.error(error);
  }
};

const now = dateToTz("America/New_York");
const isStart = now.month === 11 && now.day > 23;
const isDecember = now.month === 12;

const day = process.argv[2];

const year = isStart || isDecember ? now.year : now.year - 1;

const headerBytes = await readFile(resolve(process.cwd(), HEADER_PATH));
const stubBytes = await readFile(resolve(process.cwd(), STUB_PATH));
const header = headerBytes.toString();
const stub = stubBytes.toString();

const part1Header = hydrateTemplate(header, {
  day,
  year,
  name: "TBD",
  subtitle: "(Part 1)",
});

const part2Header = hydrateTemplate(header, {
  day,
  year,
  name: "TBD",
  subtitle: "(Part 2)",
  suffix: "#part2",
});

const dirName = process.argv[2]?.padStart(2, "0") || "wip";

const dir = resolve(resolve(process.cwd(), "src"), dirName);

if (!lstatSync(dir).isDirectory()) {
  await mkdir(dir);
}

safeWriteFile(resolve(dir, PART_1_NAME), part1Header + "\n" + stub);
safeWriteFile(resolve(dir, PART_2_NAME), part2Header + "\n" + stub);
safeWriteFile(resolve(dir, INPUT_NAME), "");
safeWriteFile(resolve(dir, EXAMPLE_NAME), "");
