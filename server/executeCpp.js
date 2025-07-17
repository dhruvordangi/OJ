const { exec } = require("child_process");
const path = require("path");

module.exports = (filePath, input = "") => {
  const outputPath = filePath.replace(/\.cpp$/, "");
  return new Promise((resolve, reject) => {
    // Compile
    exec(`g++ "${filePath}" -o "${outputPath}"`, (compileErr, _, compileStderr) => {
      if (compileErr) return reject(compileStderr || compileErr.message);
      // Run
      const run = exec(`"${outputPath}"`, (runErr, stdout, runStderr) => {
        if (runErr) return reject(runStderr || runErr.message);
        resolve(stdout);
      });
      if (input) {
        run.stdin.write(input);
      }
      run.stdin.end();
    });
  });
};