import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
import { Smartphone } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function InstallPage() {
  return (
    <>
      <SEO
        title="Install App"
        description="Install 3BI.AI on your device for offline access and faster performance"
        keywords={['install', 'PWA', 'app', 'offline', 'mobile']}
      />
      <PageLayout>
        <PageHero
          title="Install 3BI.AI"
          description="Get the full app experience with offline access, faster loading, and home screen shortcuts"
          badge={{
            icon: Smartphone,
            text: 'Progressive Web App',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <PWAInstallPrompt />
        </div>
      </PageLayout>
    </>
  );
}
