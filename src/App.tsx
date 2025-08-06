import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
