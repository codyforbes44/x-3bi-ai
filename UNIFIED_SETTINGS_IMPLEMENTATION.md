# Unified AI Settings Implementation

## ✅ Complete Implementation

A comprehensive settings panel that configures both browser extension and in-app AI interfaces from a single location.

## Features Implemented

### 🎯 Settings Categories

#### 1. Model Configuration
- **Default AI Model** - Choose from Grok, Gemini, or GPT models
- **Temperature** - Control creativity (0-2)
- **Max Tokens** - Set response length (500-4000)
- **Streaming** - Toggle token-by-token responses

#### 2. Appearance
- **Theme** - Auto/Light/Dark mode
- **Sidebar Position** - Left/Right (in-app only)
- **Font Size** - Small/Medium/Large
- **Compact Mode** - Condensed layout toggle

#### 3. Behavior
- **Auto-Open Sidebar** - Open on page load
- **Show Suggested Prompts** - Context-specific suggestions
- **Persist Conversations** - Keep chats across navigation
- **Extension Auto-Open** - Open side panel on browser startup
- **Enable Side Panel** - Toggle extension side panel

#### 4. Voice (ElevenLabs Integration)
- **Voice Input** - Microphone for messages
- **Voice Output** - Text-to-speech responses
- **Voice Selection** - 10 preset voices (Aria, Sarah, Roger, etc.)
- **Voice Model** - Choose from Turbo v2.5, Multilingual v2, etc.

#### 5. Privacy & Data
- **Save History** - Store conversation history
- **Analytics** - Anonymous usage tracking

---

## Architecture

### Database Schema
```sql
Table: ai_settings
- id: UUID (primary key)
- user_id: UUID (unique, foreign key)
- settings: JSONB (stores all settings)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

RLS Policies:
✅ Users can view their own settings
✅ Users can insert their own settings
✅ Users can update their own settings
✅ Users can delete their own settings
```

### Settings Sync Flow

```
┌─────────────────┐
│  User Changes   │
│    Settings     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  localStorage   │◄─────┐
│   (immediate)   │      │
└────────┬────────┘      │
         │               │
         ▼               │
┌─────────────────┐      │
│   Supabase DB   │      │
│ (authenticated) │      │
└────────┬────────┘      │
         │               │
         ▼               │
┌─────────────────┐      │
│ chrome.storage  │──────┘
│   (extension)   │  sync back
└─────────────────┘
```

**Sync Process:**
1. User changes setting in either interface
2. Update immediately in localStorage (instant feedback)
3. Save to Supabase database (if authenticated)
4. Sync to chrome.storage (if extension installed)
5. Extension listens for chrome.storage changes
6. Platform listens for chrome.storage changes
7. Both interfaces stay in sync automatically

---

## Access Points

### In-App Settings Page
**Route:** `/ai-settings` (protected route)
**Access:** Dashboard → Settings → AI Settings

Features:
- Full tabbed interface with 5 categories
- Real-time sync indicator
- Reset to defaults button
- Mobile-responsive design

### Browser Extension Settings
**Access Methods:**
1. Right-click extension icon → Options
2. `chrome://extensions` → AI Platform → Options
3. Extension popup → Settings gear icon

Features:
- Simplified interface optimized for extension popup
- Instant save/load from chrome.storage
- Automatic sync with platform
- Sync status indicator

---

## File Structure

```
Platform (In-App):
├── src/types/aiSettings.ts              # Settings types & defaults
├── src/hooks/useAISettings.ts           # Settings management hook
├── src/components/settings/
│   └── UnifiedAISettings.tsx            # Main settings UI
└── src/pages/UnifiedSettingsPage.tsx    # Settings page route

Extension:
├── public/extension/settings.html       # Extension settings UI
├── public/extension/settings.js         # Extension settings logic
└── public/extension/manifest.json       # Updated with options_page

Database:
└── supabase/migrations/
    └── [timestamp]_create_ai_settings_table.sql
```

---

## Usage Examples

### Changing Default Model

**In-App:**
```typescript
import { useAISettings } from '@/hooks/useAISettings';

function MyComponent() {
  const { settings, saveSettings } = useAISettings();
  
  const changeModel = () => {
    saveSettings({ defaultModel: 'google/gemini-2.5-pro' });
  };
}
```

**Extension:**
```javascript
chrome.storage.sync.get(['aiSettings'], (data) => {
  const settings = data.aiSettings;
  settings.defaultModel = 'grok-vision-beta';
  chrome.storage.sync.set({ aiSettings: settings });
});
```

### Enabling Voice Output

**In-App:**
```typescript
const { saveSettings } = useAISettings();

saveSettings({
  enableVoiceOutput: true,
  voiceId: '9BWtsMINqrJLrRacOk9x', // Aria
  voiceModel: 'eleven_turbo_v2_5'
});
```

