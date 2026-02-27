"use client";

import { useState } from "react";
import { Copy, CheckCheck, Trash2 } from "lucide-react";

// Unicode character maps for different styles
const UNICODE_MAPS: Record<string, Record<string, string>> = {
    "𝐁𝐨𝐥𝐝": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D400 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D41A + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), String.fromCodePoint(0x1D7CE + i)]),
    ]),
    "𝑰𝒕𝒂𝒍𝒊𝒄": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D434 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), i === 7 ? "ℎ" : String.fromCodePoint(0x1D44E + i)]),
    ]),
    "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D468 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D482 + i)]),
    ]),
    "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D670 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D68A + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), String.fromCodePoint(0x1D7F6 + i)]),
    ]),
    "𝒮𝒸𝓇𝒾𝓅𝓉": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D49C + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D4B6 + i)]),
    ]),
    "𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D4D0 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D4EA + i)]),
    ]),
    "𝔉𝔯𝔞𝔨𝔱𝔲𝔯": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D504 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D51E + i)]),
    ]),
    "𝔻𝕠𝕦𝕓𝕝𝕖-𝕊𝕥𝕣𝕦𝕔𝕜": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D538 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D552 + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), String.fromCodePoint(0x1D7D8 + i)]),
    ]),
    "𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D5A0 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D5BA + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), String.fromCodePoint(0x1D7E2 + i)]),
    ]),
    "𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1D5D4 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1D5EE + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), String.fromCodePoint(0x1D7EC + i)]),
    ]),
    "Ⓒⓘⓡⓒⓛⓔⓓ": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x24B6 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x24D0 + i)]),
        ...Array.from({ length: 10 }, (_, i) => [String(i), i === 0 ? "⓪" : String.fromCodePoint(0x2460 + i - 1)]),
    ]),
    "🅂🅀🅄🄰🅁🄴🄳": Object.fromEntries([
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCodePoint(0x1F130 + i)]),
        ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCodePoint(0x1F130 + i)]),
    ]),
    "S̷t̷r̷i̷k̷e̷t̷h̷r̷o̷u̷g̷h̷": {},
    "U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲": {},
};

function convertText(text: string, styleName: string): string {
    if (styleName === "S̷t̷r̷i̷k̷e̷t̷h̷r̷o̷u̷g̷h̷") {
        return text.split("").map(c => c + "\u0337").join("");
    }
    if (styleName === "U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲") {
        return text.split("").map(c => c + "\u0332").join("");
    }

    const map = UNICODE_MAPS[styleName];
    if (!map) return text;

    return text.split("").map(c => map[c] || c).join("");
}

function CopyBtn({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex h-7 items-center justify-center rounded-md px-2 text-xs font-medium text-primary hover:bg-primary/10 flex-shrink-0"
        >
            {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
    );
}

export default function UnicodeTextConverter() {
    const [input, setInput] = useState("");

    const styles = Object.keys(UNICODE_MAPS);

    return (
        <div className="flex flex-col gap-6">
            {/* Input */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium tracking-tight">Enter Your Text</label>
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
                    placeholder="Type your text here to see it in fancy Unicode styles..."
                    className="min-h-[100px] w-full resize-y rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
            </div>

            {/* Results Grid */}
            {input.trim() && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {styles.map((style) => {
                        const converted = convertText(input, style);
                        return (
                            <div
                                key={style}
                                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/60 transition-colors"
                            >
                                <div className="flex flex-col gap-1 min-w-0 flex-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {style}
                                    </span>
                                    <span className="text-sm break-all leading-relaxed">
                                        {converted}
                                    </span>
                                </div>
                                <CopyBtn text={converted} />
                            </div>
                        );
                    })}
                </div>
            )}

            {!input.trim() && (
                <div className="flex items-center justify-center h-40 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                    Start typing above to see your text in 14 different Unicode styles
                </div>
            )}
        </div>
    );
}
