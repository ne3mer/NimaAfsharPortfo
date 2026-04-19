import {
  Briefcase,
  Code2,
  GraduationCap,
  Link2,
  Sparkles,
} from "lucide-react";

import {
  classifyCaseStudySection,
  parseCaseStudyContent,
  type CaseStudyBlock,
  type CaseStudySectionVariant,
} from "@/lib/parse-case-study-content";
import { cn } from "@/lib/utils";

function RichLine({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {seg.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{seg}</span>;
      })}
    </>
  );
}

function BlockList({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="text-[15px] leading-[1.75] text-zinc-300 md:text-base md:leading-relaxed"
            >
              <RichLine text={block.text} />
            </p>
          );
        }
        return (
          <ul key={i} className="space-y-3">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex gap-3 text-[15px] leading-relaxed text-zinc-300 md:text-base"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80"
                  aria-hidden
                />
                <span>
                  <RichLine text={item} />
                </span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

const variantStyles: Record<
  CaseStudySectionVariant,
  {
    card: string;
    iconWrap: string;
    label: string;
    Icon: typeof Code2;
  }
> = {
  tech: {
    card: "border-cyan-500/35 bg-gradient-to-br from-cyan-950/40 via-zinc-950/60 to-zinc-950 shadow-[inset_0_1px_0_0_rgba(34,211,238,0.12)]",
    iconWrap: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/25",
    label: "Engineering",
    Icon: Code2,
  },
  biz: {
    card: "border-emerald-500/35 bg-gradient-to-br from-emerald-950/35 via-zinc-950/60 to-zinc-950 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.1)]",
    iconWrap: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25",
    label: "Business",
    Icon: Briefcase,
  },
  mba: {
    card: "border-violet-500/40 bg-gradient-to-br from-violet-950/45 via-zinc-950/50 to-zinc-950 shadow-[inset_0_1px_0_0_rgba(167,139,250,0.15)]",
    iconWrap: "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30",
    label: "MBA lens",
    Icon: GraduationCap,
  },
  links: {
    card: "border-white/12 bg-zinc-950/80",
    iconWrap: "bg-white/5 text-zinc-300 ring-1 ring-white/10",
    label: "Links",
    Icon: Link2,
  },
  default: {
    card: "border-white/10 bg-zinc-950/50",
    iconWrap: "bg-primary/10 text-primary ring-1 ring-primary/20",
    label: "More",
    Icon: Sparkles,
  },
};

type Props = {
  content: string;
  /** Locale for tiny English labels on section chips (optional visual) */
  locale?: string;
};

export function CaseStudyContent({ content, locale = "en" }: Props) {
  const parsed = parseCaseStudyContent(content);
  const showEnLabel = locale === "en";

  return (
    <div className="not-prose space-y-10">
      {/* Lead story */}
      {parsed.introBlocks.length > 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-primary/90">
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              {locale === "fa" ? "داستان کیس" : "Case story"}
            </p>
            <BlockList blocks={parsed.introBlocks} />
          </div>
        </div>
      ) : null}

      {/* Section cards */}
      <div className="space-y-6">
        {parsed.sections.map((section, idx) => {
          const variant = classifyCaseStudySection(section.heading);
          const styles = variantStyles[variant];
          const { Icon } = styles;

          if (variant === "links") {
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border px-5 py-5 md:px-6",
                  styles.card
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      styles.iconWrap
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {section.heading}
                  </h3>
                </div>
                <div className="space-y-3">
                  {section.blocks.map((block, bi) =>
                    block.type === "ul" ? (
                      <ul key={bi} className="space-y-2 font-mono text-sm">
                        {block.items.map((item, j) => {
                          const trimmed = item.trim();
                          const isUrl = /^https?:\/\//i.test(trimmed);
                          return (
                            <li key={j}>
                              {isUrl ? (
                                <a
                                  href={trimmed}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-cyan-200/90 underline decoration-cyan-500/40 underline-offset-4 transition hover:text-white"
                                >
                                  {trimmed}
                                </a>
                              ) : (
                                <span className="text-zinc-300">
                                  <RichLine text={item} />
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p key={bi} className="text-sm text-zinc-400">
                        <RichLine text={block.text} />
                      </p>
                    )
                  )}
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={cn(
                "rounded-3xl border p-6 md:p-8",
                styles.card
              )}
            >
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      styles.iconWrap
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      {variant === "tech" &&
                        (showEnLabel ? "Technical depth" : "عمق فنی")}
                      {variant === "biz" &&
                        (showEnLabel ? "Strategy & value" : "استراتژی و ارزش")}
                      {variant === "mba" &&
                        (showEnLabel ? "After the MBA" : "بعد از MBA")}
                      {variant === "default" && styles.label}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-white md:text-2xl">
                      {section.heading}
                    </h3>
                  </div>
                </div>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block sm:min-w-[3rem]" />
              </div>
              <BlockList blocks={section.blocks} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
