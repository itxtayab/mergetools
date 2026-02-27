import Link from "next/link";
import { CATEGORIES, getToolsByCategory, ToolCategory } from "@/lib/tools-data";
import { ArrowRight, Wrench, Sparkles, Code2, Type } from "lucide-react";

const CategoryIcon = ({ category }: { category: ToolCategory }) => {
  if (category === "text-tools") return <Type className="h-6 w-6 text-blue-500" />;
  if (category === "developer-tools") return <Code2 className="h-6 w-6 text-emerald-500" />;
  return <Wrench className="h-6 w-6 text-primary" />;
};

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <section className="flex flex-col items-center justify-center space-y-4 text-center py-10 md:py-16">
        <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium flex items-center gap-2 border border-border/50 text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-primary" fill="currentColor" />
          <span>The ultimate toolkit for your digital workflow</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white drop-shadow-sm pb-2">
          100% Free Online Tools
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Fast, client-side tools designed for maximum privacy and performance. No data sent to servers. Everything runs entirely in your browser.
        </p>
      </section>

      {Object.entries(CATEGORIES).map(([category, { name, description }]) => {
        const cat = category as ToolCategory;
        const tools = getToolsByCategory(cat);

        return (
          <section key={category} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/40 pb-4">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ring-1 ring-border shadow-sm">
                <CategoryIcon category={cat} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${category}/${tool.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-primary/10" />
                  <div className="z-10 flex flex-col gap-2">
                    <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="z-10 mt-4 flex items-center text-sm font-medium text-primary">
                    Launch Tool
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
