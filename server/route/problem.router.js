import express from "express";
import Problem from "../model/problem.model.js";
import multerMiddleware from "../middlewares/multer.middleware.js";
import { submitSolution } from '../Controller/problem.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new problem with file uploads
router.post(
  "/",
  multerMiddleware.fields([
    { name: "sampleInputFile", maxCount: 1 },
    { name: "sampleOutputFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, difficulty, tags, constraints } = req.body;
      const sampleInputFile = req.files?.sampleInputFile?.[0]?.filename;
      const sampleOutputFile = req.files?.sampleOutputFile?.[0]?.filename;

      const problem = new Problem({
        title,
        description,
        difficulty,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        constraints,
        sampleInputFile,
        sampleOutputFile,
      });
      await problem.save();
      res.status(201).json(problem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post('/submit', isAuthenticated, submitSolution);

export default router;