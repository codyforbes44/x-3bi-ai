import { Card } from "@/components/ui/card";
import { BookOpen, Code2, Zap, Database, Settings, Shield, LucideIcon } from "lucide-react";

interface Section {
  icon: LucideIcon;
  title: string;
  description: string;
  topics: string[];
}

const sections: Section[] = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Quick start guides and basic concepts",
    topics: ["Platform Overview", "Account Setup", "First Steps", "Basic Concepts"]
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Complete API documentation and endpoints",
    topics: ["Authentication", "Endpoints", "Rate Limits", "Error Handling"]
  },
  {
    icon: Zap,
    title: "AI Models",
    description: "Documentation for each AI model",
    topics: ["Claude Sonnet 4", "Claude Opus 4", "GPT-Image-1", "ElevenLabs"]
  },
  {
    icon: Database,
    title: "Integration Guides",
    description: "Integrate 3BI.AI with your applications",
    topics: ["JavaScript SDK", "Python SDK", "REST API", "Webhooks"]
  },
  {
    icon: Settings,
    title: "Advanced Features",
    description: "Power user features and customization",
    topics: ["Workflow Automation", "Custom Models", "Batch Processing", "Analytics"]
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Data protection and compliance",
    topics: ["Data Encryption", "Privacy Policy", "GDPR Compliance", "Security Best Practices"]
  }
];

export function DocumentationSections() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <Card key={index} className="p-6 hover-scale cursor-pointer">
            <section.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{section.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
            <ul className="space-y-2">
              {section.topics.map((topic, i) => (
                <li key={i} className="text-sm flex items-center">
                  <span className="text-primary mr-2">→</span>
                  <span className="text-muted-foreground hover:text-foreground transition-smooth cursor-pointer">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
