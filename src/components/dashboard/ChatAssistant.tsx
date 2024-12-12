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
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "p-3 rounded-lg",
                message.role === "assistant"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground ml-4"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {suggestionQueries.map((query, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={() => setInput(query)}
              className="text-xs"
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
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}