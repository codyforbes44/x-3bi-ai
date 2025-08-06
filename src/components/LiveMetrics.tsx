import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Zap, Clock, Server, Activity } from "lucide-react";

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    responseTime: 0,
    requestsPerMinute: 0,
    uptime: 99.9,
    modelsActive: 9,
    satisfaction: 98
  });

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Simulate live metrics with realistic numbers
    const interval = setInterval(() => {
      setMetrics({
        activeUsers: Math.floor(Math.random() * 50) + 150, // 150-200 users
        responseTime: Math.floor(Math.random() * 500) + 200, // 200-700ms
        requestsPerMinute: Math.floor(Math.random() * 20) + 80, // 80-100 requests
        uptime: 99.9 + Math.random() * 0.1, // 99.9-100%
        modelsActive: 9,
        satisfaction: 97 + Math.random() * 2 // 97-99%
      });
    }, 2000);

    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(animationTimeout);
    };
  }, []);

  const metricsData = [
    {
      title: "Active Users",
      value: metrics.activeUsers,
      suffix: " online",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Response Time",
      value: metrics.responseTime,
      suffix: "ms",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Requests/Min",
      value: metrics.requestsPerMinute,
      suffix: " req",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "System Uptime",
      value: metrics.uptime.toFixed(2),
      suffix: "%",
      icon: Server,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "AI Models",
      value: metrics.modelsActive,
      suffix: " active",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Satisfaction",
      value: metrics.satisfaction.toFixed(1),
      suffix: "%",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-card backdrop-blur-sm rounded-full px-6 py-3 mb-6">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-foreground font-medium">Live Performance</span>
          <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
            Real-time
          </Badge>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Platform Analytics
        </h2>
        <p className="text-muted-foreground">
          Real-time metrics showing our AI platform performance
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricsData.map((metric, index) => (
          <Card 
            key={metric.title}
            className={`bg-card/80 backdrop-blur-sm border-border hover:bg-card transition-all duration-300 ${
              isAnimating ? 'animate-pulse' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                  <span className="text-sm text-muted-foreground font-normal">
                    {metric.suffix}
                  </span>
                </div>
                
                {/* Progress bar for visual appeal */}
                <Progress 
                  value={
                    metric.title === "System Uptime" ? metrics.uptime : 
                    metric.title === "Satisfaction" ? metrics.satisfaction :
                    metric.title === "Active Users" ? (metrics.activeUsers / 200) * 100 :
                    metric.title === "Response Time" ? Math.max(0, 100 - (metrics.responseTime / 10)) :
                    metric.title === "Requests/Min" ? (metrics.requestsPerMinute / 100) * 100 :
                    100
                  }
                  className="h-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Card className="bg-card/80 backdrop-blur-sm border-border inline-block">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-foreground font-medium">All systems operational</span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
                100% Uptime
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMetrics;