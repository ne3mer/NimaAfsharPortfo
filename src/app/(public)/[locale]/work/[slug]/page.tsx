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
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <pre className="bg-black/50 p-4 rounded text-red-400 max-w-2xl overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <p className="text-muted-foreground mt-4">Check Vercel logs for more details.</p>
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

  return (
    <article className="min-h-screen pb-20">
        {/* Hero Header */}
        <div className="border-b border-white/5 bg-gradient-to-b from-secondary/40 via-secondary/20 to-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Link 
              href="/work" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" /> {t("back")}
            </Link>
            
            <div
              className={
                project.image && !liveSiteUrl && !hasFullPageImage
                  ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:items-start lg:gap-12"
                  : "grid gap-10"
              }
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  {copy.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {splitTags(copy.tags).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {copy.description}
                </p>
              </div>

              {project.image && !liveSiteUrl && !hasFullPageImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 lg:aspect-[4/3] lg:max-h-[280px] lg:justify-self-end">
                  <NextImage
                    src={project.image}
                    alt={copy.title}
                    fill
                    className="object-cover object-top"
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
                <h2 className="text-lg font-semibold text-white md:text-xl">
                  {t("livePreviewTitle")}
                </h2>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl ring-1 ring-white/5">
                  <div className="max-h-[min(85vh,920px)] overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- tall stitched screenshot; avoid layout shift from unknown height */}
                    <img
                      src={fullPageImageSrc}
                      alt=""
                      className="block h-auto w-full select-none"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-white/5 bg-black/35 px-4 py-3 text-center text-xs text-muted-foreground md:text-sm">
                    {t("livePreviewHint")}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {showcaseConfig ? (
          <div className="border-b border-white/5 bg-gradient-to-b from-zinc-950/40 to-transparent">
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
          <div className="space-y-10">
            {repoUrl ? <RepoSourceCard repoUrl={repoUrl} /> : null}
            <div className="prose prose-invert prose-lg max-w-none">
            {/* Simple Markdown Rendering */}
            {(copy.content || "").split('\n').map((line, i) => {
              const trimmed = line.trim();
              const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
              if (imageMatch) {
                const alt = imageMatch[1];
                const src = imageMatch[2];
                return (
                  <div
                    key={i}
                    className="relative my-8 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg aspect-video not-prose"
                  >
                    <NextImage
                      src={src}
                      alt={alt || copy.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                );
              }
              if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6">{line.replace('# ', '')}</h2>;
              if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h3>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-muted-foreground mb-2">{line.replace('- ', '')}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>;
            })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-card border border-white/10">
              <h3 className="font-semibold text-white mb-4">{t("info")}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-muted-foreground">{t("client")}</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">{t("services")}</span>
                  <span className="text-white font-medium">{copy.services || "Full Stack Dev, UI/UX"}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">{t("year")}</span>
                  <span className="text-white font-medium">{project.year || "2024"}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
              <h3 className="font-bold text-white mb-2">{t("ready")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("readyDesc")}
              </p>
              <Link href="/contact" className={buttonVariants({ variant: "premium", className: "w-full" })}>
                {t("start")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>
  );
}
