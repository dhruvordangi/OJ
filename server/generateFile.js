import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

/**
 * Utility responsible for creating unique temporary source-code files on disk.
 *
 * Why do we need this?
 * 1. The online compiler receives raw code text from the client.
 * 2. In order to compile / execute the program we must first write that text
 *    into a real file so that tools like `g++` can read it.
 * 3. We keep things tidy by placing every generated file inside a dedicated
 *    `codes` folder (created automatically if it does not yet exist).
 * 4. A UUID (universally-unique identifier) is used to ensure file names never
 *    clash when several users hit the endpoint at the same time.
 *
 * The main export is `generateFile(language, code)` which returns **the full
 * path** of the freshly-created file so that the caller can pass it to the
 * next build / run step.
 */

const getExtension = (language) => {
  switch (language) {
    case "cpp": return "cpp";
    case "c": return "c";
    case "python": return "py";
    case "java": return "java";
    default: return "txt";
  }
};

export const generateFile = (language, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${getExtension(language)}`;
  const filePath = path.join(dirCodes, filename);
  fs.writeFileSync(filePath, code);
  return filePath;
};
