import { Card } from "@/components/ui/card";
import { Key, Lock, CheckCircle2 } from "lucide-react";

export function AuthenticationGuide() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Authentication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Key className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-4">API Keys</h3>
            <p className="text-muted-foreground mb-4">
              All API requests require authentication using an API key. Include your key in the Authorization header.
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </Card>

          <Card className="p-6">
            <Lock className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-4">Security Best Practices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Never expose API keys in client-side code
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Rotate keys regularly for enhanced security
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Use environment variables to store keys
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Monitor API usage for suspicious activity
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
