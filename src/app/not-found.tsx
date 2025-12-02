"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/10 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Lost in the Void
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            The coordinates you are looking for seem to have drifted away into deep space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/">
              <Button variant="premium" size="lg" className="group">
                <Home className="mr-2 h-4 w-4" />
                Return to Base
              </Button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm font-medium px-6 py-3"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
