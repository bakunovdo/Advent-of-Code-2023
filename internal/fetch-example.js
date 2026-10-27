import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Puzzle title and the first example block from the public statement.
 * @param {string | number} day
 * @param {string | number} year
 */
export const getPuzzlePage = async (day, year) => {
  const url = `https://adventofcode.com/${year}/day/${Number(day)}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Failed to fetch puzzle page (${response.status}) from ${url}`);
  }

  const document = new JSDOM(await response.text()).window.document;
  const heading = document.querySelector("article h2")?.textContent?.trim() ?? "";
  const name = heading.match(/:\s*(.+?)\s*-+\s*$/)?.[1]?.trim() || "TBD";
  const example = document.querySelector("pre code, article pre")?.textContent.trim() ?? "";

  if (!example) {
    throw new Error(`No example block found on ${url}`);
  }

  return { name, example };
};
