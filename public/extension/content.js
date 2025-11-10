// Content Script - Injects AI Sidebar into pages

// State
let sidebarInjected = false;
let sidebarVisible = false;
let sidebarFrame = null;
let settings = {};

// Initialize
initialize();

async function initialize() {
  // Load settings
  settings = await getSettings();
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(handleMessage);
  
  // Listen for keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcut);
  
  console.log('AI Platform content script loaded');
}

// Get settings from storage
function getSettings() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'get-settings' }, (response) => {
      resolve(response || {});
    });
  });
}

// Handle messages from background script
function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'toggle-sidebar':
      toggleSidebar();
      break;
      
    case 'ai-action':
      handleAIAction(request.payload);
      break;
      
    case 'scrape-page':
      scrapePage().then(data => {
        sendResponse({ success: true, data });
      });
      return true; // Keep channel open
      
    default:
      console.log('Unknown action:', request.action);
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcut(e) {
  // Ctrl+Shift+G or Cmd+Shift+G to toggle sidebar
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
    e.preventDefault();
    toggleSidebar();
  }
}

// Toggle sidebar visibility
function toggleSidebar() {
  if (!sidebarInjected) {
    injectSidebar();
  } else {
    sidebarVisible = !sidebarVisible;
    if (sidebarFrame) {
      sidebarFrame.style.display = sidebarVisible ? 'block' : 'none';
    }
  }
}

// Inject sidebar into page
function injectSidebar() {
  if (sidebarInjected) return;
  
  // Create iframe for sidebar
  sidebarFrame = document.createElement('iframe');
  sidebarFrame.id = 'ai-platform-sidebar';
  sidebarFrame.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    border: none;
    border-left: 1px solid #e5e7eb;
    background: white;
    z-index: 2147483647;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  `;
  
  // Create sidebar HTML
  const sidebarHTML = createSidebarHTML();
  
  // Inject iframe
  document.body.appendChild(sidebarFrame);
  
  // Write content to iframe
  const iframeDoc = sidebarFrame.contentDocument || sidebarFrame.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(sidebarHTML);
  iframeDoc.close();
  
  sidebarInjected = true;
  sidebarVisible = true;
  
  // Setup communication with sidebar
  setupSidebarCommunication();
  
  console.log('AI Sidebar injected');
}

// Create sidebar HTML
function createSidebarHTML() {
  const pageContext = getPageContext();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #ffffff;
          color: #1f2937;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        }
        
        .header h2 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .close-btn:hover {
          background: #e5e7eb;
        }
        
        .context-panel {
          padding: 12px 16px;
          background: #eff6ff;
          border-bottom: 1px solid #dbeafe;
          font-size: 13px;
        }
        
        .context-item {
          margin: 4px 0;
          color: #1e40af;
        }
        
        .context-item strong {
          color: #1e3a8a;
        }
        
        .chat-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .message {
          padding: 12px;
          border-radius: 8px;
          max-width: 85%;
        }
        
        .message.user {
          background: #3b82f6;
          color: white;
          align-self: flex-end;
        }
        
        .message.assistant {
          background: #f3f4f6;
          color: #1f2937;
          align-self: flex-start;
        }
        
        .actions {
          padding: 12px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .action-btn {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          color: #374151;
          transition: all 0.2s;
        }
        
        .action-btn:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        
        .input-container {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }
        
        .input-wrapper {
          display: flex;
          gap: 8px;
        }
        
        #messageInput {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          resize: none;
        }
        
        #messageInput:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .send-btn {
          padding: 10px 20px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .send-btn:hover {
          background: #2563eb;
        }
        
        .send-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #6b7280;
        }
        
        .empty-state h3 {
          font-size: 16px;
          margin-bottom: 8px;
          color: #374151;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>🤖 AI Assistant</h2>
        <button class="close-btn" onclick="closeSidebar()">×</button>
      </div>
      
      <div class="context-panel">
        <div class="context-item"><strong>Page:</strong> ${pageContext.title}</div>
        <div class="context-item"><strong>URL:</strong> ${pageContext.url}</div>
      </div>
      
      <div class="actions">
        <button class="action-btn" onclick="analyzePageAction()">📊 Analyze Page</button>
        <button class="action-btn" onclick="summarizePageAction()">📝 Summarize</button>
        <button class="action-btn" onclick="extractDataAction()">🔍 Extract Data</button>
        <button class="action-btn" onclick="findInsightsAction()">💡 Find Insights</button>
      </div>
      
      <div class="chat-container" id="chatContainer">
        <div class="empty-state">
          <h3>Ready to assist</h3>
          <p>Ask me anything about this page or use quick actions above</p>
        </div>
      </div>
      
      <div class="input-container">
        <div class="input-wrapper">
          <textarea 
            id="messageInput" 
            placeholder="Ask me anything..."
            rows="1"
          ></textarea>
          <button class="send-btn" onclick="sendMessage()">Send</button>
        </div>
      </div>
      
      <script>
        const pageContext = ${JSON.stringify(pageContext)};
        
        function closeSidebar() {
          window.parent.postMessage({ action: 'close-sidebar' }, '*');
        }
        
        function sendMessage() {
          const input = document.getElementById('messageInput');
          const message = input.value.trim();
          if (!message) return;
          
          addMessage(message, 'user');
          input.value = '';
          
          // Send to AI
          window.parent.postMessage({
            action: 'ai-chat',
            message: message,
            context: pageContext
          }, '*');
        }
        
        function addMessage(text, role) {
          const container = document.getElementById('chatContainer');
          const emptyState = container.querySelector('.empty-state');
          if (emptyState) emptyState.remove();
          
          const message = document.createElement('div');
          message.className = 'message ' + role;
          message.textContent = text;
          container.appendChild(message);
          container.scrollTop = container.scrollHeight;
        }
        
        function analyzePageAction() {
          addMessage('Analyze this page', 'user');
          window.parent.postMessage({
            action: 'ai-analyze-page',
            context: pageContext
          }, '*');
        }
        
        function summarizePageAction() {
          addMessage('Summarize this page', 'user');
          window.parent.postMessage({
            action: 'ai-summarize-page',
            context: pageContext
          }, '*');
        }
        
        function extractDataAction() {
          addMessage('Extract data from this page', 'user');
          window.parent.postMessage({
            action: 'ai-extract-data',
            context: pageContext
          }, '*');
        }
        
        function findInsightsAction() {
          addMessage('Find insights from this page', 'user');
          window.parent.postMessage({
            action: 'ai-find-insights',
            context: pageContext
          }, '*');
        }
        
        // Listen for responses
        window.addEventListener('message', (event) => {
          if (event.data.action === 'ai-response') {
            addMessage(event.data.message, 'assistant');
          }
        });
        
        // Handle Enter key
        document.getElementById('messageInput').addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        });
      </script>
    </body>
    </html>
  `;
}

