import { ChevronRight, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getAllFeatures } from "./FeatureCategories";

interface BreadcrumbsProps {
  activeTab: string;
}

export const DashboardBreadcrumbs = ({ activeTab }: BreadcrumbsProps) => {
  const features = getAllFeatures();
  const activeFeature = features.find(f => f.id === activeTab);

  const categoryLabels = {
    enterprise: 'Enterprise',
    'advanced-ai': 'Advanced AI',
    'ai-tools': 'AI Tools',
    utilities: 'Utilities',
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <NavLink 
        to="/" 
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </NavLink>
      
      <ChevronRight className="w-4 h-4" />
      
      <NavLink 
        to="/dashboard" 
        className="hover:text-foreground transition-colors"
      >
        Dashboard
      </NavLink>

      {activeFeature && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {categoryLabels[activeFeature.category as keyof typeof categoryLabels]}
          </span>
          <ChevronRight className="w-4 h-4 hidden sm:inline" />
          <span className="text-foreground font-medium">{activeFeature.title}</span>
        </>
      )}
    </nav>
  );
};
