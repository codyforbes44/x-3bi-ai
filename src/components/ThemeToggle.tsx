import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "default" | "mobile";
  className?: string;
}

export const ThemeToggle = ({ variant = "default", className = "" }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (variant === "mobile") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <span className="text-sm font-medium">Theme</span>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="relative h-6 w-11 p-0 bg-muted border-0"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-md transition-transform duration-200 ${
                theme === "dark" ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </Button>
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`h-9 w-9 hover-scale ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-smooth" />
      ) : (
        <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-smooth" />
      )}
    </Button>
  );
};
