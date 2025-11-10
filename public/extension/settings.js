// Extension Settings Page
const DEFAULT_SETTINGS = {
  defaultModel: 'grok-beta',
  temperature: 0.7,
  maxTokens: 2000,
  streamingEnabled: true,
  theme: 'auto',
  sidebarPosition: 'right',
  compactMode: false,
  fontSize: 'medium',
  autoOpen: false,
  persistConversations: true,
  showSuggestedPrompts: true,
  enableVoiceInput: false,
  enableVoiceOutput: false,
  voiceId: '9BWtsMINqrJLrRacOk9x',
  voiceModel: 'eleven_turbo_v2_5',
  enableExtensionSidePanel: true,
  extensionAutoOpenOnStartup: false,
  saveHistory: true,
  analyticsEnabled: true,
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
  document.getElementById('saveHistory').checked = settings.saveHistory;
  document.getElementById('enableVoiceInput').checked = settings.enableVoiceInput;
  document.getElementById('enableVoiceOutput').checked = settings.enableVoiceOutput;
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
    saveHistory: document.getElementById('saveHistory').checked,
    enableVoiceInput: document.getElementById('enableVoiceInput').checked,
    enableVoiceOutput: document.getElementById('enableVoiceOutput').checked,
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
