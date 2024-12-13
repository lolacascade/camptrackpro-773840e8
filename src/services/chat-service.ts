import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const sendMessage = async (messages: Message[], conversationId?: string) => {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;

    if (!conversationId) {
      conversationId = uuidv4();
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({
          messages,
          conversationId,
          userId,
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
      
      toast.error("Failed to send message. Please try again.");
      throw new Error(`Failed to send message: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    return {
      message: data.choices[0].message,
      conversationId,
    };
  } catch (error) {
    console.error('Error in sendMessage:', error);
    if (error.message !== "API quota exceeded") {
      toast.error("An unexpected error occurred. Please try again.");
    }
    throw error;
  }
};

export const getChatHistory = async (conversationId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
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
};