"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [code, setCode] = useState("// Write your JavaScript here");

  const handleAnalyze = () => {
    console.log("User code:", code);
  };

  return (
    <main className="flex flex-col  items-center justify-center bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 ">CodeBuddy 🧠</h1>
      <div className="w-3/4 h-96 mb-4 border border-gray-700 rounded">
        <Editor
          height="200px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>
      <Button onClick={handleAnalyze}>Analyze Code</Button>
    </main>
  );
}
