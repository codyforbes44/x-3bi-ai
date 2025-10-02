import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import FloatingBadge from "@/components/FloatingBadge";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Enterprise from "./pages/Enterprise";
import Learn from "./pages/Learn";
import Launched from "./pages/Launched";
import Issues from "./pages/Issues";
import Mission from "./pages/Mission";
import Team from "./pages/Team";
import Impact from "./pages/Impact";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import FreeAITools from "./pages/FreeAITools";
import Tutorials from "./pages/Tutorials";
import Documentation from "./pages/Documentation";
import APIAccess from "./pages/APIAccess";
import Workspaces from "./pages/Workspaces";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <FloatingBadge />
          <BrowserRouter>
            <ScrollToTop />
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
              <Route path="/issues" element={<Issues />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/team" element={<Team />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/free-ai-tools" element={<FreeAITools />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/api-access" element={<APIAccess />} />
              <Route path="/workspaces" element={<Workspaces />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
