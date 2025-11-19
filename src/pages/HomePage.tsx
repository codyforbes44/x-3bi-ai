import { SEO } from "@/components/SEO";
import { PageLayout } from "@/components/layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { SEO_CONFIG, PAGE_SEO } from "@/config/seo-config";
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateSoftwareAppSchema,
  generateFAQSchema,
  combineSchemas 
} from "@/utils/structuredData";
import { getFAQs } from "@/components/home/sections/FAQSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { AmbientParticles } from "@/components/future/AmbientParticles";
import { VoiceVisualizer } from "@/components/future/VoiceVisualizer";
import { usePredictiveUI } from "@/hooks/usePredictiveUI";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { VoiceCommandList } from "@/components/voice/VoiceCommandList";
import { VoicePermissionDialog } from "@/components/voice/VoicePermissionDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const { predictions, trackAction } = usePredictiveUI();
  const { toast } = useToast();
  const [showCommandList, setShowCommandList] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  // Voice recognition with navigation and dashboard feature commands
  const voiceCommands = [
    // Basic navigation
    {
      phrases: ['go to dashboard', 'open dashboard', 'show dashboard'],
      action: () => {
        navigate('/dashboard');
        toast({ title: "Navigating to Dashboard" });
      },
      description: 'Navigate to dashboard'
    },
    {
      phrases: ['go to grok', 'open grok', 'start chat'],
      action: () => {
        navigate('/grok');
        toast({ title: "Opening Grok AI Chat" });
      },
      description: 'Open Grok AI chat'
    },
    {
      phrases: ['go to ai tools', 'open ai tools', 'show ai tools', 'free tools'],
      action: () => {
        navigate('/free-ai-tools');
        toast({ title: "Opening AI Tools" });
      },
      description: 'Navigate to AI tools'
    },
    {
      phrases: ['go to settings', 'open settings', 'show settings'],
      action: () => {
        navigate('/settings');
        toast({ title: "Opening Settings" });
      },
      description: 'Open settings'
    },
    {
      phrases: ['go home', 'go to home', 'home page'],
      action: () => {
        navigate('/');
        toast({ title: "Going Home" });
      },
      description: 'Return to homepage'
    },

    // Dashboard feature commands - Enterprise
    {
      phrases: ['show analytics', 'open analytics', 'analytics dashboard'],
      action: () => {
        navigate('/dashboard?tab=analytics');
        toast({ title: "Opening Analytics Dashboard" });
      },
      description: 'Open Analytics'
    },
    {
      phrases: ['show workspaces', 'open workspaces', 'my workspaces'],
      action: () => {
        navigate('/dashboard?tab=workspace');
        toast({ title: "Opening Workspaces" });
      },
      description: 'Manage Workspaces'
    },
    {
      phrases: ['show workflows', 'open workflows', 'automation', 'create workflow'],
      action: () => {
        navigate('/dashboard?tab=workflows');
        toast({ title: "Opening Workflow Automation" });
      },
      description: 'Open Workflows'
    },

    // Dashboard feature commands - Advanced AI
    {
      phrases: ['open claude', 'talk to claude', 'claude chat', 'claude 4'],
      action: () => {
        navigate('/dashboard?tab=claude');
        toast({ title: "Opening Claude 4 Chat" });
      },
      description: 'Chat with Claude 4'
    },
    {
      phrases: ['grok chat', 'talk to grok', 'use grok'],
      action: () => {
        navigate('/dashboard?tab=grok');
        toast({ title: "Opening Grok Chat" });
      },
      description: 'Chat with Grok'
    },
    {
      phrases: ['show vision', 'grok vision', 'image analysis', 'analyze image'],
      action: () => {
        navigate('/dashboard?tab=grok-vision');
        toast({ title: "Opening Grok Vision" });
      },
      description: 'Grok Vision Analysis'
    },
    {
      phrases: ['multi-model chat', 'compare models', 'multi chat'],
      action: () => {
        navigate('/dashboard?tab=multi-chat');
        toast({ title: "Opening Multi-Model Chat" });
      },
      description: 'Multi-Model Comparison'
    },
    {
      phrases: ['voice conversation', 'voice agent', 'talk to ai'],
      action: () => {
        navigate('/dashboard?tab=conversation');
        toast({ title: "Starting Voice Conversation" });
      },
      description: 'Voice Conversation'
    },
    {
      phrases: ['advanced ai', 'premium ai', 'advanced features'],
      action: () => {
        navigate('/dashboard?tab=advanced');
        toast({ title: "Opening Advanced AI" });
      },
      description: 'Advanced AI Features'
    },
    {
      phrases: ['local ai', 'privacy mode', 'offline ai'],
      action: () => {
        navigate('/dashboard?tab=local');
        toast({ title: "Opening Local AI" });
      },
      description: 'Local AI (Privacy Mode)'
    },
    {
      phrases: ['real-time voice', 'realtime voice', 'live voice'],
      action: () => {
        navigate('/dashboard?tab=realtime');
        toast({ title: "Opening Real-Time Voice" });
      },
      description: 'Real-Time Voice'
    },

    // Dashboard feature commands - AI Tools
    {
      phrases: ['generate image', 'create image', 'make image', 'dall-e'],
      action: () => {
        navigate('/dashboard?tab=image');
        toast({ title: "Opening Image Generation" });
      },
      description: 'Generate Images'
    },
    {
      phrases: ['text to speech', 'voice synthesis', 'premium voice', 'elevenlabs'],
      action: () => {
        navigate('/dashboard?tab=voice');
        toast({ title: "Opening Premium Voice" });
      },
      description: 'Premium Voice Synthesis'
    },
    {
      phrases: ['basic voice', 'simple voice', 'openai voice'],
      action: () => {
        navigate('/dashboard?tab=basic-voice');
        toast({ title: "Opening Basic Voice" });
      },
      description: 'Basic Voice Synthesis'
    },
    {
      phrases: ['ai chat', 'chat assistant', 'chatbot'],
      action: () => {
        navigate('/dashboard?tab=chat');
        toast({ title: "Opening AI Chat" });
      },
      description: 'AI Chat Assistant'
    },

    // Dashboard feature commands - Utilities
    {
      phrases: ['web scraper', 'scrape website', 'extract data'],
      action: () => {
        navigate('/dashboard?tab=scraper');
        toast({ title: "Opening Web Scraper" });
      },
      description: 'Web Scraper'
    },
    {
      phrases: ['code generator', 'generate code', 'code gen'],
      action: () => {
        navigate('/dashboard?tab=code-gen');
        toast({ title: "Opening Code Generator" });
      },
      description: 'Code Generator'
    },
    {
      phrases: ['code assistant', 'code help', 'programming'],
      action: () => {
        navigate('/dashboard?tab=code');
        toast({ title: "Opening Code Assistant" });
      },
      description: 'Code Assistant'
    },
    {
      phrases: ['deploy', 'deployment', 'deploy app'],
      action: () => {
        navigate('/dashboard?tab=deploy');
        toast({ title: "Opening Deployment" });
      },
      description: 'Deploy Application'
    },
    {
      phrases: ['insights', 'show insights', 'ai insights'],
      action: () => {
        navigate('/dashboard?tab=insights');
        toast({ title: "Opening AI Insights" });
      },
      description: 'AI Insights'
    },
  ];

  const {
    isListening,
    isSupported,
    transcript,
    error,
    isAwaitingCommand,
    startListening,
    stopListening,
  } = useVoiceRecognition({
    commands: voiceCommands,
    requireWakeWord: true,
    wakeWords: ['hey 3bi', 'hey three bi'],
  });

  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSoftwareAppSchema(),
    generateFAQSchema(getFAQs())
  );

  const handleNavigate = (path: string, actionName: string) => {
    trackAction(actionName);
    navigate(path);
  };

  const handleVoiceToggle = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice commands are not supported in this browser. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
      toast({ title: "Voice commands stopped" });
    } else {
      setShowPermissionDialog(true);
    }
  };

  const handlePermissionAccept = () => {
    setShowPermissionDialog(false);
    startListening();
    setShowCommandList(true);
    toast({ 
      title: "Voice commands active",
      description: 'Say "Hey 3BI" followed by a command'
    });
  };

  const handlePermissionDecline = () => {
    setShowPermissionDialog(false);
  };

  // Show error toasts
  if (error) {
    toast({
      title: "Voice Command Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        ogImage={SEO_CONFIG.ogImages.default}
        ogType="website"
        canonical={SEO_CONFIG.siteUrl}
        structuredData={structuredData}
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />
      <PageLayout className="p-0">
        {/* Ambient particles background */}
        <AmbientParticles count={30} />

        {/* Hero Section */}
        <HeroSection 
          onNavigate={handleNavigate}
          predictions={predictions}
        />

        {/* Voice Command Interface */}
        <VoiceVisualizer
          isListening={isListening}
          transcript={transcript}
          error={error}
          isAwaitingCommand={isAwaitingCommand}
          isSupported={isSupported}
          onToggle={handleVoiceToggle}
          onShowCommands={() => setShowCommandList(true)}
        />

        {/* Voice Command List */}
        <VoiceCommandList
          isOpen={showCommandList}
          onClose={() => setShowCommandList(false)}
          requireWakeWord={true}
        />

        {/* Permission Dialog */}
        <VoicePermissionDialog
          isOpen={showPermissionDialog}
          onAccept={handlePermissionAccept}
          onDecline={handlePermissionDecline}
        />
      </PageLayout>
    </>
  );
};

export default HomePage;
