import { QuickAccess } from "./QuickAccess";

interface DashboardOverviewProps {
  onFeatureSelect: (featureId: string) => void;
}

/**
 * Dashboard overview page
 * Shows quick access and getting started information
 */
export const DashboardOverview = ({ onFeatureSelect }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <QuickAccess onFeatureSelect={onFeatureSelect} />
    </div>
  );
};
