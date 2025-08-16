import { exec } from "child_process";

export default (filePath, input = "") => {
  return new Promise((resolve, reject) => {
    const process = exec(`python3 "${filePath}"`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
    if (input) {
      process.stdin.write(input);
    }
    process.stdin.end();
  });
};
