import { SEO } from "@/components/SEO";
import { MinimalPageLayout } from "@/components/layout/MinimalPageLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found - 3BI.AI"
        description="The page you're looking for doesn't exist. Return to our AI dashboard or explore our features."
        keywords={['404', 'not found', 'error page']}
        ogImage="https://3bi.ai/og/default.png"
        canonical="https://3bi.ai/404"
        robots="noindex, nofollow"
      />
      <MinimalPageLayout maxWidth="md" centerVertically>
        <div className="text-center space-y-6">
          {/* Large 404 illustration */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary/10 select-none" aria-hidden="true">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-24 w-24 text-muted-foreground/40" />
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>

          {/* Helpful links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">You might be interested in:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="link" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="link" onClick={() => navigate('/grok')}>Grok Chat</Button>
              <Button variant="link" onClick={() => navigate('/documentation')}>Documentation</Button>
              <Button variant="link" onClick={() => navigate('/contact')}>Contact Us</Button>
            </div>
          </div>
        </div>
      </MinimalPageLayout>
    </>
  );
};

export default NotFound;
