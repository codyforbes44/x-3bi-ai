import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Sparkles, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Brain,
    label: "AI Models",
    value: "6+",
    description: "Best-in-class providers",
    color: "text-blue-500"
  },
  {
    icon: Sparkles,
    label: "Features",
    value: "15+",
    description: "Advanced capabilities",
    color: "text-purple-500"
  },
  {
    icon: Zap,
    label: "Processing",
    value: "Real-time",
    description: "Instant responses",
    color: "text-yellow-500"
  },
  {
    icon: TrendingUp,
    label: "Quality",
    value: "Premium",
    description: "Enterprise-grade",
    color: "text-green-500"
  }
];

const DashboardHeader = () => {
  return (
    <div className="mb-8 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI Dashboard
          </h1>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by Best AI
          </Badge>
        </div>
        <p className="text-base md:text-lg text-muted-foreground">
          Access Claude Opus 4, GPT Image-1, ElevenLabs Voice, and more advanced AI capabilities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="hover:shadow-lg transition-all hover-scale border-border/50"
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
