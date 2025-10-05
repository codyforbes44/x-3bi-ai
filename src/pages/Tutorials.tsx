import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, BookOpen, Code, Image, Mic, Brain, 
  Clock, TrendingUp, Users 
} from "lucide-react";

const Tutorials = () => {
  const tutorials = [
    {
      icon: BookOpen,
      title: "Getting Started with 3BI.AI",
      description: "Learn the basics of our platform and create your first AI-powered project in 10 minutes.",
      duration: "10 min",
      level: "Beginner",
      category: "Getting Started",
      lessons: 5
    },
    {
      icon: Brain,
      title: "Mastering AI Chat Conversations",
      description: "Advanced techniques for effective prompting and getting the best results from Claude Sonnet 4.",
      duration: "25 min",
      level: "Intermediate",
      category: "Chat",
      lessons: 8
    },
    {
      icon: Code,
      title: "Code Generation with AI",
      description: "Build applications faster by leveraging AI code assistance for common programming tasks.",
      duration: "30 min",
      level: "Intermediate",
      category: "Development",
      lessons: 10
    },
    {
      icon: Image,
      title: "Creating Stunning AI Images",
      description: "Master prompt engineering for image generation and learn to create professional visuals.",
      duration: "20 min",
      level: "Beginner",
      category: "Creative",
      lessons: 7
    },
    {
      icon: Mic,
      title: "Voice AI Applications",
      description: "Implement natural text-to-speech in your projects with ElevenLabs integration.",
      duration: "15 min",
      level: "Intermediate",
      category: "Voice",
      lessons: 6
    },
    {
      icon: Brain,
      title: "AI Architecture Design",
      description: "Learn system design principles with Claude Opus 4 for scalable applications.",
      duration: "35 min",
      level: "Advanced",
      category: "Architecture",
      lessons: 12
    }
  ];

  const learningPaths = [
    {
      title: "Complete Beginner Path",
      description: "Start from zero and become proficient with all core AI tools",
      duration: "2-3 hours",
      tutorials: 6
    },
    {
      title: "Developer Fast Track",
      description: "Focus on code generation, architecture, and technical implementations",
      duration: "3-4 hours",
      tutorials: 8
    },
    {
      title: "Creative Professional",
      description: "Master image generation, voice AI, and creative workflows",
      duration: "2 hours",
      tutorials: 5
    }
  ];

  const stats = [
    { icon: Users, value: "25K+", label: "Students" },
    { icon: Play, value: "150+", label: "Video Tutorials" },
    { icon: Clock, value: "50+", label: "Hours of Content" },
    { icon: TrendingUp, value: "4.9/5", label: "Average Rating" }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            AI Tutorials
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Step-by-step guides to master AI tools and unlock your creative potential with hands-on learning.
          </p>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="p-6 hover-scale cursor-pointer">
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
                      {tutorial.lessons} lessons
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index} className="p-6 hover-scale cursor-pointer">
                  <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary">{path.duration}</Badge>
                    <span className="text-muted-foreground">{path.tutorials} tutorials</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tutorial Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Getting Started", "Chat", "Development", "Creative", "Voice", "Architecture", "Analytics", "Workflows"].map((category, index) => (
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
            <h2 className="text-3xl font-bold mb-8 text-center">Learning Tips</h2>
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
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              All tutorials are completely free and designed for hands-on learning.
            </p>
            <a 
              href="/dashboard"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              Start First Tutorial
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tutorials;
