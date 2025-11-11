import { SEO } from "@/components/SEO";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { StatsGrid } from "@/components/layout/StatsGrid";
import { CTASection } from "@/components/layout/CTASection";
import FeaturedProjects from "@/components/FeaturedProjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, Github, Heart, Star, Trophy, Quote } from "lucide-react";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";

const Community = () => {
  const stats = [
    { icon: Users, value: "50K+", description: "Active Members" },
    { icon: Star, value: "25K+", description: "Projects Built" },
    { icon: Trophy, value: "100+", description: "Weekly Events" }
  ];

  return (
    <>
      <SEO
        title={PAGE_SEO.community.title}
        description={PAGE_SEO.community.description}
        keywords={PAGE_SEO.community.keywords}
        ogImage={SEO_CONFIG.ogImages.community}
        canonical={`${SEO_CONFIG.siteUrl}/community`}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.community.label, url: BREADCRUMB_CONFIG.community.url }
        ]}
      />
      <PageLayout>
      <div className="pb-12 md:pb-16">
        <PageHero
          title="Join Our Community"
          description="Connect with thousands of developers, designers, and creators building the future with AI-powered tools."
          actions={
            <>
              <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Join Discord
              </Button>
              <Button variant="outline" size="lg" className="min-h-[48px]">
                <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                GitHub Community
              </Button>
            </>
          }
        />

        <div className="container mx-auto px-4 md:px-6">
          {/* Community Stats */}
          <StatsGrid stats={stats} className="mb-12 md:mb-16" />

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
      <CTASection
        title="Ready to Join the Community?"
        description="Connect with creators, learn from experts, and build amazing projects together."
        actions={
          <>
            <Button size="lg" className="bg-gradient-hero text-white min-h-[48px]">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord Now
            </Button>
            <Button variant="outline" size="lg" className="min-h-[48px]">
              Explore Projects
            </Button>
          </>
        }
      />
      </PageLayout>
    </>
  );
};

export default Community;
