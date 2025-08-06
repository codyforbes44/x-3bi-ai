import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Enterprise from "./pages/Enterprise";
import Learn from "./pages/Learn";
import Launched from "./pages/Launched";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/launched" element={<Launched />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
