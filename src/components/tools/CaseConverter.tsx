"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

export default function CaseConverter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toSentenceCase = () => {
        const convert = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        setText(convert);
    };

    const toLowerCase = () => setText(text.toLowerCase());
    const toUpperCase = () => setText(text.toUpperCase());

    const toTitleCase = () => {
        const convert = text.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        setText(convert);
    };

    const toAlternatingCase = () => {
        const convert = text.toLowerCase().split('').map((char, index) =>
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        setText(convert);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 pb-2">
                <Button onClick={toSentenceCase}>Sentence case</Button>
                <Button onClick={toLowerCase}>lower case</Button>
                <Button onClick={toUpperCase}>UPPER CASE</Button>
                <Button onClick={toTitleCase}>Title Case</Button>
                <Button onClick={toAlternatingCase}>aLtErNaTiNg cAsE</Button>
            </div>

            <div className="relative min-h-[300px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here to convert case..."
                    className="h-full min-h-[300px] w-full resize-y rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => setText("")}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    Clear
                </button>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    {copied ? <CheckCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
            </div>
        </div>
    );
}

function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 h-10"
        >
            {children}
        </button>
    );
}
