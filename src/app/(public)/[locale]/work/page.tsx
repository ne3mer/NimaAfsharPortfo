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

export default async function WorkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Work"});
  const jsonRows = loadUpworkProjects();
  const dbRows = await prisma.work.findMany({
    where: { slug: { in: jsonRows.map((r) => r.slug) } },
  });
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

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="mb-10 max-w-3xl rounded-3xl border border-primary/25 bg-primary/10 p-6 md:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">
          {t("featuredBadge")}
        </p>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
          {t("featuredTitle")}
        </h2>
        <ul className="space-y-2 text-sm leading-relaxed text-zinc-200 md:text-base">
          <li>{t("featuredProblem")}</li>
          <li>{t("featuredSolution")}</li>
          <li className="text-emerald-200">{t("featuredResult")}</li>
        </ul>
        <Link
          href="/work/optisupply-dashboard"
          className={buttonVariants({ variant: "premium", size: "lg", className: "mt-5 min-h-11 rounded-xl" })}
        >
          {t("featuredCta")}
        </Link>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center text-muted-foreground">
          {t("empty")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
