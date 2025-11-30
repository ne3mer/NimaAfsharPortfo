"use client";

import { cn } from "@/lib/utils";

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", 
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Framer Motion",
  "Stripe", "OpenAI", "Supabase", "Prisma", "GraphQL"
];

export function TechStack() {
  return (
    <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Powering Next-Gen Applications
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {/* First set of items */}
          {technologies.map((tech, i) => (
            <span 
              key={i} 
              className="text-2xl font-bold text-white/20 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {technologies.map((tech, i) => (
            <span 
              key={`dup-${i}`} 
              className="text-2xl font-bold text-white/20 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
          
          {/* Triplicate set for wide screens */}
           {technologies.map((tech, i) => (
            <span 
              key={`tri-${i}`} 
              className="text-2xl font-bold text-white/20 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
