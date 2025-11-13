import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NeonSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  neon?: boolean;
}

export const NeonSearch = forwardRef<HTMLInputElement, NeonSearchProps>(
  ({ neon = false, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground z-10" />
          <input
            ref={ref}
            type="search"
            className={cn(
              'w-full h-11 pl-11 pr-4 rounded-full',
              'bg-card/60 backdrop-blur-md',
              'border border-border/50',
              'text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
              'transition-all duration-200',
              neon && 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

NeonSearch.displayName = 'NeonSearch';
