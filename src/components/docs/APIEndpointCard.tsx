import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Play } from "lucide-react";
import { toast } from "sonner";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface APIEndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  title: string;
  description: string;
  category: string;
  parameters?: Parameter[];
  requestExample: {
    curl: string;
    javascript: string;
    python: string;
  };
  responseExample: string;
  onTest?: () => void;
}

export function APIEndpointCard({
  method,
  endpoint,
  title,
  description,
  category,
  parameters = [],
  requestExample,
  responseExample,
  onTest
}: APIEndpointCardProps) {
  const methodColors = {
    GET: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    POST: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    PUT: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
    DELETE: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    PATCH: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={methodColors[method]}>{method}</Badge>
              <code className="text-sm font-mono bg-muted px-3 py-1 rounded">
                {endpoint}
              </code>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            {onTest && (
              <Button size="sm" variant="outline" onClick={onTest}>
                <Play className="w-4 h-4 mr-1" />
                Test
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Parameters */}
        {parameters.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Parameters</h4>
            <div className="space-y-3">
              {parameters.map((param, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm font-mono">{param.name}</code>
                    <Badge variant="outline" className="text-xs">
                      {param.type}
                    </Badge>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{param.description}</p>
                  {param.example && (
                    <div className="mt-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        Example: {param.example}
                      </code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Examples */}
        <div>
          <h4 className="font-semibold mb-3">Request Examples</h4>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>

            <TabsContent value="curl" className="mt-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{requestExample.curl}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(requestExample.curl)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="javascript" className="mt-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{requestExample.javascript}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(requestExample.javascript)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="python" className="mt-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{requestExample.python}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(requestExample.python)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Response Example */}
        <div>
          <h4 className="font-semibold mb-3">Response Example</h4>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{responseExample}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(responseExample)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
