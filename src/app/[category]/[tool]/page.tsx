import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getToolBySlug, CATEGORIES, ToolCategory } from "@/lib/tools-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ToolRenderer } from "./tool-renderer";
import { StructuredData, generateSoftwareApplicationSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";

interface Props {
    params: Promise<{ category: string; tool: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const tool = getToolBySlug(params.tool);
    if (!tool || tool.category !== params.category) return {};

    return {
        title: tool.metaTitle,
        description: tool.metaDescription,
        alternates: {
            canonical: `/${tool.category}/${tool.slug}`,
        }
    };
}

export default async function ToolPage(props: Props) {
    const params = await props.params;
    const tool = getToolBySlug(params.tool);

    if (!tool || tool.category !== params.category) {
        notFound();
    }

    const category = CATEGORIES[tool.category as ToolCategory];

    const appSchema = generateSoftwareApplicationSchema(
        tool.name,
        tool.description,
        `https://mergetools.example.com/${tool.category}/${tool.slug}`,
        tool.category
    );

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://mergetools.example.com" },
        { name: category.name, url: `https://mergetools.example.com/${tool.category}` },
        { name: tool.name, url: `https://mergetools.example.com/${tool.category}/${tool.slug}` },
    ]);

    return (
        <div className="flex flex-col gap-10 pb-12">
            <StructuredData data={appSchema} />
            <StructuredData data={breadcrumbSchema} />

            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-muted-foreground whitespace-nowrap overflow-x-auto pb-2">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
                <Link href={`/${tool.category}`} className="hover:text-foreground transition-colors">
                    {category.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
                <span className="text-foreground">{tool.name}</span>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col space-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">{tool.name}</h1>
                <p className="text-lg text-muted-foreground">{tool.description}</p>
            </section>

            {/* Tool Component Area */}
            <section className="bg-card border border-border/60 rounded-2xl shadow-sm p-4 md:p-8">
                <ToolRenderer slug={tool.slug} />
            </section>

            {/* Content Section (How to Use & About) */}
            <section className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
                <div>
                    <h2>How to Use {tool.name}</h2>
                    <ol>
                        <li>Input your required data into the tool.</li>
                        <li>Configure any necessary settings or options.</li>
                        <li>Instantly view and copy your generated results.</li>
                    </ol>
                </div>

                <div>
                    <h2>About This Tool</h2>
                    <p>
                        The <strong>{tool.name}</strong> is a high-performance, purely client-side browser utility built to ensure maximum privacy and speed. Since processing occurs locally on your device, no sensitive information is transmitted over the network.
                    </p>
                </div>
            </section>
        </div>
    );
}
