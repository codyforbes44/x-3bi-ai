import { SEO } from "@/components/SEO";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

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
      <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          Return to Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
