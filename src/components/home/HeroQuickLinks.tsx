"use client";

import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { PROFILE_LINKS } from "@/lib/profile-links";

type Props = {
  stripLabel?: string;
  hideStrip?: boolean;
};

/**
 * Hire-pack chips, rendered as editorial set-in directory entries.
 * Sharp ink frame, minimal hover (ink fill).
 */
export function HeroQuickLinks({ stripLabel, hideStrip }: Props) {
  const t = useTranslations("ProfileLinks");

  const linkClass =
    "inline-flex items-center gap-2 border border-ink/30 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-paper";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!hideStrip ? (
        <span className="me-2 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
          {stripLabel ?? t("stripLabel")} ✻
        </span>
      ) : null}

      <a
        href={PROFILE_LINKS.cvRequest}
        className="inline-flex items-center gap-2 border border-sienna bg-sienna/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-sienna transition hover:bg-sienna hover:text-paper"
      >
        <FileText className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
        {t("requestCv")}
      </a>
      <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
        <Linkedin className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
        {t("linkedin")}
      </a>
      <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
        <Github className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
        {t("github")}
      </a>
      <a href={PROFILE_LINKS.introCall} className={linkClass}>
        <Mail className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
        {t("introCall")}
      </a>
    </div>
  );
}
