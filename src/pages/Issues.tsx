import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IssueExamples } from "@/components/issues/IssueExamples";
import { IssueForm } from "@/components/issues/IssueForm";

const Issues = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">Get AI Guidance</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Facing challenges in life? Share your concerns and get AI-powered guidance to help you navigate through them.
            </p>
          </div>

          {/* Example Issues Section */}
          <IssueExamples />

          {/* Submission Form */}
          <IssueForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Issues;
