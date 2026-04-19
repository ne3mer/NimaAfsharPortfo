"use client";

import { motion } from "framer-motion";

import type { Localized } from "@/lib/project-showcase-types";

function pick(loc: Localized, locale: string) {
  return locale === "fa" ? loc.fa : loc.en;
}

type Props = {
  title: Localized;
  subtitle?: Localized;
  lines: string[];
  locale: string;
  hint: string;
};

export function TerminalShowcase({ title, subtitle, lines, locale, hint }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
          {pick(title, locale)}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{pick(subtitle, locale)}</p>
        ) : null}
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_-12px_rgba(0,0,0,0.65)]"
        dir="ltr"
      >
        <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900/90 px-4 py-3">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-lg bg-black/45 px-3 py-2 text-center font-mono text-xs text-zinc-500">
            sample-output.log
          </div>
        </div>
        <div className="bg-[#0a0a0c] px-4 py-4 font-mono text-[13px] leading-relaxed text-zinc-300 md:px-5 md:py-5 md:text-sm">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="mb-1.5 last:mb-0"
            >
              <span className="select-none text-zinc-600">{String(i + 1).padStart(2, "0")}</span>{" "}
              <span className="text-zinc-200">{line}</span>
            </motion.p>
          ))}
        </div>
        <p className="border-t border-white/5 bg-black/35 px-4 py-3 text-center text-xs text-muted-foreground md:text-sm">
          {hint}
        </p>
      </div>
    </div>
  );
}
