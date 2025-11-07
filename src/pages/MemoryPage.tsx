import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiModalMemory from "@/components/MultiModalMemory";

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
      <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <MultiModalMemory />
      </main>
      <Footer />
    </div>
    </>
  );
}
