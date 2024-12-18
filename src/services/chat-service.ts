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
      const response = await supabase.functions.invoke('chat-assistant', {
        body: {
          messages: [message],
          conversationId,
          userId: (await supabase.auth.getUser()).data.user?.id,
        }
      });

      if (response.error) {
        // Parse the error message from the Edge Function
        let errorMessage: any;
        try {
          errorMessage = JSON.parse(response.error.message);
        } catch {
          errorMessage = { error: response.error.message };
        }

        if (errorMessage.type === 'quota_exceeded') {
          toast.error("Rate limit exceeded. Please wait a few minutes before trying again.");
          throw new Error('API quota exceeded');
        }
        throw new Error(errorMessage.error || 'Unknown error occurred');
      }

      return response.data;
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