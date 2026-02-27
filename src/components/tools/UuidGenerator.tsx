"use client";

import { useState } from "react";
import { Copy, CheckCheck, RefreshCw, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UuidGenerator() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState<number>(5);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateUUID = () => {
        // Simple v4 UUID generator using crypto.randomUUID if available, else fallback
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const handleGenerate = () => {
        const newUuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, generateUUID);
        setUuids(newUuids);
        setCopiedIndex(null);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-end gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border/50">
                <div className="flex flex-col w-full sm:w-auto flex-1 gap-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Number of UUIDs to Generate
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-full sm:w-32 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Generate UUIDs
                </button>
            </div>

            {uuids.length > 0 && (
                <div className="flex flex-col gap-2 rounded-xl border border-border overflow-hidden bg-card shadow-sm">
                    {uuids.map((uuid, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center justify-between p-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors",
                                i !== uuids.length - 1 && "border-b border-border/50"
                            )}
                        >
                            <span className="font-mono text-sm sm:text-base text-foreground break-all mr-4">{uuid}</span>
                            <button
                                onClick={() => copyToClipboard(uuid, i)}
                                className={cn(
                                    "p-2 rounded-md transition-colors shrink-0",
                                    copiedIndex === i
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500"
                                        : "bg-slate-100 text-slate-500 hover:text-foreground dark:bg-slate-800 dark:text-slate-400 dark:hover:text-foreground"
                                )}
                                title="Copy to clipboard"
                            >
                                {copiedIndex === i ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {uuids.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-border/60">
                    <p className="text-muted-foreground">Click generate to create random UUIDs (v4).</p>
                </div>
            )}
        </div>
    );
}
