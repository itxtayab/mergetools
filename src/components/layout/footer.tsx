import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
            <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built for developers and writers. The ultimate free tools hub.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-center md:justify-end">
                    <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">Blog</Link>
                    <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">About</Link>
                    <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">Contact</Link>
                    <Link href="/privacy-policy" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">Terms</Link>
                    <Link href="/disclaimer" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">Disclaimer</Link>
                </div>
            </div>
        </footer>
    );
}
