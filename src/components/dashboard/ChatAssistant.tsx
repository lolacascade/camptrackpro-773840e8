import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { chatService } from "@/services/chat-service";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ChatContainer } from "./chat/ChatContainer";

export function ChatAssistant() {
  const session = useSession();
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; content: string; attachments?: string[] }[]>([]);
  const [conversationId] = useState(() => uuidv4());
  const [parkInsights, setParkInsights] = useState<any>(null);

  useEffect(() => {
    if (session?.user?.id) {
      loadChatHistory();
      fetchParkInsights();
    }
  }, [session?.user?.id]);

  const fetchParkInsights = async () => {
    try {
      const { data: viewData, error: viewError } = await supabase
        .from('chat_marina_insights')
        .select('*');

      if (viewError || !viewData || viewData.length === 0) {
        const [slotsData, bookingsData, maintenanceData, customersData] = await Promise.all([
          supabase.from('slots').select('*').eq('user_id', session?.user?.id),
          supabase.from('bookings').select('*').eq('user_id', session?.user?.id),
          supabase.from('maintenance_requests').select('*').eq('user_id', session?.user?.id),
          supabase.from('customers').select('*').eq('user_id', session?.user?.id)
        ]);

        const insights = {
          total_spots: slotsData.data?.length || 0,
          occupied_spots: slotsData.data?.filter(slot => slot.status === 'occupied').length || 0,
          active_bookings: bookingsData.data?.filter(booking => booking.status === 'confirmed').length || 0,
          pending_maintenance: maintenanceData.data?.filter(req => req.status === 'pending').length || 0,
          total_customers: customersData.data?.length || 0,
        };

        setParkInsights(insights);
      } else {
        setParkInsights(viewData[0]);
      }
    } catch (error) {
      console.error('Error fetching park insights:', error);
      toast.error("Failed to load park data");
    }
  };

  const loadChatHistory = async () => {
    if (!session?.user?.id) return;
    
    try {
      const history = await chatService.loadMessages(session.user.id, conversationId);
      setMessages(history.map(msg => ({
        role: msg.role as 'assistant' | 'user',
        content: msg.content,
        attachments: Array.isArray(msg.attachments) 
          ? msg.attachments.map(att => typeof att === 'string' ? att : String(att))
          : undefined
      })));
    } catch (error) {
      console.error('Error loading chat history:', error);
      toast.error("Failed to load chat history");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1D1F] text-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">RV Park Assistant</h2>
        <p className="text-sm text-[#C0CCAB]">
          Hello! I'm your RV park assistant. How can I help you today?
        </p>
      </div>
      
      <ChatContainer 
        messages={messages}
        setMessages={setMessages}
        parkInsights={parkInsights}
        conversationId={conversationId}
      />
    </div>
  );
}