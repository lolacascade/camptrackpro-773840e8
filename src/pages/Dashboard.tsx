import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Dashboard() {
  const { data: marinaSummary, isLoading } = useMarinaSummary();

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-[#133134]">Marina Dashboard</h1>
          <DashboardContent 
            marinaSummary={marinaSummary}
            isLoading={isLoading}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}