import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("bg-card border border-white/10 rounded-2xl p-6", className)}>
      {children}
    </div>
  );
}
