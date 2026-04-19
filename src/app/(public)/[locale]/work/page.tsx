import { prisma } from "@/lib/prisma";
import {
  loadUpworkProjects,
  mergeWorksWithJson,
} from "@/lib/upwork-projects-json";
import { resolveWorkCopyForLocale } from "@/lib/work-locale";
import { PortfolioCard, WorkCardData } from "@/components/work/PortfolioCard";
import { getTranslations } from "next-intl/server";

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
  const cards: WorkCardData[] = works.map((work) => {
    const copy = resolveWorkCopyForLocale(work, locale);
    return {
      id: work.id,
      slug: work.slug,
      title: copy.title,
      description: copy.description,
      tags: mapTags(copy.tags),
      image: work.image,
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
