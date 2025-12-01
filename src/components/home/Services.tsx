"use client";

import { buttonVariants } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Services() {
  const t = useTranslations("Services");

  const tiers = [
    {
      name: t("tiers.small.name"),
      price: "€400 - €1,200",
      description: t("tiers.small.description"),
      features: [
        t("tiers.small.features.0"),
        t("tiers.small.features.1"),
        t("tiers.small.features.2"),
        t("tiers.small.features.3"),
        t("tiers.small.features.4"),
      ],
      cta: t("tiers.small.cta"),
      href: "/start?type=small",
    },
    {
      name: t("tiers.business.name"),
      price: "€1,500 - €5,000",
      description: t("tiers.business.description"),
      features: [
        t("tiers.business.features.0"),
        t("tiers.business.features.1"),
        t("tiers.business.features.2"),
        t("tiers.business.features.3"),
        t("tiers.business.features.4"),
      ],
      cta: t("tiers.business.cta"),
      href: "/start?type=business",
      featured: true,
      badge: t("tiers.business.badge"),
    },
    {
      name: t("tiers.saas.name"),
      price: "€6,000+",
      description: t("tiers.saas.description"),
      features: [
        t("tiers.saas.features.0"),
        t("tiers.saas.features.1"),
        t("tiers.saas.features.2"),
        t("tiers.saas.features.3"),
        t("tiers.saas.features.4"),
      ],
      cta: t("tiers.saas.cta"),
      href: "/start?type=saas",
    },
    {
      name: t("tiers.retainer.name"),
      price: "€150 - €800/mo",
      description: t("tiers.retainer.description"),
      features: [
        t("tiers.retainer.features.0"),
        t("tiers.retainer.features.1"),
        t("tiers.retainer.features.2"),
        t("tiers.retainer.features.3"),
        t("tiers.retainer.features.4"),
      ],
      cta: t("tiers.retainer.cta"),
      href: "/contact",
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white"
            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
          />
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative p-6 rounded-2xl border flex flex-col",
                tier.featured
                  ? "bg-white/5 border-primary/50 shadow-2xl shadow-primary/10"
                  : "bg-background border-white/10 hover:border-white/20 transition-colors"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  {tier.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <div className="text-2xl font-bold text-primary mb-2">{tier.price}</div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

                <Link href={tier.href} className={buttonVariants({ variant: tier.featured ? "default" : "outline", className: "w-full" })}>{tier.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
