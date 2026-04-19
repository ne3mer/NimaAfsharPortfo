"use client";

import { useTranslations } from "next-intl";

/**
 * Pattern cards — not attributed to named individuals (avoids placeholder-name risk).
 */
export function Testimonials() {
  const t = useTranslations("Testimonials");

  const cards = [
    {
      headline: t("items.0.role"),
      context: t("items.0.company"),
      body: t("items.0.quote"),
    },
    {
      headline: t("items.1.role"),
      context: t("items.1.company"),
      body: t("items.1.quote"),
    },
    {
      headline: t("items.2.role"),
      context: t("items.2.company"),
      body: t("items.2.quote"),
    },
  ];

  return (
    <section className="border-t border-white/5 bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                {card.headline}
              </p>
              <p className="mb-4 mt-1 text-xs text-muted-foreground">
                {card.context}
              </p>
              <p className="text-lg leading-relaxed text-white">
                &quot;{card.body}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
