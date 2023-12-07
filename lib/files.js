import { writeFile } from "fs/promises";
import { existsSync } from "fs";

export const safeWriteFile = (path, content) => {
  try {
    if (!existsSync(path) && !existsSync(path)) {
      writeFile(path, content);
    }
  } catch (error) {
    console.error(error);
  }
};
