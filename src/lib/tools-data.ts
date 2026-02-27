import { type Metadata } from "next";

export type ToolCategory = "text-tools" | "developer-tools";

export interface ToolItem {
    slug: string;
    name: string;
    description: string;
    category: ToolCategory;
    metaTitle: string;
    metaDescription: string;
}

export const CATEGORIES: Record<ToolCategory, { name: string; description: string }> = {
    "text-tools": {
        name: "Text Tools",
        description: "Free online text formatting and processing tools.",
    },
    "developer-tools": {
        name: "Developer Tools",
        description: "Essential utilities for developers and programmers.",
    },
};

export const toolsData: ToolItem[] = [
    // Text Tools
    {
        slug: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, sentences and paragraphs instantly.",
        category: "text-tools",
        metaTitle: "Word Counter - Count Words & Characters Online Free",
        metaDescription: "Free online word counter tool. Count words, characters, sentences, and paragraphs.",
    },
    {
        slug: "case-converter",
        name: "Case Converter",
        description: "Convert text between uppercase, lowercase, title case, and more.",
        category: "text-tools",
        metaTitle: "Case Converter - Change Text Case Online",
        metaDescription: "Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case online.",
    },
    {
        slug: "text-repeater",
        name: "Text Repeater",
        description: "Repeat text or words multiple times quickly and easily.",
        category: "text-tools",
        metaTitle: "Text Repeater - Repeat Words Online",
        metaDescription: "A simple and free online tool to repeat any text or word multiple times instantly.",
    },
    {
        slug: "lorem-ipsum-generator",
        name: "Lorem Ipsum Generator",
        description: "Generate dummy placeholder text for your designs and layouts.",
        category: "text-tools",
        metaTitle: "Lorem Ipsum Generator - Dummy Text Online",
        metaDescription: "Free online Lorem Ipsum generator. Create placeholder text for web design, mockups, and printing.",
    },
    {
        slug: "markdown-converter",
        name: "Markdown Converter",
        description: "Convert Markdown syntax to clean HTML instantly.",
        category: "text-tools",
        metaTitle: "Markdown to HTML Converter Online",
        metaDescription: "Fast, real-time Markdown to HTML converter with instant preview and clean HTML code output.",
    },
    {
        slug: "text-diff",
        name: "Text Diff / Compare",
        description: "Compare two pieces of text to find differences and similarities.",
        category: "text-tools",
        metaTitle: "Text Compare - Online Diff Tool",
        metaDescription: "Compare text online to find differences. A powerful text diff tool to check for modifications.",
    },

    // Developer Tools
    {
        slug: "json-formatter",
        name: "JSON Formatter",
        description: "Format, beautiful and validate JSON data instantly.",
        category: "developer-tools",
        metaTitle: "JSON Formatter & Validator - Format JSON Online",
        metaDescription: "Free online JSON formatter and validator. Beautify, format, and parse JSON code.",
    },
    {
        slug: "base64-encode-decode",
        name: "Base64 Encoder / Decoder",
        description: "Encode text to Base64 format or decode from it.",
        category: "developer-tools",
        metaTitle: "Base64 Encode and Decode Online Tool",
        metaDescription: "Fast and secure online tool to encode and decode text to and from Base64 format.",
    },
    {
        slug: "url-encode-decode",
        name: "URL Encoder / Decoder",
        description: "Safely encode URL components or decode URL-encoded strings.",
        category: "developer-tools",
        metaTitle: "URL Encoder & Decoder - Online Tool",
        metaDescription: "Free online URL encoder and decoder tool to encode reserved characters in URLs easily.",
    },
    {
        slug: "uuid-generator",
        name: "UUID / GUID Generator",
        description: "Generate random UUIDs (Universally Unique Identifiers) instantly.",
        category: "developer-tools",
        metaTitle: "Random UUID & GUID Generator Online",
        metaDescription: "Free online tool to quickly generate secure random UUIDs (v4) and GUIDs for your applications.",
    },
    {
        slug: "html-minifier",
        name: "HTML Minifier",
        description: "Compress HTML code by removing whitespace and comments.",
        category: "developer-tools",
        metaTitle: "HTML Minifier & Compressor Online",
        metaDescription: "Minify HTML code online to reduce file size and improve website loading speed.",
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode JSON Web Tokens and view header and payload data.",
        category: "developer-tools",
        metaTitle: "JWT Decoder & Viewer Online",
        metaDescription: "Free online tool to securely decode JWT tokens and inspect claims and payload information without sending to server.",
    },

    // Text Tools (New)
    {
        slug: "slug-generator",
        name: "Slug Generator",
        description: "Convert any text or title into a clean, SEO-friendly URL slug.",
        category: "text-tools",
        metaTitle: "Slug Generator - Create SEO-Friendly URL Slugs Online",
        metaDescription: "Free online slug generator tool. Convert titles, headlines, or any text into clean, URL-safe slugs for SEO-friendly web addresses.",
    },
    {
        slug: "text-to-html",
        name: "Text to HTML Converter",
        description: "Convert plain text with line breaks into properly formatted HTML code.",
        category: "text-tools",
        metaTitle: "Text to HTML Converter - Plain Text to HTML Online",
        metaDescription: "Free online tool to convert plain text to HTML. Automatically wraps paragraphs, converts line breaks to tags, and generates clean HTML code.",
    },
    {
        slug: "unicode-text-converter",
        name: "Unicode Text Converter",
        description: "Transform text into fancy Unicode fonts for social media and bios.",
        category: "text-tools",
        metaTitle: "Fancy Text Generator - Unicode Text Converter Online",
        metaDescription: "Free fancy text generator with 15+ Unicode font styles. Create bold, italic, cursive, gothic, and decorative text for Instagram, Twitter, and more.",
    },

    // Developer Tools (New)
    {
        slug: "mermaid-converter",
        name: "Mermaid Diagram Converter",
        description: "Render Mermaid diagram code into downloadable PNG or SVG images.",
        category: "developer-tools",
        metaTitle: "Mermaid Diagram to Image Converter - PNG & SVG Online",
        metaDescription: "Free online Mermaid diagram converter. Write Mermaid code and instantly render flowcharts, sequence diagrams, and more as downloadable PNG or SVG images.",
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Convert between all units: length, weight, temperature, data, speed, time, volume, and more.",
        category: "developer-tools",
        metaTitle: "Unit Converter - Convert Length, Weight, Temperature & More Online",
        metaDescription: "Free all-in-one unit converter. Convert distance, weight, temperature, data storage, speed, time, volume, area, and calculate tips instantly.",
    },
    {
        slug: "color-converter",
        name: "Color Code Converter",
        description: "Convert and pick colors between HEX, RGB, HSL, and CMYK formats.",
        category: "developer-tools",
        metaTitle: "Color Converter - HEX to RGB, HSL, CMYK Online Tool",
        metaDescription: "Free online color converter with visual picker. Convert between HEX, RGB, HSL, and CMYK color formats instantly with live preview.",
    },
];

export function getToolsByCategory(category: ToolCategory): ToolItem[] {
    return toolsData.filter((tool) => tool.category === category);
}

export function getToolBySlug(slug: string): ToolItem | undefined {
    return toolsData.find((tool) => tool.slug === slug);
}
