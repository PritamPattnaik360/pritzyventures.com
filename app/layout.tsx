import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pritzy Ventures LLC — Building the Next Generation of AI-Powered Software",
  description:
    "Pritzy Ventures LLC creates AI-powered software and digital products. Our long-term vision is to build and invest in new emerging markets across AI, robotics, smart electronics, and advanced technologies.",
  keywords: [
    "AI software",
    "SaaS platforms",
    "technology ventures",
    "enterprise solutions",
    "consumer apps",
    "robotics",
    "emerging technology",
    "Pritzy Ventures",
  ],
  authors: [{ name: "Pritzy Ventures LLC" }],
  openGraph: {
    title: "Pritzy Ventures LLC",
    description: "Building the next generation of AI-powered software.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pritzy Ventures LLC",
    description: "Building the next generation of AI-powered software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-black text-white antialiased`}>{children}</body>
    </html>
  );
}
