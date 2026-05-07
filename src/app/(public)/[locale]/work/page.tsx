import { prisma } from "@/lib/prisma";
import {
  loadUpworkProjects,
  mergeWorksWithJson,
} from "@/lib/upwork-projects-json";
import { resolveWorkCopyForLocale } from "@/lib/work-locale";
import { PortfolioCard, WorkCardData } from "@/components/work/PortfolioCard";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";

function mapTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFa = locale === "fa";
  const t = await getTranslations({ locale, namespace: "Work" });
  const jsonRows = loadUpworkProjects();
  let dbRows: Awaited<ReturnType<typeof prisma.work.findMany>> = [];
  try {
    dbRows = await prisma.work.findMany({
      where: { slug: { in: jsonRows.map((r) => r.slug) } },
    });
  } catch (error) {
    console.error("Work page fallback to JSON data:", error);
  }
  const works = mergeWorksWithJson(dbRows, jsonRows);
  const en = locale === "en";
  const pickFirst = (...vals: (string | undefined | null)[]) =>
    vals.find((v) => typeof v === "string" && v.trim().length > 0)?.trim();
  const cards: WorkCardData[] = works.map((work) => {
    const copy = resolveWorkCopyForLocale(work, locale);
    const json = jsonRows.find((r) => r.slug === work.slug);
    const outcome = en
      ? pickFirst(json?.outcomeEn, json?.outcome)
      : pickFirst(json?.outcome, json?.outcomeEn);
    return {
      id: work.id,
      slug: work.slug,
      title: copy.title,
      description: copy.description,
      tags: mapTags(copy.tags),
      image: work.image,
      outcome,
    };
  });

  const labels = isFa
    ? {
        masthead: "کارنامه استودیو",
        issue: "نمونه‌کارها · جلد ۱ · صفحه ۰۲",
        entries: "ورودی",
        kicker: "§02 — کاتالوگ",
        intro:
          "هر کارت یک فرمت ثابت دارد: چه ساخته شد، نقش من چه بود، و چه چیزی تغییر کرد.",
        note: "دموی زنده یا خروجی تعاملی هرجا ممکن باشد اضافه شده است.",
        coverStory: "کیس اصلی",
        method: "— روش خواندن —",
        methodDesc:
          "Problem → Solution → Result در سه خط کوتاه تا مدیر جذب سریع تصمیم بگیرد.",
        metricFormat: "فرمت",
        metricAudience: "کاربرد",
      }
    : {
        masthead: "The Atelier — Catalogue",
        issue: "Selected Work · Vol. I, p. 02",
        entries: "entries",
        kicker: "§02 — Catalogue",
        intro:
          "Each entry holds the same shape — what was built, what I did, what shifted.",
        note: "Live or interactive demos included where possible.",
        coverStory: "Cover Story",
        method: "— Method —",
        methodDesc:
          "Problem → Solution → Result, set in three lines so reviewers can scan it on a phone.",
        metricFormat: "format",
        metricAudience: "audience",
      };

  return (
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
        <span>{labels.masthead}</span>
        <span>{labels.issue}</span>
        <span className="text-sienna">
          {cards.length} {labels.entries}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 lg:col-span-3">
          <p className="kicker">{labels.kicker}</p>
          <p className="mt-3 font-display italic text-[15px] leading-snug text-ink-mute">
            {labels.intro}
          </p>
          <div className="rule mt-6" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            {labels.note}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-ink">
            {t("title")}<span className="italic text-sienna">.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Featured project */}
      <div className="mt-14 grid gap-px bg-ink lg:grid-cols-12">
        <div className="bg-card p-7 lg:col-span-7 md:p-10">
          <div className="flex items-center justify-between border-b border-ink/30 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sienna">
              {labels.coverStory}
            </span>
            <span className="stamp">{t("featuredBadge")}</span>
          </div>
          <h2 className="mt-5 font-display text-[32px] leading-tight text-ink md:text-[44px]">
            {t("featuredTitle")}
          </h2>
          <ul className="mt-6 space-y-3 text-[15.5px] leading-relaxed text-ink/85">
            <li className="flex gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sienna pt-2">
                P
              </span>
              <span>{t("featuredProblem")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sienna pt-2">
                S
              </span>
              <span>{t("featuredSolution")}</span>
            </li>
            <li className="flex gap-3 border-t border-ink/15 pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-olive pt-2">
                R
              </span>
              <span className="font-display italic text-ink">
                {t("featuredResult")}
              </span>
            </li>
          </ul>
          <Link
            href="/work/optisupply-dashboard"
            className={`${buttonVariants({ variant: "ink", size: "lg" })} mt-7`}
          >
            {t("featuredCta")}
            <span className="ms-2 rtl:rotate-180">→</span>
          </Link>
        </div>
        <aside className="bg-paper-soft p-7 lg:col-span-5 md:p-10">
          <p className="kicker">{labels.method}</p>
          <p className="mt-3 font-display text-[18px] italic leading-snug text-ink-mute">
            {labels.methodDesc}
          </p>
          <div className="mt-6 grid grid-cols-3 divide-x divide-ink/20 border-y border-ink py-3 text-center">
            {[
              { k: "r ≈", v: "0.81" },
              { k: labels.metricFormat, v: "PDF · XLS" },
              { k: labels.metricAudience, v: "ESG ops" },
            ].map((it) => (
              <div key={it.k} className="px-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                  {it.k}
                </p>
                <p className="mt-1 font-display text-[18px] leading-tight text-ink">
                  {it.v}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {cards.length === 0 ? (
        <div className="mt-16 border border-ink bg-card p-10 text-center text-ink-mute">
          {t("empty")}
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-px bg-ink md:grid-cols-2 lg:grid-cols-3">
          {cards.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
