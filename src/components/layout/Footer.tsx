"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FileText, Github, Linkedin, Mail, MapPin, Twitter, ArrowUp, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

import { PROFILE_LINKS } from "@/lib/profile-links";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Large CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 border-b border-white/5 pb-24">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              {t("bannerTitle")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("bannerSubtitle")}
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" variant="premium" className="rounded-full px-8 py-8 text-lg">
              {t("bannerCta")}
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white block">
              NIMA <span className="text-primary">STUDIO</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <SocialLink href={PROFILE_LINKS.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={PROFILE_LINKS.github} icon={Github} label="GitHub" />
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
            </div>
            <div className="flex flex-wrap gap-3 pt-4 text-sm">
              <a
                href={PROFILE_LINKS.cvRequest}
                className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden />
                {t("requestCv")}
              </a>
              <span className="text-white/15" aria-hidden>
                ·
              </span>
              <a
                href={PROFILE_LINKS.introCall}
                className="text-muted-foreground transition hover:text-white"
              >
                {t("introCallShort")}
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-white mb-6 text-lg">{t("explore.title")}</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/work" className="hover:text-white transition-colors block py-1">{t("explore.portfolio")}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors block py-1">{t("explore.about")}</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors block py-1">{t("explore.collab")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors block py-1">{t("explore.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:ne3mer@gmail.com" className="hover:text-white transition-colors">ne3mer@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Budapest, Hungary</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <p>© {currentYear} {t("copyright")}</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">{t("legal.privacy")}</Link>
              <Link href="/terms" className="hover:text-white transition-colors">{t("legal.terms")}</Link>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            Back to Top
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
