import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";

const codeExample = `// Initialize 3BI.AI
import { ThreeBIAI } from '@3bi/sdk';

const ai = new ThreeBIAI({
  apiKey: 'your-api-key'
});

// Generate a chat response
const response = await ai.chat({
  model: 'claude-sonnet-4',
  message: 'Explain quantum computing',
  maxTokens: 500
});

console.log(response.text);`;

export function CodeExamples() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Quick Example</h2>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="javascript">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-semibold">JavaScript SDK</span>
                </div>
                <Badge variant="secondary">npm install @3bi/sdk</Badge>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{codeExample}</code>
              </pre>
            </Card>
          </TabsContent>
          
          <TabsContent value="python">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Python SDK</span>
                </div>
                <Badge variant="secondary">pip install 3bi-ai</Badge>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{`# Initialize 3BI.AI
from threebiai import ThreeBIAI

ai = ThreeBIAI(api_key='your-api-key')

# Generate a chat response
response = ai.chat(
    model='claude-sonnet-4',
    message='Explain quantum computing',
    max_tokens=500
)

print(response.text)`}</code>
              </pre>
            </Card>
          </TabsContent>
          
          <TabsContent value="curl">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="font-semibold">REST API</span>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{`curl -X POST https://api.3bi.ai/v1/chat \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4",
    "message": "Explain quantum computing",
    "max_tokens": 500
  }'`}</code>
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
