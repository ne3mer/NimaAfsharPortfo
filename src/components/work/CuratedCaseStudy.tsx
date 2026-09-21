import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";
import {
  ArchitectureDiagram,
  EditorialProjectFigure,
  EvidenceNote,
} from "@/components/work/EditorialProjectFigure";
import { Link } from "@/i18n/routing";
import {
  getAdjacentProjects,
  type PortfolioProject,
} from "@/data/portfolio-projects";

export function CuratedCaseStudy({ project }: { project: PortfolioProject }) {
  const { previous, next } = getAdjacentProjects(project.slug);
  const isPrototypeResult = [
    "dataflow-control",
    "leadpilot",
    "spanish-football-news",
  ].includes(project.slug);

  return (
    <article className="min-h-screen bg-paper pb-20" dir="ltr">
      <header className="border-b border-ink">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            <Link href="/work" className="link-underline inline-flex items-center gap-2 text-ink">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to Work
            </Link>
            <span>Project Plate · Vol. II</span>
            <span className="text-sienna">{project.number} / 07</span>
          </div>

          <div className="grid gap-10 py-9 lg:grid-cols-12 lg:gap-12 lg:py-14">
            <div className="lg:col-span-8">
              <p className="kicker">{project.section} · Case Study</p>
              <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.8rem,7vw,6.7rem)] leading-[0.88] tracking-tight text-ink">
                {project.title}
                <span className="italic text-sienna">.</span>
              </h1>
              <p className="mt-7 max-w-[60ch] font-display text-[20px] italic leading-snug text-ink-mute md:text-[24px]">
                {project.summary}
              </p>
            </div>

            <aside className="self-end border-y border-ink py-4 lg:col-span-4">
              <Fact label="Role" value={project.role} />
              <Fact label="Year" value={project.year} />
              <Fact label="Type" value={project.type} />
              <Fact label="Stack" value={project.stack.slice(0, 4).join(" · ")} last />
            </aside>
          </div>

          <ProjectVisual project={project} priority />

          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: link.label === "Live demo" ? "sienna" : "outline",
                  size: "lg",
                })}
              >
                {link.label}
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <section className="grid border-b border-ink py-12 md:grid-cols-12 md:py-16" aria-labelledby="problem-heading">
          <SectionLabel number="01" title="The problem" id="problem-heading" />
          <div className="md:col-span-8 md:col-start-5">
            <p className="max-w-[58ch] font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.08] text-ink">
              {project.problem}
            </p>
          </div>
        </section>

        <section className="grid border-b border-ink py-12 md:grid-cols-12 md:py-16" aria-labelledby="approach-heading">
          <SectionLabel number="02" title="The approach" id="approach-heading" />
          <div className="grid gap-10 md:col-span-8 md:col-start-5 lg:grid-cols-2">
            <EditorialBlock label="Approach" text={project.approach} />
            <EditorialBlock label="What I built" text={project.built} />
          </div>
        </section>

        <section className="border-b border-ink py-12 md:py-16" aria-labelledby="evidence-heading">
          <div className="mb-8 grid gap-5 md:grid-cols-12">
            <SectionLabel number="03" title="Product evidence" id="evidence-heading" />
            <div className="md:col-span-8 md:col-start-5">
              <p className="max-w-[56ch] font-display text-[22px] leading-snug text-ink md:text-[28px]">
                {project.layout === "meta"
                  ? "The product and the proof surface are the same system."
                  : project.layout === "technical"
                    ? "The workflow is shown from input through operating output."
                    : "The interface carries the story from proposition to working surface."}
              </p>
            </div>
          </div>

          {project.diagram ? <ArchitectureDiagram diagram={project.diagram} /> : null}
          {project.evidenceNote ? (
            <div className={project.diagram ? "mt-5" : ""}>
              <EvidenceNote>{project.evidenceNote}</EvidenceNote>
            </div>
          ) : null}
          {project.visuals?.length ? <VisualStory project={project} /> : null}
        </section>

        <section className="border-b border-ink py-12 md:py-16" aria-labelledby="technical-heading">
          <div className="grid gap-8 md:grid-cols-12">
            <SectionLabel number="04" title="Decisions & system" id="technical-heading" />
            <div className="grid gap-10 md:col-span-8 md:col-start-5 lg:grid-cols-2">
              <div>
                <p className="kicker">Key capabilities</p>
                <ul className="mt-4 border-y border-ink">
                  {project.capabilities.slice(0, 4).map((capability, index) => (
                    <li
                      key={capability}
                      className="grid grid-cols-[34px_1fr] gap-3 border-b border-ink/20 py-3 last:border-b-0"
                    >
                      <span className="font-mono text-[10px] text-sienna">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] leading-relaxed text-ink">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="kicker">Technical approach</p>
                <div className="mt-4 border-y border-ink">
                  {project.technicalApproach?.map((step, index) => (
                    <div
                      key={step}
                      className="grid grid-cols-[34px_1fr] gap-3 border-b border-ink/20 py-3 last:border-b-0"
                    >
                      <span className="font-mono text-[10px] text-sienna">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] leading-relaxed text-ink">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid border-b border-ink py-12 md:grid-cols-12 md:py-16" aria-labelledby="role-heading">
          <SectionLabel number="05" title="Role & outcome" id="role-heading" />
          <div className="grid gap-8 md:col-span-8 md:col-start-5 lg:grid-cols-2">
            <div>
              <p className="kicker">My role</p>
              <p className="mt-4 font-display text-2xl leading-snug text-ink">{project.role}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
                Product framing, system decisions and implementation were developed as one connected
                body of work.
              </p>
            </div>
            <div className="border-l-2 border-olive pl-5">
              <p className="kicker text-olive">
                {isPrototypeResult ? "Result / demonstration" : "Outcome / value"}
              </p>
              <p className="mt-4 font-display text-[20px] italic leading-snug text-ink md:text-[22px]">
                {project.outcome}
              </p>
            </div>
          </div>
        </section>

        <section className="grid border-b border-ink py-12 md:grid-cols-12 md:py-16" aria-labelledby="stack-heading">
          <SectionLabel number="06" title="Stack" id="stack-heading" />
          <div className="md:col-span-8 md:col-start-5">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-ink/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <nav className="grid gap-px bg-ink sm:grid-cols-2" aria-label="Case study navigation">
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group bg-paper px-5 py-8 transition-colors hover:bg-paper-soft md:px-8 md:py-10"
              data-cursor-label="OPEN PLATE →"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                <ArrowLeft className="mr-2 inline h-3.5 w-3.5" aria-hidden="true" />
                Previous project
              </span>
              <span className="mt-3 block font-display text-2xl leading-tight text-ink group-hover:text-sienna">
                {previous.shortTitle}
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group bg-paper px-5 py-8 text-right transition-colors hover:bg-paper-soft md:px-8 md:py-10"
              data-cursor-label="OPEN PLATE →"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Next project
                <ArrowRight className="ml-2 inline h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-3 block font-display text-2xl leading-tight text-ink group-hover:text-sienna">
                {next.shortTitle}
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}

function Fact({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[72px_1fr] gap-3 py-3 ${last ? "" : "border-b border-ink/20"}`}>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{label}</dt>
      <dd className="text-[13px] leading-snug text-ink">{value}</dd>
    </div>
  );
}

function SectionLabel({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="mb-7 md:col-span-3 md:mb-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sienna">§{number}</p>
      <h2 id={id} className="mt-2 font-display text-2xl text-ink md:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

function EditorialBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-ink pt-4">
      <p className="kicker">{label}</p>
      <p className="mt-4 text-[15px] leading-[1.75] text-ink-mute">{text}</p>
    </div>
  );
}

function ProjectVisual({
  project,
  priority = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
}) {
  const visual = project.visuals?.[0];
  if (visual) return <EditorialProjectFigure visual={visual} priority={priority} />;

  if (project.image) {
    return (
      <EditorialProjectFigure
        priority={priority}
        visual={{
          src: project.image.src,
          alt: project.image.alt,
          position: project.image.objectPosition,
          label: project.visualLabel,
          caption: "Primary project surface.",
          aspect: "wide",
        }}
      />
    );
  }

  if (project.diagram) return <ArchitectureDiagram diagram={project.diagram} />;
  return project.evidenceNote ? <EvidenceNote>{project.evidenceNote}</EvidenceNote> : null;
}

function VisualStory({ project }: { project: PortfolioProject }) {
  const visuals = project.visuals ?? [];
  if (visuals.length <= 1) return null;

  if (project.layout === "split") {
    return (
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        {visuals.slice(1).map((visual, index) => (
          <EditorialProjectFigure
            key={visual.src}
            visual={visual}
            className={index % 3 === 0 ? "md:col-span-7" : "md:col-span-5"}
          />
        ))}
      </div>
    );
  }

  if (project.layout === "meta") {
    return (
      <div className="mt-8 space-y-7">
        {visuals.slice(1).map((visual, index) => (
          <EditorialProjectFigure
            key={visual.src}
            visual={visual}
            className={index % 2 ? "md:ml-auto md:w-10/12" : "md:w-11/12"}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {visuals.slice(1).map((visual, index) => (
        <EditorialProjectFigure
          key={visual.src}
          visual={visual}
          className={index % 2 ? "md:ml-auto md:w-10/12" : "md:w-11/12"}
        />
      ))}
    </div>
  );
}
