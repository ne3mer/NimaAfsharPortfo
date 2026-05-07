"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NavbarHiringLinks } from "@/components/layout/NavbarHiringLinks";

/* ──────────────────────────────────────────────────────────────────
   The Atelier — a printed-magazine masthead.
   Top "ticker strip" carries today's date, edition number, weather/locale.
   Below it: serif wordmark, navigation set inline, language switch + CTA.
   ────────────────────────────────────────────────────────────────── */

const formatEditionDate = (locale: string) => {
  const d = new Date();
  return d.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    const lang = document.documentElement.lang || "en";
    setToday(formatEditionDate(lang));
  }, []);

  const navLinks = [
    { name: t("work"), href: "/work" },
    { name: t("services"), href: "/#services" },
    { name: t("about"), href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper">
      {/* Ticker / colophon strip */}
      <div className="border-b border-ink/20 bg-paper-deep/50">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sienna animate-ink-blink" />
            Vol. VIII · No. 26
          </span>
          <span className="truncate text-center text-ink/70">{today || "—"}</span>
          <span className="hidden md:inline-flex items-center gap-2">
            Budapest · 47°N · EU-remote
          </span>
        </div>
      </div>

      {/* Masthead */}
      <div className="border-b border-ink bg-paper">
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-3 md:py-4">
          {/* Wordmark */}
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-3xl md:text-[34px] leading-none tracking-tight text-ink">
              Nima<span className="italic text-sienna">.</span>Afsharfar
            </span>
            <span className="hidden md:inline-flex font-mono text-[9px] uppercase tracking-[0.32em] text-ink-faint">
              Atelier · est. 2017
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[0.22em]">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "link-underline relative inline-flex items-center gap-1",
                    active ? "text-ink" : "text-ink-mute hover:text-ink"
                  )}
                >
                  <span className="text-ink-faint">{`§0${i + 1}`}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <NavbarHiringLinks className="hidden lg:flex" />
            <LanguageSwitcher />
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "ink", size: "sm" }),
                "hidden md:inline-flex"
              )}
            >
              {t("ctaContact")}
              <span className="ms-2 text-sienna">↗</span>
            </Link>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-ink text-ink"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-ink bg-paper"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline gap-3 border-b border-ink/15 py-3 font-display text-2xl text-ink"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-mono text-[10px] tracking-[0.32em] text-ink-faint">
                    §0{i + 1}
                  </span>
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(buttonVariants({ variant: "sienna", size: "lg" }), "mt-4 w-full")}
              >
                {t("ctaContact")} ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
