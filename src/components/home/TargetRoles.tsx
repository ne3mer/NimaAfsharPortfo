"use client";

import { Target } from "lucide-react";
import { useTranslations } from "next-intl";

export function TargetRoles() {
  const t = useTranslations("TargetRoles");

  return (
    <section className="border-b border-white/5 py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/80 to-zinc-950/40 p-6 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400/90">
                {t("kicker")}
              </p>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                {t("title")}
              </h2>
            </div>
          </div>
          <p className="mb-4 text-sm text-muted-foreground md:text-base">
            {t("intro")}
          </p>
          <ul className="space-y-2 text-sm text-zinc-300 md:text-[15px]">
            {([0, 1, 2] as const).map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/80" />
                <span>{t(`roles.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
