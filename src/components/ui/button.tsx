import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 touch-target",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-hero text-white hover:shadow-glow transition-spring border-0 shadow-lg",
        "neon-primary": "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all",
        "neon-secondary": "bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all",
        "neon-accent": "bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 text-white border-0 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all",
        glass: "glass-card border border-white/10 backdrop-blur-md hover:border-white/20 transition-all",
      },
      size: {
        default: "h-12 px-5 py-2.5 text-base md:h-10 md:px-4 md:text-sm",
        sm: "h-10 px-4 text-sm md:h-9 md:px-3 md:text-xs",
        lg: "h-14 px-7 text-lg md:h-12 md:px-8 md:text-base",
        icon: "h-12 w-12 md:h-10 md:w-10",
        mobile: "h-14 px-6 text-base min-w-[140px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
