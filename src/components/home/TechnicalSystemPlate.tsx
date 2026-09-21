"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { name: "Product", meta: "Scope · workflow · evidence", tool: "NIMA / 01" },
  { name: "Interface", meta: "Next.js · React", tool: "UI / 02" },
  { name: "API", meta: "Node.js · Python", tool: "SRV / 03" },
  { name: "Data", meta: "PostgreSQL · MongoDB", tool: "DB / 04" },
  { name: "Delivery", meta: "Docker · Vercel", tool: "OPS / 05" },
];

export function TechnicalSystemPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const plate = plateRef.current;
    if (!plate) return;
    const bounds = plate.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
    plate.querySelectorAll<HTMLElement>(".technical-system-node").forEach((node, index) => {
      const depth = 0.42 + index * 0.1;
      node.style.transform = `translate3d(${(x * depth).toFixed(2)}px, ${(y * depth).toFixed(2)}px, 0)`;
    });
  };

  const resetPlate = () => {
    const plate = plateRef.current;
    plate?.querySelectorAll<HTMLElement>(".technical-system-node").forEach((node) => {
      node.style.transform = "translate3d(0, 0, 0)";
    });
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      className="mt-6"
    >
      <div
        ref={plateRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPlate}
        className="technical-system-plate relative overflow-hidden border-y border-ink bg-paper-soft/45 px-3 py-4"
      >
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-sienna">Plate · Product system</span>
          <span className="text-ink-faint">End-to-end</span>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[13px] top-4 w-px bg-ink/30"
          />
          <ol className="space-y-1.5">
            {nodes.map((node, index) => (
              <li
                key={node.name}
                className="technical-system-node group relative grid min-h-10 grid-cols-[28px_1fr_auto] items-center gap-2"
              >
                <span className="relative z-10 grid h-7 w-7 place-items-center border border-ink bg-paper font-mono text-[9px] text-sienna">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[17px] leading-none text-ink">
                  {node.name}
                  <span className="block max-h-0 overflow-hidden font-mono text-[8px] uppercase tracking-[0.12em] text-ink-mute opacity-0 transition-all duration-200 group-hover:mt-1 group-hover:max-h-5 group-hover:opacity-100 group-focus-within:mt-1 group-focus-within:max-h-5 group-focus-within:opacity-100">
                    {node.meta}
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
                  {node.tool}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
}
