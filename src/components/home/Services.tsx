"use client";

import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

const TIER_KEYS = ["small", "business", "saas", "retainer"] as const;

/**
 * Services as "Lanes" — laid out like an editorial 2x2 spread.
 * Featured lane wears a sienna stamp instead of a glowing badge.
 */
export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale();
  const isFa = locale === "fa";

  const tiers = TIER_KEYS.map((key, i) => ({
    key,
    index: i,
    name: t(`tiers.${key}.name`),
    tagline: t(`tiers.${key}.tagline`),
    description: t(`tiers.${key}.description`),
    features: [
      t(`tiers.${key}.features.0`),
      t(`tiers.${key}.features.1`),
      t(`tiers.${key}.features.2`),
      t(`tiers.${key}.features.3`),
      t(`tiers.${key}.features.4`),
    ],
    cta: t(`tiers.${key}.cta`),
    featured: key === "business",
    badge: key === "business" ? t("highlightBadge") : undefined,
  }));

  return (
    <section id="services" className="relative bg-paper-soft/40 torn-top">
      <div className="pointer-events-none absolute inset-0 halftone opacity-[0.07]" />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid items-end gap-6 border-b border-ink pb-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="kicker">{isFa ? "§06 — عمق همکاری" : "§06 — Where I go deepest"}</p>
            <h2
              className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-[56px]"
              dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />
          </div>
          <p className="md:col-span-5 max-w-[44ch] font-display text-[17px] leading-snug text-ink-mute md:text-[18px]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-ink md:grid-cols-2">
          {tiers.map((tier) => (
            <article
              key={tier.key}
              className={cn(
                "relative flex flex-col bg-paper p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-10",
                tier.featured && "bg-card shadow-[0_18px_38px_-26px_rgba(20,18,16,0.65)]"
              )}
            >
              {tier.featured && tier.badge && (
                <span className="absolute -top-3 right-6 stamp">{tier.badge}</span>
              )}

              <div className="flex items-baseline justify-between border-b border-ink/30 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
                  Lane 0{tier.index + 1}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sienna">
                  {tier.tagline}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[28px] leading-tight text-ink md:text-[34px]">
                {tier.name}
              </h3>

              <p className="mt-3 max-w-[46ch] font-display italic text-[17px] leading-snug text-ink-mute md:text-[18px]">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="grid grid-cols-[1.25rem_1fr] items-baseline gap-3 text-[15px] text-ink/85"
                  >
                    <span aria-hidden className="font-mono text-sienna">·</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-ink/30 flex items-center justify-between gap-4">
                <Link
                  href="/contact"
                  className={buttonVariants({
                    variant: tier.featured ? "sienna" : "outline",
                    size: "default",
                  })}
                >
                  {tier.cta}
                  <span className="ms-2 rtl:rotate-180">→</span>
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  {isFa ? "اسکوپ · همکاری async" : "scope · async-first"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
