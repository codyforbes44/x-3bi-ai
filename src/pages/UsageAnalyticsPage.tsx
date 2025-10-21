import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { AIUsageAnalytics } from '@/components/analytics/AIUsageAnalytics';
import { BarChart } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function UsageAnalyticsPage() {
  return (
    <>
      <SEO
        title="AI Usage Analytics"
        description="Track your AI usage, costs, and optimize your spending across models"
        keywords={['AI analytics', 'usage tracking', 'cost optimization', 'AI metrics']}
      />
      <PageLayout>
        <PageHero
          title="AI Usage Analytics"
          description="Track usage, optimize costs, and gain insights into your AI consumption"
          badge={{
            icon: BarChart,
            text: 'Analytics Dashboard',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <AIUsageAnalytics />
        </div>
      </PageLayout>
    </>
  );
}
