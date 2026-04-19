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
        <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
          {sectionTitle}
        </h2>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          {openLabel}
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_-12px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900/90 px-4 py-3">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-lg bg-black/45 px-3 py-2 text-center text-xs text-zinc-400">
            {url}
          </div>
        </div>

        <div className="relative bg-[#0a0a0c]">
          <iframe
            src={url}
            title={title}
            className="block h-[min(78vh,880px)] w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="border-t border-white/5 bg-black/35 px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
          {hint}
        </p>
      </div>
    </div>
  );
}
