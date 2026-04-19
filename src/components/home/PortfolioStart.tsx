"use client";

import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Cpu, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function PortfolioStart() {
  const t = useTranslations("Start");

  const cards = [
    { id: "card1", icon: Sparkles },
    { id: "card2", icon: Cpu },
    { id: "card3", icon: Compass },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-8 md:p-10 backdrop-blur-sm"
      >
        <p className="text-sm font-mono uppercase tracking-[0.25em] text-primary mb-4">
          {t("ribbon")}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          {t("headline")}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
          {t("intro")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "premium",
              size: "lg",
              className: "h-14 px-8 rounded-full justify-center",
            })}
          >
            {t("primaryCta")}
            <ArrowRight className="ml-2 h-5 w-5 rtl:rotate-180" />
          </Link>
          <Link
            href="/work"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "h-14 px-8 rounded-full border-white/15 bg-white/5 justify-center",
            })}
          >
            {t("secondaryCta")}
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {cards.map(({ id, icon: Icon }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-primary/30 transition-colors"
          >
            <Icon className="h-8 w-8 text-primary mb-4" aria-hidden />
            <h3 className="font-semibold text-white mb-2">{t(`${id}.title`)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`${id}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
