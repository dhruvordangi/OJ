import { exec } from "child_process";
import path from "path";

export default (filePath, input = "") => {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const className = fileName.replace(/\.java$/, "");

  return new Promise((resolve, reject) => {
    // Compile
    exec(`javac "${filePath}"`, (compileErr, _, compileStderr) => {
      if (compileErr) return reject(compileStderr || compileErr.message);
      // Run
      const run = exec(`java -cp "${dir}" ${className}`, (runErr, stdout, runStderr) => {
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
