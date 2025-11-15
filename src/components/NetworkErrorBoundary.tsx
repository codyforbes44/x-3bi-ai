import { Component, ReactNode } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
}

interface State {
  isOnline: boolean;
  showOfflineBanner: boolean;
}

/**
 * Network Error Boundary
 * Detects offline state and shows appropriate UI
 */
class NetworkErrorBoundary extends Component<Props, State> {
  public state: State = {
    isOnline: navigator.onLine,
    showOfflineBanner: false,
  };

  private handleOnline = () => {
    this.setState({ isOnline: true, showOfflineBanner: false });
  };

  private handleOffline = () => {
    this.setState({ isOnline: false, showOfflineBanner: true });
  };

  public componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      this.setState({ isOnline: false, showOfflineBanner: true });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  private handleRetry = () => {
    window.location.reload();
  };

  private handleDismiss = () => {
    this.setState({ showOfflineBanner: false });
  };

  public render() {
    const { isOnline, showOfflineBanner } = this.state;

    return (
      <>
        {/* Offline Banner */}
        {showOfflineBanner && !isOnline && (
          <div className="fixed top-0 left-0 right-0 z-50 animate-slide-in-down">
            <Alert variant="destructive" className="rounded-none border-x-0 border-t-0">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>You're offline</AlertTitle>
              <AlertDescription className="flex items-center justify-between gap-4">
                <span>
                  Check your internet connection. Some features may be unavailable.
                </span>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={this.handleRetry}
                    variant="outline"
                    size="sm"
                    className="h-7 bg-background hover:bg-background/80"
                  >
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Retry
                  </Button>
                  <Button
                    onClick={this.handleDismiss}
                    variant="ghost"
                    size="sm"
                    className="h-7"
                  >
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* App content with offline indicator */}
        <div className={showOfflineBanner && !isOnline ? 'mt-20' : ''}>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default NetworkErrorBoundary;
