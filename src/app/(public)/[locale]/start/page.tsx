import { PortfolioStart } from "@/components/home/PortfolioStart";
import { getTranslations } from "next-intl/server";

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Start" });

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-14 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <PortfolioStart />
    </div>
  );
}
