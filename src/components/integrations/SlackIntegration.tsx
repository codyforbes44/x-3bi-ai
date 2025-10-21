import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function SlackIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast.error("Please enter your Slack webhook URL");
      return;
    }

    if (!message) {
      toast.error("Please enter a message");
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
          text: message,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: message,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Sent from ${window.location.origin} at ${new Date().toLocaleString()}`,
                },
              ],
            },
          ],
        }),
      });

      toast.success("Message sent to Slack!");
      setMessage("");
    } catch (error) {
      console.error("Error sending to Slack:", error);
      toast.error("Failed to send message. Please check your webhook URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          Slack Integration
        </CardTitle>
        <CardDescription>
          Send messages directly to your Slack workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              type="url"
              placeholder="https://hooks.slack.com/services/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Create an Incoming Webhook in your Slack workspace settings
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Sending..." : "Send to Slack"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
