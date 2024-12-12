import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { PageWithChat } from "@/components/layout/PageWithChat";

export default function Dashboard() {
  const { data: marinaSummary, isLoading } = useMarinaSummary();

  return (
    <PageWithChat>
      <DashboardContent 
        marinaSummary={marinaSummary}
        isLoading={isLoading}
      />
    </PageWithChat>
  );
}