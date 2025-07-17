import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [{ type: String }],
  constraints: { type: String },
  sampleInputFile: { type: String },
  sampleOutputFile: { type: String },
}, { timestamps: true });

const Problem = mongoose.model("Problem", ProblemSchema);
export default Problem;