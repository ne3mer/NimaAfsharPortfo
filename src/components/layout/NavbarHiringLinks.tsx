"use client";

import { FileText, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

import { PROFILE_LINKS } from "@/lib/profile-links";
import { cn } from "@/lib/utils";

export function NavbarHiringLinks({ className }: { className?: string }) {
  const t = useTranslations("Navbar");

  return (
    <div
      className={cn(
        "flex items-center divide-x divide-ink/15 border border-ink/25",
        className
      )}
    >
      <a
        href={PROFILE_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center text-ink-mute transition hover:bg-ink hover:text-paper"
        aria-label={t("linkedinAria")}
      >
        <Linkedin className="h-4 w-4" strokeWidth={1.5} />
      </a>
      <a
        href={PROFILE_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center text-ink-mute transition hover:bg-ink hover:text-paper"
        aria-label={t("githubAria")}
      >
        <Github className="h-4 w-4" strokeWidth={1.5} />
      </a>
      <a
        href={PROFILE_LINKS.cvRequest}
        className="flex h-9 items-center gap-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-sienna transition hover:bg-sienna hover:text-paper"
      >
        <FileText className="h-3.5 w-3.5" aria-hidden strokeWidth={1.5} />
        {t("cvShort")}
      </a>
    </div>
  );
}
