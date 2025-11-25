import { Check } from "lucide-react";
import { homeContent } from "@/config/home-content";

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-primary" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function HeroTrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-muted-foreground text-sm px-4">
      {homeContent.hero.trustIndicators.map((indicator, index) => (
        <TrustItem key={index}>
          {indicator.text}
        </TrustItem>
      ))}
    </div>
  );
}
