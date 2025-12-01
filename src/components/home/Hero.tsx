"use client";

import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { ArrowRight, Cpu, Gauge, Terminal, Zap, Globe } from "lucide-react";
import HeroCyberGrid from "@/components/home/HeroCyberGrid";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  const CAPABILITIES = [
    { label: t("capabilities.ai"), icon: Cpu },
    { label: t("capabilities.infra"), icon: Gauge },
    { label: t("capabilities.scale"), icon: Globe },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black text-white">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <HeroCyberGrid />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 pt-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t("systemOnline")}
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]"
                dangerouslySetInnerHTML={{ __html: t.raw("title") }}
              >
              </motion.h1>
              
              <div className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
                <TextGenerateEffect 
                  words={t("subtitle")}
                  className="text-white/70 font-normal"
                />
              </div>
            </div>

            <motion.div 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
              <Link href="/start" className={buttonVariants({ variant: "premium", size: "lg", className: "h-14 px-8 rounded-full text-base font-semibold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)] transition-all duration-300" })}>
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 rtl:rotate-180" />
              </Link>
              <Link href="/work" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-base backdrop-blur-sm" })}>
                  {t("ctaSecondary")}
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-8 flex items-center gap-6 text-sm text-white/40 font-mono"
            >
              {CAPABILITIES.map((cap, i) => (
                <div key={i} className="flex items-center gap-2">
                  <cap.icon className="h-4 w-4" />
                  <span>{cap.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Floating Cards / Abstract UI */}
            <motion.div 
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            >
              <div className="relative w-full h-full">
                {/* Central Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Floating Code Card */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-10 w-72 bg-black/80 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-white/50 font-mono">deploy_sequence.sh</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="text-emerald-400">$ init_core_systems</div>
                    <div className="text-white/60">Loading modules... [OK]</div>
                    <div className="text-white/60">Optimizing runtime... [OK]</div>
                    <div className="text-blue-400">System ready.</div>
                  </div>
                </motion.div>

                {/* Floating Stats Card */}
                <motion.div 
                  animate={{ y: [0, 30, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-32 left-0 w-64 bg-black/80 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Performance</span>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[99%] bg-gradient-to-r from-yellow-400 to-orange-500" />
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
