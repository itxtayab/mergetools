import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://devpik.com"),
  title: "DevPik - Essential Free Online Tools",
  description: "A premium collection of free online tools for developers, writers, and digital professionals. Fast, secure, and client-side.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    siteName: "DevPik",
    type: "website",
    url: "https://devpik.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevPik",
  url: "https://devpik.com",
  logo: "https://devpik.com/logo.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "founders@mergemain.com",
    contactType: "customer support",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevPik",
  url: "https://devpik.com",
  description: "A premium collection of free online tools for developers, writers, and digital professionals.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://devpik.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="mx-auto flex-1 w-full max-w-screen-2xl px-4 md:px-8">
            <main className="flex-1 py-6 md:py-10 min-w-0">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

