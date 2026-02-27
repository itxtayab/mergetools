"use client";

import { useState } from "react";
import { Copy, CheckCheck, RefreshCw } from "lucide-react";

export default function TextRepeater() {
    const [text, setText] = useState("");
    const [count, setCount] = useState<number>(5);
    const [separator, setSeparator] = useState("space");
    const [copied, setCopied] = useState(false);

    const repeatedText = () => {
        if (!text) return "";
        const safeCount = Math.min(Math.max(1, count || 1), 10000); // Max 10k to prevent crash

        let sepStr = "";
        if (separator === "space") sepStr = " ";
        else if (separator === "newline") sepStr = "\n";
        else if (separator === "comma") sepStr = ", ";

        return Array(safeCount).fill(text).join(sepStr);
    };

    const output = repeatedText();

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Text to Repeat</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter string here..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Times</label>
                            <input
                                type="number"
                                min="1"
                                max="10000"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Separator</label>
                            <select
                                value={separator}
                                onChange={(e) => setSeparator(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="none">None</option>
                                <option value="space">Space</option>
                                <option value="newline">New Line</option>
                                <option value="comma">Comma</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="relative flex min-h-[200px] flex-col rounded-xl border border-input overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between border-b border-input bg-muted/50 px-4 py-2">
                        <span className="text-sm font-medium">Output</span>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="inline-flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
                        >
                            {copied ? <CheckCheck className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className="flex-1 bg-transparent p-4 text-sm whitespace-pre-wrap overflow-y-auto max-h-[300px]">
                        {output || <span className="text-muted-foreground">Repeated text will appear here...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
