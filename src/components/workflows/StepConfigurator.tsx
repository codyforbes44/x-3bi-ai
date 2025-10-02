import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface StepConfiguratorProps {
  stepType: string;
  config: any;
  onChange: (config: any) => void;
}

export const StepConfigurator = ({ stepType, config, onChange }: StepConfiguratorProps) => {
  const [localConfig, setLocalConfig] = useState(config || {});

  const updateConfig = (updates: any) => {
    const newConfig = { ...localConfig, ...updates };
    setLocalConfig(newConfig);
    onChange(newConfig);
  };

  const renderZapierWebhookConfig = () => (
    <div className="space-y-4">
      <div>
        <Label>Zapier Webhook URL</Label>
        <Input
          placeholder="https://hooks.zapier.com/hooks/catch/..."
          value={localConfig.webhook_url || ''}
          onChange={(e) => updateConfig({ webhook_url: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Create a "Catch Hook" trigger in Zapier and paste the webhook URL here
        </p>
      </div>
    </div>
  );

  const renderExtractDataConfig = () => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Fields to Extract</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const fields = localConfig.fields || [];
              fields.push({ name: '', path: '', default_value: '' });
              updateConfig({ fields });
            }}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Field
          </Button>
        </div>
        {(localConfig.fields || []).map((field: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <Input
              className="col-span-4"
              placeholder="Field name"
              value={field.name}
              onChange={(e) => {
                const fields = [...localConfig.fields];
                fields[index].name = e.target.value;
                updateConfig({ fields });
              }}
            />
            <Input
              className="col-span-4"
              placeholder="Path (e.g., data.user.email)"
              value={field.path}
              onChange={(e) => {
                const fields = [...localConfig.fields];
                fields[index].path = e.target.value;
                updateConfig({ fields });
              }}
            />
            <Input
              className="col-span-3"
              placeholder="Default value"
              value={field.default_value}
              onChange={(e) => {
                const fields = [...localConfig.fields];
                fields[index].default_value = e.target.value;
                updateConfig({ fields });
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="col-span-1"
              onClick={() => {
                const fields = localConfig.fields.filter((_: any, i: number) => i !== index);
                updateConfig({ fields });
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFilterDataConfig = () => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Filter Rules</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const rules = localConfig.rules || [];
              rules.push({ field: '', operator: 'equals', value: '' });
              updateConfig({ rules });
            }}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Rule
          </Button>
        </div>
        {(localConfig.rules || []).map((rule: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <Input
              className="col-span-4"
              placeholder="Field path"
              value={rule.field}
              onChange={(e) => {
                const rules = [...localConfig.rules];
                rules[index].field = e.target.value;
                updateConfig({ rules });
              }}
            />
            <Select
              value={rule.operator}
              onValueChange={(value) => {
                const rules = [...localConfig.rules];
                rules[index].operator = value;
                updateConfig({ rules });
              }}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="not_equals">Not Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="greater_than">Greater Than</SelectItem>
                <SelectItem value="less_than">Less Than</SelectItem>
                <SelectItem value="exists">Exists</SelectItem>
                <SelectItem value="not_exists">Not Exists</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="col-span-3"
              placeholder="Value"
              value={rule.value}
              onChange={(e) => {
                const rules = [...localConfig.rules];
                rules[index].value = e.target.value;
                updateConfig({ rules });
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="col-span-1"
              onClick={() => {
                const rules = localConfig.rules.filter((_: any, i: number) => i !== index);
                updateConfig({ rules });
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMapDataConfig = () => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Field Mappings</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const mappings = localConfig.mappings || [];
              mappings.push({ source: '', target: '', transform: null });
              updateConfig({ mappings });
            }}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Mapping
          </Button>
        </div>
        {(localConfig.mappings || []).map((mapping: any, index: number) => (
          <div key={index} className="space-y-2 p-3 border rounded-lg mb-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Source Field</Label>
                <Input
                  placeholder="source.field.path"
                  value={mapping.source}
                  onChange={(e) => {
                    const mappings = [...localConfig.mappings];
                    mappings[index].source = e.target.value;
                    updateConfig({ mappings });
                  }}
                />
              </div>
              <div>
                <Label className="text-xs">Target Field</Label>
                <Input
                  placeholder="target_field_name"
                  value={mapping.target}
                  onChange={(e) => {
                    const mappings = [...localConfig.mappings];
                    mappings[index].target = e.target.value;
                    updateConfig({ mappings });
                  }}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Transform (Optional)</Label>
              <Select
                value={mapping.transform?.type || 'none'}
                onValueChange={(value) => {
                  const mappings = [...localConfig.mappings];
                  mappings[index].transform = value === 'none' ? null : { type: value };
                  updateConfig({ mappings });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Transform</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="trim">Trim</SelectItem>
                  <SelectItem value="number">To Number</SelectItem>
                  <SelectItem value="string">To String</SelectItem>
                  <SelectItem value="date">To ISO Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                const mappings = localConfig.mappings.filter((_: any, i: number) => i !== index);
                updateConfig({ mappings });
              }}
            >
              <Trash2 className="w-3 h-3 mr-1" /> Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAggregateDataConfig = () => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Aggregations</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const aggregations = localConfig.aggregations || [];
              aggregations.push({ name: '', field: '', operation: 'count' });
              updateConfig({ aggregations });
            }}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Aggregation
          </Button>
        </div>
        {(localConfig.aggregations || []).map((agg: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <Input
              className="col-span-4"
              placeholder="Result name"
              value={agg.name}
              onChange={(e) => {
                const aggregations = [...localConfig.aggregations];
                aggregations[index].name = e.target.value;
                updateConfig({ aggregations });
              }}
            />
            <Select
              value={agg.operation}
              onValueChange={(value) => {
                const aggregations = [...localConfig.aggregations];
                aggregations[index].operation = value;
                updateConfig({ aggregations });
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="avg">Average</SelectItem>
                <SelectItem value="min">Minimum</SelectItem>
                <SelectItem value="max">Maximum</SelectItem>
                <SelectItem value="unique">Unique</SelectItem>
                <SelectItem value="concat">Concatenate</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="col-span-4"
              placeholder="Field path"
              value={agg.field}
              onChange={(e) => {
                const aggregations = [...localConfig.aggregations];
                aggregations[index].field = e.target.value;
                updateConfig({ aggregations });
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="col-span-1"
              onClick={() => {
                const aggregations = localConfig.aggregations.filter((_: any, i: number) => i !== index);
                updateConfig({ aggregations });
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHttpRequestConfig = () => (
    <div className="space-y-4">
      <div>
        <Label>URL</Label>
        <Input
          placeholder="https://api.example.com/endpoint"
          value={localConfig.url || ''}
          onChange={(e) => updateConfig({ url: e.target.value })}
        />
      </div>
      <div>
        <Label>Method</Label>
        <Select value={localConfig.method || 'GET'} onValueChange={(value) => updateConfig({ method: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Headers (JSON)</Label>
        <Textarea
          placeholder='{"Content-Type": "application/json"}'
          value={JSON.stringify(localConfig.headers || {}, null, 2)}
          onChange={(e) => {
            try {
              const headers = JSON.parse(e.target.value);
              updateConfig({ headers });
            } catch (err) {
              // Invalid JSON, don't update
            }
          }}
        />
      </div>
    </div>
  );

  const renderDelayConfig = () => (
    <div className="space-y-4">
      <div>
        <Label>Delay (milliseconds)</Label>
        <Input
          type="number"
          placeholder="1000"
          value={localConfig.delay_ms || ''}
          onChange={(e) => updateConfig({ delay_ms: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );

  switch (stepType) {
    case 'zapier_webhook':
      return renderZapierWebhookConfig();
    case 'extract_data':
      return renderExtractDataConfig();
    case 'filter_data':
      return renderFilterDataConfig();
    case 'map_data':
      return renderMapDataConfig();
    case 'aggregate_data':
      return renderAggregateDataConfig();
    case 'http_request':
      return renderHttpRequestConfig();
    case 'delay':
      return renderDelayConfig();
    default:
      return (
        <div className="text-sm text-muted-foreground">
          Configuration for {stepType} coming soon...
        </div>
      );
  }
};
