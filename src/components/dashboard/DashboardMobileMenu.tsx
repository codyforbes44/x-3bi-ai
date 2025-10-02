import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu } from "lucide-react";
import { Feature } from "./FeatureCategories";

interface MobileMenuProps {
  features: Feature[];
  activeTab: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTabSelect: (tabId: string) => void;
}

const CATEGORY_LABELS = {
  enterprise: 'Enterprise Features',
  'advanced-ai': 'Advanced AI',
  'ai-tools': 'AI Tools',
  utilities: 'Utilities',
} as const;

const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABELS> = [
  'enterprise',
  'advanced-ai',
  'ai-tools',
  'utilities'
];

export const DashboardMobileMenu = ({
  features,
  activeTab,
  open,
  onOpenChange,
  onTabSelect
}: MobileMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2 h-12">
          <Menu className="w-5 h-5" />
          <span className="font-medium">Browse All Features</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
        <div className="py-6 px-4 border-b bg-muted/30">
          <h2 className="text-lg font-semibold">Feature Categories</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {features.length} AI-powered features
          </p>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-8 py-6">
            {CATEGORY_ORDER.map((category) => {
              const categoryFeatures = features.filter(f => f.category === category);
              
              if (categoryFeatures.length === 0) return null;
              
              return (
                <div key={category} className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  
                  <div className="space-y-1">
                    {categoryFeatures.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => {
                          onTabSelect(feature.id);
                          onOpenChange(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-lg text-left transition-all hover-scale ${
                          activeTab === feature.id 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <feature.icon 
                          className={`w-5 h-5 flex-shrink-0 ${
                            activeTab === feature.id 
                              ? 'text-primary-foreground' 
                              : feature.color
                          }`} 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{feature.title}</div>
                          <div className="text-xs opacity-70 truncate mt-0.5">
                            {feature.badge}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
