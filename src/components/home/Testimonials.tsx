"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      quote: t("items.0.quote"),
      author: "Sarah Jenkins",
      role: t("items.0.role"),
      company: t("items.0.company")
    },
    {
      quote: t("items.1.quote"),
      author: "David Chen",
      role: t("items.1.role"),
      company: t("items.1.company")
    },
    {
      quote: t("items.2.quote"),
      author: "Elena Rodriguez",
      role: t("items.2.role"),
      company: t("items.2.company")
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 relative">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-white mb-6 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
                <div className="text-xs text-primary mt-1">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
