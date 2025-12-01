import { getTranslations } from "next-intl/server";

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Terms"});

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">{t("title")}</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-muted-foreground mb-6">{t("lastUpdated")}</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("agreement.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("agreement.content")}
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("license.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("license.content")}
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("disclaimer.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("disclaimer.content")}
          </p>
        </div>
      </div>
    </div>
  );
}
