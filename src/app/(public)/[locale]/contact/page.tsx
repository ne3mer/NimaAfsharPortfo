import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { HeroQuickLinks } from "@/components/home/HeroQuickLinks";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const SITE_URL = "https://www.nimastudio.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";
  const title = isFa ? "ارتباط با من" : "Start a Conversation";
  const description = isFa
    ? "گفتگو درباره پروژه‌های توسعه محصول، SaaS MVP، اتوماسیون گردش‌کار یا سیستم‌های داده با نیما افشارفر."
    : "Discuss a full-stack product, SaaS MVP, automation workflow or data-system project with Nima Afsharfar.";
  const url = `${SITE_URL}/${locale}/contact`;

  const imageUrl = `${SITE_URL}/images/work/nima-studio/04-process.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/contact`,
        fa: `${SITE_URL}/fa/contact`,
        "x-default": `${SITE_URL}/en/contact`,
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
          alt: "Start a conversation with Nima Afsharfar",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const isFa = locale === "fa";
  const labels = isFa
    ? {
        correspondence: "آتلیه — مکاتبات",
        vol: "تماس · جلد ۱، ص ۶",
        replyTime: "پاسخ طی ۴۸ ساعت",
        kicker: "§01 — ارسال پیام",
        intro: "برای جذب نیرو، تعریف پروژه یا گفتگو درباره سیستم‌ها — مستقیماً پیام دهید.",
        sender: "فرستنده · شما",
        receiver: "گیرنده · نیما",
        sideNote: "— یادداشت جانبی —",
        city: "بوداپست، مجارستان",
      }
    : {
        correspondence: "The Atelier — Correspondence",
        vol: "Contact · Vol. I, p. 06",
        replyTime: "Reply within 48h",
        kicker: "§01 — Send word",
        intro: "Whether it’s a hire, a brief, or notes on shipped work — write to me directly.",
        sender: "Sender · You",
        receiver: "Receiver · Nima",
        sideNote: "— Side note —",
        city: "Budapest, Hungary",
      };

  return (
    <div className="bg-paper pb-24">
      <div className="container mx-auto px-4 pt-12 md:pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
          <span>{labels.correspondence}</span>
          <span>{labels.vol}</span>
          <span className="text-sienna">{labels.replyTime}</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <aside className="col-span-12 md:col-span-3">
            <p className="kicker">{labels.kicker}</p>
            <p className="mt-3 font-display text-[15px] italic leading-snug text-ink-mute">
              {labels.intro}
            </p>
            <div className="rule mt-6" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              {labels.sender}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              {labels.receiver}
            </p>
          </aside>

          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-ink">
              {t("title")}<span className="italic text-sienna">.</span>
            </h1>
            <p className="dropcap mt-6 max-w-[60ch] text-[16px] leading-[1.75] text-ink/85">
              {t("subtitle")}
            </p>
            <p className="mt-6 inline-block max-w-2xl border border-sienna/40 bg-sienna/[0.06] px-5 py-2 font-display italic text-[16px] text-ink-soft">
              {t("openTo")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4">
        <div className="border-y border-ink py-4">
          <p className="kicker">{t("quickLinksTitle")}</p>
          <div className="mt-3">
            <HeroQuickLinks hideStrip />
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 grid gap-10 px-4 md:grid-cols-12">
        <aside className="md:col-span-5 space-y-6">
          <div className="passepartout bg-card p-6 md:p-8">
            <p className="kicker mb-4 border-b border-ink/30 pb-2">
              {t("info.title")}
            </p>
            <div className="space-y-5">
              <div className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-ink text-ink">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                    {t("info.email")}
                  </div>
                  <a
                    href="mailto:ne3mer@gmail.com"
                    className="link-underline font-display text-[20px] text-ink"
                  >
                    ne3mer@gmail.com
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-ink text-ink">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                    {t("info.office")}
                  </div>
                  <span className="font-display text-[20px] text-ink">
                    {labels.city}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-ink bg-paper-soft/60 p-6 md:p-8">
            <p className="kicker">{labels.sideNote}</p>
            <h3 className="mt-2 font-display text-2xl text-ink md:text-[28px]">
              {t("cta.title")}
            </h3>
            <p className="mt-2 max-w-[40ch] text-[14.5px] leading-relaxed text-ink-mute">
              {t("cta.desc")}
            </p>
            <Link
              href="/work"
              className={`${buttonVariants({ variant: "ink" })} mt-5 w-full`}
            >
              {t("cta.button")}
              <span className="ms-2 rtl:rotate-180">→</span>
            </Link>
          </div>
        </aside>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
