import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Copy, 
  Check, 
  Code, 
  MessageSquare, 
  Image, 
  FileText,
  Sparkles,
  Briefcase,
  Mail,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  icon: any;
  color: string;
  tags: string[];
}

const templates: Template[] = [
  // Code Templates
  {
    id: "react-component",
    title: "React Component Generator",
    description: "Generate a complete React component with TypeScript",
    category: "code",
    prompt: "Create a React component with TypeScript that includes:\n- Props interface\n- State management with useState\n- Proper TypeScript types\n- Clean, reusable code\n\nComponent name: [YOUR_COMPONENT_NAME]\nPurpose: [DESCRIBE_PURPOSE]",
    icon: Code,
    color: "text-blue-500",
    tags: ["react", "typescript", "component"]
  },
  {
    id: "api-endpoint",
    title: "API Endpoint Design",
    description: "Design RESTful API endpoints with documentation",
    category: "code",
    prompt: "Design a RESTful API endpoint for [RESOURCE_NAME] that includes:\n- HTTP methods (GET, POST, PUT, DELETE)\n- Request/response schemas\n- Error handling\n- Authentication requirements\n- Example requests and responses",
    icon: Code,
    color: "text-green-500",
    tags: ["api", "rest", "backend"]
  },
  
  // Content Templates
  {
    id: "blog-post",
    title: "Blog Post Writer",
    description: "Create engaging blog posts with SEO optimization",
    category: "content",
    prompt: "Write a comprehensive blog post about [TOPIC] that includes:\n- Catchy headline\n- Introduction with hook\n- 3-5 main sections with subheadings\n- Practical examples or case studies\n- Conclusion with call-to-action\n- Meta description (150 characters)\n- Target length: 1500-2000 words",
    icon: FileText,
    color: "text-purple-500",
    tags: ["writing", "seo", "content"]
  },
  {
    id: "social-media",
    title: "Social Media Campaign",
    description: "Generate social media content for multiple platforms",
    category: "content",
    prompt: "Create a social media campaign for [PRODUCT/SERVICE] including:\n- 5 Twitter posts (280 chars each)\n- 3 LinkedIn posts (professional tone)\n- 2 Instagram captions with emoji\n- Relevant hashtags for each platform\n- Best posting times\n\nTarget audience: [DESCRIBE_AUDIENCE]",
    icon: MessageSquare,
    color: "text-pink-500",
    tags: ["social", "marketing", "content"]
  },

  // Image Prompts
  {
    id: "product-photo",
    title: "Product Photography Prompt",
    description: "Generate prompts for product images",
    category: "image",
    prompt: "Professional product photography for [PRODUCT_NAME]:\n- Studio lighting setup\n- Clean white background\n- Multiple angles (front, side, detail shots)\n- Highlight key features\n- Commercial quality\n- High resolution, sharp focus",
    icon: Image,
    color: "text-orange-500",
    tags: ["product", "photography", "commercial"]
  },
  {
    id: "illustration",
    title: "Illustration Concept",
    description: "Create detailed illustration prompts",
    category: "image",
    prompt: "Create an illustration of [SUBJECT] with:\n- Art style: [modern/vintage/minimalist/detailed]\n- Color palette: [describe colors]\n- Mood: [energetic/calm/dramatic/playful]\n- Composition: [centered/dynamic/asymmetric]\n- Details: [specific elements to include]",
    icon: Image,
    color: "text-cyan-500",
    tags: ["illustration", "art", "design"]
  },

  // Business Templates
  {
    id: "business-plan",
    title: "Business Plan Section",
    description: "Write comprehensive business plan sections",
    category: "business",
    prompt: "Write a business plan section for [COMPANY_NAME]:\n\nSection: [Executive Summary/Market Analysis/Financial Projections]\n\nInclude:\n- Clear objectives\n- Market research data\n- Competitive analysis\n- Financial projections\n- Risk assessment\n- Growth strategy",
    icon: Briefcase,
    color: "text-indigo-500",
    tags: ["business", "planning", "strategy"]
  },
  {
    id: "email-campaign",
    title: "Email Marketing Campaign",
    description: "Design effective email marketing sequences",
    category: "business",
    prompt: "Create an email marketing campaign for [PRODUCT/SERVICE]:\n\nSequence:\n1. Welcome email\n2. Value demonstration\n3. Social proof\n4. Special offer\n5. Last chance\n\nEach email should include:\n- Subject line (< 50 chars)\n- Preview text\n- Personalized greeting\n- Clear CTA\n- Mobile-optimized format",
    icon: Mail,
    color: "text-red-500",
    tags: ["email", "marketing", "automation"]
  },

  // Education Templates
  {
    id: "tutorial",
    title: "Tutorial Creator",
    description: "Create step-by-step tutorials",
    category: "education",
    prompt: "Create a comprehensive tutorial on [TOPIC]:\n\n- Prerequisites\n- Learning objectives\n- Step-by-step instructions\n- Code examples (if applicable)\n- Common pitfalls to avoid\n- Practice exercises\n- Additional resources\n\nTarget audience: [beginner/intermediate/advanced]",
    icon: GraduationCap,
    color: "text-yellow-500",
    tags: ["tutorial", "education", "learning"]
  }
];

export default function TemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "code", "content", "image", "business", "education"];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyTemplate = async (template: Template) => {
    await navigator.clipboard.writeText(template.prompt);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Template copied to clipboard');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Pre-built prompts for common AI tasks - copy and customize
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-6">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-primary/10`}>
                        <template.icon className={`w-4 h-4 ${template.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => copyTemplate(template)}
                  >
                    {copiedId === template.id ? (
                      <>
                        <Check className="mr-2 h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-3 w-3" />
                        Copy Template
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No templates found</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
