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
  "spanish-football-news-scraper": {
    pipeline: {
      title: {
        en: "From newsroom HTML to bilingual JSON",
        fa: "از HTML خبر تا JSON دو زبانه",
      },
      steps: [
        {
          icon: "globe",
          title: { en: "Multi-source crawl", fa: "خزش چند منبع" },
          body: {
            en: "Per-outlet crawlers with polite delays and resilient selectors.",
            fa: "خزندهٔ جدا برای هر منبع، با تاخیر محترمانه و سلکتورهای مقاوم.",
          },
        },
        {
          icon: "braces",
          title: { en: "Parse & clean", fa: "پارس و تمیزکاری" },
          body: {
            en: "Article parser turns DOM into structured fields + image + author.",
            fa: "پارسر مقاله DOM را به فیلدهای ساخت‌یافته، تصویر و نویسنده تبدیل می‌کند.",
          },
        },
        {
          icon: "workflow",
          title: { en: "Translate", fa: "ترجمه" },
          body: {
            en: "Pluggable providers (OpenAI / DeepL / Google) with shared schema.",
            fa: "ارائه‌دهنده‌های قابل تعویض با یک قرارداد داده مشترک.",
          },
        },
        {
          icon: "database",
          title: { en: "Dedupe & store", fa: "ددیوب و ذخیره" },
          body: {
            en: "Hash-aware dedup + dated JSON drops under data/.",
            fa: "ددیوب مبتنی بر هش + فایل JSON روزانه در data/.",
          },
        },
      ],
    },
    terminal: {
      title: { en: "What a happy run feels like", fa: "حس یک اجرای تمیز" },
      subtitle: {
        en: "Abbreviated — your real logs live under logs/.",
        fa: "خلاصه — لاگ واقعی شما در logs/.",
      },
      lines: [
        "$ python main.py --sources marca as --max-articles 5",
        "[marca] 14 links → 5 articles after filter",
        "[translate] deepl batch OK  (5/5)",
        "[storage] news_2025-12-04.json  (+5 rows, 0 dupes)",
      ],
    },
  },
  "echoless-tech": {
    pipeline: {
      title: {
        en: "Quiet hero, precise engineering story",
        fa: "هیروی آرام، روایت دقیق مهندسی",
      },
      steps: [
        {
          icon: "globe",
          title: { en: "Narrative shell", fa: "لایهٔ روایت" },
          body: {
            en: "Typography, spacing, and motion that never fight the content.",
            fa: "تایپوگرافی، فاصله و موشن که با محتوا نجنگند.",
          },
        },
        {
          icon: "cpu",
          title: { en: "Performance budget", fa: "بودجهٔ عملکرد" },
          body: {
            en: "First paint stays fast; animations respect reduced-motion.",
            fa: "اولین رنگ سریع؛ انیمیشن‌ها به reduced-motion احترام می‌گذارند.",
          },
        },
        {
          icon: "puzzle",
          title: { en: "Composable sections", fa: "بخش‌های ترکیب‌پذیر" },
          body: {
            en: "Blocks snap together like product LEGO for future campaigns.",
            fa: "بلوک‌ها مثل لگو برای کمپین‌های بعدی کنار هم می‌نشینند.",
          },
        },
        {
          icon: "workflow",
          title: { en: "Deployable story", fa: "روایت قابل استقرار" },
          body: {
            en: "Same discipline as API work: versioning, previews, rollback-friendly.",
            fa: "همان انضباط API: نسخه‌گذاری، پیش‌نمایش، قابل برگشت.",
          },
        },
      ],
    },
    terminal: {
      title: { en: "Ship checklist", fa: "چک‌لیست انتشار" },
      subtitle: {
        en: "Metaphorical — swap commands for your CI of choice.",
        fa: "استعاری — دستورات را با CI خودت عوض کن.",
      },
      lines: [
        "$ pnpm lint && pnpm test && pnpm build",
        "✓ a11y smoke  ✓ lighthouse perf  ✓ typecheck",
        "preview URL → stakeholder sign-off",
        "main@prod  deploy  42s  (zero-downtime)",
      ],
    },
  },
  "automated-pdf-extraction-engine": {
    pipeline: {
      title: {
        en: "PDF in → validated dataset out",
        fa: "ورودی PDF → خروجی دادهٔ اعتبارسنجی‌شده",
      },
      steps: [
        {
          icon: "cpu",
          title: { en: "Ingest & classify", fa: "ورود و دسته‌بندی" },
          body: {
            en: "Detect text vs scan, route to pdfplumber / PyMuPDF paths.",
            fa: "تشخیص متن در برابر اسکن و مسیردهی به pdfplumber / PyMuPDF.",
          },
        },
        {
          icon: "braces",
          title: { en: "Field extraction", fa: "استخراج فیلد" },
          body: {
            en: "Regex + layout heuristics for 15+ business fields.",
            fa: "regex + heuristicهای چیدمان برای بیش از ۱۵ فیلد تجاری.",
          },
        },
        {
          icon: "workflow",
          title: { en: "Rules engine", fa: "موتور قواعد" },
          body: {
            en: "Required fields, formats, and logic (due > issue, total > tax).",
            fa: "فیلدهای اجباری، فرمت و منطق (سررسید بعد از صدور، جمع > مالیات).",
          },
        },
        {
          icon: "database",
          title: { en: "Export & audit", fa: "خروجی و ممیزی" },
          body: {
            en: "JSON + Excel + validation workbook for QA sign-off.",
            fa: "JSON و Excel و گزارش اعتبارسنجی برای امضای QA.",
          },
        },
      ],
    },
    terminal: {
      title: { en: "Batch run excerpt", fa: "برش یک اجرای دسته‌ای" },
      subtitle: {
        en: "Synthetic — real logs split by extraction vs validation.",
        fa: "نمایشی — لاگ واقعی جدا برای استخراج و اعتبارسنجی.",
      },
      lines: [
        "$ python3 main.py --input ./input_pdfs --output ./output",
        "[reader] invoice_acme.pdf  text layer OK",
        "[extract] 14 fields  confidence 0.91",
        "[validate] PASSED  score=0.94  wrote output/json/…",
      ],
    },
  },
};
