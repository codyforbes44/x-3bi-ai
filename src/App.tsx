import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "./pages/HomePage";

// Lazy load all other pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Community = lazy(() => import("./pages/Community"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Enterprise = lazy(() => import("./pages/Enterprise"));
const Learn = lazy(() => import("./pages/Learn"));
const Launched = lazy(() => import("./pages/Launched"));

const Mission = lazy(() => import("./pages/Mission"));
const Team = lazy(() => import("./pages/Team"));
const Impact = lazy(() => import("./pages/Impact"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Donate = lazy(() => import("./pages/Donate"));
const FreeAITools = lazy(() => import("./pages/FreeAITools"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const AIChatTutorial = lazy(() => import("./pages/tutorials/AIChatTutorial"));
const CodeGenerationTutorial = lazy(() => import("./pages/tutorials/CodeGenerationTutorial"));
const ImageGenerationTutorial = lazy(() => import("./pages/tutorials/ImageGenerationTutorial"));
const VoiceAITutorial = lazy(() => import("./pages/tutorials/VoiceAITutorial"));
const SystemArchitectureTutorial = lazy(() => import("./pages/tutorials/SystemArchitectureTutorial"));
const Documentation = lazy(() => import("./pages/Documentation"));
const APIAccess = lazy(() => import("./pages/APIAccess"));
const Workspaces = lazy(() => import("./pages/Workspaces"));
const Integrations = lazy(() => import("./pages/Integrations"));
const APIDemos = lazy(() => import("./pages/APIDemos"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/launched" element={<Launched />} />
                
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
                
                {/* Public routes - no authentication required */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/api-access" element={<APIAccess />} />
                
                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          </TooltipProvider>
        </WorkflowProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
