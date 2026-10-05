import type { MetadataRoute } from "next";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio-projects";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nimastudio.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/work", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/start", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Generate static page entries with locale alternates
  for (const page of staticPages) {
    for (const locale of routing.locales) {
      const pageUrl = `${SITE_URL}/${locale}${page.path}`;
      const languageAlternates: Record<string, string> = {};

      for (const altLocale of routing.locales) {
        languageAlternates[altLocale] = `${SITE_URL}/${altLocale}${page.path}`;
      }
      languageAlternates["x-default"] = `${SITE_URL}/en${page.path}`;

      entries.push({
        url: pageUrl,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: locale === "en" ? page.priority : Math.max(0.1, page.priority - 0.05),
        alternates: {
          languages: languageAlternates,
        },
      });
    }
  }

  // Generate project case study entries
  for (const project of PORTFOLIO_PROJECTS) {
    const isArchive = project.section === "Archive" || project.status === "archive";
    const priority = isArchive ? 0.7 : 0.85;

    for (const locale of routing.locales) {
      const pageUrl = `${SITE_URL}/${locale}/work/${project.slug}`;
      const languageAlternates: Record<string, string> = {};

      for (const altLocale of routing.locales) {
        languageAlternates[altLocale] = `${SITE_URL}/${altLocale}/work/${project.slug}`;
      }
      languageAlternates["x-default"] = `${SITE_URL}/en/work/${project.slug}`;

      entries.push({
        url: pageUrl,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: locale === "en" ? priority : Math.max(0.1, priority - 0.05),
        alternates: {
          languages: languageAlternates,
        },
      });
    }
  }

  return entries;
}
