import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
});

export const metadata = {
  title: "NIMA Studio | Custom Software Development",
  description: "Premium custom software development studio by Nima Afsharfar.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log("Layout Locale:", locale);
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "fa")) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});
  
  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
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
