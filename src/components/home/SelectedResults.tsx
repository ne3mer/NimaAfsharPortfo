"use client";

import { useLocale, useTranslations } from "next-intl";

/**
 * Selected impact — laid out like a magazine contents page.
 * Big folio numbers, rule-line dividers, no icon orbs.
 */
export function SelectedResults() {
  const t = useTranslations("SelectedResults");
  const locale = useLocale();
  const isFa = locale === "fa";
  const labels = isFa
    ? {
        kicker: "§03 — اثر واقعی",
        title: "اثر، نه ادعا.",
        readTime: "زمان خواندن · ۱۰ ثانیه",
        proof: "دیدن شواهد ←",
      }
    : {
        kicker: "§03 — Selected impact",
        title: "Receipts before rhetoric.",
        readTime: "Reading time · 10 sec.",
        proof: "→ see proof",
      };

  return (
    <section className="relative bg-paper-soft/50 torn-top torn-bottom">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-linear-to-r from-paper/70 to-transparent lg:block" />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Spine: section header */}
          <div className="md:col-span-4">
            <p className="kicker">{labels.kicker}</p>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-5xl">
              {labels.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic text-sienna">{labels.title.split(" ").slice(-1)}</span>
            </h2>
            <p className="mt-5 max-w-[34ch] font-display text-[17px] leading-snug text-ink-mute">
              {t("subtitle")}
            </p>
            <div className="rule mt-8" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              {labels.readTime}
            </p>
          </div>

          {/* The four entries */}
          <ol className="md:col-span-8 divide-y divide-ink/20 border-y border-ink bg-paper/40">
            {([0, 1, 2, 3] as const).map((i) => (
              <li
                key={i}
                className="corner-pin group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 px-3 py-7 transition-colors hover:bg-paper/60 md:grid-cols-[5rem_1fr_auto] md:gap-x-10 md:px-5 md:py-9"
              >
                <span className="font-display text-5xl italic leading-none text-sienna md:text-[64px]">
                  0{i + 1}
                </span>
                <p className="font-display text-[19px] leading-snug text-ink md:text-[22px]">
                  {t(`items.${i}`)}
                </p>
                <span className="hidden md:inline-flex translate-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint group-hover:text-sienna transition-colors">
                  {labels.proof}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
