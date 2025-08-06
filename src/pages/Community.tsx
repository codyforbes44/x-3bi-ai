import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Github, Heart, Star, Trophy } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Connect with thousands of developers, designers, and creators building the future with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-hero text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord
              </Button>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" />
                GitHub Community
              </Button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default Community;