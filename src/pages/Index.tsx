import { Layout } from "@/components/layout/Layout";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { FooterStats } from "@/components/dashboard/FooterStats";

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

interface MarinaSummary {
  totalSlips: number;
  occupiedSlips: number;
  activeBoats: number;
}

const fetchMarinaSummary = async (): Promise<MarinaSummary> => {
  // Get total slips and occupied slips
  const { data: slipsData, error: slipsError } = await supabase
    .from('slips')
    .select('status');

  if (slipsError) throw slipsError;

  // Get active boats
  const { data: boatsData, error: boatsError } = await supabase
    .from('boats')
    .select('id');

  if (boatsError) throw boatsError;

  const totalSlips = slipsData.length;
  const occupiedSlips = slipsData.filter(slip => slip.status === 'occupied').length;
  const activeBoats = boatsData.length;

  return {
    totalSlips,
    occupiedSlips,
    activeBoats
  };
};

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your marina assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const { data: marinaSummary, refetch: refetchSummary } = useQuery({
    queryKey: ['marinaSummary'],
    queryFn: fetchMarinaSummary,
    initialData: {
      totalSlips: 0,
      occupiedSlips: 0,
      activeBoats: 0
    }
  });

  useEffect(() => {
    // Subscribe to changes in slips table
    const slipsChannel = supabase
      .channel('slips_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'slips'
        },
        () => {
          refetchSummary();
        }
      )
      .subscribe();

    // Subscribe to changes in boats table
    const boatsChannel = supabase
      .channel('boats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'boats'
        },
        () => {
          refetchSummary();
        }
      )
      .subscribe();

    return () => {
      slipsChannel.unsubscribe();
      boatsChannel.unsubscribe();
    };
  }, [refetchSummary]);

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

  const occupancyRate = marinaSummary.totalSlips > 0 
    ? Math.round((marinaSummary.occupiedSlips / marinaSummary.totalSlips) * 100)
    : 0;

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* AI Chat Assistant Panel */}
        <div className="w-96 border-r bg-background p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Marina Assistant</h2>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-primary/10"
                      : "bg-secondary ml-4"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 space-y-4">
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
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-12">
          <div className="bg-white rounded-[24px] p-12 space-y-8">
            <DashboardHeader />

            <StatsGrid 
              occupancyRate={occupancyRate}
              occupiedSlips={marinaSummary.occupiedSlips}
              totalSlips={marinaSummary.totalSlips}
              activeBoats={marinaSummary.activeBoats}
            />

            <div className="grid gap-8 md:grid-cols-2">
              <MarinaOverview />
              <RecentActivity />
            </div>

            <FooterStats totalSlips={marinaSummary.totalSlips} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
