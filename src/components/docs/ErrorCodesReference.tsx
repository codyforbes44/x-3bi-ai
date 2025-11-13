import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const errorCodes = [
  { code: "400", message: "Bad Request", description: "Invalid request parameters or malformed JSON" },
  { code: "401", message: "Unauthorized", description: "Missing or invalid API key" },
  { code: "403", message: "Forbidden", description: "API key doesn't have access to this resource" },
  { code: "404", message: "Not Found", description: "Endpoint does not exist" },
  { code: "429", message: "Too Many Requests", description: "Rate limit exceeded" },
  { code: "500", message: "Internal Server Error", description: "Server error, please try again" },
  { code: "503", message: "Service Unavailable", description: "Service temporarily unavailable" }
];

export function ErrorCodesReference() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Error Codes Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {errorCodes.map((error, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {error.code}
                </Badge>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{error.message}</h4>
                  <p className="text-sm text-muted-foreground">{error.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
