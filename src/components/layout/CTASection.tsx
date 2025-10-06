import { ReactNode } from "react";

interface CTASectionProps {
  title: string;
  description?: string;
  actions: ReactNode;
  variant?: "default" | "gradient";
  className?: string;
}

export function CTASection({ 
  title, 
  description, 
  actions, 
  variant = "default",
  className = "" 
}: CTASectionProps) {
  const baseClasses = "container mx-auto px-4 py-12 md:py-16 text-center";
  const variantClasses = variant === "gradient" 
    ? "bg-gradient-hero text-white rounded-2xl"
    : "bg-gradient-subtle";

  return (
    <section className={`${baseClasses} ${className}`}>
      <div className={`max-w-3xl md:max-w-4xl mx-auto ${variant === "gradient" ? "p-8 md:p-12" : ""} ${variantClasses}`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          {title}
        </h2>
        {description && (
          <p className={`text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto ${
            variant === "gradient" ? "opacity-90" : "text-muted-foreground"
          }`}>
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          {actions}
        </div>
      </div>
    </section>
  );
}
