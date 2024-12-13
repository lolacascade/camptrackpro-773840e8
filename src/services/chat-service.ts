import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";
import { toast } from "sonner";

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
    console.log('Sending message:', { message, conversationId });
    
    try {
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
        const errorData = await response.json();
        console.error('Error response:', response.status, errorData);
        
        if (response.status === 429) {
          toast.error("AI service temporarily unavailable. Please try again later.");
          throw new Error("API quota exceeded");
        }
        
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }
};