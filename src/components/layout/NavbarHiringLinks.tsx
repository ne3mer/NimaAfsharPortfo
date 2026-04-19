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
        "flex items-center gap-1 border border-white/10 bg-white/[0.04] px-1.5 py-1 rounded-full",
        className
      )}
    >
      <a
        href={PROFILE_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
        aria-label={t("linkedinAria")}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={PROFILE_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
        aria-label={t("githubAria")}
      >
        <Github className="h-4 w-4" />
      </a>
      <a
        href={PROFILE_LINKS.cvRequest}
        className="flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
      >
        <FileText className="h-3.5 w-3.5" aria-hidden />
        {t("cvShort")}
      </a>
    </div>
  );
}
