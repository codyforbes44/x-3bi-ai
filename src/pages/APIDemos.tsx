import { useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Code2, ImagePlus, Mic, Search, Sparkles, 
  Loader2, CheckCircle2, AlertCircle 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const APIDemos = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const demos = [
    {
      id: "claude",
      name: "Claude Chat",
      icon: Brain,
      color: "text-blue-500",
      description: "Advanced reasoning with Claude Sonnet 4",
      endpoint: "ai-chat",
      placeholder: "Ask Claude anything...",
      model: "Claude Sonnet 4"
    },
    {
      id: "code",
      name: "Code Assistant",
      icon: Code2,
      color: "text-green-500",
      description: "AI-powered code analysis and generation",
      endpoint: "ai-code",
      placeholder: "Describe the code you need...",
      model: "Claude Sonnet 4"
    },
    {
      id: "architect",
      name: "AI Architect",
      icon: Brain,
      color: "text-orange-500",
      description: "System design with Claude Opus 4",
      endpoint: "ai-architect",
      placeholder: "Describe your system architecture needs...",
      model: "Claude Opus 4"
    },
    {
      id: "image",
      name: "Image Generation",
      icon: ImagePlus,
      color: "text-purple-500",
      description: "Create stunning images with GPT Image-1",
      endpoint: "ai-image",
      placeholder: "Describe the image you want to create...",
      model: "GPT Image-1"
    },
    {
      id: "voice",
      name: "Voice Synthesis",
      icon: Mic,
      color: "text-pink-500",
      description: "Natural text-to-speech with ElevenLabs",
      endpoint: "premium-voice",
      placeholder: "Enter text to convert to speech...",
      model: "ElevenLabs"
    },
    {
      id: "search",
      name: "Web Search",
      icon: Search,
      color: "text-cyan-500",
      description: "Real-time web search with Perplexity",
      endpoint: "realtime-search",
      placeholder: "What would you like to search for?",
      model: "Perplexity AI"
    },
    {
      id: "insights",
      name: "AI Insights",
      icon: Sparkles,
      color: "text-yellow-500",
      description: "Data analysis and predictions",
      endpoint: "ai-insights",
      placeholder: "Describe the data you want to analyze...",
      model: "Claude Sonnet 4"
    }
  ];

  const handleAPICall = async (endpoint: string) => {
    if (!input.trim()) {
      toast.error("Please enter some input");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: { message: input, prompt: input }
      });

      if (error) throw error;

      if (endpoint === "ai-image" && data?.image) {
        setOutput(`Image generated successfully!\n\n${data.image}`);
      } else if (endpoint === "premium-voice" && data?.audioContent) {
        setOutput("Audio generated successfully! (Base64 audio data received)");
        // You could play the audio here
      } else if (data?.message) {
        setOutput(data.message);
      } else if (data?.response) {
        setOutput(data.response);
      } else {
        setOutput(JSON.stringify(data, null, 2));
      }

      toast.success("API call successful!");
    } catch (error: any) {
      console.error("API error:", error);
      setOutput(`Error: ${error.message}`);
      toast.error("API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="API Demos - Interactive Examples"
        description="Try our AI APIs with interactive demos. Test Grok, Claude 4, image generation, and more."
        keywords={['API demos', 'AI examples', 'API testing', 'interactive demos']}
        ogImage="https://3bi.ai/og/api-demos.png"
        canonical="https://3bi.ai/api-demos"
      />
      <Header />
      <main className="min-h-screen pt-20 pb-16 neural-bg">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            Live API Demonstrations
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Experience the APIs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Try our advanced AI APIs live - no authentication required for demos
          </p>
        </section>

        {/* API Demos */}
        <section className="container mx-auto px-4 py-16">
          <Tabs defaultValue="claude" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8">
              {demos.map((demo) => (
                <TabsTrigger key={demo.id} value={demo.id} className="flex items-center gap-2">
                  <demo.icon className={`w-4 h-4 ${demo.color}`} />
                  <span className="hidden sm:inline">{demo.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id} className="space-y-6">
                <Card className="glass">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <demo.icon className={`w-8 h-8 ${demo.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{demo.name}</CardTitle>
                        <CardDescription className="text-base">
                          {demo.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {demo.model}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Input
                      </label>
                      <Textarea
                        placeholder={demo.placeholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      onClick={() => handleAPICall(demo.endpoint)}
                      disabled={loading}
                      className="w-full bg-gradient-hero text-white"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Try {demo.name}
                        </>
                      )}
                    </Button>

                    {output && (
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-2">
                          {output.includes("Error") ? (
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          <label className="text-sm font-semibold">
                            Output
                          </label>
                        </div>
                        <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                          {output.startsWith("data:image") ? (
                            <img src={output} alt="Generated" className="max-w-full rounded-lg" />
                          ) : (
                            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* API Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>API Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Endpoint</p>
                      <code className="text-sm bg-muted px-3 py-1 rounded">
                        POST /functions/v1/{demo.endpoint}
                      </code>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Model</p>
                      <Badge>{demo.model}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Example Request</p>
                      <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
{`curl -X POST \\
  https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/${demo.endpoint} \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Your input here"}'`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default APIDemos;
