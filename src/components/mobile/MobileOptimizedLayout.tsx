import { ReactNode } from 'react';
import { useNativePlatform } from '@/hooks/useNativePlatform';
import { cn } from '@/lib/utils';

interface MobileOptimizedLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MobileOptimizedLayout({ children, className }: MobileOptimizedLayoutProps) {
  const { isIOS, isAndroid } = useNativePlatform();
  
  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        // iOS safe area insets for notch/home indicator
        isIOS && 'pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]',
        // Android navigation bar spacing
        isAndroid && 'pb-4',
        className
      )}
    >
      {children}
    </div>
  );
}
