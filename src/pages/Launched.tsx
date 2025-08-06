import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Calendar, User, Rocket, Trophy, Zap } from "lucide-react";

const Launched = () => {
  const projects = [
    {
      title: "AI Content Studio",
      description: "Complete content creation platform with AI writing, image generation, and video editing capabilities.",
      author: "Sarah Chen",
      date: "2024-01-15",
      category: "Content Creation",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 1250,
      featured: true
    },
    {
      title: "Smart Analytics Dashboard",
      description: "Advanced business intelligence dashboard with AI-powered insights and predictive analytics.",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      category: "Analytics",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 890,
      featured: false
    },
    {
      title: "AI Code Assistant",
      description: "Intelligent coding companion that helps developers write, debug, and optimize code across multiple languages.",
      author: "Alex Kim",
      date: "2024-01-10",
      category: "Developer Tools",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 2100,
      featured: true
    },
    {
      title: "Voice-to-Text Converter",
      description: "High-accuracy speech recognition tool with real-time transcription and multi-language support.",
      author: "Emma Thompson",
      date: "2024-01-08",
      category: "Productivity",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 650,
      featured: false
    },
    {
      title: "AI Design Generator",
      description: "Automated design tool that creates logos, banners, and marketing materials using AI algorithms.",
      author: "David Park",
      date: "2024-01-05",
      category: "Design",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 1500,
      featured: true
    },
    {
      title: "Customer Support Bot",
      description: "Intelligent chatbot solution for customer service with natural language processing and sentiment analysis.",
      author: "Lisa Wang",
      date: "2024-01-03",
      category: "Customer Service",
      image: "/lovable-uploads/placeholder.jpg",
      stars: 750,
      featured: false
    }
  ];

  const categories = ["All", "Content Creation", "Analytics", "Developer Tools", "Productivity", "Design", "Customer Service"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Recently Launched
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the latest AI-powered projects built by our community. Get inspired and see what's possible with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-hero text-white">
                <Rocket className="w-5 h-5 mr-2" />
                Submit Your Project
              </Button>
              <Button variant="outline" size="lg">
                <Trophy className="w-5 h-5 mr-2" />
                View Hall of Fame
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Rocket className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">2,500+</CardTitle>
                <CardDescription>Projects Launched</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Star className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">1.2M+</CardTitle>
                <CardDescription>Total Stars</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
                <CardDescription>New This Week</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(project => project.featured).map((project) => (
                <Card key={project.title} className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Projects */}
          <div>
            <h2 className="text-3xl font-bold mb-8">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.title} className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who have successfully launched their AI-powered projects. Your next big idea could be featured here!
            </p>
            <Button size="lg" className="bg-gradient-hero text-white">
              <Rocket className="w-5 h-5 mr-2" />
              Start Building Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launched;