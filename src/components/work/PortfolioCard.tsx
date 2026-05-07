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
  const frameStyles = [
    {
      name: isFa ? "ادیشن کلکسیونی" : "Collector's Cut",
      frame: "border-2 border-ink",
      mat: "bg-paper p-1.5",
      tint: "after:bg-sienna/8",
      deco: "top-left",
    },
    {
      name: isFa ? "نسخه آرشیوی" : "Archive Edition",
      frame: "border border-ink/70",
      mat: "bg-paper-soft p-2",
      tint: "after:bg-olive/8",
      deco: "top-right",
    },
    {
      name: isFa ? "پریمیم پرینت" : "Premium Print",
      frame: "border border-ink",
      mat: "bg-paper p-1",
      tint: "after:bg-gold/10",
      deco: "bottom-left",
    },
    {
      name: isFa ? "گالری نایت" : "Gallery Night",
      frame: "border-2 border-ink/80",
      mat: "bg-paper-deep p-1.5",
      tint: "after:bg-ink/12",
      deco: "bottom-right",
    },
  ] as const;
  const frame = frameStyles[index % frameStyles.length];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col border border-ink/20 bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_36px_-26px_rgba(20,18,16,0.55)]"
    >
      <div className={`relative m-2 ${frame.frame} ${frame.mat}`}>
        <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-deep">
          {project.image ? (
            <NextImage
              src={project.image}
              alt=""
              fill
              className="object-cover saturate-[0.84] transition-all duration-500 group-hover:saturate-[1.02] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-paper-deep">
              <span className="font-display text-6xl italic text-ink/30">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
          <div className={`pointer-events-none absolute inset-0 ${frame.tint}`} />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/20" />

          {/* Creative signature marker per card frame */}
          <span
            className={[
              "pointer-events-none absolute inline-flex h-5 min-w-5 items-center justify-center border border-ink/70 bg-paper px-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-mute",
              frame.deco === "top-left" && "top-2 left-2",
              frame.deco === "top-right" && "top-2 right-2",
              frame.deco === "bottom-left" && "bottom-2 left-2",
              frame.deco === "bottom-right" && "bottom-2 right-2",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute left-0 top-0 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
            {plateLabel} {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-sienna">
            {entryLabel} {String(index + 1).padStart(3, "0")}
          </span>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint md:inline">
            {frame.name}
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
