"use client";

import { useState } from "react";
import { Copy, CheckCheck, ArrowRightLeft } from "lucide-react";

export default function Base64Encoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);

    const processData = (text: string, currentMode: "encode" | "decode") => {
        setInput(text);
        if (!text) {
            setOutput("");
            return;
        }

        try {
            if (currentMode === "encode") {
                setOutput(btoa(unescape(encodeURIComponent(text))));
            } else {
                setOutput(decodeURIComponent(escape(atob(text))));
            }
        } catch (e) {
            setOutput("⚠️ Error: Invalid input for this operation.");
        }
    };

    const handleModeToggle = () => {
        const newMode = mode === "encode" ? "decode" : "encode";
        setMode(newMode);

        // Swap input and output for seamless transition
        const tempIn = input;
        const tempOut = output;

        if (!tempOut.startsWith("⚠️")) {
            setInput(tempOut);
            processData(tempOut, newMode);
        } else {
            processData(tempIn, newMode);
        }
    };

    const handleCopy = () => {
        if (!output || output.startsWith("⚠️")) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted p-1 border border-border/50">
                    <button
                        onClick={() => { setMode("encode"); processData(input, "encode"); }}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${mode === "encode" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Encode to Base64
                    </button>
                    <button
                        onClick={() => { setMode("decode"); processData(input, "decode"); }}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${mode === "decode" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Decode Base64
                    </button>
                </div>

                <button
                    onClick={handleModeToggle}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <ArrowRightLeft className="mr-2 h-3.5 w-3.5" />
                    Swap
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium tracking-tight text-muted-foreground">
                        {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => processData(e.target.value, mode)}
                        placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                        className="min-h-[250px] w-full resize-y rounded-xl border border-input bg-background p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        spellCheck="false"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium tracking-tight text-muted-foreground">
                            {mode === "encode" ? "Base64 Output" : "Plain Text Output"}
                        </label>
                        <button
                            onClick={handleCopy}
                            disabled={!output || output.startsWith("⚠️")}
                            className="inline-flex h-6 items-center justify-center rounded-md px-2 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
                        >
                            {copied ? <CheckCheck className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className={`flex-1 min-h-[250px] rounded-xl border border-input p-4 text-sm shadow-sm overflow-auto ${output.startsWith("⚠️") ? 'bg-destructive/10 text-destructive border-transparent' : 'bg-slate-50 break-all'} font-mono`}>
                        {output || <span className="text-muted-foreground">Output will appear here...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
