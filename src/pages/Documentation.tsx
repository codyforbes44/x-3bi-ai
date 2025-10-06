import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { APIEndpointCard } from "@/components/docs/APIEndpointCard";
import { APITester } from "@/components/docs/APITester";
import { 
  BookOpen, Code2, Zap, Database, Settings, 
  FileCode, Terminal, Shield, Search, Webhook,
  Key, Lock, AlertCircle, CheckCircle2, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const apiEndpoints = [
    {
      method: "POST" as const,
      endpoint: "/functions/v1/ai-chat",
      title: "AI Chat API",
      description: "Generate conversational AI responses using Claude Sonnet 4 for natural dialogue and assistance",
      category: "Chat AI",
      parameters: [
        { name: "message", type: "string", required: true, description: "The user's message or question", example: "Explain quantum computing" },
        { name: "context", type: "string", required: false, description: "Optional conversation context", example: "Previous discussion about physics" },
        { name: "temperature", type: "number", required: false, description: "Response creativity (0-1)", example: "0.7" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Explain quantum computing in simple terms"}'`,
        javascript: `const response = await fetch('/functions/v1/ai-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Explain quantum computing in simple terms'
  })
});
const data = await response.json();`,
        python: `import requests

response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-chat',
    json={'message': 'Explain quantum computing in simple terms'}
)
data = response.json()`
      },
      responseExample: `{
  "message": "Quantum computing uses quantum mechanics principles...",
  "model": "claude-sonnet-4",
  "tokens_used": 145
}`,
      functionName: "ai-chat"
    },
    {
      method: "POST" as const,
      endpoint: "/functions/v1/ai-architect",
      title: "AI Architect API",
      description: "Get system architecture guidance and design patterns using Claude Opus 4",
      category: "Architecture",
      parameters: [
        { name: "prompt", type: "string", required: true, description: "Architecture question or requirements", example: "Design a scalable microservices system" },
        { name: "constraints", type: "array", required: false, description: "System constraints or requirements" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-architect \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Design a scalable e-commerce platform"}'`,
        javascript: `const response = await fetch('/functions/v1/ai-architect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Design a scalable e-commerce platform'
  })
});`,
        python: `response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-architect',
    json={'prompt': 'Design a scalable e-commerce platform'}
)`
      },
      responseExample: `{
  "response": "System Architecture Design:\\n1. Frontend Layer...\\n2. API Gateway...\\n3. Microservices...",
  "model": "claude-opus-4"
}`,
      functionName: "ai-architect"
    },
    {
      method: "POST" as const,
      endpoint: "/functions/v1/ai-image",
      title: "AI Image Generation API",
      description: "Create stunning images from text descriptions using GPT Image-1",
      category: "Image AI",
      parameters: [
        { name: "prompt", type: "string", required: true, description: "Image description", example: "A futuristic city at sunset" },
        { name: "style", type: "string", required: false, description: "Art style preference", example: "photorealistic" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-image \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "A futuristic city at sunset, cyberpunk style"}'`,
        javascript: `const response = await fetch('/functions/v1/ai-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A futuristic city at sunset, cyberpunk style'
  })
});`,
        python: `response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-image',
    json={'prompt': 'A futuristic city at sunset, cyberpunk style'}
)`
      },
      responseExample: `{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "model": "gpt-image-1",
  "size": "1024x1024"
}`,
      functionName: "ai-image"
    },
    {
      method: "POST" as const,
      endpoint: "/functions/v1/premium-voice",
      title: "Voice Synthesis API",
      description: "Convert text to natural-sounding speech using ElevenLabs",
      category: "Voice AI",
      parameters: [
        { name: "text", type: "string", required: true, description: "Text to convert to speech", example: "Hello, welcome to 3BI.AI" },
        { name: "voice", type: "string", required: false, description: "Voice ID", example: "Aria" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/premium-voice \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Hello, welcome to 3BI.AI platform"}'`,
        javascript: `const response = await fetch('/functions/v1/premium-voice', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hello, welcome to 3BI.AI platform'
  })
});`,
        python: `response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/premium-voice',
    json={'text': 'Hello, welcome to 3BI.AI platform'}
)`
      },
      responseExample: `{
  "audioContent": "base64_encoded_audio_data",
  "model": "elevenlabs",
  "voice": "Aria"
}`,
      functionName: "premium-voice"
    },
    {
      method: "POST" as const,
      endpoint: "/functions/v1/ai-code",
      title: "Code Assistant API",
      description: "Get AI-powered code generation, review, and debugging assistance",
      category: "Development",
      parameters: [
        { name: "message", type: "string", required: true, description: "Code-related question or request", example: "Write a React component for user login" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-code \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Write a React component for user login"}'`,
        javascript: `const response = await fetch('/functions/v1/ai-code', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Write a React component for user login'
  })
});`,
        python: `response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-code',
    json={'message': 'Write a React component for user login'}
)`
      },
      responseExample: `{
  "message": "Here's a React login component:\\n\\nconst LoginForm = () => {...}",
  "model": "claude-sonnet-4"
}`,
      functionName: "ai-code"
    },
    {
      method: "POST" as const,
      endpoint: "/functions/v1/ai-insights",
      title: "AI Insights API",
      description: "Analyze data and generate insights using AI",
      category: "Analytics",
      parameters: [
        { name: "message", type: "string", required: true, description: "Data or analysis request", example: "Analyze sales trends" }
      ],
      requestExample: {
        curl: `curl -X POST https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-insights \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Analyze quarterly sales trends"}'`,
        javascript: `const response = await fetch('/functions/v1/ai-insights', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Analyze quarterly sales trends'
  })
});`,
        python: `response = requests.post(
    'https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/ai-insights',
    json={'message': 'Analyze quarterly sales trends'}
)`
      },
      responseExample: `{
  "message": "Based on the data analysis:\\n1. Q1 shows 15% growth...\\n2. Customer retention improved...",
  "model": "claude-sonnet-4"
}`,
      functionName: "ai-insights"
    }
  ];

  const testEndpoints = apiEndpoints.map(ep => ({
    value: ep.functionName,
    label: ep.title,
    method: ep.method,
    functionName: ep.functionName
  }));

  const errorCodes = [
    { code: "400", message: "Bad Request", description: "Invalid request parameters or malformed JSON" },
    { code: "401", message: "Unauthorized", description: "Missing or invalid API key" },
    { code: "403", message: "Forbidden", description: "API key doesn't have access to this resource" },
    { code: "404", message: "Not Found", description: "Endpoint does not exist" },
    { code: "429", message: "Too Many Requests", description: "Rate limit exceeded" },
    { code: "500", message: "Internal Server Error", description: "Server error, please try again" },
    { code: "503", message: "Service Unavailable", description: "Service temporarily unavailable" }
  ];

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

  const filteredEndpoints = searchQuery
    ? apiEndpoints.filter(
        (endpoint) =>
          endpoint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          endpoint.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : apiEndpoints;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge variant="secondary" className="mb-6">
            <FileCode className="w-3 h-3 mr-1" />
            Advanced API Documentation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            API Documentation Center
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive API reference with interactive testing, code examples, and detailed guides for seamless integration.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search endpoints, parameters, examples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{apiEndpoints.length}</div>
              <p className="text-sm text-muted-foreground">API Endpoints</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime SLA</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt;500ms</div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Support</p>
            </Card>
          </div>
        </section>

        {/* API Reference */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete API Reference</h2>
              <p className="text-lg text-muted-foreground">
                Detailed documentation for all available endpoints with interactive examples
              </p>
            </div>
            
            <div className="space-y-8">
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((endpoint, index) => (
                  <APIEndpointCard key={index} {...endpoint} />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">
                    No endpoints found matching "{searchQuery}"
                  </p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Interactive API Tester */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Live</h2>
              <p className="text-lg text-muted-foreground">
                Test our APIs directly from the documentation
              </p>
            </div>
            <APITester endpoints={testEndpoints} />
          </div>
        </section>

        {/* Authentication Guide */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Authentication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Key className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-4">API Keys</h3>
                <p className="text-muted-foreground mb-4">
                  All API requests require authentication using an API key. Include your key in the Authorization header.
                </p>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </Card>

              <Card className="p-6">
                <Lock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-4">Security Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Never expose API keys in client-side code
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Rotate keys regularly for enhanced security
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Use environment variables to store keys
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Monitor API usage for suspicious activity
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Rate Limiting */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Rate Limits & Quotas</h2>
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1,000</div>
                  <p className="text-sm text-muted-foreground">Requests/hour (Free)</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50,000</div>
                  <p className="text-sm text-muted-foreground">Requests/hour (Pro)</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">Unlimited</div>
                  <p className="text-sm text-muted-foreground">Requests (Enterprise)</p>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Rate Limit Headers</h4>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                  <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000`}</code>
                </pre>
              </div>
            </Card>
          </div>
        </section>

        {/* Error Codes */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Error Codes Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {errorCodes.map((error, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {error.code}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{error.message}</h4>
                      <p className="text-sm text-muted-foreground">{error.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Webhooks</h2>
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Webhook className="w-10 h-10 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Event Notifications</h3>
                  <p className="text-muted-foreground">
                    Receive real-time notifications when events occur in your account. Configure webhook endpoints to handle events programmatically.
                  </p>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger>Setting Up Webhooks</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Configure your webhook endpoint URL in the dashboard to start receiving events.
                      </p>
                      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                        <code>{`POST https://your-domain.com/webhooks
Content-Type: application/json

{
  "event": "api.request.completed",
  "timestamp": "2025-01-01T12:00:00Z",
  "data": {
    "endpoint": "/v1/ai-chat",
    "status": "success"
  }
}`}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="events">
                  <AccordionTrigger>Available Events</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-4">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <code>api.request.completed</code> - API request finished
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <code>api.request.failed</code> - API request failed
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <code>quota.limit.reached</code> - Rate limit reached
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <code>api.key.rotated</code> - API key was rotated
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security">
                  <AccordionTrigger>Webhook Security</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-4">
                      <p className="text-sm text-muted-foreground">
                        All webhook payloads are signed with your webhook secret. Verify the signature to ensure authenticity.
                      </p>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        <code>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return hash === signature;
}`}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
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

        {/* SDK Documentation */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Official SDKs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover-scale cursor-pointer">
                <Terminal className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">JavaScript SDK</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Full-featured SDK for Node.js and browser environments
                </p>
                <Badge variant="secondary">npm install @3bi/sdk</Badge>
              </Card>

              <Card className="p-6 hover-scale cursor-pointer">
                <Code2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Python SDK</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pythonic interface for all 3BI.AI capabilities
                </p>
                <Badge variant="secondary">pip install 3bi-ai</Badge>
              </Card>

              <Card className="p-6 hover-scale cursor-pointer">
                <FileCode className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">REST API</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Direct HTTP access for any programming language
                </p>
                <Badge variant="secondary">api.3bi.ai</Badge>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team and community are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-hero text-white"
                onClick={() => navigate('/contact')}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/community')}
              >
                Join Community
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/api-demos')}
              >
                Try Live Demos
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Documentation;
