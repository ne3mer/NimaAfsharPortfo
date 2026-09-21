import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono, Vazirmatn } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "@/app/globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nimastudio.site"),
  title: {
    default: "Nima Afsharfar — Full-Stack Developer & Product Builder",
    template: "%s | NIMA Studio",
  },
  description:
    "Full-stack product development, SaaS MVPs, automation and data systems by Nima Afsharfar.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "NIMA Studio",
    title: "Nima Afsharfar — Full-Stack Developer & Product Builder",
    description:
      "Selected SaaS products, automation workflows and data systems with technical case studies.",
    images: [
      {
        url: "/images/work/nima-studio/01-home-hero.webp",
        width: 1440,
        height: 1000,
        alt: "NIMA Studio editorial homepage",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fa")) {
    notFound();
  }

  const messages = await getMessages({locale});

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body
        className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} ${vazir.variable} paper-grain paper-vignette antialiased bg-paper text-ink min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="relative z-[2] flex-1 pt-[88px] md:pt-[104px]">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
