import React, { useState, useMemo } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript"; // fallback grammar; prism-c-like covers C/CPP-ish
import "prismjs/themes/prism.css";

/*
  ------------------------------------------------------------------
  Compiler.jsx  —  ultra‑simple online compiler client component
  ------------------------------------------------------------------
  ✅ Minimal props‑free version; reads backend URL from Vite env.
  ✅ Language selector (C++, C, Python, Java) — value sent to backend.
  ✅ Uses "fetch" per your preference (no axios).
  ✅ Shows loading, output, and error areas cleanly.
  ✅ Keeps styling light; works with Tailwind if available, but safe fallback.
  ✅ Small default starter programs per language.

  HOW IT WORKS
  ------------
  1. User selects a language.
  2. User edits code in the inline editor.
  3. Click **Run** → POST { language, code } to backend.
  4. Backend returns JSON: { output: string, error?: string } (contract flexible).
  5. We display output / error.

  Customize the payload shape here if your server differs.
*/
// const VITE_BACKEND_URL = "http://localhost:5000/api/run";
// --- helper: default starter code per language ---
const DEFAULT_SNIPPETS = {
  cpp: `#include <bits/stdc++.h>\n using namespace std;\n int main(){\n cout << \"Hello from C++!\\n\";\n return 0;\n }`,
  c: `#include <stdio.h>\n int main(){\n printf(\"Hello from C!\\n\");\n return 0;\n }`,
  python: `print("Hello from Python!")`,
  java: `import java.util.*;\n class Main{\n public static void main(String[] args){\n System.out.println("Hello from Java!");\n }\n }`,
};

// map our short codes to Prism grammar for syntax highlighting
const PRISM_LANG_MAP = {
  cpp: languages.js,   // prism-clike gives decent fallback; full cpp grammar optional
  c: languages.js,     // same fallback
  python: languages.js,    // load python if you like; using js fallback keeps bundle tiny
  java: languages.js,
};

// Derive backend URL (fail‑safe empty string → will error visibly on Run)
// const BACKEND_URL = import.meta?.env?.VITE_BACKEND_URL ?? "";
const BACKEND_URL = "http://localhost:5000/run";


export default function Compiler() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(DEFAULT_SNIPPETS.cpp);
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState(""); // <-- new state

  // update starter code when language changes (only if user hasn't typed yet?)
  // simple version: always swap snippet when language changes
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(DEFAULT_SNIPPETS[lang] ?? "");
    setOutput("");
    setErrorMsg("");
  };

  const doRun = async () => {
    if (!BACKEND_URL) {
      setErrorMsg("Backend URL missing. Define VITE_BACKEND_URL in your env.");
      return;
    }
    setIsRunning(true);
    setErrorMsg("");
    setOutput("");

    try {
      const resp = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, input }), // <-- send input
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server ${resp.status}: ${text}`);
      }

      // expected payload: { output: string, error?: string }
      const data = await resp.json();
      if (data.error) setErrorMsg(String(data.error));
      if (data.output) setOutput(String(data.output));
      if (!data.error && !data.output) setOutput("(no output)");
    } catch (err) {
      setErrorMsg(err?.message || "Request failed");
    } finally {
      setIsRunning(false);
    }
  };

  // highlight fn memoized by lang
  const highlightFn = useMemo(() => {
    const prismLang = PRISM_LANG_MAP[language] ?? languages.js;
    return (src) => highlight(src, prismLang);
  }, [language]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-stretch gap-4">
      <h1 className="text-2xl font-bold text-center">AlgoU Online Code Compiler</h1>

      <div className="flex items-center gap-2 justify-center flex-wrap">
        <label htmlFor="lang" className="text-sm font-medium">Language:</label>
        <select
          id="lang"
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <button
          type="button"
          onClick={doRun}
          disabled={isRunning}
          className="ml-4 inline-flex items-center gap-1 rounded-md bg-gradient-to-br from-pink-500 to-orange-400 text-white text-sm font-medium px-4 py-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-md shadow-inner w-full" style={{ minHeight: "300px", maxHeight: "400px", overflowY: "auto" }}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={highlightFn}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            minHeight: "300px",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Input (stdin):</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2 text-sm font-mono"
          placeholder="Enter input for your program here..."
        />
      </div>

      {(output || errorMsg) && (
        <div className="w-full flex flex-col gap-2">
          {errorMsg && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded-md p-3 text-xs whitespace-pre-wrap break-words">
              {errorMsg}
            </div>
          )}
          {output && (
            <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-xs font-mono whitespace-pre-wrap break-words">
              {output}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
