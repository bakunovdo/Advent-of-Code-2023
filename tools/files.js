import { writeFile } from "fs/promises";
import { existsSync } from "fs";

export const safeWriteFile = async (path, content) => {
  if (existsSync(path)) return false;

  await writeFile(path, content);
  return true;
};
