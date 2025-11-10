// Extension Settings Page - Unified AI Settings
const DEFAULT_SETTINGS = {
  // Model
  defaultModel: 'grok-4-0709',
  temperature: 0.7,
  maxTokens: 2000,
  streamingEnabled: true,
  
  // Appearance
  theme: 'auto',
  sidebarPosition: 'right',
  fontSize: 'medium',
  compactMode: false,
  defaultState: 'collapsed',
  
  // Behavior
  autoOpen: false,
  autoOpenOnDashboard: false,
  persistConversations: true,
  contextAwarenessEnabled: true,
  suggestionsEnabled: true,
  showSuggestedPrompts: true,
  enableMultiModel: true,
  
  // Voice
  voiceInputEnabled: false,
  voiceOutputEnabled: false,
  voiceProvider: 'browser',
  voiceId: '9BWtsMINqrJLrRacOk9x',
  voiceModel: 'eleven_turbo_v2_5',
  
  // Keyboard
  keyboardShortcut: 'Ctrl+Shift+G',
  enableGlobalShortcut: true,
  
  // Privacy
  analyticsEnabled: true,
  saveHistory: true,
  conversationHistory: 'all',
  
  // Extension
  enableExtensionSidePanel: true,
  extensionAutoOpenOnStartup: false,
  
  // Version
  version: 1,
};

// Load settings
async function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['aiSettings'], (data) => {
      const settings = data.aiSettings || DEFAULT_SETTINGS;
      resolve(settings);
    });
  });
}

// Save settings
async function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ aiSettings: settings }, () => {
      resolve();
    });
  });
}

// Populate form with current settings
async function populateForm() {
  const settings = await loadSettings();

  document.getElementById('defaultModel').value = settings.defaultModel;
  document.getElementById('streamingEnabled').checked = settings.streamingEnabled;
  document.getElementById('theme').value = settings.theme;
  document.getElementById('fontSize').value = settings.fontSize;
  document.getElementById('extensionAutoOpenOnStartup').checked = settings.extensionAutoOpenOnStartup;
  document.getElementById('showSuggestedPrompts').checked = settings.showSuggestedPrompts;
  document.getElementById('persistConversations').checked = settings.persistConversations;
  document.getElementById('saveHistory').checked = settings.saveHistory;
  document.getElementById('enableVoiceInput').checked = settings.voiceInputEnabled;
  document.getElementById('enableVoiceOutput').checked = settings.voiceOutputEnabled;
  document.getElementById('analyticsEnabled').checked = settings.analyticsEnabled;
}

// Show status message
function showStatus(message, type = 'success') {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.style.display = 'block';

  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
}

// Save button handler
document.getElementById('saveBtn').addEventListener('click', async () => {
  const currentSettings = await loadSettings();

  const newSettings = {
    ...currentSettings,
    defaultModel: document.getElementById('defaultModel').value,
    streamingEnabled: document.getElementById('streamingEnabled').checked,
    theme: document.getElementById('theme').value,
    fontSize: document.getElementById('fontSize').value,
    extensionAutoOpenOnStartup: document.getElementById('extensionAutoOpenOnStartup').checked,
    showSuggestedPrompts: document.getElementById('showSuggestedPrompts').checked,
    persistConversations: document.getElementById('persistConversations').checked,
    saveHistory: document.getElementById('saveHistory').checked,
    voiceInputEnabled: document.getElementById('enableVoiceInput').checked,
    voiceOutputEnabled: document.getElementById('enableVoiceOutput').checked,
    analyticsEnabled: document.getElementById('analyticsEnabled').checked,
    version: 1,
  };

  await saveSettings(newSettings);
  showStatus('Settings saved successfully! ✓');
});

// Reset button handler
document.getElementById('resetBtn').addEventListener('click', async () => {
  if (confirm('Reset all settings to defaults?')) {
    await saveSettings(DEFAULT_SETTINGS);
    await populateForm();
    showStatus('Settings reset to defaults');
  }
});

// Initialize
populateForm();
