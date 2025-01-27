import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";
import { ChatContainer } from "./chat/ChatContainer";
import { Card } from "@/components/ui/card";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  attachments?: string[];
}

export function ChatAssistant() {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [messages, setMessages] = useState<Message[]>([]);
  const [parkInsights, setParkInsights] = useState<any>(null);
  const [conversationId] = useState(() => crypto.randomUUID());

  const fetchParkInsights = async () => {
    if (!session?.user?.id) return;
    
    const { data: sites } = await supabase
      .from("sites")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("account_id", accountId);

    const insights = {
      total_spots: sites?.length || 0,
      occupied_slots: sites?.filter(site => site.status === "occupied")?.length || 0,
      available_spots: sites?.filter(site => site.status === "available")?.length || 0
    };

    setParkInsights(insights);
  };

  useEffect(() => {
    if (organizationId && accountId) {
      fetchParkInsights();
    }
  }, [session, organizationId, accountId]);

  return (
    <Card className="h-full flex flex-col bg-[#0D1D1F] border-none rounded-none">
      <ChatContainer
        messages={messages}
        setMessages={setMessages}
        parkInsights={parkInsights}
        conversationId={conversationId}
      />
    </Card>
  );
}