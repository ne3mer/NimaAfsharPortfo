"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { key: "discovery", icon: Search },
  { key: "design", icon: PenTool },
  { key: "development", icon: Code2 },
  { key: "launch", icon: Rocket },
];

export function Process() {
  const t = useTranslations("Process");

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300 relative z-10 backdrop-blur-sm">
                  <step.icon className="w-10 h-10 text-white/70 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`steps.${step.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
