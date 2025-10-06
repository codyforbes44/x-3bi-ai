import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface APITesterProps {
  endpoints: Array<{
    value: string;
    label: string;
    method: string;
    functionName: string;
  }>;
}

export function APITester({ endpoints }: APITesterProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [requestBody, setRequestBody] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    if (!selectedEndpoint) {
      toast.error("Please select an endpoint");
      return;
    }

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const endpoint = endpoints.find(e => e.value === selectedEndpoint);
      if (!endpoint) return;

      const body = JSON.parse(requestBody);
      
      const { data, error: invokeError } = await supabase.functions.invoke(
        endpoint.functionName,
        { body }
      );

      if (invokeError) throw invokeError;

      setResponse(data);
      toast.success("API call successful");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error("API call failed");
    } finally {
      setLoading(false);
    }
  };

  const currentEndpoint = endpoints.find(e => e.value === selectedEndpoint);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" />
          Interactive API Tester
        </CardTitle>
        <CardDescription>
          Test our APIs directly from the documentation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Endpoint Selection */}
        <div className="space-y-2">
          <Label>Select Endpoint</Label>
          <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an API endpoint" />
            </SelectTrigger>
            <SelectContent>
              {endpoints.map((endpoint) => (
                <SelectItem key={endpoint.value} value={endpoint.value}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {endpoint.method}
                    </Badge>
                    {endpoint.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Request Body */}
        <div className="space-y-2">
          <Label>Request Body (JSON)</Label>
          <Textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder='{"message": "Your input here"}'
            className="font-mono text-sm"
            rows={6}
          />
        </div>

        {/* Test Button */}
        <Button
          onClick={handleTest}
          disabled={loading || !selectedEndpoint}
          className="w-full bg-gradient-hero text-white"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Testing API...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Test API Call
            </>
          )}
        </Button>

        {/* Response */}
        {(response || error) && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {error ? (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <Label className="text-destructive">Error Response</Label>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <Label className="text-green-500">Success Response</Label>
                </>
              )}
            </div>
            <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap">
                {error || JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Endpoint Info */}
        {currentEndpoint && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Endpoint:</strong> POST /functions/v1/{currentEndpoint.functionName}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Method:</strong> {currentEndpoint.method}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
