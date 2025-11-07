import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Star, Calendar, User, Rocket, Trophy, Zap, TrendingUp, Award, Users } from "lucide-react";

const Launched = () => {
  const projects = [
    {
      title: "AI Content Studio",
      description: "Complete content creation platform with AI writing, image generation, and video editing capabilities.",
      author: "Sarah Chen",
      date: "2024-01-15",
      category: "Content Creation",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
      stars: 1250,
      featured: true,
      users: "10K+"
    },
    {
      title: "Smart Analytics Dashboard",
      description: "Advanced business intelligence dashboard with AI-powered insights and predictive analytics.",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      stars: 890,
      featured: false,
      users: "5K+"
    },
    {
      title: "AI Code Assistant",
      description: "Intelligent coding companion that helps developers write, debug, and optimize code across multiple languages.",
      author: "Alex Kim",
      date: "2024-01-10",
      category: "Developer Tools",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      stars: 2100,
      featured: true,
      users: "25K+"
    },
    {
      title: "Voice-to-Text Converter",
      description: "High-accuracy speech recognition tool with real-time transcription and multi-language support.",
      author: "Emma Thompson",
      date: "2024-01-08",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
      stars: 650,
      featured: false,
      users: "3K+"
    },
    {
      title: "AI Design Generator",
      description: "Automated design tool that creates logos, banners, and marketing materials using AI algorithms.",
      author: "David Park",
      date: "2024-01-05",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      stars: 1500,
      featured: true,
      users: "15K+"
    },
    {
      title: "Customer Support Bot",
      description: "Intelligent chatbot solution for customer service with natural language processing and sentiment analysis.",
      author: "Lisa Wang",
      date: "2024-01-03",
      category: "Customer Service",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      stars: 750,
      featured: false,
      users: "8K+"
    }
  ];

  const successStories = [
    {
      name: "TechStart Inc.",
      project: "AI Meeting Scheduler",
      result: "Saved 50+ hours/week",
      image: "https://api.dicebear.com/7.x/initials/svg?seed=TI"
    },
    {
      name: "Creative Agency",
      project: "Design Automation Tool",
      result: "3x faster delivery",
      image: "https://api.dicebear.com/7.x/initials/svg?seed=CA"
    },
    {
      name: "E-commerce Pro",
      project: "Smart Inventory System",
      result: "$100K+ revenue boost",
      image: "https://api.dicebear.com/7.x/initials/svg?seed=EP"
    }
  ];

  const categories = ["All", "Content Creation", "Analytics", "Developer Tools", "Productivity", "Design", "Customer Service"];

  return (
    <>
      <SEO
        title="Launched Projects - Community Showcase"
        description="Explore amazing projects built with 3BI.AI. Get inspired and share your own creations."
        keywords={['AI projects', 'showcase', 'community projects', 'launched']}
        ogImage="https://3bi.ai/og/launched.png"
        canonical="https://3bi.ai/launched"
      />
      <div className="min-h-screen bg-background">
        <Header />
      <div className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              <TrendingUp className="w-3 h-3 mr-1" />
              50+ New Projects This Week
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-hero bg-clip-text text-transparent px-2">
              Recently Launched
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Discover the latest AI-powered projects built by our community. Get inspired and see what's possible with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Submit Your Project
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.filter(project => project.featured).map((project, index) => (
                <Card key={project.title} className="group h-full hover:shadow-elegant transition-spring overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-spring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.users}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-smooth">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.author}`} />
                          <AvatarFallback>{project.author[0]}</AvatarFallback>
                        </Avatar>
                        {project.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-12 md:mb-16 bg-gradient-subtle rounded-2xl p-6 md:p-12">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Success Stories</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real results from teams who launched with our platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {successStories.map((story, index) => (
                <Card key={story.name} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={story.image} />
                      <AvatarFallback>{story.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>{story.project}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                      <Award className="w-4 h-4" />
                      {story.result}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Projects */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <Card key={project.title} className="group h-full hover:shadow-elegant transition-spring overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-spring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.users}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-base md:text-lg group-hover:text-primary transition-smooth">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5 md:w-6 md:h-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.author}`} />
                          <AvatarFallback>{project.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">{project.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        {new Date(project.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-subtle rounded-2xl p-6 md:p-12 animate-fade-in">
            <Rocket className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Ready to Launch Your Project?</h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of creators who have successfully launched their AI-powered projects. Your next big idea could be featured here!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Start Building Today
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default Launched;