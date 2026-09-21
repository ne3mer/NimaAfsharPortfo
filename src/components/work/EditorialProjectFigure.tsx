import Image from "next/image";

import type { PortfolioDiagram, PortfolioVisual } from "@/data/portfolio-projects";
import { EditorialReveal } from "@/components/ui/EditorialReveal";

export function EditorialProjectFigure({
  visual,
  priority = false,
  className = "",
}: {
  visual: PortfolioVisual;
  priority?: boolean;
  className?: string;
}) {
  const aspect =
    visual.aspect === "portrait"
      ? "aspect-[4/5] md:aspect-[3/4]"
      : visual.aspect === "landscape"
        ? "aspect-[4/3] md:aspect-[16/10]"
        : "aspect-[16/10] md:aspect-[16/9]";

  return (
    <EditorialReveal className={className}>
      <figure className="border border-ink bg-paper-soft p-2 md:p-3">
        <div className={`relative overflow-hidden bg-paper-deep ${aspect}`}>
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className={visual.fit === "contain" ? "object-contain" : "object-cover"}
            style={{ objectPosition: visual.position ?? "top" }}
          />
        </div>
        <figcaption className="grid gap-2 border-t border-ink/20 px-1 pt-3 md:grid-cols-[180px_1fr]">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sienna">
            {visual.label}
          </span>
          <span className="max-w-[64ch] text-[13px] leading-relaxed text-ink-mute">
            {visual.caption}
          </span>
        </figcaption>
      </figure>
    </EditorialReveal>
  );
}

export function ArchitectureDiagram({ diagram }: { diagram: PortfolioDiagram }) {
  return (
    <EditorialReveal>
      <figure className="border-y border-ink bg-card px-5 py-8 md:px-8 md:py-10">
      <figcaption className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sienna">
          {diagram.label}
        </span>
        {diagram.note ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {diagram.note}
          </span>
        ) : null}
      </figcaption>
      <ol className="flex flex-col gap-3 md:flex-row md:items-stretch">
        {diagram.nodes.map((node, index) => (
          <li key={node} className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex min-h-24 min-w-0 flex-1 items-center justify-between gap-3 border border-ink/35 bg-paper px-4 py-5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-sienna">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-right font-display text-[19px] leading-tight text-ink">
                {node}
              </span>
            </div>
            {index < diagram.nodes.length - 1 ? (
              <span
                aria-hidden="true"
                className="hidden shrink-0 self-center text-center font-mono text-lg text-sienna md:block"
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      </figure>
    </EditorialReveal>
  );
}

export function EvidenceNote({ children }: { children: string }) {
  return (
    <div className="border border-dashed border-ink/35 bg-paper-deep px-5 py-7 md:px-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sienna">
        Technical note
      </p>
      <p className="mt-3 max-w-[60ch] text-[13px] leading-relaxed text-ink-mute">{children}</p>
    </div>
  );
}
