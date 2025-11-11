import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import GrokStandalone from '@/pages/GrokStandalone';
import SharedGrokChat from '@/pages/SharedGrokChat';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function GrokApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="grok-theme">
        <TooltipProvider>
          <AuthProvider>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-muted-foreground">Loading Grok Chat...</div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<GrokStandalone />} />
                <Route path="/shared/:shareToken" element={<SharedGrokChat />} />
                <Route path="*" element={<Navigate to="/grok/" replace />} />
              </Routes>
            </Suspense>
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
