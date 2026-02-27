import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Text Tools
const WordCounter = dynamic(() => import("@/components/tools/WordCounter"), { loading: () => <Loader /> });
const CaseConverter = dynamic(() => import("@/components/tools/CaseConverter"), { loading: () => <Loader /> });
const TextRepeater = dynamic(() => import("@/components/tools/TextRepeater"), { loading: () => <Loader /> });
const LoremIpsumGenerator = dynamic(() => import("@/components/tools/LoremIpsumGenerator"), { loading: () => <Loader /> });
const MarkdownConverter = dynamic(() => import("@/components/tools/MarkdownConverter"), { loading: () => <Loader /> });
const TextDiff = dynamic(() => import("@/components/tools/TextDiff"), { loading: () => <Loader /> });

// Developer Tools
const JsonFormatter = dynamic(() => import("@/components/tools/JsonFormatter"), { loading: () => <Loader /> });
const Base64Encoder = dynamic(() => import("@/components/tools/Base64Encoder"), { loading: () => <Loader /> });
const UrlEncoder = dynamic(() => import("@/components/tools/UrlEncoder"), { loading: () => <Loader /> });
const UuidGenerator = dynamic(() => import("@/components/tools/UuidGenerator"), { loading: () => <Loader /> });
const HtmlMinifier = dynamic(() => import("@/components/tools/HtmlMinifier"), { loading: () => <Loader /> });
const JwtDecoder = dynamic(() => import("@/components/tools/JwtDecoder"), { loading: () => <Loader /> });

const Loader = () => (
    <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

export function ToolRenderer({ slug }: { slug: string }) {
    switch (slug) {
        case "word-counter":
            return <WordCounter />;
        case "case-converter":
            return <CaseConverter />;
        case "text-repeater":
            return <TextRepeater />;
        case "lorem-ipsum-generator":
            return <LoremIpsumGenerator />;
        case "markdown-converter":
            return <MarkdownConverter />;
        case "text-diff":
            return <TextDiff />;
        case "json-formatter":
            return <JsonFormatter />;
        case "base64-encode-decode":
            return <Base64Encoder />;
        case "url-encode-decode":
            return <UrlEncoder />;
        case "uuid-generator":
            return <UuidGenerator />;
        case "html-minifier":
            return <HtmlMinifier />;
        case "jwt-decoder":
            return <JwtDecoder />;
        default:
            return <div>Tool implementation not found for slug: {slug}</div>;
    }
}
