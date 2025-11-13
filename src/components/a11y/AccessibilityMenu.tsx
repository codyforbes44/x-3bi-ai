import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';

/**
 * Accessibility Menu Component
 * Provides user-configurable accessibility preferences
 */
export function AccessibilityMenu() {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largerText: false,
    textSize: 100, // percentage
    keyboardNavigation: true,
    screenReaderOptimized: false,
  });

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('a11y-preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load accessibility preferences:', e);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('a11y-preferences', JSON.stringify(preferences));

    // Apply preferences to document
    document.documentElement.style.fontSize = `${preferences.textSize}%`;
    
    if (preferences.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [preferences]);

  const updatePreference = (key: keyof typeof preferences, value: boolean | number) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Accessibility settings"
          className="touch-target"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Accessibility Settings</SheetTitle>
          <SheetDescription>
            Customize your accessibility preferences for a better experience
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduce Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={preferences.reducedMotion}
              onCheckedChange={(checked) => updatePreference('reducedMotion', checked)}
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase color contrast for better visibility
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={preferences.highContrast}
              onCheckedChange={(checked) => updatePreference('highContrast', checked)}
            />
          </div>

          {/* Text Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-size">Text Size</Label>
              <span className="text-sm text-muted-foreground">
                {preferences.textSize}%
              </span>
            </div>
            <Slider
              id="text-size"
              min={75}
              max={150}
              step={5}
              value={[preferences.textSize]}
              onValueChange={([value]) => updatePreference('textSize', value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Adjust text size across the entire application
            </p>
          </div>

          {/* Keyboard Navigation */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="keyboard-nav">Enhanced Keyboard Navigation</Label>
              <p className="text-sm text-muted-foreground">
                Show visible focus indicators
              </p>
            </div>
            <Switch
              id="keyboard-nav"
              checked={preferences.keyboardNavigation}
              onCheckedChange={(checked) => updatePreference('keyboardNavigation', checked)}
            />
          </div>

          {/* Screen Reader Optimization */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
              <p className="text-sm text-muted-foreground">
                Enhanced ARIA labels and announcements
              </p>
            </div>
            <Switch
              id="screen-reader"
              checked={preferences.screenReaderOptimized}
              onCheckedChange={(checked) => updatePreference('screenReaderOptimized', checked)}
            />
          </div>

          {/* Reset to Defaults */}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={() =>
                setPreferences({
                  reducedMotion: false,
                  highContrast: false,
                  largerText: false,
                  textSize: 100,
                  keyboardNavigation: true,
                  screenReaderOptimized: false,
                })
              }
              className="w-full"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
