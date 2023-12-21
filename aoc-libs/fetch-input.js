import fetch from "node-fetch";
import { dateToTz } from "../lib/date.js";
import "dotenv/config";

const getInputUrl = (day) => {
  const now = dateToTz();
  const isDecember = now.month === 12;
  const year = isDecember ? now.year : now.year - 1;

  return `https://adventofcode.com/${year}/day/${day}/input`;
};

/**
 *
 * @param {String} day
 */
export const getInputDay = async (day) => {
  const url = getInputUrl(day);

  if (!process.env.AOC_TOKEN) return "";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `session=${process.env.AOC_TOKEN}`,
    },
  });

  return response.text();
};
