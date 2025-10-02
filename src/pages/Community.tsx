import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedProjects from "@/components/FeaturedProjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, Github, Heart, Star, Trophy, Quote } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-hero bg-clip-text text-transparent px-2">
              Join Our Community
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Connect with thousands of developers, designers, and creators building the future with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Join Discord
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                GitHub Community
              </Button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">50K+</CardTitle>
                <CardDescription>Active Members</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Star className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">25K+</CardTitle>
                <CardDescription>Projects Built</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-3xl font-bold">100+</CardTitle>
                <CardDescription>Weekly Events</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Community Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
            <Card>
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Discord Server</CardTitle>
                <CardDescription>
                  Real-time discussions, help channels, and community events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Join Server</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Github className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Open Source</CardTitle>
                <CardDescription>
                  Contribute to our repositories and share your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Repos</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Showcase</CardTitle>
                <CardDescription>
                  Share your creations and get featured in our gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Submit Project</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Community Testimonials */}
      <div className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who are building amazing projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="relative">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6">
                  "This community helped me go from idea to launch in just 2 weeks. The support is incredible!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Kim</p>
                    <p className="text-sm text-muted-foreground">Product Designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6">
                  "The best developer community I've been part of. Everyone is helpful and the resources are top-notch."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6">
                  "I've learned more here in 3 months than I did in years. The community projects are inspiring!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Emma Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Startup Founder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 md:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Join the Community?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with creators, learn from experts, and build amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord Now
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                Explore Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;