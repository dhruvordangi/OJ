// Custom theme configurations for Monaco Editor
export const customThemes = {
  "vs-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955" },
      { token: "keyword", foreground: "C586C0" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "type", foreground: "4EC9B0" },
      { token: "function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
      { token: "operator", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
      "editor.foreground": "#D4D4D4",
      "editor.lineHighlightBackground": "#2A2D2E",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#3A3D41",
      // Fixed cursor colors - these were the main issue
      "editorCursor.foreground": "#FFFFFF",
      "editorCursor.background": "#1E1E1E",
      "editorWhitespace.foreground": "#3E3E42",
      "editorIndentGuide.background": "#404040",
      "editorIndentGuide.activeBackground": "#707070",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#C6C6C6",
      "editorRuler.foreground": "#5A5A5A",
      "editorCodeLens.foreground": "#999999",
      "editorBracketMatch.background": "#3A3A3A",
      "editorBracketMatch.border": "#888888",
      "editorOverviewRuler.border": "#7F7F7F",
      "editorGutter.background": "#1E1E1E",
      "editorError.foreground": "#F44747",
      "editorWarning.foreground": "#CCA700",
      "editorInfo.foreground": "#75BEFF",
    },
  },
  "vs-light": {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "008000" },
      { token: "keyword", foreground: "0000FF" },
      { token: "string", foreground: "A31515" },
      { token: "number", foreground: "098658" },
      { token: "type", foreground: "267f99" },
      { token: "function", foreground: "795E26" },
      { token: "variable", foreground: "001080" },
      { token: "operator", foreground: "000000" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#000000",
      "editor.lineHighlightBackground": "#F7F7F7",
      "editor.selectionBackground": "#ADD6FF",
      "editor.inactiveSelectionBackground": "#E5EBF1",
      // Fixed cursor colors
      "editorCursor.foreground": "#000000",
      "editorCursor.background": "#FFFFFF",
      "editorWhitespace.foreground": "#B3B3B3",
      "editorIndentGuide.background": "#D3D3D3",
      "editorIndentGuide.activeBackground": "#939393",
      "editorLineNumber.foreground": "#2B91AF",
      "editorLineNumber.activeForeground": "#000000",
      "editorRuler.foreground": "#D3D3D3",
      "editorCodeLens.foreground": "#919191",
      "editorBracketMatch.background": "#E6F3FF",
      "editorBracketMatch.border": "#B9D9F3",
      "editorOverviewRuler.border": "#E7E7E7",
      "editorGutter.background": "#F3F3F3",
      "editorError.foreground": "#E51400",
      "editorWarning.foreground": "#E9A700",
      "editorInfo.foreground": "#007ACC",
    },
  },
  "hc-black": {
    base: "hc-black",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955" },
      { token: "keyword", foreground: "569CD6" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "type", foreground: "4EC9B0" },
      { token: "function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
      { token: "operator", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#000000",
      "editor.foreground": "#FFFFFF",
      "editor.lineHighlightBackground": "#0C141F",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#3A3D41",
      // Fixed cursor colors - made more visible
      "editorCursor.foreground": "#FFFF00",
      "editorCursor.background": "#000000",
      "editorWhitespace.foreground": "#404040",
      "editorIndentGuide.background": "#404040",
      "editorIndentGuide.activeBackground": "#707070",
      "editorLineNumber.foreground": "#FFFFFF",
      "editorLineNumber.activeForeground": "#FFFF00",
      "editorRuler.foreground": "#FFFFFF",
      "editorCodeLens.foreground": "#FFFFFF",
      "editorBracketMatch.background": "#404040",
      "editorBracketMatch.border": "#FFFF00",
      "editorOverviewRuler.border": "#FFFFFF",
      "editorGutter.background": "#000000",
      "editorError.foreground": "#FF0000",
      "editorWarning.foreground": "#FFFF00",
      "editorInfo.foreground": "#00FFFF",
    },
  },
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6E7781" },
      { token: "keyword", foreground: "FF7B72" },
      { token: "string", foreground: "A5D6FF" },
      { token: "number", foreground: "79C0FF" },
      { token: "type", foreground: "FFA657" },
      { token: "function", foreground: "D2A8FF" },
      { token: "variable", foreground: "FFA198" },
      { token: "operator", foreground: "F0F6FC" },
    ],
    colors: {
      "editor.background": "#0D1117",
      "editor.foreground": "#F0F6FC",
      "editor.lineHighlightBackground": "#161B22",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#21262D",
      // Fixed cursor colors
      "editorCursor.foreground": "#F0F6FC",
      "editorCursor.background": "#0D1117",
      "editorWhitespace.foreground": "#21262D",
      "editorIndentGuide.background": "#21262D",
      "editorIndentGuide.activeBackground": "#30363D",
      "editorLineNumber.foreground": "#8B949E",
      "editorLineNumber.activeForeground": "#F0F6FC",
      "editorRuler.foreground": "#21262D",
      "editorCodeLens.foreground": "#8B949E",
      "editorBracketMatch.background": "#30363D",
      "editorBracketMatch.border": "#7C3AED",
      "editorOverviewRuler.border": "#21262D",
      "editorGutter.background": "#0D1117",
      "editorError.foreground": "#F85149",
      "editorWarning.foreground": "#D29922",
      "editorInfo.foreground": "#58A6FF",
    },
  },
  dracula: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272A4" },
      { token: "keyword", foreground: "FF79C6" },
      { token: "string", foreground: "F1FA8C" },
      { token: "number", foreground: "BD93F9" },
      { token: "type", foreground: "8BE9FD" },
      { token: "function", foreground: "50FA7B" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "FF79C6" },
    ],
    colors: {
      "editor.background": "#282A36",
      "editor.foreground": "#F8F8F2",
      "editor.lineHighlightBackground": "#44475A",
      "editor.selectionBackground": "#44475A",
      "editor.inactiveSelectionBackground": "#44475A",
      // Fixed cursor colors
      "editorCursor.foreground": "#F8F8F2",
      "editorCursor.background": "#282A36",
      "editorWhitespace.foreground": "#3B3A32",
      "editorIndentGuide.background": "#3B3A32",
      "editorIndentGuide.activeBackground": "#9D550FB0",
      "editorLineNumber.foreground": "#6272A4",
      "editorLineNumber.activeForeground": "#F8F8F2",
      "editorRuler.foreground": "#5A5A5A",
      "editorCodeLens.foreground": "#999999",
      "editorBracketMatch.background": "#3B3A32",
      "editorBracketMatch.border": "#FFB86C",
      "editorOverviewRuler.border": "#7F7F7F",
      "editorGutter.background": "#282A36",
      "editorError.foreground": "#FF5555",
      "editorWarning.foreground": "#FFB86C",
      "editorInfo.foreground": "#8BE9FD",
    },
  },
}

