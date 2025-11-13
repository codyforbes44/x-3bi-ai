import { SEO } from "@/components/SEO";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Video, FileText, Code, Lightbulb, Rocket, Clock, User, Search, Terminal, Zap, Database, Globe, Shield, CheckCircle2, ArrowRight, BookMarked, GraduationCap, PlayCircle } from "lucide-react";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";

const Learn = () => {
  const categories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "New to AI? Start here with our beginner-friendly guides",
      courses: 8,
      color: "text-green-500"
    },
    {
      icon: Code,
      title: "API & Integrations",
      description: "Learn to integrate our AI tools with your applications",
      courses: 12,
      color: "text-blue-500"
    },
    {
      icon: Lightbulb,
      title: "Advanced Techniques",
      description: "Master complex AI workflows and optimization strategies",
      courses: 15,
      color: "text-purple-500"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for visual learners",
      courses: 25,
      color: "text-orange-500"
    }
  ];

  const featuredContent = [
    {
      type: "Course",
      title: "AI Fundamentals for Beginners",
      description: "Complete introduction to AI concepts and our platform",
      duration: "2 hours",
      level: "Beginner",
      icon: BookOpen,
      modules: 8
    },
    {
      type: "Tutorial",
      title: "Building Your First AI Assistant",
      description: "Step-by-step guide to creating a custom AI assistant",
      duration: "45 minutes",
      level: "Intermediate",
      icon: Video,
      modules: 5
    },
    {
      type: "Guide",
      title: "Advanced Prompt Engineering",
      description: "Master the art of crafting effective AI prompts",
      duration: "1.5 hours",
      level: "Advanced",
      icon: FileText,
      modules: 6
    }
  ];

  const apiEndpoints = [
    {
      name: "AI Chat",
      endpoint: "/api/ai-chat",
      method: "POST",
      description: "Generate AI-powered chat responses"
    },
    {
      name: "Image Generation",
      endpoint: "/api/ai-image",
      method: "POST",
      description: "Create images from text descriptions"
    },
    {
      name: "Voice Synthesis",
      endpoint: "/api/ai-voice",
      method: "POST",
      description: "Convert text to natural speech"
    },
    {
      name: "Code Assistant",
      endpoint: "/api/ai-code",
      method: "POST",
      description: "Get AI help with coding tasks"
    }
  ];

  const tutorials = [
    {
      title: "Quick Start Guide",
      description: "Get up and running in 5 minutes",
      duration: "5 min",
      difficulty: "Beginner"
    },
    {
      title: "Authentication Setup",
      description: "Implement secure user authentication",
      duration: "15 min",
      difficulty: "Beginner"
    },
    {
      title: "Building AI Chat Interface",
      description: "Create an interactive chat application",
      duration: "30 min",
      difficulty: "Intermediate"
    },
    {
      title: "Deploying Your App",
      description: "Deploy your application to production",
      duration: "20 min",
      difficulty: "Intermediate"
    },
    {
      title: "Advanced AI Workflows",
      description: "Chain multiple AI operations",
      duration: "45 min",
      difficulty: "Advanced"
    },
    {
      title: "Performance Optimization",
      description: "Optimize your AI application",
      duration: "40 min",
      difficulty: "Advanced"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with the platform?",
      answer: "Start by signing up for a free account, then explore our Quick Start Guide to build your first AI-powered feature. We provide comprehensive documentation and code examples to help you get started quickly."
    },
    {
      question: "What programming languages are supported?",
      answer: "Our platform is built with React and TypeScript, but our APIs can be integrated with any language that supports HTTP requests. We provide SDKs for JavaScript, Python, and other popular languages."
    },
    {
      question: "How do I integrate AI features into my app?",
      answer: "You can integrate AI features using our RESTful APIs or our pre-built React components. Check out our API Reference section for detailed documentation and code examples."
    },
    {
      question: "Is there a free tier available?",
      answer: "Yes! We offer a generous free tier that includes access to all basic AI features with usage limits. You can upgrade to a paid plan for higher limits and advanced features."
    },
    {
      question: "How do I handle API rate limits?",
      answer: "Our APIs include rate limiting to ensure fair usage. You can implement exponential backoff and caching strategies to optimize your usage. Premium plans offer higher rate limits."
    },
    {
      question: "Where can I get help if I'm stuck?",
      answer: "We have a vibrant community on Discord, comprehensive documentation, video tutorials, and a support team ready to help. Check out our Community page to connect with other developers."
    }
  ];

  return (
    <>
      <SEO
        title={PAGE_SEO.learn.title}
        description={PAGE_SEO.learn.description}
        keywords={PAGE_SEO.learn.keywords}
        ogImage={SEO_CONFIG.ogImages.learn}
        canonical={`${SEO_CONFIG.siteUrl}/learn`}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.learn.label, url: BREADCRUMB_CONFIG.learn.url }
        ]}
      />
      <PublicPageLayout maxWidth="7xl">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              <BookMarked className="w-3 h-3 mr-1" />
              500+ Learning Resources
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-hero bg-clip-text text-transparent px-2">
              Learn & Master AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Comprehensive resources to help you master AI tools and build amazing projects. From beginner guides to advanced techniques.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search documentation, tutorials, guides..." 
                  className="pl-10 h-12 md:h-14 text-base"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                <Video className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Watch Tutorials
              </Button>
            </div>
          </div>

          {/* Learning Categories */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Learning Paths</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Card key={category.title} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <category.icon className={`w-12 h-12 mx-auto mb-4 ${category.color}`} />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary">{category.courses} courses</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Content */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Featured Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {featuredContent.map((content, index) => (
                <Card key={content.title} className="group h-full hover:shadow-elegant transition-spring animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                        <content.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline">{content.type}</Badge>
                    </div>
                    <CardTitle className="text-lg md:text-xl mb-2 group-hover:text-primary transition-smooth">{content.title}</CardTitle>
                    <CardDescription>{content.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {content.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {content.level}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {content.modules} modules
                      </div>
                    </div>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Documentation Tabs */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Documentation</h2>
            <Tabs defaultValue="tutorials" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                <TabsTrigger value="tutorials" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Tutorials</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="gap-2">
                  <Terminal className="w-4 h-4" />
                  <span className="hidden sm:inline">API Reference</span>
                </TabsTrigger>
                <TabsTrigger value="guides" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Guides</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Examples</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tutorials" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {tutorials.map((tutorial, index) => (
                    <Card key={tutorial.title} className="group hover:shadow-elegant transition-spring cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={tutorial.difficulty === "Beginner" ? "default" : tutorial.difficulty === "Intermediate" ? "secondary" : "outline"}>
                            {tutorial.difficulty}
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tutorial.duration}
                          </span>
                        </div>
                        <CardTitle className="text-base md:text-lg group-hover:text-primary transition-smooth">{tutorial.title}</CardTitle>
                        <CardDescription className="text-sm">{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Tutorial
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      API Endpoints
                    </CardTitle>
                    <CardDescription>
                      RESTful API endpoints for integrating AI features into your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {apiEndpoints.map((api, index) => (
                      <div key={api.name} className="border rounded-lg p-4 hover:border-primary transition-smooth animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <Badge className="font-mono">{api.method}</Badge>
                            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{api.endpoint}</code>
                          </div>
                          <Button size="sm" variant="outline">
                            View Docs
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{api.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start Example</CardTitle>
                    <CardDescription>Basic API request example</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`// Initialize API client
const response = await fetch('/api/ai-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    message: 'Hello, AI!',
    model: 'gpt-4'
  })
});

const data = await response.json();
console.log(data.response);`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guides" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="group hover:shadow-elegant transition-spring">
                    <CardHeader>
                      <Shield className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Security Best Practices</CardTitle>
                      <CardDescription>
                        Learn how to secure your AI applications and protect user data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          API key management and rotation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Rate limiting and abuse prevention
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Data encryption and privacy
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Read Guide</Button>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-elegant transition-spring">
                    <CardHeader>
                      <Zap className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Performance Optimization</CardTitle>
                      <CardDescription>
                        Optimize your AI application for speed and efficiency
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Caching strategies for AI responses
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Batch processing and queuing
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Load balancing and scaling
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Read Guide</Button>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-elegant transition-spring">
                    <CardHeader>
                      <Database className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>
                        Manage and organize your AI data effectively
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Database design for AI applications
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Vector storage and retrieval
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Backup and recovery strategies
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Read Guide</Button>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-elegant transition-spring">
                    <CardHeader>
                      <Globe className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Deployment Guide</CardTitle>
                      <CardDescription>
                        Deploy your AI application to production
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Cloud deployment options
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          CI/CD pipeline setup
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Monitoring and logging
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Read Guide</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Chat Integration</CardTitle>
                      <CardDescription>Build a conversational AI interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                        <code>{`import { useState } from 'react';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  
  const sendMessage = async (text) => {
    const response = await fetch('/api/ai-chat', {
      method: 'POST',
      body: JSON.stringify({ message: text })
    });
    
    const data = await response.json();
    setMessages([...messages, data]);
  };
  
  return <ChatInterface onSend={sendMessage} />;
}`}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View Full Example
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Image Generation</CardTitle>
                      <CardDescription>Generate images with AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                        <code>{`async function generateImage(prompt) {
  const response = await fetch('/api/ai-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt,
      size: '1024x1024',
      quality: 'hd'
    })
  });
  
  const { image_url } = await response.json();
  return image_url;
}`}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View Full Example
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Voice Synthesis</CardTitle>
                      <CardDescription>Convert text to speech</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                        <code>{`async function textToSpeech(text) {
  const response = await fetch('/api/ai-voice', {
    method: 'POST',
    body: JSON.stringify({
      text: text,
      voice: 'alloy',
      model: 'tts-1'
    })
  });
  
  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  
  new Audio(audioUrl).play();
}`}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View Full Example
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Code Assistant</CardTitle>
                      <CardDescription>Get AI coding help</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                        <code>{`async function getCodeHelp(code, question) {
  const response = await fetch('/api/ai-code', {
    method: 'POST',
    body: JSON.stringify({
      code: code,
      question: question,
      language: 'typescript'
    })
  });
  
  const { suggestion, explanation } = 
    await response.json();
    
  return { suggestion, explanation };
}`}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View Full Example
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className="bg-gradient-subtle rounded-xl md:rounded-2xl p-6 md:p-12 text-center animate-fade-in">
            <GraduationCap className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Start Learning?</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of learners who have mastered AI tools and transformed their workflows.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Learning Resources</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                Browse All Resources
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </PublicPageLayout>
    </>
  );
};

export default Learn;