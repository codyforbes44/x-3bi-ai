import { Sparkles, Brain, Zap } from "lucide-react";

interface StatItemProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
}

function StatItem({ value, label, icon, gradient, glowColor }: StatItemProps) {
  return (
    <div className="relative group">
      <div 
        className={`text-6xl font-bold ${gradient} bg-clip-text text-transparent`}
        aria-label={`${value} ${label}`}
      >
        {value}
      </div>
      <div className="mt-3 flex flex-col items-center gap-2">
        <div className="text-primary/70 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
      </div>
      <div className={`absolute -inset-2 ${glowColor} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
}

export function StatsDisplay() {
  return (
    <div className="flex gap-16 justify-center text-center flex-wrap">
      <StatItem
        value={24}
        label="AI Models"
        icon={<Sparkles className="w-8 h-8" />}
        gradient="bg-gradient-to-br from-primary to-accent"
        glowColor="bg-primary/10"
      />
      <StatItem
        value={12}
        label="Integrations"
        icon={<Brain className="w-8 h-8" />}
        gradient="bg-gradient-to-br from-accent to-primary"
        glowColor="bg-accent/10"
      />
      <StatItem
        value="∞"
        label="Possibilities"
        icon={<Zap className="w-8 h-8" />}
        gradient="bg-gradient-to-br from-primary via-purple-500 to-pink-500"
        glowColor="bg-purple-500/10"
      />
    </div>
  );
}
