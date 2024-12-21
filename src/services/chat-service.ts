import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  attachments?: string[];
};

export const chatService = {
  async sendMessage(message: Message, conversationId: string, accessToken: string, marinaInsights?: any) {
    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          messages: [message],
          conversationId,
          userId: (await supabase.auth.getUser()).data.user?.id,
          marinaInsights
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (error) {
        console.error('Error in chat service:', error);
        let errorMessage: any;
        try {
          errorMessage = JSON.parse(error.message);
        } catch {
          errorMessage = { error: error.message };
        }

        if (errorMessage.type === 'quota_exceeded') {
          toast.error("Rate limit exceeded. Please wait a few minutes before trying again.");
          throw new Error('API quota exceeded');
        }
        throw new Error(errorMessage.error || 'Unknown error occurred');
      }

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
        attachments: item.attachments,
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast.error("Failed to load chat history");
      return [];
    }
  }
};