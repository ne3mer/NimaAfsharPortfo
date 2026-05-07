"use client";

import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function PortfolioStart() {
  const t = useTranslations("Start");

  const cards = ["card1", "card2", "card3"] as const;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="passepartout bg-card p-8 md:p-12"
      >
        <p className="kicker mb-3">{t("ribbon")}</p>
        <h2 className="font-display text-3xl leading-tight text-ink md:text-[44px]">
          {t("headline")}<span className="italic text-sienna">.</span>
        </h2>
        <p className="dropcap mt-6 max-w-[64ch] text-[16px] leading-[1.75] text-ink/85 md:text-[17px]">
          {t("intro")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className={buttonVariants({ variant: "sienna", size: "lg" })}>
            {t("primaryCta")} <span className="ms-2 rtl:rotate-180">→</span>
          </Link>
          <Link href="/work" className={buttonVariants({ variant: "outline", size: "lg" })}>
            {t("secondaryCta")}
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-px bg-ink md:grid-cols-3">
        {cards.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className="bg-paper p-6 md:p-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
              Note 0{i + 1}
            </span>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-[28px]">
              {t(`${id}.title`)}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
              {t(`${id}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
