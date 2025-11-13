import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Code2, FileCode } from "lucide-react";

export function SDKDocumentation() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Official SDKs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover-scale cursor-pointer">
            <Terminal className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">JavaScript SDK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Full-featured SDK for Node.js and browser environments
            </p>
            <Badge variant="secondary">npm install @3bi/sdk</Badge>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer">
            <Code2 className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Python SDK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pythonic interface for all 3BI.AI capabilities
            </p>
            <Badge variant="secondary">pip install 3bi-ai</Badge>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer">
            <FileCode className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">REST API</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Direct HTTP access for any programming language
            </p>
            <Badge variant="secondary">api.3bi.ai</Badge>
          </Card>
        </div>
      </div>
    </section>
  );
}
