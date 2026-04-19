import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowRight, FileText, Globe, Users, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PROFILE_LINKS } from "@/lib/profile-links";

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "About"});

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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 via-purple-500/20 to-zinc-900">
              <span className="text-5xl font-black tracking-tighter text-white/90 sm:text-6xl">
                MA
              </span>
            </div>
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("founder.role")}
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">{t("founderName")}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("founder.p1")}</p>
              <p>{t("founder.p2")}</p>
              <p>{t("founder.p3")}</p>
              <p className="text-white font-medium border-s-2 border-primary ps-4 italic">
                {t("founder.p4")}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://www.linkedin.com/in/nima-afsharfar" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>LinkedIn</a>
              <a href="https://github.com/ne3mer" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>GitHub</a>
              <a href="mailto:ne3mer@gmail.com?subject=Portfolio%20%E2%80%94%20CV%20%2F%20role" className={buttonVariants({ variant: "outline" })}>Email</a>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="container mx-auto px-4 mb-24">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-primary mb-6">
          {t("credentialsTitle")}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {(["0", "1", "2", "3"] as const).map((k) => (
            <span
              key={k}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-center text-xs text-muted-foreground md:text-sm"
            >
              {t(`credentials.${k}`)}
            </span>
          ))}
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

        <div className="mt-24 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">{t("cta.title")}</h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            {t("cta.downloadCvHint")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={PROFILE_LINKS.cvRequest}
              className={buttonVariants({ variant: "premium", size: "lg" })}
            >
              <FileText className="me-2 h-4 w-4" />
              {t("cta.downloadCv")}
            </a>
            <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {t("cta.button")} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href="mailto:ne3mer@gmail.com?subject=CV%20%2F%20introduction"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              ne3mer@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
