import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Palette } from "lucide-react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light', !isDark);
  };

  // Set initial dark mode
  if (typeof window !== 'undefined' && !document.documentElement.classList.contains('light')) {
    document.documentElement.classList.remove('light');
  }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50">
        <Card className="bg-card/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-blue-400" />
              <Badge variant="outline" className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                {isDark ? 'Dark' : 'Light'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ThemeProvider;