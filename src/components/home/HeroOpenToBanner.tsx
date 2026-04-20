"use client";

import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Compact "Open to roles" hire-signal under the Hero subtitle.
 * Sits between the H1/sub copy and the primary CTAs to be the first thing a recruiter sees.
 */
export function HeroOpenToBanner() {
  const t = useTranslations("Hero");
  return (
    <div className="inline-flex max-w-full flex-wrap items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3 backdrop-blur">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
        <Briefcase className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/90">
          {t("openToLabel")}
        </p>
        <p className="text-sm font-semibold text-white md:text-[15px]">
          {t("openToRoles")}
        </p>
      </div>
    </div>
  );
}
