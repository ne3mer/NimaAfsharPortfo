import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Privacy"});

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">{t("title")}</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-muted-foreground mb-6">{t("lastUpdated")}</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("intro.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("intro.content")}
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("data.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("data.content")}
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>
              {t.rich("data.items.identity", {
                b: (chunks) => <strong className="text-white">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich("data.items.contact", {
                b: (chunks) => <strong className="text-white">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich("data.items.technical", {
                b: (chunks) => <strong className="text-white">{chunks}</strong>
              })}
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t("usage.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("usage.content")}
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>{t("usage.items.contract")}</li>
            <li>{t("usage.items.legitimate")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
