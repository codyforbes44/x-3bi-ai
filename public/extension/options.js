// Options Page Script

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
});

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get([
    'supabaseUrl',
    'apiKey',
    'sidebarPosition',
    'sidebarWidth',
    'enableShortcuts',
    'enableNotifications',
    'saveHistory',
    'sendAnalytics'
  ], (data) => {
    // API Configuration
    document.getElementById('supabaseUrl').value = data.supabaseUrl || 'https://jmazzsxnatfewblgpxfq.supabase.co';
    document.getElementById('apiKey').value = data.apiKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYXp6c3huYXRmZXdibGdweGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjcxMTIsImV4cCI6MjA3MDA0MzExMn0.kUpKQ7U2ooc9zGngM8oZ78U9_aBoJmedJi_tXsKi4G0';
    
    // Appearance
    document.getElementById('sidebarPosition').value = data.sidebarPosition || 'right';
    document.getElementById('sidebarWidth').value = data.sidebarWidth || '400';
    
    // Keyboard Shortcuts
    document.getElementById('enableShortcuts').checked = data.enableShortcuts !== false;
    
    // Notifications
    document.getElementById('enableNotifications').checked = data.enableNotifications !== false;
    
    // Privacy
    document.getElementById('saveHistory').checked = data.saveHistory !== false;
    document.getElementById('sendAnalytics').checked = data.sendAnalytics === true;
  });
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  document.getElementById('resetBtn').addEventListener('click', resetSettings);
}

// Save settings
function saveSettings() {
  const settings = {
    supabaseUrl: document.getElementById('supabaseUrl').value,
    apiKey: document.getElementById('apiKey').value,
    sidebarPosition: document.getElementById('sidebarPosition').value,
    sidebarWidth: document.getElementById('sidebarWidth').value,
    enableShortcuts: document.getElementById('enableShortcuts').checked,
    enableNotifications: document.getElementById('enableNotifications').checked,
    saveHistory: document.getElementById('saveHistory').checked,
    sendAnalytics: document.getElementById('sendAnalytics').checked
  };
  
  chrome.storage.sync.set(settings, () => {
    showStatus('Settings saved successfully!', 'success');
  });
}

// Reset to defaults
function resetSettings() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    chrome.storage.sync.clear(() => {
      loadSettings();
      showStatus('Settings reset to defaults', 'success');
    });
  }
}

// Show status message
function showStatus(message, type) {
  const statusEl = document.getElementById('statusMessage');
  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
  statusEl.style.display = 'block';
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
}
