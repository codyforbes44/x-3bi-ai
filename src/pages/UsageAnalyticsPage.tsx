import { PageHero } from '@/components/layout/PageHero';
import { AIUsageAnalytics } from '@/components/analytics/AIUsageAnalytics';
import { BarChart } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { AuthenticatedPageLayout } from '@/components/layout/AuthenticatedPageLayout';

export default function UsageAnalyticsPage() {
  return (
    <>
      <SEO
        title="AI Usage Analytics"
        description="Track your AI usage, costs, and optimize your spending across models"
        keywords={['AI analytics', 'usage tracking', 'cost optimization', 'AI metrics']}
        ogImage="https://3bi.ai/og/analytics.png"
        canonical="https://3bi.ai/usage-analytics"
      />
      <AuthenticatedPageLayout maxWidth="2xl" showBreadcrumbs={true}>
        <PageHero
          title="AI Usage Analytics"
          description="Track usage, optimize costs, and gain insights into your AI consumption"
          badge={{
            icon: BarChart,
            text: 'Analytics Dashboard',
          }}
          compact
        />
        <div className="mt-8">
          <AIUsageAnalytics />
        </div>
      </AuthenticatedPageLayout>
    </>
  );
}
