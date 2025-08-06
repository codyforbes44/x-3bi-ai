import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Feature } from "@/components/dashboard/FeatureCategories";

interface MobileOptimizedCardProps {
  feature: Feature;
  onSelect: () => void;
  isActive?: boolean;
}

export const MobileOptimizedCard = ({ feature, onSelect, isActive = false }: MobileOptimizedCardProps) => {
  const isMobile = useIsMobile();
  const { icon: Icon, title, description, badge, color } = feature;

  return (
    <Card 
      className={`
        transition-all duration-200 cursor-pointer
        ${isMobile ? 'p-1' : 'p-2'}
        ${isActive ? 'ring-2 ring-primary bg-accent/50' : 'hover:bg-accent/20'}
        ${isMobile ? 'min-h-[120px]' : 'min-h-[140px]'}
      `}
      onClick={onSelect}
    >
      <CardHeader className={isMobile ? 'p-3 pb-2' : 'p-4 pb-2'}>
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg bg-muted ${color}`}>
            <Icon className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
          </div>
          <Badge variant="secondary" className={`text-xs ${isMobile ? 'px-2 py-0.5' : 'px-2 py-1'}`}>
            {badge}
          </Badge>
        </div>
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold leading-tight`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? 'p-3 pt-0' : 'p-4 pt-0'}>
        <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

interface MobileOptimizedSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MobileOptimizedSection = ({ title, children, className = "" }: MobileOptimizedSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground`}>
        {title}
      </h2>
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {children}
      </div>
    </div>
  );
};

interface MobileOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "hero";
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
}

export const MobileOptimizedButton = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default",
  className = "",
  disabled = false 
}: MobileOptimizedButtonProps) => {
  const isMobile = useIsMobile();
  
  const mobileSize = isMobile ? "lg" : size;
  const mobileClass = isMobile ? "min-h-[48px] text-base" : "";

  return (
    <Button
      variant={variant}
      size={mobileSize}
      onClick={onClick}
      disabled={disabled}
      className={`${mobileClass} ${className}`}
    >
      {children}
    </Button>
  );
};