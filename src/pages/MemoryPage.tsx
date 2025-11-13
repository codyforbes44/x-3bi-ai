import { SEO } from "@/components/SEO";
import MultiModalMemory from "@/components/MultiModalMemory";
import { AuthenticatedPageLayout } from "@/components/layout/AuthenticatedPageLayout";

export default function MemoryPage() {
  return (
    <>
      <SEO
        title="Multi-Modal Memory - AI Context"
        description="Advanced multi-modal memory system. Store, search, and analyze conversations, images, and documents."
        keywords={['AI memory', 'multi-modal', 'context storage', 'AI search']}
        ogImage="https://3bi.ai/og/memory.png"
        canonical="https://3bi.ai/memory"
      />
      <AuthenticatedPageLayout maxWidth="full" padding="compact" showBreadcrumbs={false}>
        <MultiModalMemory />
      </AuthenticatedPageLayout>
    </>
  );
}
