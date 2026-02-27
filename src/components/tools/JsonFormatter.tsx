"use client";

import { useState } from "react";
import { Copy, CheckCheck, Trash2, Wand2 } from "lucide-react";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [indent, setIndent] = useState(2);

    const formatJson = () => {
        setError(null);
        if (!input.trim()) {
            setOutput("");
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
        } catch (e: any) {
            setError(e.message || "Invalid JSON format");
            setOutput("");
        }
    };

    const minifyJson = () => {
        setError(null);
        if (!input.trim()) return;

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
        } catch (e: any) {
            setError(e.message || "Invalid JSON format");
            setOutput("");
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4 border-b border-border/50 pb-4">
                <button
                    onClick={formatJson}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Format / Beautify
                </button>
                <button
                    onClick={minifyJson}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    Minify JSON
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Indent:</label>
                    <select
                        value={indent}
                        onChange={(e) => setIndent(Number(e.target.value))}
                        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value={2}>2 Spaces</option>
                        <option value={4}>4 Spaces</option>
                        <option value={8}>8 Spaces</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium tracking-tight">Input</label>
                        <button
                            onClick={() => { setInput(""); setOutput(""); setError(null); }}
                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
                        >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Clear
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                        className="font-mono h-[400px] w-full resize-none rounded-xl border border-input bg-background p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        spellCheck="false"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium tracking-tight">Output</label>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
                        >
                            {copied ? <CheckCheck className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>

                    {error ? (
                        <div className="flex h-[400px] items-center justify-center rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive font-mono">
                            Syntax Error: {error}
                        </div>
                    ) : (
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Formatted JSON will appear here..."
                            className="font-mono h-[400px] w-full resize-none rounded-xl border border-input bg-slate-50 dark:bg-slate-900 p-4 text-sm shadow-sm focus-visible:outline-none"
                            spellCheck="false"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
