import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Code2, BarChart3, Code, Rocket } from "lucide-react";
import WebScraper from "@/components/WebScraper";
import AIArchitect from "@/components/AIArchitect";
import AIInsights from "@/components/AIInsights";
import AICodeAssistant from "@/components/AICodeAssistant";
import DeploypadIntegration from "@/components/DeploypadIntegration";

const UtilitiesSection = () => {
  return (
    <>
      <TabsContent value="scraper" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-500" />
              Advanced Web Scraper
              <Badge variant="secondary">Data Extraction</Badge>
            </CardTitle>
            <CardDescription>
              Extract and analyze data from any website with AI-powered content analysis and structured data output.
            </CardDescription>
          </CardHeader>
        </Card>
        <WebScraper />
      </TabsContent>

      <TabsContent value="architect" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-500" />
              AI Code Architect
              <Badge variant="secondary">GPT-4o</Badge>
            </CardTitle>
            <CardDescription>
              Generate complete, production-ready applications and components with advanced AI architecture.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIArchitect />
      </TabsContent>

      <TabsContent value="insights" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              AI Insights Engine
              <Badge variant="secondary">Analytics AI</Badge>
            </CardTitle>
            <CardDescription>
              Advanced data analytics, predictions, and business intelligence powered by AI.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIInsights />
      </TabsContent>

      <TabsContent value="code" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-orange-500" />
              AI Code Assistant
              <Badge variant="secondary">Code AI</Badge>
            </CardTitle>
            <CardDescription>
              Get help with code explanation, optimization, debugging, and language conversion using advanced AI.
            </CardDescription>
          </CardHeader>
        </Card>
        <AICodeAssistant />
      </TabsContent>

      <TabsContent value="deploy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-500" />
              Deploypad Integration
              <Badge variant="secondary">Deploy</Badge>
            </CardTitle>
            <CardDescription>
              Deploy your Lovable projects to Deploypad with one click. Automatic builds, custom domains, and production hosting.
            </CardDescription>
          </CardHeader>
        </Card>
        <DeploypadIntegration />
      </TabsContent>
    </>
  );
};

export default UtilitiesSection;