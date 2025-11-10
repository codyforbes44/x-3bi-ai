import { useState } from 'react';
import { Settings, Sparkles, Eye, Zap, Shield, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAISettings } from '@/hooks/useAISettings';
import { AVAILABLE_MODELS, VOICE_OPTIONS, VOICE_MODELS } from '@/types/aiSettings';
import { useToast } from '@/hooks/use-toast';

export function UnifiedAISettings() {
  const { settings, saveSettings, resetSettings, isSyncing } = useAISettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('model');

  const handleSave = async (updates: any) => {
    await saveSettings(updates);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="w-8 h-8" />
            AI Assistant Settings
          </h2>
          <p className="text-muted-foreground mt-2">
            Configure both browser extension and in-app AI interfaces
          </p>
        </div>
        <Button
          variant="outline"
          onClick={resetSettings}
          disabled={isSyncing}
        >
          Reset to Defaults
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="model" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Model
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Behavior
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Model Configuration */}
        <TabsContent value="model" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>
                Choose which AI model to use and configure its parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">Default AI Model</Label>
                <Select
                  value={settings.defaultModel}
                  onValueChange={(value) => handleSave({ defaultModel: value })}
                >
                  <SelectTrigger id="model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label} ({model.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This model will be used for all AI interactions in both interfaces
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Temperature: {settings.temperature}</Label>
                <Slider
                  value={[settings.temperature]}
                  onValueChange={([value]) => handleSave({ temperature: value })}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Higher values make output more creative, lower values more focused
                </p>
              </div>

              <div className="space-y-2">
                <Label>Max Tokens: {settings.maxTokens}</Label>
                <Slider
                  value={[settings.maxTokens]}
                  onValueChange={([value]) => handleSave({ maxTokens: value })}
                  min={500}
                  max={4000}
                  step={100}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum length of AI responses
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Streaming Responses</Label>
                  <p className="text-sm text-muted-foreground">
                    Show AI responses token-by-token as they're generated
                  </p>
                </div>
                <Switch
                  checked={settings.streamingEnabled}
                  onCheckedChange={(checked) => handleSave({ streamingEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the AI interfaces look
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: any) => handleSave({ theme: value })}
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Sidebar Position (In-App)</Label>
                <Select
                  value={settings.sidebarPosition}
                  onValueChange={(value: any) => handleSave({ sidebarPosition: value })}
                >
                  <SelectTrigger id="position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value: any) => handleSave({ fontSize: value })}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use a more condensed layout
                  </p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => handleSave({ compactMode: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavior */}
        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Settings</CardTitle>
              <CardDescription>
                Control how the AI assistants behave
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Open Sidebar</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically open in-app sidebar on page load
                  </p>
                </div>
                <Switch
                  checked={settings.autoOpen}
                  onCheckedChange={(checked) => handleSave({ autoOpen: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Suggested Prompts</Label>
                  <p className="text-sm text-muted-foreground">
                    Display context-specific prompt suggestions
                  </p>
                </div>
                <Switch
                  checked={settings.showSuggestedPrompts}
                  onCheckedChange={(checked) => handleSave({ showSuggestedPrompts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Persist Conversations</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep conversations when navigating between pages
                  </p>
                </div>
                <Switch
                  checked={settings.persistConversations}
                  onCheckedChange={(checked) => handleSave({ persistConversations: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Browser Extension</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Side Panel</Label>
                    <p className="text-sm text-muted-foreground">
                      Show AI assistant in browser side panel
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableExtensionSidePanel}
                    onCheckedChange={(checked) => handleSave({ enableExtensionSidePanel: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Open on Browser Startup</Label>
                    <p className="text-sm text-muted-foreground">
                      Open side panel when browser starts
                    </p>
                  </div>
                  <Switch
                    checked={settings.extensionAutoOpenOnStartup}
                    onCheckedChange={(checked) => handleSave({ extensionAutoOpenOnStartup: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice */}
        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice Settings</CardTitle>
              <CardDescription>
                Configure voice input and output powered by ElevenLabs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Voice Input</Label>
                  <p className="text-sm text-muted-foreground">
                    Use microphone to send messages
                  </p>
                </div>
                <Switch
                  checked={settings.enableVoiceInput}
                  onCheckedChange={(checked) => handleSave({ enableVoiceInput: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Voice Output</Label>
                  <p className="text-sm text-muted-foreground">
                    Read AI responses aloud
                  </p>
                </div>
                <Switch
                  checked={settings.enableVoiceOutput}
                  onCheckedChange={(checked) => handleSave({ enableVoiceOutput: checked })}
                />
              </div>

              {settings.enableVoiceOutput && (
                <>
                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="voice">Voice</Label>
                    <Select
                      value={settings.voiceId}
                      onValueChange={(value) => handleSave({ voiceId: value })}
                    >
                      <SelectTrigger id="voice">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VOICE_OPTIONS.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value}>
                            {voice.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voiceModel">Voice Model</Label>
                    <Select
                      value={settings.voiceModel}
                      onValueChange={(value) => handleSave({ voiceModel: value })}
                    >
                      <SelectTrigger id="voiceModel">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VOICE_MODELS.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>
                Control what data is saved and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Save Conversation History</Label>
                  <p className="text-sm text-muted-foreground">
                    Store your conversations for future reference
                  </p>
                </div>
                <Switch
                  checked={settings.saveHistory}
                  onCheckedChange={(checked) => handleSave({ saveHistory: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve AI features with anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => handleSave({ analyticsEnabled: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Data Management</h4>
                <p className="text-sm text-muted-foreground">
                  These settings apply to both browser extension and in-app interfaces
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isSyncing && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Syncing settings...</span>
        </div>
      )}
    </div>
  );
}
