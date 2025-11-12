import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Workflow, 
  Mic2, 
  Database, 
  BarChart3, 
  Users,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureShowcaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
  demoUrl: string;
  badge?: string;
  premium?: boolean;
}

function FeatureShowcaseCard({ 
  icon, 
  title, 
  description, 
  capabilities, 
  demoUrl, 
  badge,
  premium = true 
}: FeatureShowcaseProps) {
  return (
    <Card className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          {badge && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        <div className="space-y-2 mb-6">
          {capabilities.map((capability, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">{capability}</span>
            </div>
          ))}
        </div>

        <Link to={demoUrl}>
          <Button 
            variant="outline" 
            className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
          >
            {premium ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Try Premium Feature
              </>
            ) : (
              <>
                Explore Feature
              </>
            )}
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export function AdvancedFeaturesShowcase() {
  const features: FeatureShowcaseProps[] = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: 'Multi-Modal AI Chat',
      description: 'Engage with AI using text, images, and voice simultaneously. Upload documents, analyze images, and get intelligent responses.',
      capabilities: [
        'Text + Image + Voice input',
        'Document analysis & OCR',
        'Context-aware conversations',
        'Multiple AI models (GPT-5, Claude 4, Gemini 2.0)'
      ],
      demoUrl: '/ai-chat',
      badge: 'Most Popular'
    },
    {
      icon: <Workflow className="h-6 w-6 text-primary" />,
      title: 'Visual Workflow Builder',
      description: 'Create complex AI automation workflows with a drag-and-drop interface. No coding required for advanced automations.',
      capabilities: [
        'Drag-and-drop interface',
        'Multi-step AI workflows',
        'Conditional logic & branching',
        'API integrations (Zapier, Slack, etc.)'
      ],
      demoUrl: '/workflow-builder',
      badge: 'New'
    },
    {
      icon: <Mic2 className="h-6 w-6 text-primary" />,
      title: 'Real-Time Voice AI',
      description: 'Natural conversations with AI using OpenAI Realtime API. Low-latency voice interactions with interruption handling.',
      capabilities: [
        'Sub-second response time',
        'Natural conversation flow',
        'Multiple voice options',
        'Function calling support'
      ],
      demoUrl: '/enhanced-voice',
      badge: 'Ultra-Fast'
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: 'Multi-Modal Memory System',
      description: 'AI that remembers your conversations across text, images, and voice. Context-aware assistance that gets smarter over time.',
      capabilities: [
        'Cross-modal memory',
        'Semantic search',
        'Long-term context retention',
        'Personalized responses'
      ],
      demoUrl: '/memory',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: 'Advanced Analytics',
      description: 'Track AI usage, monitor costs, and optimize performance with comprehensive analytics dashboards.',
      capabilities: [
        'Real-time usage tracking',
        'Cost optimization insights',
        'Performance metrics',
        'Custom reports'
      ],
      demoUrl: '/analytics',
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Multi-Agent Collaboration',
      description: 'Deploy multiple AI agents that work together on complex tasks. Orchestrate specialized agents for optimal results.',
      capabilities: [
        'Agent orchestration',
        'Specialized AI roles',
        'Collaborative problem solving',
        'Custom agent templates'
      ],
      demoUrl: '/multi-agent',
      badge: 'Enterprise'
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Advanced Capabilities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Enterprise-Grade AI Features
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Go beyond basic AI with advanced features designed for professionals and enterprises. 
            Build sophisticated AI-powered applications with our premium toolkit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureShowcaseCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Ready to unlock advanced features?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start free, upgrade as you grow. No credit card required.
                </p>
              </div>
              <Link to="/auth">
                <Button size="lg" className="whitespace-nowrap">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