// Get page context
function getPageContext() {
  return {
    url: window.location.href,
    title: document.title,
    domain: window.location.hostname,
    path: window.location.pathname
  };
}

// Setup communication with sidebar
function setupSidebarCommunication() {
  window.addEventListener('message', async (event) => {
    // Only accept messages from our sidebar iframe
    if (event.source !== sidebarFrame.contentWindow) return;
    
    const { action, message, context } = event.data;
    
    switch (action) {
      case 'close-sidebar':
        toggleSidebar();
        break;
        
      case 'ai-chat':
      case 'ai-analyze-page':
      case 'ai-summarize-page':
      case 'ai-extract-data':
      case 'ai-find-insights':
        await handleAIRequest(action, message, context);
        break;
    }
  });
}

// Handle AI requests
async function handleAIRequest(action, message, context) {
  try {
    // Get page data if needed
    const pageData = await scrapePage();
    
    // Send to platform API
    const response = await callPlatformAPI(action, {
      message,
      context,
      pageData
    });
    
    // Send response back to sidebar
    sidebarFrame.contentWindow.postMessage({
      action: 'ai-response',
      message: response.message || response.text || 'Analysis complete'
    }, '*');
    
  } catch (error) {
    console.error('AI request failed:', error);
    sidebarFrame.contentWindow.postMessage({
      action: 'ai-response',
      message: 'Sorry, something went wrong. Please try again.'
    }, '*');
  }
}

// Call platform API
async function callPlatformAPI(action, data) {
  const apiUrl = settings.supabaseUrl || 'https://jmazzsxnatfewblgpxfq.supabase.co';
  const apiKey = settings.apiKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYXp6c3huYXRmZXdibGdweGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjcxMTIsImV4cCI6MjA3MDA0MzExMn0.kUpKQ7U2ooc9zGngM8oZ78U9_aBoJmedJi_tXsKi4G0';
  
  const endpoint = getEndpointForAction(action);
  
  const response = await fetch(`${apiUrl}/functions/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

// Get API endpoint for action
function getEndpointForAction(action) {
  const endpoints = {
    'ai-chat': 'grok',
    'ai-analyze-page': 'grok',
    'ai-summarize-page': 'grok',
    'ai-extract-data': 'web-scraper',
    'ai-find-insights': 'grok'
  };
  
  return endpoints[action] || 'grok';
}

// Handle AI actions from context menu
function handleAIAction(action) {
  if (!sidebarInjected) {
    injectSidebar();
  } else if (!sidebarVisible) {
    toggleSidebar();
  }
  
  // Send action to sidebar
  setTimeout(() => {
    const actionText = formatActionText(action);
    sidebarFrame.contentWindow.postMessage({
      action: 'ai-response',
      message: `Processing: ${actionText}`
    }, '*');
    
    handleAIRequest(action.type, action.data.selectedText, getPageContext());
  }, 100);
}

// Format action text
function formatActionText(action) {
  const texts = {
    'ai-explain': `Explaining: "${action.data.selectedText}"`,
    'ai-summarize': `Summarizing: "${action.data.selectedText}"`,
    'ai-translate': `Translating: "${action.data.selectedText}"`,
    'ai-rewrite': `Rewriting: "${action.data.selectedText}"`,
    'ai-analyze-page': 'Analyzing this page...',
    'ai-extract-data': 'Extracting data from page...',
    'ai-summarize-link': `Summarizing: ${action.data.linkUrl}`,
    'ai-describe-image': `Describing image: ${action.data.srcUrl}`
  };
  
  return texts[action.type] || 'Processing...';
}

// Scrape current page
async function scrapePage() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'scrape-page' }, (response) => {
      resolve(response?.data || {});
    });
  });
}

console.log('AI Platform content script initialized');
