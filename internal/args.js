const asInteger = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return Number.NaN;
};

/**
 * A 4-digit number from 2015 up is a year. With allowPart, a trailing 1 or 2
 * selects one solution file instead of being read as a year.
 */
export const classifyPositionals = (values, { allowPart = false } = {}) => {
  let day;
  let year;
  let part;

  for (const raw of values) {
    const value = asInteger(raw);
    if (!Number.isInteger(value)) {
      throw new Error(`Expected a number, got "${raw}"`);
    }

    if (value >= 2015 && String(value).length === 4) {
      if (year !== undefined) throw new Error("Year was passed more than once");
      year = value;
      continue;
    }

    if (day === undefined) {
      day = value;
      continue;
    }

    if (year === undefined && !(allowPart && (value === 1 || value === 2))) {
      year = value;
      continue;
    }

    if (allowPart && part === undefined && (value === 1 || value === 2)) {
      part = value;
      continue;
    }

    throw new Error(`Unexpected argument: ${raw}`);
  }

  return { day, year, part };
};

export const resolvePuzzle = ({ day, year, part, positionals = [], allowPart = false }) => {
  const parsed = classifyPositionals(
    positionals.filter((value) => value !== undefined && value !== null),
    { allowPart }
  );

  return {
    day: day ?? parsed.day,
    year: year ?? parsed.year,
    part: part ?? parsed.part,
  };
};

export const assertPuzzle = (day, year) => {
  if (!Number.isInteger(day) || day < 1 || day > 25) {
    throw new Error(`Day must be between 1 and 25, got "${day ?? ""}"`);
  }
  if (!Number.isInteger(year) || year < 2015) {
    throw new Error(`Year must be 2015 or later, got "${year ?? ""}"`);
  }
};

export const assertPart = (part) => {
  if (part === undefined) return;
  if (part !== 1 && part !== 2) {
    throw new Error(`Part must be 1 or 2, got "${part}"`);
  }
};
