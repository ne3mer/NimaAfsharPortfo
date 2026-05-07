import fs from "fs";
import path from "path";

import { notFound } from "next/navigation";
import type { Work } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NextImage from "next/image";

import { LiveSitePreview } from "@/components/work/LiveSitePreview";
import { ProjectShowcaseSection } from "@/components/work/ProjectShowcaseSection";
import { PORTFOLIO_REPO_BY_SLUG } from "@/data/portfolio-repos";
import {
  hasProjectShowcaseContent,
  PROJECT_SHOWCASE_BY_SLUG,
} from "@/data/project-showcases";
import { RepoSourceCard } from "@/components/work/RepoSourceCard";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";
import { WorkImpactSummary } from "@/components/work/WorkImpactSummary";
import { ProjectInteractiveLab } from "@/components/work/ProjectInteractiveLab";
import {
  hasInteractiveLab,
  PROJECT_INTERACTIVE_LAB_BY_SLUG,
} from "@/data/project-interactive-labs";
import {
  loadUpworkProjects,
  workFromJsonRow,
} from "@/lib/upwork-projects-json";
import { resolveWorkCopyForLocale } from "@/lib/work-locale";

/** Live URLs for portfolio case studies — iframe preview scrolls like a real browser. */
const LIVE_SITE_URL_BY_SLUG: Record<string, string> = {
  "nomadspot-budapest": "https://wfc-dun.vercel.app/",
  "optisupply-dashboard": "https://optisupply.vercel.app/dashboard",
  "gameclub-iran": "https://nextplay-eight.vercel.app/",
};

function splitTags(tags: string | null | undefined) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// export async function generateStaticParams() {
//   const works = await prisma.work.findMany({
//     select: { slug: true },
//   });

