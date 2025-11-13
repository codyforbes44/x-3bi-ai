import { useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileCode, BookOpen, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateTechArticleSchema } from "@/utils/structuredData";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { APIEndpointCard } from "@/components/docs/APIEndpointCard";
import { APITester } from "@/components/docs/APITester";
import { DocumentationHero } from "@/components/docs/DocumentationHero";
import { DocumentationStats } from "@/components/docs/DocumentationStats";
import { AuthenticationGuide } from "@/components/docs/AuthenticationGuide";
import { RateLimitGuide } from "@/components/docs/RateLimitGuide";
import { ErrorCodesReference } from "@/components/docs/ErrorCodesReference";
import { WebhooksGuide } from "@/components/docs/WebhooksGuide";
import { DocumentationSections } from "@/components/docs/DocumentationSections";
import { CodeExamples } from "@/components/docs/CodeExamples";
import { SDKDocumentation } from "@/components/docs/SDKDocumentation";

const Documentation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const structuredData = generateTechArticleSchema({
    title: "3BI.AI API Documentation - Complete Developer Guide",
    description: "Comprehensive API documentation for 3BI.AI. Access Grok, Claude 4, GPT-5, and more via REST API. Code examples, authentication, and best practices.",
    url: "https://3bi.ai/documentation",
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString()
  });

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
      <SEO
        title={PAGE_SEO.documentation.title}
        description={PAGE_SEO.documentation.description}
        keywords={PAGE_SEO.documentation.keywords}
        ogImage={SEO_CONFIG.ogImages.documentation}
        canonical={`${SEO_CONFIG.siteUrl}/documentation`}
        structuredData={structuredData}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.documentation.label, url: BREADCRUMB_CONFIG.documentation.url }
        ]}
      />
      <PublicPageLayout maxWidth="7xl">
        <DocumentationHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <DocumentationStats endpointsCount={apiEndpoints.length} />

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

        <AuthenticationGuide />
        <RateLimitGuide />
        <ErrorCodesReference />
        <WebhooksGuide />
        <DocumentationSections />
        <CodeExamples />
        <SDKDocumentation />

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
      </PublicPageLayout>
    </>
  );
};

export default Documentation;
