import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Code2, BarChart3, Code, Rocket, Volume2, FileText, Download } from "lucide-react";
import WebScraper from "@/components/WebScraper";
import AIArchitect from "@/components/AIArchitect";
import AIInsights from "@/components/AIInsights";
import AICodeAssistant from "@/components/AICodeAssistant";
import DeploypadIntegration from "@/components/DeploypadIntegration";
import VoiceHistory from "@/components/VoiceHistory";
import TemplateLibrary from "@/components/TemplateLibrary";
import ExportCenter from "@/components/ExportCenter";

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

      <TabsContent value="voice-history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-cyan-500" />
              Voice History
              <Badge variant="secondary">Library</Badge>
            </CardTitle>
            <CardDescription>
              Manage, replay, and download all your voice recordings and generated audio.
            </CardDescription>
          </CardHeader>
        </Card>
        <VoiceHistory />
      </TabsContent>

      <TabsContent value="templates" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Template Library
              <Badge variant="secondary">Templates</Badge>
            </CardTitle>
            <CardDescription>
              Pre-built prompts for common AI tasks - copy, customize, and use across all features.
            </CardDescription>
          </CardHeader>
        </Card>
        <TemplateLibrary />
      </TabsContent>

      <TabsContent value="export" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-gray-500" />
              Export Center
              <Badge variant="secondary">Data</Badge>
            </CardTitle>
            <CardDescription>
              Export all your AI-generated content in JSON, Markdown, or CSV formats.
            </CardDescription>
          </CardHeader>
        </Card>
        <ExportCenter />
      </TabsContent>
    </>
  );
};

export default UtilitiesSection;