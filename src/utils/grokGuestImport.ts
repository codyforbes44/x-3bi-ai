import { supabase } from '@/integrations/supabase/client';

const GUEST_CONVERSATIONS_KEY = 'grok_guest_conversations';

function getGuestMessagesKey(conversationId: string): string {
  return `grok_guest_messages_${conversationId}`;
}

interface GuestConversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
}

interface GuestMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function importGuestConversations(userId: string): Promise<{
  success: boolean;
  imported: number;
  failed?: string[];
  error?: string;
}> {
  try {
    // Load guest conversations from localStorage
    const storedConversations = localStorage.getItem(GUEST_CONVERSATIONS_KEY);
    if (!storedConversations) {
      return { success: true, imported: 0 };
    }

    const guestConversations: GuestConversation[] = JSON.parse(storedConversations);
    
    if (guestConversations.length === 0) {
      return { success: true, imported: 0 };
    }

    let importedCount = 0;
    const failedTitles: string[] = [];

    // Import each conversation
    for (const guestConv of guestConversations) {
      try {
        // Create conversation in database
        const { data: newConversation, error: convError } = await supabase
          .from('grok_conversations')
          .insert({
            user_id: userId,
            title: guestConv.title,
            model: guestConv.model,
            created_at: guestConv.created_at,
            updated_at: guestConv.updated_at,
          })
          .select()
          .single();

        if (convError) {
          console.error('Failed to import conversation:', convError);
          failedTitles.push(guestConv.title);
          continue;
        }

        // Load messages for this conversation
        const messagesKey = getGuestMessagesKey(guestConv.id);
        const storedMessages = localStorage.getItem(messagesKey);
        
        if (storedMessages) {
          const guestMessages: GuestMessage[] = JSON.parse(storedMessages);
          
          // Import messages
          if (guestMessages.length > 0) {
            const messagesToInsert = guestMessages.map(msg => ({
              conversation_id: newConversation.id,
              role: msg.role,
              content: msg.content,
            }));

            const { error: messagesError } = await supabase
              .from('grok_messages')
              .insert(messagesToInsert);

            if (messagesError) {
              console.error('Failed to import messages:', messagesError);
            }
          }

          // Clear messages from localStorage
          localStorage.removeItem(messagesKey);
        }

        importedCount++;
      } catch (error) {
        console.error('Error importing conversation:', error);
        failedTitles.push(guestConv.title);
        // Continue with next conversation
      }
    }

    // Clear guest conversations from localStorage
    localStorage.removeItem(GUEST_CONVERSATIONS_KEY);

    return { 
      success: true, 
      imported: importedCount,
      failed: failedTitles.length > 0 ? failedTitles : undefined
    };
  } catch (error) {
    console.error('Error importing guest conversations:', error);
    return {
      success: false,
      imported: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function hasGuestConversations(): boolean {
  try {
    const stored = localStorage.getItem(GUEST_CONVERSATIONS_KEY);
    if (!stored) return false;
    
    const conversations = JSON.parse(stored);
    return Array.isArray(conversations) && conversations.length > 0;
  } catch (error) {
    return false;
  }
}
