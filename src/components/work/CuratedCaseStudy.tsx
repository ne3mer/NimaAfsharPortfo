import { ArrowLeft, ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import {
  getAdjacentProjects,
  type PortfolioProject,
} from "@/data/portfolio-projects";

export function CuratedCaseStudy({ project }: { project: PortfolioProject }) {
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <article className="min-h-screen bg-paper pb-20" dir="ltr">
      <header className="border-b border-ink">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-mute md:text-[10px]">
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
              <Fact label="Field" value={project.category} />
              <Fact label="Format" value="Product case study" last />
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
        <section className="grid border-b border-ink py-14 md:grid-cols-12 md:py-20" aria-labelledby="problem-heading">
          <SectionLabel number="01" title="The problem" id="problem-heading" />
          <div className="md:col-span-8 md:col-start-5">
            <p className="max-w-[58ch] font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.08] text-ink">
              {project.problem}
            </p>
          </div>
        </section>

        <section className="grid border-b border-ink py-14 md:grid-cols-12 md:py-20" aria-labelledby="approach-heading">
          <SectionLabel number="02" title="The approach" id="approach-heading" />
          <div className="grid gap-10 md:col-span-8 md:col-start-5 lg:grid-cols-2">
            <EditorialBlock label="Approach" text={project.approach} />
            <EditorialBlock label="What I built" text={project.built} />
          </div>
        </section>

        <section className="border-b border-ink py-14 md:py-20" aria-labelledby="capabilities-heading">
          <div className="grid gap-8 md:grid-cols-12">
            <SectionLabel number="03" title="Key capabilities" id="capabilities-heading" />
            <ol className="grid gap-px bg-ink sm:grid-cols-2 md:col-span-8 md:col-start-5">
              {project.capabilities.map((capability, index) => (
                <li key={capability} className="min-h-36 bg-card p-5 md:p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-sienna">
                    Capability {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 max-w-[28ch] font-display text-[20px] leading-snug text-ink md:text-[22px]">
                    {capability}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-ink py-14 md:py-20" aria-labelledby="visual-heading">
          <div className="mb-7 grid gap-4 md:grid-cols-12">
            <SectionLabel number="04" title="Product / system visual" id="visual-heading" />
            <p className="max-w-[54ch] text-[14.5px] leading-relaxed text-ink-mute md:col-span-7 md:col-start-6">
              Real project evidence is shown at editorial scale. Where a verified capture is not
              available, the plate states exactly what is still required.
            </p>
          </div>
          <ProjectVisual project={project} />
        </section>

        {project.technicalApproach?.length ? (
          <section className="border-b border-ink py-14 md:py-20" aria-labelledby="technical-heading">
            <div className="grid gap-8 md:grid-cols-12">
              <SectionLabel number="05" title="Technical approach" id="technical-heading" />
              <div className="md:col-span-8 md:col-start-5">
                <div className="border-y border-ink">
                  {project.technicalApproach.map((step, index) => (
                    <div
                      key={step}
                      className="grid grid-cols-[44px_1fr] items-start gap-3 border-b border-ink/20 py-4 last:border-b-0 md:grid-cols-[72px_1fr]"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sienna">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] leading-relaxed text-ink">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid border-b border-ink py-14 md:grid-cols-12 md:py-20" aria-labelledby="role-heading">
          <SectionLabel number="06" title="Role & outcome" id="role-heading" />
          <div className="grid gap-8 md:col-span-8 md:col-start-5 lg:grid-cols-2">
            <div>
              <p className="kicker">My role</p>
              <p className="mt-4 font-display text-2xl leading-snug text-ink">{project.role}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
                The work described here reflects the product, design and engineering decisions I
                personally structured or implemented.
              </p>
            </div>
            <div className="border-l-2 border-olive pl-5">
              <p className="kicker text-olive">Outcome / value</p>
              <p className="mt-4 font-display text-[20px] italic leading-snug text-ink md:text-[22px]">
                {project.outcome}
              </p>
            </div>
          </div>
        </section>

        <section className="grid border-b border-ink py-14 md:grid-cols-12 md:py-20" aria-labelledby="stack-heading">
          <SectionLabel number="07" title="Stack & links" id="stack-heading" />
          <div className="md:col-span-8 md:col-start-5">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-ink/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  {link.label}
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <nav className="grid gap-px bg-ink sm:grid-cols-2" aria-label="Case study navigation">
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group bg-paper px-5 py-8 transition-colors hover:bg-paper-soft md:px-8 md:py-10"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
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
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
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
      <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">{label}</dt>
      <dd className="text-[13px] leading-snug text-ink">{value}</dd>
    </div>
  );
}

function SectionLabel({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="mb-7 md:col-span-3 md:mb-0">
      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-sienna">§{number}</p>
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
  if (project.image) {
    return (
      <figure className="border border-ink bg-paper-soft p-2 md:p-3">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep md:aspect-[16/9]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority={priority}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            style={{ objectPosition: project.image.objectPosition ?? "center" }}
          />
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/20 px-2 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">
          <span>{project.visualLabel}</span>
          <span>Real product capture</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="border border-ink bg-paper-deep p-5 md:p-10">
      <div className="grid min-h-[320px] place-items-center border border-dashed border-ink/35 px-6 text-center md:min-h-[460px]">
        <div className="max-w-xl">
          <ImageIcon className="mx-auto h-7 w-7 text-sienna" strokeWidth={1.25} aria-hidden="true" />
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-sienna">
            Asset request · {project.number}
          </p>
          <p className="mt-4 font-display text-3xl text-ink md:text-5xl">{project.visualLabel}</p>
          <p className="mx-auto mt-5 max-w-[54ch] text-[14px] leading-relaxed text-ink-mute">
            {project.assetRequest ??
              "A verified project capture is required here. This placeholder does not represent product functionality."}
          </p>
        </div>
      </div>
      <figcaption className="pt-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
        No synthetic interface used
      </figcaption>
    </figure>
  );
}
