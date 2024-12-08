import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your request. This is a placeholder response as the AI integration is still in development.",
      }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="w-96 bg-secondary p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-white">Marina Assistant</h2>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                message.role === "assistant"
                  ? "text-primary"
                  : "text-white ml-4"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-4 space-y-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {suggestionQueries.map((query, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={() => setInput(query)}
              className="text-xs text-white hover:text-primary border-primary/50"
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
            className="bg-secondary text-white placeholder:text-white/50 border-primary/50"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}