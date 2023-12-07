import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { dateToTz } from "../lib/date.js";
import "dotenv/config";

const getExampleUrl = (day) => {
  const now = dateToTz();
  const isDecember = now.month === 12;
  const year = isDecember ? now.year : now.year - 1;

  return `https://adventofcode.com/${year}/day/${day}`;
};

/**
 *
 * @param {String} day
 */
export const getExampleDay = async (day) => {
  const url = getExampleUrl(day);

  const response = await fetch(url, { method: "GET" });
  if (response.status === 404) return "";

  const text = await response.text();

  // Get code block from html page
  const dom = new JSDOM(text);
  const example = dom.window.document
    .querySelector("body > main > article:nth-child(1) > pre")
    .textContent.trim();

  return example;
};
