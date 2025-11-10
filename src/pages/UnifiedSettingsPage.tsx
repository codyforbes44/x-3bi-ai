import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UnifiedAISettings } from '@/components/settings/UnifiedAISettings';

export default function UnifiedSettingsPage() {
  return (
    <>
      <SEO
        title="AI Settings"
        description="Configure your AI assistant settings including model selection, appearance, behavior, and voice preferences"
        keywords={['AI settings', 'AI configuration', 'model selection', 'voice settings']}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <UnifiedAISettings />
        </main>
        <Footer />
      </div>
    </>
  );
}
