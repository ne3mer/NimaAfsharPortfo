import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowRight, FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PROFILE_LINKS } from "@/lib/profile-links";

/**
 * About — laid out as an editorial feature spread.
 * Drop-cap intro, marginalia, signed quote, colophon-style credentials.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <div className="bg-paper pb-28">
      {/* Cover header */}
      <header className="container mx-auto px-4 pt-12 md:pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
          <span>The Atelier — Feature</span>
          <span>About · Vol. I, p. 04</span>
          <span className="text-sienna">Cover Story</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <p className="kicker">§01 — Profile</p>
            <p className="mt-3 font-display text-[15px] italic leading-snug text-ink-mute">
              A short biography in the studio voice — engineer, MBA, ESG researcher.
            </p>
            <div className="rule mt-6" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              Reading time · 2 min.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1
              className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] tracking-tight text-ink"
              dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />
            <p className="dropcap mt-8 max-w-[64ch] text-[16px] leading-[1.75] text-ink/85 md:text-[17px]">
              {t("subtitle")}
            </p>
            <p className="mt-6 max-w-[60ch] border-l-2 border-sienna pl-4 font-display italic text-[19px] leading-snug text-ink rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
              {t("differentiator")}
            </p>
            <p
              className="mt-6 max-w-[60ch] border border-ink/30 bg-paper-soft/50 px-5 py-4 text-[15px] text-ink-mute md:text-[16px]"
              dangerouslySetInnerHTML={{ __html: t.raw("lookingFor") }}
            />
          </div>
        </div>
      </header>

      {/* Founder spread */}
      <section className="container mx-auto mt-20 px-4">
        <div className="passepartout grid gap-10 bg-card p-6 md:grid-cols-12 md:gap-12 md:p-12">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] border border-ink bg-paper-deep">
              <svg aria-hidden className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 250" preserveAspectRatio="none">
                <defs>
                  <pattern id="about-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#141210" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="200" height="250" fill="url(#about-hatch)" />
              </svg>
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <span className="font-display text-[10rem] leading-none text-ink">
                  M<span className="italic text-sienna">A</span>
                </span>
                <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/70">
                  Plate II — Author Portrait
                </span>
              </div>
              <span className="absolute -top-3 -right-3 stamp">Author · Solo practice</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="kicker">Author</p>
            <h2 className="mt-2 font-display text-[40px] leading-tight text-ink md:text-[52px]">
              {t("founderName")}
            </h2>
            <p className="mt-2 font-display italic text-[17px] text-ink-mute md:text-[19px]">
              {t("founder.role")}
            </p>
            <div className="mt-6 space-y-4 text-[15.5px] leading-[1.75] text-ink/85">
              <p>{t("founder.p1")}</p>
              <p>{t("founder.p2")}</p>
              <p>{t("founder.p3")}</p>
              <p className="border-l-2 border-sienna pl-4 font-display italic text-[18px] leading-snug text-ink rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                {t("founder.p4")}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/nima-afsharfar" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                LinkedIn
              </a>
              <a href="https://github.com/ne3mer" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                GitHub
              </a>
              <a href="mailto:ne3mer@gmail.com?subject=Portfolio%20%E2%80%94%20CV%20%2F%20role" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials — colophon-style */}
      <section className="container mx-auto mt-24 px-4">
        <div className="border-y border-ink py-3">
          <p className="kicker">{t("credentialsTitle")}</p>
        </div>
        <ul className="mt-2 divide-y divide-ink/15 border-b border-ink">
          {(["0", "1", "2", "3"] as const).map((k, i) => (
            <li key={k} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4">
              <span className="font-display text-2xl italic leading-none text-sienna">
                0{i + 1}
              </span>
              <p className="text-[15.5px] leading-snug text-ink/85 md:text-[16.5px]">
                {t(`credentials.${k}`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Values */}
      <section className="container mx-auto mt-20 px-4">
        <p className="kicker mb-4 border-b border-ink pb-2">§02 — Operating notes</p>
        <div className="grid gap-px bg-ink md:grid-cols-3">
          {(["global", "speed", "partners"] as const).map((k, i) => (
            <div key={k} className="bg-paper p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
                Note 0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-[28px]">
                {t(`values.${k}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-mute">
                {t(`values.${k}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto mt-24 px-4">
        <div className="border border-ink bg-card p-8 md:p-12">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="kicker">— Personal note —</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-[44px]">
                {t("cta.title")}
              </h2>
              <p className="mt-3 max-w-[60ch] font-display italic text-[17px] text-ink-mute">
                {t("cta.downloadCvHint")}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
              <a href={PROFILE_LINKS.cvRequest} className={buttonVariants({ variant: "sienna", size: "lg" })}>
                <FileText className="me-2 h-4 w-4" />
                {t("cta.downloadCv")}
              </a>
              <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {t("cta.button")} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
