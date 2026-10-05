import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { CuratedCaseStudy } from "@/components/work/CuratedCaseStudy";
import {
  PORTFOLIO_PROJECTS,
  getPortfolioProject,
  LEGACY_PROJECT_ALIASES,
} from "@/data/portfolio-projects";

const SITE_URL = "https://www.nimastudio.site";

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
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

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "NIMA Studio",
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          alt: project.image?.alt ?? title,
        },
      ],
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

  return <CuratedCaseStudy project={project} />;
}
