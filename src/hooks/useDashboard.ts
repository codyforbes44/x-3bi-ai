import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAISidebarContext } from "@/contexts/AISidebarContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

/**
 * Custom hook for dashboard state and logic
 * Handles active tab, tour state, keyboard shortcuts, and feature switching
 */
export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [runTour, setRunTour] = useState(false);
  const isMobile = useIsMobile();
  const { hasCompletedTour } = useOnboarding();
  const { setCurrentFeature } = useAISidebarContext();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Update AI sidebar context when tab changes
  useEffect(() => {
    setCurrentFeature(activeTab);
  }, [activeTab, setCurrentFeature]);
  
  // Start tour for first-time users
  useEffect(() => {
    if (!hasCompletedTour && !isMobile) {
      const timer = setTimeout(() => setRunTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedTour, isMobile]);
  
  // Listen for feature switch events from keyboard shortcuts
  useEffect(() => {
    const handleSwitchFeature = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveTab(customEvent.detail);
    };
    
    window.addEventListener("switchFeature", handleSwitchFeature);
    return () => window.removeEventListener("switchFeature", handleSwitchFeature);
  }, []);

  return {
    activeTab,
    setActiveTab,
    runTour,
    setRunTour,
    isMobile
  };
};
