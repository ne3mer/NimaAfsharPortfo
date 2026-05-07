"use client";

import { useTranslations } from "next-intl";

/**
 * "Now hiring me" banner — set as a printer's note: rule lines, mono caption.
 */
export function HeroOpenToBanner() {
  const t = useTranslations("Hero");

  return (
    <div className="relative inline-flex max-w-full flex-wrap items-center gap-x-4 gap-y-1 border border-ink bg-paper px-4 py-3">
      <span className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border border-ink bg-paper rtl:left-auto rtl:-right-2" />
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sienna">
        {t("openToLabel")}
      </span>
      <span className="hidden sm:inline-block h-4 w-px bg-ink/30" />
      <span className="font-display text-[17px] italic leading-tight text-ink">
        {t("openToRoles")}
      </span>
    </div>
  );
}
