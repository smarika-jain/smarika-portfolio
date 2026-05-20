import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smarika Jain — GTM Engineer",
  description:
    "I build AI automation systems that drive revenue. Lead sourcing, outreach personalization, and CRM automation for B2B teams.",
  openGraph: {
    title: "Smarika Jain — GTM Engineer",
    description: "I build AI automation systems that drive revenue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smarika Jain — GTM Engineer",
    description: "I build AI automation systems that drive revenue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body
        className="min-h-dvh bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
