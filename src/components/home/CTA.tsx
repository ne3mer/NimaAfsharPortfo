"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Closing column — set as the back-cover of the issue.
 * Big italic serif kicker, signature, postal-style stamp at right.
 */
export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="relative bg-ink text-paper">
      {/* Engraved hatch on the dark page */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="cta-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#ECE4D2" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-hatch)" />
      </svg>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/60">
              §08 — Closing column · End of issue
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-tight text-paper"
            >
              {t("title")
                .split(" ")
                .map((w, i) => (
                  <span key={i} className={i % 2 === 0 ? "" : "italic text-sienna"}>
                    {w}{" "}
                  </span>
                ))}
            </motion.h2>

            <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-paper/80 md:text-[20px]">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "sienna", size: "xl" }),
                  "shadow-none"
                )}
              >
                {t("primary")}
                <span className="ms-3 rtl:rotate-180">→</span>
              </Link>
              <Link
                href="/work"
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "border-paper text-paper hover:bg-paper hover:text-ink"
                )}
              >
                {t("secondary")}
              </Link>
            </div>
          </div>

          {/* Postal stamp / signature card */}
          <div className="md:col-span-4">
            <div className="relative border border-paper/40 p-6 text-paper">
              <span className="absolute -top-3 -left-3 stamp" style={{ borderColor: "#ECE4D2", color: "#ECE4D2", background: "rgba(236,228,210,0.06)" }}>
                Postmark · BUD
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/60">
                Yours sincerely,
              </p>
              <p className="mt-3 font-display text-[40px] italic leading-none">
                Nima
              </p>
              <p className="mt-3 max-w-[32ch] text-sm text-paper/70">
                Mohammad Afsharfar — engineer, MBA graduate, founder. Replies in EN, FA, or HU.
              </p>
              <div className="mt-5 grid grid-cols-3 divide-x divide-paper/20 border-t border-paper/30 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em]">
                <span>BUD</span>
                <span>EU</span>
                <span>RMT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
