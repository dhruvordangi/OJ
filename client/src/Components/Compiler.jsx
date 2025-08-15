import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import EnhancedCodeEditor from "./EnhancedCodeEditor.jsx";

// Default code snippets for each language
const DEFAULT_SNIPPETS = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello from C!\\n");
    return 0;
}`,
  python: `print("Hello from Python!")

# Your code here`,
  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`,
};

export default function Compiler({ problemId: propProblemId }) {
  const params = useParams();
  const problemId = propProblemId || params.id;
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(DEFAULT_SNIPPETS.cpp);
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [verdict, setVerdict] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  // Update starter code when language changes
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(DEFAULT_SNIPPETS[lang] ?? "");
    setOutput("");
    setErrorMsg("");
    setVerdict("");
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setErrorMsg("");
    setOutput("");
    setVerdict("");
    try {
      const resp = await fetch("http://localhost:4000/api/problems/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ problemId, code, language }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Submission failed");
      setVerdict(data.verdict);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col items-stretch gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AlgoU Enhanced Code Editor
        </h1>
        <p className="text-gray-600 mt-2">
          Professional coding experience with auto-completion, IntelliSense, and multiple themes
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-4 justify-center flex-wrap bg-white p-4 rounded-lg shadow-sm">
        <label htmlFor="lang" className="text-sm font-medium text-gray-700">
          Programming Language:
        </label>
        <select
          id="lang"
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        
        <div className="text-sm text-gray-500">
          <span className="font-medium">Features:</span> Auto-completion • IntelliSense • Syntax Highlighting • Multiple Themes
        </div>
      </div>

      {/* Enhanced Code Editor - FIXED HEIGHT CONTAINER */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
        <EnhancedCodeEditor
          language={language}
          code={code}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          isRunning={isRunning}
          theme={editorTheme}
          onThemeChange={setEditorTheme}
          problemId={problemId}
        />
      </div>

      {/* Results Section */}
      {(verdict || errorMsg) && (
        <div className="w-full flex flex-col gap-3">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">Compilation Error</span>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-xs">{errorMsg}</pre>
            </div>
          )}
          
          {verdict && (
            <div className={`rounded-lg p-4 text-center font-medium ${
              verdict === 'Success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  verdict === 'Success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-lg">
                  {verdict === 'Success' ? '✅ Accepted' : '❌ Failed'}
                </span>
              </div>
              <p className="text-sm mt-1 opacity-75">
                {verdict === 'Success' 
                  ? 'Your solution passed all test cases!' 
                  : 'Your solution failed some test cases. Please check your logic.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">✨ Enhanced Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-blue-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Auto-completion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>IntelliSense</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Multiple Themes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Code Snippets</span>
          </div>
        </div>
      </div>
    </div>
  );
}
