import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  enabled?: boolean;
  children: ReactNode;
  onEscape?: () => void;
  restoreFocusOnUnmount?: boolean;
}

/**
 * Focus trap for modals and dialogs
 * Keeps focus within the component when enabled
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  enabled: boolean = true,
  onEscape?: () => void
) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    
    // Store currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const container = containerRef.current;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement?.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        // Handle Escape key
        if (e.key === 'Escape' && onEscape) {
          onEscape();
        }
        return;
      }
      
      if (focusableElements.length === 0) return;
      
      if (e.shiftKey) {
        // Shift + Tab - going backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab - going forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to previously focused element
      if (previousActiveElement.current && document.contains(previousActiveElement.current)) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, containerRef, onEscape]);
}

/**
 * Focus Trap Component wrapper
 */
export function FocusTrap({
  enabled = true,
  children,
  onEscape
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useFocusTrap(containerRef, enabled, onEscape);
  
  return (
    <div ref={containerRef} className="focus-trap-container">
      {children}
    </div>
  );
}
