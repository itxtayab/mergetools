"use client";

import { useState, useEffect } from "react";
import { Copy, CheckCheck, RefreshCw, Type, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat",
    "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse",
    "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGenerator() {
    const [type, setType] = useState<"paragraphs" | "words" | "sentences">("paragraphs");
    const [count, setCount] = useState(3);
    const [output, setOutput] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const generateWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

    const generateSentence = () => {
        const wordCount = Math.floor(Math.random() * 8) + 6; // 6 to 13 words
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            let w = generateWord();
            if (i === 0) w = w.charAt(0).toUpperCase() + w.slice(1);
            words.push(w);
        }
        return words.join(" ") + ".";
    };

    const generateParagraph = (isFirst: boolean) => {
        const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences
        const sentences = [];
        for (let i = 0; i < sentenceCount; i++) {
            if (isFirst && i === 0 && count > 0) {
                // Force standard starting line if paragraphs or words are generated for the first time
                sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
            } else {
                sentences.push(generateSentence());
            }
        }
        return sentences.join(" ");
    };

    const handleGenerate = () => {
        const amt = Math.max(1, count);
        let result = "";

        if (type === "words") {
            const words = ["Lorem", "ipsum", "dolor", "sit", "amet,"];
            for (let i = 5; i < amt; i++) {
                words.push(generateWord());
            }
            result = words.slice(0, amt).join(" ");
        } else if (type === "sentences") {
            const sentences = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."];
            for (let i = 1; i < amt; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.slice(0, amt).join(" ");
        } else {
            // paragraphs
            const paragraphs = [];
            for (let i = 0; i < amt; i++) {
                paragraphs.push(generateParagraph(i === 0));
            }
            result = paragraphs.join("\n\n");
        }

        setOutput(result);
        setIsCopied(false);
    };

    // Auto-generate on mount and type change
    useEffect(() => {
        handleGenerate();
    }, [type]); // eslint-disable-line

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-end gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border/50">

                <div className="flex flex-col w-full sm:w-1/3 gap-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <AlignLeft className="w-4 h-4" />
                        Generate What?
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                    </select>
                </div>

                <div className="flex flex-col w-full sm:w-1/3 gap-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Amount
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={type === "words" ? 5000 : 100}
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Generate
                </button>
            </div>

            <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50 dark:bg-slate-900/50">
                    <span className="text-sm font-semibold text-foreground">Output</span>
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 rounded-md transition-colors",
                            isCopied ? "text-green-500 bg-green-50 dark:bg-green-900/20" : "text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50"
                        )}
                    >
                        {isCopied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? "Copied" : "Copy"}
                    </button>
                </div>
                <div className="p-4 bg-transparent max-h-[600px] overflow-auto">
                    {output ? (
                        <div className="prose prose-slate dark:prose-invert max-w-none text-foreground text-sm sm:text-base whitespace-pre-wrap">
                            {output}
                        </div>
                    ) : (
                        <span className="text-sm text-muted-foreground italic">Waiting to generate text...</span>
                    )}
                </div>
            </div>
        </div>
    );
}
