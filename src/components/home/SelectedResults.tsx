"use client";

import { BarChart3, Globe2, Layers, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Sparkles, Layers, BarChart3, Globe2] as const;

export function SelectedResults() {
  const t = useTranslations("SelectedResults");

  return (
    <section className="border-b border-white/5 bg-zinc-950/40 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {([0, 1, 2, 3] as const).map((i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm leading-relaxed text-zinc-300 md:text-[15px]">
                  {t(`items.${i}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
