import fs from "fs";
import { pathToFileURL } from "node:url";

import { printExample, printInput, printInputEmpty } from "./report.js";

const readSibling = (metaUrl, name, { required }) => {
  const url = new URL(name, metaUrl);
  if (!fs.existsSync(url)) {
    if (required) throw new Error(`Missing ${name} beside ${metaUrl}`);
    return "";
  }
  return fs.readFileSync(url, "utf8");
};

/** Read example.txt and input.txt that sit next to the solution file. Missing input is an empty string. */
export const load = (metaUrl) => ({
  example: readSibling(metaUrl, "example.txt", { required: true }),
  input: readSibling(metaUrl, "input.txt", { required: false }),
});

/** True when this file was started with `node`, false when another script imported it. */
export const isDirect = (metaUrl) =>
  Boolean(process.argv[1]) && metaUrl === pathToFileURL(process.argv[1]).href;

/** Print the example check and the real answer when the solution file is run directly. */
export const run = (metaUrl, part) => {
  if (!isDirect(metaUrl)) return;

  const { example, input } = load(metaUrl);
  const matched = printExample(part.main(example), part.exampleAnswer);
  if (!matched) process.exitCode = 1;

  if (!input.trim()) {
    printInputEmpty();
    return;
  }

  printInput(part.main(input));
};
