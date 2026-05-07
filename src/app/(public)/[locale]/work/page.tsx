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
        masthead: "آتلیه · آرشیو کار",
        issue: "نمونه‌کارها · جلد ۱ · صفحه ۰۲",
        entries: "پروژه",
        kicker: "§02 — پروژه‌های منتخب",
        intro: "هر پروژه با سه سؤال ثابت معرفی می‌شود: چه ساختیم؟ نقش من چه بود؟ نتیجه چه شد؟",
        note: "هرجا ممکن باشد، دموی زنده یا نسخه تعاملی هم اضافه شده است.",
        coverStory: "کیس شاخص",
        method: "— روش خواندن —",
        methodDesc: "این صفحه برای اسکن سریع مدیر جذب چیده شده: Problem → Solution → Result.",
        metricFormat: "خروجی",
        metricAudience: "مخاطب",
        ledger: "فهرست پروژه‌ها",
      }
    : {
        masthead: "Atelier · Work Archive",
        issue: "Selected Work · Vol. I, p. 02",
        entries: "projects",
        kicker: "§02 — Selected Work",
        intro: "Each project follows the same framing: what was built, what I owned, what changed.",
        note: "Live previews or interactive output are included whenever possible.",
        coverStory: "Cover Story",
        method: "— Method —",
        methodDesc: "This page is composed for quick hiring scans: Problem → Solution → Result.",
        metricFormat: "output",
        metricAudience: "audience",
        ledger: "Project ledger",
      };

  return (
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
        <span>{labels.masthead}</span>
        <span>{labels.issue}</span>
        <span className="text-sienna">
          {cards.length} {labels.entries}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <aside className="col-span-12 lg:col-span-4">
          <p className="kicker">{labels.kicker}</p>
          <p className="mt-3 max-w-[34ch] font-display text-[18px] leading-snug text-ink">
            {labels.intro}
          </p>
          <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-ink-mute">
            {labels.note}
          </p>
        </aside>

        <div className="col-span-12 lg:col-span-8 lg:pt-2">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-ink">
            {t("title")}<span className="italic text-sienna">.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Featured project */}
      <div className="mt-12 grid gap-px bg-ink lg:grid-cols-12">
        <section className="bg-card p-7 lg:col-span-8 md:p-10">
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
        </section>
        <aside className="bg-paper-soft p-7 lg:col-span-4 md:p-10">
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
        <section className="mt-14">
          <div className="mb-4 flex items-center justify-between border-b border-ink pb-2">
            <p className="kicker">{labels.ledger}</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              {cards.length} {labels.entries}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-ink md:grid-cols-2 xl:grid-cols-3">
          {cards.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
        </section>
      )}
    </div>
  );
}
