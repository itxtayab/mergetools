"use client";

import { useState } from "react";
import { Copy, CheckCheck, Trash2, Code2 } from "lucide-react";

export default function HtmlMinifier() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const minifyHtml = () => {
        if (!input.trim()) {
            setOutput("");
            return;
        }

        try {
            let minified = input
                // Remove HTML comments
                .replace(/<!--([\s\S]*?)-->/g, '')
                // Remove whitespaces between tags
                .replace(/>\s+</g, '><')
                // Remove whitespaces around equal signs in attributes
                .replace(/\s*=\s*/g, '=')
                // Remove newlines and tabs
                .replace(/[\r\n\t]+/g, ' ')
                // Replace multiple spaces with a single space
                .replace(/\s{2,}/g, ' ')
                // Clean up spaces explicitly before/after brackets
                .replace(/\s+</g, '<')
                .replace(/>\s+/g, '>')
                .trim();

            setOutput(minified);
        } catch (err) {
            setOutput("Error minifying HTML. Please ensure valid syntax.");
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
    };

    const inputSize = new Blob([input]).size;
    const outputSize = new Blob([output]).size;
    const savedBytes = Math.max(0, inputSize - outputSize);
    const savingsPercentage = inputSize > 0 ? ((savedBytes / inputSize) * 100).toFixed(1) : "0.0";

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
                {/* Input Area */}
                <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50 dark:bg-slate-900/50">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-primary" />
                            Original HTML
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Clear
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your raw HTML here..."
                        className="flex-1 w-full resize-none p-4 bg-transparent outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
                        spellCheck={false}
                    />
                </div>

                {/* Output Area */}
                <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm relative">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50 dark:bg-slate-900/50">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            Minified Output
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={minifyHtml}
                                className="flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                            >
                                Minify
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground bg-slate-100 hover:bg-slate-200 hover:text-foreground dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 rounded-md transition-colors"
                            >
                                {isCopied ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                {isCopied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder="Minified HTML will appear here..."
                        className="flex-1 w-full resize-none p-4 bg-slate-50/50 dark:bg-slate-900/20 outline-none font-mono text-sm text-foreground focus:ring-0"
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Stats */}
            {outputSize > 0 && (
                <div className="flex items-center justify-center gap-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-400 font-medium rounded-xl text-sm">
                    <div>Original: {inputSize} B</div>
                    <div className="w-px h-4 bg-green-300 dark:bg-green-800" />
                    <div>Minified: {outputSize} B</div>
                    <div className="w-px h-4 bg-green-300 dark:bg-green-800" />
                    <div>Saved: {savedBytes} B ({savingsPercentage}%)</div>
                </div>
            )}
        </div>
    );
}
