import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Zap, Cpu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardHeader = () => {
  const isMobile = useIsMobile();
  const stats = [
    {
      title: "AI Models Available",
      value: "15+",
      description: "Advanced AI capabilities",
      icon: Brain,
      color: "text-blue-500"
    },
    {
      title: "Processing Speed",
      value: "< 1s",
      description: "Average response time",
      icon: Zap,
      color: "text-yellow-500"
    },
    {
      title: "Features Active",
      value: "100%",
      description: "All systems operational",
      icon: Cpu,
      color: "text-green-500"
    }
  ];

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-hero rounded-xl flex items-center justify-center`}>
          <Sparkles className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
        </div>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>AI Platform</h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Advanced AI capabilities at your fingertips
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                </div>
                <div>
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{stat.value}</div>
                  <div className={`text-sm font-medium ${isMobile ? 'leading-tight' : ''}`}>{stat.title}</div>
                  <div className={`text-xs text-muted-foreground ${isMobile ? 'leading-tight' : ''}`}>{stat.description}</div>
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