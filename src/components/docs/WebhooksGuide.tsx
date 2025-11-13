import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Webhook, CheckCircle2 } from "lucide-react";

export function WebhooksGuide() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Webhooks</h2>
        <Card className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <Webhook className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Event Notifications</h3>
              <p className="text-muted-foreground">
                Receive real-time notifications when events occur in your account. Configure webhook endpoints to handle events programmatically.
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="setup">
              <AccordionTrigger>Setting Up Webhooks</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Configure your webhook endpoint URL in the dashboard to start receiving events.
                  </p>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                    <code>{`POST https://your-domain.com/webhooks
Content-Type: application/json

{
  "event": "api.request.completed",
  "timestamp": "2025-01-01T12:00:00Z",
  "data": {
    "endpoint": "/v1/ai-chat",
    "status": "success"
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="events">
              <AccordionTrigger>Available Events</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-4">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <code>api.request.completed</code> - API request finished
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <code>api.request.failed</code> - API request failed
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <code>quota.limit.reached</code> - Rate limit reached
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <code>api.key.rotated</code> - API key was rotated
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger>Webhook Security</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-4">
                  <p className="text-sm text-muted-foreground">
                    All webhook payloads are signed with your webhook secret. Verify the signature to ensure authenticity.
                  </p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    <code>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return hash === signature;
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </section>
  );
}
