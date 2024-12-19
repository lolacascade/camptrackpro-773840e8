import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { ChatInput } from "@/components/dashboard/chat/ChatInput";
import { ChatMessage } from "@/components/dashboard/chat/ChatMessage";
import { ChatSuggestions } from "@/components/dashboard/chat/ChatSuggestions";
import { chatService } from "@/services/chat-service";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_SUGGESTIONS = [
  "How many RV spots are currently available?",
  "Show me upcoming check-ins for today",
  "List all pending maintenance requests",
  "What's our current occupancy rate?",
  "Show me utility usage statistics"
];

export function ChatAssistant() {
  const session = useSession();
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; content: string; attachments?: string[] }[]>([]);
  const [suggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => uuidv4());
  const [parkInsights, setParkInsights] = useState<any>(null);
  const [attachments, setAttachments] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      loadChatHistory();
      fetchParkInsights();
    }
  }, [session?.user?.id]);

  const fetchParkInsights = async () => {
    try {
      // Fetch comprehensive RV park data
      const [slotsData, bookingsData, maintenanceData, customersData] = await Promise.all([
        supabase.from('slots').select('*'),
        supabase.from('bookings').select('*'),
        supabase.from('maintenance_requests').select('*'),
        supabase.from('customers').select('*')
      ]);

      const insights = {
        total_spots: slotsData.data?.length || 0,
        occupied_spots: slotsData.data?.filter(slot => slot.status === 'occupied').length || 0,
        active_bookings: bookingsData.data?.filter(booking => booking.status === 'active').length || 0,
        pending_maintenance: maintenanceData.data?.filter(req => req.status === 'pending').length || 0,
        total_customers: customersData.data?.length || 0,
      };

      setParkInsights(insights);
    } catch (error) {
      console.error('Error fetching park insights:', error);
      toast.error("Failed to load park data");
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
        parkInsights
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
      <div className="border-b border-[#C0CCAB]/20 p-4">
        <h2 className="text-xl font-semibold mb-2">RV Park Assistant</h2>
        <p className="text-sm text-[#C0CCAB]">
          Hello! I'm your RV park assistant. How can I help you today?
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 p-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            attachments={msg.attachments}
          />
        ))}
      </div>

      <div className="p-4 space-y-4 bg-[#0D1D1F]/80 backdrop-blur-sm">
        {messages.length === 0 && (
          <div>
            <p className="text-sm text-[#C0CCAB] mb-2">Try asking about:</p>
            <div className="overflow-x-auto no-scrollbar">
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