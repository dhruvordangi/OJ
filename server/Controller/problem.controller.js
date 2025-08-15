import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../model/user.model.js';
import executeCpp from '../executeCpp.js';
import executePython from '../executePython.js';
import executeJava from '../executeJava.js';
import executeC from '../executeC.js';
import Problem from '../model/problem.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to select executor
const getExecutor = (language) => {
  switch (language) {
    case 'cpp': return executeCpp;
    case 'c': return executeC;
    case 'python': return executePython;
    case 'java': return executeJava;
    default: throw new Error('Unsupported language');
  }
};

export const submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    if (!problemId || !code || !language) return res.status(400).json({ error: 'Missing fields' });

    // Fetch problem to get file names
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const inputPath = path.join(__dirname, '..', 'uploads', problem.sampleInputFile);
    const outputPath = path.join(__dirname, '..', 'uploads', problem.sampleOutputFile);

    // Read testcases
    const inputData = await fs.readFile(inputPath, 'utf-8');
    const outputData = await fs.readFile(outputPath, 'utf-8');
    const inputCases = inputData.split('\n').filter(Boolean);
    const outputCases = outputData.split('\n').filter(Boolean);
    if (inputCases.length !== outputCases.length) return res.status(500).json({ error: 'Testcase count mismatch' });

    // Write user code to temp file
    const ext = language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : language === 'python' ? 'py' : language === 'java' ? 'java' : '';
    const tempFile = path.join(__dirname, '..', 'uploads', `${userId}-${Date.now()}.${ext}`);
    await fs.writeFile(tempFile, code);

    const executor = getExecutor(language);
    let verdict = 'Success';
    for (let i = 0; i < inputCases.length; i++) {
      let output = '';
      try {
        output = await executor(tempFile, inputCases[i]);
      } catch (err) {
        verdict = 'Failed';
        break;
      }
      if (output.trim() !== outputCases[i].trim()) {
        verdict = 'Failed';
        break;
      }
    }
    // Clean up temp file
    await fs.unlink(tempFile);

    // Save submission
    await User.findByIdAndUpdate(userId, {
      $push: {
        submissions: {
          problem: problemId,
          code,
          status: verdict === 'Success' ? 'Success' : 'Failed',
        },
      },
    });
    return res.json({ verdict });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}; 