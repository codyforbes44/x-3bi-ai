import { useState, useEffect } from "react";
import { QuickAccess } from "./QuickAccess";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DashboardOverviewProps {
  onFeatureSelect: (featureId: string) => void;
}

/**
 * Dashboard overview page
 * Shows quick access and getting started information
 */
export const DashboardOverview = ({ onFeatureSelect }: DashboardOverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-10 w-10 rounded-lg mb-2" />
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuickAccess onFeatureSelect={onFeatureSelect} />
    </div>
  );
};
