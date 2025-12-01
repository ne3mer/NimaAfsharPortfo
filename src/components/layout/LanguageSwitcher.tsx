"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "fa" : "en";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "flex items-center gap-2 text-white/70 hover:text-white"
      )}
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase font-bold">{nextLocale === "en" ? "EN" : "FA"}</span>
    </Link>
  );
}
