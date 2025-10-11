import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiModalMemory from "@/components/MultiModalMemory";

export default function MemoryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <MultiModalMemory />
      </main>
      <Footer />
    </div>
  );
}
