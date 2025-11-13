import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  span?: {
    mobile?: 'col-span-1' | 'col-span-2';
    tablet?: 'md:col-span-1' | 'md:col-span-2';
    desktop?: 'lg:col-span-1' | 'lg:col-span-2' | 'lg:col-span-3';
  };
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid gap-3',
        // Mobile: 1 column
        'grid-cols-1',
        // Tablet: 2 columns
        'md:grid-cols-2',
        // Desktop: 3 columns with auto-flow for dense packing
        'lg:grid-cols-3 lg:auto-rows-[minmax(140px,auto)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoItem({ children, className, span }: BentoItemProps) {
  return (
    <div
      className={cn(
        'col-span-1',
        span?.mobile,
        span?.tablet,
        span?.desktop,
        className
      )}
    >
      {children}
    </div>
  );
}
