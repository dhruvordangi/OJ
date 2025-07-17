const { exec } = require("child_process");

module.exports = (filePath, input = "") => {
  return new Promise((resolve, reject) => {
    const process = exec(`python "${filePath}"`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
    if (input) {
      process.stdin.write(input);
    }
    process.stdin.end();
  });
};