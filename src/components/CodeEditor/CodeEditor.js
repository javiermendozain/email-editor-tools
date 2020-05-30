import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";

import "./styleEditor.css";

const CodeEditor = ({ Code, SetCode }) => {
  return (
    <Editor
      value={Code}
      onValueChange={(code) => SetCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
    />
  );
};

export default CodeEditor;
