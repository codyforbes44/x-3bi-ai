import { Card } from "@/components/ui/card";
import { Zap, Database, Filter, Map, BarChart3, Code, Globe, Clock, GitBranch, Brain, FileSearch, Bot, Sparkles, Network } from "lucide-react";

interface StepType {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'integration' | 'etl' | 'control' | 'ai' | 'ai_agent';
}

const stepTypes: StepType[] = [
  {
    id: 'zapier_webhook',
    name: 'Zapier Webhook',
    description: 'Trigger Zapier automation or receive webhook data',
    icon: Zap,
    category: 'integration',
  },
  {
    id: 'extract_data',
    name: 'Extract Data',
    description: 'Extract specific fields from complex data structures',
    icon: Database,
    category: 'etl',
  },
  {
    id: 'filter_data',
    name: 'Filter Data',
    description: 'Filter data based on conditions and rules',
    icon: Filter,
    category: 'etl',
  },
  {
    id: 'map_data',
    name: 'Map/Transform Data',
    description: 'Transform and map data fields with custom logic',
    icon: Map,
    category: 'etl',
  },
  {
    id: 'aggregate_data',
    name: 'Aggregate Data',
    description: 'Sum, count, average, or group data',
    icon: BarChart3,
    category: 'etl',
  },
  {
    id: 'http_request',
    name: 'HTTP Request',
    description: 'Make API calls to external services',
    icon: Globe,
    category: 'integration',
  },
  {
    id: 'ai_chat',
    name: 'AI Processing',
    description: 'Process data with AI models',
    icon: Code,
    category: 'ai',
  },
  {
    id: 'condition',
    name: 'Conditional Branch',
    description: 'Create if/else logic flows',
    icon: GitBranch,
    category: 'control',
  },
  {
    id: 'delay',
    name: 'Delay',
    description: 'Wait before executing next step',
    icon: Clock,
    category: 'control',
  },
  // AI Agent Steps
  {
    id: 'ai_decision',
    name: 'AI Decision',
    description: 'Let AI make intelligent decisions based on data and context',
    icon: Brain,
    category: 'ai_agent',
  },
  {
    id: 'ai_data_analysis',
    name: 'AI Data Analysis',
    description: 'Analyze data and extract insights using AI',
    icon: FileSearch,
    category: 'ai_agent',
  },
  {
    id: 'ai_content_generation',
    name: 'AI Content Generation',
    description: 'Generate content based on templates and data',
    icon: Sparkles,
    category: 'ai_agent',
  },
  {
    id: 'ai_api_orchestration',
    name: 'AI API Orchestration',
    description: 'Intelligently call multiple APIs and coordinate responses',
    icon: Network,
    category: 'ai_agent',
  },
  {
    id: 'ai_web_scraping',
    name: 'AI Web Scraping',
    description: 'Intelligently extract data from web pages',
    icon: Globe,
    category: 'ai_agent',
  },
];

interface StepTypeSelectorProps {
  onSelect: (stepType: StepType) => void;
}

export const StepTypeSelector = ({ onSelect }: StepTypeSelectorProps) => {
  const categories = {
    integration: 'Integration',
    etl: 'Data Transformation (ETL)',
    ai: 'AI Processing',
    ai_agent: 'AI Agents (Autonomous)',
    control: 'Flow Control',
  };

  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([key, label]) => (
        <div key={key}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stepTypes
              .filter((step) => step.category === key)
              .map((step) => {
                const Icon = step.icon;
                return (
                  <Card
                    key={step.id}
                    className="p-4 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => onSelect(step)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{step.name}</div>
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
