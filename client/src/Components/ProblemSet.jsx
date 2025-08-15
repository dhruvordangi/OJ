import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api/problems";
const FILE_URL = "http://localhost:4000/uploads/";

const DIFFICULTY_COLORS = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

export default function ProblemSet() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProblems(res.data))
      .catch(() => setProblems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Problem Set</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {problems.map(problem => (
            <div key={problem._id} className="border rounded-lg p-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/problems/${problem._id}/solve`)}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <span className={`font-bold ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2">{problem.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {problem.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <div><b>Constraints:</b> {problem.constraints}</div>
                {problem.sampleInputFile && (
                  <div>
                    <b>Sample Input:</b>{" "}
                    <a
                      href={FILE_URL + problem.sampleInputFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      input.txt
                    </a>
                  </div>
                )}
                {problem.sampleOutputFile && (
                  <div>
                    <b>Sample Output:</b>{" "}
                    <a
                      href={FILE_URL + problem.sampleOutputFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      output.txt
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}