import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { WebhookManager } from '@/components/WebhookManager';
import { Webhook } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { RequireRole } from '@/components/auth/RequireRole';

export default function WebhooksPage() {
  return (
    <RequireRole role="admin">
      <SEO
        title="Webhook Management"
        description="Configure webhooks for real-time event notifications and integrations"
        keywords={['webhooks', 'event notifications', 'real-time events', 'automation']}
        ogImage="https://3bi.ai/og/api-access.png"
        canonical="https://3bi.ai/webhooks"
      />
      <PageLayout>
        <PageHero
          title="Webhook Management"
          description="Configure webhooks for real-time event notifications"
          badge={{
            icon: Webhook,
            text: 'Developer Tools',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <WebhookManager />
        </div>
      </PageLayout>
    </RequireRole>
  );
}
