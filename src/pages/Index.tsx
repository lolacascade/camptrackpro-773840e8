import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Anchor, DollarSign, Ship, Wrench, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

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

export default function Index() {
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
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-primary">Marina Dashboard</h1>
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Occupancy"
                value="85%"
                description="Current marina occupancy"
                icon={Anchor}
                trend="up"
                trendValue="5% from last month"
              />
              <StatCard
                title="Monthly Revenue"
                value="$45,231"
                description="Total revenue this month"
                icon={DollarSign}
                trend="up"
                trendValue="12% from last month"
              />
              <StatCard
                title="Active Boats"
                value="42"
                description="Boats currently in marina"
                icon={Ship}
              />
              <StatCard
                title="Pending Maintenance"
                value="8"
                description="Maintenance requests"
                icon={Wrench}
                trend="down"
                trendValue="2 less than last week"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <MarinaOverview />
              <RecentActivity />
            </div>

            {/* Footer Stats Panel */}
            <Card className="mt-8">
              <CardContent className="flex justify-between items-center p-4">
                <div className="text-sm">
                  <span className="font-medium">Total Slips:</span> 120
                </div>
                <div className="text-sm">
                  <span className="font-medium">Active Customers:</span> 95
                </div>
                <div className="text-sm">
                  <span className="font-medium">Pending Tasks:</span> 8
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}