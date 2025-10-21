import { useEffect } from "react";

/**
 * Accessibility improvements provider
 * Handles focus management, keyboard navigation, and ARIA live regions
 */
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add focus-visible polyfill behavior
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

    // Add skip to main content link
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-to-main";
    skipLink.textContent = "Skip to main content";
    skipLink.setAttribute("aria-label", "Skip to main content");
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA live region for dynamic updates
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "aria-live-region";
    document.body.appendChild(liveRegion);

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDownOnce);
      skipLink.remove();
      liveRegion.remove();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string) {
  const liveRegion = document.getElementById("aria-live-region");
  if (liveRegion) {
    liveRegion.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = "";
    }, 1000);
  }
}
