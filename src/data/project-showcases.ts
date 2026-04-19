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
export const PROJECT_SHOWCASE_BY_SLUG: Record<string, ProjectShowcaseConfig> = {
  "dataflow-pipeline-dashboard": {
    pipeline: {
      title: {
        en: "How a run flows through the stack",
        fa: "جریان یک اجرا در سیستم",
      },
      steps: [
        {
          icon: "timer",
          title: { en: "Schedule", fa: "زمان‌بندی" },
          body: {
            en: "Cron expressions and manual triggers enqueue work on Redis.",
            fa: "کران و اجرای دستی کار را در صف Redis قرار می‌دهند.",
          },
        },
        {
          icon: "cpu",
          title: { en: "Workers", fa: "ورکرها" },
          body: {
            en: "Celery processes jobs asynchronously with retries and isolation.",
            fa: "Celery جاب‌ها را ناهمزمان با ایزوله‌سازی و امکان تلاش مجدد اجرا می‌کند.",
          },
        },
        {
          icon: "database",
          title: { en: "Persist", fa: "ذخیره‌سازی" },
          body: {
            en: "Runs, exit codes, and durations land in PostgreSQL for auditing.",
            fa: "اجرها، کد خروج و مدت در PostgreSQL برای ممیزی ذخیره می‌شوند.",
          },
        },
        {
          icon: "workflow",
          title: { en: "Live UI", fa: "رابط زنده" },
          body: {
            en: "WebSockets push metrics and log lines to the React dashboard.",
            fa: "WebSocket متریک‌ها و خطوط لاگ را به داشبورد React می‌فرستد.",
          },
        },
      ],
    },
    terminal: {
      title: { en: "Sample stack boot", fa: "بالا آوردن نمونهٔ استک" },
      subtitle: {
        en: "Illustrative — mirrors docker-compose / local dev from the README.",
        fa: "نمایشی — مشابه docker-compose و توسعهٔ محلی طبق README.",
      },
      lines: [
        "$ docker compose up -d",
        "api    → http://localhost:8000  (OpenAPI /docs)",
        "worker → celery@scheduler ready (redis broker)",
        "ws     → client subscribed /api/v1/ws/dashboard",
        "run #a1b2  job=daily_scrape  exit=0  duration=12.4s",
      ],
    },
  },
};
