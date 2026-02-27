import React from "react";

/**
 * Renders markdown-formatted blog content body as styled HTML.
 * Supports: **bold**, `inline code`, bullet lists (- ), numbered lists, and paragraphs.
 */
export function MarkdownRenderer({ content }: { content: string }) {
    const paragraphs = content.split("\n\n");

    return (
        <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
            {paragraphs.map((paragraph, pIndex) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                // Check if this is a bullet list
                const lines = trimmed.split("\n");
                const isBulletList = lines.every(
                    (line) => line.trim().startsWith("- ") || line.trim() === ""
                );
                const isNumberedList = lines.every(
                    (line) => /^\d+\.\s/.test(line.trim()) || line.trim() === ""
                );

                if (isBulletList) {
                    return (
                        <ul key={pIndex} className="list-disc list-inside space-y-1.5 pl-1">
                            {lines
                                .filter((line) => line.trim().startsWith("- "))
                                .map((line, lIndex) => (
                                    <li key={lIndex} className="text-muted-foreground">
                                        <InlineMarkdown
                                            text={line.trim().replace(/^-\s+/, "")}
                                        />
                                    </li>
                                ))}
                        </ul>
                    );
                }

                if (isNumberedList) {
                    return (
                        <ol key={pIndex} className="list-decimal list-inside space-y-1.5 pl-1">
                            {lines
                                .filter((line) => /^\d+\.\s/.test(line.trim()))
                                .map((line, lIndex) => (
                                    <li key={lIndex} className="text-muted-foreground">
                                        <InlineMarkdown
                                            text={line.trim().replace(/^\d+\.\s+/, "")}
                                        />
                                    </li>
                                ))}
                        </ol>
                    );
                }

                // Regular paragraph
                return (
                    <p key={pIndex}>
                        <InlineMarkdown text={trimmed} />
                    </p>
                );
            })}
        </div>
    );
}

/**
 * Renders inline markdown: **bold** and `code`
 */
function InlineMarkdown({ text }: { text: string }) {
    // Split by **bold** and `code` patterns
    const parts: React.ReactNode[] = [];
    // Regex: match **bold**, `code`, or regular text
    const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        // Push text before match
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        if (match[2]) {
            // **bold** match
            parts.push(
                <strong key={match.index} className="font-semibold text-foreground">
                    {match[2]}
                </strong>
            );
        } else if (match[4]) {
            // `code` match
            parts.push(
                <code
                    key={match.index}
                    className="px-1.5 py-0.5 rounded-md bg-muted text-foreground text-[13px] font-mono"
                >
                    {match[4]}
                </code>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    // Push remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
}
