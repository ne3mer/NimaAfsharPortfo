"use client";

import { ArrowUpRight } from "lucide-react";
import NextImage from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

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
 * Editorial portfolio card — looks like a printed catalogue entry.
 */
export function PortfolioCard({
  project,
  index = 0,
}: {
  project: WorkCardData;
  index?: number;
}) {
  const locale = useLocale();
  const isFa = locale === "fa";
  const plateLabel = isFa ? "پلیت" : "Plate";
  const entryLabel = isFa ? "پروژه" : "Project";
  const outcomeLabel = isFa ? "خروجی" : "Outcome";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col bg-paper transition-colors hover:bg-card"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-deep">
        {project.image ? (
          <NextImage
            src={project.image}
            alt=""
            fill
            className="object-cover saturate-[0.85] transition-all duration-500 group-hover:saturate-100 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-deep">
            <span className="font-display text-6xl italic text-ink/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15" />
        <div className="absolute left-0 top-0 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
          {plateLabel} {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-sienna">
            {entryLabel} {String(index + 1).padStart(3, "0")}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sienna"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="mt-3 font-display text-[23px] leading-tight text-ink transition-colors group-hover:text-sienna md:text-[27px]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-mute">
          {project.description}
        </p>

        {project.outcome ? (
          <div className="mt-4 border-l-2 border-olive ps-3 rtl:border-l-0 rtl:border-r-2">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-olive">
              {outcomeLabel}
            </p>
            <p className="mt-1 line-clamp-3 font-display italic text-[14px] leading-snug text-ink-soft">
              {project.outcome}
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-ink/15 pt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="border border-ink/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
