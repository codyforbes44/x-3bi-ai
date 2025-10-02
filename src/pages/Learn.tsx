import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Code, Lightbulb, Rocket, Clock, User } from "lucide-react";

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
      icon: BookOpen
    },
    {
      type: "Tutorial",
      title: "Building Your First AI Assistant",
      description: "Step-by-step guide to creating a custom AI assistant",
      duration: "45 minutes",
      level: "Intermediate",
      icon: Video
    },
    {
      type: "Guide",
      title: "Advanced Prompt Engineering",
      description: "Master the art of crafting effective AI prompts",
      duration: "1.5 hours",
      level: "Advanced",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-hero bg-clip-text text-transparent px-2">
              Learn & Master AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Comprehensive resources to help you master AI tools and build amazing projects. From beginner guides to advanced techniques.
            </p>
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
              {featuredContent.map((content) => (
                <Card key={content.title} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <content.icon className="w-8 h-8 text-primary" />
                      <Badge variant="outline">{content.type}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{content.title}</CardTitle>
                    <CardDescription>{content.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {content.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {content.level}
                      </div>
                    </div>
                    <Button className="w-full">Start Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Start Section */}
          <div className="bg-muted/50 rounded-xl md:rounded-2xl p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Start Learning?</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have mastered AI tools and transformed their workflows.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Learning Resources</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
              Browse All Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;