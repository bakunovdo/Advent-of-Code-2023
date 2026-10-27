import { fail, muted, ok, value, warn } from "./color.js";

const format = (answer) => {
  if (typeof answer === "string") return answer.includes("\n") ? `\n${answer}` : answer;
  return String(answer);
};

/** Print the example line. Returns false when it does not match exampleAnswer. */
export const printExample = (sample, expected) => {
  const rendered = format(sample);

  if (expected === undefined) {
    console.log(`  ${muted("example")}  ${value(rendered)}  ${muted("not checked")}`);
    return true;
  }

  if (sample !== expected) {
    console.log(`  ${fail("example")}  ${fail(rendered)}  ${muted("expected")} ${fail(format(expected))}`);
    return false;
  }

  console.log(`  ${ok("example")}  ${ok(rendered)}  ${ok("ok")}`);
  return true;
};

export const printInput = (answer, elapsed) => {
  const time = elapsed === undefined ? "" : muted(`  (${elapsed}ms)`);
  console.log(`  ${muted("input")}    ${value(format(answer))}${time}`);
};

export const printInputEmpty = () => {
  console.log(`  ${warn("input")}    ${warn("empty")}`);
};
