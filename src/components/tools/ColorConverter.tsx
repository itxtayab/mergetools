"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, CheckCheck, Pipette } from "lucide-react";

// ===== COLOR CONVERSION UTILITIES =====
interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }
interface CMYK { c: number; m: number; y: number; k: number; }

function hexToRgb(hex: string): RGB | null {
    const clean = hex.replace(/^#/, "");
    if (!/^[0-9a-fA-F]{3,8}$/.test(clean)) return null;

    let r: number, g: number, b: number;
    if (clean.length === 3) {
        r = parseInt(clean[0] + clean[0], 16);
        g = parseInt(clean[1] + clean[1], 16);
        b = parseInt(clean[2] + clean[2], 16);
    } else if (clean.length >= 6) {
        r = parseInt(clean.substring(0, 2), 16);
        g = parseInt(clean.substring(2, 4), 16);
        b = parseInt(clean.substring(4, 6), 16);
    } else {
        return null;
    }

    return { r, g, b };
}

function rgbToHex(rgb: RGB): string {
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360, s = hsl.s / 100, l = hsl.l / 100;

    if (s === 0) {
        const v = Math.round(l * 255);
        return { r: v, g: v, b: v };
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
        r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, h) * 255),
        b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    };
}

function rgbToCmyk(rgb: RGB): CMYK {
    if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) return { c: 0, m: 0, y: 0, k: 100 };

    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100),
    };
}

function cmykToRgb(cmyk: CMYK): RGB {
    const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
    return {
        r: Math.round(255 * (1 - c) * (1 - k)),
        g: Math.round(255 * (1 - m) * (1 - k)),
        b: Math.round(255 * (1 - y) * (1 - k)),
    };
}

// ===== COPY BUTTON =====
function CopyField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
            <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-input bg-slate-50 px-3 py-2 text-sm font-mono">
                    {value}
                </div>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(value);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors flex-shrink-0"
                >
                    {copied ? <CheckCheck className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
            </div>
        </div>
    );
}

// ===== MAIN COMPONENT =====
export default function ColorConverter() {
    const [rgb, setRgb] = useState<RGB>({ r: 255, g: 87, b: 51 });
    const [hexInput, setHexInput] = useState("#FF5733");

    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb);
    const cmyk = rgbToCmyk(rgb);

    const updateFromHex = useCallback((value: string) => {
        setHexInput(value);
        const parsed = hexToRgb(value);
        if (parsed) setRgb(parsed);
    }, []);

    const updateFromRgb = useCallback((newRgb: Partial<RGB>) => {
        const updated = { ...rgb, ...newRgb };
        setRgb(updated);
        setHexInput(rgbToHex(updated));
    }, [rgb]);

    const updateFromHsl = useCallback((newHsl: Partial<HSL>) => {
        const updated = { ...hsl, ...newHsl };
        const newRgb = hslToRgb(updated);
        setRgb(newRgb);
        setHexInput(rgbToHex(newRgb));
    }, [hsl]);

    const updateFromCmyk = useCallback((newCmyk: Partial<CMYK>) => {
        const updated = { ...cmyk, ...newCmyk };
        const newRgb = cmykToRgb(updated);
        setRgb(newRgb);
        setHexInput(rgbToHex(newRgb));
    }, [cmyk]);

    // Sync color picker
    const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFromHex(e.target.value);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Color Preview & Picker */}
            <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                <div className="flex flex-col gap-3 flex-1">
                    <label className="text-sm font-medium">Color Preview</label>
                    <div
                        className="relative rounded-2xl border border-border shadow-lg overflow-hidden h-48 flex items-center justify-center transition-colors"
                        style={{ backgroundColor: hex }}
                    >
                        <span
                            className="font-mono text-xl font-bold px-4 py-2 rounded-lg backdrop-blur-sm"
                            style={{
                                color: hsl.l > 60 ? "#000000" : "#ffffff",
                                backgroundColor: hsl.l > 60 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)",
                            }}
                        >
                            {hex.toUpperCase()}
                        </span>
                        <label className="absolute bottom-3 right-3 cursor-pointer">
                            <input
                                type="color"
                                value={hex}
                                onChange={handleColorPicker}
                                className="sr-only"
                            />
                            <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-border px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-white transition-colors">
                                <Pipette className="h-3.5 w-3.5" />
                                Pick Color
                            </div>
                        </label>
                    </div>
                </div>

                {/* All format outputs */}
                <div className="flex flex-col gap-3 flex-1">
                    <CopyField label="HEX" value={hex.toUpperCase()} />
                    <CopyField label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
                    <CopyField label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                    <CopyField label="CMYK" value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} />
                </div>
            </div>

            {/* Input Controls */}
            <div className="grid gap-6 sm:grid-cols-2">
                {/* HEX Input */}
                <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <label className="text-sm font-semibold">HEX</label>
                    <input
                        type="text"
                        value={hexInput}
                        onChange={(e) => updateFromHex(e.target.value)}
                        placeholder="#FF5733"
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-mono shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>

                {/* RGB Inputs */}
                <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <label className="text-sm font-semibold">RGB</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["r", "g", "b"] as const).map((ch) => (
                            <div key={ch} className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">{ch}</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={255}
                                    value={rgb[ch]}
                                    onChange={(e) => updateFromRgb({ [ch]: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                                    className="h-9 rounded-lg border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* HSL Inputs */}
                <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <label className="text-sm font-semibold">HSL</label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">H</label>
                            <input
                                type="number"
                                min={0}
                                max={360}
                                value={hsl.h}
                                onChange={(e) => updateFromHsl({ h: Math.min(360, Math.max(0, parseInt(e.target.value) || 0)) })}
                                className="h-9 rounded-lg border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        {(["s", "l"] as const).map((ch) => (
                            <div key={ch} className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">{ch}</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={hsl[ch]}
                                    onChange={(e) => updateFromHsl({ [ch]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                                    className="h-9 rounded-lg border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CMYK Inputs */}
                <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <label className="text-sm font-semibold">CMYK</label>
                    <div className="grid grid-cols-4 gap-2">
                        {(["c", "m", "y", "k"] as const).map((ch) => (
                            <div key={ch} className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">{ch}</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={cmyk[ch]}
                                    onChange={(e) => updateFromCmyk({ [ch]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                                    className="h-9 rounded-lg border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HSL Sliders */}
            <div className="rounded-xl border border-border p-4 flex flex-col gap-4">
                <label className="text-sm font-semibold">HSL Sliders</label>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground w-5">H</span>
                        <input
                            type="range"
                            min={0}
                            max={360}
                            value={hsl.h}
                            onChange={(e) => updateFromHsl({ h: Number(e.target.value) })}
                            className="flex-1 accent-primary"
                            style={{
                                background: `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))`,
                            }}
                        />
                        <span className="text-xs font-mono w-10 text-right">{hsl.h}°</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground w-5">S</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={hsl.s}
                            onChange={(e) => updateFromHsl({ s: Number(e.target.value) })}
                            className="flex-1 accent-primary"
                        />
                        <span className="text-xs font-mono w-10 text-right">{hsl.s}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground w-5">L</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={hsl.l}
                            onChange={(e) => updateFromHsl({ l: Number(e.target.value) })}
                            className="flex-1 accent-primary"
                        />
                        <span className="text-xs font-mono w-10 text-right">{hsl.l}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
