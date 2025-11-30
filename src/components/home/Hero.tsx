"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Layers, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Pure Engineering.<br />
            <span className="text-primary">No Templates.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            NIMA Studio builds scalable, custom software for startups and businesses. 
            We replace generic WordPress sites with high-performance digital products.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="premium" size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/start">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 hover:bg-white/5" asChild>
              <Link href="/work">View Portfolio</Link>
            </Button>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Code2, title: "Custom Architecture", desc: "Built from scratch for your specific needs." },
            { icon: Zap, title: "High Performance", desc: "Optimized for speed and scalability." },
            { icon: Layers, title: "Full-Stack Solution", desc: "From UI/UX to Backend & DevOps." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left">
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