**Extension:**
Updates automatically via chrome.storage sync!

---

## Available Models

### xAI (Grok)
- `grok-beta` - Standard Grok model
- `grok-vision-beta` - Grok with vision capabilities

### Google (Gemini)
- `google/gemini-2.5-flash` - Fast, balanced (default)
- `google/gemini-2.5-pro` - Highest quality
- `google/gemini-2.5-flash-lite` - Fastest, cheapest

### OpenAI (GPT)
- `openai/gpt-5` - Most capable
- `openai/gpt-5-mini` - Balanced
- `openai/gpt-5-nano` - Fastest

---

## Voice Options (ElevenLabs)

### Female Voices
- Aria (9BWtsMINqrJLrRacOk9x)
- Sarah (EXAVITQu4vr4xnSDxMaL)
- Laura (FGY2WhTYpPnrIDTdsKH5)
- Charlotte (XB0fDUnXU5powFXDhCwa)
- Alice (Xb7hH8MSUJpSbSDYk0k2)

### Male Voices
- Roger (CwhRBWXzGAHq8TQ4Fs17)
- Charlie (IKne3meq5aSn9XLyUdCD)
- Callum (N2lVS1w4EtoT3dr4eOWO)
- Liam (TX3LPaxmHKxFdv7VOQHJ)
- Will (bIHbv24MWmeRgasZH58o)

### Voice Models
- `eleven_turbo_v2_5` - Fastest, 32 languages (recommended)
- `eleven_multilingual_v2` - Highest quality, 29 languages
- `eleven_turbo_v2` - Fast, English only

---

## Security

### RLS Policies
✅ All settings are user-scoped
✅ No cross-user access possible
✅ Authenticated users only can save to database
✅ Guest users use localStorage only

### Data Storage
- **Sensitive data:** None stored (API keys separate)
- **User preferences:** Stored in JSONB for flexibility
- **Extension sync:** Uses chrome.storage.sync (encrypted by Chrome)
- **Platform storage:** Supabase with RLS

---

## Testing Guide

### Test Sync Between Interfaces

1. **Open platform settings** at `/ai-settings`
2. Change default model to "Gemini 2.5 Pro"
3. **Open extension settings** (right-click icon → Options)
4. Verify model shows as "Gemini 2.5 Pro"
5. **In extension**, change theme to "Light"
6. **Refresh platform page**
7. Verify theme applied successfully

### Test Voice Settings

1. Enable voice output in settings
2. Select a voice (e.g., "Aria")
3. Open Grok chat or AI sidebar
4. Send a message
5. Verify AI response is read aloud
6. Change voice to "Roger" in settings
7. Send another message
8. Verify new voice is used

### Test Auto-Save

1. Change any setting
2. Wait 2 seconds (auto-save)
3. Check for "Settings saved" toast
4. Refresh page
5. Verify setting persisted

---

## Troubleshooting

### Settings Not Syncing

**Symptoms:** Changes in platform don't appear in extension

**Solutions:**
1. Check if extension is installed and enabled
2. Verify chrome.storage.sync is not full (100KB limit)
3. Check browser console for sync errors
4. Try manually clicking "Save Settings" in extension

### Voice Not Working

**Symptoms:** Voice output enabled but no audio

**Solutions:**
1. Verify ElevenLabs API key is configured (TODO: Add to secrets)
2. Check browser audio permissions
3. Ensure volume is not muted
4. Try different voice/model combination
5. Check browser console for audio errors

### Settings Reset on Refresh

**Symptoms:** Settings don't persist across page loads

**Solutions:**
1. Check if user is authenticated (guest mode has limited persistence)
2. Verify localStorage is enabled in browser
3. Check for browser extensions blocking localStorage
4. Try hard refresh (Ctrl+Shift+R)

---

## Future Enhancements

- [ ] Import/Export settings as JSON
- [ ] Settings presets (e.g., "Creative Mode", "Fast Mode")
- [ ] Per-conversation model override
- [ ] Usage analytics per model
- [ ] Model performance comparison
- [ ] Custom voice training (ElevenLabs)
- [ ] Keyboard shortcuts customization
- [ ] Multi-language UI preferences
- [ ] Advanced prompt engineering settings
- [ ] Token usage limits and warnings

---

## Summary

✅ Unified settings for both interfaces
✅ Real-time sync across platform and extension
✅ Persistent storage with Supabase
✅ Guest mode support with localStorage
✅ Comprehensive voice configuration
✅ Model selection across providers
✅ Privacy controls
✅ Mobile-responsive design
✅ Type-safe implementation
✅ Extensible architecture for future settings

**Access:** Navigate to `/ai-settings` in platform or right-click extension icon → Options
