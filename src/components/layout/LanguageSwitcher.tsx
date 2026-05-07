"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "fa" : "en";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="flex h-9 items-center gap-1 border border-ink/25 px-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition hover:bg-ink hover:text-paper"
    >
      <span className={locale === "en" ? "text-ink" : "text-ink-faint"}>EN</span>
      <span className="text-ink-faint">/</span>
      <span className={locale === "fa" ? "text-ink" : "text-ink-faint"}>FA</span>
    </Link>
  );
}
