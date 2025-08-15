"use client"

import { useState } from "react"
import EnhancedCodeEditor from "../Components/EnhancedCodeEditor.jsx"

const TestEditor = () => {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("cpp")
  const [isRunning, setIsRunning] = useState(false)

  const handleCodeChange = (newCode) => {
    setCode(newCode)
    console.log("Code changed:", newCode?.substring(0, 50) + "...")
  }

  const handleSubmit = () => {
    setIsRunning(true)
    console.log("Running code:", code)
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false)
      alert("Code executed successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Code Editor Test</h1>
          
          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          {/* Editor Container with Fixed Height */}
          <div className="h-[600px] border border-gray-300 rounded-lg overflow-hidden">
            <EnhancedCodeEditor
              language={language}
              code={code}
              onCodeChange={handleCodeChange}
              onSubmit={handleSubmit}
              isRunning={isRunning}
            />
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p className="text-sm text-gray-600">
              Language: {language} | Code Length: {code?.length || 0} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestEditor
