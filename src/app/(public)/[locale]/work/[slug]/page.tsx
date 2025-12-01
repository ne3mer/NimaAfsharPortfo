
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

function splitTags(tags: string | null | undefined) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function generateStaticParams() {
  const works = await prisma.work.findMany({
    select: { slug: true },
  });

  return works.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const t = await getTranslations("Project");
    
    const project = await prisma.work.findUnique({
      where: { slug },
    });

    if (!project) {
      notFound();
    }

    return (
      <article className="min-h-screen pb-20">
        {/* Hero Header */}
        <div className="bg-secondary/30 border-b border-white/5 py-20">
          <div className="container mx-auto px-4">
            <Link 
              href="/work" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" /> {t("back")}
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {splitTags(project.tags).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-[1fr_300px] gap-12">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Simple Markdown Rendering */}
            {(project.content || "").split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6">{line.replace('# ', '')}</h2>;
              if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h3>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-muted-foreground mb-2">{line.replace('- ', '')}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>;
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-card border border-white/10">
              <h3 className="font-semibold text-white mb-4">{t("info")}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-muted-foreground">{t("client")}</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">{t("services")}</span>
                  <span className="text-white font-medium">Full Stack Dev, UI/UX</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">{t("year")}</span>
                  <span className="text-white font-medium">2024</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
              <h3 className="font-bold text-white mb-2">{t("ready")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("readyDesc")}
              </p>
              <Link href="/start" className={buttonVariants({ variant: "premium", className: "w-full" })}>
                {t("start")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error rendering ProjectPage:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <pre className="bg-black/50 p-4 rounded text-red-400 max-w-2xl overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <p className="text-muted-foreground mt-4">Check Vercel logs for more details.</p>
      </div>
    );
  }
}
