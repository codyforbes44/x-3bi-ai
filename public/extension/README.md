# AI Platform - Browser Extension

## Universal AI Command Layer

A powerful browser extension that brings AI assistance to every webpage you visit.

### Features

🎯 **AI Sidebar**
- Inject AI assistant into any webpage
- Context-aware conversations about current page
- Quick actions: Analyze, Summarize, Extract Data

🖱️ **Context Menu Integration**
- Right-click on selected text for instant AI actions
- Explain, Summarize, Translate, Rewrite
- Analyze pages, links, and images

🔍 **Advanced Page Scraping**
- Extract structured data from any webpage
- Capture headings, links, images, forms
- Get metadata, Open Graph data, schema.org
- Export as JSON

🌐 **Platform API Client**
- Seamless integration with main platform
- Execute workflows from browser
- Sync data across devices

⌨️ **Keyboard Shortcuts**
- `Ctrl+Shift+G` (or `Cmd+Shift+G`): Toggle AI Sidebar
- Fast access to AI features

### Installation

#### Chrome / Edge / Brave

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `public/extension` folder
5. The extension is now installed!

#### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from the `public/extension` folder
4. The extension is now installed!

### Configuration

1. Click the extension icon in your browser toolbar
2. Click "⚙️ Settings"
3. Enter your Supabase URL and API key
4. Customize appearance and behavior
5. Save settings

### Usage

#### Toggle AI Sidebar

- Click the extension icon
- Press `Ctrl+Shift+G` (or `Cmd+Shift+G`)
- Use the context menu: Right-click → AI Assistant → Toggle AI Sidebar

#### Quick Actions

- **Analyze Page**: Get insights about the current webpage
- **Summarize**: Create a summary of the page content
- **Extract Data**: Get structured data from the page
- **Find Insights**: Discover key information and patterns

#### Context Menu

1. Select text on any webpage
2. Right-click to open context menu
3. Choose AI Assistant → [Action]
4. See results in the AI Sidebar

#### Chat with AI

1. Open the AI Sidebar
2. Type your question in the input field
3. Press Enter or click Send
4. AI responds with context awareness of the current page

### Architecture

```
extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (context menus, lifecycle)
├── content.js            # Injected into pages (sidebar, scraping)
├── popup.html/js         # Quick access popup
├── options.html/js       # Settings page
└── styles.css            # Injected styles
```

### API Integration

The extension communicates with the main platform via Supabase Edge Functions:

- **grok**: AI chat and analysis
- **web-scraper**: Page data extraction
- **execute-workflow**: Run automated workflows

### Privacy & Security

- ✅ No data sent without user action
- ✅ API keys stored securely in browser storage
- ✅ Optional conversation history (local only)
- ✅ Optional analytics (anonymous)
- ✅ All communications over HTTPS

### Permissions

- `activeTab`: Access current page content
- `contextMenus`: Add right-click menu items
- `storage`: Save user settings
- `scripting`: Inject sidebar into pages
- `tabs`: Manage browser tabs
- `http://*/*`, `https://*/*`: Work on all websites

### Development

#### Testing

1. Make changes to extension files
2. Go to `chrome://extensions`
3. Click the reload icon for the extension
4. Test on any webpage

#### Debugging

- **Background Script**: `chrome://extensions` → "Service Worker" → Console
- **Content Script**: Open DevTools on any page → Console
- **Popup**: Right-click extension icon → Inspect popup

### Roadmap

- [ ] Desktop app version
- [ ] Mobile keyboard integration
- [ ] VS Code extension
- [ ] Slack/Discord bots
- [ ] Email integration
- [ ] Calendar integration
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Offline mode

### Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact support at support@aiplatform.com
- Join our Discord community

### License

MIT License - See LICENSE file for details
