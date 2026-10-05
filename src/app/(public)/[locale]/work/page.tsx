import type { Metadata } from "next";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { PortfolioCard } from "@/components/work/PortfolioCard";
import {
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
} from "@/data/portfolio-projects";

const SITE_URL = "https://www.nimastudio.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/work`;
  const title = "Selected Work — Products, Engineering & Strategy";
  const description =
    "Selected products and systems spanning supplier intelligence, SaaS, data engineering and automation.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "NIMA Studio",
      images: [
        {
          url: `${SITE_URL}/images/work/nima-studio/02-work-archive.webp`,
          width: 1440,
          height: 1000,
          alt: "NIMA Studio selected Work archive",
        },
      ],
    },
  };
}

export default async function WorkPage({
  params: _params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await _params;
  const published = PORTFOLIO_PROJECTS.filter((p) => p.status === "published");
  const archive = PORTFOLIO_PROJECTS.filter(
    (p) => p.section === "Archive" || p.status === "archive"
  );
  const cover = published.find((p) => p.section === "Cover Story") ?? published[0];
  const groups = [
    {
      label: "Featured",
      note: "Product strategy and full-stack systems",
      projects: published.filter((project) => project.section === "Featured"),
      variant: "wide" as const,
    },
    {
      label: "Selected Systems",
      note: "SaaS product thinking and studio infrastructure",
      projects: published.filter((project) => project.section === "Selected Systems"),
      variant: "standard" as const,
    },
    {
      label: "Automation & Data",
      note: "Python pipelines and operational tooling",
      projects: published.filter((project) => project.section === "Automation & Data"),
      variant: "standard" as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
        <span>Atelier · Work Archive</span>
        <span>Selected Work · Vol. II, p. 02</span>
        <span className="text-sienna">{published.length} projects</span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <aside className="col-span-12 lg:col-span-4">
          <p className="kicker">§02 — Selected Work</p>
          <p className="mt-3 max-w-[34ch] font-display text-[18px] leading-snug text-ink">
            Each project follows the same framing: what I built, what I owned, what it demonstrates.
          </p>
          <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-ink-mute">
            A curated record of products and systems—not a catalogue of every technology used.
          </p>
        </aside>

        <div className="col-span-12 lg:col-span-8 lg:pt-2">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-ink">
            Products, systems and digital experiences
            <span className="italic text-sienna">.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
            Designed across product strategy, full-stack engineering, data and automation.
          </p>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="cover-story-heading">
        <div className="mb-4 flex items-end justify-between border-b border-ink pb-2">
          <h2 id="cover-story-heading" className="kicker">Cover Story</h2>
          <span className="stamp">Decision Board</span>
        </div>
        <PortfolioCard project={cover} variant="cover" />
      </section>

      <div className="mt-16 space-y-16">
        {groups.map((group, groupIndex) => (
          <ProjectGroup
            key={group.label}
            label={group.label}
            note={group.note}
            projects={group.projects}
            variant={group.variant}
            index={groupIndex + 1}
          />
        ))}
      </div>

      <aside className="mt-16 grid gap-px bg-ink md:grid-cols-12" aria-label="Letter from the editor">
        <div className="bg-paper-soft p-5 md:col-span-4 md:p-6">
          <p className="kicker">— Letter from the Editor —</p>
        </div>
        <div className="bg-card p-5 md:col-span-8 md:p-6">
          <p className="max-w-[62ch] font-display text-[19px] italic leading-snug text-ink md:text-[22px]">
            The archive follows the decisions behind each product—how to explain risk, operate a
            system, or turn unstructured material into useful data.
          </p>
        </div>
      </aside>

      <section className="mt-20 border-t border-ink pt-5" aria-labelledby="archive-heading">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Archive Notes</p>
            <h2 id="archive-heading" className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Earlier plates<span className="italic text-sienna">.</span>
            </h2>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-mute">
              Previous work remains available as part of the studio record, without competing with
              the current selected archive.
            </p>
          </div>
          <div className="grid gap-px bg-ink sm:grid-cols-3 lg:col-span-8">
            {archive.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex min-h-48 flex-col bg-paper p-5 transition-colors hover:bg-paper-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sienna"
              >
                <div className="flex items-center justify-between border-b border-ink/20 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Archive {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="text-ink-mute group-hover:text-sienna">↗</span>
                </div>
                {project.image ? (
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden border border-ink/20">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt || ""}
                      fill
                      sizes="(max-width: 640px) 100vw, 220px"
                      className="object-cover saturate-[0.6]"
                    />
                  </div>
                ) : null}
                <h3 className="mt-auto pt-5 font-display text-xl leading-tight text-ink group-hover:text-sienna">
                  {project.shortTitle || project.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectGroup({
  label,
  note,
  projects,
  variant,
  index,
}: {
  label: string;
  note: string;
  projects: PortfolioProject[];
  variant: "wide" | "standard";
  index: number;
}) {
  return (
    <section aria-labelledby={`group-${index}`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-ink pb-2">
        <h2 id={`group-${index}`} className="kicker">
          §0{index + 2} — {label}
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{note}</p>
      </div>
      <div
        className={
          variant === "wide"
            ? "space-y-5"
            : "grid gap-px bg-ink md:grid-cols-2"
        }
      >
        {projects.map((project) => (
          <PortfolioCard key={project.slug} project={project} variant={variant} />
        ))}
      </div>
    </section>
  );
}
