import { Card } from "@/components/ui/card";

export function RateLimitGuide() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Usage Guidelines</h2>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Unlimited</div>
              <p className="text-sm text-muted-foreground">API Requests</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">27</div>
              <p className="text-sm text-muted-foreground">Free Features</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="text-sm text-muted-foreground">Free Models</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Fair Use Policy</h4>
            <p className="text-sm text-muted-foreground mb-4">
              All features are completely free with generous usage limits to ensure fair access for everyone. 
              We implement rate limiting only to prevent abuse and maintain service quality.
            </p>
            <p className="text-sm text-muted-foreground">
              If you need higher limits for enterprise use, please contact our support team.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
