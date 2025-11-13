import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "default" | "feature" | "pricing" | "blog" | "stat" | "profile";
  className?: string;
}

export function SkeletonCard({ variant = "default", className }: SkeletonCardProps) {
  if (variant === "feature") {
    return (
      <div className={cn("border rounded-lg p-6 space-y-4", className)}>
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-9 w-28 mt-4" />
      </div>
    );
  }

  if (variant === "pricing") {
    return (
      <div className={cn("border rounded-lg p-8 space-y-6", className)}>
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-40" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (variant === "blog") {
    return (
      <div className={cn("border rounded-lg overflow-hidden", className)}>
        <Skeleton className="h-48 w-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-3 mt-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "stat") {
    return (
      <div className={cn("border rounded-lg p-6 space-y-3", className)}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <div className={cn("border rounded-lg p-6", className)}>
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Skeleton className="h-px w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
