import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { StatsGrid } from "@/components/layout/StatsGrid";
import { CTASection } from "@/components/layout/CTASection";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, BookOpen, Code, Image, Mic, Brain, 
  Clock, TrendingUp, Users 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateBreadcrumbSchema } from "@/utils/structuredData";

const Tutorials = () => {
  const navigate = useNavigate();
  
  const tutorials = [
    {
      id: "ai-chat",
      route: "/tutorials/ai-chat",
      icon: Brain,
      title: "Mastering AI Chat Conversations",
      description: "Advanced techniques for effective prompting and getting the best results from Claude Sonnet 4.",
      duration: "25 min",
      level: "Beginner to Intermediate",
      category: "Chat",
      lessons: 6
    },
    {
      id: "code-generation",
      route: "/tutorials/code-generation",
      icon: Code,
      title: "AI-Powered Code Generation",
      description: "Build applications faster by leveraging AI code assistance for programming tasks.",
      duration: "30 min",
      level: "Intermediate",
      category: "Development",
      lessons: 7
    },
    {
      id: "image-generation",
      route: "/tutorials/image-generation",
      icon: Image,
      title: "Creating Stunning AI Images",
      description: "Master prompt engineering for image generation and learn to create professional visuals.",
      duration: "20 min",
      level: "Beginner",
      category: "Creative",
      lessons: 7
    },
    {
      id: "voice-ai",
      route: "/tutorials/voice-ai",
      icon: Mic,
      title: "Voice AI with ElevenLabs",
      description: "Implement natural text-to-speech in your projects with ElevenLabs integration.",
      duration: "15 min",
      level: "Beginner",
      category: "Voice",
      lessons: 7
    },
    {
      id: "system-architecture",
      route: "/tutorials/system-architecture",
      icon: Brain,
      title: "AI-Powered System Architecture",
      description: "Learn system design principles with Claude Opus 4 for scalable applications.",
      duration: "35 min",
      level: "Advanced",
      category: "Architecture",
      lessons: 8
    }
  ];

  const stats = [
    { icon: Users, value: "25K+", description: "Students" },
    { icon: Play, value: "150+", description: "Video Tutorials" },
    { icon: Clock, value: "50+", description: "Hours of Content" },
    { icon: TrendingUp, value: "4.9/5", description: "Average Rating" }
  ];

  const structuredData = generateBreadcrumbSchema([
    { name: "Home", url: "https://3bi.ai/" },
    { name: "Tutorials", url: "https://3bi.ai/tutorials" }
  ]);

  return (
    <>
      <SEO
        title="AI Tutorials - Learn AI Tools Step-by-Step"
        description="Free AI tutorials for mastering Grok, Claude 4, GPT-5. Step-by-step guides for AI chat, code generation, image creation, voice AI, and system architecture."
        keywords={['AI tutorials', 'AI learning', 'AI courses', 'learn AI', 'AI training', 'ChatGPT tutorial', 'Claude tutorial', 'AI guide', 'AI education']}
        ogImage="https://3bi.ai/og/tutorials.png"
        canonical="https://3bi.ai/tutorials"
        structuredData={structuredData}
      />
      <PublicPageLayout maxWidth="7xl">
      <PageHero
        title="AI Tutorials"
        description="Step-by-step guides to master AI tools and unlock your creative potential with hands-on learning."
      />

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <StatsGrid stats={stats} columns={4} />
      </div>

      {/* Tutorials Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tutorials.map((tutorial) => (
            <Card 
              key={tutorial.id} 
              className="p-6 hover-scale cursor-pointer"
              onClick={() => navigate(tutorial.route)}
            >
              <div className="flex items-center justify-between mb-4">
                <tutorial.icon className="w-10 h-10 text-primary" />
                <Badge variant="outline">{tutorial.level}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">{tutorial.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tutorial.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {tutorial.lessons} steps
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-gradient-hero text-white">
                Start Tutorial
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Chat", "Development", "Creative", "Voice", "Architecture"].map((category, index) => (
              <Card key={index} className="p-4 text-center hover-scale cursor-pointer">
                <p className="font-semibold">{category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">1.</span>
                <span>Start with the basics and progressively build your skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">2.</span>
                <span>Practice with real projects to reinforce learning</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">3.</span>
                <span>Experiment with different prompts and approaches</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">4.</span>
                <span>Join our community to share and learn from others</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">5.</span>
                <span>Revisit tutorials as you gain experience for deeper insights</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Learning?"
        description="All tutorials are completely free and designed for hands-on learning."
        actions={
          <Button 
            size="lg"
            className="bg-gradient-hero text-white"
            onClick={() => navigate('/dashboard')}
          >
            <Play className="w-5 h-5 mr-2" />
            Start First Tutorial
          </Button>
        }
      />
      </PublicPageLayout>
    </>
  );
};

export default Tutorials;
