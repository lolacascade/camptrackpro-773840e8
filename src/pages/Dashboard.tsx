import { ChatAssistant } from "@/components/dashboard/ChatAssistant";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const isMainDashboard = location.pathname === "/app";
  const { data: marinaSummary, isLoading } = useMarinaSummary();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatAssistant />
      <div className="flex-1 p-12">
        <DashboardContent 
          marinaSummary={marinaSummary}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}