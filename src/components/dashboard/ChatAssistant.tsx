import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const suggestionQueries = [
  "Show customers with overdue payments",
  "List VIP customers checking in today",
  "Show available slips for this weekend",
  "List urgent maintenance tasks",
  "Show revenue trends for this month",
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
  const isMobile = useIsMobile();

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
      "bg-[#0D1D1F] flex flex-col",
      isMobile ? "h-full w-full" : "w-96 p-4 h-full"
    )}>
      <h2 className="text-xl font-semibold mb-4 text-white">Marina Assistant</h2>
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                message.role === "assistant"
                  ? "text-[#C0CCAB]"
                  : "bg-white text-[#0D1D1F] ml-4"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>
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
  );
}