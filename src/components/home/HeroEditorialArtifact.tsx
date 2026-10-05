"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Labels = {
  nowSetting: string;
  plate: string;
  handSet: string;
  specimenType?: string;
  craftLine?: string;
  studioEntity?: string;
};

export function HeroEditorialArtifact({ labels }: { labels: Labels }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setCoords({ x, y });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Subtle 3D tilt angles (max ~4.5 degrees)
  const rotateX = reduceMotion ? 0 : -coords.y * 4.5;
  const rotateY = reduceMotion ? 0 : coords.x * 4.5;

  // Parallax offsets for layered depth
  const bgShiftX = reduceMotion ? 0 : coords.x * -3;
  const bgShiftY = reduceMotion ? 0 : coords.y * -3;
  const plateShiftX = reduceMotion ? 0 : coords.x * 3.5;
  const plateShiftY = reduceMotion ? 0 : coords.y * 3.5;
  const typeShiftX = reduceMotion ? 0 : coords.x * 6;
  const typeShiftY = reduceMotion ? 0 : coords.y * 6;

  return (
    <div className="relative">
      {/* Archival stamp tag in top corner */}
      <span className="absolute -top-3 -right-3 z-20 stamp">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-sienna animate-ink-blink" />
        {labels.nowSetting}
      </span>

      {/* Passe-partout double frame */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="passepartout relative overflow-hidden bg-paper-deep/40 p-1.5 shadow-[0_12px_40px_rgba(20,18,16,0.08)] transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(20,18,16,0.14)]"
        style={{
          perspective: 1000,
        }}
      >
        <div
          className="relative aspect-4/5 w-full overflow-hidden border border-ink/40 bg-paper transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Base Layer: Art-directed studio photograph of physical archival specimen */}
          <div
            className="absolute -inset-3 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${bgShiftX}px, ${bgShiftY}px, 0)`,
            }}
          >
            <Image
              src="/images/hero/specimen-plate.jpg"
              alt="NimaStudio Archival Design Specimen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover object-center select-none"
            />
            {/* Warm paper tone blend layer */}
            <div className="absolute inset-0 bg-paper-soft/25 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Precision calibration grid overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,18,16,0.25)_100%)]" />

          {/* Middle Layer: Translucent Drafting Vellum Plate */}
          <div
            className={cn(
              "relative z-10 m-3 flex h-[calc(100%-1.5rem)] flex-col justify-between border bg-paper/85 p-3.5 backdrop-blur-[2.5px] transition-all duration-300 ease-out",
              isHovered
                ? "border-ink/60 shadow-[0_8px_28px_rgba(20,18,16,0.14)]"
                : "border-ink/40 shadow-[0_4px_20px_rgba(20,18,16,0.06)]"
            )}
            style={{
              transform: `translate3d(${plateShiftX}px, ${plateShiftY}px, 12px)`,
            }}
          >
            {/* Top specimen metadata header */}
            <div className="flex items-start justify-between border-b border-ink/20 pb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-mute">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-1 w-1 bg-sienna" />
                <span className="text-ink font-semibold">NIMASTUDIO</span>
              </div>
              <span className="text-ink-faint">PLATE · 01</span>
            </div>

            {/* Corner registration crosshairs on the vellum */}
            <div className="pointer-events-none absolute top-2 left-2 text-[10px] font-mono text-sienna/60 leading-none">
              +
            </div>
            <div className="pointer-events-none absolute top-2 right-2 text-[10px] font-mono text-sienna/60 leading-none">
              +
            </div>
            <div className="pointer-events-none absolute bottom-2 left-2 text-[10px] font-mono text-sienna/60 leading-none">
              +
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 text-[10px] font-mono text-sienna/60 leading-none">
              +
            </div>

            {/* Center: Typographic Master Specimen (MA) with drafting axes */}
            <div
              className="relative my-auto flex flex-col items-center justify-center py-2 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${typeShiftX}px, ${typeShiftY}px, 20px)`,
              }}
            >
              {/* Architectural drafting axes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-sienna/30"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/20"
              />

              {/* Technical drafting guides */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-1/4 h-px border-t border-dashed border-ink/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-1/4 h-px border-t border-dashed border-ink/20"
              />

              {/* The Monogram */}
              <div className="relative z-10 flex items-baseline tracking-tight">
                <span className="font-display text-[5.4rem] sm:text-[6.2rem] lg:text-[5rem] xl:text-[5.8rem] leading-none text-ink select-none drop-shadow-[0_1px_2px_rgba(20,18,16,0.15)]">
                  M<span className="italic text-sienna font-normal">A</span>
                </span>
              </div>

              {/* Architectural typographic label */}
              <div className="relative z-10 mt-1 flex flex-col items-center text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-ink font-medium">
                  Mohammad Afsharfar
                </span>
                <span className="mt-0.5 font-display italic text-[13px] text-ink-mute">
                  Founder & Principal Engineer
                </span>
              </div>
            </div>

            {/* Bottom vellum technical strip */}
            <div className="border-t border-ink/20 pt-2">
              <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-ink-mute">
                <span className="text-sienna">Digital Craft × Engineering</span>
                <span className="text-ink-faint">Budapest · 47°N</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archival plate colophon */}
      <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
        <span>{labels.plate}</span>
        <span className="inline-flex items-center gap-1.5 text-ink-faint">
          <span className="h-1 w-1 rounded-full bg-sienna" />
          {labels.handSet}
        </span>
        <span className="text-ink-faint">EST. 2017</span>
      </div>

      <p className="mt-2 text-center font-display italic text-sm text-ink-mute">
        Digital Craft · Product Architecture · Systems
      </p>
    </div>
  );
}
