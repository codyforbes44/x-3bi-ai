import { Card } from "@/components/ui/card";

export function RateLimitGuide() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Rate Limits & Quotas</h2>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,000</div>
              <p className="text-sm text-muted-foreground">Requests/hour (Free)</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000</div>
              <p className="text-sm text-muted-foreground">Requests/hour (Pro)</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Unlimited</div>
              <p className="text-sm text-muted-foreground">Requests (Enterprise)</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Rate Limit Headers</h4>
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000`}</code>
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
}
