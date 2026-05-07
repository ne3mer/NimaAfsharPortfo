import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Editorial buttons — sharp corners, ink/paper palette, no gradients.
 * "ink"      → primary, ink fill on paper
 * "sienna"   → highest emphasis, sienna fill
 * "outline"  → 1.5px ink border on paper
 * "ghost"    → quiet text link with hover ink
 * "link"     → underlined inline action
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-tight transition-[background,color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 select-none active:translate-y-[1px]",
  {
    variants: {
      variant: {
        ink:
          "bg-ink text-paper border border-ink hover:bg-paper hover:text-ink",
        sienna:
          "bg-sienna text-paper border border-sienna-deep hover:bg-sienna-deep",
        outline:
          "border-[1.5px] border-ink text-ink bg-transparent hover:bg-ink hover:text-paper",
        olive:
          "bg-olive text-paper border border-olive hover:bg-ink hover:border-ink",
        ghost:
          "text-ink hover:text-sienna",
        link:
          "text-sienna underline underline-offset-4 decoration-sienna/60 hover:decoration-sienna",
        /* Legacy aliases mapped to the new vocabulary so older callers keep working. */
        default: "bg-ink text-paper border border-ink hover:bg-paper hover:text-ink",
        secondary: "bg-paper-deep text-ink border border-ink/30 hover:bg-paper-soft",
        destructive: "bg-stamp text-paper border border-stamp hover:bg-ink",
        premium: "bg-sienna text-paper border border-sienna-deep hover:bg-sienna-deep",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7 text-[15px]",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
