import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "success" | "error" | "warning" | "info" | "active" | "inactive";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ status, size = "md", pulse = false, className }: StatusDotProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colorClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
    active: "bg-primary",
    inactive: "bg-muted-foreground",
  };

  return (
    <div className="relative inline-flex">
      <div className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[status],
        pulse && "animate-pulse",
        className
      )} />
    </div>
  );
}
