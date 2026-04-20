"use client";

import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { PROFILE_LINKS } from "@/lib/profile-links";

type Props = {
  /** Override default "Hiring pack" label (e.g. on Contact page). */
  stripLabel?: string;
  /** Hide the small uppercase strip (e.g. when the page already has a heading). */
  hideStrip?: boolean;
};

/**
 * Always-visible hire-pack chips: LinkedIn · GitHub · Request CV · Intro.
 * The CV chip is intentionally rendered in primary color so it reads as the main "ask".
 */
export function HeroQuickLinks({ stripLabel, hideStrip }: Props) {
  const t = useTranslations("ProfileLinks");

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {!hideStrip ? (
        <span className="w-full text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 md:inline md:w-auto md:pe-2">
          {stripLabel ?? t("stripLabel")}
        </span>
      ) : null}

      <a
        href={PROFILE_LINKS.cvRequest}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-2 text-xs font-semibold text-primary shadow-[0_0_24px_-12px_rgba(59,130,246,0.6)] transition hover:bg-primary/25 hover:text-white"
      >
        <FileText className="h-4 w-4" aria-hidden />
        {t("requestCv")}
      </a>
      <a
        href={PROFILE_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
      >
        <Linkedin className="h-4 w-4" aria-hidden />
        {t("linkedin")}
      </a>
      <a
        href={PROFILE_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
      >
        <Github className="h-4 w-4" aria-hidden />
        {t("github")}
      </a>
      <a
        href={PROFILE_LINKS.introCall}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/25 hover:text-white"
      >
        <Mail className="h-4 w-4" aria-hidden />
        {t("introCall")}
      </a>
    </div>
  );
}
