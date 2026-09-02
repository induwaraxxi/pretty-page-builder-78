import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        glow: "bg-gradient-to-r from-brand to-accent text-primary-foreground shadow-[0_0_30px] shadow-brand/50 hover:shadow-[0_0_44px] hover:shadow-accent/60 hover:-translate-y-0.5",
        glass:
          "border border-border bg-white/5 text-foreground backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5",
        outline:
          "border border-neon/30 bg-neon/10 text-neon backdrop-blur-sm hover:bg-neon/20",
        ghost: "text-muted-foreground hover:text-neon",
      },
      size: {
        sm: "min-h-9 px-4 text-xs sm:text-sm",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-6 text-sm sm:min-h-13 sm:px-7 sm:text-base",
        icon: "size-10 p-0",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "glow", size: "md", full: false },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, full, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size, full }), className)} {...props} />;
}
