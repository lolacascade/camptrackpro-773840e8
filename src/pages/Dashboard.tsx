import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Dashboard() {
  const { data: marinaSummary, isLoading } = useMarinaSummary();

  return (
    <PageWithChat>
      <PageContainer>
        <DashboardContent 
          marinaSummary={marinaSummary}
          isLoading={isLoading}
        />
      </PageContainer>
    </PageWithChat>
  );
}