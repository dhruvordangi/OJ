const { exec } = require("child_process");
const path = require("path");

module.exports = (filePath) => {
  const outputPath = filePath.replace(/\.c$/, "");
  return new Promise((resolve, reject) => {
    // Compile
    exec(`gcc "${filePath}" -o "${outputPath}"`, (compileErr, _, compileStderr) => {
      if (compileErr) return reject(compileStderr || compileErr.message);
      // Run
      exec(`"${outputPath}"`, (runErr, stdout, runStderr) => {
        if (runErr) return reject(runStderr || runErr.message);
        resolve(stdout);
      });
    });
  });
};