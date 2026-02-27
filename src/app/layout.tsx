import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.mergemain.com"),
  title: "Merge Tools - Essential Free Online Tools",
  description: "A premium collection of free online tools for developers, writers, and digital professionals. Fast, secure, and client-side.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    siteName: "Merge Tools",
    type: "website",
    url: "https://tools.mergemain.com",
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
