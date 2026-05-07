"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = ["discovery", "design", "development", "launch"] as const;

/**
 * Process — typeset as a four-frame editorial flow.
 * Hand-drawn arrow strokes, big serif numerals, no icon orbs.
 */
export function Process() {
  const t = useTranslations("Process");

  return (
    <section className="relative bg-paper">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-4">
          <div>
            <p className="kicker">§07 — How I run an engagement</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-[44px]">
              {t("title")}<span className="italic text-sienna">.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] font-display italic text-[15px] leading-snug text-ink-mute md:text-[17px]">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((stepKey, index) => (
            <motion.div
              key={stepKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              {/* Hand-drawn arrow between cards (desktop) */}
              {index < steps.length - 1 && (
                <svg
                  aria-hidden
                  className="pointer-events-none absolute top-6 -right-4 hidden h-6 w-12 text-sienna md:block rtl:right-auto rtl:-left-4 rtl:rotate-180"
                  viewBox="0 0 60 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M2 12 C 14 4, 30 20, 56 12" />
                  <path d="M48 6 L 56 12 L 48 18" />
                </svg>
              )}

              <div className="border-l-2 border-ink pl-5 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
                  Step 0{index + 1}
                </span>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-[64px] italic leading-[0.85] text-sienna">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {t(`steps.${stepKey}.title`)}
                  </h3>
                </div>
                <p className="mt-3 max-w-[28ch] text-[14.5px] leading-relaxed text-ink-mute">
                  {t(`steps.${stepKey}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
