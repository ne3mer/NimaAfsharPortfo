import type { Metadata } from "next";
import { PortfolioStart } from "@/components/home/PortfolioStart";
import { getTranslations } from "next-intl/server";

const SITE_URL = "https://www.nimastudio.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Collaboration & Product Field Guide";
  const description =
    "Notes on engineering collaboration, async-first rituals, and delivery methodology by Nima Afsharfar.";
  const url = `${SITE_URL}/${locale}/start`;
  const imageUrl = `${SITE_URL}/images/work/nima-studio/05-case-study.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/start`,
        fa: `${SITE_URL}/fa/start`,
        "x-default": `${SITE_URL}/en/start`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1440,
          height: 1000,
          alt: "Collaboration Field Guide — NIMA Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Start" });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
        <span>The Atelier — Field guide</span>
        <span>Collaboration · Vol. I, p. 05</span>
        <span className="text-sienna">Async-first · written rituals</span>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
        <aside className="col-span-12 md:col-span-3">
          <p className="kicker">§01 — Beyond the PDF</p>
          <p className="mt-3 font-display italic text-[15px] leading-snug text-ink-mute">
            Notes for hiring teams and founders who prefer demos to decks.
          </p>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.4rem)] leading-[0.95] tracking-tight text-ink">
            {t("title")}<span className="italic text-sienna">.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <PortfolioStart />
    </div>
  );
}
