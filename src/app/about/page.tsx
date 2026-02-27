import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Merge Tools",
    description: "Learn more about Merge Tools, the ultimate free online tools platform for developers and digital professionals.",
};

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Merge Tools</h1>
                <p className="text-xl text-muted-foreground">
                    Empowering your digital workflow with fast, free, and secure online utilities.
                </p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-lg leading-relaxed">
                <p>
                    Welcome to <strong>Merge Tools</strong>, your go-to destination for free, high-quality digital tools.
                    Founded with the mission to solve micro-problems efficiently, we provide a comprehensive suite of utilities
                    designed for developers, writers, students, and professionals alike.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We believe that essential digital tools should be accessible to everyone, everywhere, without barriers.
                    That's why every tool on our platform is 100% free to use, requiring no account creation, no subscriptions,
                    and no hidden fees.
                </p>

                <h2>Privacy First</h2>
                <p>
                    Your data security is our top priority. Unlike many online utilities that send your data to remote servers
                    for processing, the vast majority of our tools operate <strong>entirely client-side within your browser</strong>.
                    This means your sensitive JSON files, private texts, and code snippets never leave your device.
                </p>

                <h2>Fast & Reliable</h2>
                <p>
                    Built with cutting-edge web technologies, Merge Tools is designed for speed. We've eliminated unnecessary
                    bloat to ensure that our tools load instantly and process your requests in milliseconds, saving you
                    valuable time in your workflow.
                </p>
            </div>
        </div>
    );
}