// Editor configuration options
export const editorConfig = {
  // General options
  fontSize: 14,
  fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
  lineHeight: 1.5,
  letterSpacing: 0.5,

  // Editor behavior
  wordWrap: "on",
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  automaticLayout: true,

  // Cursor settings - these are crucial for visibility
  cursorStyle: "line",
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: "on",
  cursorWidth: 3, // Increased for better visibility

  // Code completion
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true,
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: "on",
  tabCompletion: "on",
  wordBasedSuggestions: true,

  // IntelliSense
  parameterHints: {
    enabled: true,
  },

  // Code formatting
  autoIndent: "full",
  formatOnPaste: true,
  formatOnType: true,

  // Code folding
  folding: true,
  foldingStrategy: "indentation",
  showFoldingControls: "always",
  unfoldOnClickAfterEnd: false,

  // Additional features
  links: true,
  colorDecorators: true,
  lightbulb: {
    enabled: true,
  },
  codeActionsOnSave: {
    "source.fixAll": true,
    "source.organizeImports": true,
  },

  // Bracket matching
  bracketPairColorization: {
    enabled: true,
  },

  // Guides
  guides: {
    bracketPairs: true,
    indentation: true,
  },

  // Performance
  largeFileOptimizations: true,
  maxTokenizationLineLength: 20000,

  // Rendering options for better visibility
  renderWhitespace: "none",
  renderLineHighlight: "all",
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: false,
}

// Language-specific configurations
export const languageConfigs = {
  cpp: {
    name: "cpp",
    extensions: [".cpp", ".cc", ".cxx", ".h", ".hpp"],
    defaultCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`,
    snippets: [
      {
        label: "for loop",
        insertText: "for (int i = 0; i < n; i++) {\n\t$1\n}",
        documentation: "Standard for loop",
      },
      {
        label: "vector",
        insertText: "vector<${1:int}> ${2:vec};",
        documentation: "Create a vector",
      },
      {
        label: "sort",
        insertText: "sort(${1:vec}.begin(), ${1:vec}.end());",
        documentation: "Sort a vector",
      },
      {
        label: "main function",
        insertText: "int main() {\n\t$1\n\treturn 0;\n}",
        documentation: "Main function template",
      },
    ],
  },
  c: {
    name: "c",
    extensions: [".c", ".h"],
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello from C!\\n");
    return 0;
}`,
    snippets: [
      {
        label: "for loop",
        insertText: "for (int i = 0; i < n; i++) {\n\t$1\n}",
        documentation: "Standard for loop",
      },
      {
        label: "malloc",
        insertText: "${1:int}* ${2:ptr} = (${1:int}*)malloc(${3:size} * sizeof(${1:int}));",
        documentation: "Allocate memory",
      },
      {
        label: "main function",
        insertText: "int main() {\n\t$1\n\treturn 0;\n}",
        documentation: "Main function template",
      },
    ],
  },
  python: {
    name: "python",
    extensions: [".py"],
    defaultCode: `print("Hello from Python!")

# Your code here`,
    snippets: [
      {
        label: "for loop",
        insertText: "for ${1:item} in ${2:items}:\n\t$3",
        documentation: "Python for loop",
      },
      {
        label: "list comprehension",
        insertText: "[${1:x} for ${1:x} in ${2:items} if ${3:condition}]",
        documentation: "List comprehension",
      },
      {
        label: "function",
        insertText: "def ${1:function_name}(${2:parameters}):\n\t$3",
        documentation: "Define a function",
      },
      {
        label: "if statement",
        insertText: "if ${1:condition}:\n\t$2",
        documentation: "If statement",
      },
    ],
  },
  java: {
    name: "java",
    extensions: [".java"],
    defaultCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`,
    snippets: [
      {
        label: "for loop",
        insertText: "for (int i = 0; i < ${1:array}.length; i++) {\n\t$2\n}",
        documentation: "Standard for loop",
      },
      {
        label: "ArrayList",
        insertText: "ArrayList<${1:String}> ${2:list} = new ArrayList<>();",
        documentation: "Create an ArrayList",
      },
      {
        label: "main method",
        insertText: "public static void main(String[] args) {\n\t$1\n}",
        documentation: "Main method template",
      },
    ],
  },
}

export default {
  customThemes,
  editorConfig,
  languageConfigs,
}
