"use client";

import { useState } from "react";

export default function WordCounter() {
    const [text, setText] = useState("");

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                <StatCard label="Words" value={words} />
                <StatCard label="Characters" value={chars} />
                <StatCard label="Without Spaces" value={charsNoSpaces} />
                <StatCard label="Sentences" value={sentences} />
                <StatCard label="Paragraphs" value={paragraphs} />
            </div>

            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here to count words..."
                    className="min-h-[300px] w-full resize-y rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground">
                    {words} words | {chars} chars
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => setText("")}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    Clear Text
                </button>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/50 p-4 text-center">
            <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">
                {label}
            </span>
        </div>
    );
}
