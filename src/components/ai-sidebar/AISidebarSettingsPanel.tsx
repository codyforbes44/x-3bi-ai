import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAISettings } from '@/hooks/useAISettings';
import { GROK_MODELS } from '@/config/grok';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AISidebarSettingsPanel() {
  const { settings, saveSettings } = useAISettings();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Quick Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Context Awareness</Label>
            <Switch
              checked={settings.contextAwarenessEnabled}
              onCheckedChange={(checked) => saveSettings({ contextAwarenessEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Smart Suggestions</Label>
            <Switch
              checked={settings.suggestionsEnabled}
              onCheckedChange={(checked) => saveSettings({ suggestionsEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Voice Input</Label>
            <Switch
              checked={settings.voiceInputEnabled}
              onCheckedChange={(checked) => saveSettings({ voiceInputEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Voice Output</Label>
            <Switch
              checked={settings.voiceOutputEnabled}
              onCheckedChange={(checked) => saveSettings({ voiceOutputEnabled: checked })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm">Default Model</Label>
        <Select
          value={settings.defaultModel}
          onValueChange={(value) => saveSettings({ defaultModel: value as any })}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GROK_MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm">Sidebar Position</Label>
        <Select
          value={settings.sidebarPosition}
          onValueChange={(value) => saveSettings({ sidebarPosition: value as any })}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left Side</SelectItem>
            <SelectItem value="right">Right Side</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <Button variant="outline" className="w-full" size="sm" asChild>
        <Link to="/settings/ai">
          <ExternalLink className="h-4 w-4 mr-2" />
          All Settings
        </Link>
      </Button>
    </div>
  );
}
