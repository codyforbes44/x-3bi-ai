import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import ErrorBoundary from './components/ErrorBoundary';
import { SentryErrorBoundary } from './utils/sentry';
import { PWAUpdateNotifier } from './components/pwa/PWAUpdateNotifier';
import { addResourceHints, monitorWebVitals } from './utils/performance';

// Add resource hints for critical domains
addResourceHints([
  'https://jmazzsxnatfewblgpxfq.supabase.co',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
]);

// Monitor Web Vitals in production
if (import.meta.env.PROD) {
  monitorWebVitals((metric) => {
    console.log(`[Performance] ${metric.name}:`, metric.value);
    // Could send to analytics service
  });
}

createRoot(document.getElementById("root")!).render(
  <SentryErrorBoundary fallback={<div>Error occurred</div>}>
    <ErrorBoundary>
      <PWAUpdateNotifier />
      <App />
    </ErrorBoundary>
  </SentryErrorBoundary>
);
