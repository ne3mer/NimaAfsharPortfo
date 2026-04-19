import type { ProjectShowcaseConfig } from "@/lib/project-showcase-types";

export function hasProjectShowcaseContent(
  config: ProjectShowcaseConfig | undefined
): config is ProjectShowcaseConfig {
  if (!config) return false;
  const hasPipeline = (config.pipeline?.steps?.length ?? 0) > 0;
  const hasTerminal = (config.terminal?.lines?.length ?? 0) > 0;
  return hasPipeline || hasTerminal;
}

/**
 * Optional “how it works” blocks per case study slug.
 * Add an entry when the project is not a public web app (scraper, API, puzzle, CLI).
 *
 * Example:
 * ```ts
 * "my-scraper": {
 *   pipeline: {
 *     title: { en: "Data flow", fa: "جریان داده" },
 *     steps: [
 *       { icon: "globe", title: { en: "Fetch", fa: "دریافت" }, body: { en: "...", fa: "..." } },
 *     ],
 *   },
 *   terminal: {
 *     title: { en: "Sample run", fa: "اجرای نمونه" },
 *     lines: ["$ python -m scraper", "ok 142 rows"],
 *   },
 * },
 * ```
 */
export const PROJECT_SHOWCASE_BY_SLUG: Record<string, ProjectShowcaseConfig> = {};
