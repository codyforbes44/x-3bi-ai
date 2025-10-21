import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from 'react-router-dom';

// Initialize Sentry (in production only)
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    // Filter out sensitive data
    beforeSend(event, hint) {
      // Don't send events in development
      if (import.meta.env.DEV) return null;
      
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
      
      return event;
    },
    
    // Ignore certain errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'ChunkLoadError',
    ],
  });
}

// Custom error boundary component
export const SentryErrorBoundary = Sentry.ErrorBoundary;

// Track custom events
export function trackEvent(event: string, data?: Record<string, any>) {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(event, {
      level: 'info',
      extra: data,
    });
  }
}

// Track performance
export function trackPerformance(name: string, duration: number) {
  if (import.meta.env.PROD) {
    Sentry.metrics.distribution(name, duration, {
      unit: 'millisecond',
    });
  }
}

// Set user context
export function setUserContext(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

// Clear user context on logout
export function clearUserContext() {
  Sentry.setUser(null);
}

// Capture exception manually
export function captureException(error: Error, context?: Record<string, any>) {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error:', error, 'Context:', context);
  }
}
