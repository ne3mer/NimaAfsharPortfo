"use client";

import { motion } from "framer-motion";

export default function HeroCyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black perspective-1000">
      {/* Moving Grid Floor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-[200vw] h-[200vh] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          style={{
            transform: "rotateX(60deg) translateY(-100px) translateZ(-200px)",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Glowing Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Central "Core" Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]" />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: rotateX(60deg) translateY(0) translateZ(-200px); }
          100% { transform: rotateX(60deg) translateY(4rem) translateZ(-200px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
