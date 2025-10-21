import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { SentryErrorBoundary } from './utils/sentry';
import { PWAUpdateNotifier } from './components/pwa/PWAUpdateNotifier';

createRoot(document.getElementById("root")!).render(
  <SentryErrorBoundary fallback={<div>Error occurred</div>}>
    <ErrorBoundary>
      <PWAUpdateNotifier />
      <App />
    </ErrorBoundary>
  </SentryErrorBoundary>
);
