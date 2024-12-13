import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const suggestionQueries = [
  "Which slips are available this weekend?",
  "Show pending maintenance tasks",
  "What's the current occupancy rate?",
  "Show revenue for this month",
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your marina assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState<string>(uuidv4()); // Initialize with UUID immediately
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load previous messages only if we have a valid conversation ID
    const loadMessages = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && conversationId) {
          console.log('Loading messages for conversation:', conversationId);
          const { data: chatHistory, error } = await supabase
            .from('chat_history')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

          if (error) {
            console.error('Error loading chat history:', error);
            return;
          }

          if (chatHistory && chatHistory.length > 0) {
            setMessages(chatHistory.map(msg => ({
              role: msg.role as "assistant" | "user",
              content: msg.message,
            })));
          }
        }
      } catch (error) {
        console.error('Error in loadMessages:', error);
      }
    };

    loadMessages();
  }, [conversationId]); // Only run when conversationId changes

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        'https://mlptncnvjlforntqjvbo.functions.supabase.co/chat-assistant',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            messages: messages.concat(userMessage),
            conversationId,
          }),
        }
      );

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
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
            <div
              key={i}
              className={cn(
                "p-3 rounded-lg max-w-[80%]",
                message.role === "assistant" 
                  ? "text-[#C0CCAB]" 
                  : "bg-[#C0CCAB] text-[#0D1D1F] ml-auto"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {suggestionQueries.map((query, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => setInput(query)}
                className="text-xs text-[#0D1D1F] hover:text-[#C0CCAB] border-[#C0CCAB]/50 bg-white"
              >
                {query}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-[#0D1D1F] text-white placeholder:text-white/50 border-[#C0CCAB]/50"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="bg-[#C0CCAB] hover:bg-[#C0CCAB]/90"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}