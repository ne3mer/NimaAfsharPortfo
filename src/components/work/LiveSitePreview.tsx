"use client";

import { ExternalLink } from "lucide-react";

type Props = {
  url: string;
  title: string;
  sectionTitle: string;
  hint: string;
  openLabel: string;
};

export function LiveSitePreview({
  url,
  title,
  sectionTitle,
  hint,
  openLabel,
}: Props) {
  return (
    <div className="mt-10 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl text-ink md:text-[28px]">
          {sectionTitle}
        </h2>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-ink bg-paper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          {openLabel}
        </a>
      </div>

      <div className="overflow-hidden border border-ink bg-paper-soft">
        <div className="flex items-center gap-3 border-b border-ink bg-paper-deep px-4 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sienna">Live plate</span>
          <div className="min-w-0 flex-1 truncate border-l border-ink/20 pl-3 text-center font-mono text-[10px] text-ink-mute">
            {url}
          </div>
        </div>

        <div className="relative bg-paper">
          <iframe
            src={url}
            title={title}
            className="block h-[min(78vh,880px)] w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="border-t border-ink/20 bg-paper-soft px-4 py-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] leading-relaxed text-ink-mute">
          {hint}
        </p>
      </div>
    </div>
  );
}
