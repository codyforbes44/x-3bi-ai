import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/useDevice";

interface MobileAppShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Mobile-optimized app shell with safe area support
 * Handles iOS notch, Android navigation bar, and native platform specifics
 */
export function MobileAppShell({ 
  children, 
  header, 
  footer,
  className 
}: MobileAppShellProps) {
  const { isIOS, isAndroid, isNative, isMobile } = useDevice();
  
  if (!isMobile && !isNative) {
    // Desktop view - just render children
    return <>{children}</>;
  }
  
  return (
    <div 
      className={cn(
        "mobile-app-shell min-h-screen flex flex-col",
        isIOS && "ios-safe-area",
        isAndroid && "android-nav-bar",
        isNative && "native-app",
        className
      )}
    >
      {/* Header with safe area top padding */}
      {header && (
        <header className="mobile-header flex-shrink-0 safe-top">
          {header}
        </header>
      )}
      
      {/* Main content area */}
      <main 
        id="main-content" 
        className="mobile-content flex-1 overflow-y-auto pb-safe"
      >
        {children}
      </main>
      
      {/* Footer with safe area bottom padding */}
      {footer && (
        <footer className="mobile-footer flex-shrink-0 safe-bottom">
          {footer}
        </footer>
      )}
    </div>
  );
}
