"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const stats = [
  { key: "experience", value: "12+" },
  { key: "projects", value: "50+" },
  { key: "clients", value: "30+" },
  { key: "satisfaction", value: "100%" },
];

export function Stats() {
  const t = useTranslations("Stats");

  return (
    <section className="py-20 bg-black border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
