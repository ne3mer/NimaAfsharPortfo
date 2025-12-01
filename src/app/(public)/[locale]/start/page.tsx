import { ConfiguratorWizard } from "@/features/configurator/ConfiguratorWizard";
import { getTranslations } from "next-intl/server";

export default async function StartPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Start"});

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          {t("title")}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
      
      <ConfiguratorWizard />
    </div>
  );
}
