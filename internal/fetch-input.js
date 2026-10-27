import fetch from "node-fetch";
import "dotenv/config";

/**
 * @param {string | number} day
 * @param {string | number} year
 */
export const getInputDay = async (day, year) => {
  if (!process.env.AOC_TOKEN) {
    throw new Error("AOC_TOKEN is missing. Add your session cookie to .env");
  }

  const url = `https://adventofcode.com/${year}/day/${Number(day)}/input`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `session=${process.env.AOC_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch input (${response.status}) from ${url}`);
  }

  const text = await response.text();
  if (!text.trim()) {
    throw new Error(`Empty input from ${url}`);
  }

  return text;
};
