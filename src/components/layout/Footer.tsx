"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Twitter, ArrowUp, type LucideIcon } from "lucide-react";

import { PROFILE_LINKS } from "@/lib/profile-links";

/**
 * Footer — printer's colophon.
 * "Set in", "Issue", "Pressed in" metadata + sober rule-line directory.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-paper">
      <div className="rule-double" />

      <div className="container mx-auto px-4 py-20 md:py-24">
        {/* Closing banner */}
        <div className="grid items-end gap-8 border-b border-ink pb-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <p className="kicker">— Letter from the editor —</p>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-[64px]">
              {t("bannerTitle")
                .split(" ")
                .map((w, i) => (
                  <span key={i} className={i % 3 === 1 ? "italic text-sienna" : ""}>
                    {w}{" "}
                  </span>
                ))}
            </h2>
            <p className="mt-4 max-w-[60ch] font-display italic text-[18px] leading-snug text-ink-mute md:text-[20px]">
              {t("bannerSubtitle")}
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-3 border-b-2 border-sienna pb-1 font-display text-2xl text-ink transition-colors hover:text-sienna md:text-3xl"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sienna">
                {t("bannerCta")}
              </span>
              <span className="italic">— write to me</span>
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">→</span>
            </Link>
          </div>
        </div>

        {/* Three-column directory */}
        <div className="mt-14 grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-[32px] leading-none text-ink md:text-[42px]">
              Nima<span className="italic text-sienna">.</span>Afsharfar
            </Link>
            <p className="mt-4 max-w-[44ch] text-[14.5px] leading-relaxed text-ink-mute">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink href={PROFILE_LINKS.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={PROFILE_LINKS.github} icon={Github} label="GitHub" />
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
              <a
                href="mailto:ne3mer@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition hover:bg-ink hover:text-paper"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="kicker mb-4 border-b border-ink pb-2">{t("explore.title")}</p>
            <ul className="space-y-2 font-display text-[18px]">
              <li>
                <Link href="/work" className="link-underline text-ink hover:text-sienna">
                  {t("explore.portfolio")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-underline text-ink hover:text-sienna">
                  {t("explore.about")}
                </Link>
              </li>
              <li>
                <Link href="/start" className="link-underline text-ink hover:text-sienna">
                  {t("explore.collab")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-ink hover:text-sienna">
                  {t("explore.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colophon metadata */}
          <div className="md:col-span-4">
            <p className="kicker mb-4 border-b border-ink pb-2">Colophon</p>
            <dl className="space-y-3 text-[14.5px]">
              <Row label="Pressed in" value="Budapest, Hungary" />
              <Row label="Hours" value="EU-friendly · async-first" />
              <Row label="Email" value="ne3mer@gmail.com" href="mailto:ne3mer@gmail.com" />
              <Row label="Set in" value="Instrument Serif · Inter Tight · JetBrains Mono" />
              <Row label="Stack" value="Next.js · TypeScript · Prisma" />
            </dl>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
            © {currentYear} · {t("copyright")} · {t("designed")}
          </p>
          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
            <Link href="/privacy" className="link-underline">{t("legal.privacy")}</Link>
            <Link href="/terms" className="link-underline">{t("legal.terms")}</Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 transition-colors hover:text-sienna"
            >
              Top of issue
              <span className="inline-flex h-7 w-7 items-center justify-center border border-ink/40">
                <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-ink/15 pb-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint pt-1">
        {label}
      </dt>
      <dd className="text-ink">
        {href ? (
          <a href={href} className="link-underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition hover:bg-ink hover:text-paper"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}
