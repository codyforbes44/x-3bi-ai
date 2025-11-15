/**
 * Screen Reader Announcer Utility
 * Provides programmatic announcements for assistive technologies
 */

type AnnouncementPoliteness = "polite" | "assertive";

/**
 * Creates or updates a live region for screen reader announcements
 */
function getOrCreateLiveRegion(politeness: AnnouncementPoliteness): HTMLElement {
  const id = `live-region-${politeness}`;
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("div");
    element.id = id;
    element.setAttribute("role", politeness === "assertive" ? "alert" : "status");
    element.setAttribute("aria-live", politeness);
    element.setAttribute("aria-atomic", "true");
    element.className = "sr-only"; // Visually hidden but accessible
    element.style.position = "absolute";
    element.style.left = "-10000px";
    element.style.width = "1px";
    element.style.height = "1px";
    element.style.overflow = "hidden";
    document.body.appendChild(element);
  }

  return element;
}

/**
 * Announces a message to screen readers
 * @param message - The message to announce
 * @param politeness - How urgently to announce (polite = wait for pause, assertive = interrupt)
 */
export function announce(
  message: string,
  politeness: AnnouncementPoliteness = "polite"
): void {
  if (!message.trim()) return;

  const liveRegion = getOrCreateLiveRegion(politeness);

  // Clear previous message first
  liveRegion.textContent = "";

  // Use setTimeout to ensure the clear is processed before the new message
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}

/**
 * Announces a success message
 */
export function announceSuccess(message: string): void {
  announce(`Success: ${message}`, "polite");
}

/**
 * Announces an error message
 */
export function announceError(message: string): void {
  announce(`Error: ${message}`, "assertive");
}

/**
 * Announces a warning message
 */
export function announceWarning(message: string): void {
  announce(`Warning: ${message}`, "assertive");
}

/**
 * Announces an info message
 */
export function announceInfo(message: string): void {
  announce(message, "polite");
}

/**
 * Announces a loading state
 */
export function announceLoading(message: string = "Loading"): void {
  announce(`${message}...`, "polite");
}

/**
 * Announces navigation changes
 */
export function announceNavigation(pageName: string): void {
  announce(`Navigated to ${pageName}`, "polite");
}

/**
 * Announces form validation errors
 */
export function announceFormErrors(errorCount: number): void {
  if (errorCount === 0) return;
  
  const message =
    errorCount === 1
      ? "1 error found in form"
      : `${errorCount} errors found in form`;
  
  announce(message, "assertive");
}

/**
 * Cleanup function to remove live regions (call on app unmount)
 */
export function cleanupAnnouncer(): void {
  ["polite", "assertive"].forEach((politeness) => {
    const element = document.getElementById(`live-region-${politeness}`);
    if (element) {
      element.remove();
    }
  });
}
