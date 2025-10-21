import { SEO } from "@/components/SEO";
import { ZapierIntegration } from "@/components/integrations/ZapierIntegration";
import { SlackIntegration } from "@/components/integrations/SlackIntegration";

export default function IntegrationsHub() {
  return (
    <>
      <SEO
        title="Integrations Hub"
        description="Connect with Zapier, Slack, and other popular services"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your favorite tools and automate your workflow
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <ZapierIntegration />
          <SlackIntegration />
        </div>
      </div>
    </>
  );
}
