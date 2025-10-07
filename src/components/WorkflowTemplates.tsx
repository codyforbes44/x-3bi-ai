import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, Play, Copy, CheckCircle2, Mail, FileText, Image, Code, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface WorkflowStep {
  type: string;
  label: string;
  config: any;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  steps: WorkflowStep[];
  triggers: string[];
}

const templates: WorkflowTemplate[] = [
  {
    id: "content-pipeline",
    name: "Content Creation Pipeline",
    description: "Generate blog post → Create images → Schedule social media",
    category: "content",
    icon: FileText,
    color: "text-blue-500",
    steps: [
      { type: "ai-text", label: "Generate Blog Post", config: { model: "gpt-5" } },
      { type: "ai-image", label: "Create Feature Image", config: { model: "gpt-image-1" } },
      { type: "transform", label: "Extract Summary", config: { action: "summarize" } },
      { type: "webhook", label: "Post to CMS", config: { method: "POST" } }
    ],
    triggers: ["manual", "schedule"]
  },
  {
    id: "email-automation",
    name: "Email Campaign Automation",
    description: "User signup → Send welcome → Track engagement → Follow-up",
    category: "marketing",
    icon: Mail,
    color: "text-purple-500",
    steps: [
      { type: "trigger", label: "New User Signup", config: { event: "user.created" } },
      { type: "ai-text", label: "Personalize Email", config: { template: "welcome" } },
      { type: "email", label: "Send Welcome Email", config: { provider: "resend" } },
      { type: "delay", label: "Wait 2 Days", config: { duration: "2d" } },
      { type: "condition", label: "Check Engagement", config: { metric: "email_opened" } },
      { type: "ai-text", label: "Generate Follow-up", config: { model: "gpt-5" } },
      { type: "email", label: "Send Follow-up", config: {} }
    ],
    triggers: ["webhook", "database"]
  },
  {
    id: "code-review",
    name: "Automated Code Review",
    description: "PR created → Analyze code → Security scan → Post review",
    category: "development",
    icon: Code,
    color: "text-green-500",
    steps: [
      { type: "trigger", label: "PR Created", config: { event: "pull_request" } },
      { type: "ai-code", label: "Code Analysis", config: { checks: ["quality", "security"] } },
      { type: "condition", label: "Check Issues Found", config: {} },
      { type: "ai-text", label: "Generate Review", config: { model: "claude-opus-4" } },
      { type: "webhook", label: "Post Comment", config: { platform: "github" } }
    ],
    triggers: ["webhook"]
  },
  {
    id: "social-amplifier",
    name: "Social Media Amplifier",
    description: "Blog post → Generate variants → Schedule posts → Monitor",
    category: "marketing",
    icon: MessageSquare,
    color: "text-pink-500",
    steps: [
      { type: "trigger", label: "New Blog Post", config: { source: "cms" } },
      { type: "ai-text", label: "Create Twitter Thread", config: { platform: "twitter" } },
      { type: "ai-text", label: "Create LinkedIn Post", config: { platform: "linkedin" } },
      { type: "ai-image", label: "Generate Social Card", config: {} },
      { type: "webhook", label: "Schedule Posts", config: { tool: "buffer" } }
    ],
    triggers: ["webhook", "schedule"]
  },
  {
    id: "image-pipeline",
    name: "Batch Image Processing",
    description: "Generate multiple variations → Apply filters → Optimize",
    category: "media",
    icon: Image,
    color: "text-orange-500",
    steps: [
      { type: "ai-image", label: "Generate Base Image", config: { n: 1 } },
      { type: "loop", label: "Create Variations", config: { count: 4 } },
      { type: "transform", label: "Resize Images", config: { sizes: ["1920x1080", "1024x1024"] } },
      { type: "webhook", label: "Upload to Storage", config: { provider: "s3" } }
    ],
    triggers: ["manual", "api"]
  }
];

export default function WorkflowTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyWorkflow = async (template: WorkflowTemplate) => {
    const workflowJson = JSON.stringify(template, null, 2);
    await navigator.clipboard.writeText(workflowJson);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Workflow copied to clipboard');
  };

  const activateWorkflow = (template: WorkflowTemplate) => {
    // Save to workflow builder
    localStorage.setItem('activeWorkflow', JSON.stringify(template));
    toast.success(`Workflow "${template.name}" activated!`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Pre-built automation workflows you can customize and deploy
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Template List */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <template.icon className={`w-5 h-5 ${template.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {template.triggers.map(trigger => (
                            <Badge key={trigger} variant="secondary" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.steps.length} steps
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Template Details */}
          <div>
            {selectedTemplate ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-base">Workflow Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {selectedTemplate.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{step.label}</p>
                            <p className="text-xs text-muted-foreground">{step.type}</p>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="space-y-2 pt-4 border-t">
                    <Button
                      onClick={() => activateWorkflow(selectedTemplate)}
                      className="w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Activate Workflow
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => copyWorkflow(selectedTemplate)}
                      className="w-full"
                    >
                      {copiedId === selectedTemplate.id ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy JSON
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a template to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
