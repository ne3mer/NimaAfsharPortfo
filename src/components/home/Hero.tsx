"use client";

import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import { HeroOpenToBanner } from "@/components/home/HeroOpenToBanner";
import { HeroQuickLinks } from "@/components/home/HeroQuickLinks";

/* ──────────────────────────────────────────────────────────────────
   The Atelier — Issue cover.
   Magazine-style hero: oversized italic serif title, drop-cap lede,
   marginalia, hand-drawn underline, portrait stamp card.
   ────────────────────────────────────────────────────────────────── */

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      {/* Editorial measurement column on the left edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-ink/10 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-ink/10 lg:block" />

      <div className="container mx-auto px-4 pt-10 pb-20 md:pt-16 md:pb-28">
        {/* Top metadata strip — like a magazine spine */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
          <span>The Atelier — Issue 01</span>
          <span className="hidden md:inline">A Solo Practice · Budapest</span>
          <span className="text-sienna">{t("systemOnline")}</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Marginalia rail */}
          <aside className="col-span-12 md:col-span-2 md:order-1">
            <div className="hidden md:flex flex-col gap-4 border-r border-ink/20 pr-4 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sienna">
                Cover Story
              </p>
              <p className="font-display text-[15px] italic leading-snug text-ink-mute">
                Field notes from a one-person studio that prefers shipped demos to deck slides.
              </p>
              <div className="rule mt-2" />
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                In this issue
              </p>
              <ul className="space-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                <li>§01 — Cover</li>
                <li>§02 — Selected Impact</li>
                <li>§03 — Where I Fit</li>
                <li>§04 — The Bench</li>
                <li>§05 — Lanes I Take</li>
                <li>§06 — How I Run It</li>
              </ul>
            </div>
          </aside>

          {/* Headline column */}
          <div className="col-span-12 md:col-span-7 md:order-2">
            <p className="kicker mb-5">{t("openToLabel")}</p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-display text-[clamp(2.6rem,7.4vw,6.4rem)] leading-[0.92] tracking-[-0.01em] text-ink"
            >
              <span className="block">Ship the</span>
              <span className="hand-underline italic text-sienna">product.</span>
              <span className="block">Earn the</span>
              <span className="block italic">room.</span>
            </motion.h1>

            <div className="mt-8 flex items-start gap-4">
              {/* Folio number */}
              <span className="hidden md:block shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint pt-2">
                p. 01
              </span>
              <p className="dropcap max-w-[58ch] text-[15px] leading-[1.7] text-ink/85 md:text-[16px]">
                {t("subtitle")}
              </p>
            </div>

            <p className="mt-6 max-w-[58ch] border-l-2 border-sienna pl-4 font-display text-lg italic leading-snug text-ink rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
              {t("differentiator")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "sienna", size: "xl" }),
                  "group relative"
                )}
              >
                {t("ctaPrimary")}
                <span className="ms-3 transition-transform group-hover:translate-x-1 rtl:rotate-180">→</span>
              </Link>
              <Link
                href="/work"
                className={buttonVariants({ variant: "outline", size: "xl" })}
              >
                {t("ctaSecondary")}
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                ✻ Reply within 48h
              </span>
            </div>

            <div className="mt-8">
              <HeroOpenToBanner />
            </div>

            <div className="mt-6">
              <HeroQuickLinks />
            </div>
          </div>

          {/* Portrait card */}
          <aside className="col-span-12 md:col-span-3 md:order-3">
            <PortraitCard />
            <div className="mt-6 hidden md:block">
              <CapabilitiesList />
            </div>
          </aside>
        </div>

        {/* Capabilities visible on mobile under the columns */}
        <div className="mt-10 md:hidden">
          <CapabilitiesList />
        </div>
      </div>

      {/* Bottom rule + colophon spine */}
      <div className="rule-double mt-2" />
    </section>
  );
}

function PortraitCard() {
  return (
    <div className="relative">
      {/* Stamp tag */}
      <span className="absolute -top-3 -right-3 z-10 stamp">
        Now Setting · Vol. 01
      </span>

      <div className="passepartout relative bg-paper-deep p-1">
        {/* Hand-set monogram */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* warm woodcut backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--paper-soft)_0%,_var(--paper-deep)_60%,_var(--ink)_140%)]" />
          {/* engraved hatch lines */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-25 mix-blend-multiply"
            viewBox="0 0 200 250"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#141210" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="200" height="250" fill="url(#hatch)" />
          </svg>

          {/* Monogram serif */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-ink">
            <span className="font-display text-[8.5rem] leading-none">
              M<span className="italic text-sienna">A</span>
            </span>
            <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/70">
              Mohammad Afsharfar
            </span>
            <span className="mt-1 font-display italic text-base text-ink/70">
              — Nima
            </span>
          </div>

          {/* Edition mark */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-ink/65">
            <span>Plate I</span>
            <span>Hand-set in Budapest</span>
          </div>
        </div>
      </div>

      <p className="mt-3 px-1 text-center font-display italic text-sm text-ink-mute">
        Engineer · MBA · Researcher
      </p>
    </div>
  );
}

function CapabilitiesList() {
  const t = useTranslations("Hero");
  const items = [
    { label: t("capabilities.ai") },
    { label: t("capabilities.infra") },
    { label: t("capabilities.scale") },
  ];
  return (
    <div className="border-y border-ink py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
        Set in this volume
      </p>
      <ul className="mt-2 divide-y divide-ink/15">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-3 py-1.5 font-display text-[15px] leading-tight text-ink"
          >
            <span className="font-mono text-[10px] tracking-[0.28em] text-sienna">
              0{i + 1}
            </span>
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
