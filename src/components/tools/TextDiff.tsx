"use client";

import { useState } from "react";
import { diffWords, diffLines, Change } from "diff";
import { ArrowLeftRight, Trash2, SplitSquareHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TextDiff() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [diffMode, setDiffMode] = useState<"words" | "lines">("words");
    const [diffResult, setDiffResult] = useState<Change[] | null>(null);

    const handleCompare = () => {
        if (!original && !modified) {
            setDiffResult(null);
            return;
        }

        if (diffMode === "words") {
            setDiffResult(diffWords(original, modified));
        } else {
            setDiffResult(diffLines(original, modified));
        }
    };

    const handleClear = () => {
        setOriginal("");
        setModified("");
        setDiffResult(null);
    };

    const handleSwap = () => {
        setOriginal(modified);
        setModified(original);
        setDiffResult(null);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-border/50">
                <div className="flex items-center w-full sm:w-auto gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <SplitSquareHorizontal className="w-4 h-4" />
                            Diff Mode
                        </label>
                        <select
                            value={diffMode}
                            onChange={(e) => {
                                setDiffMode(e.target.value as "words" | "lines");
                                setDiffResult(null);
                            }}
                            className="w-full sm:w-40 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="words">Word Level</option>
                            <option value="lines">Line Level</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleSwap}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 text-foreground font-medium rounded-lg hover:bg-slate-300 transition-colors shadow-sm flex-1 sm:flex-none"
                    >
                        <ArrowLeftRight className="w-4 h-4" />
                        <span className="sr-only sm:not-sr-only">Swap</span>
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 text-destructive font-medium rounded-lg hover:bg-destructive/20 transition-colors shadow-sm flex-1 sm:flex-none"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only sm:not-sr-only">Clear</span>
                    </button>
                    <button
                        onClick={handleCompare}
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex-1 sm:flex-none"
                    >
                        Compare
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
                {/* Original Text */}
                <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-border/50 bg-slate-50">
                        <span className="text-sm font-semibold">Original Text</span>
                    </div>
                    <textarea
                        value={original}
                        onChange={(e) => {
                            setOriginal(e.target.value);
                            setDiffResult(null);
                        }}
                        placeholder="Paste original text here..."
                        className="flex-1 w-full resize-none p-4 bg-transparent outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
                        spellCheck={false}
                    />
                </div>

                {/* Modified Text */}
                <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-border/50 bg-slate-50">
                        <span className="text-sm font-semibold">Modified Text</span>
                    </div>
                    <textarea
                        value={modified}
                        onChange={(e) => {
                            setModified(e.target.value);
                            setDiffResult(null);
                        }}
                        placeholder="Paste modified text here..."
                        className="flex-1 w-full resize-none p-4 bg-transparent outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Diff Result */}
            {diffResult && (
                <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm mt-4">
                    <div className="px-4 py-3 border-b border-border/50 bg-slate-50 flex items-center justify-between">
                        <span className="text-sm font-semibold">Comparison Result</span>
                        <div className="flex gap-4 text-xs font-medium">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-200 border border-red-300"></div> Removed</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-green-200 border border-green-300"></div> Added</span>
                        </div>
                    </div>
                    <div className="p-4 bg-transparent max-h-[500px] overflow-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                        {diffResult.map((part, index) => (
                            <span
                                key={index}
                                className={cn(
                                    part.added ? "bg-green-200 text-green-900 py-0.5 px-1 rounded-sm mx-0.5" :
                                        part.removed ? "bg-red-200 text-red-900 py-0.5 px-1 rounded-sm mx-0.5 line-through decoration-red-500/50" : "text-foreground"
                                )}
                            >
                                {part.value}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
