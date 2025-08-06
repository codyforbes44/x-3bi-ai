import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Copy } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "pulse-robot-template",
    category: "Website",
    remixes: "22,284",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop&crop=center",
    author: "Community",
    description: "Modern landing page template with smooth animations"
  },
  {
    id: 2,
    title: "cryptocurrency-trading-dashboard",
    category: "Dashboard",
    remixes: "13,640",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop&crop=center",
    author: "Community",
    description: "Real-time crypto trading interface with charts"
  },
  {
    id: 3,
    title: "ai-integration-platform",
    category: "SaaS",
    remixes: "8,370",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop&crop=center",
    author: "Community",
    description: "AI-powered business automation platform"
  },
  {
    id: 4,
    title: "e-commerce-storefront",
    category: "E-commerce",
    remixes: "15,892",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop&crop=center",
    author: "Community",
    description: "Complete online store with cart and checkout"
  }
];

const categories = ["Popular", "Discover", "Internal Tools", "Website", "Personal", "Consumer App", "B2B App", "Prototype"];

const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">From the Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing projects built by our community. Get inspired and remix them to create something unique.
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Popular" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="rounded-full">
            View All
          </Button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-elegant transition-spring overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-spring"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary" className="shadow-lg">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="default" className="shadow-lg">
                    <Copy className="w-4 h-4 mr-2" />
                    Remix
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{project.category}</Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">by {project.author}</span>
                  <span className="font-medium">{project.remixes} Remixes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="min-w-[200px]">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;