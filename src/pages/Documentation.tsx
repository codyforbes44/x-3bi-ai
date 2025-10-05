import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Code2, Zap, Database, Settings, 
  FileCode, Terminal, Shield 
} from "lucide-react";

const Documentation = () => {
  const sections = [
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

  const quickLinks = [
    { title: "Authentication Guide", category: "API" },
    { title: "Chat API Reference", category: "API" },
    { title: "Image Generation", category: "Guides" },
    { title: "Voice Synthesis", category: "Guides" },
    { title: "Error Codes", category: "Reference" },
    { title: "SDK Installation", category: "Integration" }
  ];

  const codeExample = `// Initialize 3BI.AI
import { ThreeBIAI } from '@3bi/sdk';

const ai = new ThreeBIAI({
  apiKey: 'your-api-key'
});

// Generate a chat response
const response = await ai.chat({
  model: 'claude-sonnet-4',
  message: 'Explain quantum computing',
  maxTokens: 500
});

console.log(response.text);`;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to integrate and build with 3BI.AI. From quick starts to advanced implementations.
          </p>
        </section>

        {/* Quick Links */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => (
                <Card key={index} className="p-4 text-center hover-scale cursor-pointer">
                  <Badge variant="secondary" className="mb-2 text-xs">{link.category}</Badge>
                  <p className="text-sm font-medium">{link.title}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Documentation Sections */}
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

        {/* Code Example Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Example</h2>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="javascript">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      <span className="font-semibold">JavaScript SDK</span>
                    </div>
                    <Badge variant="secondary">npm install @3bi/sdk</Badge>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{codeExample}</code>
                  </pre>
                </Card>
              </TabsContent>
              
              <TabsContent value="python">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Python SDK</span>
                    </div>
                    <Badge variant="secondary">pip install 3bi-ai</Badge>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{`# Initialize 3BI.AI
from threebiai import ThreeBIAI

ai = ThreeBIAI(api_key='your-api-key')

# Generate a chat response
response = ai.chat(
    model='claude-sonnet-4',
    message='Explain quantum computing',
    max_tokens=500
)

print(response.text)`}</code>
                  </pre>
                </Card>
              </TabsContent>
              
              <TabsContent value="curl">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="font-semibold">REST API</span>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{`curl -X POST https://api.3bi.ai/v1/chat \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4",
    "message": "Explain quantum computing",
    "max_tokens": 500
  }'`}</code>
                  </pre>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Resources */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover-scale cursor-pointer">
                <FileCode className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Code Examples</h3>
                <p className="text-muted-foreground mb-4">
                  Browse our collection of working code examples and implementations.
                </p>
                <a href="#" className="text-primary font-medium hover:underline">
                  View Examples →
                </a>
              </Card>
              
              <Card className="p-6 hover-scale cursor-pointer">
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Tutorials</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step guides for common use cases and integrations.
                </p>
                <a href="/tutorials" className="text-primary font-medium hover:underline">
                  Start Learning →
                </a>
              </Card>
              
              <Card className="p-6 hover-scale cursor-pointer">
                <Settings className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">API Reference</h3>
                <p className="text-muted-foreground mb-4">
                  Complete API documentation with all endpoints and parameters.
                </p>
                <a href="/api-access" className="text-primary font-medium hover:underline">
                  API Docs →
                </a>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
              >
                Contact Support
              </a>
              <a 
                href="/community"
                className="inline-block px-8 py-4 border border-border rounded-lg font-semibold hover-scale"
              >
                Join Community
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Documentation;
