"use client";

import { useState, useMemo } from "react";
import { Copy, CheckCheck, Trash2, Eye, Code2 } from "lucide-react";

export default function TextToHtml() {
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);
    const [wrapParagraphs, setWrapParagraphs] = useState(true);
    const [convertLinks, setConvertLinks] = useState(true);
    const [preserveWhitespace, setPreserveWhitespace] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const htmlOutput = useMemo(() => {
        if (!input.trim()) return "";

        let text = input;

        // Escape HTML entities
        text = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        if (convertLinks) {
            // Convert URLs to anchor tags
            text = text.replace(
                /(https?:\/\/[^\s<]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            // Convert email addresses to mailto links
            text = text.replace(
                /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
                '<a href="mailto:$1">$1</a>'
            );
        }

        if (preserveWhitespace) {
            text = `<pre>${text}</pre>`;
        } else if (wrapParagraphs) {
            // Split by double newlines into paragraphs
            const paragraphs = text.split(/\n\s*\n/);
            text = paragraphs
                .map((p) => {
                    const inner = p.trim().replace(/\n/g, "<br>\n");
                    return `<p>${inner}</p>`;
                })
                .join("\n\n");
        } else {
            // Just convert line breaks
            text = text.replace(/\n/g, "<br>\n");
        }

        return text;
    }, [input, wrapParagraphs, convertLinks, preserveWhitespace]);

    const handleCopy = () => {
        if (!htmlOutput) return;
        navigator.clipboard.writeText(htmlOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Options Bar */}
            <div className="flex flex-wrap items-center gap-4 border-b border-border/50 pb-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={wrapParagraphs}
                        onChange={(e) => {
                            setWrapParagraphs(e.target.checked);
                            if (e.target.checked) setPreserveWhitespace(false);
                        }}
                        className="rounded border-input accent-primary h-4 w-4"
                    />
                    <span className="text-muted-foreground">Wrap in &lt;p&gt; tags</span>
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={convertLinks}
                        onChange={(e) => setConvertLinks(e.target.checked)}
                        className="rounded border-input accent-primary h-4 w-4"
                    />
                    <span className="text-muted-foreground">Auto-link URLs</span>
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={preserveWhitespace}
                        onChange={(e) => {
                            setPreserveWhitespace(e.target.checked);
                            if (e.target.checked) setWrapParagraphs(false);
                        }}
                        className="rounded border-input accent-primary h-4 w-4"
                    />
                    <span className="text-muted-foreground">Preserve whitespace (&lt;pre&gt;)</span>
                </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium tracking-tight">Plain Text Input</label>
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
                        placeholder={"Paste your plain text here...\n\nSeparate paragraphs with blank lines.\nSingle line breaks become <br> tags."}
                        className="font-mono h-[400px] w-full resize-none rounded-xl border border-input bg-transparent p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        spellCheck="false"
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium tracking-tight">
                                {showPreview ? "HTML Preview" : "HTML Output"}
                            </label>
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="inline-flex h-7 items-center justify-center rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted border border-border"
                            >
                                {showPreview ? (
                                    <><Code2 className="mr-1 h-3 w-3" /> Code</>
                                ) : (
                                    <><Eye className="mr-1 h-3 w-3" /> Preview</>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={handleCopy}
                            disabled={!htmlOutput}
                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
                        >
                            {copied ? <CheckCheck className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                            {copied ? "Copied" : "Copy HTML"}
                        </button>
                    </div>

                    {showPreview ? (
                        <div
                            className="h-[400px] w-full overflow-auto rounded-xl border border-input bg-white p-4 text-sm shadow-sm prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlOutput }}
                        />
                    ) : (
                        <textarea
                            readOnly
                            value={htmlOutput}
                            placeholder="HTML code will appear here..."
                            className="font-mono h-[400px] w-full resize-none rounded-xl border border-input bg-slate-50 p-4 text-sm shadow-sm focus-visible:outline-none"
                            spellCheck="false"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
