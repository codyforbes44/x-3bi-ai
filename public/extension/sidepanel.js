// AI Side Panel - Standalone chat interface for browser extension
(async function() {
  const messagesContainer = document.getElementById('messages');
  const input = document.getElementById('input');
  const sendButton = document.getElementById('send');

  let messages = [];
  let isLoading = false;
  let settings = {};

  // Load settings from extension storage
  async function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['supabaseUrl', 'supabaseKey'], (data) => {
        settings = {
          supabaseUrl: data.supabaseUrl || 'https://jmazzsxnatfewblgpxfq.supabase.co',
          supabaseKey: data.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYXp6c3huYXRmZXdibGdweGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjcxMTIsImV4cCI6MjA3MDA0MzExMn0.kUpKQ7U2ooc9zGngM8oZ78U9_aBoJmedJi_tXsKi4G0'
        };
        resolve(settings);
      });
    });
  }

  // Render messages
  function render() {
    if (messages.length === 0) {
      messagesContainer.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <div>
            <div style="font-weight: 500; color: #fff; margin-bottom: 4px;">Start a conversation</div>
            <div>Ask me anything about this page or any topic</div>
          </div>
        </div>
      `;
      return;
    }

    messagesContainer.innerHTML = messages
      .map(msg => `
        <div class="message ${msg.role}">
          ${msg.content || '...'}
        </div>
      `)
      .join('');
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Stream message from Grok
  async function streamMessage(userMessage) {
    if (isLoading) return;
    
    isLoading = true;
    sendButton.disabled = true;
    sendButton.innerHTML = '<span class="loading"></span>';

    messages.push({ role: 'user', content: userMessage });
    messages.push({ role: 'assistant', content: '' });
    render();

    try {
      const response = await fetch(
        `${settings.supabaseUrl}/functions/v1/grok`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': settings.supabaseKey,
          },
          body: JSON.stringify({
            messages: messages.filter(m => m.content), // Remove empty messages
            model: 'grok-beta',
            stream: true,
            temperature: 0.7,
            max_tokens: 2000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              
              if (delta) {
                fullContent += delta;
                messages[messages.length - 1].content = fullContent;
                render();
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      messages[messages.length - 1].content = 'Error: Failed to get response. Please check your settings.';
      render();
    } finally {
      isLoading = false;
      sendButton.disabled = false;
      sendButton.textContent = 'Send';
    }
  }

  // Send message
  function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    streamMessage(text);
    input.value = '';
    input.style.height = 'auto';
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Load settings on init
  await loadSettings();
  render();
})();
