import {
  classifyCaseStudySection,
  parseCaseStudyContent,
  type CaseStudyBlock,
  type CaseStudySectionVariant,
} from "@/lib/parse-case-study-content";

function RichLine({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-ink">
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
              className="text-[15px] leading-[1.75] text-ink-mute md:text-base"
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
                className="flex gap-3 text-[15px] leading-relaxed text-ink-mute md:text-base"
              >
                <span
                  className="mt-2.5 h-px w-3 shrink-0 bg-sienna"
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
    label: string;
  }
> = {
  tech: {
    label: "Engineering",
  },
  biz: {
    label: "Business",
  },
  mba: {
    label: "MBA lens",
  },
  links: {
    label: "Links",
  },
  default: {
    label: "More",
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
      {parsed.introBlocks.length > 0 ? (
        <div className="border-y border-ink bg-card p-6 md:p-9">
          <p className="kicker mb-5">{locale === "fa" ? "داستان کیس" : "Case story"}</p>
          <BlockList blocks={parsed.introBlocks} />
        </div>
      ) : null}

      <div className="divide-y divide-ink border-y border-ink">
        {parsed.sections.map((section, idx) => {
          const variant = classifyCaseStudySection(section.heading);
          const styles = variantStyles[variant];

          if (variant === "links") {
            return (
              <section key={idx} className="bg-paper-soft px-5 py-7 md:px-7">
                <div className="mb-5">
                  <p className="kicker">{styles.label}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{section.heading}</h3>
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
                                  className="break-all text-sienna underline decoration-sienna/40 underline-offset-4 transition hover:text-ink"
                                >
                                  {trimmed}
                                </a>
                              ) : (
                                <span className="text-ink-mute">
                                  <RichLine text={item} />
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p key={bi} className="text-sm text-ink-mute">
                        <RichLine text={block.text} />
                      </p>
                    )
                  )}
                </div>
              </section>
            );
          }

          return (
            <section key={idx} className="bg-paper px-5 py-7 md:px-7 md:py-9">
              <div className="mb-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-sienna">
                  {variant === "tech" && (showEnLabel ? "Technical depth" : "عمق فنی")}
                  {variant === "biz" && (showEnLabel ? "Strategy & value" : "استراتژی و ارزش")}
                  {variant === "mba" && (showEnLabel ? "After the MBA" : "بعد از MBA")}
                  {variant === "default" && styles.label}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink md:text-[28px]">
                  {section.heading}
                </h3>
              </div>
              <BlockList blocks={section.blocks} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
