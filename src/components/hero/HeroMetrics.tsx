import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  trend?: string;
}

const METRICS: Metric[] = [
  { value: "50,000+", label: "Active Teams", trend: "+12% this month" },
  { value: "2.4M", label: "API Calls Today", trend: "Real-time" },
  { value: "99.9%", label: "Uptime SLA", trend: "Enterprise Grade" },
  { value: "<2s", label: "Avg Response", trend: "All Models" },
];

export function HeroMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 px-4">
      {METRICS.map((metric, index) => (
        <div
          key={metric.label}
          className={`
            text-center p-4 rounded-xl
            bg-card/50 backdrop-blur-sm border border-border/50
            hover:bg-card/80 hover:border-primary/20 hover:shadow-glow
            transition-all duration-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <div className="text-2xl md:text-3xl font-bold mb-1 gradient-text">
            {metric.value}
          </div>
          <div className="text-sm text-muted-foreground font-medium mb-1">
            {metric.label}
          </div>
          {metric.trend && (
            <div className="flex items-center justify-center gap-1 text-xs text-success">
              <TrendingUp className="w-3 h-3" />
              <span>{metric.trend}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
