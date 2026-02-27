"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight, Copy, CheckCheck } from "lucide-react";

// ===== CONVERSION DATA =====
interface UnitDef {
    name: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
}

type CategoryDef = Record<string, UnitDef>;

const CATEGORIES: Record<string, { label: string; icon: string; units: CategoryDef }> = {
    length: {
        label: "Length",
        icon: "📏",
        units: {
            mm: { name: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            cm: { name: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
            m: { name: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
            km: { name: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            in: { name: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
            ft: { name: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
            yd: { name: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
            mi: { name: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
            nm: { name: "Nautical Mile", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
        },
    },
    weight: {
        label: "Weight",
        icon: "⚖️",
        units: {
            mg: { name: "Milligram (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
            g: { name: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            kg: { name: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
            t: { name: "Metric Ton (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            oz: { name: "Ounce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
            lb: { name: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
            st: { name: "Stone (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
        },
    },
    temperature: {
        label: "Temperature",
        icon: "🌡️",
        units: {
            c: { name: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
            f: { name: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
            k: { name: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
        },
    },
    data: {
        label: "Data",
        icon: "💾",
        units: {
            b: { name: "Byte (B)", toBase: (v) => v, fromBase: (v) => v },
            kb: { name: "Kilobyte (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
            mb: { name: "Megabyte (MB)", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
            gb: { name: "Gigabyte (GB)", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
            tb: { name: "Terabyte (TB)", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
            pb: { name: "Petabyte (PB)", toBase: (v) => v * 1125899906842624, fromBase: (v) => v / 1125899906842624 },
            bit: { name: "Bit", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
            kbit: { name: "Kilobit (Kb)", toBase: (v) => v * 128, fromBase: (v) => v / 128 },
            mbit: { name: "Megabit (Mb)", toBase: (v) => v * 131072, fromBase: (v) => v / 131072 },
        },
    },
    speed: {
        label: "Speed",
        icon: "🏎️",
        units: {
            mps: { name: "m/s", toBase: (v) => v, fromBase: (v) => v },
            kph: { name: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
            mph: { name: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
            kn: { name: "Knot (kn)", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
            ftps: { name: "ft/s", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
        },
    },
    time: {
        label: "Time",
        icon: "⏱️",
        units: {
            ms: { name: "Millisecond (ms)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            s: { name: "Second (s)", toBase: (v) => v, fromBase: (v) => v },
            min: { name: "Minute (min)", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
            hr: { name: "Hour (hr)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
            day: { name: "Day", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
            week: { name: "Week", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
            month: { name: "Month (30 days)", toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
            year: { name: "Year (365 days)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
        },
    },
    volume: {
        label: "Volume",
        icon: "🧪",
        units: {
            ml: { name: "Milliliter (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            l: { name: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
            m3: { name: "Cubic Meter (m³)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            gal: { name: "US Gallon", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
            qt: { name: "US Quart", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
            pt: { name: "US Pint", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
            cup: { name: "US Cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
            floz: { name: "US Fluid Ounce", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
            tbsp: { name: "Tablespoon", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
            tsp: { name: "Teaspoon", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
            igal: { name: "Imperial Gallon", toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
        },
    },
    area: {
        label: "Area",
        icon: "📐",
        units: {
            mm2: { name: "mm²", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
            cm2: { name: "cm²", toBase: (v) => v / 1e4, fromBase: (v) => v * 1e4 },
            m2: { name: "m²", toBase: (v) => v, fromBase: (v) => v },
            km2: { name: "km²", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
            ha: { name: "Hectare (ha)", toBase: (v) => v * 1e4, fromBase: (v) => v / 1e4 },
            in2: { name: "in²", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
            ft2: { name: "ft²", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
            ac: { name: "Acre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
            mi2: { name: "mi²", toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
        },
    },
    tip: {
        label: "Tip Calculator",
        icon: "💰",
        units: {
            _tip: { name: "Tip Calculator", toBase: (v) => v, fromBase: (v) => v },
        },
    },
};

// ===== TIP CALCULATOR =====
function TipCalculator() {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercent, setTipPercent] = useState(15);
    const [splitCount, setSplitCount] = useState(1);

    const bill = parseFloat(billAmount) || 0;
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = splitCount > 0 ? total / splitCount : total;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Bill Amount ($)</label>
                    <input
                        type="number"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        placeholder="0.00"
                        className="h-12 rounded-xl border border-input bg-background px-4 text-lg shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Split Between</label>
                    <input
                        type="number"
                        value={splitCount}
                        min={1}
                        onChange={(e) => setSplitCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="h-12 rounded-xl border border-input bg-background px-4 text-lg shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tip: {tipPercent}%</label>
                <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={tipPercent}
                    onChange={(e) => setTipPercent(Number(e.target.value))}
                    className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <div className="flex gap-2">
                        {[10, 15, 18, 20, 25].map((p) => (
                            <button
                                key={p}
                                onClick={() => setTipPercent(p)}
                                className={`rounded-md px-2 py-1 text-xs font-medium border transition-colors ${tipPercent === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                                    }`}
                            >
                                {p}%
                            </button>
                        ))}
                    </div>
                    <span>50%</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ResultCard label="Tip Amount" value={`$${tipAmount.toFixed(2)}`} />
                <ResultCard label="Total" value={`$${total.toFixed(2)}`} />
                <ResultCard label="Per Person" value={`$${perPerson.toFixed(2)}`} />
                <ResultCard label="Tip Per Person" value={`$${(tipAmount / splitCount).toFixed(2)}`} />
            </div>
        </div>
    );
}

function ResultCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/50 p-4 text-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">{label}</span>
        </div>
    );
}

// ===== MAIN COMPONENT =====
export default function UnitConverter() {
    const [activeCategory, setActiveCategory] = useState("length");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [fromValue, setFromValue] = useState("");
    const [copied, setCopied] = useState(false);

    const cat = CATEGORIES[activeCategory];
    const unitKeys = Object.keys(cat.units);

    // Set default units when category changes
    const handleCategoryChange = (catKey: string) => {
        setActiveCategory(catKey);
        const keys = Object.keys(CATEGORIES[catKey].units);
        setFromUnit(keys[0] || "");
        setToUnit(keys[1] || keys[0] || "");
        setFromValue("");
    };

    // Initialize
    useMemo(() => {
        if (!fromUnit || !cat.units[fromUnit]) {
            setFromUnit(unitKeys[0] || "");
            setToUnit(unitKeys[1] || unitKeys[0] || "");
        }
    }, [activeCategory]);

    const result = useMemo(() => {
        if (activeCategory === "tip") return "";
        const val = parseFloat(fromValue);
        if (isNaN(val) || !cat.units[fromUnit] || !cat.units[toUnit]) return "";

        const baseValue = cat.units[fromUnit].toBase(val);
        const converted = cat.units[toUnit].fromBase(baseValue);

        // Smart formatting
        if (Math.abs(converted) < 0.000001 && converted !== 0) return converted.toExponential(6);
        if (Math.abs(converted) > 1e12) return converted.toExponential(6);
        return parseFloat(converted.toPrecision(12)).toString();
    }, [fromValue, fromUnit, toUnit, activeCategory, cat]);

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(result);
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
                {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                    <button
                        key={key}
                        onClick={() => handleCategoryChange(key)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeCategory === key
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <span>{icon}</span>
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            {/* Tip Calculator or Converter */}
            {activeCategory === "tip" ? (
                <TipCalculator />
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="grid gap-4 items-end sm:grid-cols-[1fr_auto_1fr]">
                        {/* From */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">From</label>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="h-10 rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                {unitKeys.map((key) => (
                                    <option key={key} value={key}>{cat.units[key].name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={fromValue}
                                onChange={(e) => setFromValue(e.target.value)}
                                placeholder="Enter value"
                                className="h-14 rounded-xl border border-input bg-background px-4 text-2xl font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                        {/* Swap */}
                        <button
                            onClick={swapUnits}
                            className="self-center rounded-full border border-border bg-muted p-3 shadow-sm hover:bg-muted/80 transition-colors mt-4 sm:mt-0"
                            title="Swap units"
                        >
                            <ArrowLeftRight className="h-5 w-5 text-primary" />
                        </button>

                        {/* To */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">To</label>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="h-10 rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                {unitKeys.map((key) => (
                                    <option key={key} value={key}>{cat.units[key].name}</option>
                                ))}
                            </select>
                            <div className="relative">
                                <div className="h-14 flex items-center rounded-xl border border-input bg-slate-50 px-4 text-2xl font-semibold shadow-sm">
                                    {result || <span className="text-muted-foreground text-lg">Result</span>}
                                </div>
                                {result && (
                                    <button
                                        onClick={handleCopy}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 items-center justify-center rounded-md px-2 text-xs font-medium text-primary hover:bg-primary/10"
                                    >
                                        {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Formula display */}
                    {result && fromValue && (
                        <p className="text-sm text-muted-foreground text-center">
                            <span className="font-semibold text-foreground">{fromValue}</span> {cat.units[fromUnit]?.name} = <span className="font-semibold text-foreground">{result}</span> {cat.units[toUnit]?.name}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
