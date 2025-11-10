import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { IntegrationMarketplace } from '@/components/IntegrationMarketplace';
import { Store } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function MarketplacePage() {
  return (
    <>
      <SEO
        title="Integration Marketplace"
        description="Extend your platform with powerful integrations - Connect to Google Drive, Slack, GitHub, Stripe, and more"
        keywords={['integrations', 'marketplace', 'plugins', 'apps', 'extensions']}
        ogImage="https://3bi.ai/og/integrations.png"
        canonical="https://3bi.ai/marketplace"
      />
      <PageLayout>
        <PageHero
          title="Integration Marketplace"
          description="Extend your platform with powerful integrations"
          badge={{
            icon: Store,
            text: 'Marketplace',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <IntegrationMarketplace />
        </div>
      </PageLayout>
    </>
  );
}
