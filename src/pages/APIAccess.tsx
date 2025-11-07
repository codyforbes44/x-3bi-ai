import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, Zap, Shield, Code, CheckCircle, XCircle,
  TrendingUp, Clock, Database, Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const APIAccess = () => {
  const navigate = useNavigate();

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for learning and small projects",
      features: [
        { included: true, text: "1,000 API calls/month" },
        { included: true, text: "All AI models" },
        { included: true, text: "Community support" },
        { included: true, text: "Basic rate limits" },
        { included: false, text: "Priority processing" },
        { included: false, text: "Dedicated support" }
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For professionals and growing businesses",
      features: [
        { included: true, text: "50,000 API calls/month" },
        { included: true, text: "All AI models" },
        { included: true, text: "Priority support" },
        { included: true, text: "Higher rate limits" },
        { included: true, text: "Priority processing" },
        { included: false, text: "Dedicated account manager" }
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale applications",
      features: [
        { included: true, text: "Unlimited API calls" },
        { included: true, text: "All AI models" },
        { included: true, text: "24/7 dedicated support" },
        { included: true, text: "Custom rate limits" },
        { included: true, text: "SLA guarantee" },
        { included: true, text: "Dedicated account manager" }
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const endpoints = [
    {
      method: "POST",
      endpoint: "/v1/chat",
      description: "Generate conversational responses with Claude",
      model: "Claude Sonnet 4"
    },
    {
      method: "POST",
      endpoint: "/v1/code",
      description: "AI-powered code generation and analysis",
      model: "Claude Sonnet 4"
    },
    {
      method: "POST",
      endpoint: "/v1/architect",
      description: "System design and architecture guidance",
      model: "Claude Opus 4"
    },
    {
      method: "POST",
      endpoint: "/v1/image/generate",
      description: "Generate images from text descriptions",
      model: "GPT-Image-1"
    },
    {
      method: "POST",
      endpoint: "/v1/voice/synthesize",
      description: "Convert text to natural speech",
      model: "ElevenLabs"
    },
    {
      method: "POST",
      endpoint: "/v1/insights",
      description: "Data analysis and insights generation",
      model: "Claude Sonnet 4"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times for most API calls"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime SLA"
    },
    {
      icon: Database,
      title: "Scalable",
      description: "Auto-scaling infrastructure handles any load"
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "RESTful API with comprehensive documentation"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "<500ms", label: "Avg Response" },
    { value: "10M+", label: "API Calls/Day" },
    { value: "150+", label: "Countries" }
  ];

  return (
    <>
      <SEO
        title="API Access - Developer Tools"
        description="Access 3BI.AI APIs for Grok, Claude 4, GPT-5, and more. Flexible pricing for developers and businesses."
        keywords={['AI API', 'API access', 'developer tools', 'API pricing']}
        ogImage="https://3bi.ai/og/api-access.png"
        canonical="https://3bi.ai/api-access"
      />
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Key className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            API Access
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Integrate powerful AI capabilities into your applications with our simple, scalable API.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {stats.map((stat, index) => (
              <Badge key={index} variant="secondary" className="text-base px-6 py-3">
                <span className="font-bold text-primary mr-2">{stat.value}</span>
                {stat.label}
              </Badge>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Available Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-muted-foreground">{endpoint.description}</p>
                    </div>
                    <Badge variant="outline" className="self-start md:self-center">
                      {endpoint.model}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">API Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-8 relative ${tier.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${tier.popular ? 'bg-gradient-hero text-white' : ''}`}
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => tier.name === "Enterprise" ? navigate('/contact') : navigate('/auth')}
                >
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Start Guide</h2>
            <Tabs defaultValue="step1" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="step1">1. Sign Up</TabsTrigger>
                <TabsTrigger value="step2">2. Get Key</TabsTrigger>
                <TabsTrigger value="step3">3. Make Call</TabsTrigger>
                <TabsTrigger value="step4">4. Build</TabsTrigger>
              </TabsList>
              
              <TabsContent value="step1" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Create Your Account</h3>
                  <p className="text-muted-foreground mb-4">
                    Sign up for free and get instant access to our API. No credit card required for the free tier.
                  </p>
                  <Button onClick={() => navigate('/auth')}>Create Account</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="step2" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Generate API Key</h3>
                  <p className="text-muted-foreground mb-4">
                    Navigate to your dashboard and generate your API key. Keep it secure and never share it publicly.
                  </p>
                  <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="step3" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Make Your First API Call</h3>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
                    <code>{`curl -X POST https://api.3bi.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello, AI!"}'`}</code>
                  </pre>
                  <Button onClick={() => navigate('/documentation')}>View Docs</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="step4" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Build Amazing Things</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our tutorials, examples, and documentation to integrate AI into your applications.
                  </p>
                  <Button onClick={() => navigate('/tutorials')}>Browse Tutorials</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers building with 3BI.AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-hero text-white text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                Get API Access
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/documentation')}
              >
                Read Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default APIAccess;
