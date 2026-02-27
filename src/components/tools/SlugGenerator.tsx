"use client";

import { useState, useMemo } from "react";
import { Copy, CheckCheck, Trash2, ArrowDown } from "lucide-react";

export default function SlugGenerator() {
    const [input, setInput] = useState("");
    const [separator, setSeparator] = useState("-");
    const [lowercase, setLowercase] = useState(true);
    const [removeNumbers, setRemoveNumbers] = useState(false);
    const [maxLength, setMaxLength] = useState(0);
    const [copied, setCopied] = useState(false);

    const slug = useMemo(() => {
        let result = input.trim();
        if (!result) return "";

        // Normalize unicode characters (é -> e, ñ -> n, etc.)
        result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Convert to lowercase if option enabled
        if (lowercase) result = result.toLowerCase();

        // Remove numbers if option enabled
        if (removeNumbers) result = result.replace(/[0-9]/g, "");

        // Replace special characters and spaces with separator
        result = result
            .replace(/[^a-zA-Z0-9\s-_]/g, "")
            .replace(/[\s-_]+/g, separator)
            .replace(new RegExp(`^\\${separator}|\\${separator}$`, "g"), "");

        // Apply max length (trim at separator boundary)
        if (maxLength > 0 && result.length > maxLength) {
            result = result.substring(0, maxLength);
            const lastSep = result.lastIndexOf(separator);
            if (lastSep > 0) result = result.substring(0, lastSep);
        }

        return result;
    }, [input, separator, lowercase, removeNumbers, maxLength]);

    const handleCopy = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Options Bar */}
            <div className="flex flex-wrap items-center gap-4 border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Separator:</label>
                    <select
                        value={separator}
                        onChange={(e) => setSeparator(e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="-">Hyphen (-)</option>
                        <option value="_">Underscore (_)</option>
                        <option value=".">Dot (.)</option>
                    </select>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={lowercase}
                        onChange={(e) => setLowercase(e.target.checked)}
                        className="rounded border-input accent-primary h-4 w-4"
                    />
                    <span className="text-muted-foreground">Lowercase</span>
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={removeNumbers}
                        onChange={(e) => setRemoveNumbers(e.target.checked)}
                        className="rounded border-input accent-primary h-4 w-4"
                    />
                    <span className="text-muted-foreground">Remove numbers</span>
                </label>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Max length:</label>
                    <input
                        type="number"
                        value={maxLength || ""}
                        onChange={(e) => setMaxLength(Number(e.target.value) || 0)}
                        placeholder="∞"
                        className="h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
            </div>

            {/* Input */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium tracking-tight">Input Text</label>
                    <button
                        onClick={() => setInput("")}
                        className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
                    >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Clear
                    </button>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your title or text here, e.g. 'My Amazing Blog Post Title!'"
                    className="min-h-[120px] w-full resize-y rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
            </div>

            {/* Output */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium tracking-tight">Generated Slug</label>
                    <button
                        onClick={handleCopy}
                        disabled={!slug}
                        className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
                    >
                        {copied ? <CheckCheck className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
                <div className="min-h-[60px] w-full rounded-xl border border-input bg-slate-50 px-4 py-3 text-sm font-mono break-all">
                    {slug || <span className="text-muted-foreground">Your slug will appear here...</span>}
                </div>
                {slug && (
                    <p className="text-xs text-muted-foreground">
                        Preview URL: <code className="text-primary">https://example.com/{slug}</code> · {slug.length} characters
                    </p>
                )}
            </div>
        </div>
    );
}
