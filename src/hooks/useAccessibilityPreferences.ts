import { useState, useEffect } from 'react';

interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  forcedColors: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
}

/**
 * Hook to detect user accessibility preferences
 * Respects system-level settings for better UX
 */
export function useAccessibilityPreferences(): AccessibilityPreferences {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    forcedColors: false,
    prefersColorScheme: 'no-preference'
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPrefs(prev => ({ ...prev, reducedMotion: motionQuery.matches }));
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);
    
    // High contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const updateContrast = () => setPrefs(prev => ({ ...prev, highContrast: contrastQuery.matches }));
    updateContrast();
    contrastQuery.addEventListener('change', updateContrast);
    
    // Forced colors (Windows High Contrast Mode)
    const forcedColorsQuery = window.matchMedia('(forced-colors: active)');
    const updateForcedColors = () => setPrefs(prev => ({ ...prev, forcedColors: forcedColorsQuery.matches }));
    updateForcedColors();
    forcedColorsQuery.addEventListener('change', updateForcedColors);
    
    // Color scheme preference
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const updateColorScheme = () => {
      const scheme = darkQuery.matches ? 'dark' : lightQuery.matches ? 'light' : 'no-preference';
      setPrefs(prev => ({ ...prev, prefersColorScheme: scheme }));
    };
    updateColorScheme();
    darkQuery.addEventListener('change', updateColorScheme);
    lightQuery.addEventListener('change', updateColorScheme);
    
    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      contrastQuery.removeEventListener('change', updateContrast);
      forcedColorsQuery.removeEventListener('change', updateForcedColors);
      darkQuery.removeEventListener('change', updateColorScheme);
      lightQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);
  
  return prefs;
}
