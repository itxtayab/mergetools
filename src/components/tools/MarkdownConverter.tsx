"use client";

import { useState, useEffect } from "react";
import { Copy, CheckCheck, Trash2, FileTerminal } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export default function MarkdownConverter() {
    const [markdown, setMarkdown] = useState("");
    const [html, setHtml] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        try {
            if (!markdown.trim()) {
                setHtml("");
                return;
            }
            // Parse markdown and strictly sanitize the resulting HTML to prevent XSS
            const dirtyHtml = marked.parse(markdown) as string;
            const cleanHtml = DOMPurify.sanitize(dirtyHtml);
            setHtml(cleanHtml);
        } catch (e) {
            setHtml("<p class='text-destructive'>Error parsing markdown.</p>");
        }
    }, [markdown]);

    const handleCopy = () => {
        if (!html) return;
        navigator.clipboard.writeText(html);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClear = () => {
        setMarkdown("");
    };

    return (
        <div className="flex flex-col gap-4 h-[600px] lg:h-[700px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">

                {/* Input Area */}
                <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <FileTerminal className="w-4 h-4 text-primary" />
                            Markdown Input
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
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="# Enter your markdown here...\n\n**Bold text**, *italic text*, and [links](https://example.com) are supported."
                        className="flex-1 w-full resize-none p-4 bg-transparent outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
                        spellCheck={false}
                    />
                </div>

                {/* Output Area (Both HTML code and Preview) */}
                <div className="flex flex-col h-[50vh] lg:h-full gap-4">

                    {/* HTML Code Output */}
                    <div className="flex flex-col flex-1 rounded-xl border border-border bg-card overflow-hidden shadow-sm relative">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50">
                            <span className="text-sm font-semibold flex items-center gap-2">
                                HTML Output
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    disabled={!html}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground bg-slate-100 hover:bg-slate-200 hover:text-foreground disabled:opacity-50 rounded-md transition-colors"
                                >
                                    {isCopied ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    {isCopied ? "Copied" : "Copy"}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-slate-50/50 overflow-auto">
                            <pre className="p-4 m-0 font-mono text-xs sm:text-sm text-foreground whitespace-pre-wrap word-break">
                                {html || <span className="text-muted-foreground/50 italic">Generated HTML will appear here...</span>}
                            </pre>
                        </div>
                    </div>

                    {/* Visual Preview */}
                    <div className="flex flex-col flex-1 rounded-xl border border-border bg-card overflow-hidden shadow-sm relative">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50">
                            <span className="text-sm font-semibold flex items-center gap-2">
                                Visual Preview
                            </span>
                        </div>
                        <div className="flex-1 w-full bg-white overflow-auto p-4">
                            {html ? (
                                <div
                                    className="prose prose-sm sm:prose-base max-w-none"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            ) : (
                                <span className="text-muted-foreground/50 italic text-sm">Visual preview will appear here...</span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
