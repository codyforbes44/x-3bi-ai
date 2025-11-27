import { useState } from "react";
import { ScreenshotOverlay } from "@/components/mobile/ScreenshotOverlay";
import { HeroSection } from "@/components/hero/HeroSection";
import Dashboard from "./Dashboard";
import GrokChatPage from "./GrokChatPage";
import FeaturesPage from "./FeaturesPage";
import UnifiedSettingsPage from "./UnifiedSettingsPage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type DeviceType = "iphone-67" | "iphone-65" | "ipad-129" | "android-phone" | "android-tablet";
type ScreenType = "hero" | "grok" | "dashboard" | "image" | "voice" | "settings" | "features";

const SCREENSHOT_CONTENT: Record<ScreenType, { headline: string; subtitle: string }> = {
  hero: {
    headline: "FREE ACCESS TO 12 PREMIUM AI MODELS",
    subtitle: "Grok 4 • Claude Opus 4 • GPT-5 • No Credit Card Required",
  },
  grok: {
    headline: "CHAT WITH GROK 4 AI",
    subtitle: "2M Context Window • Unlimited Messages • Always Free",
  },
  dashboard: {
    headline: "27+ AI FEATURES UNLOCKED",
    subtitle: "All Features Free Forever • No Hidden Costs",
  },
  image: {
    headline: "AI IMAGE GENERATION",
    subtitle: "DALL-E 3 • Stable Diffusion • FLUX Pro • Unlimited",
  },
  voice: {
    headline: "NATURAL VOICE AI",
    subtitle: "ElevenLabs Turbo • 50+ Voices • Free Forever",
  },
  settings: {
    headline: "CUSTOMIZE YOUR EXPERIENCE",
    subtitle: "12 Premium Models • 27 Features • All Included Free",
  },
  features: {
    headline: "ALL 27 FEATURES INCLUDED",
    subtitle: "Advanced AI • Enterprise Tools • No Limits",
  },
};

export default function Screenshots() {
  const [deviceType, setDeviceType] = useState<DeviceType>("iphone-67");
  const [screenType, setScreenType] = useState<ScreenType>("hero");

  const renderScreen = () => {
    switch (screenType) {
      case "hero":
        return <HeroSection onNavigate={() => {}} />;
      case "grok":
        return <GrokChatPage />;
      case "dashboard":
        return <Dashboard />;
      case "features":
        return <FeaturesPage />;
      case "settings":
        return <UnifiedSettingsPage />;
      case "image":
        return <Dashboard />;
      case "voice":
        return <Dashboard />;
      default:
        return <HeroSection onNavigate={() => {}} />;
    }
  };

  const { headline, subtitle } = SCREENSHOT_CONTENT[screenType];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Controls */}
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <h1 className="text-2xl font-bold">App Store Screenshot Generator</h1>
          <p className="text-muted-foreground">
            Select device type and screen to generate App Store screenshots with marketing overlays.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Type</label>
              <Select value={deviceType} onValueChange={(v) => setDeviceType(v as DeviceType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iphone-67">iPhone 6.7" (1290×2796)</SelectItem>
                  <SelectItem value="iphone-65">iPhone 6.5" (1242×2688)</SelectItem>
                  <SelectItem value="ipad-129">iPad Pro 12.9" (2048×2732)</SelectItem>
                  <SelectItem value="android-phone">Android Phone (1080×2400)</SelectItem>
                  <SelectItem value="android-tablet">Android Tablet (1600×2560)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Screen Type</label>
              <Select value={screenType} onValueChange={(v) => setScreenType(v as ScreenType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">1. Hero / Home</SelectItem>
                  <SelectItem value="grok">2. Grok Chat</SelectItem>
                  <SelectItem value="dashboard">3. Dashboard</SelectItem>
                  <SelectItem value="image">4. Image Generation</SelectItem>
                  <SelectItem value="voice">5. Voice AI</SelectItem>
                  <SelectItem value="settings">6. Settings</SelectItem>
                  <SelectItem value="features">7. Features Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                const element = document.getElementById("screenshot-preview");
                if (element) {
                  // Instructions for manual screenshot capture
                  alert("Use your OS screenshot tool to capture the preview below:\n\nMac: Cmd+Shift+4 (select area)\nWindows: Win+Shift+S\nLinux: Use Spectacle or gnome-screenshot");
                }
              }}
            >
              Capture Screenshot
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Print Preview
            </Button>
          </div>
        </div>

        {/* Screenshot Preview */}
        <div className="flex justify-center">
          <div id="screenshot-preview" className="shadow-2xl" style={{ transform: "scale(0.4)", transformOrigin: "top center" }}>
            <ScreenshotOverlay
              headline={headline}
              subtitle={subtitle}
              deviceType={deviceType}
              showFreeBadge={true}
            >
              {renderScreen()}
            </ScreenshotOverlay>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <h2 className="text-xl font-bold">Screenshot Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Select the device type matching your App Store listing requirements</li>
            <li>Choose the screen you want to capture</li>
            <li>Use your OS screenshot tool to capture the preview area</li>
            <li>Save with naming convention: <code className="bg-muted px-2 py-1 rounded">screen-name-device-type.png</code></li>
            <li>Repeat for all required screen types and device sizes</li>
            <li>Upload to App Store Connect / Google Play Console</li>
          </ol>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4 mt-4">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              📸 Pro Tip: Use browser developer tools to set exact viewport dimensions before capturing, or use specialized screenshot tools like Cleanshot X (Mac) or ShareX (Windows) for pixel-perfect captures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
