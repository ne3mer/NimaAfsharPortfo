
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowRight, Globe, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6"
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Founder Story */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-card border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            {/* Placeholder for Headshot */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
              <span className="text-muted-foreground">Nima&apos;s Headshot</span>
            </div>
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("founder.role")}
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Nima Afsharfar</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("founder.p1")}</p>
              <p>{t("founder.p2")}</p>
              <p>{t("founder.p3")}</p>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://linkedin.com" target="_blank" className={buttonVariants({ variant: "outline" })}>LinkedIn</a>
              <a href="https://github.com" target="_blank" className={buttonVariants({ variant: "outline" })}>GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* Values / Team */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Globe className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{t("values.global.title")}</h3>
            <p className="text-muted-foreground">
              {t("values.global.desc")}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Zap className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{t("values.speed.title")}</h3>
            <p className="text-muted-foreground">
              {t("values.speed.desc")}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Users className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{t("values.partners.title")}</h3>
            <p className="text-muted-foreground">
              {t("values.partners.desc")}
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t("cta.title")}</h2>
          <Link href="/start" className={buttonVariants({ variant: "premium", size: "lg" })}>
              {t("cta.button")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
