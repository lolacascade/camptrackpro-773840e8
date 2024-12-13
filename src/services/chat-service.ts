import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const chatService = {
  async sendMessage(message: Message, conversationId: string, accessToken: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
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
        const errorData = await response.json();
        console.error('Error response:', response.status, errorData);
        
        if (response.status === 429) {
          throw new Error("API quota exceeded");
        }
        
        throw new Error(`Failed to send message: ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  },

  async loadMessages(userId: string, conversationId: string) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', userId)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(item => ({
        role: item.role as 'user' | 'assistant',
        content: item.message,
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast.error("Failed to load chat history");
      return [];
    }
  }
};