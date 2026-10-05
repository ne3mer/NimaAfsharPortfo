import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { CuratedCaseStudy } from "@/components/work/CuratedCaseStudy";
import {
  PORTFOLIO_PROJECTS,
  getPortfolioProject,
  LEGACY_PROJECT_ALIASES,
} from "@/data/portfolio-projects";

import { ProjectJsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://www.nimastudio.site";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PORTFOLIO_PROJECTS.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const canonicalSlug = LEGACY_PROJECT_ALIASES[slug] ?? slug;
  const project = getPortfolioProject(canonicalSlug);

  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.summary;
  const image =
    project.image?.src ?? "/images/work/nima-studio/02-work-archive.webp";
  const url = `${SITE_URL}/${locale}/work/${canonicalSlug}`;
  const absoluteImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/work/${canonicalSlug}`,
        fa: `${SITE_URL}/fa/work/${canonicalSlug}`,
        "x-default": `${SITE_URL}/en/work/${canonicalSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "NIMA Studio",
      images: [
        {
          url: absoluteImageUrl,
          alt: project.image?.alt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const alias = LEGACY_PROJECT_ALIASES[slug];
  if (alias) {
    permanentRedirect(`/${locale}/work/${alias}`);
  }

  const project = getPortfolioProject(slug);
  if (!project) {
    notFound();
  }

  // Draft projects are hidden in production
  if (project.status === "draft" && process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <CuratedCaseStudy project={project} />
    </>
  );
}
