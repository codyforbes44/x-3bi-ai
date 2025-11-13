import { SEO } from '@/components/SEO';
import { UnifiedAISettings } from '@/components/settings/UnifiedAISettings';
import { AuthenticatedPageLayout } from '@/components/layout/AuthenticatedPageLayout';
import { Suspense } from 'react';
import { PageSkeleton } from '@/components/ui/page-skeleton';

export default function UnifiedSettingsPage() {
  return (
    <>
      <SEO
        title="AI Settings"
        description="Configure your AI assistant settings including model selection, appearance, behavior, and voice preferences"
        keywords={['AI settings', 'AI configuration', 'model selection', 'voice settings']}
      />
      <AuthenticatedPageLayout maxWidth="2xl" showBreadcrumbs={false}>
        <Suspense fallback={<PageSkeleton variant="form" count={6} />}>
          <UnifiedAISettings />
        </Suspense>
      </AuthenticatedPageLayout>
    </>
  );
}
