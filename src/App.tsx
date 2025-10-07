import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollToTop from "@/components/ScrollToTop";
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
import AIChatTutorial from "./pages/tutorials/AIChatTutorial";
import CodeGenerationTutorial from "./pages/tutorials/CodeGenerationTutorial";
import ImageGenerationTutorial from "./pages/tutorials/ImageGenerationTutorial";
import VoiceAITutorial from "./pages/tutorials/VoiceAITutorial";
import SystemArchitectureTutorial from "./pages/tutorials/SystemArchitectureTutorial";
import Documentation from "./pages/Documentation";
import APIAccess from "./pages/APIAccess";
import Workspaces from "./pages/Workspaces";
import Integrations from "./pages/Integrations";
import APIDemos from "./pages/APIDemos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <WorkflowProvider>
            <TooltipProvider>
          <Toaster />
          <Sonner />
          <FloatingBadge />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
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
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/api-demos" element={<APIDemos />} />
              
              {/* Tutorial routes */}
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorials/ai-chat" element={<AIChatTutorial />} />
              <Route path="/tutorials/code-generation" element={<CodeGenerationTutorial />} />
              <Route path="/tutorials/image-generation" element={<ImageGenerationTutorial />} />
              <Route path="/tutorials/voice-ai" element={<VoiceAITutorial />} />
              <Route path="/tutorials/system-architecture" element={<SystemArchitectureTutorial />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/workspaces" element={
                <ProtectedRoute>
                  <Workspaces />
                </ProtectedRoute>
              } />
              <Route path="/integrations" element={
                <ProtectedRoute>
                  <Integrations />
                </ProtectedRoute>
              } />
              <Route path="/api-access" element={
                <ProtectedRoute>
                  <APIAccess />
                </ProtectedRoute>
              } />
              
              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </WorkflowProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
