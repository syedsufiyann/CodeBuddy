"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [code, setCode] = useState("// Write your JavaScript here");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("No analysis returned from API");

      setAnalysis(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950">
      <h1 className="text-4xl font-bold mb-8 text-white">CodeBuddy</h1>

      <div className="w-full max-w-5xl mb-6">
        <div className="h-96 border border-zinc-700 rounded-lg overflow-hidden">
          <Editor
            height="200px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={loading || !code.trim()}
        className="mb-6"
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </Button>

      {(error || analysis) && (
        <div className="w-full max-w-5xl p-6 border border-zinc-700 rounded-lg bg-zinc-900">
          {error && (
            <div className="text-red-400">
              <h2 className="text-lg font-semibold mb-2">Error</h2>
              <p>{error}</p>
            </div>
          )}

          {analysis && (
            <div className="text-zinc-100">
              <h2 className="text-lg font-semibold mb-3 text-white">
                Analysis Results
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {analysis}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
