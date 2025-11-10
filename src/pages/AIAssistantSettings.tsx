import { Helmet } from 'react-helmet-async';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAISidebarSettings } from '@/hooks/useAISidebarSettings';
import { GROK_MODELS } from '@/config/grok';
import { Loader2, Settings, Paintbrush, Zap, Mic, Brain, Keyboard, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AIAssistantSettings() {
  const { settings, isLoading, isSyncing, saveSettings, resetSettings } = useAISidebarSettings();

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Assistant Settings - 3BI.AI</title>
        <meta name="description" content="Customize your AI assistant experience" />
      </Helmet>

      <PageLayout>
        <div className="container max-w-4xl py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Settings className="h-8 w-8" />
                AI Assistant Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Customize how your AI sidebar behaves and appears
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

          <Tabs defaultValue="appearance" className="space-y-6">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Behavior</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Models</span>
              </TabsTrigger>
              <TabsTrigger value="keyboard" className="flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                <span className="hidden sm:inline">Keyboard</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize how the AI sidebar looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-state">Default State</Label>
                    <Select
                      value={settings.defaultState}
                      onValueChange={(value) => saveSettings({ defaultState: value as any })}
                    >
                      <SelectTrigger id="default-state">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collapsed">Collapsed (Icon only)</SelectItem>
                        <SelectItem value="compact">Compact (300px)</SelectItem>
                        <SelectItem value="expanded">Expanded (400px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select
                      value={settings.position}
                      onValueChange={(value) => saveSettings({ position: value as any })}
                    >
                      <SelectTrigger id="position">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left Side</SelectItem>
                        <SelectItem value="right">Right Side</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => saveSettings({ theme: value as any })}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto (Follow System)</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Behavior Settings</CardTitle>
                  <CardDescription>
                    Control how the AI sidebar behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-open on Dashboard</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically open sidebar when viewing dashboard
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoOpenOnDashboard}
                      onCheckedChange={(checked) => saveSettings({ autoOpenOnDashboard: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Persist Conversations</Label>
                      <p className="text-sm text-muted-foreground">
                        Save conversations across sessions
                      </p>
                    </div>
                    <Switch
                      checked={settings.persistConversations}
                      onCheckedChange={(checked) => saveSettings({ persistConversations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Context Awareness</Label>
                      <p className="text-sm text-muted-foreground">
                        Detect current page and provide relevant help
                      </p>
                    </div>
                    <Switch
                      checked={settings.contextAwarenessEnabled}
                      onCheckedChange={(checked) => saveSettings({ contextAwarenessEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Smart Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Show AI-powered suggestions based on context
                      </p>
                    </div>
                    <Switch
                      checked={settings.suggestionsEnabled}
                      onCheckedChange={(checked) => saveSettings({ suggestionsEnabled: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Voice Tab */}
            <TabsContent value="voice" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Settings</CardTitle>
                  <CardDescription>
                    Configure voice input and output
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Input</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable microphone input for chat
                      </p>
                    </div>
                    <Switch
                      checked={settings.voiceInputEnabled}
                      onCheckedChange={(checked) => saveSettings({ voiceInputEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Output</Label>
                      <p className="text-sm text-muted-foreground">
                        Read AI responses aloud
                      </p>
                    </div>
                    <Switch
                      checked={settings.voiceOutputEnabled}
                      onCheckedChange={(checked) => saveSettings({ voiceOutputEnabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voice-provider">Voice Provider</Label>
                    <Select
                      value={settings.voiceProvider}
                      onValueChange={(value) => saveSettings({ voiceProvider: value as any })}
                    >
                      <SelectTrigger id="voice-provider">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="browser">Browser (Free)</SelectItem>
                        <SelectItem value="elevenlabs">ElevenLabs (Premium)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selected-voice">Selected Voice</Label>
                    <Input
                      id="selected-voice"
                      value={settings.selectedVoice}
                      onChange={(e) => saveSettings({ selectedVoice: e.target.value })}
                      placeholder="default"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Models Tab */}
            <TabsContent value="models" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Settings</CardTitle>
                  <CardDescription>
                    Choose your preferred AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-model">Default Model</Label>
                    <Select
                      value={settings.defaultModel}
                      onValueChange={(value) => saveSettings({ defaultModel: value as any })}
                    >
                      <SelectTrigger id="default-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GROK_MODELS.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} - {model.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multi-Model Support</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow switching between different models
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableMultiModel}
                      onCheckedChange={(checked) => saveSettings({ enableMultiModel: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Keyboard Tab */}
            <TabsContent value="keyboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Keyboard Settings</CardTitle>
                  <CardDescription>
                    Customize keyboard shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="keyboard-shortcut">Toggle Sidebar Shortcut</Label>
                    <Input
                      id="keyboard-shortcut"
                      value={settings.keyboardShortcut}
                      onChange={(e) => saveSettings({ keyboardShortcut: e.target.value })}
                      placeholder="Ctrl+Shift+G"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use format: Ctrl+Shift+Key or Cmd+Shift+Key
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Global Shortcut</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow keyboard shortcuts from anywhere
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableGlobalShortcut}
                      onCheckedChange={(checked) => saveSettings({ enableGlobalShortcut: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your data and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Help improve the AI assistant with usage data
                      </p>
                    </div>
                    <Switch
                      checked={settings.analyticsEnabled}
                      onCheckedChange={(checked) => saveSettings({ analyticsEnabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conversation-history">Conversation History</Label>
                    <Select
                      value={settings.conversationHistory}
                      onValueChange={(value) => saveSettings({ conversationHistory: value as any })}
                    >
                      <SelectTrigger id="conversation-history">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Save All Conversations</SelectItem>
                        <SelectItem value="session">Current Session Only</SelectItem>
                        <SelectItem value="none">Don't Save</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isSyncing && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Syncing settings...
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}
