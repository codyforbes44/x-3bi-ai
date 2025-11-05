import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Header />
      <main className="flex-1 pt-14 md:pt-16 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
