"use client";

import { FileText, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

import { PROFILE_LINKS } from "@/lib/profile-links";

/** Top-of-fold hiring CTA row: Download CV + LinkedIn + GitHub. */
export function HeroTopCtaBar() {
  const t = useTranslations("ProfileLinks");

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black/45 p-2 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={PROFILE_LINKS.cvRequest}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/20 px-4 text-sm font-semibold text-primary transition hover:bg-primary/30 hover:text-white"
        >
          <FileText className="h-4 w-4" aria-hidden />
          {t("requestCv")}
        </a>
        <a
          href={PROFILE_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
        >
          <Linkedin className="h-4 w-4" aria-hidden />
          {t("linkedin")}
        </a>
        <a
          href={PROFILE_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
        >
          <Github className="h-4 w-4" aria-hidden />
          {t("github")}
        </a>
      </div>
    </div>
  );
}
