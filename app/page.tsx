"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [code, setCode] = useState("// Write your JavaScript here");
  const [ analysis, setAnalysis ] = useState<React.ReactElement | null>(null);

  const handleAnalyze = () => {
    setAnalysis(
    <div>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi minima repellendus rerum est sequi soluta consequuntur minus saepe quia, iste sed autem velit quas blanditiis optio earum reprehenderit ab vero error dicta aliquid voluptatibus illo id? Commodi temporibus ratione ea illum consectetur libero, corrupti odit. Necessitatibus sequi repellendus facere nam nemo dignissimos natus aut alias adipisci officiis. Culpa ratione, quidem voluptate est esse adipisci deserunt exercitationem magnam ex eaque, hic deleniti reprehenderit nihil sapiente, voluptates qui aliquam? Doloribus quod omnis quas ut. Repellat aspernatur sunt ullam accusamus. Quibusdam blanditiis maxime odio quae. Quasi laborum reiciendis nobis velit repudiandae ullam fuga?
    </h2>
    </div>);
  };

  return (
    <main className="flex flex-col  items-center justify-center  min-h-screen">
      <h1 className="text-4xl font-bold mb-6 font">CodeBuddy</h1>
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
      {analysis && <div className="w-3/4 h-96 mb-4 border border-gray-700 rounded bg-gray-700">{analysis}</div>}
    </main>
  );
}
