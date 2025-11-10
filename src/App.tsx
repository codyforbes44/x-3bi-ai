import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollToTop from "@/components/ScrollToTop";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoutePreloader } from "@/components/RoutePreloader";
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
const OGPreviewTester = lazy(() => import("./pages/OGPreviewTester"));
const Impact = lazy(() => import("./pages/Impact"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
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
const APIDemos = lazy(() => import("./pages/APIDemos"));
const APIKeys = lazy(() => import("./pages/APIKeys"));
const GrokChatPage = lazy(() => import("./pages/GrokChatPage"));
const SharedGrokChat = lazy(() => import("./pages/SharedGrokChat"));
const AIAssistantSettings = lazy(() => import("./pages/AIAssistantSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MemoryPage = lazy(() => import("./pages/MemoryPage"));
const UsageAnalyticsPage = lazy(() => import("./pages/UsageAnalyticsPage"));
const InstallPage = lazy(() => import("./pages/InstallPage"));
const SecuritySettings = lazy(() => import("./pages/SecuritySettings"));
const ReferralProgram = lazy(() => import("./pages/ReferralProgram"));
const IntegrationsHub = lazy(() => import("./pages/IntegrationsHub"));
const PredictiveAI = lazy(() => import("./pages/PredictiveAI"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const AIModelsPage = lazy(() => import("./pages/AIModelsPage"));

// Phase 7: Platform Domination
const RealTimeAnalyticsPage = lazy(() => import("./pages/RealTimeAnalyticsPage"));
const PermissionsPage = lazy(() => import("./pages/PermissionsPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const SecurityDashboardPage = lazy(() => import("./pages/SecurityDashboardPage"));
const WebhooksPage = lazy(() => import("./pages/WebhooksPage"));
const WhiteLabelPage = lazy(() => import("./pages/WhiteLabelPage"));

// Phase 8: Monitoring & Observability
const MonitoringDashboard = lazy(() => import("./pages/MonitoringDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <LoadingProvider>
            <OnboardingProvider>
              <RealtimeProvider>
                <WorkspaceProvider>
                  <WorkflowProvider>
                    <TooltipProvider>
                      <AccessibilityProvider>
                        <Toaster />
                        <Sonner />
                        <FloatingBadge />
                        <BrowserRouter>
                          <CommandPalette />
                          <ScrollToTop />
                          <RoutePreloader />
                          <div className="pb-16 md:pb-0">
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
                            <Route path="/free-ai-tools" element={<FreeAITools />} />
                            <Route path="/features" element={<FeaturesPage />} />
                            <Route path="/ai-models" element={<AIModelsPage />} />
                            
                            {/* Company pages */}
                            <Route path="/mission" element={<Mission />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/og-preview-tester" element={<OGPreviewTester />} />
                            <Route path="/impact" element={<Impact />} />
                            <Route path="/partners" element={<Partners />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/newsletter" element={<Newsletter />} />
                            
                            {/* Resources */}
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/api-demos" element={<APIDemos />} />
                            
                            {/* Tutorial routes */}
                            <Route path="/tutorials" element={<Tutorials />} />
                            <Route path="/tutorials/ai-chat" element={<AIChatTutorial />} />
                            <Route path="/tutorials/code-generation" element={<CodeGenerationTutorial />} />
                            <Route path="/tutorials/image-generation" element={<ImageGenerationTutorial />} />
                            <Route path="/tutorials/voice-ai" element={<VoiceAITutorial />} />
                            <Route path="/tutorials/system-architecture" element={<SystemArchitectureTutorial />} />
                            
                            {/* Dashboard route */}
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            
                            {/* Other authenticated pages */}
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="/workspaces" element={<ProtectedRoute><Workspaces /></ProtectedRoute>} />
                            <Route path="/integrations-hub" element={<ProtectedRoute><IntegrationsHub /></ProtectedRoute>} />
                            <Route path="/api-access" element={<ProtectedRoute><APIAccess /></ProtectedRoute>} />
                            <Route path="/api-keys" element={<ProtectedRoute><APIKeys /></ProtectedRoute>} />
                            <Route path="/grok-chat" element={<GrokChatPage />} />
                            <Route path="/dashboard/grok-chat" element={<Navigate to="/grok-chat" replace />} />
                            <Route path="/grok-chat/shared/:shareToken" element={<SharedGrokChat />} />
                            <Route path="/memory" element={<ProtectedRoute><MemoryPage /></ProtectedRoute>} />
                            <Route path="/analytics" element={<ProtectedRoute><UsageAnalyticsPage /></ProtectedRoute>} />
                            <Route path="/security" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />
                            <Route path="/ai-assistant-settings" element={<ProtectedRoute><AIAssistantSettings /></ProtectedRoute>} />
                            <Route path="/referrals" element={<ProtectedRoute><ReferralProgram /></ProtectedRoute>} />
                            <Route path="/install" element={<InstallPage />} />
                            <Route path="/predictive-ai" element={<ProtectedRoute><PredictiveAI /></ProtectedRoute>} />
                            
                            {/* Phase 7: Platform Domination */}
                            <Route path="/analytics/realtime" element={<ProtectedRoute><RealTimeAnalyticsPage /></ProtectedRoute>} />
                            <Route path="/enterprise/permissions" element={<ProtectedRoute><PermissionsPage /></ProtectedRoute>} />
                            <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
                            <Route path="/security-dashboard" element={<ProtectedRoute><SecurityDashboardPage /></ProtectedRoute>} />
                            <Route path="/webhooks" element={<ProtectedRoute><WebhooksPage /></ProtectedRoute>} />
                            <Route path="/enterprise/white-label" element={<ProtectedRoute><WhiteLabelPage /></ProtectedRoute>} />
                            
                            {/* Phase 8: Monitoring & Observability */}
                            <Route path="/monitoring" element={<ProtectedRoute><MonitoringDashboard /></ProtectedRoute>} />
                            
                            {/* 404 catch-all */}
                            <Route path="*" element={<NotFound />} />
                              </Routes>
                            </Suspense>
                          </div>
                          <MobileBottomNav />
                        </BrowserRouter>
                      </AccessibilityProvider>
                    </TooltipProvider>
                  </WorkflowProvider>
                </WorkspaceProvider>
              </RealtimeProvider>
            </OnboardingProvider>
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
