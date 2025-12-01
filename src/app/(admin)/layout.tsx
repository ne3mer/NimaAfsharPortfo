import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NIMA Studio | Admin",
  description: "Admin Panel",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force English for admin
  const locale = 'en';
  const messages = await getMessages({locale});

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
         <NextIntlClientProvider messages={messages}>
            <Navbar /> 
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
         </NextIntlClientProvider>
      </body>
    </html>
  );
}
