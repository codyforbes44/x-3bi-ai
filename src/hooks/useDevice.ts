import { useIsMobile } from "@/hooks/use-mobile";
import { useNativePlatform } from "@/hooks/useNativePlatform";
import { useMemo } from "react";

/**
 * Unified device detection hook
 * Consolidates all device-related checks in one place
 */
export function useDevice() {
  const isMobile = useIsMobile();
  const { isNative, isIOS, isAndroid, isWeb, platform } = useNativePlatform();
  
  const deviceInfo = useMemo(() => {
    // Detect tablet (between mobile and desktop)
    const isTablet = !isMobile && typeof window !== 'undefined' && window.innerWidth < 1024;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    
    // Touch device detection
    const isTouchDevice = typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Performance tier estimation
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    let performanceTier: 'low' | 'medium' | 'high' = 'medium';
    if (memory >= 8 && cores >= 8) {
      performanceTier = 'high';
    } else if (memory < 4 || cores < 4) {
      performanceTier = 'low';
    }
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      isNative,
      isIOS,
      isAndroid,
      isWeb,
      isTouchDevice,
      platform,
      performanceTier,
      // Feature flags based on device
      shouldEnableHeavyAnimations: performanceTier === 'high',
      shouldEnableParticles: performanceTier !== 'low',
      shouldEnable3D: performanceTier === 'high' && !isMobile,
      maxSimultaneousAnimations: performanceTier === 'high' ? 10 : performanceTier === 'medium' ? 5 : 2,
    };
  }, [isMobile, isNative, isIOS, isAndroid, isWeb, platform]);
  
  return deviceInfo;
}
