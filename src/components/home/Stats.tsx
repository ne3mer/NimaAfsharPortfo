"use client";

import { useTranslations } from "next-intl";

const stats = [
  { key: "yearsTrack", value: "08", suffix: "yrs" },
  { key: "programs", value: "20", suffix: "+" },
  { key: "bench", value: "0.81", suffix: "r" },
  { key: "languages", value: "03", suffix: "lang" },
];

/**
 * Stats — typeset like a magazine "by the numbers" page.
 * Oversized italic serif figures, hairline rules between cells.
 */
export function Stats() {
  const t = useTranslations("Stats");

  return (
    <section className="relative bg-paper">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
          <div>
            <p className="kicker">§02 — By the numbers</p>
            <h2 className="font-display text-3xl italic text-ink md:text-4xl">
              A short ledger.
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Audited against my own résumé · figures rounded
          </p>
        </div>

        <div className="grid grid-cols-2 divide-x divide-ink/15 border-y border-ink md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className="group relative flex flex-col items-baseline gap-2 px-5 py-8 md:px-7 md:py-10"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
                Fig. 0{i + 1}
              </span>
              <div className="flex items-baseline gap-2 leading-none">
                <span className="font-display text-[clamp(3.2rem,7vw,5.5rem)] italic leading-[0.9] text-ink">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-sienna">
                  {stat.suffix}
                </span>
              </div>
              <p className="max-w-[24ch] font-display text-[15px] leading-snug text-ink-mute md:text-base">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
