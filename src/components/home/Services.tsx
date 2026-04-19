"use client";

import { buttonVariants } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const TIER_KEYS = ["small", "business", "saas", "retainer"] as const;

export function Services() {
  const t = useTranslations("Services");

  const tiers = TIER_KEYS.map((key) => ({
    key,
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
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white"
            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
          />
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={cn(
                "relative p-6 rounded-2xl border flex flex-col",
                tier.featured
                  ? "bg-white/5 border-primary/50 shadow-2xl shadow-primary/10"
                  : "bg-background border-white/10 hover:border-white/20 transition-colors"
              )}
            >
              {tier.featured && tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <div className="text-xs font-mono uppercase tracking-wider text-primary/90 mb-3">
                  {tier.tagline}
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={buttonVariants({
                  variant: tier.featured ? "default" : "outline",
                  className: "w-full",
                })}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
