import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { getEntry } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const profile = getEntry("profile.txt").meta;
  const name = profile.name ?? "Online CV";
  return {
    title: `${name} — ${profile.title ?? "Online CV"}`,
    description: profile.tagline ?? `Online CV and portfolio of ${name}.`,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The inline script below adds a "js" class before hydration; React must not treat that as a mismatch.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Marks JS as available before first paint so .reveal only hides content when it can reveal it */}
        <Script id="js-flag" strategy="beforeInteractive">{`document.documentElement.classList.add("js")`}</Script>
        {children}
      </body>
    </html>
  );
}
