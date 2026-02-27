"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, Copy, CheckCheck, Trash2, Play } from "lucide-react";

export default function MermaidConverter() {
    const [code, setCode] = useState(`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Do Something]
    B -->|No| D[Do Something Else]
    C --> E[End]
    D --> E`);
    const [svgOutput, setSvgOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isRendering, setIsRendering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const mermaidRef = useRef<typeof import("mermaid") | null>(null);
    const renderIdRef = useRef(0);

    // Lazily load mermaid
    useEffect(() => {
        import("mermaid").then((m) => {
            m.default.initialize({
                startOnLoad: false,
                theme: "default",
                securityLevel: "loose",
                fontFamily: "system-ui, -apple-system, sans-serif",
            });
            mermaidRef.current = m;
        });
    }, []);

    const renderDiagram = useCallback(async () => {
        if (!mermaidRef.current) return;
        if (!code.trim()) {
            setSvgOutput("");
            setError(null);
            return;
        }

        setIsRendering(true);
        setError(null);

        try {
            renderIdRef.current += 1;
            const id = `mermaid-${renderIdRef.current}`;
            const { svg } = await mermaidRef.current.default.render(id, code.trim());
            setSvgOutput(svg);
        } catch (e: any) {
            setError(e.message || "Failed to render Mermaid diagram");
            setSvgOutput("");
        } finally {
            setIsRendering(false);
        }
    }, [code]);

    // Auto-render on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            renderDiagram();
        }, 500);
        return () => clearTimeout(timer);
    }, [renderDiagram]);

    const downloadAsSvg = () => {
        if (!svgOutput) return;
        const blob = new Blob([svgOutput], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mermaid-diagram.svg";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadAsPng = async () => {
        if (!svgOutput) return;

        const svgBlob = new Blob([svgOutput], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = 2; // 2x resolution
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) return;
                const pngUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = pngUrl;
                a.download = "mermaid-diagram.png";
                a.click();
                URL.revokeObjectURL(pngUrl);
            }, "image/png");
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    const handleCopySvg = () => {
        if (!svgOutput) return;
        navigator.clipboard.writeText(svgOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 border-b border-border/50 pb-4">
                <button
                    onClick={renderDiagram}
                    disabled={isRendering}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                >
                    <Play className="mr-2 h-4 w-4" />
                    {isRendering ? "Rendering..." : "Render Diagram"}
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={downloadAsSvg}
                        disabled={!svgOutput}
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        SVG
                    </button>
                    <button
                        onClick={downloadAsPng}
                        disabled={!svgOutput}
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        PNG
                    </button>
                    <button
                        onClick={handleCopySvg}
                        disabled={!svgOutput}
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    >
                        {copied ? <CheckCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? "Copied" : "Copy SVG"}
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Code Editor */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium tracking-tight">Mermaid Code</label>
                        <button
                            onClick={() => setCode("")}
                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
                        >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Clear
                        </button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={"graph TD\n    A[Start] --> B[End]"}
                        className="font-mono h-[450px] w-full resize-none rounded-xl border border-input bg-background p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        spellCheck="false"
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium tracking-tight">Preview</label>
                    {error ? (
                        <div className="flex h-[450px] items-center justify-center rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive font-mono overflow-auto">
                            <pre className="whitespace-pre-wrap">{error}</pre>
                        </div>
                    ) : svgOutput ? (
                        <div
                            ref={containerRef}
                            className="flex h-[450px] items-center justify-center rounded-xl border border-input bg-white p-4 overflow-auto"
                            dangerouslySetInnerHTML={{ __html: svgOutput }}
                        />
                    ) : (
                        <div className="flex h-[450px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                            {isRendering ? "Rendering diagram..." : "Click \"Render Diagram\" to see your diagram"}
                        </div>
                    )}
                </div>
            </div>

            {/* Examples */}
            <details className="group rounded-xl border border-border p-4">
                <summary className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                    📝 Quick Examples (click to expand)
                </summary>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { label: "Flowchart", code: "graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[OK]\n    B -->|No| D[End]" },
                        { label: "Sequence Diagram", code: "sequenceDiagram\n    Alice->>Bob: Hello\n    Bob-->>Alice: Hi back" },
                        { label: "Pie Chart", code: "pie title Languages\n    \"JS\" : 45\n    \"Python\" : 30\n    \"Go\" : 25" },
                        { label: "Class Diagram", code: "classDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal : +age int\n    Animal : +gender string" },
                        { label: "State Diagram", code: "stateDiagram-v2\n    [*] --> Active\n    Active --> Inactive\n    Inactive --> [*]" },
                        { label: "Gantt Chart", code: "gantt\n    title Project\n    dateFormat YYYY-MM-DD\n    section Phase1\n    Task1 :a1, 2024-01-01, 30d\n    Task2 :after a1, 20d" },
                    ].map((ex) => (
                        <button
                            key={ex.label}
                            onClick={() => setCode(ex.code)}
                            className="rounded-lg border border-border bg-muted/30 p-3 text-left text-xs hover:bg-muted/60 transition-colors"
                        >
                            <span className="font-semibold">{ex.label}</span>
                            <pre className="mt-1 text-muted-foreground whitespace-pre-wrap line-clamp-3">{ex.code}</pre>
                        </button>
                    ))}
                </div>
            </details>
        </div>
    );
}
