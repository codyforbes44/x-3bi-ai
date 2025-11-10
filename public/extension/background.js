// Background Service Worker for AI Platform Extension

// Initialize context menus on installation
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
  console.log('AI Platform Extension installed');
});

// Create context menu items
function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    // Main AI menu
    chrome.contextMenus.create({
      id: 'ai-root',
      title: 'AI Assistant',
      contexts: ['selection', 'page', 'link', 'image']
    });

    // Text selection actions
    chrome.contextMenus.create({
      id: 'ai-explain',
      parentId: 'ai-root',
      title: 'Explain this',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: 'ai-summarize',
      parentId: 'ai-root',
      title: 'Summarize',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: 'ai-translate',
      parentId: 'ai-root',
      title: 'Translate',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: 'ai-rewrite',
      parentId: 'ai-root',
      title: 'Rewrite professionally',
      contexts: ['selection']
    });

    // Page actions
    chrome.contextMenus.create({
      id: 'ai-analyze-page',
      parentId: 'ai-root',
      title: 'Analyze this page',
      contexts: ['page']
    });

    chrome.contextMenus.create({
      id: 'ai-extract-data',
      parentId: 'ai-root',
      title: 'Extract data from page',
      contexts: ['page']
    });

    // Link actions
    chrome.contextMenus.create({
      id: 'ai-summarize-link',
      parentId: 'ai-root',
      title: 'Summarize linked page',
      contexts: ['link']
    });

    // Image actions
    chrome.contextMenus.create({
      id: 'ai-describe-image',
      parentId: 'ai-root',
      title: 'Describe image',
      contexts: ['image']
    });

    // Toggle sidebar
    chrome.contextMenus.create({
      id: 'ai-toggle-sidebar',
      parentId: 'ai-root',
      title: 'Toggle AI Sidebar',
      contexts: ['page']
    });
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  handleContextMenuAction(info, tab);
});

// Process context menu actions
async function handleContextMenuAction(info, tab) {
  const action = {
    type: info.menuItemId,
    data: {
      selectedText: info.selectionText,
      pageUrl: info.pageUrl,
      linkUrl: info.linkUrl,
      srcUrl: info.srcUrl,
      frameUrl: info.frameUrl
    }
  };

  // Send action to content script
  chrome.tabs.sendMessage(tab.id, {
    action: 'ai-action',
    payload: action
  });
}

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-sidebar') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggle-sidebar'
      });
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrape-page') {
    // Handle page scraping request
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: scrapePage
    }).then((results) => {
      sendResponse({ success: true, data: results[0].result });
    }).catch((error) => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open for async response
  }

  if (request.action === 'get-settings') {
    chrome.storage.sync.get(['apiKey', 'supabaseUrl', 'settings'], (data) => {
      sendResponse(data);
    });
    return true;
  }

  if (request.action === 'save-settings') {
    chrome.storage.sync.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Page scraping function (injected into page context)
function scrapePage() {
  const data = {
    url: window.location.href,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    keywords: document.querySelector('meta[name="keywords"]')?.content || '',
    author: document.querySelector('meta[name="author"]')?.content || '',
    
    // Open Graph metadata
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    ogType: document.querySelector('meta[property="og:type"]')?.content || '',
    
    // Page structure
    headings: {
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()),
      h3: Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())
    },
    
    // Content
    paragraphs: Array.from(document.querySelectorAll('p')).map(p => p.textContent.trim()).filter(t => t.length > 20),
    
    // Links
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: a.textContent.trim(),
      href: a.href,
      title: a.title
    })).filter(l => l.text),
    
    // Images
    images: Array.from(document.querySelectorAll('img[src]')).map(img => ({
      src: img.src,
      alt: img.alt,
      title: img.title,
      width: img.width,
      height: img.height
    })),
    
    // Forms
    forms: Array.from(document.querySelectorAll('form')).map(form => ({
      action: form.action,
      method: form.method,
      inputs: Array.from(form.querySelectorAll('input')).map(input => ({
        type: input.type,
        name: input.name,
        placeholder: input.placeholder
      }))
    })),
    
    // Main content (attempt to extract main text)
    mainContent: document.querySelector('main')?.textContent.trim() || 
                  document.querySelector('article')?.textContent.trim() ||
                  document.body.textContent.trim().substring(0, 5000),
    
    // Page stats
    stats: {
      wordCount: document.body.textContent.trim().split(/\s+/).length,
      linkCount: document.querySelectorAll('a[href]').length,
      imageCount: document.querySelectorAll('img[src]').length,
      formCount: document.querySelectorAll('form').length
    },
    
    // Schema.org structured data
    structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        return null;
      }
    }).filter(Boolean),
    
    // Timestamp
    scrapedAt: new Date().toISOString()
  };
  
  return data;
}

// Listen for extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {
    action: 'toggle-sidebar'
  });
});

console.log('AI Platform Extension background service worker loaded');
