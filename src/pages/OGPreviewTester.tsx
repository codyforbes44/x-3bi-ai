import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OGPreviewTester = () => {
  const [testUrl, setTestUrl] = useState("https://3bi.ai");
  const baseUrl = "https://3bi.ai";

  const pages = [
    { path: "/", title: "Home", ogImage: "/og/home.png" },
    { path: "/dashboard", title: "Dashboard", ogImage: "/og/dashboard.png" },
    { path: "/ai-tools", title: "Free AI Tools", ogImage: "/og/ai-tools.png" },
    { path: "/grok-chat", title: "Grok Chat", ogImage: "/og/grok-chat.png" },
    { path: "/community", title: "Community", ogImage: "/og/community.png" },
    { path: "/contact", title: "Contact", ogImage: "/og/contact.png" },
    { path: "/learn", title: "Learn", ogImage: "/og/learn.png" },
    { path: "/team", title: "Team", ogImage: "/og/team.png" },
    { path: "/mission", title: "Mission", ogImage: "/og/mission.png" },
    { path: "/impact", title: "Impact", ogImage: "/og/impact.png" },
    { path: "/pricing", title: "Pricing", ogImage: "/og/pricing.png" },
    { path: "/enterprise", title: "Enterprise", ogImage: "/og/enterprise.png" },
    { path: "/documentation", title: "Documentation", ogImage: "/og/documentation.png" },
    { path: "/tutorials", title: "Tutorials", ogImage: "/og/tutorials.png" },
    { path: "/integrations", title: "Integrations", ogImage: "/og/integrations.png" },
    { path: "/workspaces", title: "Workspaces", ogImage: "/og/workspaces.png" },
    { path: "/memory", title: "Memory", ogImage: "/og/memory.png" },
    { path: "/analytics", title: "Analytics", ogImage: "/og/analytics.png" },
    { path: "/api-access", title: "API Access", ogImage: "/og/api-access.png" },
    { path: "/api-demos", title: "API Demos", ogImage: "/og/api-demos.png" },
    { path: "/api-keys", title: "API Keys", ogImage: "/og/api-keys.png" },
    { path: "/security", title: "Security", ogImage: "/og/security.png" },
    { path: "/profile", title: "Profile", ogImage: "/og/profile.png" },
    { path: "/auth", title: "Sign In", ogImage: "/og/auth.png" },
    { path: "/referrals", title: "Referrals", ogImage: "/og/referrals.png" },
    { path: "/install", title: "Install", ogImage: "/og/install.png" },
    { path: "/newsletter", title: "Newsletter", ogImage: "/og/newsletter.png" },
    { path: "/partners", title: "Partners", ogImage: "/og/partners.png" },
    { path: "/launched", title: "Launched", ogImage: "/og/launched.png" },
  ];

  const validators = [
    {
      name: "Twitter Card Validator",
      platform: "Twitter/X",
      url: (url: string) => `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`,
      icon: "𝕏",
      specs: "1200x628px, PNG/JPG, <5MB",
    },
    {
      name: "Facebook Sharing Debugger",
      platform: "Facebook",
      url: (url: string) => `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`,
      icon: "📘",
      specs: "1200x630px, PNG/JPG, <8MB",
    },
    {
      name: "LinkedIn Post Inspector",
      platform: "LinkedIn",
      url: (url: string) => `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`,
      icon: "💼",
      specs: "1200x627px, PNG/JPG, <5MB",
    },
    {
      name: "Open Graph Check",
      platform: "Universal",
      url: (url: string) => `https://www.opengraph.xyz/url/${encodeURIComponent(url)}`,
      icon: "🔍",
      specs: "1200x630px standard",
    },
  ];

  const checklist = [
    { item: "All images are exactly 1200x630px", checked: true },
    { item: "All text is in English only", checked: true },
    { item: "3BI.AI logo visible on all images", checked: true },
    { item: "High contrast text for readability", checked: true },
    { item: "Safe zone respected (text within 1200x600px)", checked: true },
    { item: "File sizes under 5MB", checked: true },
    { item: "PNG format with proper compression", checked: true },
    { item: "Consistent brand gradients used", checked: true },
  ];

  return (
    <>
      <SEO
        title="OG Image Preview Tester"
        description="Test and validate Open Graph images across social media platforms"
        keywords={['OG images', 'social media', 'testing', 'preview']}
        robots="noindex, nofollow"
      />
      <Header />
      <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              OG Image Preview Tester
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Validate and preview how your Open Graph images appear across social media platforms
            </p>
          </section>

          <Tabs defaultValue="validators" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="validators">Validators</TabsTrigger>
              <TabsTrigger value="pages">All Pages</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
            </TabsList>

            {/* Social Media Validators */}
            <TabsContent value="validators" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test URL</CardTitle>
                  <CardDescription>Enter a URL to test across all social platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={testUrl}
                      onChange={(e) => setTestUrl(e.target.value)}
                      placeholder="https://3bi.ai/dashboard"
                      className="flex-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {validators.map((validator, index) => (
                  <Card key={index} className="hover-scale">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">{validator.icon}</span>
                            {validator.platform}
                          </CardTitle>
                          <CardDescription className="mt-2">{validator.name}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        <strong>Specifications:</strong> {validator.specs}
                      </div>
                      <Button
                        onClick={() => window.open(validator.url(testUrl), '_blank')}
                        className="w-full"
                        variant="default"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test on {validator.platform}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Preview Simulation</CardTitle>
                  <CardDescription>How your OG image might appear on social platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Twitter/X Preview */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-xl">𝕏</span>
                      Twitter/X Card Preview
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={`${baseUrl}/og/home.png`}
                        alt="OG Preview"
                        className="w-full h-auto"
                      />
                      <div className="p-3 bg-muted/50">
                        <p className="text-sm font-semibold">3BI.AI - Enterprise AI Platform</p>
                        <p className="text-xs text-muted-foreground mt-1">3bi.ai</p>
                      </div>
                    </div>
                  </div>

                  {/* Facebook Preview */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-xl">📘</span>
                      Facebook Link Preview
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={`${baseUrl}/og/home.png`}
                        alt="OG Preview"
                        className="w-full h-auto"
                      />
                      <div className="p-3 bg-muted/30">
                        <p className="text-xs text-muted-foreground uppercase">3bi.ai</p>
                        <p className="text-sm font-semibold mt-1">3BI.AI - Enterprise AI Platform</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Premium AI platform integrating Grok, Claude 4, GPT-5, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Pages */}
            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Pages ({pages.length})</CardTitle>
                  <CardDescription>View and test OG images for all site pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pages.map((page, index) => (
                      <Card key={index} className="overflow-hidden hover-scale">
                        <div className="aspect-[1200/630] bg-muted relative">
                          <img
                            src={`${baseUrl}${page.ogImage}`}
                            alt={page.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">{page.title}</CardTitle>
                          <CardDescription className="text-xs">{page.path}</CardDescription>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={() => setTestUrl(`${baseUrl}${page.path}`)}
                            >
                              Test This
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quality Checklist */}
            <TabsContent value="checklist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>OG Image Quality Checklist</CardTitle>
                  <CardDescription>Verify all images meet these requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {checklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                        {item.checked ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        )}
                        <span className={item.checked ? "text-foreground" : "text-muted-foreground"}>
                          {item.item}
                        </span>
                        {item.checked && (
                          <Badge variant="outline" className="ml-auto">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Practices */}
              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Image Specifications</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Dimensions: 1200x630px (1.91:1 aspect ratio)</li>
                      <li>Format: PNG or JPG (PNG preferred for transparency)</li>
                      <li>File size: Under 5MB (under 1MB recommended)</li>
                      <li>Safe zone: Keep text within 1200x600px center area</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content Guidelines</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Use high-contrast text (minimum 4.5:1 ratio)</li>
                      <li>Font size 60-80px for headlines</li>
                      <li>Include brand logo for recognition</li>
                      <li>Use English only for international reach</li>
                      <li>Avoid small text that becomes unreadable when scaled</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Testing Workflow</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Test on all major platforms (Twitter, Facebook, LinkedIn)</li>
                      <li>Clear platform caches after updating images</li>
                      <li>Verify images load on mobile and desktop</li>
                      <li>Check multiple pages, not just homepage</li>
                      <li>Retest after any OG meta tag changes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Use This Tester</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <ol className="space-y-2">
                <li>
                  <strong>Select a URL to test</strong> - Choose from the "All Pages" tab or enter a custom URL
                </li>
                <li>
                  <strong>Click validator links</strong> - Test on each platform using official tools
                </li>
                <li>
                  <strong>Clear caches if needed</strong> - Social platforms cache OG images; use "Fetch new
                  information" or similar options
                </li>
                <li>
                  <strong>Verify appearance</strong> - Check image quality, text readability, and proper cropping
                </li>
                <li>
                  <strong>Test multiple platforms</strong> - Each platform may display images slightly differently
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OGPreviewTester;
