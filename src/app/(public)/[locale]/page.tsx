import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";
import { SelectedResults } from "@/components/home/SelectedResults";
import { TargetRoles } from "@/components/home/TargetRoles";
import type { Metadata } from "next";

const SITE_URL = "https://www.nimastudio.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Nima Afsharfar — Full-Stack Developer & Product Builder";
  const description =
    "SaaS products, AI integrations, automation and data systems—supported by technical case studies and real project evidence.";
  const url = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: `${SITE_URL}/images/work/nima-studio/01-home-hero.webp`,
          width: 1440,
          height: 1000,
          alt: "NIMA Studio homepage",
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <SelectedResults />
      <TargetRoles />
      <TechStack />
      <Services />
      <Process />
      <CTA />
    </div>
  );
}