//   return works.map((project) => ({
//     slug: project.slug,
//   }));
// }

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations("Project");

  let project: Work | null = null;
  try {
    project = await prisma.work.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error loading project:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink p-4">
        <p className="kicker">— Press error —</p>
        <h1 className="mt-3 font-display text-3xl text-ink">Something went wrong</h1>
        <pre className="mt-4 max-w-2xl overflow-auto border border-ink bg-paper-soft p-4 font-mono text-[12px] text-stamp">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <p className="mt-4 text-ink-mute">Check Vercel logs for more details.</p>
      </div>
    );
  }

  if (!project) {
    const jsonRows = loadUpworkProjects();
    const row = jsonRows.find((r) => r.slug === slug);
    if (row) {
      project = workFromJsonRow(row);
    } else {
      notFound();
    }
  }

  const copy = resolveWorkCopyForLocale(project, locale);

  const jsonRow = loadUpworkProjects().find((r) => r.slug === project.slug);
  const en = locale === "en";
  const pickImpact = (fa?: string, enVal?: string) => {
    if (!fa && !enVal) return undefined;
    if (en) return (enVal ?? fa)?.trim() || undefined;
    return (fa ?? enVal)?.trim() || undefined;
  };

  const liveSiteUrl = LIVE_SITE_URL_BY_SLUG[project.slug];
    const fullPageImageDisk = path.join(
      process.cwd(),
      "public",
      "images",
      "work",
      project.slug,
      "full-page.png"
    );
    const hasFullPageImage =
      !liveSiteUrl && fs.existsSync(fullPageImageDisk);
  const fullPageImageSrc = hasFullPageImage
    ? `/images/work/${project.slug}/full-page.png`
    : null;

  const showcaseRaw = PROJECT_SHOWCASE_BY_SLUG[project.slug];
  const showcaseConfig = hasProjectShowcaseContent(showcaseRaw)
    ? showcaseRaw
    : undefined;

  const repoUrl = PORTFOLIO_REPO_BY_SLUG[project.slug];
  const interactiveLabRaw = PROJECT_INTERACTIVE_LAB_BY_SLUG[project.slug];
  const interactiveLabConfig = hasInteractiveLab(interactiveLabRaw)
    ? interactiveLabRaw
    : undefined;

  return (
    <article className="min-h-screen bg-paper pb-20">
        {/* Hero Header */}
        <div className="border-b border-ink bg-paper py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
              <Link href="/work" className="link-underline inline-flex items-center gap-2 text-ink hover:text-sienna">
                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {t("back")}
              </Link>
              <span className="hidden md:inline">Project Plate · Vol. I</span>
              <span className="text-sienna">{project.year || "2024"}</span>
            </div>

            <div
              className={
                project.image && !liveSiteUrl && !hasFullPageImage
                  ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:items-start lg:gap-12"
                  : "grid gap-10"
              }
            >
              <div>
                <p className="kicker mb-4">— Case study —</p>
                <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-[68px] lg:text-[80px]">
                  {copy.title}<span className="italic text-sienna">.</span>
                </h1>
                
                <div className="my-8 flex flex-wrap gap-1.5">
                  {splitTags(copy.tags).map((tag) => (
                    <span key={tag} className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="max-w-3xl font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
                  {copy.description}
                </p>
              </div>

              {project.image && !liveSiteUrl && !hasFullPageImage && (
                <div className="relative aspect-video w-full overflow-hidden border border-ink lg:aspect-[4/3] lg:max-h-[280px] lg:justify-self-end">
                  <NextImage
                    src={project.image}
                    alt={copy.title}
                    fill
                    className="object-cover object-top saturate-[0.9]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                </div>
              )}
            </div>

            {liveSiteUrl ? (
              <LiveSitePreview
                url={liveSiteUrl}
                title={copy.title}
                sectionTitle={t("livePreviewTitle")}
                hint={t("livePreviewHint")}
                openLabel={t("openLiveSite")}
              />
            ) : hasFullPageImage && fullPageImageSrc ? (
              <div className="mt-10 space-y-3">
                <p className="kicker">{t("livePreviewTitle")}</p>
                <div className="overflow-hidden border border-ink bg-paper-deep">
                  <div className="max-h-[min(85vh,920px)] overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- tall stitched screenshot; avoid layout shift from unknown height */}
                    <img
                      src={fullPageImageSrc}
                      alt=""
                      className="block h-auto w-full select-none"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-ink/30 bg-paper-soft px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    {t("livePreviewHint")}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {showcaseConfig ? (
          <div className="border-b border-ink bg-paper-soft/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <ProjectShowcaseSection
                config={showcaseConfig}
                locale={locale}
                terminalHint={t("showcaseTerminalHint")}
              />
            </div>
          </div>
        ) : null}

        {/* Content */}
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-[1fr_300px] gap-12">
          <div className="max-w-3xl space-y-10">
            <WorkImpactSummary
              locale={locale}
              did={pickImpact(jsonRow?.problem, jsonRow?.problemEn)}
              built={pickImpact(jsonRow?.built, jsonRow?.builtEn)}
              result={pickImpact(
                [jsonRow?.outcome, jsonRow?.outcomeExtra].filter(Boolean).join(" "),
                [jsonRow?.outcomeEn, jsonRow?.outcomeExtraEn].filter(Boolean).join(" ")
              )}
            />
            {repoUrl ? <RepoSourceCard repoUrl={repoUrl} /> : null}
            {interactiveLabConfig ? (
              <ProjectInteractiveLab
                workSlug={project.slug}
                config={interactiveLabConfig}
                locale={locale}
              />
            ) : null}
            <CaseStudyContent
              content={copy.content || ""}
              locale={locale === "fa" ? "fa" : "en"}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="border border-ink bg-card p-6">
              <p className="kicker mb-3 border-b border-ink/30 pb-2">{t("info")}</p>
              <dl className="space-y-3 text-sm">
                <div className="border-b border-ink/15 pb-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{t("client")}</dt>
                  <dd className="font-display text-[18px] text-ink">{project.client}</dd>
                </div>
                <div className="border-b border-ink/15 pb-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{t("services")}</dt>
                  <dd className="font-display text-[18px] text-ink">{copy.services || "Full Stack Dev, UI/UX"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{t("year")}</dt>
                  <dd className="font-display text-[18px] text-ink">{project.year || "2024"}</dd>
                </div>
              </dl>
            </div>

            <div className="relative border border-ink bg-paper-soft p-6">
              <span className="absolute -top-3 right-4 stamp">— Postscript —</span>
              <h3 className="mt-2 font-display text-2xl text-ink md:text-[28px]">{t("ready")}</h3>
              <p className="mt-2 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-mute">
                {t("readyDesc")}
              </p>
              <Link href="/contact" className={`${buttonVariants({ variant: "sienna" })} mt-4 w-full`}>
                {t("start")} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>
  );
}
