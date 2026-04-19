"use client";

import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { PROFILE_LINKS } from "@/lib/profile-links";

type Props = {
  /** Override default “Hiring pack” label (e.g. on Contact page). */
  stripLabel?: string;
  /** Hide the small uppercase strip (e.g. when the page already has a heading). */
  hideStrip?: boolean;
};

export function HeroQuickLinks({ stripLabel, hideStrip }: Props) {
  const t = useTranslations("ProfileLinks");

  const items = [
    { href: PROFILE_LINKS.linkedin, label: t("linkedin"), Icon: Linkedin },
    { href: PROFILE_LINKS.github, label: t("github"), Icon: Github },
    { href: PROFILE_LINKS.cvRequest, label: t("requestCv"), Icon: FileText },
    { href: PROFILE_LINKS.introCall, label: t("introCall"), Icon: Mail },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {!hideStrip ? (
        <span className="w-full text-[10px] font-medium uppercase tracking-[0.2em] text-white/35 md:inline md:w-auto md:pe-2">
          {stripLabel ?? t("stripLabel")}
        </span>
      ) : null}
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-primary/40 hover:text-white"
        >
          <Icon className="h-3.5 w-3.5 opacity-80" aria-hidden />
          {label}
        </a>
      ))}
    </div>
  );
}
