import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Merge Tools",
    description: "Get in touch with the Merge Tools team. We are here to help.",
};

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
                <p className="text-xl text-muted-foreground">
                    Have a question, suggestion, or found a bug? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="prose prose-slate max-w-none">
                <p className="text-lg">
                    We are constantly working to improve Merge Tools and add new utilities that our users need.
                    If you have any feedback or feature requests, please reach out to us.
                </p>

                <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mt-0 text-xl font-semibold">Get in Touch</h2>
                    <p className="mb-6 text-muted-foreground">
                        You can reach us directly via email. We aim to respond to all inquiries within 24-48 hours.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <strong className="block text-sm text-muted-foreground">General Inquiries &amp; Support</strong>
                            <a href="mailto:support@mergemain.com" className="text-primary hover:underline">
                                support@mergemain.com
                            </a>
                        </div>

                        <div>
                            <strong className="block text-sm text-muted-foreground">Business &amp; Partnerships</strong>
                            <a href="mailto:business@mergemain.com" className="text-primary hover:underline">
                                business@mergemain.com
                            </a>
                        </div>
                    </div>
                </div>

                <h3 className="mt-10">Frequently Asked Questions</h3>
                <p>
                    Before reaching out, please note that all our tools are free to use and do not require
                    registration. If a tool isn&apos;t working as expected, try clearing your browser cache or
                    disabling extensions that might interfere with JavaScript execution.
                </p>
            </div>
        </div>
    );
}
