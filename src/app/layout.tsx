import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIMA Studio | Custom Software Development",
  description: "Premium custom software development studio by Nima Afsharfar. Specialized in scalable web applications, SaaS platforms, and digital products. No templates, just engineering.",
  openGraph: {
    title: "NIMA Studio | Custom Software Development",
    description: "Premium custom software development studio. No templates, just engineering.",
    url: "https://nimastudio.com",
    siteName: "NIMA Studio",
    images: [
      {
        url: "/og-image.jpg", // We would need to add this image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIMA Studio",
    description: "Premium custom software development studio.",
    creator: "@nimaafshar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
