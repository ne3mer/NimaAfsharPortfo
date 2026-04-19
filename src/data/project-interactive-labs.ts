import type { InteractiveLabConfig } from "@/lib/project-interactive-types";

export function hasInteractiveLab(
  config: InteractiveLabConfig | undefined
): config is InteractiveLabConfig {
  return config != null;
}

/**
 * Hands-on demo on the case study page: runs a canned terminal sequence, then fetches
 * `/api/portfolio-demo/[slug]` — a real same-origin JSON smoke test (no backend Python).
 */
export const PROJECT_INTERACTIVE_LAB_BY_SLUG: Record<string, InteractiveLabConfig> = {
  "spanish-football-news-scraper": {
    variant: "pipeline",
    title: {
      en: "Try the pipeline (browser demo)",
      fa: "پایپ‌لاین را اینجا امتحان کن (دموی مرورگر)",
    },
    subtitle: {
      en: "A scripted run + live JSON from this site’s demo API — not your laptop’s Python.",
      fa: "اجرای شبیه‌سازی‌شده + JSON زنده از API نمونهٔ همین سایت — نه پایتون روی سیستم خودت.",
    },
    terminalLines: [
      "$ python main.py --sources marca as --max-articles 3",
      "[crawler] marca → 12 candidates",
      "[filter] football + La Liga + Clásico tags",
      "[parser] full article HTML → structured fields",
      "[translator] es → en  (provider=deepl)",
      "[storage] dedupe hash OK → data/news_demo.json",
      "[done] 3 articles in 8.2s",
    ],
    resultTitle: {
      en: "Sample API response (GET /api/portfolio-demo/…)",
      fa: "نمونهٔ پاسخ API (GET /api/portfolio-demo/…)",
    },
  },
  "automated-pdf-extraction-engine": {
    variant: "pdf",
    title: {
      en: "Validation engine playground",
      fa: "زمین بازی موتور اعتبارسنجی",
    },
    subtitle: {
      en: "Pick a scenario — the UI calls the demo endpoint with ?scenario=pass|fail.",
      fa: "یک سناریو انتخاب کن — رابط با ?scenario=pass|fail به endpoint نمونه زنگ می‌زند.",
    },
    passLabel: {
      en: "Clean invoice (expect PASSED)",
      fa: "فاکتور تمیز (انتظار PASSED)",
    },
    failLabel: {
      en: "Noisy scan (expect FAILED)",
      fa: "اسکن پر نویز (انتظار FAILED)",
    },
    resultTitle: {
      en: "Demo validation report",
      fa: "گزارش اعتبارسنجی نمونه",
    },
  },
  "echoless-tech": {
    variant: "pulse",
    title: {
      en: "Ping the Echoless stack",
      fa: "پینگ زدن به استک Echoless",
    },
    subtitle: {
      en: "One click — terminal flair, then JSON fingerprint from the demo route.",
      fa: "یک کلیک — ترمینال تزئینی، بعد اثر انگشت JSON از مسیر نمونه.",
    },
    terminalLines: [
      "$ curl -s https://nimastudio.site/api/portfolio-demo/echoless-tech",
      "# (resolved on this deployment — path is relative in-app)",
      "GET /api/portfolio-demo/echoless-tech → 200",
    ],
    resultTitle: {
      en: "Stack fingerprint",
      fa: "اثر انگشت استک",
    },
  },
};
