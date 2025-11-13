import { useEffect } from "react";

/**
 * Enhanced Accessibility Provider
 * Handles focus management, keyboard navigation, and ARIA live regions
 */
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add focus-visible behavior
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
      }
    };

    const handleMouseDownOnce = () => {
      document.body.classList.remove("user-is-tabbing");
    };

    window.addEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);

    // Add global ARIA live region for screen reader announcements
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "global-sr-announcer";
    document.body.appendChild(liveRegion);

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDownOnce);
      liveRegion.remove();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string) {
  const liveRegion = document.getElementById("global-sr-announcer");
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = "";
    }, 1000);
  }
}
