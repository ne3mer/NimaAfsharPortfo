import { prisma } from "@/lib/prisma";
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
  const works = await prisma.work.findMany({
    orderBy: { createdAt: "desc" },
  });

  const cards: WorkCardData[] = works.map((work) => ({
    id: work.id,
    slug: work.slug,
    title: work.title,
    description: work.description,
    tags: mapTags(work.tags),
  }));

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
