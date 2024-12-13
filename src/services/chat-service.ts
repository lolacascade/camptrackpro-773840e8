import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const chatService = {
  async loadMessages(userId: string, conversationId: string) {
    const { data: chatHistory, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    return chatHistory?.map(msg => ({
      role: msg.role as "assistant" | "user",
      content: msg.message,
    })) || [];
  },

  async sendMessage(message: ChatMessage, conversationId: string, accessToken: string) {
    const response = await fetch(
      'https://mlptncnvjlforntqjvbo.functions.supabase.co/chat-assistant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messages: [message],
          conversationId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }
};