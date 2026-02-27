import { type Metadata } from "next";

export type ToolCategory = "text-tools" | "developer-tools";

export interface FAQ {
    question: string;
    answer: string;
}

export interface ToolItem {
    slug: string;
    name: string;
    description: string;
    category: ToolCategory;
    metaTitle: string;
    metaDescription: string;
    howToUse: string[];
    about: string;
    faqs: FAQ[];
    relatedSlugs: string[];
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
    // ==================== TEXT TOOLS ====================
    {
        slug: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, sentences and paragraphs instantly.",
        category: "text-tools",
        metaTitle: "Word Counter - Count Words & Characters Online Free",
        metaDescription: "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for essays, blog posts, and social media.",
        howToUse: [
            "Paste or type your text into the input area above.",
            "View real-time statistics including word count, character count (with and without spaces), sentence count, and paragraph count.",
            "Use the 'Clear Text' button to reset and start a new count."
        ],
        about: "The Word Counter is a fast, reliable tool for counting words, characters, sentences, and paragraphs in any text. Whether you're writing a blog post with a specific word count target, crafting a tweet within character limits, or preparing an essay with length requirements, this tool provides instant, accurate statistics. Unlike other word counters, this tool processes everything locally in your browser — your text never leaves your device, ensuring complete privacy. It correctly handles edge cases like multiple spaces, line breaks, and special characters to give you the most accurate count possible. Writers, students, content marketers, and social media managers rely on word counters daily to ensure their content meets platform-specific length requirements.",
        faqs: [
            { question: "How does the word counter handle multiple spaces?", answer: "Our word counter intelligently collapses multiple consecutive spaces into one, so extra spacing won't inflate your word count. It uses the same word boundary detection used by professional writing software." },
            { question: "Does the character count include spaces?", answer: "We display both counts: total characters (including spaces) and characters without spaces. This is useful for platforms like Twitter that count all characters, as well as for SMS messages where space-free counts matter." },
            { question: "Can I use this for academic writing?", answer: "Absolutely! The word counter is perfect for essays, research papers, and dissertations where you need to meet minimum or maximum word count requirements. It also counts sentences and paragraphs for structure analysis." },
            { question: "Is my text stored or sent to a server?", answer: "No. The Word Counter runs 100% client-side in your browser. Your text is never transmitted to any server, ensuring complete privacy and data security." }
        ],
        relatedSlugs: ["case-converter", "text-repeater", "text-to-html", "slug-generator"]
    },
    {
        slug: "case-converter",
        name: "Case Converter",
        description: "Convert text between uppercase, lowercase, title case, and more.",
        category: "text-tools",
        metaTitle: "Case Converter - Change Text Case Online",
        metaDescription: "Easily convert text to UPPERCASE, lowercase, Title Case, or Sentence case online. Free, instant, and private.",
        howToUse: [
            "Paste or type your text into the input field.",
            "Click the desired case conversion button: UPPERCASE, lowercase, Title Case, Sentence case, or more.",
            "Copy the converted result to your clipboard with one click."
        ],
        about: "The Case Converter is an essential formatting tool that lets you instantly transform text between different cases. Convert to UPPERCASE for headings and emphasis, lowercase for standardizing text, Title Case for proper headings and titles, or Sentence case for natural-looking paragraphs. This tool is invaluable for writers editing copy that was accidentally typed in the wrong case, developers formatting variable names, and content creators standardizing text across platforms. Don't waste time manually retyping text — convert it instantly. All processing happens in your browser for maximum speed and privacy.",
        faqs: [
            { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of each word while keeping the rest lowercase. For example, 'the quick brown fox' becomes 'The Quick Brown Fox'. It's the standard format for book titles, article headlines, and headings." },
            { question: "What's the difference between Sentence case and Title Case?", answer: "Sentence case only capitalizes the first letter of the first word (like a normal sentence), while Title Case capitalizes the first letter of every word. Sentence case is used for body text, while Title Case is used for titles and headings." },
            { question: "Can I convert text with special characters?", answer: "Yes! The Case Converter preserves all special characters, numbers, and punctuation while only changing the letter casing. Emojis, symbols, and non-Latin characters remain untouched." }
        ],
        relatedSlugs: ["word-counter", "unicode-text-converter", "slug-generator", "text-repeater"]
    },
    {
        slug: "text-repeater",
        name: "Text Repeater",
        description: "Repeat text or words multiple times quickly and easily.",
        category: "text-tools",
        metaTitle: "Text Repeater - Repeat Words Online",
        metaDescription: "A simple and free online tool to repeat any text or word multiple times instantly. Perfect for testing and content generation.",
        howToUse: [
            "Enter the text or word you want to repeat in the input field.",
            "Set the number of repetitions and choose a separator (new line, space, comma, or custom).",
            "Click 'Generate' to create the repeated text, then copy it to your clipboard."
        ],
        about: "The Text Repeater lets you duplicate any text string multiple times with customizable separators. This is perfect for generating test data, creating repeated patterns for design work, filling placeholders in templates, or producing bulk content for testing purposes. You can choose to separate repetitions with new lines, spaces, commas, or any custom separator of your choice. Developers frequently use text repeaters for stress-testing input fields, generating sample data for databases, and creating mock content. The tool handles large repetition counts efficiently, processing everything client-side without any server delays.",
        faqs: [
            { question: "Is there a limit to how many times I can repeat text?", answer: "The tool supports up to 10,000 repetitions. For very large counts, processing happens instantly in your browser since there's no server round-trip involved." },
            { question: "Can I use custom separators between repetitions?", answer: "Yes! You can choose from preset separators (new line, space, comma) or enter any custom separator text between repetitions. This makes it flexible for generating CSV data, code arrays, or formatted lists." },
            { question: "What are common use cases for a text repeater?", answer: "Common uses include generating test data for software development, creating filler content for design mockups, stress-testing input validation, generating bulk SQL insert statements, and creating repeated patterns for social media posts." }
        ],
        relatedSlugs: ["word-counter", "lorem-ipsum-generator", "case-converter", "text-to-html"]
    },
    {
        slug: "lorem-ipsum-generator",
        name: "Lorem Ipsum Generator",
        description: "Generate dummy placeholder text for your designs and layouts.",
        category: "text-tools",
        metaTitle: "Lorem Ipsum Generator - Dummy Text Online",
        metaDescription: "Free online Lorem Ipsum generator. Create placeholder text for web design, mockups, and printing layouts.",
        howToUse: [
            "Select the type of output you need: paragraphs, sentences, or words.",
            "Set the desired count using the number input.",
            "Click 'Generate' to create your Lorem Ipsum text, then copy it for use in your project."
        ],
        about: "The Lorem Ipsum Generator creates professional placeholder text for designers, developers, and content creators. Lorem Ipsum has been the industry's standard dummy text since the 1500s, used by typesetters and now by web designers and graphic artists worldwide. Our generator creates authentic Latin-based placeholder text that looks natural and professional in any layout. Use it for website mockups, print designs, presentations, or any project where you need realistic-looking text without the distraction of meaningful content. The generated text maintains proper sentence structure, paragraph breaks, and word distribution for a natural appearance.",
        faqs: [
            { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is dummy text that has been used as placeholder content in the printing and typesetting industry since the 1500s. It derives from 'De Finibus Bonorum et Malorum' by Cicero, a treatise on ethics written in 45 BC." },
            { question: "Why use Lorem Ipsum instead of regular text?", answer: "Lorem Ipsum allows designers and clients to focus on the visual design elements without being distracted by reading actual content. It also provides a realistic representation of how text will flow in the final design." },
            { question: "Can I generate a specific number of words?", answer: "Yes! You can generate Lorem Ipsum by paragraphs, sentences, or an exact number of words to precisely fit your layout requirements." }
        ],
        relatedSlugs: ["text-repeater", "word-counter", "markdown-converter", "text-to-html"]
    },
    {
        slug: "markdown-converter",
        name: "Markdown Converter",
        description: "Convert Markdown syntax to clean HTML instantly.",
        category: "text-tools",
        metaTitle: "Markdown to HTML Converter Online",
        metaDescription: "Fast, real-time Markdown to HTML converter with instant preview and clean HTML code output.",
        howToUse: [
            "Write or paste your Markdown text in the left editor panel.",
            "View the live HTML preview on the right panel in real-time as you type.",
            "Switch between rendered preview and raw HTML code view, then copy the output."
        ],
        about: "The Markdown Converter transforms Markdown syntax into clean, standards-compliant HTML in real-time. Markdown is the preferred writing format for developers, technical writers, and content creators because of its simplicity and readability. Our converter supports the full Markdown specification including headings, bold, italic, links, images, code blocks, lists, tables, and blockquotes. The live preview panel shows exactly how your content will render, while the code view gives you the raw HTML to paste into your website, CMS, or email templates. Whether you're writing README files, blog posts, or documentation, this tool makes the Markdown-to-HTML workflow seamless.",
        faqs: [
            { question: "What Markdown features are supported?", answer: "Our converter supports the full CommonMark specification including headings (H1-H6), bold, italic, strikethrough, links, images, ordered and unordered lists, code blocks with syntax highlighting, tables, blockquotes, and horizontal rules." },
            { question: "Can I use this for GitHub README files?", answer: "Yes! Our converter handles GitHub-Flavored Markdown (GFM) including tables, task lists, and fenced code blocks. This makes it perfect for previewing your README before committing." },
            { question: "Is the generated HTML clean and semantic?", answer: "Absolutely. The converter produces clean, semantic HTML5 without unnecessary inline styles or proprietary attributes. The output is ready to use in any web project or CMS." }
        ],
        relatedSlugs: ["text-to-html", "lorem-ipsum-generator", "html-minifier", "text-diff"]
    },
    {
        slug: "text-diff",
        name: "Text Diff / Compare",
        description: "Compare two pieces of text to find differences and similarities.",
        category: "text-tools",
        metaTitle: "Text Compare - Online Diff Tool",
        metaDescription: "Compare text online to find differences. A powerful text diff tool to check for modifications quickly.",
        howToUse: [
            "Paste the original text in the left panel and the modified text in the right panel.",
            "Click 'Compare' to instantly highlight the differences between the two texts.",
            "Review the color-coded diff output: green for additions, red for deletions, and unchanged text in the default color."
        ],
        about: "The Text Diff tool lets you compare two pieces of text side-by-side to instantly spot every difference. Whether you're reviewing code changes, comparing document versions, checking translations, or auditing content edits, this tool provides a clear, color-coded visualization of all insertions, deletions, and modifications. It uses the same diff algorithm trusted by professional version control systems like Git. The tool supports character-level and line-level comparison modes, making it suitable for both prose editing and code review. All comparison happens locally in your browser for speed and privacy — your documents never leave your device.",
        faqs: [
            { question: "How does the diff comparison work?", answer: "The tool uses an advanced longest-common-subsequence algorithm (the same one used in Git) to find the minimal set of changes between two texts. It then highlights additions in green and deletions in red for easy visual review." },
            { question: "Can I compare code files?", answer: "Yes! The tool works excellently for comparing code snippets, configuration files, or any structured text. It preserves whitespace and indentation, which is critical for code comparison." },
            { question: "Is there a size limit for text comparison?", answer: "The tool can handle large texts efficiently, but for optimal performance we recommend texts under 100,000 characters per panel. Since processing is done in your browser, performance depends on your device's capabilities." }
        ],
        relatedSlugs: ["word-counter", "markdown-converter", "case-converter", "text-to-html"]
    },
    {
        slug: "slug-generator",
        name: "Slug Generator",
        description: "Convert any text or title into a clean, SEO-friendly URL slug.",
        category: "text-tools",
        metaTitle: "Slug Generator - Create SEO-Friendly URL Slugs Online",
        metaDescription: "Free online slug generator tool. Convert titles, headlines, or any text into clean, URL-safe slugs for SEO-friendly web addresses.",
        howToUse: [
            "Type or paste the title, headline, or any text you want to convert into the input field.",
            "Customize options: choose a separator (hyphen, underscore, or dot), toggle lowercase, remove numbers, or set a max length.",
            "The slug is generated in real-time below the input. Copy it and use it in your website URLs."
        ],
        about: "The Slug Generator converts any text into a clean, SEO-friendly URL slug that's safe to use in web addresses. A good URL slug is crucial for search engine optimization (SEO) because it tells both users and search engines what the page is about. Our generator automatically handles Unicode normalization (converting accented characters like 'é' to 'e'), removes special characters, and replaces spaces with your chosen separator. You can customize the separator style (hyphens for SEO, underscores for file names, dots for versioning), enforce lowercase, remove numbers, and set a maximum character length. The tool even previews the full URL so you can see exactly how your slug will look in the browser's address bar.",
        faqs: [
            { question: "What is a URL slug?", answer: "A URL slug is the part of a web address that comes after the domain name and identifies a specific page in a human-readable form. For example, in 'example.com/my-awesome-blog-post', the slug is 'my-awesome-blog-post'." },
            { question: "Why are hyphens preferred over underscores in slugs?", answer: "Google treats hyphens as word separators but treats underscores as word joiners. So 'my-blog-post' is seen as three words by Google, while 'my_blog_post' is treated as one word. Using hyphens is the SEO best practice." },
            { question: "Does the slug generator handle non-English characters?", answer: "Yes! The generator normalizes Unicode characters, converting accented letters like 'ü', 'ñ', and 'é' to their ASCII equivalents ('u', 'n', 'e'). This ensures your slugs are universally compatible." },
            { question: "What's the ideal slug length for SEO?", answer: "Google displays up to about 60 characters in search results. Most SEO experts recommend keeping slugs under 60 characters and using 3-5 descriptive words. Our max length option helps you enforce this limit." }
        ],
        relatedSlugs: ["word-counter", "case-converter", "text-to-html", "unicode-text-converter"]
    },
    {
        slug: "text-to-html",
        name: "Text to HTML Converter",
        description: "Convert plain text with line breaks into properly formatted HTML code.",
        category: "text-tools",
        metaTitle: "Text to HTML Converter - Plain Text to HTML Online",
        metaDescription: "Free online tool to convert plain text to HTML. Automatically wraps paragraphs, converts line breaks to tags, and generates clean HTML code.",
        howToUse: [
            "Paste or type your plain text in the left input panel. Use blank lines to separate paragraphs.",
            "Configure formatting options: enable paragraph wrapping (<p> tags), auto-linking of URLs, or whitespace preservation (<pre> tags).",
            "View the generated HTML code on the right panel. Toggle between code view and rendered preview, then copy the HTML."
        ],
        about: "The Text to HTML Converter transforms plain text into properly structured HTML code, automatically handling paragraph wrapping, line break conversion, and URL detection. This tool is essential for web developers, email marketers, and content managers who need to quickly convert text content into web-ready HTML. It intelligently detects paragraph boundaries from blank lines and wraps them in <p> tags, converts single line breaks to <br> tags, and can automatically convert URLs and email addresses into clickable links. The whitespace preservation mode wraps content in <pre> tags for code and formatted text. HTML entities are properly escaped to prevent rendering issues and XSS vulnerabilities.",
        faqs: [
            { question: "How are paragraphs detected?", answer: "The tool identifies paragraphs by looking for double line breaks (blank lines) between text blocks. Each block is wrapped in <p> tags. Single line breaks within a paragraph are converted to <br> tags." },
            { question: "Does it auto-detect and link URLs?", answer: "Yes! When the 'Auto-link URLs' option is enabled, the tool automatically detects http/https URLs and email addresses in your text and converts them to clickable <a> tags with proper target='_blank' and rel='noopener noreferrer' attributes." },
            { question: "Are HTML special characters escaped?", answer: "Yes, the converter properly escapes characters like <, >, &, and quotes to their HTML entity equivalents (&lt;, &gt;, &amp;, &quot;). This prevents broken rendering and protects against cross-site scripting (XSS)." }
        ],
        relatedSlugs: ["markdown-converter", "html-minifier", "slug-generator", "word-counter"]
    },
    {
        slug: "unicode-text-converter",
        name: "Unicode Text Converter",
        description: "Transform text into fancy Unicode fonts for social media and bios.",
        category: "text-tools",
        metaTitle: "Fancy Text Generator - Unicode Text Converter Online",
        metaDescription: "Free fancy text generator with 14+ Unicode font styles. Create bold, italic, cursive, gothic, and decorative text for Instagram, Twitter, and more.",
        howToUse: [
            "Type or paste your text in the input field at the top of the tool.",
            "Instantly see your text converted into 14 different Unicode font styles including Bold, Italic, Script, Fraktur, Double-Struck, Circled, and more.",
            "Click the copy button next to any style to copy it to your clipboard for use in social media bios, posts, and messages."
        ],
        about: "The Unicode Text Converter transforms ordinary text into stylish Unicode characters that work across all platforms — Instagram, Twitter/X, Facebook, TikTok, WhatsApp, Discord, and more. Unlike regular fonts that only work on specific websites, Unicode characters are part of the universal character standard, meaning they display correctly everywhere that supports text. Choose from 14 unique styles including 𝐁𝐨𝐥𝐝, 𝑰𝒕𝒂𝒍𝒊𝒄, 𝒮𝒸𝓇𝒾𝓅𝓉, 𝔉𝔯𝔞𝔨𝔱𝔲𝔯 (Gothic), 𝕆𝕦𝕥𝕝𝕚𝕟𝕖, Ⓒⓘⓡⓒⓛⓔⓓ, 🅂🅀🅄🄰🅁🄴🄳, S̷t̷r̷i̷k̷e̷t̷h̷r̷o̷u̷g̷h̷, and U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲. Each style has a one-click copy button for instant use. This is the go-to tool for creating eye-catching social media bios, unique usernames, and decorative text without any software installation.",
        faqs: [
            { question: "Will these fancy fonts work on Instagram and Twitter?", answer: "Yes! Unicode characters are universally supported across all major social media platforms including Instagram bios and captions, Twitter/X posts, Facebook, TikTok, WhatsApp, Telegram, and Discord. They work because they're actual Unicode characters, not custom fonts." },
            { question: "Why do some characters not convert?", answer: "Unicode mathematical symbol fonts only cover the Latin alphabet (A-Z, a-z) and sometimes digits (0-9). Numbers, punctuation, and non-Latin characters (like Chinese, Arabic, or Cyrillic) will remain unchanged in the converted output." },
            { question: "Are these characters accessible for screen readers?", answer: "Screen readers may have difficulty interpreting some Unicode styles, particularly Fraktur and Circled characters. For accessibility, we recommend using these styles sparingly for decorative purposes rather than for important information." },
            { question: "What's the difference between this and changing fonts?", answer: "Regular fonts only change how text looks on a specific website or app. Unicode characters are part of the universal text standard — they look the same everywhere they're pasted. That's why they work on platforms that don't allow custom fonts." }
        ],
        relatedSlugs: ["case-converter", "slug-generator", "word-counter", "text-repeater"]
    },

    // ==================== DEVELOPER TOOLS ====================
    {
        slug: "json-formatter",
        name: "JSON Formatter",
        description: "Format, beautify and validate JSON data instantly.",
        category: "developer-tools",
        metaTitle: "JSON Formatter & Validator - Format JSON Online",
        metaDescription: "Free online JSON formatter and validator. Beautify, format, minify, and parse JSON code with error highlighting.",
        howToUse: [
            "Paste your raw or minified JSON data into the left input panel.",
            "Click 'Format / Beautify' to pretty-print your JSON with proper indentation, or 'Minify JSON' to compress it.",
            "If your JSON has syntax errors, you'll see a clear error message with details. Copy the formatted output when ready."
        ],
        about: "The JSON Formatter is a powerful tool for developers who work with JSON data daily. It validates, formats (beautifies), and minifies JSON with a single click. Paste any JSON — from API responses, configuration files, database exports, or log outputs — and instantly get clean, properly indented output. The validator catches syntax errors like missing commas, unclosed brackets, and invalid values, displaying clear error messages to help you debug quickly. Choose between 2-space, 4-space, or 8-space indentation to match your project's code style. The minify feature removes all whitespace to produce the most compact JSON possible, perfect for reducing payload sizes. All processing happens client-side in your browser, so your sensitive API keys and data never leave your device.",
        faqs: [
            { question: "What types of JSON errors can this detect?", answer: "The formatter detects all JSON syntax errors including missing or extra commas, unclosed brackets and braces, unquoted property names, single quotes instead of double quotes, trailing commas, and invalid escape sequences." },
            { question: "Can I format large JSON files?", answer: "Yes! The tool handles large JSON files efficiently since processing happens in your browser. For files over 10MB, performance depends on your device, but typical API responses and config files are processed instantly." },
            { question: "What's the difference between format and minify?", answer: "Format (beautify) adds proper indentation and line breaks to make JSON human-readable. Minify does the opposite — it removes all unnecessary whitespace to produce the smallest possible output, reducing file size for production use." },
            { question: "Is my JSON data secure?", answer: "Completely secure. The JSON Formatter processes everything locally in your browser. No data is ever sent to any server, making it safe for formatting JSON containing API keys, tokens, or sensitive configuration." }
        ],
        relatedSlugs: ["base64-encode-decode", "jwt-decoder", "html-minifier", "url-encode-decode"]
    },
    {
        slug: "base64-encode-decode",
        name: "Base64 Encoder / Decoder",
        description: "Encode text to Base64 format or decode from it.",
        category: "developer-tools",
        metaTitle: "Base64 Encode and Decode Online Tool",
        metaDescription: "Fast and secure online tool to encode and decode text to and from Base64 format. Client-side processing for privacy.",
        howToUse: [
            "Enter or paste the text you want to encode in the input field.",
            "Click 'Encode' to convert your text to Base64 format, or paste a Base64 string and click 'Decode' to convert it back to readable text.",
            "Copy the result with the copy button. The tool handles UTF-8 text correctly."
        ],
        about: "The Base64 Encoder/Decoder converts text to and from Base64 encoding instantly. Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format, widely used in web development, email protocols (MIME), data URLs, and API authentication. Developers use Base64 to embed images in CSS/HTML (data URIs), encode API credentials for HTTP Basic Authentication, transmit binary data through text-only channels, and encode/decode JWT token payloads. Our tool handles UTF-8 text correctly, ensuring that international characters, emojis, and special symbols are properly encoded and decoded. All processing happens client-side for security.",
        faqs: [
            { question: "What is Base64 encoding used for?", answer: "Base64 is used to safely transmit binary data through text-based protocols. Common uses include embedding images in HTML/CSS, encoding email attachments (MIME), HTTP Basic Authentication headers, encoding JWT payloads, and storing binary data in JSON or XML." },
            { question: "Does Base64 encoding make data secure?", answer: "No! Base64 is NOT encryption. It's a reversible encoding scheme that anyone can decode. Never use Base64 to protect sensitive information. Use proper encryption (AES, RSA) for security." },
            { question: "Why does Base64 increase file size?", answer: "Base64 encoding increases data size by approximately 33% because it represents every 3 bytes of binary data as 4 ASCII characters. This trade-off is accepted for the convenience of text-safe transmission." }
        ],
        relatedSlugs: ["url-encode-decode", "jwt-decoder", "json-formatter", "uuid-generator"]
    },
    {
        slug: "url-encode-decode",
        name: "URL Encoder / Decoder",
        description: "Safely encode URL components or decode URL-encoded strings.",
        category: "developer-tools",
        metaTitle: "URL Encoder & Decoder - Online Tool",
        metaDescription: "Free online URL encoder and decoder tool to encode reserved characters in URLs easily and decode percent-encoded strings.",
        howToUse: [
            "Enter the URL or text you want to encode in the input field.",
            "Click 'Encode' to convert special characters to percent-encoded format (%20, %3A, etc.), or paste an encoded URL and click 'Decode' to make it readable.",
            "Copy the result with the copy button."
        ],
        about: "The URL Encoder/Decoder converts text to and from percent-encoded (URL-encoded) format. URL encoding replaces unsafe characters with a '%' followed by their hexadecimal value, ensuring that URLs are transmitted correctly across the internet. This is essential when building query strings, passing parameters to APIs, encoding form data, or debugging URLs with special characters. Reserved characters like spaces, ampersands (&), question marks (?), equals signs (=), and hash symbols (#) have special meaning in URLs and must be encoded when used as data values. Our tool supports both `encodeURIComponent` (for query parameters) and full URL encoding, handling all international characters and emoji properly.",
        faqs: [
            { question: "When do I need to URL encode?", answer: "You need URL encoding whenever you're passing data through URLs that contains special characters — spaces become %20, ampersands become %26, etc. This is critical for query strings, form submissions, and API requests." },
            { question: "What's the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URL but preserves characters that have special meaning (like / and ?). encodeURIComponent encodes everything including those special characters, making it suitable for encoding individual query parameter values." },
            { question: "Why do spaces appear as %20 or +?", answer: "In URL encoding, spaces can be represented as %20 (standard percent-encoding) or as + (application/x-www-form-urlencoded format used in HTML forms). Both are valid; %20 is more universal and recommended for path segments." }
        ],
        relatedSlugs: ["base64-encode-decode", "json-formatter", "slug-generator", "html-minifier"]
    },
    {
        slug: "uuid-generator",
        name: "UUID / GUID Generator",
        description: "Generate random UUIDs (Universally Unique Identifiers) instantly.",
        category: "developer-tools",
        metaTitle: "Random UUID & GUID Generator Online",
        metaDescription: "Free online tool to quickly generate secure random UUIDs (v4) and GUIDs for your applications and databases.",
        howToUse: [
            "Click the 'Generate' button to create a new random UUID (Version 4).",
            "Use the bulk generate option to create multiple UUIDs at once — specify the number you need.",
            "Copy individual UUIDs or the entire batch to your clipboard with one click."
        ],
        about: "The UUID Generator creates cryptographically random Version 4 UUIDs (Universally Unique Identifiers) that are safe to use as database primary keys, session tokens, file identifiers, and tracking IDs. UUIDs are 128-bit identifiers presented as 32 hexadecimal digits in the format 8-4-4-4-12 (e.g., 550e8400-e29b-41d4-a716-446655440000). Version 4 UUIDs are generated using random or pseudo-random numbers, making collisions virtually impossible — the probability of generating two identical UUIDs is astronomically low. Our generator uses the browser's built-in crypto.getRandomValues() for true cryptographic randomness. Batch generation lets you create multiple UUIDs at once for database seeding, test data, or configuration files.",
        faqs: [
            { question: "What's the difference between UUID and GUID?", answer: "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. UUID is the standard term used in most programming contexts, while GUID is the term commonly used in Microsoft technologies." },
            { question: "Are the generated UUIDs truly unique?", answer: "Version 4 UUIDs use 122 bits of randomness, giving over 5.3 × 10^36 possible values. The probability of generating a duplicate is approximately 1 in 2.71 quintillion — effectively zero for any practical purpose." },
            { question: "Can I use these UUIDs as database primary keys?", answer: "Yes! UUIDs are widely used as primary keys in distributed databases. They allow records to be created independently on different servers without coordination. However, consider that UUID primary keys use more storage than auto-incrementing integers." }
        ],
        relatedSlugs: ["json-formatter", "base64-encode-decode", "jwt-decoder", "url-encode-decode"]
    },
    {
        slug: "html-minifier",
        name: "HTML Minifier",
        description: "Compress HTML code by removing whitespace and comments.",
        category: "developer-tools",
        metaTitle: "HTML Minifier & Compressor Online",
        metaDescription: "Minify HTML code online to reduce file size and improve website loading speed. Remove comments, whitespace, and optimize markup.",
        howToUse: [
            "Paste your HTML code in the left input panel.",
            "Configure minification options: remove comments, collapse whitespace, remove optional tags, etc.",
            "Click 'Minify' to compress your HTML. View the size reduction percentage and copy the minified output."
        ],
        about: "The HTML Minifier compresses your HTML code by removing unnecessary whitespace, comments, and redundant attributes to reduce file size and improve page load speed. Minified HTML loads faster because browsers need to download fewer bytes, which directly impacts Core Web Vitals and SEO rankings. Our minifier strips HTML comments, collapses consecutive whitespace into single spaces, removes whitespace around block-level elements, and trims trailing spaces. The result is functionally identical HTML that's significantly smaller. This tool is essential for web developers optimizing production builds, especially for sites not using a build tool with built-in minification. Every kilobyte saved compounds across millions of page views, reducing bandwidth costs and improving user experience.",
        faqs: [
            { question: "How much can HTML minification reduce file size?", answer: "Typical HTML files see 10-30% size reduction through minification. The savings depend on how much whitespace and comments your original HTML contains. Template-generated HTML with heavy indentation often sees even greater reductions." },
            { question: "Does minification affect how the page renders?", answer: "No! Minification only removes characters that browsers ignore anyway (extra whitespace, comments). The rendered output is visually identical. However, it does make the source code harder for humans to read, which is why minification is only recommended for production builds." },
            { question: "Should I minify HTML in addition to CSS and JavaScript?", answer: "Yes! While CSS and JavaScript minification typically provides larger savings, HTML minification adds an additional 10-30% size reduction that compounds across your entire site. Every optimization matters for page speed and SEO." }
        ],
        relatedSlugs: ["json-formatter", "text-to-html", "markdown-converter", "url-encode-decode"]
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode JSON Web Tokens and view header and payload data.",
        category: "developer-tools",
        metaTitle: "JWT Decoder & Viewer Online",
        metaDescription: "Free online tool to securely decode JWT tokens and inspect claims and payload information without sending to server.",
        howToUse: [
            "Paste your complete JWT token (the long string with two dots) into the input field.",
            "The tool automatically decodes and displays the Header (algorithm, type) and Payload (claims, expiration, issuer) in formatted JSON.",
            "Review the decoded information including token expiration time, issuer, subject, and custom claims."
        ],
        about: "The JWT Decoder lets you inspect and debug JSON Web Tokens (JWTs) without sending them to any server. JWTs are the standard for authentication and information exchange in modern web applications, used by OAuth 2.0, OpenID Connect, and virtually every API that requires authentication. Our decoder splits the token into its three components — Header, Payload, and Signature — and displays each as formatted, readable JSON. The Header reveals the signing algorithm (HS256, RS256, etc.) and token type. The Payload shows all claims including standard ones like expiration (exp), issued-at (iat), issuer (iss), and audience (aud), plus any custom claims. This is invaluable for debugging authentication issues, verifying token contents during development, and understanding API security flows. Crucially, all decoding happens client-side — your tokens never leave your browser.",
        faqs: [
            { question: "Is it safe to decode JWTs in this tool?", answer: "Yes! JWT decoding happens entirely in your browser. Your tokens are never sent to any server. This is critical because JWTs often contain sensitive information like user IDs, roles, and permissions." },
            { question: "Does this tool verify the JWT signature?", answer: "This tool decodes and displays the token's contents but does not verify the cryptographic signature (which requires the secret key or public key). It's designed for inspection and debugging, not signature validation." },
            { question: "What are common JWT claims?", answer: "Standard claims include: exp (expiration time), iat (issued at), nbf (not before), iss (issuer), sub (subject/user ID), aud (audience), and jti (unique token ID). Applications also add custom claims like roles, permissions, and user metadata." },
            { question: "Why does my JWT have three parts separated by dots?", answer: "A JWT consists of three Base64URL-encoded parts separated by dots: the Header (algorithm info), the Payload (claims/data), and the Signature (cryptographic verification). This structure allows the token to be self-contained and verifiable." }
        ],
        relatedSlugs: ["base64-encode-decode", "json-formatter", "uuid-generator", "url-encode-decode"]
    },
    {
        slug: "mermaid-converter",
        name: "Mermaid Diagram Converter",
        description: "Render Mermaid diagram code into downloadable PNG or SVG images.",
        category: "developer-tools",
        metaTitle: "Mermaid Diagram to Image Converter - PNG & SVG Online",
        metaDescription: "Free online Mermaid diagram converter. Write Mermaid code and instantly render flowcharts, sequence diagrams, and more as downloadable PNG or SVG images.",
        howToUse: [
            "Write or paste your Mermaid syntax code in the left editor panel. Use the quick examples dropdown for common diagram types.",
            "Click 'Render Diagram' to generate the visual diagram in the preview panel on the right.",
            "Download the rendered diagram as a high-resolution PNG image or scalable SVG file, or copy the SVG code directly."
        ],
        about: "The Mermaid Diagram Converter transforms Mermaid syntax code into beautiful, downloadable diagrams. Mermaid is a powerful 'diagrams as code' tool that lets you create flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, pie charts, and more — all from simple text descriptions. This is the preferred approach for technical documentation because diagrams can be version-controlled with Git, reviewed in pull requests, and maintained alongside code. Our converter renders your Mermaid code into SVG diagrams in real-time, and lets you download them as high-resolution PNG images (2x resolution for Retina displays) or scalable SVG files for use in documentation, presentations, README files, and wikis. Quick example templates help you get started with each diagram type.",
        faqs: [
            { question: "What diagram types does Mermaid support?", answer: "Mermaid supports flowcharts (graph TD/LR), sequence diagrams, class diagrams, state diagrams, entity-relationship diagrams, Gantt charts, pie charts, user journey maps, and Git graphs. Our tool supports all Mermaid diagram types." },
            { question: "Should I download PNG or SVG?", answer: "SVG is scalable and looks sharp at any size — ideal for documentation, wikis, and web pages. PNG is a raster format better for presentations, emails, and chat messages. Our PNG export uses 2x resolution for crisp display on Retina screens." },
            { question: "Can I use Mermaid diagrams in GitHub?", answer: "Yes! GitHub natively supports Mermaid diagrams in Markdown files. Just wrap your Mermaid code in a code block with the 'mermaid' language identifier. Our tool is perfect for previewing diagrams before committing." },
            { question: "What is 'Diagrams as Code'?", answer: "Diagrams as Code is the practice of defining diagrams using text/code instead of visual drag-and-drop editors. Benefits include version control, code review, automation, and consistency. Mermaid is the most popular tool for this approach." }
        ],
        relatedSlugs: ["json-formatter", "markdown-converter", "html-minifier", "color-converter"]
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Convert between all units: length, weight, temperature, data, speed, time, volume, and more.",
        category: "developer-tools",
        metaTitle: "Unit Converter - Convert Length, Weight, Temperature & More Online",
        metaDescription: "Free all-in-one unit converter. Convert distance, weight, temperature, data storage, speed, time, volume, area, and calculate tips instantly.",
        howToUse: [
            "Select the conversion category from the tabs at the top: Length, Weight, Temperature, Data, Speed, Time, Volume, Area, or Tip Calculator.",
            "Choose the 'From' and 'To' units using the dropdown menus, then enter the value you want to convert.",
            "The result appears instantly. Use the swap button to reverse the conversion direction, or copy the result to your clipboard."
        ],
        about: "The Unit Converter is a comprehensive, all-in-one tool that handles conversions across 9 different categories with over 80 unit types. Convert between metric and imperial measurements for length (millimeters to miles), weight (grams to pounds), temperature (Celsius, Fahrenheit, Kelvin), digital data (bytes to terabytes, bits to megabits), speed (km/h to mph to knots), time (milliseconds to years), volume (milliliters to gallons, teaspoons to liters), and area (square meters to acres). The tool also includes a full-featured Tip Calculator with bill splitting, percentage presets, and per-person calculations. Every conversion uses precise mathematical formulas with smart number formatting that switches between decimal and scientific notation based on the magnitude of the result. All calculations happen instantly in your browser — no server, no delays, no rounding errors.",
        faqs: [
            { question: "How accurate are the conversions?", answer: "Our converter uses the official SI conversion factors with full floating-point precision (up to 12 significant digits). Results are formatted using smart precision to avoid unnecessary trailing zeros while maintaining accuracy." },
            { question: "Does the temperature converter handle negative values?", answer: "Yes! Temperature conversion correctly handles negative values for all three scales (Celsius, Fahrenheit, Kelvin). For example, -40°C correctly converts to -40°F — the point where both scales intersect." },
            { question: "What data units are supported?", answer: "We support both binary (1 KB = 1024 bytes) and bit-based units: Byte, Kilobyte, Megabyte, Gigabyte, Terabyte, Petabyte, Bit, Kilobit, and Megabit. This covers all common use cases from file sizes to network speeds." },
            { question: "How does the tip calculator work?", answer: "Enter your bill amount, select a tip percentage (or use presets for 10%, 15%, 18%, 20%, 25%), and optionally split between multiple people. The calculator shows the tip amount, total, per-person cost, and per-person tip." }
        ],
        relatedSlugs: ["color-converter", "uuid-generator", "json-formatter", "base64-encode-decode"]
    },
    {
        slug: "color-converter",
        name: "Color Code Converter",
        description: "Convert and pick colors between HEX, RGB, HSL, and CMYK formats.",
        category: "developer-tools",
        metaTitle: "Color Converter - HEX to RGB, HSL, CMYK Online Tool",
        metaDescription: "Free online color converter with visual picker. Convert between HEX, RGB, HSL, and CMYK color formats instantly with live preview.",
        howToUse: [
            "Enter a color value in any format — type a HEX code (#FF5733), set RGB values (255, 87, 51), adjust HSL values, or enter CMYK percentages.",
            "All other color formats update automatically and instantly. Use the visual color picker or HSL sliders for intuitive color selection.",
            "Copy any color format value with the copy button next to each format. The large color preview shows your selected color in context."
        ],
        about: "The Color Code Converter is a bi-directional color format converter and picker that lets you seamlessly work across HEX, RGB, HSL, and CMYK color spaces. Web developers, designers, and print professionals constantly need to convert between these formats: HEX for CSS and web design, RGB for digital screens, HSL for intuitive color manipulation, and CMYK for print production. Our tool provides a large visual color preview with a native color picker, individual input fields for each format, and interactive HSL sliders for fine-tuning hue, saturation, and lightness. Every input is bi-directional — change any value in any format and all others update in real-time. The one-click copy buttons next to each format make it effortless to grab the exact color code you need for your project.",
        faqs: [
            { question: "What's the difference between HEX and RGB?", answer: "HEX and RGB represent the same color model (Red, Green, Blue) in different notations. HEX uses hexadecimal (#FF5733), while RGB uses decimal values (255, 87, 51). They're interchangeable for digital screens — HEX is preferred in CSS shorthand, while RGB is used in CSS functions and design tools." },
            { question: "When should I use HSL vs RGB?", answer: "HSL (Hue, Saturation, Lightness) is more intuitive for humans because you can easily create lighter/darker tints or more/less saturated versions by adjusting a single value. RGB is more technical and maps directly to screen hardware. Use HSL for design work and RGB/HEX for code." },
            { question: "What is CMYK used for?", answer: "CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used in printing. When designing for print materials (business cards, brochures, posters), you need CMYK values. Note that the RGB-to-CMYK conversion is approximate since CMYK has a smaller color gamut than RGB." },
            { question: "Can I use the browser's native color picker?", answer: "Yes! Click the 'Pick Color' button on the color preview to open your browser's native color picker. This lets you visually select any color, and all format fields will update automatically." }
        ],
        relatedSlugs: ["mermaid-converter", "json-formatter", "uuid-generator", "unit-converter"]
    },
];

export function getToolsByCategory(category: ToolCategory): ToolItem[] {
    return toolsData.filter((tool) => tool.category === category);
}

export function getToolBySlug(slug: string): ToolItem | undefined {
    return toolsData.find((tool) => tool.slug === slug);
}
