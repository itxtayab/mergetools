import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Merge Tools",
    description: "Privacy Policy for Merge Tools. Learn how we handle your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
                <p className="text-muted-foreground">Last Updated: October 2023</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                    At Merge Tools, accessible from our website, one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by Merge Tools
                    and how we use it.
                </p>

                <h2>1. Client-Side Processing</h2>
                <p>
                    The vast majority of utilities provided on Merge Tools operate entirely on the client-side (within your web browser).
                    This means that the text, code, or data you input into our tools is processed locally on your device and is
                    <strong> never transmitted to, stored on, or viewed by our servers</strong>. Your data remains strictly confidential
                    and under your complete control.
                </p>

                <h2>2. Log Files</h2>
                <p>
                    Merge Tools follows a standard procedure of using log files. These files log visitors when they visit websites.
                    All hosting companies do this and a part of hosting services' analytics. The information collected by log files include:
                </p>
                <ul>
                    <li>Internet Protocol (IP) addresses</li>
                    <li>Browser type, ISP, and Date/Time stamp</li>
                    <li>Referring/exit pages</li>
                    <li>Number of clicks</li>
                </ul>
                <p>
                    These are not linked to any information that is personally identifiable. The purpose of the information is for
                    analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </p>

                <h2>3. Google DoubleClick DART Cookie & AdSense</h2>
                <p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to
                    our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose
                    to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">https://policies.google.com/technologies/ads</a>
                </p>
                <p>
                    Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense.
                    They automatically receive your IP address when this occurs.
                </p>

                <h2>4. Third-Party Privacy Policies</h2>
                <p>
                    Merge Tools's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult
                    the respective Privacy Policies of these third-party ad servers for more detailed information. It may include
                    their practices and instructions about how to opt-out of certain options.
                </p>

                <h2>5. Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>
            </div>
        </div>
    );
}
