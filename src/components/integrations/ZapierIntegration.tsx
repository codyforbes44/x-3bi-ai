import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Zap, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function ZapierIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [testData, setTestData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast.error("Please enter your Zapier webhook URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          custom_data: testData ? JSON.parse(testData) : {},
        }),
      });

      toast.success("Request sent to Zapier! Check your Zap history to confirm.");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast.error("Failed to trigger Zapier webhook. Please check the URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          Zapier Integration
        </CardTitle>
        <CardDescription>
          Connect to thousands of apps with Zapier webhooks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrigger} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Create a Zap with a "Webhook" trigger and paste the URL here
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-data">Test Data (JSON)</Label>
            <Textarea
              id="test-data"
              placeholder='{"key": "value"}'
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Sending..." : "Trigger Zapier Webhook"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
