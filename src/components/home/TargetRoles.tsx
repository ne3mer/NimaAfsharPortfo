"use client";

import { useTranslations } from "next-intl";

/**
 * "Where to place me" — laid out as a paper memo with a sienna stamp.
 */
export function TargetRoles() {
  const t = useTranslations("TargetRoles");

  return (
    <section className="relative bg-paper">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Memo paper */}
          <div className="passepartout relative bg-card p-8 md:p-12">
            <span className="absolute -top-4 right-6 stamp">Memo · For hiring teams</span>

            <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-4">
              <p className="kicker">§04 — {t("kicker")}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                File: org-chart.md
              </p>
            </div>

            <h2 className="font-display text-3xl leading-tight text-ink md:text-[44px]">
              {t("title")}<span className="text-sienna">.</span>
            </h2>

            <p className="dropcap mt-6 max-w-[58ch] text-[15px] leading-[1.75] text-ink/85 md:text-[16px]">
              {t("intro")}
            </p>

            <ul className="mt-8 space-y-0 divide-y divide-ink/20 border-y border-ink/40">
              {([0, 1, 2] as const).map((i) => (
                <li
                  key={i}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4"
                >
                  <span className="font-display text-2xl italic leading-none text-sienna">
                    0{i + 1}
                  </span>
                  <p className="font-display text-[17px] leading-snug text-ink md:text-[19px]">
                    {t(`roles.${i}`)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/30 pt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
              <span>Signed · Nima A.</span>
              <span className="text-sienna">— ✻ —</span>
              <span>Open file in Contact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
