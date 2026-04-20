"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import NextImage from "next/image";

export type WorkCardData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  /** Optional 1-line headline result shown directly on the card (off-image). */
  outcome?: string;
};

/**
 * Work grid card: image stays visual-only; title + summary + 1-line outcome sit below (not on the thumbnail).
 */
export function PortfolioCard({ project }: { project: WorkCardData }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {project.image ? (
          <NextImage
            src={project.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
      </div>

      <div className="border-t border-white/5 p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary md:text-xl">
            {project.title}
          </h3>
          <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.outcome ? (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-xs text-emerald-100/95 md:text-[13px]">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
            <span className="line-clamp-2">{project.outcome}</span>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
