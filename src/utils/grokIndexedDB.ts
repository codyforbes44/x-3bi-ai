const DB_NAME = 'grok-chat-db';
const DB_VERSION = 1;
const CONVERSATIONS_STORE = 'conversations';
const MESSAGES_STORE = 'messages';

interface GrokConversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
}

interface GrokMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

class GrokIndexedDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(CONVERSATIONS_STORE)) {
          const conversationsStore = db.createObjectStore(CONVERSATIONS_STORE, { keyPath: 'id' });
          conversationsStore.createIndex('updated_at', 'updated_at', { unique: false });
        }

        if (!db.objectStoreNames.contains(MESSAGES_STORE)) {
          const messagesStore = db.createObjectStore(MESSAGES_STORE, { keyPath: 'id' });
          messagesStore.createIndex('conversation_id', 'conversation_id', { unique: false });
        }
      };
    });
  }

  async saveConversation(conversation: GrokConversation): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const request = store.put(conversation);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async saveMessage(message: GrokMessage): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([MESSAGES_STORE], 'readwrite');
      const store = transaction.objectStore(MESSAGES_STORE);
      const request = store.put(message);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getConversations(limit = 100): Promise<GrokConversation[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readonly');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const index = store.index('updated_at');
      const request = index.openCursor(null, 'prev');

      const conversations: GrokConversation[] = [];

      request.onerror = () => reject(request.error);
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && conversations.length < limit) {
          conversations.push(cursor.value);
          cursor.continue();
        } else {
          resolve(conversations);
        }
      };
    });
  }

  async getMessages(conversationId: string): Promise<GrokMessage[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([MESSAGES_STORE], 'readonly');
      const store = transaction.objectStore(MESSAGES_STORE);
      const index = store.index('conversation_id');
      const request = index.getAll(conversationId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async deleteConversation(conversationId: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE, MESSAGES_STORE], 'readwrite');
      
      // Delete conversation
      const conversationsStore = transaction.objectStore(CONVERSATIONS_STORE);
      conversationsStore.delete(conversationId);

      // Delete all messages in conversation
      const messagesStore = transaction.objectStore(MESSAGES_STORE);
      const index = messagesStore.index('conversation_id');
      const request = index.openCursor(conversationId);

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          messagesStore.delete(cursor.primaryKey);
          cursor.continue();
        }
      };

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE, MESSAGES_STORE], 'readwrite');
      
      transaction.objectStore(CONVERSATIONS_STORE).clear();
      transaction.objectStore(MESSAGES_STORE).clear();

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }
}

export const grokDB = new GrokIndexedDB();
