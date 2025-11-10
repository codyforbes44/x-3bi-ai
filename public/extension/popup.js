// Popup Script

document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  document.getElementById('toggleSidebar').addEventListener('click', () => {
    sendToActiveTab({ action: 'toggle-sidebar' });
    window.close();
  });
  
  document.getElementById('analyzePage').addEventListener('click', () => {
    sendToActiveTab({ 
      action: 'ai-action',
      payload: { type: 'ai-analyze-page' }
    });
    window.close();
  });
  
  document.getElementById('scrapePage').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapePage
    }).then((results) => {
      console.log('Page scraped:', results[0].result);
      // Could show results in a modal or copy to clipboard
      alert('Page data scraped! Check console for details.');
    });
    window.close();
  });
  
  document.getElementById('openDashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://jmazzsxnatfewblgpxfq.supabase.co' });
    window.close();
  });
  
  document.getElementById('settings').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

// Send message to active tab
async function sendToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, message);
}

// Load usage stats
function loadStats() {
  chrome.storage.local.get(['stats'], (data) => {
    const stats = data.stats || { queries: 0, pages: 0, workflows: 0 };
    document.getElementById('queryCount').textContent = stats.queries;
    document.getElementById('pageCount').textContent = stats.pages;
    document.getElementById('workflowCount').textContent = stats.workflows;
  });
}

// Scraping function (same as in background.js)
function scrapePage() {
  const data = {
    url: window.location.href,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    headings: {
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim())
    },
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: a.textContent.trim(),
      href: a.href
    })).filter(l => l.text),
    images: Array.from(document.querySelectorAll('img[src]')).map(img => ({
      src: img.src,
      alt: img.alt
    })),
    mainContent: document.querySelector('main')?.textContent.trim() || 
                  document.body.textContent.trim().substring(0, 2000)
  };
  return data;
}
