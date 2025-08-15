"use client"

import { useState, useRef, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { ChevronDown, Settings, Play, Download, Upload, Palette, Code, Zap } from "lucide-react"
import SimpleCodeEditor from "./SimpleCodeEditor.jsx"

const EnhancedCodeEditor = ({
  language = "cpp",
  code,
  onCodeChange,
  onSubmit,
  isRunning = false,
  theme = "vs-dark",
  onThemeChange,
  problemId,
}) => {
  const [editorTheme, setEditorTheme] = useState(theme)
  const [showSettings, setShowSettings] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [wordWrap, setWordWrap] = useState("on")
  const [minimap, setMinimap] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [editorError, setEditorError] = useState(null)
  const editorRef = useRef(null)
  const monacoRef = useRef(null)
  const themeSelectorRef = useRef(null)

  // Available themes - using built-in themes for reliability
  const availableThemes = [
    { id: "vs-dark", name: "Dark", icon: "🌙" },
    { id: "vs-light", name: "Light", icon: "☀️" },
    { id: "hc-black", name: "High Contrast", icon: "⚡" },
  ]

  // Simple editor options that work reliably
  const editorOptions = {
    fontSize: fontSize,
    fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
    wordWrap: wordWrap,
    minimap: { enabled: minimap },
    theme: editorTheme,
    // Cursor settings for visibility
    cursorStyle: "line",
    cursorBlinking: "blink",
    cursorWidth: 2,
    cursorSmoothCaretAnimation: "on",
    // Basic editor behavior
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderLineHighlight: "all",
    selectOnLineNumbers: true,
    readOnly: false,
    contextmenu: true,
    // Performance
    largeFileOptimizations: false,
  }

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    console.log("Editor mounted successfully")
    editorRef.current = editor
    monacoRef.current = monaco
    setEditorError(null)

    // Focus the editor and ensure cursor is visible
    setTimeout(() => {
      editor.focus()
      editor.setPosition({ lineNumber: 1, column: 1 })
      editor.layout()
      
      // Force cursor visibility
      editor.trigger('keyboard', 'cursorHome', {})
      editor.trigger('keyboard', 'cursorEnd', {})
    }, 100)
  }

  // Handle editor error
  const handleEditorError = (error) => {
    console.error("Monaco Editor failed to load:", error)
    setEditorError(error)
    setUseFallback(true)
  }

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    console.log(`Changing theme to: ${newTheme}`)
    setEditorTheme(newTheme)
    
    if (onThemeChange) {
      onThemeChange(newTheme)
    }
    setShowThemeSelector(false)
  }

  // Effect to handle theme prop changes
  useEffect(() => {
    if (theme !== editorTheme) {
      setEditorTheme(theme)
    }
  }, [theme])

  // Click outside handler for theme selector
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target)) {
        setShowThemeSelector(false)
      }
    }

    if (showThemeSelector) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showThemeSelector])

  // Handle code save
  const handleSave = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue()
      localStorage.setItem(`code_${language}_${problemId || "default"}`, code)
      console.log("Code saved to localStorage")
    }
  }

  // Handle code load
  const handleLoad = () => {
    const savedCode = localStorage.getItem(`code_${language}_${problemId || "default"}`)
    if (savedCode && editorRef.current) {
      editorRef.current.setValue(savedCode)
      console.log("Code loaded from localStorage")
    }
  }

  // Auto-save effect
  useEffect(() => {
    if (autoSave && editorRef.current) {
      const interval = setInterval(handleSave, 30000) // Save every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoSave, language, problemId])

  // If Monaco Editor failed, use fallback
  if (useFallback) {
    return (
      <div className="w-full h-full flex flex-col">
        {/* Error Banner */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>⚠️ Monaco Editor failed to load. Using fallback editor.</span>
            <button
              onClick={() => {
                setUseFallback(false)
                setEditorError(null)
                window.location.reload()
              }}
              className="text-yellow-600 hover:text-yellow-800 underline"
            >
              Retry
            </button>
          </div>
        </div>
        
        {/* Fallback Editor */}
        <SimpleCodeEditor
          language={language}
          code={code}
          onCodeChange={onCodeChange}
          onSubmit={onSubmit}
          isRunning={isRunning}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Editor Toolbar */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </div>

          {/* Theme Selector */}
          <div className="relative" ref={themeSelectorRef}>
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span>Theme</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showThemeSelector && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors flex items-center space-x-2 ${
                      editorTheme === theme.id ? "bg-gray-600" : ""
                    }`}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Editor Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={handleSave} className="p-2 hover:bg-gray-700 rounded transition-colors" title="Save Code">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={handleLoad} className="p-2 hover:bg-gray-700 rounded transition-colors" title="Load Code">
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm flex items-center space-x-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-700 text-white p-4 border-b border-gray-600 flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="block mb-2 font-medium">Font Size</label>
              <input
                type="range"
                min="10"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-300">{fontSize}px</span>
            </div>
            <div>
              <label className="block mb-2 font-medium">Word Wrap</label>
              <select
                value={wordWrap}
                onChange={(e) => setWordWrap(e.target.value)}
                className="bg-gray-600 text-white px-3 py-1 rounded w-full text-sm"
              >
                <option value="on">On</option>
                <option value="off">Off</option>
                <option value="wordWrapColumn">Word Wrap Column</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Minimap</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={minimap}
                  onChange={(e) => setMinimap(e.target.checked)}
                  className="rounded"
                />
                <span>Show Minimap</span>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Auto Save</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded"
                />
                <span>Auto Save</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monaco Editor Container - FIXED HEIGHT */}
      <div className="flex-1" style={{ height: 'calc(100% - 60px)' }}>
        <Editor
          height="100%"
          language={language}
          theme={editorTheme}
          value={code}
          onChange={onCodeChange}
          options={editorOptions}
          onMount={handleEditorDidMount}
          onError={handleEditorError}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900 text-white">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 animate-pulse" />
                <span>Loading editor...</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default EnhancedCodeEditor

