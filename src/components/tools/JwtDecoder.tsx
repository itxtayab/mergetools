"use client";

import { useState } from "react";
import { Copy, CheckCheck, Trash2, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JwtDecoder() {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState("");
    const [copiedSection, setCopiedSection] = useState<"header" | "payload" | null>(null);

    const decodeToken = (t: string) => {
        setToken(t);
        if (!t.trim()) {
            setHeader(null);
            setPayload(null);
            setError("");
            return;
        }

        try {
            const parts = t.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. Must contain 3 dot-separated parts.");
            }

            const decHeader = JSON.parse(atob(parts[0]));
            const decPayload = JSON.parse(atob(parts[1]));

            setHeader(decHeader);
            setPayload(decPayload);
            setError("");
        } catch (err: any) {
            setHeader(null);
            setPayload(null);
            setError("Failed to decode token. Ensure it is a valid base64-encoded JWT.");
        }
    };

    const handleCopy = (data: any, section: "header" | "payload") => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const handleClear = () => {
        setToken("");
        setHeader(null);
        setPayload(null);
        setError("");
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Input Column */}
            <div className="flex flex-col flex-1 gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-primary" />
                        Encoded JWT
                    </label>
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear
                    </button>
                </div>
                <textarea
                    value={token}
                    onChange={(e) => decodeToken(e.target.value)}
                    placeholder="Paste your JWT here (e.g. eyJhbGc...)"
                    className={cn(
                        "w-full h-40 lg:h-[500px] resize-none p-4 bg-card outline-none font-mono text-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/50",
                        error ? "border-destructive/50 focus:ring-destructive/50" : "border-border"
                    )}
                    spellCheck={false}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {/* Decoded Output Column */}
            <div className="flex flex-col flex-1 gap-6">
                {/* Header Area */}
                <div className="flex flex-col flex-1 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-rose-500/20 bg-rose-50 dark:bg-rose-900/10">
                        <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Header (Algorithm & Type)</span>
                        <button
                            onClick={() => handleCopy(header, "header")}
                            disabled={!header}
                            className="p-1.5 hover:bg-rose-200/50 dark:hover:bg-rose-800/50 rounded-md transition-colors disabled:opacity-50 text-rose-500"
                        >
                            {copiedSection === "header" ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 max-h-[200px] overflow-auto">
                        {header ? (
                            <pre className="font-mono text-sm text-foreground m-0 p-0 overflow-visible text-rose-600 dark:text-rose-400">
                                {JSON.stringify(header, null, 2)}
                            </pre>
                        ) : (
                            <span className="text-sm text-muted-foreground italic">Waiting for valid token...</span>
                        )}
                    </div>
                </div>

                {/* Payload Area */}
                <div className="flex flex-col flex-[2] rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-primary/5">
                        <span className="text-sm font-semibold text-primary">Payload (Data)</span>
                        <button
                            onClick={() => handleCopy(payload, "payload")}
                            disabled={!payload}
                            className="p-1.5 hover:bg-primary/20 rounded-md transition-colors disabled:opacity-50 text-primary"
                        >
                            {copiedSection === "payload" ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 h-full overflow-auto">
                        {payload ? (
                            <pre className="font-mono text-sm text-foreground m-0 p-0 overflow-visible text-primary">
                                {JSON.stringify(payload, null, 2)}
                            </pre>
                        ) : (
                            <span className="text-sm text-muted-foreground italic">Waiting for valid token...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
