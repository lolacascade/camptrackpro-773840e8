import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatSuggestions } from "./chat/ChatSuggestions";
import { ChatInput } from "./chat/ChatInput";
import { chatService } from "@/services/chat-service";
import { useSessionCheck } from "@/hooks/use-session-check";
import { toast } from "sonner";

const suggestionQueries = [
  "Which slips are available this weekend?",
  "Show pending maintenance tasks",
  "What's the current occupancy rate?",
  "Show revenue for this month",
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content: "Hello! I'm your marina assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState<string>(uuidv4());
  const isMobile = useIsMobile();
  const { session } = useSessionContext();

  useSessionCheck();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (!session?.user?.id || !conversationId) {
          console.log('Missing user ID or conversation ID');
          return;
        }

        const chatHistory = await chatService.loadMessages(session.user.id, conversationId);
        if (chatHistory.length > 0) {
          setMessages(chatHistory);
        }
      } catch (error) {
        console.error('Error in loadMessages:', error);
        toast.error("Failed to load chat history. Please try again.");
      }
    };

    loadMessages();
  }, [session?.user?.id, conversationId]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessageType = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        console.log('No valid session found');
        window.location.href = '/login';
        return;
      }
      
      const data = await chatService.sendMessage(userMessage, conversationId, currentSession.access_token);
      
      if (data.choices && data.choices[0]) {
        const assistantMessage: ChatMessageType = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage = error.message === "API quota exceeded" 
        ? "The AI service is currently unavailable due to high demand. Please try again later."
        : "I apologize, but I encountered an error. Please try again.";
        
      const errorResponse: ChatMessageType = {
        role: "assistant",
        content: errorMessage,
      };
      setMessages(prev => [...prev, errorResponse]);
      
      // Show toast for quota exceeded error
      if (error.message === "API quota exceeded") {
        toast.error("AI service temporarily unavailable. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "bg-[#0D1D1F] flex flex-col h-full",
      isMobile ? "w-full" : "w-full sticky top-0"
    )}>
      <h2 className="text-xl font-semibold p-4 text-white">Marina Assistant</h2>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 mb-4">
          {messages.map((message, i) => (
            <ChatMessage key={i} role={message.role} content={message.content} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto">
        <div className="space-y-4">
          <ChatSuggestions 
            suggestions={suggestionQueries} 
            onSelect={setInput} 
          />
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}