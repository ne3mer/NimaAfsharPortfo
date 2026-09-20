import { ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import type { PortfolioProject } from "@/data/portfolio-projects";

export function PortfolioCard({
  project,
  variant = "standard",
}: {
  project: PortfolioProject;
  variant?: "cover" | "wide" | "standard";
}) {
  const isCover = variant === "cover";
  const isWide = variant === "wide";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={[
        "group relative grid overflow-hidden border border-ink bg-paper transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sienna focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        isCover && "lg:grid-cols-12",
        isWide && "md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)]",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`View case study: ${project.title}`}
    >
      <ProjectPlate project={project} priority={isCover} variant={variant} />

      <div
        className={[
          "flex min-w-0 flex-col p-5 md:p-7",
          isCover && "lg:col-span-5 lg:p-10",
          isWide && "md:p-8",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/25 pb-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-sienna">
              Project {project.number}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              {project.category}
            </p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sienna"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <h3
          className={[
            "mt-5 font-display leading-[1.02] text-ink transition-colors group-hover:text-sienna",
            isCover ? "text-[clamp(2rem,4vw,3.5rem)]" : "text-[clamp(1.65rem,3vw,2.35rem)]",
          ].join(" ")}
        >
          {project.shortTitle}
        </h3>
        <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-mute md:text-[15px]">
          {project.summary}
        </p>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-ink/20 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            {project.stack.slice(0, isCover ? 6 : 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink group-hover:text-sienna">
            View case study
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProjectPlate({
  project,
  priority,
  variant,
}: {
  project: PortfolioProject;
  priority: boolean;
  variant: "cover" | "wide" | "standard";
}) {
  const dimensions =
    variant === "cover"
      ? "aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]"
      : variant === "wide"
        ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]"
        : "aspect-[4/3]";

  return (
    <div className={`relative overflow-hidden border-b border-ink bg-paper-deep md:border-b-0 ${dimensions}`}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes={
            variant === "cover"
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover saturate-[0.82] transition-[filter,transform] duration-500 group-hover:scale-[1.015] group-hover:saturate-100"
          style={{ objectPosition: project.image.objectPosition ?? "center" }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
          <div className="grid grid-cols-6 gap-2 border-y border-ink/25 py-3" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="h-px bg-ink/20" />
            ))}
          </div>
          <div>
            <ImageIcon className="h-5 w-5 text-sienna" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 max-w-[20ch] font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[0.95] text-ink">
              {project.visualLabel}
            </p>
            <p className="mt-4 border-t border-ink/25 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute">
              Product image requested · no synthetic UI
            </p>
          </div>
        </div>
      )}

      <span className="absolute left-0 top-0 bg-ink px-3 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-paper">
        Plate {project.number}
      </span>
      <span className="absolute bottom-3 right-3 border border-ink bg-paper/95 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-mute">
        {project.section}
      </span>
    </div>
  );
}
