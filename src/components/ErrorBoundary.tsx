import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    this.setState({
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="text-center max-w-2xl w-full">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-6">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              We're sorry for the inconvenience. An unexpected error occurred.
            </p>

            {(isDevelopment || this.props.showDetails) && this.state.error && (
              <div className="mb-8 text-left">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground mb-3 flex items-center gap-2">
                    <span className="group-open:rotate-90 transition-transform">▶</span>
                    Technical Details
                  </summary>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-xs font-semibold text-foreground mb-2">
                        Error Message:
                      </p>
                      <p className="text-sm text-destructive font-mono">
                        {this.state.error.message}
                      </p>
                    </div>

                    {this.state.error.stack && (
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-xs font-semibold text-foreground mb-2">
                          Stack Trace:
                        </p>
                        <pre className="text-xs font-mono overflow-auto max-h-64 text-muted-foreground">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}

                    {this.state.errorInfo?.componentStack && (
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-xs font-semibold text-foreground mb-2">
                          Component Stack:
                        </p>
                        <pre className="text-xs font-mono overflow-auto max-h-64 text-muted-foreground">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReset} variant="default" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={this.handleReload} variant="outline" size="lg">
                Reload Page
              </Button>
              <Button onClick={this.handleGoHome} variant="ghost" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              If this problem persists, please{' '}
              <a href="/contact" className="text-primary hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
