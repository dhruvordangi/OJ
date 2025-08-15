"use client"

import { useState, useRef } from "react"
import { Play, Settings } from "lucide-react"

const SimpleCodeEditor = ({ language = "cpp", code = "", onCodeChange, onSubmit, isRunning = false }) => {
  const [fontSize, setFontSize] = useState(14)
  const [showSettings, setShowSettings] = useState(false)
  const textareaRef = useRef(null)

  // Language configurations
  const languages = {
    cpp: {
      name: "cpp",
      defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
    },
    python: {
      name: "python",
      defaultCode: `print("Hello World!")

# Your code here`,
    },
    java: {
      name: "java",
      defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
    },
  }

  // Get initial code
  const getInitialCode = () => {
    if (code) return code
    return languages[language]?.defaultCode || "// Start coding here..."
  }

  // Handle code change
  const handleCodeChange = (e) => {
    const value = e.target.value
    if (onCodeChange) {
      onCodeChange(value)
    }
  }

  return (
    <div className="w-full h-full flex flex-col border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
          
          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-700 rounded"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-700 text-white p-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                className="w-24"
              />
              <span className="text-xs ml-2">{fontSize}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Textarea Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={getInitialCode()}
          onChange={handleCodeChange}
          className="w-full h-full p-4 font-mono text-sm border-0 outline-none resize-none"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            lineHeight: '1.5',
          }}
          placeholder="Start coding here..."
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default SimpleCodeEditor
