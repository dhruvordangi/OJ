import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/problems";

export default function AddProblem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    constraints: "",
  });
  const [sampleInputFile, setSampleInputFile] = useState(null);
  const [sampleOutputFile, setSampleOutputFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => {
    if (e.target.name === "sampleInputFile") setSampleInputFile(e.target.files[0]);
    if (e.target.name === "sampleOutputFile") setSampleOutputFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (sampleInputFile) data.append("sampleInputFile", sampleInputFile);
    if (sampleOutputFile) data.append("sampleOutputFile", sampleOutputFile);

    try {
      await axios.post(API_URL, data, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage("Problem added!");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-3 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add Problem</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full border p-2" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full border p-2" />
      <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border p-2">
        <option>Easy</option><option>Medium</option><option>Hard</option>
      </select>
      <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="w-full border p-2" />
      <input name="constraints" placeholder="Constraints" value={form.constraints} onChange={handleChange} className="w-full border p-2" />
      <div>
        <label>Sample Input (input.txt): </label>
        <input type="file" name="sampleInputFile" accept=".txt" onChange={handleFileChange} />
      </div>
      <div>
        <label>Sample Output (output.txt): </label>
        <input type="file" name="sampleOutputFile" accept=".txt" onChange={handleFileChange} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Problem</button>
      {message && <div className="text-sm mt-2">{message}</div>}
    </form>
  );
}