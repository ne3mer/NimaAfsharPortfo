"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight"
          >
            {t("title")}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/start" 
              className={buttonVariants({ 
                variant: "premium", 
                size: "lg", 
                className: "h-14 px-8 text-lg rounded-full shadow-2xl shadow-primary/20" 
              })}
            >
              {t("primary")}
              <ArrowRight className="ml-2 h-5 w-5 rtl:rotate-180" />
            </Link>
            <Link 
              href="/contact" 
              className={buttonVariants({ 
                variant: "outline", 
                size: "lg", 
                className: "h-14 px-8 text-lg rounded-full bg-white/5 border-white/10 hover:bg-white/10" 
              })}
            >
              {t("secondary")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
