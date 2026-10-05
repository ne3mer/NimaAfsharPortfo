import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
  const isFa = locale === "fa";
  const path = `/${locale}/work`;
  const title = isFa
    ? "آثار منتخب — محصولات، مهندسی و استراتژی"
    : "Selected Work — Products, Engineering & Strategy";
  const description = isFa
    ? "محصولات و سیستم‌های منتخب شامل تصمیم‌یار تأمین‌کننده، SaaS، مهندسی داده و اتوماسیون."
    : "Selected products and systems spanning supplier intelligence, SaaS, data engineering and automation.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/work`,
        fa: `${SITE_URL}/fa/work`,
        "x-default": `${SITE_URL}/en/work`,
      },
    },
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/work/nima-studio/02-work-archive.webp`],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });
  const published = PORTFOLIO_PROJECTS.filter((p) => p.status === "published");
  const archive = PORTFOLIO_PROJECTS.filter(
    (p) => p.section === "Archive" || p.status === "archive"
  );
  const cover = published.find((p) => p.section === "Cover Story") ?? published[0];
  const groups = [
    {
      label: t("groupFeatured"),
      note: t("groupFeaturedNote"),
      projects: published.filter((project) => project.section === "Featured"),
      variant: "wide" as const,
    },
    {
      label: t("groupSystems"),
      note: t("groupSystemsNote"),
      projects: published.filter((project) => project.section === "Selected Systems"),
      variant: "standard" as const,
    },
    {
      label: t("groupData"),
      note: t("groupDataNote"),
      projects: published.filter((project) => project.section === "Automation & Data"),
      variant: "standard" as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
        <span>{t("colophon")}</span>
        <span>{t("volume")}</span>
        <span className="text-sienna">{t("projectsCount", { count: published.length })}</span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <aside className="col-span-12 lg:col-span-4">
          <p className="kicker">{t("kicker")}</p>
          <p className="mt-3 max-w-[34ch] font-display text-[18px] leading-snug text-ink">
            {t("framing")}
          </p>
          <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-ink-mute">
            {t("curatedRecord")}
          </p>
        </aside>

        <div className="col-span-12 lg:col-span-8 lg:pt-2">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-ink">
            {t("heroTitle")}
            <span className="italic text-sienna">.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="cover-story-heading">
        <div className="mb-4 flex items-end justify-between border-b border-ink pb-2">
          <h2 id="cover-story-heading" className="kicker">{t("coverStory")}</h2>
          <span className="stamp">{t("decisionBoard")}</span>
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

      <aside className="mt-16 grid gap-px bg-ink md:grid-cols-12" aria-label={t("letterTitle")}>
        <div className="bg-paper-soft p-5 md:col-span-4 md:p-6">
          <p className="kicker">{t("letterTitle")}</p>
        </div>
        <div className="bg-card p-5 md:col-span-8 md:p-6">
          <p className="max-w-[62ch] font-display text-[19px] italic leading-snug text-ink md:text-[22px]">
            {t("letterBody")}
          </p>
        </div>
      </aside>

      <section className="mt-20 border-t border-ink pt-5" aria-labelledby="archive-heading">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">{t("archiveNotes")}</p>
            <h2 id="archive-heading" className="mt-3 font-display text-3xl text-ink md:text-4xl">
              {t("earlierPlates")}<span className="italic text-sienna">.</span>
            </h2>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-mute">
              {t("earlierDesc")}
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
                    {t("archiveNumber", { num: String(index + 1).padStart(2, "0") })}
                  </span>
                  <span aria-hidden="true" className="text-ink-mute group-hover:text-sienna rtl:rotate-[-90deg]">↗</span>
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
