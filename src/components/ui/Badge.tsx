import { cn } from "@/lib/utils";

export function Badge({ className, children, variant = "default" }: { className?: string, children: React.ReactNode, variant?: "default" | "success" | "warning" | "danger" }) {
  const variants = {
    default: "bg-primary/10 text-primary",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    danger: "bg-red-500/10 text-red-500",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
