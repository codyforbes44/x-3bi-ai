import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Palette } from "lucide-react";
const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light', !isDark);
  };

  // Set initial dark mode
  if (typeof window !== 'undefined' && !document.documentElement.classList.contains('light')) {
    document.documentElement.classList.remove('light');
  }
  return <>
      {children}
      <div className="fixed top-4 right-4 z-50">
        <Card className="bg-card/95 backdrop-blur-sm border-border/50">
          
        </Card>
      </div>
    </>;
};
export default ThemeProvider;