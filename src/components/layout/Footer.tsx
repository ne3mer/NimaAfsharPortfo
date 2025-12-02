"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, ArrowUp, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

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
              Have an idea?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's build something amazing together.
            </p>
          </div>
          <Link href="/start">
            <Button size="lg" variant="premium" className="rounded-full px-8 py-8 text-lg">
              Start a Project
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
            <div className="flex gap-4 pt-4">
              <SocialLink href="https://linkedin.com" icon={Linkedin} />
              <SocialLink href="https://twitter.com" icon={Twitter} />
              <SocialLink href="https://github.com" icon={Github} />
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-white mb-6 text-lg">{t("explore.title")}</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/work" className="hover:text-white transition-colors block py-1">{t("explore.portfolio")}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors block py-1">{t("explore.about")}</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors block py-1">{t("explore.start")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors block py-1">{t("explore.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:hello@nimastudio.com" className="hover:text-white transition-colors">hello@nimastudio.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>San Francisco, CA</span>
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

function SocialLink({ href, icon: Icon }: { href: string, icon: LucideIcon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
