import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { ChatInput } from "@/components/dashboard/chat/ChatInput";
import { ChatMessage } from "@/components/dashboard/chat/ChatMessage";
import { ChatSuggestions } from "@/components/dashboard/chat/ChatSuggestions";
import { chatService } from "@/services/chat-service";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/common/ImageUpload";

const INITIAL_SUGGESTIONS = [
  "What's the current occupancy rate?",
  "Show me active bookings",
  "How many maintenance requests are pending?",
  "What's the average stay duration?"
];

export function ChatAssistant() {
  const session = useSession();
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; content: string; attachments?: string[] }[]>([]);
  const [suggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => uuidv4());
  const [marinaInsights, setMarinaInsights] = useState<any>(null);
  const [attachments, setAttachments] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      loadChatHistory();
      fetchMarinaInsights();
    }
  }, [session?.user?.id]);

  const fetchMarinaInsights = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_marina_insights')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setMarinaInsights(data);
    } catch (error) {
      console.error('Error fetching marina insights:', error);
    }
  };

  const loadChatHistory = async () => {
    if (!session?.user?.id) return;
    
    try {
      const history = await chatService.loadMessages(session.user.id, conversationId);
      setMessages(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
      toast.error("Failed to load chat history");
    }
  };

  const handleSend = async () => {
    if ((!inputValue.trim() && attachments.length === 0) || !session?.access_token) return;

    const userMessage = { 
      role: 'user' as const, 
      content: inputValue,
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setAttachments([]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(
        userMessage,
        conversationId,
        session.access_token,
        marinaInsights
      );

      if (response.choices && response.choices[0]?.message) {
        const assistantMessage = {
          role: 'assistant' as const,
          content: response.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      if (error.message === "API quota exceeded") {
        toast.error("API quota exceeded. Please try again later.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleFileUpload = (url: string) => {
    setAttachments(prev => [...prev, url]);
    toast.success("File uploaded successfully");
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1D1F] text-white">
      <div className="p-4 border-b border-[#C0CCAB]/20">
        <h2 className="text-xl font-semibold mb-2">RV Park Assistant</h2>
        <p className="text-sm text-[#C0CCAB]">
          Hello! I'm your RV park assistant. How can I help you today?
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            attachments={msg.attachments}
          />
        ))}
      </div>

      <div className="p-4 space-y-4">
        {messages.length === 0 && (
          <div className="mb-4">
            <p className="text-sm text-[#C0CCAB] mb-2">Try asking about:</p>
            <div className="no-scrollbar overflow-x-auto">
              <ChatSuggestions
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
              />
            </div>
          </div>
        )}
        
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
          onFileUpload={handleFileUpload}
          attachments={attachments}
        />
      </div>
    </div>
  );
}