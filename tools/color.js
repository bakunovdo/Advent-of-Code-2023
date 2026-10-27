import { styleText } from "node:util";

const paint = (format, text) => {
  const value = String(text);
  const newline = value.endsWith("\n") ? "\n" : "";
  const body = newline ? value.slice(0, -1) : value;
  return styleText(format, body) + newline;
};

export const ok = (text) => paint("green", text);
export const fail = (text) => paint("red", text);
export const warn = (text) => paint("yellow", text);
export const muted = (text) => paint("dim", text);
export const title = (text) => paint(["bold", "cyan"], text);
export const value = (text) => paint(["bold"], text);
export const path = (text) => paint("cyan", text);
